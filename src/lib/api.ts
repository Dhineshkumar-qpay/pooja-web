export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003/api";
export const IMAGE_BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:3003";

export const API_ENDPOINTS = {
  category: {
    getAll: "/category/get",
  },
};

// Global API instance wrapper
export const apiClient = {
  get: async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(`API GET Error (${endpoint}):`, error);
      throw error;
    }
  },
  post: async (endpoint: string, body?: any, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      return await response.json();
    } catch (error) {
      console.error(`API POST Error (${endpoint}):`, error);
      throw error;
    }
  },
};

export interface ApiCategory {
  categoryid: string;
  categoryname: string;
  thumbnailimage: string;
  description: string;
  productcount: number;
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const result = await apiClient.post(API_ENDPOINTS.category.getAll);
    if (result && result.status === 200) {
      return result.data;
    }
    return [];
  } catch (error) {
    return [];
  }
}
