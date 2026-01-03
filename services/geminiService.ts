
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function getBotResponse(message: string, contactName: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: message,
            config: {
                systemInstruction: `You are ${contactName}, a close friend. Respond to the message in a casual, friendly, and conversational tone. Keep your responses very brief and natural, like in a real text message conversation. Use lowercase and slang where appropriate. Do not act like an AI assistant.`,
                temperature: 0.8,
                topP: 0.9,
            },
        });

        const text = response.text;
        if (text) {
            return text;
        } else {
            return "Hmm, I'm not sure what to say.";
        }
    } catch (error) {
        console.error("Error generating content:", error);
        return "Sorry, something went wrong on my end.";
    }
}
