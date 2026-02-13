"""Base domain agent interface."""
from abc import ABC, abstractmethod
from app.models.schemas import DomainAgentRequest, DomainAgentResponse, DomainAgent


class BaseDomainAgent(ABC):
    """Base for all domain manufacturing agents."""

    @property
    @abstractmethod
    def domain(self) -> DomainAgent:
        pass

    @abstractmethod
    def process(self, req: DomainAgentRequest) -> DomainAgentResponse:
        pass
