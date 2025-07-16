import axios from 'axios';
import { API_CONFIG } from '@/config/api';

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// Create authenticated axios instance
const authenticatedApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include JWT token
authenticatedApi.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await authenticatedApi.get('/cart');
    return response.data.data;
  },

  async addToCart(request: AddToCartRequest): Promise<Cart> {
    const response = await authenticatedApi.post('/cart/add', request);
    return response.data.data;
  },

  async updateCartItem(productId: number, request: UpdateCartItemRequest): Promise<Cart> {
    const response = await authenticatedApi.put(`/cart/items/${productId}`, request);
    return response.data.data;
  },

  async removeFromCart(productId: number): Promise<Cart> {
    const response = await authenticatedApi.delete(`/cart/items/${productId}`);
    return response.data.data;
  },

  async clearCart(): Promise<Cart> {
    const response = await authenticatedApi.delete('/cart');
    return response.data.data;
  },
}; 