// API Configuration
// Update this file to change the backend URL for different environments

export const API_CONFIG = {
  // Development - Local Backend
  // BASE_URL: 'http://localhost:8080/api',
  
  // Production - Deployed Backend (Update this with your actual deployed URL)
  // BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  
  // Alternative: You can uncomment and use one of these based on your deployment:
  // BASE_URL: 'https://your-app.herokuapp.com/api',
  BASE_URL: 'https://backend-production-1672.up.railway.app/api',
  // BASE_URL: 'https://your-app.render.com/api',
  // BASE_URL: 'https://your-app.vercel.app/api',
  
  // Timeout settings
  TIMEOUT: 10000,
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Helper function to get the full API URL
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, ''); // Remove leading slash
  return `${baseUrl}/${cleanEndpoint}`;
};

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production'; 