import { GuardrailsOpenAI } from "@openai/guardrails";

import { guardrailsConfig } from "../../config/guardrails.config.js";

export const guardrailsClient = await GuardrailsOpenAI.create(
  guardrailsConfig,
  {
    apiKey: process.env.OPENAI_API_KEY ?? process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENROUTER_BASE_URL ?? undefined,
  },
  true,
);
