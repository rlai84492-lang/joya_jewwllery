
import { Category, Product, StoreLocation } from './types';

export const STORE_LOCATIONS: StoreLocation[] = [
  { id: 'l1', city: 'Lucknow', name: 'Zoya - Hazratganj Flagship', address: 'Omaxe Hazratganj, Hazratganj Crossing, Lucknow, UP', isHeadOffice: true, lat: 26.8467, lng: 80.9462 },
  { id: 'l2', city: 'Lucknow', name: 'Zoya - Gomti Nagar', address: 'Patrakarpuram Crossing, Gomti Nagar, Lucknow', lat: 26.8529, lng: 80.9947 },
  { id: 'v1', city: 'Varanasi', name: 'Zoya - Sigra', address: 'Sigra Chauraha, Varanasi, UP', lat: 25.3197, lng: 82.9904 },
  { id: 'k1', city: 'Kanpur', name: 'Zoya - Mall Road', address: 'Z Square Mall Road, Kanpur, UP', lat: 26.4695, lng: 80.3478 }
];

// export const JEWELRY_PRODUCTS: Product[] = [
//   { 
//     id: 't-royal-gold', 
//     name: 'My Embrace pendant', 
//     price: 485000, 
//     category: Category.NECKLACE, 
//     description: 'An exquisite 22KT gold necklace featuring intricate traditional craftsmanship and royal motifs.', 
//     image: '/zoya_1.webp' 
//   },
//   { 
//     id: 't-wing-crest', 
//     name: 'Wing Crest Diamond Necklace', 
//     price: 820000, 
//     category: Category.NECKLACE, 
//     description: 'A contemporary masterpiece featuring brilliant-cut diamonds arranged in a majestic wing-inspired crest.', 
//     image: '/zoya_2.webp' 
//   },
//   { 
//     id: 't-sculpted-wing', 
//     name: 'Sculpted Wing Diamond Pendant', 
//     price: 145000, 
//     category: Category.NECKLACE, 
//     description: 'Elegant diamond pendant sculpted with precision to represent the freedom and grace of soaring wings.', 
//     image: '/zoya_3.webp' 
//   },
//    { 
//     id: 't-soaring-wing', 
//     name: 'Soaring Wing Diamond Necklace', 
//     price: 950000, 
//     category: Category.NECKLACE, 
//     description: 'A high-luxury diamond necklace that captures the ethereal beauty of wings in motion.', 
//     image: '/zoya_4.webp' 
//   },
  
// ];


