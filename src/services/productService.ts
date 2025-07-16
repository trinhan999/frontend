import axios from 'axios';
import { API_CONFIG } from '@/config/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  model: string;
  imageUrl: string;
  specifications: string;
  averageRating: number;
  reviewCount: number;
  status: string;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  page?: number;
  size?: number;
}

export interface ProductPage {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<ProductPage> {
    const params: Record<string, string | number | undefined> = { ...filters };
    const response = await axios.get(`${API_CONFIG.BASE_URL}/products`, { params });
    return response.data.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/products/${id}`);
    return response.data.data;
  },

  async getCategories(): Promise<string[]> {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/products/categories`);
    return response.data.data;
  },

  async getBrands(): Promise<string[]> {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/products/brands`);
    return response.data.data;
  },
}; 