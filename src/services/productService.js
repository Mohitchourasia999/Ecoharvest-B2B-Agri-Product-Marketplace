import api from './api'

/**
 * Purpose: API calls related to products (CRUD).
 */
const productService = {
  // GET /api/products - get all products
  getAll: () => api.get('/products'),

  // GET /api/products/:id - get single product
  getById: (id) => api.get(`/products/${id}`),

  // GET /api/products/seller - get seller's own products
  getSellerProducts: () => api.get('/products/seller'),

  // POST /api/products - add new product
  add: (product) => api.post('/products', product),

  // PUT /api/products/:id - update product
  update: (id, product) => api.put(`/products/${id}`, product),

  // DELETE /api/products/:id - delete product
  remove: (id) => api.delete(`/products/${id}`)
}

export default productService
