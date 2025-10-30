// import OpenAI from "openai";
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function askHealixAI(req, res) {
//   const { question } = req.body;

//   const completion = await openai.chat.completions.create({
//     model: "gpt-5",
//     messages: [
//       {
//         role: "system",
//         content: `
//             You are Healix, a helpful and empathetic virtual health assistant.
//             Your job is to provide general, evidence-based health information and guidance on wellness, symptoms, and healthy living.
//             You are NOT a medical professional and you must NOT:
//             - Diagnose medical conditions
//             - Recommend or prescribe medications
//             - Suggest specific treatments or doses

//             If the user asks for drug names, diagnoses, or prescriptions, politely remind them:
//             "I'm not a medical professional, so I can't provide a diagnosis or prescribe medication. Please consult a licensed doctor or pharmacist for that."

//             You can:
//             - Educate users about possible causes or prevention of symptoms (in a general sense)
//             - Share information from trusted sources (like WHO or CDC)
//             - Encourage seeing a healthcare provider for personalized care.
//             Always be kind, clear, and safety-focused.
//         `,
//       },
//       {
//         role: "user",
//         content: question,
//       },
//     ],
//   });

//   res.json({ answer: completion.choices[0].message.content });
// }

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

            IMPORTANT RULES:
            - Never prescribe, recommend, or name specific drugs or dosages.
            - Never attempt to diagnose any disease.
            - Always remind the user to meet a verified doctor or medical professional for serious issues or treatments.
            - Use simple, friendly language that educates, not instructs.
            - Keep answers short, clear, and reassuring.
          `,
        },
        { role: "user", content: question },
      ],
    });

    const answer = response.choices[0].message.content;
    res.json({ role: "assistant", content: answer });
  } catch (error) {
    console.error("❌ Healix AI Error:", error);
    res.status(500).json({ error: "Error connecting to Healix AI" });
  }
}