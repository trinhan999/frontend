"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useCart } from '@/contexts/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, loading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError("");
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
        const res = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(res.data.data);
      } catch (err: any) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-blue-600 text-lg animate-pulse">Loading product details...</div>;
  if (error) return <div className="p-8 text-center text-red-500 text-lg font-semibold">{error}</div>;
  if (!product) return null;

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: product.id, quantity });
      toast.success('Added to cart!');
    } catch (e) {
      toast.error('Failed to add to cart. Please login or try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
      </div>
    </div>

  );
}

// Helper component to render specifications as a table
function SpecificationsTable({ specifications }: { specifications: string }) {
  let specsObj: Record<string, any> = {};
  try {
    specsObj = typeof specifications === 'string' ? JSON.parse(specifications) : specifications;
  } catch (e) {
    return <div className="text-red-500">Invalid specifications format.</div>;
  }
  if (!specsObj || typeof specsObj !== 'object' || Array.isArray(specsObj)) {
    return <div className="text-gray-500">No specifications available.</div>;
  }
  return (
    <table className="min-w-full border border-gray-200 rounded text-sm">
      <tbody>
        {Object.entries(specsObj).map(([key, value]) => (
          <tr key={key} className="border-b last:border-b-0">
            <td className="px-4 py-2 font-medium text-gray-700 bg-gray-50 w-1/3">{key.replace(/_/g, ' ')}</td>
            <td className="px-4 py-2 text-gray-700">{String(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 