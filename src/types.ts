export type PageId = 'home' | 'services' | 'gallery' | 'reviews' | 'book' | 'faq';

export interface NailService {
  id: string;
  name: string;
  price: number;
  category: 'manicure' | 'pedicure' | 'acrylics' | 'addons' | 'kids';
  description: string;
  isAddon?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
  description: string;
}

export interface Review {
  id: string;
  rating: number;
  text: string;
  author: string;
  date: string;
  avatarLetter: string;
  sticker?: string;
}

export interface AppointmentRequest {
  name: string;
  phone: string;
  email: string;
  serviceId: string;
  addons: string[];
  artist: string;
  date: string;
  time: string;
  specialRequests: string;
}

export interface NailArtist {
  id: string;
  name: string;
  vibe: string;
  bio: string;
  favoriteDesign: string;
  availabilities: string[];
}
