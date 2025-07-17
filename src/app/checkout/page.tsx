"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { API_CONFIG } from '@/config/api';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingZip: "",
    shippingCountry: "",
    shippingPhone: "",
    paymentMethod: "CARD",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Please log in to checkout</h2>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          ...form,
          items: cart.items.map((item: { productId: number; quantity: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      await clearCart();
      toast.success("Order placed successfully!");
      router.push("/orders");
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 text-gray-600">
      {/* <h1 className="text-3xl font-bold mb-8 text-black">Checkout</h1> */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-10 justify-center items-start">
        <div className="w-full md:w-[400px] border border-gray-900 rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4 text-black">Shipping Address</h2>
          <div className="space-y-3">
            <input name="shippingName" value={form.shippingName} onChange={handleChange} required placeholder="Full Name" className="w-full border rounded px-3 py-2" />
            <input name="shippingAddress" value={form.shippingAddress} onChange={handleChange} required placeholder="Address" className="w-full border rounded px-3 py-2" />
            <input name="shippingCity" value={form.shippingCity} onChange={handleChange} required placeholder="City" className="w-full border rounded px-3 py-2" />
            <input name="shippingZip" value={form.shippingZip} onChange={handleChange} required placeholder="ZIP/Postal Code" className="w-full border rounded px-3 py-2" />
            <input name="shippingCountry" value={form.shippingCountry} onChange={handleChange} required placeholder="Country" className="w-full border rounded px-3 py-2" />
            <input name="shippingPhone" value={form.shippingPhone} onChange={handleChange} placeholder="Phone (optional)" className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="w-full md:w-[400px] border border-gray-900 rounded-lg p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4 text-black">Payment Info</h2>
          <div className="space-y-3">
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="CARD">Credit/Debit Card</option>
            </select>
            <input name="cardNumber" value={form.cardNumber} onChange={handleChange} required placeholder="Card Number" className="w-full border rounded px-3 py-2" />
            <input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} required placeholder="MM/YY" className="w-full border rounded px-3 py-2" />
            <input name="cardCvc" value={form.cardCvc} onChange={handleChange} required placeholder="CVC" className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mt-8 bg-gray-50 rounded p-4">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Subtotal</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium mt-6" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
} 