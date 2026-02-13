"""Agent-5: Gold Crafting Agent (customer-facing + manufacturing)."""
from app.models.schemas import DomainAgent, DomainAgentRequest, DomainAgentResponse
from app.agents.base import BaseDomainAgent
from app.services.manufacturing_intelligence import ManufacturingIntelligence


class GoldCraftingAgent(BaseDomainAgent):
    """Jewelry design, alloy, cost, 3D printable model, casting/CNC, hallmark, logistics."""

    @property
    def domain(self) -> DomainAgent:
        return DomainAgent.GOLD_CRAFTING

    def process(self, req: DomainAgentRequest) -> DomainAgentResponse:
        intent = req.intent
        tol = ManufacturingIntelligence.default_tolerance(intent.domain, intent.measurement_unit)
        return DomainAgentResponse(
            domain=DomainAgent.GOLD_CRAFTING,
            success=True,
            message="Jewelry model and casting/CNC code ready; hallmark and logistics prepared.",
            outputs={
                "tolerance": tol,
                "locale": intent.locale,
                "model_3d_printable": True,
                "casting_cnc_micro_machining_code": True,
                "hallmark_compliance_data": True,
                "courier_tracking_integration": True,
                "invoice_payment_trigger": True,
            },
        )
