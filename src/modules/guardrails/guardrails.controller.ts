import type { Request, Response, NextFunction } from "express";

import { z } from "zod";
import { guardrailsService } from "./guardrails.services.js";

const chatSchema = z
  .object({
    message: z.string().trim().min(1).max(10000),

    history: z
      .array(
        z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        }),
      )
      .max(20)
      .optional(),
  })
  .strict();

export class GuardrailsController {
  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = chatSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid request",
          errors: parsed.error.flatten(),
        });
      }

      const result = await guardrailsService.processMessage({
        message: parsed.data.message,
        ...(parsed.data.history !== undefined
          ? { history: parsed.data.history }
          : {}),
      });

      if (result.status === "BLOCKED") {
        return res.status(422).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const guardrailsController = new GuardrailsController();
