import { create } from 'zustand';
import type { GameState, PolicyDecision, PolicyId } from '../engine/SimulationEngine';
import { generateInitialState, applyPolicy, POLICIES } from '../engine/SimulationEngine';

export interface HistoryEntry {
  turn: number;
  stateSnapshot: GameState;
  decisionMade: PolicyDecision | null;
  aiExplanation: string | null;
}

interface GameStore {
  currentState: GameState;
  history: HistoryEntry[];
  isSimulating: boolean;
  currentExplanation: string;
  makeDecision: (policyId: PolicyId, explanation: string) => void;
  setSimulating: (isSimulating: boolean) => void;
  setExplanation: (explanation: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  currentState: generateInitialState(),
  history: [],
  isSimulating: false,
  currentExplanation: "Strategic Advisor online. Awaiting your first policy decision to analyze systemic impacts.",

  makeDecision: (policyId, explanation) => set((state) => {
    if (state.currentState.status !== 'playing') return state;

    const policy = POLICIES.find(p => p.id === policyId) ?? null;
    const previousState = state.currentState;
    const nextState = applyPolicy(previousState, policyId);

    const newHistoryEntry: HistoryEntry = {
      turn: previousState.turn,
      stateSnapshot: previousState,
      decisionMade: policy,
      aiExplanation: explanation
    };

    return {
      currentState: nextState,
      history: [...state.history, newHistoryEntry],
      currentExplanation: explanation
    };
  }),

  setSimulating: (isSimulating) => set({ isSimulating }),
  setExplanation: (explanation) => set({ currentExplanation: explanation }),

  resetGame: () => set({
    currentState: generateInitialState(),
    history: [],
    isSimulating: false,
    currentExplanation: "Simulator reset. Awaiting initial policy directive."
  })
}));
