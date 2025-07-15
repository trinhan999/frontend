'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { productService, Product } from '@/services/productService';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());
  const [clearingCart, setClearingCart] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  // Map of productId to stockQuantity
  const [productStocks, setProductStocks] = useState<Record<number, number>>({});
  const router = useRouter();

  // Fetch stock for all products in cart
  useEffect(() => {
    async function fetchStocks() {
      if (!cart || !cart.items.length) return;
      const idsToFetch = cart.items
        .map(item => item.productId)
        .filter(id => !(id in productStocks));
      if (idsToFetch.length === 0) return;
      const stockMap: Record<number, number> = { ...productStocks };
      await Promise.all(
        idsToFetch.map(async (productId) => {
          try {
            const product = await productService.getProductById(productId);
            stockMap[productId] = product.stockQuantity;
          } catch (e) {
            stockMap[productId] = 0;
          }
        })
      );
      setProductStocks(stockMap);
    }
    fetchStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    // Find the current item
    const item = cart?.items.find((item) => item.productId === productId);
    if (!item) return;
    if (item.quantity === 1 && newQuantity < 1) {
      // Remove item if quantity is 1 and user tries to lower it
      await handleRemoveItem(productId);
      return;
    }
    // Prevent increasing quantity beyond stock
    const stock = productStocks[productId];
    if (typeof stock === 'number' && newQuantity > stock) {
      toast.error(`Cannot add more than available stock (${stock}).`);
      return;
    }
    setUpdatingItems(prev => new Set(prev).add(productId));
    try {
      await updateCartItem(productId, { quantity: newQuantity });
      toast.success('Quantity updated successfully!');
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity. Please try again.');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (productId: number) => {
    setRemovingItems(prev => new Set(prev).add(productId));
    try {
      await removeFromCart(productId);
      toast.success('Item removed from cart successfully!');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item. Please try again.');
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleClearCart = () => {
    setShowClearCartModal(true);
  };

  const handleConfirmClearCart = async () => {
    setClearingCart(true);
    try {
      await clearCart();
      toast.success('Cart cleared successfully!');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart. Please try again.');
    } finally {
      setClearingCart(false);
      setShowClearCartModal(false);
    }
  };

  const handleCancelClearCart = () => {
    setShowClearCartModal(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Please log in to view your cart</h2>
              <p className="text-gray-600 mb-6">You need to be logged in to access your shopping cart.</p>
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-white">
  //       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  //         <div className="px-4 py-6 sm:px-0">
  //           <div className="flex items-center justify-center py-12">
  //             <div className="text-center">
  //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
  //               <p className="mt-4 text-gray-600">Loading cart...</p>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-white">
      {/* Modal for clear cart confirmation */}
      {showClearCartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-gray-50 rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">Clear Cart</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to clear your cart? This action cannot be undone.</p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium"
                onClick={handleConfirmClearCart}
                disabled={clearingCart}
              >
                {clearingCart ? 'Clearing...' : 'Confirm'}
              </button>
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 font-medium"
                onClick={handleCancelClearCart}
                disabled={clearingCart}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              
            </div>

            <Link
                href="/products"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>
            
          </div>

          {!cart || cart.items.length === 0 ? (
            <div className="text-center py-12 min-h-[60vh] bg-white flex flex-col justify-center items-center rounded-lg shadow">
              <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white shadow rounded-lg">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 flex items-center justify-between">
                      Cart Items ({cart.itemCount})
                        {cart && cart.items.length > 0 && (
                          <button
                            onClick={handleClearCart}
                            disabled={clearingCart}
                            className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Clear Cart</span>
                          </button>
                        )}
                    </h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {cart.items.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                              {item.productImageUrl ? (
                                <img
                                  src={item.productImageUrl}
                                  alt={item.productName}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <div className="text-gray-400 text-xs">No Image</div>
                              )}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-900 truncate">
                              <Link href={`/products/${item.productId}`}>{item.productName}</Link>
                            </h3>
                            <p className="text-lg font-semibold text-gray-900">
                              ${item.productPrice.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2 text-gray-600">
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              disabled={updatingItems.has(item.productId)}
                              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {updatingItems.has(item.productId) ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              disabled={updatingItems.has(item.productId)}
                              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Subtotal and Remove */}
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ${item.subtotal.toFixed(2)}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(item.productId)}
                              disabled={removingItems.has(item.productId)}
                              className="mt-2 text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                            >
                              {removingItems.has(item.productId) ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                  <span className="text-sm">Removing...</span>
                                </>
                              ) : (
                                <>
                                  <Trash2 className="w-4 h-4" />
                                  <span className="text-sm">Remove</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow rounded-lg p-6 sticky top-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${cart.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    onClick={() => router.push('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 