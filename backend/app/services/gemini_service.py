"""Gemini API: Imagen image generation + vision for intent parsing."""
import base64
import io
from typing import Optional

from app.config import get_settings
from app.models.schemas import ImageGenerateRequest, ImageGenerateResponse

try:
    from google import genai
    from google.genai import types
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    genai = None
    types = None


class GeminiService:
    """Gemini Imagen for image generation and vision for intent."""

    def __init__(self):
        self._client = None
        self._settings = get_settings()

    def _get_client(self):
        if not GEMINI_AVAILABLE:
            raise RuntimeError("google-genai not installed. pip install google-genai")
        if not self._settings.gemini_api_key:
            raise ValueError("GEMINI_API_KEY not set in environment or .env")
        if self._client is None:
            self._client = genai.Client(api_key=self._settings.gemini_api_key)
        return self._client

    def generate_images(self, req: ImageGenerateRequest) -> ImageGenerateResponse:
        """Generate images using Imagen via Gemini API."""
        client = self._get_client()
        prompt = req.prompt
        if req.style_hint:
            prompt = f"{prompt}. Style: {req.style_hint}"
        config = types.GenerateImagesConfig(
            number_of_images=min(4, max(1, req.number_of_images)),
            aspect_ratio=req.aspect_ratio,
        )
        response = client.models.generate_images(
            model=self._settings.imagen_model,
            prompt=prompt,
            config=config,
        )
        images_b64 = []
        if hasattr(response, "generated_images") and response.generated_images:
            for img in response.generated_images:
                raw = None
                if hasattr(img, "image") and img.image:
                    o = img.image
                    if hasattr(o, "image_bytes"):
                        raw = o.image_bytes
                    elif hasattr(o, "_pil_image"):
                        buf = io.BytesIO()
                        o._pil_image.save(buf, format="PNG")
                        raw = buf.getvalue()
                elif hasattr(img, "image_bytes"):
                    raw = img.image_bytes
                if raw:
                    images_b64.append(base64.b64encode(raw).decode("utf-8"))
        return ImageGenerateResponse(
            images_base64=images_b64,
            prompt_used=prompt,
            model=self._settings.imagen_model,
        )

    def parse_intent_from_text(self, text: str, locale: str = "en") -> dict:
        """Use Gemini to infer domain and structured intent from text (no image)."""
        if not text or not text.strip():
            return {"domain": "stone_sculpture", "description": "", "measurement_unit": "mm"}
        try:
            client = self._get_client()
            prompt = f"""Analyze this manufacturing/design request and return a JSON object only, no markdown.
Keys: domain (one of: stone_sculpture, wood_carpenter, metallic_craft, tool_maker, gold_crafting),
description (short summary), measurement_unit (mm or inches).
User message (locale={locale}): {text}
JSON:"""
            response = client.models.generate_content(
                model=self._settings.gemini_vision_model,
                contents=prompt,
            )
            out = getattr(response, "text", None) or ""
            import json
            # Strip markdown code block if present
            if "```" in out:
                out = out.split("```")[1].replace("json", "").strip()
            return json.loads(out)
        except Exception:
            return {"domain": "stone_sculpture", "description": text, "measurement_unit": "mm"}

    def describe_image_for_intent(self, image_base64: str, caption: Optional[str] = None) -> str:
        """Use vision to describe image for manufacturing intent."""
        try:
            client = self._get_client()
            image_bytes = base64.b64decode(image_base64)
            parts = [types.Part.from_bytes(data=image_bytes, mime_type="image/png")]
            if caption:
                parts.insert(0, types.Part.from_text(f"User caption: {caption}"))
            prompt = "Describe this image in one short paragraph for manufacturing or design: materials, shape, dimensions hint, and suggested domain (stone, wood, metal, tool, jewelry)."
            response = client.models.generate_content(
                model=self._settings.gemini_vision_model,
                contents=types.Content(role="user", parts=parts + [types.Part.from_text(prompt)]),
            )
            return getattr(response, "text", "") or "Image received."
        except Exception as e:
            return f"Could not analyze image: {e}"
