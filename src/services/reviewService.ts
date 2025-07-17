import axios from 'axios';
import { API_CONFIG } from '@/config/api';

export interface Review {
  id: number;
  userId: number;
  username: string;
  productId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewRequest {
  productId: number;
  rating: number;
  comment?: string;
}

export const reviewService = {
  // Create a new review
  async createReview(request: CreateReviewRequest): Promise<Review> {
    const response = await axios.post(`${API_CONFIG.BASE_URL}/reviews`, request, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data;
  },

  // Get all reviews for a product
  async getReviewsByProduct(productId: number): Promise<Review[]> {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/reviews/product/${productId}`);
    return response.data.data;
  },

  // Get a specific review by ID
  async getReviewById(reviewId: number): Promise<Review> {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/reviews/${reviewId}`);
    return response.data.data;
  },

  // Update an existing review
  async updateReview(reviewId: number, request: CreateReviewRequest): Promise<Review> {
    const response = await axios.put(`${API_CONFIG.BASE_URL}/reviews/${reviewId}`, request, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data;
  },

  // Delete a review
  async deleteReview(reviewId: number): Promise<void> {
    await axios.delete(`${API_CONFIG.BASE_URL}/reviews/${reviewId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  },

  // Check if user has already reviewed a product
  async hasUserReviewedProduct(productId: number): Promise<boolean> {
    const response = await axios.get(`${API_CONFIG.BASE_URL}/reviews/product/${productId}/user-review`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data.data;
  }
}; 