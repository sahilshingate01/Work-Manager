import { Router, type Request, type Response } from "express";

const router = Router();

router.post("/ai/summarize", async (req: Request, res: Response) => {
  try {
    const { details } = req.body;
    if (!details || typeof details !== "string") {
      res.status(400).json({ error: "details text is required" });
      return;
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "NVIDIA_API_KEY is not configured" });
      return;
    }

    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "meta/llama-3.1-8b-instruct",
          messages: [
            {
              role: "system",
              content:
                "You are a concise work summary assistant. Summarize the given work details in 1-2 short sentences. Be direct and professional. Return only the summary text, nothing else.",
            },
            {
              role: "user",
              content: `Summarize this work entry:\n\n${details}`,
            },
          ],
          temperature: 0.4,
          max_tokens: 150,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("NVIDIA API error:", response.status, errorText);
      res.status(502).json({ error: "Failed to generate summary from AI service" });
      return;
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    const summary = data.choices?.[0]?.message?.content?.trim() ?? "";
    res.json({ summary });
  } catch (err) {
    console.error("Error generating summary:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

export default router;
