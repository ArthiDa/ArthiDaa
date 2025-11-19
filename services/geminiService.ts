import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";

// Safe initializer that prioritizes user key, then process.env
const getAIClient = async (providedKey?: string) => {
  // If user provides a key, use it directly
  if (providedKey) {
    return new GoogleGenAI({ apiKey: providedKey });
  }

  // @ts-ignore - window.aistudio is injected in specific Google environments
  if (typeof window !== 'undefined' && window.aistudio && window.aistudio.hasSelectedApiKey) {
     // @ts-ignore
     const hasKey = await window.aistudio.hasSelectedApiKey();
     if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
     }
  }
  
  // Fallback to env var which is populated by aistudio selection or build env
  const apiKey = process.env.API_KEY || '';
  return new GoogleGenAI({ apiKey });
};

export const generateWithSearch = async (
  query: string, 
  apiKey: string, 
  modelId: string = 'gemini-2.5-flash',
  onToken?: (token: string) => void
): Promise<{ text: string; links: any[] }> => {
  try {
    let ai = await getAIClient(apiKey);
    
    const performRequest = async (client: GoogleGenAI) => {
      return await client.models.generateContentStream({
        model: modelId,
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
          // Do NOT set responseMimeType or responseSchema when using googleSearch
        },
      });
    };

    let stream;

    try {
      stream = await performRequest(ai);
    } catch (e: any) {
      // Specific handling for "Requested entity was not found" when using system key
      // @ts-ignore
      if (e.message?.includes("Requested entity was not found") && !apiKey && typeof window !== 'undefined' && window.aistudio) {
         // @ts-ignore
         await window.aistudio.openSelectKey();
         ai = await getAIClient(); // Get fresh client with new key
         stream = await performRequest(ai); // Retry once
      } else {
        throw e;
      }
    }

    let fullText = '';
    let groundingChunks: any[] = [];

    for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
            fullText += text;
            if (onToken) onToken(text);
        }
        
        // Extract grounding chunks if present
        if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            groundingChunks = chunk.candidates[0].groundingMetadata.groundingChunks;
        }
    }
    
    return {
      text: fullText || "No response generated.",
      links: groundingChunks
    };
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
};

export const generateVeoVideo = async (
  prompt: string, 
  imageBase64: string, 
  mimeType: string,
  aspectRatio: '16:9' | '9:16',
  apiKey: string,
  modelId: string = 'veo-3.1-fast-generate-preview'
): Promise<string> => {
  try {
    let ai = await getAIClient(apiKey);
    
    // Strip data URL prefix if present to get raw base64
    const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

    const startOperation = async (client: GoogleGenAI) => {
      return await client.models.generateVideos({
        model: modelId,
        prompt: prompt || "Animate this image cinematically.",
        image: {
          imageBytes: cleanBase64,
          mimeType: mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });
    };

    let operation;
    try {
      operation = await startOperation(ai);
    } catch (e: any) {
      // Specific handling for "Requested entity was not found" when using system key
      // @ts-ignore
      if (e.message?.includes("Requested entity was not found") && !apiKey && typeof window !== 'undefined' && window.aistudio) {
         // @ts-ignore
         await window.aistudio.openSelectKey();
         ai = await getAIClient(); // Get fresh client with new key
         operation = await startOperation(ai); // Retry once
      } else {
        throw e;
      }
    }

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) throw new Error("No video URI returned.");

    // Fetch the actual video bytes using the key
    // Must append API key when fetching from the download link. 
    // If manual key is provided, use it. Otherwise try process.env.API_KEY
    const effectiveKey = apiKey || process.env.API_KEY || '';
    const fetchUrl = `${videoUri}&key=${effectiveKey}`;
    
    return fetchUrl;

  } catch (error) {
    console.error("Veo Error:", error);
    throw error;
  }
};