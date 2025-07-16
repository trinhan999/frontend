import axios from "axios";

export async function getOrders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"}/orders`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
  });
  // Assuming the backend wraps data in { data: { data: ... } }
  return response.data.data;
} 