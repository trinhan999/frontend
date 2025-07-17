"use client";
import React, { useState } from 'react';
import { Review, reviewService, CreateReviewRequest } from '@/services/reviewService';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { Edit, Trash2 } from 'lucide-react';

interface ReviewListProps {
  reviews: Review[];
  onReviewUpdated: () => void;
}

export default function ReviewList({ reviews, onReviewUpdated }: ReviewListProps) {
  const { user } = useAuth();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment || '');
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setEditRating(5);
    setEditComment('');
  };

  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    setLoading(true);
    try {
      const request: CreateReviewRequest = {
        productId: editingReview.productId,
        rating: editRating,
        comment: editComment.trim() || undefined
      };

      await reviewService.updateReview(editingReview.id, request);
      toast.success('Review updated successfully!');
      setEditingReview(null);
      onReviewUpdated();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update review';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    setLoading(true);
    try {
      await reviewService.deleteReview(reviewId);
      toast.success('Review deleted successfully!');
      onReviewUpdated();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete review';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm border">
          {editingReview?.id === review.id ? (
            // Edit Form
            <form onSubmit={handleUpdateReview} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">{review.username}</span>
                <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      className={`text-xl transition-colors ${
                        star <= editRating ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-400`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Review Display
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-800">{review.username}</span>
                  {renderStars(review.rating)}
                </div>
                <div className="flex items-center space-x-5">
                  <span className="text-sm text-gray-500">{formatDate(review.createdAt)}</span>
                  {user && review.userId === user.id && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(review)}
                        disabled={loading}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded disabled:opacity-50 transition-colors"
                        title="Edit review"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={loading}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded disabled:opacity-50 transition-colors"
                        title="Delete review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {review.comment && (
                <p className="text-gray-700 mt-2">{review.comment}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 