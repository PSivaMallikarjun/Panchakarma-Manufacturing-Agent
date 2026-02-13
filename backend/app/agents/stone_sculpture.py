"""Agent-1: Stone Sculpture Designer Agent."""
from app.models.schemas import DomainAgent, DomainAgentRequest, DomainAgentResponse
from app.agents.base import BaseDomainAgent
from app.services.manufacturing_intelligence import ManufacturingIntelligence


class StoneSculptureAgent(BaseDomainAgent):
    """Image/sketch -> 3D mesh reasoning, proportions, toolpaths, NC code."""

    @property
    def domain(self) -> DomainAgent:
        return DomainAgent.STONE_SCULPTURE

    def process(self, req: DomainAgentRequest) -> DomainAgentResponse:
        intent = req.intent
        tol = ManufacturingIntelligence.default_tolerance(intent.domain, intent.measurement_unit)
        # Placeholder: real implementation would call geometry/toolpath services
        unit = intent.measurement_unit.value
        return DomainAgentResponse(
            domain=DomainAgent.STONE_SCULPTURE,
            success=True,
            message="Stone sculpture design and toolpaths generated.",
            outputs={
                "tolerance": tol,
                "measurement_unit": unit,
                "phases": ["rough_cut", "semi_finish", "fine_sculpting", "polishing"],
                "nc_code_preview": f"; Stone sculpture - {intent.description[:50]}...\nG21\nG90\nM03 S12000",
                "model_formats": ["STEP", "STL"],
                "multi_axis_carving": True,
            },
        )
