import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend URL in production
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to every request if it exists
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;