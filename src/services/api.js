// API Service for TalabaKassa
const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('talaba_kassa_token');
export const setAuthToken = (token) => localStorage.setItem('talaba_kassa_token', token);
export const removeAuthToken = () => localStorage.removeItem('talaba_kassa_token');

export async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Xatolik yuz berdi');
    }
    return data;
  } catch (err) {
    console.error(`API Error [${method} ${endpoint}]:`, err.message);
    throw err;
  }
}

// Authentication API
export const authApi = {
  login: (email, password) => apiRequest('/auth/login', 'POST', { email, password }),
  register: (userData) => apiRequest('/auth/register', 'POST', userData),
  getMe: () => apiRequest('/auth/me'),
  updateProfile: (profileData) => apiRequest('/auth/profile', 'PUT', profileData),
  resetData: () => apiRequest('/auth/reset-data', 'POST'),
};

// Transactions API
export const transactionsApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/transactions${query ? `?${query}` : ''}`);
  },
  create: (txData) => apiRequest('/transactions', 'POST', txData),
  delete: (id) => apiRequest(`/transactions/${id}`, 'DELETE'),
};

// Goals API
export const goalsApi = {
  getAll: () => apiRequest('/goals'),
  create: (goalData) => apiRequest('/goals', 'POST', goalData),
  deposit: (id, amount) => apiRequest(`/goals/${id}/deposit`, 'PUT', { amount }),
  delete: (id) => apiRequest(`/goals/${id}`, 'DELETE'),
};

// Requests API
export const requestsApi = {
  getAll: () => apiRequest('/requests'),
  create: (requestData) => apiRequest('/requests', 'POST', requestData),
  updateStatus: (id, status, managerNote) => 
    apiRequest(`/requests/${id}/status`, 'PUT', { status, managerNote }),
};

// Manager API
export const managerApi = {
  getStudents: () => apiRequest('/manager/students'),
};

// Admin API
export const adminApi = {
  getUsers: () => apiRequest('/admin/users'),
  updateUser: (id, data) => apiRequest(`/admin/users/${id}`, 'PUT', data),
  deleteUser: (id) => apiRequest(`/admin/users/${id}`, 'DELETE'),
  getStats: () => apiRequest('/admin/stats'),
};

// Common API
export const commonApi = {
  getCategories: () => apiRequest('/categories'),
  getAnnouncements: () => apiRequest('/announcements'),
  createAnnouncement: (data) => apiRequest('/announcements', 'POST', data),
};
