const API_BASE = '/api';

export type DomainAgentId =
  | 'stone_sculpture'
  | 'wood_carpenter'
  | 'metallic_craft'
  | 'tool_maker'
  | 'gold_crafting';

export interface ManufacturingIntent {
  domain: DomainAgentId;
  description: string;
  measurement_unit: 'mm' | 'inches' | 'microns';
  raw_input_type: string;
  constraints: Record<string, unknown>;
  locale: string;
}

export interface ImageGenerateRequest {
  prompt: string;
  number_of_images?: number;
  aspect_ratio?: string;
  style_hint?: string;
}

export interface ImageGenerateResponse {
  images_base64: string[];
  prompt_used: string;
  model: string;
}

export interface IntentRequest {
  text?: string;
  image_base64?: string;
  locale?: string;
  preferred_domain?: DomainAgentId;
}

export interface DomainAgentRequest {
  intent: ManufacturingIntent;
  reference_image_base64?: string;
  options?: Record<string, unknown>;
}

export interface DomainAgentResponse {
  domain: DomainAgentId;
  success: boolean;
  message: string;
  outputs: Record<string, unknown>;
}

export async function generateImage(req: ImageGenerateRequest): Promise<ImageGenerateResponse> {
  const res = await fetch(`${API_BASE}/image/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || 'Image generation failed');
  }
  return res.json();
}

export async function parseIntent(req: IntentRequest): Promise<ManufacturingIntent> {
  const res = await fetch(`${API_BASE}/intent/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Intent parse failed');
  return res.json();
}

export async function runDomainAgent(req: DomainAgentRequest): Promise<DomainAgentResponse> {
  const res = await fetch(`${API_BASE}/agent/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) throw new Error('Agent run failed');
  return res.json();
}

export interface AgentInfo {
  id: string;
  name: string;
}

export async function listAgents(): Promise<{ agents: AgentInfo[] }> {
  const res = await fetch(`${API_BASE}/agents`);
  if (!res.ok) throw new Error('List agents failed');
  return res.json();
}
