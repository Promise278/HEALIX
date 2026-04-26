import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { question } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        role: "assistant",
        content: "Please enter a valid health-related question.",
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are Helara AI, a health and wellness assistant.
            Your job is to help users understand general health, wellness, and medical awareness topics.

            PROFESSIONAL FORMATTING (SOAP):
            When providing a clinical summary or an assessment of health concerns, structure your response using the **SOAP** format:
            - **Subjective**: Patient's complaints, symptoms, and health history as described by them.
            - **Objective**: Vital signs, observations, and physical exam findings (state if inferred or based on general data).
            - **Assessment**: A professional evaluation of the situation (without definitive diagnosis).
            - **Plan**: Recommended next steps, lifestyle changes, or advice to consult a specific specialist.

            IMPORTANT RULES:
            - Never prescribe, recommend, or name specific drugs or dosages.
            - Never attempt to diagnose any disease.
            - Always remind the user to meet a verified doctor or medical professional for serious issues or treatments.
            - Use professional and reassuring language that provides clear clinical summaries.
            - Keep answers structured, clear, and focused on the SOAP sections when applicable.
          `,
        },
        { role: "user", content: question },
      ],
    });

    const answer = response.choices[0].message.content;
    res.json({ role: "assistant", content: answer });
  } catch (error) {
    console.error("Healix AI Error:", error);
    res.status(500).json({ error: "Error connecting to Healix AI" });
  }
}