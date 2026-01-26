import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add response interceptor to handle errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't log 404 errors as they might just mean empty database
    if (error.response?.status !== 404) {
      console.error('API Error:', error);
    }
    return Promise.reject(error);
  }
);

export default api;