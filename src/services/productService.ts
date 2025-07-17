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

  async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    // Get products with high ratings (4.5+) and limit the results
    // We'll get more products and then select a diverse mix
    const response = await axios.get(`${API_CONFIG.BASE_URL}/products`, {
      params: {
        minRating: 4.5,
        size: Math.min(limit * 2, 20), // Get more products to select from
        page: 0
      }
    });
    
    const products = response.data.data.content;
    
    // If we have enough products, try to get a diverse selection
    if (products.length >= limit) {
      const categories = new Set();
      const selectedProducts: Product[] = [];
      
      // First, try to get one product from each category
      for (const product of products) {
        if (selectedProducts.length >= limit) break;
        if (!categories.has(product.category)) {
          categories.add(product.category);
          selectedProducts.push(product);
        }
      }
      
      // If we still have slots, fill with remaining high-rated products
      for (const product of products) {
        if (selectedProducts.length >= limit) break;
        if (!selectedProducts.find(p => p.id === product.id)) {
          selectedProducts.push(product);
        }
      }
      
      return selectedProducts.slice(0, limit);
    }
    
    return products.slice(0, limit);
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