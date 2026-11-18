export const guardrailsConfig = {
  version: 1,

  input: {
    version: 1,
    guardrails: [
      {
        name: "Moderation",
        config: {
          categories: [
            "hate",
            "harassment",
            "violence",
            "self-harm",
            "sexual",
            "illicit",
          ],
        },
      },
      {
        name: "Jailbreak",
        config: {
          model: "gpt-4.1-mini",
          confidence_threshold: 0.7,
          include_reasoning: false,
          max_turns: 10,
        },
      },
    ],
  },

  output: {
    version: 1,
    guardrails: [
      {
        name: "Moderation",
        config: {
          categories: [
            "hate",
            "harassment",
            "violence",
            "self-harm",
            "sexual",
            "illicit",
          ],
        },
      },
      {
        name: "Contains PII",
        config: {
          entities: ["EMAIL_ADDRESS", "PHONE_NUMBER", "CREDIT_CARD"],
          block: true,
          detect_encoded_pii: false,
        },
      },
    ],
  },
};
