import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export interface ProductCardProps {
  product: {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
    imageUrl: string;
    averageRating?: number;
    reviewCount?: number;
    description?: string;
  };
  onAddToCart?: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="h-40 object-contain mb-4 rounded" />
      <h2 className="font-bold text-lg mb-1 text-black">
        <Link href={`/products/${product.id}`}>{product.name}</Link>
      </h2>
      <div className="text-gray-600 mb-2">{product.brand} | {product.category}</div>
      <div className="text-blue-600 font-bold text-xl mb-2">${product.price}</div>
      <div className="text-yellow-500 mb-2">Rating: {product.averageRating ?? 0} ⭐ ({product.reviewCount})</div>
      <div className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</div>
      <div className="mt-auto flex space-x-2">
        <Link href={`/products/${product.id}`}>
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View Details
          </button>
        </Link>
        <button 
          onClick={() => onAddToCart && onAddToCart(product.id)}
          className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 flex items-center justify-center"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 