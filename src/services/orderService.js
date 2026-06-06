import api from './api'

/**
 * Purpose: API calls related to orders.
 */
const orderService = {
  // POST /api/orders - place a new order
  placeOrder: (productId, quantity) => api.post('/orders', { productId, quantity }),

  // GET /api/orders - get all orders (admin)
  getAll: () => api.get('/orders'),

  // GET /api/orders/buyer - get buyer's own orders
  getBuyerOrders: () => api.get('/orders/buyer')
}

export default orderService
