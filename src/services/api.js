import axios from 'axios'

/**
 * Purpose: Creates a pre-configured Axios instance for API calls.
 * 
 * baseURL: All requests will be prefixed with this URL (backend server)
 * withCredentials: true ensures the JSESSIONID cookie is sent with every request.
 * This is essential for session-based authentication to work.
 */
const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  withCredentials: true
})

export default api
