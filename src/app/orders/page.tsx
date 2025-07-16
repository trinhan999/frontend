"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getOrders } from "@/services/orderService";
import { useAuth } from "../../contexts/AuthContext";

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: number;
  status: string;
  total: number;
  createdAt: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  shippingPhone: string;
  paymentMethod: string;
  paymentStatus: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    getOrders()
      .then((data: Order[]) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message || "Failed to fetch orders");
        setLoading(false);
      });
  }, [isAuthenticated, router]);

  if (loading) return <div className="p-8">Loading orders...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen min-w-screen p-8 max-w-4xl mx-auto bg-white">
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto border border-gray-600 rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-6 text-black text-center">My Orders</h1>
        {orders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.orderId} className="max-w-2xl mx-auto border rounded-lg p-4 shadow-sm bg-white text-black">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-semibold">Order ID:</span> {order.orderId}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span> {order.status}
                  </div>
                  <div>
                    <span className="font-semibold">Total:</span> ${order.total.toFixed(2)}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Placed on:</span> {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Shipping:</span> {order.shippingName}, {order.shippingAddress}, {order.shippingCity}, {order.shippingZip}, {order.shippingCountry}, {order.shippingPhone}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Payment:</span> {order.paymentMethod} ({order.paymentStatus})
                </div>
                <div>
                  <span className="font-semibold">Items:</span>
                  <ul className="ml-4 mt-1 list-disc">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.productName} (x{item.quantity}) - ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 