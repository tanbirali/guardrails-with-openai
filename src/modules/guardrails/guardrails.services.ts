import { GuardrailTripwireTriggered } from "@openai/guardrails";

import { guardrailsClient } from "./guardrails.client.js";

interface ChatInput {
  message: string;
  history?: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export class GuardrailsService {
  async processMessage(input: ChatInput) {
    try {
      const messages = [
        ...(input.history ?? []),
        {
          role: "user" as const,
          content: input.message,
        },
      ];

      const response = await guardrailsClient.chat.completions.create({
        model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
        messages,
      });

      return {
        success: true,
        status: "ALLOWED",
        response: response.choices[0]?.message?.content ?? "",
      };
    } catch (error) {
      if (error instanceof GuardrailTripwireTriggered) {
        return {
          success: false,
          status: "BLOCKED",
          message:
            "Your request could not be processed because it triggered a safety check.",
        };
      }

      throw error;
    }
  }
}

export const guardrailsService = new GuardrailsService();
