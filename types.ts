
export enum Category {
  NECKLACE = 'Necklaces',
  RING = 'Rings',
  EARRINGS = 'Earrings',
  BRACELET = 'Bracelets'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  overlayImage?: string;
}

export interface StoreLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  isHeadOffice?: boolean;
  lat: number;
  lng: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  event?: 'Birthday' | 'Anniversary' | 'Generic';
  relation?: string;
  tone?: 'Elegant' | 'Casual' | 'Emotional';
}

export interface SavedSnapshot {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  imageUrl: string;
  timestamp: number;
}

export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  gender: string;
  event: string;
  relation: string;
  tone: string;
  // Fix: Added generatedData field to track AI-generated assets for outbound messaging
  generatedData?: {
    message: string;
    offerDetails: string;
    couponCode: string;
    product: Product;
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
  };
}

export interface TryOnHistoryItem {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  resultImage: string;
  timestamp: number;
}
