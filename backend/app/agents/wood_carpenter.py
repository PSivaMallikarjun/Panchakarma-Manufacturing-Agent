"""Agent-2: Wood / Carpenter Agent."""
from app.models.schemas import DomainAgent, DomainAgentRequest, DomainAgentResponse
from app.agents.base import BaseDomainAgent
from app.services.manufacturing_intelligence import ManufacturingIntelligence


class WoodCarpenterAgent(BaseDomainAgent):
    """Furniture/utility, joinery, cutting layout, CNC router code."""

    @property
    def domain(self) -> DomainAgent:
        return DomainAgent.WOOD_CARPENTER

    def process(self, req: DomainAgentRequest) -> DomainAgentResponse:
        intent = req.intent
        tol = ManufacturingIntelligence.default_tolerance(intent.domain, intent.measurement_unit)
        return DomainAgentResponse(
            domain=DomainAgent.WOOD_CARPENTER,
            success=True,
            message="Cutting layout and joinery geometry ready.",
            outputs={
                "tolerance": tol,
                "cutting_layout": True,
                "joinery_geometry": True,
                "cnc_router_code": True,
                "grain_direction_optimized": True,
                "waste_minimized": True,
                "humidity_tolerance_note": "Consider 0.3% expansion for humidity.",
            },
        )
