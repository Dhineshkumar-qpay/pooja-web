export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Pooja {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  startingPrice: number;
  durationMinutes: number;
  locationOptions: string[];
  category: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface Order {
  id: string;
  customerId: string;
  date: string; // ISO string
  items: CartItem[];
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  trackingNumber?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
