import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Warn if API URL is not set in production
if (process.env.NODE_ENV === 'production' && !process.env.REACT_APP_API_URL) {
  console.error('REACT_APP_API_URL environment variable is not set. API calls will fail.');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () =>
    api.get('/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    api.put('/auth/change-password', { currentPassword, newPassword })
};

// Habit endpoints
export const habitAPI = {
  createHabit: (title, description) =>
    api.post('/habits', { title, description }),
  getHabits: () =>
    api.get('/habits'),
  getHabit: (id) =>
    api.get(`/habits/${id}`),
  updateHabit: (id, title, description) =>
    api.put(`/habits/${id}`, { title, description }),
  deleteHabit: (id) =>
    api.delete(`/habits/${id}`),
  checkHabit: (id, date) =>
    api.post(`/habits/${id}/check`, { date }),
  getStats: (id) =>
    api.get(`/habits/${id}/stats`)
};

export default api;
