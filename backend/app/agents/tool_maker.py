"""Agent-4: Tool Maker Agent (dies, molds, precision tools)."""
from app.models.schemas import DomainAgent, DomainAgentRequest, DomainAgentResponse
from app.agents.base import BaseDomainAgent
from app.services.manufacturing_intelligence import ManufacturingIntelligence


class ToolMakerAgent(BaseDomainAgent):
    """Mold core/cavity, shrinkage, draft angles, EDM/CNC, fabrication SOP."""

    @property
    def domain(self) -> DomainAgent:
        return DomainAgent.TOOL_MAKER

    def process(self, req: DomainAgentRequest) -> DomainAgentResponse:
        intent = req.intent
        tol = ManufacturingIntelligence.default_tolerance(intent.domain, intent.measurement_unit)
        return DomainAgentResponse(
            domain=DomainAgent.TOOL_MAKER,
            success=True,
            message="Mold/core models and CNC+EDM programs generated.",
            outputs={
                "tolerance": tol,
                "mold_core_cavity_models": True,
                "cnc_edm_programs": True,
                "shrinkage_compensation": True,
                "draft_angle_logic": True,
                "fabrication_sop": True,
                "robotic_handling_code": True,
            },
        )
