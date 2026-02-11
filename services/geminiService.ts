
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { UserProfile, Product } from "../types";

const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GreetingData {
  message: string;
  imagePrompt: string;
  videoPrompt: string;
  couponCode: string;
  offerDetails: string;
}

export const generateGreetingMessage = async (profile: UserProfile, productName: string): Promise<GreetingData> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a luxury marketing consultant for 'TANISHQ Jewelry'. 
               Generate a personalized digital greeting package for ${profile.name} for their ${profile.event}.
               
               Context:
               - Relationship: ${profile.relation}
               - Tone: ${profile.tone}
               - Featured Product: ${productName}
               
               Tasks:
               1. Write a warm, high-end greeting message from Tanishq.
               2. Create a luxury privilege coupon (e.g., TANISHQ-ROYAL-2025).
               3. Define a compelling boutique offer.
               4. Write image/video prompts reflecting Tanishq's pure gold heritage.
               
               Return ONLY a JSON object with keys: "message", "imagePrompt", "videoPrompt", "couponCode", "offerDetails".`,
    config: {
      temperature: 0.8,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          message: { type: Type.STRING },
          imagePrompt: { type: Type.STRING },
          videoPrompt: { type: Type.STRING },
          couponCode: { type: Type.STRING },
          offerDetails: { type: Type.STRING },
        },
        required: ["message", "imagePrompt", "videoPrompt", "couponCode", "offerDetails"]
      }
    }
  });
  
  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return {
      message: `Wishing you a sparkling ${profile.event} from TANISHQ.`,
      imagePrompt: `A luxury Tanishq ${productName} in a celebratory setting.`,
      videoPrompt: `Cinematic macro shot of a ${productName}.`,
      couponCode: "TANISHQ-LUXE",
      offerDetails: "Special Boutique Discount"
    };
  }
};

export const recommendJewelry = async (transcript: string, products: Product[]): Promise<string[]> => {
  const ai = getAIClient();
  const productData = products.map(p => ({ id: p.id, name: p.name, desc: p.description, cat: p.category }));
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a senior Tanishq style advisor.
               A customer says: "${transcript}"
               
               Based on this, select the top 4 most relevant Tanishq product IDs from this list:
               ${JSON.stringify(productData)}
               
               Provide the response as a JSON array of strings containing ONLY the IDs.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    return [];
  }
};

export const performAITryOn = async (userImageBase64: string, jewelryImageBase64: string, productCategory: string, productName: string, environment: string = 'Tanishq Flagship Boutique') => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: userImageBase64.split(',')[1], mimeType: 'image/jpeg' } },
        { inlineData: { data: jewelryImageBase64.split(',')[1], mimeType: 'image/jpeg' } },
        { text: `TANISHQ PRECISION TRY-ON:
          
          TASK: Apply the EXACT ${productCategory} from IMAGE 2 onto the person in IMAGE 1.
          
          MANDATORY FIDELITY CONSTRAINTS:
          - Image 2 is the "Master Asset" (Tanishq ${productName}). 
          - CLONE THE DESIGN: Do not re-imagine the patterns, stones, or metal texture.
          - POSITIONING: Place necklace around neck, rings on fingers, or earrings on ears with 100% anatomical accuracy.
          - LIGHTING: Blend with the person's photo but maintain the high-end Tanishq gold brilliance.
          
          Final result must be a pixel-perfect Tanishq marketing editorial image.` }
      ],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const changeOutfit = async (tryOnResultBase64: string, outfitPrompt: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: tryOnResultBase64.split(',')[1], mimeType: 'image/jpeg' } },
        { text: `TANISHQ AI WARDROBE REIMAGINING:
          
          The person in the image is already wearing a Tanishq jewelry masterpiece.
          
          TASK: Swap the person's clothing and setting to: ${outfitPrompt}.
          
          STRICT CONSTRAINTS (IMPORTANT):
          1. LOCK THE JEWELRY: The jewelry (necklace/earrings/rings) is a fixed asset. DO NOT change its design, color, stones, or position.
          2. UPDATE THE ATTIRE: Only modify the clothes, hairstyle, and background to create a luxurious fashion look.
          3. COMPLEMENTARY STYLE: Ensure the new clothing neckline highlights the jewelry perfectly.
          
          Output must be a high-resolution Tanishq digital portrait.` }
      ],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

/**
 * AI Image Enhancement for Admin
 * Allows admins to modify product photos (e.g., "Add professional studio lighting", "Change background to luxury velvet")
 */
export const editProductImage = async (imageBase64: string, prompt: string) => {
  const ai = getAIClient();
  // Standardize MIME type from the base64 string if possible
  const mimeType = imageBase64.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: imageBase64.split(',')[1], mimeType } },
        { text: `TANISHQ STUDIO EDIT: 
                 You are a professional jewelry photographer. 
                 MODIFICATION REQUEST: ${prompt}
                 
                 CONSTRAINTS:
                 - Maintain the absolute physical integrity of the jewelry itself.
                 - Enhance lighting, clarity, and background according to the request.
                 - The final image must look like a professional Tanishq catalog shot.` }
      ],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};

export const generateGreetingAudio = async (text: string): Promise<string | null> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Say with extreme elegance and warmth: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio ? `data:audio/pcm;base64,${base64Audio}` : null;
  } catch (e) { return null; }
};

export const generateGreetingCard = async (prompt: string): Promise<string | null> => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: `Tanishq luxury heritage lifestyle: ${prompt}. Cinematic lighting, royal Indian vibes.` }],
    },
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
  }
  return null;
};
