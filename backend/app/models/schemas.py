"""Request/response schemas for the agentic system."""
from enum import Enum
from typing import Optional, Any
from pydantic import BaseModel, Field


class DomainAgent(str, Enum):
    STONE_SCULPTURE = "stone_sculpture"
    WOOD_CARPENTER = "wood_carpenter"
    METALLIC_CRAFT = "metallic_craft"
    TOOL_MAKER = "tool_maker"
    GOLD_CRAFTING = "gold_crafting"


class MeasurementUnit(str, Enum):
    MM = "mm"
    INCHES = "inches"
    MICRONS = "microns"


# --- Front Agent (Intent) ---
class ManufacturingIntent(BaseModel):
    """Structured intent from user input."""
    domain: DomainAgent
    description: str
    measurement_unit: MeasurementUnit = MeasurementUnit.MM
    raw_input_type: str = "text"  # text | voice | image | sketch | cad
    constraints: dict[str, Any] = Field(default_factory=dict)
    locale: str = "en"


class IntentRequest(BaseModel):
    """User input: text, optional image/sketch ref."""
    text: Optional[str] = None
    image_base64: Optional[str] = None
    locale: str = "en"
    preferred_domain: Optional[DomainAgent] = None


# --- Image generation (Gemini Imagen) ---
class ImageGenerateRequest(BaseModel):
    prompt: str
    number_of_images: int = 1
    aspect_ratio: str = "1:1"
    style_hint: Optional[str] = None


class ImageGenerateResponse(BaseModel):
    images_base64: list[str] = Field(default_factory=list)
    prompt_used: str
    model: str


# --- Domain agent requests (unified) ---
class DomainAgentRequest(BaseModel):
    intent: ManufacturingIntent
    reference_image_base64: Optional[str] = None
    options: dict[str, Any] = Field(default_factory=dict)


class DomainAgentResponse(BaseModel):
    domain: DomainAgent
    success: bool
    message: str
    outputs: dict[str, Any] = Field(default_factory=dict)
    # e.g. model_3d_ref, toolpaths, nc_code, cost_estimate, etc.


# --- Stone Sculpture ---
class StoneSculptureInput(BaseModel):
    image_base64: Optional[str] = None
    text_description: str
    stone_type: str = "marble"
    measurement_unit: MeasurementUnit = MeasurementUnit.MM
    dimensions_hint: Optional[str] = None


# --- Wood / Carpenter ---
class WoodCarpenterInput(BaseModel):
    furniture_type: str
    space_constraints: Optional[str] = None
    load_requirements: Optional[str] = None
    joinery_preference: Optional[str] = None
    measurement_unit: MeasurementUnit = MeasurementUnit.MM


# --- Metallic Craft ---
class MetallicCraftInput(BaseModel):
    functional_description: str
    preferred_machine: Optional[str] = None  # lathe, vmc, 5-axis
    load_rpm_heat: Optional[str] = None
    drawing_base64: Optional[str] = None


# --- Tool Maker ---
class ToolMakerInput(BaseModel):
    tool_purpose: str  # die, mold, punch, fixture
    production_volume: Optional[str] = None
    precision_class: Optional[str] = None
    cooling_flow: Optional[str] = None


# --- Gold Crafting ---
class GoldCraftingInput(BaseModel):
    design_intent: str  # ring, chain, idol, ornament
    budget_range: Optional[str] = None
    gold_purity: Optional[str] = None
    weight_constraints: Optional[str] = None
    delivery_location: Optional[str] = None
    locale: str = "en"
