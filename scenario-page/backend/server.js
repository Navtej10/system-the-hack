import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/* ===============================
   GROQ CLIENT
================================*/

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
});

if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY missing");
  process.exit(1);
}

/* ===============================
   CONSTANTS
================================*/

const MAX_TURNS = 10;

const METRIC_KEYS = [
  'employment',
  'economy',
  'publicHappiness',
  'inequality',
  'governmentBudget'
];

const WIN_CONDITION = {
  employment: 80,
  economy: 80,
  publicHappiness: 80,
  inequality: 30,
  governmentBudget: 60
};

/* ===============================
   HELPERS
================================*/

function slugify(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_|_$/g, '') ||
    'policy_' + Date.now()
  );
}

function clampImpact(v) {
  return Math.max(-30, Math.min(30, Math.round(v || 0)));
}

function normalizeImpacts(impacts) {
  let total = 0;

  Object.values(impacts).forEach(v => {
    total += Math.abs(v);
  });

  if (total > 60) {
    Object.keys(impacts).forEach(k => {
      impacts[k] = Math.round(impacts[k] * 0.6);
    });
  }

  return impacts;
}

/* ===============================
   PROGRESS + DIFFICULTY
================================*/

function getProgress(metrics) {
  return `
Employment gap: ${WIN_CONDITION.employment - metrics.employment}
Economy gap: ${WIN_CONDITION.economy - metrics.economy}
Happiness gap: ${WIN_CONDITION.publicHappiness - metrics.publicHappiness}
Inequality excess: ${metrics.inequality - WIN_CONDITION.inequality}
Budget gap: ${WIN_CONDITION.governmentBudget - metrics.governmentBudget}
`;
}

function difficultyRule(turn) {
  if (turn <= 4)
    return `Generate 2 positive and 2 risky interventions.`;
  if (turn <= 7)
    return `Generate 3 positive and 1 risky intervention.`;
  return `Generate stabilization-focused interventions helping achieve victory. Avoid systemic shocks.`;
}

/* ===============================
   FINAL SIMULATION ANALYSIS
================================*/

function evaluateSimulation(metrics) {

  const stabilized =
    metrics.employment >= WIN_CONDITION.employment &&
    metrics.economy >= WIN_CONDITION.economy &&
    metrics.publicHappiness >= WIN_CONDITION.publicHappiness &&
    metrics.inequality <= WIN_CONDITION.inequality &&
    metrics.governmentBudget >= WIN_CONDITION.governmentBudget;

  const score =
    metrics.employment +
    metrics.economy +
    metrics.publicHappiness +
    metrics.governmentBudget -
    metrics.inequality;

  if (stabilized) {
    return {
      result: "WIN",
      title: "Society Stabilized",
      message:
        "Your governance achieved long-term systemic stability."
    };
  }

  if (score > 300) {
    return {
      result: "PARTIAL_SUCCESS",
      title: "Recovering System",
      message:
        "You prevented collapse but structural risks remain."
    };
  }

  return {
    result: "FAILURE",
    title: "System Collapse",
    message:
      "Economic and social imbalance destabilized society."
  };
}

function generatePerformance(metrics, history) {
  return {
    economicHealth:
      (metrics.economy +
        metrics.governmentBudget) / 2,

    socialStability:
      metrics.publicHappiness -
      metrics.inequality,

    employmentStrength:
      metrics.employment,

    decisionsTaken: history.length
  };
}

/* ===============================
   API ROUTE
================================*/

app.post('/api/generate-interventions', async (req, res) => {

  try {

    const {
      chosenPolicy,
      metrics,
      turn = 1,
      decisionHistory = []
    } = req.body;

    if (!metrics)
      return res.status(400)
        .json({ error: "Missing metrics" });

    /* ======================================
       ✅ HARD STOP AFTER TURN 10
    ====================================== */

    if (turn >= MAX_TURNS) {

      const analysis =
        evaluateSimulation(metrics);

      return res.json({
        simulationEnded: true,
        analysis,
        performance:
          generatePerformance(
            metrics,
            decisionHistory
          )
      });
    }

    /* Prevent token explosion */
    const recentHistory =
      decisionHistory.slice(-3);

    const historyText =
      recentHistory.length
        ? recentHistory
            .map(
              (d, i) =>
                `${i + 1}. ${d.title} (Turn ${d.turn})`
            )
            .join('\n')
        : "None";

    const progressText =
      getProgress(metrics);

    const prompt = `
You are an AI GOVERNANCE SIMULATION ENGINE.

Victory Conditions:
Employment ≥80
Economy ≥80
Public Happiness ≥80
Inequality ≤30
Government Budget ≥60

Chosen Policy:
${chosenPolicy?.title}
${chosenPolicy?.description}

Recent Decisions:
${historyText}

Turn ${turn}/10

Metrics:
Employment ${metrics.employment}
Economy ${metrics.economy}
Happiness ${metrics.publicHappiness}
Inequality ${metrics.inequality}
Budget ${metrics.governmentBudget}

${progressText}

${difficultyRule(turn)}

Return EXACTLY 4 interventions.
Use ONLY allowed metrics.
Impact range -30 to +30.
Return ONLY JSON ARRAY.
`;

    const completion =
      await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        temperature: 0.65,
        messages: [
          {
            role: "system",
            content:
              "Return valid JSON array only."
          },
          { role: "user", content: prompt }
        ]
      });

    let raw =
      completion.choices?.[0]?.message
        ?.content || "[]";

    raw = raw
      .replace(/^```json?|```$/g, '')
      .trim();

    let parsed = [];

    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn("⚠ Invalid JSON fallback");
    }

    const interventions =
      parsed.slice(0, 4).map((p, i) => {

        let impacts = {};

        METRIC_KEYS.forEach(k => {
          impacts[k] =
            clampImpact(
              p?.impacts?.[k]
            );
        });

        impacts =
          normalizeImpacts(impacts);

        return {
          id:
            slugify(
              p.title || `policy_${i}`
            ) +
            "_" +
            Date.now() +
            "_" + i,

          title:
            p.title ||
            `Intervention ${i + 1}`,

          description:
            p.description || "",

          impacts,

          riskLevel:
            ["Low","Medium","High"]
              .includes(p.riskLevel)
              ? p.riskLevel
              : "Medium"
        };
      });

    res.json({ interventions });

  } catch (err) {

    console.error("❌ API ERROR:", err);

    res.status(500).json({
      error: err.message,
      fallback: true
    });
  }
});

/* ===============================
   SERVER START
================================*/

app.listen(PORT, () => {
  console.log(
    `✅ Scenario API running at http://localhost:${PORT}`
  );
});