import axios from "axios";

import { API_CONFIG } from '@/config/api';

export async function getOrders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await axios.get(`${API_CONFIG.BASE_URL}/orders`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
  });
  // Assuming the backend wraps data in { data: { data: ... } }
  return response.data.data;
}

export async function getOrderById(orderId: number) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${API_CONFIG.BASE_URL}/orders/${orderId}`;
  console.log("Calling API:", url);
  
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      withCredentials: true,
    });
    console.log("API response:", response.data);
    // Assuming the backend wraps data in { data: { data: ... } }
    return response.data.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
} 