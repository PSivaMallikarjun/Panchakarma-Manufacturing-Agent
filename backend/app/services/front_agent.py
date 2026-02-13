"""Front Agent: converts user input to structured intent and routes to domain agents."""
from app.models.schemas import (
    IntentRequest,
    ManufacturingIntent,
    DomainAgent,
    MeasurementUnit,
)
from app.services.gemini_service import GeminiService


class FrontAgent:
    """Intent + Design Agent: multilingual input -> structured manufacturing intent -> route to domain."""

    def __init__(self):
        self.gemini = GeminiService()

    def parse_intent(self, req: IntentRequest) -> ManufacturingIntent:
        """Convert user thoughts to structured manufacturing intent and infer domain."""
        if req.preferred_domain:
            domain = req.preferred_domain
        else:
            domain = DomainAgent.STONE_SCULPTURE

        description = (req.text or "").strip()
        measurement_unit = MeasurementUnit.MM
        raw_input_type = "text"

        if req.image_base64:
            raw_input_type = "image"
            image_desc = self.gemini.describe_image_for_intent(req.image_base64, req.text)
            description = description or image_desc
            parsed = self.gemini.parse_intent_from_text(description, req.locale)
            domain_str = parsed.get("domain", "stone_sculpture")
            try:
                domain = DomainAgent(domain_str)
            except ValueError:
                pass
            description = parsed.get("description", description)
            mu = parsed.get("measurement_unit", "mm")
            try:
                measurement_unit = MeasurementUnit(mu)
            except ValueError:
                pass
        elif description:
            parsed = self.gemini.parse_intent_from_text(description, req.locale)
            domain_str = parsed.get("domain", "stone_sculpture")
            try:
                domain = DomainAgent(domain_str)
            except ValueError:
                pass
            description = parsed.get("description", description)
            mu = parsed.get("measurement_unit", "mm")
            try:
                measurement_unit = MeasurementUnit(mu)
            except ValueError:
                pass

        return ManufacturingIntent(
            domain=domain,
            description=description,
            measurement_unit=measurement_unit,
            raw_input_type=raw_input_type,
            constraints={},
            locale=req.locale,
        )
