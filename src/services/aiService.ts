import { GoogleGenAI } from '@google/genai';
import type { GameState, PolicyDecision } from '../engine/SimulationEngine';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const generateFallbackExplanation = (
  decision: PolicyDecision,
  _currentState: GameState,
  nextState: GameState
): string => {
  if (nextState.status === 'lost') {
    return `SYSTEM COLLAPSE. The decision to ${decision.title.toLowerCase()} failed to stabilize society. Critical metrics have fallen below 20%. Social unrest and economic failure have caused a complete governmental breakdown.`;
  }
  if (nextState.status === 'won') {
    return `SOCIETY STABILIZED. Through strategic policies like ${decision.title}, you have successfully guided the nation to prosperity, balancing growth and equality. The simulation is a success.`;
  }

  const positives = Object.entries(decision.impacts)
    .filter(([, v]) => v !== undefined && v > 0)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').toLowerCase());

  const negatives = Object.entries(decision.impacts)
    .filter(([, v]) => v !== undefined && v < 0)
    .map(([k]) => k.replace(/([A-Z])/g, ' $1').toLowerCase());

  return `Analysis: The decision to ${decision.title.toLowerCase()} yielded expected trade-offs. It positively impacted ${positives.join(' and ')}, but placed strain on ${negatives.join(' and ')}. Ripple effects and natural decay slightly altered the deterministic outcomes.`;
};

export const generateExplanation = async (
  decision: PolicyDecision,
  currentState: GameState,
  nextState: GameState
): Promise<string> => {
  if (!ai || !apiKey) {
    console.warn('No Gemini API key found, using fallback deterministic logic.');
    return generateFallbackExplanation(decision, currentState, nextState);
  }

  const prompt = `
    You are the AI Governance Simulator Assistant (year 2035).
    The user made a policy decision: "${decision.title}".

    Context:
    - Previous Turn: ${currentState.turn}
    - State before decision: ${JSON.stringify(currentState.metrics, null, 2)}
    - State after decision: ${JSON.stringify(nextState.metrics, null, 2)}
    - Status: ${nextState.status}

    Task: Write a short, highly professional, analytical, and futuristic summary (max 3 sentences) of what happened.
    Explain the trade-offs logically, matching the numbers.
    If Status is 'lost', explain the system collapse reason.
    If Status is 'won', explain the stabilization success.
    Do NOT invent unrelated lore, stay grounded in the metrics provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    return response.text?.trim() ?? generateFallbackExplanation(decision, currentState, nextState);
  } catch (error) {
    console.error('Gemini API Error:', error);
    return generateFallbackExplanation(decision, currentState, nextState);
  }
};

import { applyPolicy, POLICIES } from '../engine/SimulationEngine';

export const getSimulationExplanation = async (
  currentMetrics: GameState['metrics'],
  policyId: any,
  currentTurn: number = 0
): Promise<string> => {
  const currentState: GameState = { metrics: currentMetrics, turn: currentTurn, status: 'playing' };
  const decision = POLICIES.find(p => p.id === policyId);
  
  if (!decision) return "Analysis unavailable for selected directive.";
  
  const nextState = applyPolicy(currentState, policyId);
  return generateExplanation(decision, currentState, nextState);
};
