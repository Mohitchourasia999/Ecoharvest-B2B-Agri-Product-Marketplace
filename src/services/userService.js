import api from './api'

/**
 * Purpose: API calls related to user management (admin only).
 */
const userService = {
  // GET /api/users - get all users
  getAll: () => api.get('/users')
}

export default userService
