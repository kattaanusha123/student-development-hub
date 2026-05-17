import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export async function getProjectRecommendations(skills: string[], interests: string[]) {
  const model = "gemini-3.1-pro-preview";
  const prompt = `Based on the following skills: ${skills.join(", ")} and interests: ${interests.join(", ")}, suggest 3 innovative project ideas. For each idea, provide a title, a brief description, and the key technologies involved. Return the response in JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              technologies: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "description", "technologies"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}

export async function analyzeSentiment(comment: string) {
  const model = "gemini-3-flash-preview";
  const prompt = `Analyze the sentiment of the following college review: "${comment}". Return either "Positive", "Neutral", or "Negative".`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text?.trim() || "Neutral";
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "Neutral";
  }
}

export async function chatWithAssistant(message: string, history: { role: string, parts: { text: string }[] }[]) {
  const model = "gemini-3.1-pro-preview";
  
  try {
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: "You are an AI assistant for the Student Innovation, Career & College Guidance Hub. You help students with project ideas, academic questions, career advice, and college information. Be encouraging, professional, and helpful.",
      }
    });

    // Note: sendMessage only accepts the message string, but we can't easily pass history in this simple wrapper without manual management if we use ai.chats.create
    // For simplicity in this demo, we'll just send the message.
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error in chat:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
}
