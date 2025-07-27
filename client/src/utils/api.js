import axios from 'axios';

// Get the API base URL from environment variables
export const getApiUrl = () => {
  // Use production backend if no environment variable is set and we're in production
  const defaultUrl = process.env.NODE_ENV === 'production' 
    ? 'https://abdulblog-bji0.onrender.com' 
    : 'http://localhost:5000';
  
  const url = process.env.REACT_APP_API_URL || defaultUrl;
  console.log('API Base URL:', url);
  console.log('Environment:', process.env.NODE_ENV);
  return url;
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.baseURL + config.url);
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API response error:', error.response?.status, error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
