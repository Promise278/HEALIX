import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { question, history } = req.body;

    // Maintain conversation history
    let messages = history || [];
    
    // If a single question is provided (legacy or first message), add it to messages
    if (question && (!history || history.length === 0)) {
      messages.push({ role: "user", content: question });
    } else if (question) {
      // In multi-turn, question would be the latest user input
      messages.push({ role: "user", content: question });
    }

    if (messages.length === 0) {
      return res.status(400).json({
        role: "assistant",
        content: "Please enter a valid health-related question.",
      });
    }

    // Count user turns to determine stage (Initial + 3 follow-ups = 4 turns)
    const userTurns = messages.filter(m => m.role === "user").length;

    let stageInstruction = "";
    if (userTurns < 4) {
      stageInstruction = `
        CURRENT STAGE: Gathering Information (${userTurns}/4 turns)
        Your goal is to ask exactly ONE relevant and concise follow-up question to better understand the patient's condition. 
        Do not provide a full summary or SOAP report yet. 
        Focus on symptoms, duration, or severity.
      `;
    } else {
      stageInstruction = `
        CURRENT STAGE: Final Assessment (SOAP Report)
        You have gathered enough information. Provide a professional and structured clinical summary using the **SOAP** format.
      `;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
            You are Helara AI, a health and wellness assistant.
            Your job is to help users understand general health, wellness, and medical awareness topics.

            ${stageInstruction}

            PROFESSIONAL FORMATTING (SOAP):
            When providing a clinical summary, structure your response using the **SOAP** format:
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
        ...messages,
      ],
    });

    const answer = response.choices[0].message.content;
    res.json({ role: "assistant", content: answer, turnCount: userTurns });
  } catch (error) {
    console.error("Healix AI Error:", error);
    res.status(500).json({ error: "Error connecting to Healix AI" });
  }
}