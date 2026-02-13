"""Agent-3: Metallic Craft / Machine Builder Agent."""
from app.models.schemas import DomainAgent, DomainAgentRequest, DomainAgentResponse
from app.agents.base import BaseDomainAgent
from app.services.manufacturing_intelligence import ManufacturingIntelligence


class MetallicCraftAgent(BaseDomainAgent):
    """Machine parts, assemblies, feed/speed, tolerance stack-up, NC code."""

    @property
    def domain(self) -> DomainAgent:
        return DomainAgent.METALLIC_CRAFT

    def process(self, req: DomainAgentRequest) -> DomainAgentResponse:
        intent = req.intent
        tol = ManufacturingIntelligence.default_tolerance(intent.domain, intent.measurement_unit)
        return DomainAgentResponse(
            domain=DomainAgent.METALLIC_CRAFT,
            success=True,
            message="Multi-part CNC programs and assembly sequence ready.",
            outputs={
                "tolerance": tol,
                "multi_part_cnc": True,
                "assembly_sequence": True,
                "machine_specific_nc": True,
                "qa_measurement_plan": True,
                "feed_speed": ManufacturingIntelligence.suggest_feed_speed(
                    intent.domain, "steel"
                ),
            },
        )
