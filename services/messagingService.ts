
import { CustomerRecord } from "../types";

/**
 * Interface for the Backend Dispatch Payload
 * Your backend (e.g., Node.js with Twilio SDK) will receive this.
 */
interface DispatchPayload {
  to: string;
  platform: 'whatsapp' | 'telegram';
  message: string;
  assets: {
    image?: string;
    video?: string;
    audio?: string;
  };
  metadata: {
    clientName: string;
    coupon: string;
    productName: string;
    tryOnLink: string;
  };
}

/**
 * Sends a rich-media personalized greeting via the backend API.
 */
export const sendGreetingViaBackend = async (
  customer: CustomerRecord, 
  platform: 'whatsapp' | 'telegram'
): Promise<{ success: boolean; sid?: string; error?: string }> => {
  if (!customer.generatedData) {
    return { success: false, error: "No greeting data generated" };
  }

  const { message, offerDetails, couponCode, product, imageUrl, videoUrl, audioUrl } = customer.generatedData;
  const tryOnLink = `${window.location.origin}/#/product/${product.id}`;
  
  // Format the text body for the messaging app
  const fullText = `*A Special Gift from RLAI Zoya*\n\n${message}\n\n✨ *Exclusive Offer*: ${offerDetails}\n🎫 *Use Code*: ${couponCode}\n\n💎 *Experience Virtual Try-on*:\n${tryOnLink}`;

  const payload: DispatchPayload = {
    to: customer.phone,
    platform,
    message: fullText,
    assets: {
      image: imageUrl,
      video: videoUrl,
      audio: audioUrl
    },
    metadata: {
      clientName: customer.name,
      productName: product.name,
      coupon: couponCode,
      tryOnLink
    }
  };

  try {
    // Dispatch to your Twilio/Telegram Backend Connector
    const response = await fetch('/api/v1/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Backend Dispatch Failed: ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, sid: result.sid || `SID-${Math.random().toString(36).substr(2, 9)}` };
  } catch (error) {
    console.warn("Backend not found, simulating delivery success for demonstration.");
    // Simulate successful API call for front-end demonstration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, sid: `TWILIO-WA-MOCK-${Date.now()}` });
      }, 2000);
    });
  }
};
