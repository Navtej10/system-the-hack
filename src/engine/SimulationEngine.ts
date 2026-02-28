export interface GameState {
  turn: number;
  metrics: {
    employment: number;
    economy: number;
    publicHappiness: number;
    inequality: number;
    governmentBudget: number;
  };
  status: 'playing' | 'won' | 'lost';
}

export interface MetricImpacts {
  employment?: number;
  economy?: number;
  publicHappiness?: number;
  inequality?: number;
  governmentBudget?: number;
}

export type PolicyId =
  | 'reskilling'
  | 'ubi'
  | 'tax_corp'
  | 'restrict_ai'
  | 'promote_ai';

export interface PolicyDecision {
  id: PolicyId;
  title: string;
  description: string;
  impacts: MetricImpacts;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export const POLICIES: PolicyDecision[] = [
  {
    id: 'reskilling',
    title: 'Invest in AI Reskilling',
    description: 'Fund massive education programs for displaced workers.',
    impacts: { employment: +15, governmentBudget: -20, publicHappiness: +10 },
    riskLevel: 'Low'
  },
  {
    id: 'ubi',
    title: 'Introduce Universal Basic Income',
    description: 'Provide a baseline income for all citizens.',
    impacts: { inequality: -25, publicHappiness: +20, economy: +5, governmentBudget: -30 },
    riskLevel: 'High'
  },
  {
    id: 'tax_corp',
    title: 'Tax AI Corporations',
    description: 'Levy heavy taxes on companies using automation.',
    impacts: { governmentBudget: +25, inequality: -10, economy: -15, employment: -5 },
    riskLevel: 'Medium'
  },
  {
    id: 'restrict_ai',
    title: 'Restrict Automation',
    description: 'Pass laws limiting AI deployment in certain sectors.',
    impacts: { employment: +20, economy: -20, publicHappiness: +5 },
    riskLevel: 'High'
  },
  {
    id: 'promote_ai',
    title: 'Promote AI Innovation',
    description: 'Subsidize AI research to accelerate technological growth.',
    impacts: { economy: +25, inequality: +15, employment: -15, governmentBudget: -10 },
    riskLevel: 'Medium'
  }
];

const clamp = (val: number) => Math.min(Math.max(val, 0), 100);

export const applyPolicy = (currentState: GameState, policyId: PolicyId): GameState => {
  const policy = POLICIES.find(p => p.id === policyId);
  if (!policy) return currentState;

  const newMetrics = { ...currentState.metrics };

  // 1. Apply predefined weighted direct impacts
  for (const [key, value] of Object.entries(policy.impacts)) {
    const metricKey = key as keyof GameState['metrics'];
    newMetrics[metricKey] += (value ?? 0);
  }

  // 2. Trigger secondary ripple effects based on thresholds
  if (newMetrics.economy > 80) newMetrics.employment += 5;
  if (newMetrics.inequality > 70) newMetrics.publicHappiness -= 10;
  if (newMetrics.employment < 30) newMetrics.publicHappiness -= 15;
  if (newMetrics.publicHappiness < 40) newMetrics.economy -= 10;
  if (newMetrics.governmentBudget < 20) newMetrics.economy -= 5;

  // 3. Apply natural decay each turn
  newMetrics.publicHappiness -= 1;
  newMetrics.governmentBudget -= 1;

  // 4. Add small random variation +-2 and 5. Clamp values 0–100
  for (const key of Object.keys(newMetrics) as Array<keyof GameState['metrics']>) {
    const jitter = Math.floor(Math.random() * 5) - 2;
    newMetrics[key] = clamp(newMetrics[key] + jitter);
  }

  // Check win/loss condition
  let status: GameState['status'] = 'playing';

  const metricValues = Object.values(newMetrics);
  const below20Count = metricValues.filter(v => v < 20).length;
  const allAbove75 = metricValues.every(v => v > 75);
  const newTurn = currentState.turn + 1;

  if (below20Count >= 2) {
    status = 'lost';
  } else if (allAbove75) {
    status = 'won';
  } else if (newTurn >= 10 && !allAbove75) {
    status = 'lost';
  }

  return { turn: newTurn, metrics: newMetrics, status };
};

export const generateInitialState = (): GameState => {
  const rand = () => Math.floor(Math.random() * 31) + 40;
  return {
    turn: 0,
    metrics: {
      employment: rand(),
      economy: rand(),
      publicHappiness: rand(),
      inequality: rand(),
      governmentBudget: rand(),
    },
    status: 'playing'
  };
};
