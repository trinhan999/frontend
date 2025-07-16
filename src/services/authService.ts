import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  tokenType: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class AuthService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to include token
  constructor() {
    this.api.interceptors.request.use(
      (config) => {
        // Only attach token if not registering or logging in
        if (
          config.url &&
          !config.url.endsWith('/auth/register') &&
          !config.url.endsWith('/auth/login')
        ) {
          const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken);
              if (response.data) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
                return this.api(originalRequest);
              }
            }
          } catch {
            // Refresh token failed, redirect to login
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.api.post('/auth/login', credentials);
      const data = response.data;
      return {
        ...data,
        success: data.result === 'SUCCESS',
        error: data.result !== 'SUCCESS' ? (data.message || 'Login failed') : undefined,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      throw new Error(errorMessage);
    }
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      throw new Error(errorMessage);
    }
  }

  async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    try {
      const response = await this.api.get<ApiResponse<AuthResponse['user']>>('/users/me');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get user data';
      throw new Error(errorMessage);
    }
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<{ token: string; refreshToken: string }>> {
    try {
      const response = await this.api.post<ApiResponse<{ token: string; refreshToken: string }>>('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Token refresh failed';
      throw new Error(errorMessage);
    }
  }

  async updateUser(id: number, userData: Partial<RegisterRequest>): Promise<ApiResponse<AuthResponse['user']>> {
    try {
      const response = await this.api.put<ApiResponse<AuthResponse['user']>>(`/users/${id}`, userData);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
      throw new Error(errorMessage);
    }
  }

  async changePassword(id: number, currentPassword: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await this.api.post<ApiResponse<{ message: string }>>(`/users/${id}/change-password`, { currentPassword, newPassword });
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to change password';
      throw new Error(errorMessage);
    }
  }
}

export const authService = new AuthService(); 