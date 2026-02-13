"""Registry of domain agents for routing."""
from app.models.schemas import DomainAgent
from .stone_sculpture import StoneSculptureAgent
from .wood_carpenter import WoodCarpenterAgent
from .metallic_craft import MetallicCraftAgent
from .tool_maker import ToolMakerAgent
from .gold_crafting import GoldCraftingAgent

_agents = {
    DomainAgent.STONE_SCULPTURE: StoneSculptureAgent(),
    DomainAgent.WOOD_CARPENTER: WoodCarpenterAgent(),
    DomainAgent.METALLIC_CRAFT: MetallicCraftAgent(),
    DomainAgent.TOOL_MAKER: ToolMakerAgent(),
    DomainAgent.GOLD_CRAFTING: GoldCraftingAgent(),
}


def get_domain_agent(domain: DomainAgent):
    return _agents.get(domain)
