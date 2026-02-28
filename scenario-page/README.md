# Governance Control — Blueprint City

A governance simulation with AI-generated strategic interventions and butterfly-effect decision chains.

## Setup

### 1. Backend (required for AI-generated interventions)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm start
```

The API runs at `http://localhost:3001`.

### 2. Frontend

Open `index.html` in a browser, or serve it locally:

```bash
npx serve .
```

## How it works

- **Turn 0**: You see 5 initial strategic interventions.
- **On each choice**: The selected intervention is applied, metrics update, and the backend calls an AI model to generate 4 new context-aware interventions (2 positive, 2 negative) based on:
  - The chosen policy
  - Current metrics
  - The last 5 decisions (butterfly effect)
- **Fallback**: If the API is unavailable, the app falls back to the initial 5 policies.
