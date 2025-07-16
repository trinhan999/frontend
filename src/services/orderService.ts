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