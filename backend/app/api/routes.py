"""API routes: image generation, intent, domain agents."""
from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    IntentRequest,
    ManufacturingIntent,
    ImageGenerateRequest,
    ImageGenerateResponse,
    DomainAgentRequest,
    DomainAgentResponse,
    DomainAgent,
)
from app.services.gemini_service import GeminiService
from app.services.front_agent import FrontAgent
from app.agents.registry import get_domain_agent

router = APIRouter()
gemini = GeminiService()
front_agent = FrontAgent()


@router.post("/image/generate", response_model=ImageGenerateResponse)
async def generate_image(req: ImageGenerateRequest) -> ImageGenerateResponse:
    """Generate images using Gemini Imagen."""
    try:
        return gemini.generate_images(req)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image generation failed: {e}")


@router.post("/intent/parse", response_model=ManufacturingIntent)
async def parse_intent(req: IntentRequest) -> ManufacturingIntent:
    """Parse user input (text/image) into structured manufacturing intent and route domain."""
    return front_agent.parse_intent(req)


@router.post("/agent/run", response_model=DomainAgentResponse)
async def run_domain_agent(req: DomainAgentRequest) -> DomainAgentResponse:
    """Run the appropriate domain agent for the given intent."""
    agent = get_domain_agent(req.intent.domain)
    if not agent:
        raise HTTPException(status_code=404, detail=f"Unknown domain: {req.intent.domain}")
    return agent.process(req)


@router.get("/agents")
async def list_agents():
    """List available domain agents."""
    return {
        "agents": [
            {"id": d.value, "name": d.name.replace("_", " ").title()}
            for d in DomainAgent
        ]
    }
