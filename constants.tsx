
import { Category, Product, StoreLocation } from './types';

export const STORE_LOCATIONS: StoreLocation[] = [
  { id: 'l1', city: 'Lucknow', name: 'TANISHQ - Hazratganj Flagship', address: 'Omaxe Hazratganj, Hazratganj Crossing, Lucknow, UP', isHeadOffice: true, lat: 26.8467, lng: 80.9462 },
  { id: 'l2', city: 'Lucknow', name: 'TANISHQ - Gomti Nagar', address: 'Patrakarpuram Crossing, Gomti Nagar, Lucknow', lat: 26.8529, lng: 80.9947 },
  { id: 'v1', city: 'Varanasi', name: 'TANISHQ - Sigra', address: 'Sigra Chauraha, Varanasi, UP', lat: 25.3197, lng: 82.9904 },
  { id: 'k1', city: 'Kanpur', name: 'TANISHQ - Mall Road', address: 'Z Square Mall Road, Kanpur, UP', lat: 26.4695, lng: 80.3478 }
];

export const JEWELRY_PRODUCTS: Product[] = [
  { 
    id: 't-royal-gold', 
    name: 'Royal Gold Necklace', 
    price: 485000, 
    category: Category.NECKLACE, 
    description: 'An exquisite 22KT gold necklace featuring intricate traditional craftsmanship and royal motifs.', 
    image: '/new_jewellery5.jpg' 
  },
  { 
    id: 't-wing-crest', 
    name: 'Wing Crest Diamond Necklace', 
    price: 820000, 
    category: Category.NECKLACE, 
    description: 'A contemporary masterpiece featuring brilliant-cut diamonds arranged in a majestic wing-inspired crest.', 
    image: '/jewelleryOne.jpeg' 
  },
  { 
    id: 't-sculpted-wing', 
    name: 'Sculpted Wing Diamond Pendant', 
    price: 145000, 
    category: Category.NECKLACE, 
    description: 'Elegant diamond pendant sculpted with precision to represent the freedom and grace of soaring wings.', 
    image: '/jewelleryTwo.jpeg' 
  },
   { 
    id: 't-soaring-wing', 
    name: 'Soaring Wing Diamond Necklace', 
    price: 950000, 
    category: Category.NECKLACE, 
    description: 'A high-luxury diamond necklace that captures the ethereal beauty of wings in motion.', 
    image: '/jewelleryThree.jpeg' 
  },
  // { 
  //   id: 't-classy-ring-ms', 
  //   name: 'Classy Ring Mangalsutra', 
  //   price: 85000, 
  //   category: Category.NECKLACE, 
  //   description: 'A modern take on tradition, this Mangalsutra features a sleek ring pendant in 18KT gold with diamond accents.', 
  //   image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=1200' 
  // },
  // { 
  //   id: 't-oceanic-whisper-ms', 
  //   name: 'Oceanic Whisper Mangalsutra', 
  //   price: 92000, 
  //   category: Category.NECKLACE, 
  //   description: 'Inspired by the gentle waves, this Mangalsutra combines black beads with a fluid, diamond-studded design.', 
  //   image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=1200' 
  // },
  // { 
  //   id: 't-opulent-divine-ms', 
  //   name: 'Opulent Divine Gold Mangalsutra', 
  //   price: 155000, 
  //   category: Category.NECKLACE, 
  //   description: 'A traditional masterpiece in 22KT gold featuring divine motifs and heavy gold work.', 
  //   image: 'https://images.unsplash.com/photo-1598560912298-012be2f11860?auto=format&fit=crop&q=80&w=1200' 
  // },
  // { 
  //   id: 't-mini-melody-earrings', 
  //   name: 'Mini Melody Gold Jhumkas', 
  //   price: 32000, 
  //   category: Category.EARRINGS, 
  //   description: 'Delightful 22KT gold jhumka earrings for kids, designed with lightweight comfort and melody-inspired patterns.', 
  //   image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=1200' 
  // },
  // { 
  //   id: 't-little-blossom-earrings', 
  //   name: 'Little Blossom Gold Jhumkas', 
  //   price: 28000, 
  //   category: Category.EARRINGS, 
  //   description: 'Floral-inspired 22KT gold jhumkas for children, bringing a touch of nature and heritage.', 
  //   image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&q=80&w=1200' 
  // },
  // { 
  //   id: 't-ebullient-set', 
  //   name: 'Ebullient Gold Necklace Set', 
  //   price: 640000, 
  //   category: Category.NECKLACE, 
  //   description: 'A grand set comprising a heavy gold necklace and matching earrings, perfect for celebratory milestones.', 
  //   image: 'https://images.unsplash.com/photo-1512464493322-304301675c2e?auto=format&fit=crop&q=80&w=1200' 
  // },
  // { 
  //   id: 't-laxmi-motif', 
  //   name: 'Laxmi Motif Gold Necklace', 
  //   price: 520000, 
  //   category: Category.NECKLACE, 
  //   description: 'Divine 22KT gold necklace featuring the auspicious Laxmi motif, symbolizing prosperity and heritage.', 
  //   image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1200' 
  // }
];
