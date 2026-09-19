export const IMAGE_BASE_URL = "http://localhost:3003";

const API_BASE_URL = "http://localhost:3003/api";

export const API_ENDPOINTS = {
  product: {
    getUser: "/product/get-user",
    getDetails: "/product/get-product-details",
  },
  auth: {
    login: "/auth/login",
    verify: "/auth/verify",
  },
  category: {
    get: "/category/get",
  },
  reviews: {
    add: "/productreviews/add",
  },
};

export const apiClient = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url, {
        cache: "no-store",
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(typeof window !== 'undefined' && localStorage.getItem('token') ? { "Authorization": `Bearer ${localStorage.getItem('token')}` } : {}),
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  },

  post: async (endpoint: string, body?: any, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url, {
        cache: "no-store",
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(typeof window !== 'undefined' && localStorage.getItem('token') ? { "Authorization": `Bearer ${localStorage.getItem('token')}` } : {}),
          ...options.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`POST ${endpoint} failed:`, error);
      throw error;
    }
  },
};

export interface ApiProduct {
  images: string[];
  productid: string;
  thumbnailimage: string;
  productname: string;
  categoryname: string;
  categoryid: string;
  brand: string;
  description: string;
  price: string;
  sellingprice: string;
  stockquantity: number;
  dimensions: string;
  benefits: string;
  countryoforigin: string;
  isFeatured: boolean;
  isNewarrival: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCategory {
  categoryid: string;
  categoryname: string;
  thumbnailimage?: string;
  description?: string;
  productcount?: number;
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.category.get);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchProducts(body = {}): Promise<ApiProduct[]> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.product.getUser, body);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export interface ProductDetailsResponse {
  message: string;
  data: ApiProduct & { reviews?: any[] };
  relatedproducts: ApiProduct[];
}

export async function fetchProductDetails(id: string): Promise<ProductDetailsResponse | null> {
  try {
    const response = await apiClient.post(`${API_ENDPOINTS.product.getDetails}/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
}

export interface ApiReview {
  reviewid: string;
  productid: string;
  productname: string;
  userid: string;
  rating: number;
  reviewtitle: string;
  reviewdescription: string;
  createdAt: string;
  updatedAt: string;
}

export async function addProductReview(body: any) {
  try {
    const response = await apiClient.post(API_ENDPOINTS.reviews.add, body);
    return response;
  } catch (error) {
    console.error("Error adding product review:", error);
    throw error;
  }
}

export async function loginUser(email: string) {
  try {
    return await apiClient.post(API_ENDPOINTS.auth.login, { email });
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function verifyOtp(email: string, otp: string) {
  try {
    return await apiClient.post(API_ENDPOINTS.auth.verify, { email, otp });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
}


