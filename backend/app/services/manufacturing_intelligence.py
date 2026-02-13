"""Manufacturing Intelligence Layer: geometry, tolerances, material behavior, standards."""
from app.models.schemas import MeasurementUnit, DomainAgent


class ManufacturingIntelligence:
    """Geometry reasoning, tolerance management, material behavior, SLA rules."""

    @staticmethod
    def default_tolerance(domain: DomainAgent, unit: MeasurementUnit) -> str:
        if domain == DomainAgent.STONE_SCULPTURE:
            return "0.5 mm" if unit == MeasurementUnit.MM else "0.02 in"
        if domain == DomainAgent.WOOD_CARPENTER:
            return "0.3 mm" if unit == MeasurementUnit.MM else "0.01 in"
        if domain == DomainAgent.METALLIC_CRAFT:
            return "0.05 mm" if unit == MeasurementUnit.MM else "0.002 in"
        if domain == DomainAgent.TOOL_MAKER:
            return "0.01 mm" if unit == MeasurementUnit.MM else "0.0005 in"
        if domain == DomainAgent.GOLD_CRAFTING:
            return "0.02 mm" if unit == MeasurementUnit.MM else "0.001 in"
        return "0.1 mm"

    @staticmethod
    def suggest_feed_speed(domain: DomainAgent, material: str) -> dict:
        """Placeholder: feed/speed by domain and material."""
        return {"feed_mm_per_min": 500, "speed_rpm": 12000, "stepover": 0.3}

    @staticmethod
    def validate_dimensions(domain: DomainAgent, dims: dict) -> list[str]:
        """Return list of validation errors (empty if ok)."""
        errors = []
        return errors
