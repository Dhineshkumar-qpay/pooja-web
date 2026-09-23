export const IMAGE_BASE_URL = "http://localhost:3003";

const API_BASE_URL = "http://localhost:3003/api";

export const API_ENDPOINTS = {
  product: {
    getUser: "/product/get-user",
    getDetails: "/product/get-product-details",
    search: "/product/search",
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
  coupon: {
    get: "/coupon/get",
  },
  banner: {
    get: "/banner/get",
  },
  cart: {
    add: "/cart/add",
    buyNow: "/cart/buynow",
    increase: "/cart/increase",
    decrease: "/cart/decrease",
    delete: "/cart/delete",
    applyCoupon: "/cart/apply-coupon",
    count: "/cart/count",
    get: "/cart/get",
  },
  address: {
    add: "/address/add",
    edit: "/address/edit",
    get: "/address/get",
    delete: "/address/delete",
  },
  orders: {
    getUser: "/orders/user",
    getDetails: "/orders/details",
    placeOrder: "/orders/place-order",
    verifyPayment: "/orders/verify-payment",
    buyAgain: "/orders/buy-again",
  },
  testimonials: {
    add: "/testimonials/add",
    get: "/testimonials/get",
  },
  contact: {
    submit: "/contactus/submit",
  },
  favourite: {
    add: "/favourite/add",
    delete: "/favourite/delete",
    get: "/favourite/get",
  }
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
  averagerating?: number;
  totalrating?: number;
  isFavourite?: boolean;
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

export async function searchProducts(query: string): Promise<ApiProduct[]> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.product.search, { query });
    return response.data || [];
  } catch (error) {
    console.error("Error searching products:", error);
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

// Cart APIs
export interface ApiCartItem {
  cartid: string;
  userid: string;
  productid: string;
  quantity: number;
  Product: {
    thumbnailimage: string;
    productname: string;
    categoryname: string;
    price: string;
    sellingprice: string;
  };
}

export interface ApiCartResponse {
  cartItems: ApiCartItem[];
  totalamount: string;
}

export async function addToCart(productid: string) {
  try {
    return await apiClient.post(API_ENDPOINTS.cart.add, { productid });
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export async function buyNow(productid: string) {
  try {
    return await apiClient.post(API_ENDPOINTS.cart.buyNow, { productid });
  } catch (error) {
    console.error("Error with buy now:", error);
    throw error;
  }
}

export async function applyCouponToCart(couponcode: string) {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINTS.cart.applyCoupon}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(typeof window !== 'undefined' && localStorage.getItem('token') ? { "Authorization": `Bearer ${localStorage.getItem('token')}` } : {}),
      },
      body: JSON.stringify({ couponcode }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error applying coupon:", error);
    throw error;
  }
}

export async function getCartCount() {
  try {
    const res = await apiClient.post(API_ENDPOINTS.cart.count);
    return res.count || 0;
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return 0;
  }
}

export async function getCart(): Promise<ApiCartResponse | null> {
  try {
    const res = await apiClient.post(API_ENDPOINTS.cart.get);
    return res.data || null;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export async function increaseCartItem(cartid: string) {
  try {
    return await apiClient.post(`${API_ENDPOINTS.cart.increase}/${cartid}`);
  } catch (error) {
    console.error("Error increasing cart item:", error);
    throw error;
  }
}

export async function decreaseCartItem(cartid: string) {
  try {
    return await apiClient.post(`${API_ENDPOINTS.cart.decrease}/${cartid}`);
  } catch (error) {
    console.error("Error decreasing cart item:", error);
    throw error;
  }
}

export async function deleteCartItem(cartid: string) {
  try {
    return await apiClient.post(`${API_ENDPOINTS.cart.delete}/${cartid}`);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
}

// Address APIs
export interface ApiAddress {
  addressid: string;
  userid: string;
  firstname: string;
  lastname: string;
  phone: string;
  addressline1: string;
  addressline2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export async function addAddress(body: Partial<ApiAddress>) {
  try {
    return await apiClient.post(API_ENDPOINTS.address.add, body);
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
}

export async function editAddress(addressid: string, body: Partial<ApiAddress>) {
  try {
    return await apiClient.post(`${API_ENDPOINTS.address.edit}/${addressid}`, body);
  } catch (error) {
    console.error("Error editing address:", error);
    throw error;
  }
}

export async function getAddresses(): Promise<ApiAddress[]> {
  try {
    // assuming GET is expected to be POST due to custom backend architecture (like getCart)
    const res = await apiClient.post(API_ENDPOINTS.address.get);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return [];
  }
}

export async function deleteAddress(addressid: string) {
  try {
    return await apiClient.post(`${API_ENDPOINTS.address.delete}/${addressid}`);
  } catch (error) {
    console.error("Error deleting address:", error);
    throw error;
  }
}

// Orders APIs
export interface ApiOrderItem {
  orderitemid: string;
  productid: string;
  productname: string;
  productimage: string;
  quantity: number;
  price: number;
}

export interface ApiOrder {
  orderid: string;
  userid: string;
  addressid: string;
  totalamount: number;
  subtotal?: string;
  couponcode?: string;
  discountprice?: string;
  paymentstatus: string;
  orderstatus: string;
  shippingprice: number;
  razorpayorderid?: string;
  razorpaypaymentid?: string;
  razorpaysignature?: string;
  createdAt: string;
  updatedAt?: string;
  orderitems: ApiOrderItem[];
}

export interface ApiOrderDetailsResponse {
  orderdetails: ApiOrder;
  address: ApiAddress;
}

export async function getUserOrders(): Promise<ApiOrder[]> {
  try {
    const res = await apiClient.post(API_ENDPOINTS.orders.getUser);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

export async function getOrderDetails(orderid: string): Promise<ApiOrderDetailsResponse | null> {
  try {
    const res = await apiClient.post(API_ENDPOINTS.orders.getDetails, { orderid });
    return res.data || null;
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
}

export async function placeOrder(addressid: string, couponcode?: string) {
  try {
    const body: any = { addressid };
    if (couponcode) {
      body.couponcode = couponcode;
    }
    const res = await apiClient.post(API_ENDPOINTS.orders.placeOrder, body);
    return res;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
}

export async function buyAgain(orderid: string) {
  try {
    const res = await apiClient.post(API_ENDPOINTS.orders.buyAgain, { orderid });
    return res;
  } catch (error) {
    console.error("Error buying again:", error);
    throw error;
  }
}

export async function verifyPayment(data: { orderid: string, razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }) {
  try {
    const res = await apiClient.post(API_ENDPOINTS.orders.verifyPayment, data);
    return res;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
}

// Testimonial APIs
export interface ApiTestimonial {
  testimonialid: string;
  fullname: string;
  location: string;
  title: string;
  rating: number;
  review: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function getTestimonials(status: string = "active"): Promise<ApiTestimonial[]> {
  try {
    const response = await apiClient.post(API_ENDPOINTS.testimonials.get, { status });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

export async function addTestimonial(body: { fullname: string; location: string; title: string; rating: number; review: string }) {
  try {
    const response = await apiClient.post(API_ENDPOINTS.testimonials.add, body);
    return response;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw error;
  }
}

// Contact APIs
export async function submitContact(body: { name: string; email: string; phone: string; subject: string; message: string }) {
  try {
    return await apiClient.post(API_ENDPOINTS.contact.submit, body);
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
}

// Coupon APIs
export interface ApiCoupon {
  couponid: string;
  couponcode: string;
  type: string;
  value: string;
  minorder: string;
  expiry: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCoupons(): Promise<ApiCoupon[]> {
  try {
    const res = await apiClient.post(API_ENDPOINTS.coupon.get);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return [];
  }
}

// Banner APIs
export interface ApiBanner {
  bannerid: string;
  bannerimage: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export async function getBanners(): Promise<ApiBanner[]> {
  try {
    const res = await apiClient.post(API_ENDPOINTS.banner.get);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

// Favourite APIs
export interface ApiFavourite {
  favouriteid: string;
  userid: string;
  productid: string;
  images: string[];
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

export async function addFavourite(productid: string) {
  try {
    return await apiClient.post(API_ENDPOINTS.favourite.add, { productid });
  } catch (error) {
    console.error("Error adding to favourites:", error);
    throw error;
  }
}

export async function removeFavourite(favouriteid: string) {
  try {
    return await apiClient.post(API_ENDPOINTS.favourite.delete, { favouriteid });
  } catch (error) {
    console.error("Error removing from favourites:", error);
    throw error;
  }
}

export async function getFavourites(): Promise<ApiFavourite[]> {
  try {
    const res = await apiClient.post(API_ENDPOINTS.favourite.get);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching favourites:", error);
    return [];
  }
}
