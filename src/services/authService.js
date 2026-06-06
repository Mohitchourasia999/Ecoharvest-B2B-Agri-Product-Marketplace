import api from './api'

/**
 * Purpose: API calls related to authentication.
 * Each function calls a specific backend endpoint.
 */
const authService = {
  // POST /api/auth/login - sends email and password
  login: (email, password) => api.post('/auth/login', { email, password }),

  // POST /api/auth/register - sends name, email, password, role
  register: (userData) => api.post('/auth/register', userData),

  // POST /api/auth/logout - invalidates session
  logout: () => api.post('/auth/logout'),

  // GET /api/auth/me - checks if session is valid, returns current user
  getCurrentUser: () => api.get('/auth/me')
}

export default authService
