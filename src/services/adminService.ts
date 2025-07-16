const API_BASE_URL = 'http://localhost:8080/api';

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  ordersToday: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
  recentOrders: OrderItem[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  model?: string;
  imageUrl?: string;
  specifications?: string;
  averageRating: number;
  reviewCount: number;
  status: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
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

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const adminService = {
  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard/stats`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    
    const data = await response.json();
    return data.data;
  },

  // Products
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await response.json();
    return data.data;
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    
    const data = await response.json();
    return data.data;
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(product),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    
    const data = await response.json();
    return data.data;
  },

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  },

  // Orders
  async getAllOrders(): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    
    const data = await response.json();
    return data.data;
  },

  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status?status=${status}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update order status');
    }
    
    const data = await response.json();
    return data.data;
  },

  // Users
  async getAllUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const data = await response.json();
    return data.data;
  },

  async updateUserRole(userId: number, role: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/role?role=${role}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update user role');
    }
    
    const data = await response.json();
    return data.data;
  },

  async deleteUser(userId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
  },
}; 