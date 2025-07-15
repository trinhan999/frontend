'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface CartIconProps {
  className?: string;
  showCount?: boolean;
}

export default function CartIcon({ className = '', showCount = true }: CartIconProps) {
  const { cart } = useCart();

  return (
    <Link
      href="/cart"
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      <ShoppingCart className="w-6 h-6" />
      {showCount && cart && cart.itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cart.itemCount}
        </span>
      )}
    </Link>
  );
} 