export const JEWELRY_PRODUCTS: Product[] = [
  {
    id: 'zoya-1',
    name: 'My Embrace pendant',
    price: 175000,
    category: Category.NECKLACE,
    description: 'My Embrace pendant',
    image: '/zoya_1.webp'
  },
  {
    id: 'zoya-2',
    name: 'My Embrace pendant, 1 Diamond',
    price: 218000,
    category: Category.NECKLACE,
    description: 'My Embrace pendant, 1 Diamond',
    image: '/zoya_2.webp'
  },
  {
    id: 'zoya-3',
    name: 'My Embrace Earrings, 1 Diamond',
    price: 250000,
    category: Category.EARRINGS,
    description: 'My Embrace Earrings, 1 Diamond',
    image: '/zoya_3.webp'
  },
  {
    id: 'zoya-4',
    name: 'My Embrace ring, Slim, 1 diamond',
    price: 310000,
    category: Category.RING,
    description: 'My Embrace ring, Slim, 1 diamond',
    image: '/zoya_4.webp'
  },
  {
    id: 'zoya-5',
    name: 'My Embrace ring, Slim, 1 diamond',
    price: 345000,
    category: Category.RING,
    description: 'My Embrace ring, Slim, 1 diamond',
    image: '/zoya_5.webp'
  },
  {
    id: 'zoya-6',
    name: 'My Embrace bracelet, 1 diamond',
    price: 345000,
    category: Category.BRACELET,
    description: 'My Embrace bracelet, 1 diamond',
    image: '/zoya_6.webp'
  },
  {
    id: 'zoya-7',
    name: 'My Embrace Earrings, 1 diamond',
    price: 348000,
    category: Category.EARRINGS,
    description: 'My Embrace Earrings, 1 diamond',
    image: '/zoya_7.webp'
  },
  {
    id: 'zoya-8',
    name: 'My Embrace Earrings, 1 Diamond',
    price: 410000,
    category: Category.EARRINGS,
    description: 'My Embrace Earrings, 1 Diamond',
    image: '/zoya_8.webp'
  },
  {
    id: 'zoya-9',
    name: 'My Embrace ring, 1 Diamond',
    price: 415000,
    category: Category.RING,
    description: 'My Embrace ring, 1 Diamond',
    image: '/zoya_9.webp'
  },
  {
    id: 'zoya-10',
    name: 'My Embrace ring, 1 Diamond',
    price: 480000,
    category: Category.RING,
    description: 'My Embrace ring, 1 Diamond',
    image: '/zoya_10.webp'
  },
  {
    id: 'zoya-11',
    name: 'My Embrace Earrings, 1 Diamond',
    price: 525000,
    category: Category.EARRINGS,
    description: 'My Embrace Earrings, 1 Diamond',
    image: '/zoya_11.webp'
  },
  {
    id: 'zoya-12',
    name: 'My Embrace Earring, 1 Diamond',
    price: 530000,
    category: Category.EARRINGS,
    description: 'My Embrace Earring, 1 Diamond',
    image: '/zoya_12.webp'
  },
  {
    id: 'zoya-13',
    name: 'My Embrace necklace',
    price: 535000,
    category: Category.NECKLACE,
    description: 'My Embrace necklace',
    image: '/zoya_13.webp'
  },
  {
    id: 'zoya-14',
    name: 'My Embrace necklace, 1 Diamond',
    price: 630000,
    category: Category.NECKLACE,
    description: 'My Embrace necklace, 1 Diamond',
    image: '/zoya_14.webp'
  },
  {
    id: 'zoya-15',
    name: 'My Embrace Earrings, 1 Diamond',
    price: 645000,
    category: Category.EARRINGS,
    description: 'My Embrace Earrings, 1 Diamond',
    image: '/zoya_15.webp'
  },
  {
    id: 'zoya-16',
    name: 'My Embrace bangle, Slim',
    price: 655000,
    category: Category.BRACELET,
    description: 'My Embrace bangle, Slim',
    image: '/zoya_16.webp'
  },
  {
    id: 'zoya-17',
    name: 'My Embrace necklace, 1 diamond',
    price: 745000,
    category: Category.NECKLACE,
    description: 'My Embrace necklace, 1 diamond',
    image: '/zoya_17.webp'
  },
  {
    id: 'zoya-18',
    name: 'My Embrace bangle, Slim, 2 diamonds',
    price: 785000,
    category: Category.BRACELET,
    description: 'My Embrace bangle, Slim, 2 diamonds',
    image: '/zoya_18.webp'
  },
  {
    id: 'zoya-19',
    name: 'My Embrace bangle',
    price: 920000,
    category: Category.BRACELET,
    description: 'My Embrace bangle',
    image: '/zoya_19.webp'
  },
  {
    id: 'zoya-20',
    name: 'My Embrace bangle',
    price: 920000,
    category: Category.BRACELET,
    description: 'My Embrace bangle',
    image: '/zoya_20.webp'
  },
  {
    id: 'zoya-21',
    name: 'My Embrace bangle, 1 Diamond',
    price: 0,
    category: Category.BRACELET,
    description: 'My Embrace bangle, 1 Diamond',
    image: '/zoya_21.webp'
  },
  {
    id: 'zoya-22',
    name: 'My Embrace bangle',
    price: 0,
    category: Category.BRACELET,
    description: 'My Embrace bangle',
    image: '/zoya_22.webp'
  }
];