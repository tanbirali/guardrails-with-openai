import express from "express";
import helmet from "helmet";
import cors from "cors";

import guardrailsRoutes from "./modules/guardrails/guardrails.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"]
        : true,
  }),
);

app.use(
  express.json({
    limit: "32kb",
  }),
);

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "guardrails",
    status: "healthy",
  });
});

app.use("/api/v1/guardrails", guardrailsRoutes);

export default app;
