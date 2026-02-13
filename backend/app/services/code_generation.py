"""Code Generation Layer: G-code, M-code, URScript/KUKA/FANUC, CAM outputs."""
from app.models.schemas import DomainAgent


class CodeGenerationService:
    """CNC and robotic arm code generation (stub; extend with real post-processors)."""

    @staticmethod
    def generate_gcode_preview(domain: DomainAgent, description: str) -> str:
        lines = [
            "; OpalAI generated",
            f"; Domain: {domain.value}",
            f"; {description[:60]}",
            "G21",
            "G90",
            "M03 S12000",
            "G0 Z5.0",
            "G0 X0 Y0",
            "M05",
            "M30",
        ]
        return "\n".join(lines)

    @staticmethod
    def supported_outputs() -> dict:
        return {
            "cnc": ["G-code", "M-code", "multi_axis"],
            "robotics": ["URScript", "KUKA", "FANUC"],
            "cam": ["STEP", "STL", "CAM-ready"],
        }
