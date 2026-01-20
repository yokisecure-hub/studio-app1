import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment variables.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const translateSubject = async (japaneseText: string): Promise<string> => {
  if (!japaneseText.trim()) return "";
  
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Translate the following Japanese text into descriptive, high-quality English suitable for an AI image generation prompt. 
      Only return the translated English text, no explanations.
      
      Japanese Text: "${japaneseText}"`,
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Translation error:", error);
    // Fallback: return original text if API fails, though ideally we want English.
    return japaneseText; 
  }
};