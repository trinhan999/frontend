"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { API_CONFIG } from '@/config/api';
import { reviewService, Review } from '@/services/reviewService';
import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  imageUrl: string;
  averageRating: number;
  reviewCount: number;
  description: string;
  stockQuantity: number;
  specifications?: string;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, loading: cartLoading } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_CONFIG.BASE_URL}/products/${id}`);
        setProduct(res.data.data);
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchReviews() {
      if (!product) return;
      
      setReviewsLoading(true);
      try {
        const reviewsData = await reviewService.getReviewsByProduct(product.id);
        setReviews(reviewsData);
        
        // Check if user has already reviewed this product
        if (user) {
          try {
            const hasReviewed = await reviewService.hasUserReviewedProduct(product.id);
            setHasUserReviewed(hasReviewed);
          } catch {
            // If user is not authenticated, they haven't reviewed
            setHasUserReviewed(false);
          }
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setReviewsLoading(false);
      }
    }
    
    fetchReviews();
  }, [product, user]);

  if (loading) return <div className="p-8 text-center text-blue-600 text-lg animate-pulse">Loading product details...</div>;
  if (error) return <div className="p-8 text-center text-red-500 text-lg font-semibold">{error}</div>;
  if (!product) return null;

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: product.id, quantity });
      toast.success('Added to cart!');
    } catch {
      toast.error('Failed to add to cart. Please login or try again.');
    }
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    setHasUserReviewed(true);
    // Refresh reviews
    if (product) {
      reviewService.getReviewsByProduct(product.id).then(setReviews);
    }
  };

  const handleReviewUpdated = () => {
    // Refresh reviews
    if (product) {
      reviewService.getReviewsByProduct(product.id).then(setReviews);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded shadow mt-8">
        <button onClick={() => window.history.back()} className="mb-4 text-blue-600 hover:underline">&larr; Back to Products</button>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-64 h-64 object-contain rounded border"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 text-gray-600">{product.name}</h1>
            <div className="text-gray-600 mb-2">{product.brand} | {product.category}</div>
            <div className="text-blue-600 font-bold text-2xl mb-2">${product.price}</div>
            <div className="mb-2">
              <span className="text-yellow-500 font-semibold">Rating: {product.averageRating} ⭐</span>
              <span className="ml-2 text-gray-500">({product.reviewCount} reviews)</span>
            </div>
            <div className="mb-4 text-gray-700">{product.description}</div>
            <div className="mb-4 text-gray-600">
              <span className="font-semibold">Stock:</span> {product.stockQuantity}
            </div>
            <div className="flex items-center gap-2 mb-4 text-gray-600">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
              <span className="px-3">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={cartLoading}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold disabled:opacity-50"
            >
              {cartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
        {/* Specifications Table at the bottom */}
        {product.specifications && (
          <div className="mt-8">
            <span className="font-semibold text-gray-600 block mb-2">Specifications:</span>
            <SpecificationsTable specifications={product.specifications} />
          </div>
        )}

        {/* Reviews Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
            {user && !hasUserReviewed && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
              >
                Write a Review
              </button>
            )}
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-6">
              <ReviewForm
                productId={product.id}
                onReviewSubmitted={handleReviewSubmitted}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          {/* Reviews List */}
          {reviewsLoading ? (
            <div className="text-center py-8 text-blue-600 animate-pulse">Loading reviews...</div>
          ) : (
            <ReviewList
              reviews={reviews}
              onReviewUpdated={handleReviewUpdated}
            />
          )}
        </div>
      </div>
    </div>

  );
}

// Helper component to render specifications as a table
function SpecificationsTable({ specifications }: { specifications: string }) {
  let specsObj: Record<string, unknown> = {};
  try {
    specsObj = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
  } catch {
    return <div className="text-red-500">Invalid specifications format.</div>;
  }
  if (!specsObj || typeof specsObj !== 'object' || Array.isArray(specsObj)) {
    return <div className="text-gray-500">No specifications available.</div>;
  }
  return (
    <table className="min-w-full border border-gray-200 rounded text-sm">
      <tbody>
        {Object.entries(specsObj).map(([key, value]) => (
          <tr key={key} className="">
            <td className="px-4 py-2 font-medium text-gray-700 bg-gray-50 w-1/3">{key.replace(/_/g, ' ')}</td>
            <td className="px-4 py-2 text-gray-700">{String(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 