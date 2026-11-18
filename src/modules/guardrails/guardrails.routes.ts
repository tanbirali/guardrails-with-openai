import { Router } from "express";
import { guardrailsController } from "./guardrails.controller.js";

const router = Router();

router.post(
  "/validate",
  guardrailsController.validate.bind(guardrailsController),
);

export default router;
