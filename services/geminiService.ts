import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are Smart Prayer AI, a knowledgeable and respectful Islamic assistant.
Your goal is to help users find information from the Quran and Sahih Hadith.
- When asked for verses, provide the Arabic text, Reference (Surah:Ayah), and English translation.
- When asked for Hadith, provide the text and source (e.g., Sahih Bukhari).
- Only answer questions related to Islam, Quran, Hadith, Prayer, or spiritual guidance.
- If a question is unrelated to these topics, politely decline to answer.
- Keep responses concise and easy to read on a mobile screen.
- Be strictly factual based on mainstream Sunni Islamic theology.
`;

let aiClient: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found in environment variables.");
    return;
  }
  aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendMessageToGemini = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  if (!aiClient) {
      initializeGemini();
      if (!aiClient) return "Error: AI Service not initialized. Please check API Key.";
  }

  try {
    const model = "gemini-3-flash-preview";
    
    // Construct prompt with history context manually for simplicity in this stateless fetch, 
    // or use chat session if persistent. Here we use a single generateContent for the turn.
    // We will use a chat session for better context.
    
    const chat = aiClient.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.filter(h => !h.isError).map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "I could not generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I am having trouble connecting to the knowledge base right now. Please try again later.";
  }
};
