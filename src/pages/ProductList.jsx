import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import productService from '../services/productService'
import orderService from '../services/orderService'

/**
 * Purpose: Displays products based on user role.
 * - BUYER: sees all products with "Buy" button
 * - SELLER: sees own products with Edit/Delete buttons
 * - ADMIN: sees all products (view only)
 * 
 * Props:
 * - user: current logged-in user object
 * 
 * useEffect: fetches products when the component loads
 * useState: manages products list and messages
 */
function ProductList({ user }) {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [orderQty, setOrderQty] = useState({})

  // Fetch products on component load
  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    if (user && user.role === 'SELLER') {
      // Seller sees only their own products
      productService.getSellerProducts()
        .then(res => setProducts(res.data))
        .catch(() => setMessage('Failed to load products'))
    } else {
      // Buyer and Admin see all products
      productService.getAll()
        .then(res => setProducts(res.data))
        .catch(() => setMessage('Failed to load products'))
    }
  }

  // Delete product (Seller only)
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productService.remove(id)
        .then(() => {
          setMessage('Product deleted successfully')
          loadProducts() // Refresh list
        })
        .catch(() => setMessage('Failed to delete product'))
    }
  }

  // Place order (Buyer only)
  const handleOrder = (productId) => {
    const quantity = orderQty[productId] || 1
    orderService.placeOrder(productId, quantity)
      .then(() => {
        setMessage('Order placed successfully!')
        loadProducts() // Refresh to show updated quantity
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message)
        } else {
          setMessage('Failed to place order')
        }
      })
  }

  // Calculations for dashboard stats
  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + (p.quantity || 0), 0)
  const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity <= 5).length
  const outOfStockCount = products.filter(p => p.quantity === 0).length

  return (
    <div className="container py-3">
      {/* Title & Banner */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-success">
            {user && user.role === 'SELLER' ? '👨‍🌾 Seller Dashboard' : '🛒 Organic Produce Market'}
          </h2>
          <p className="text-muted">
            {user && user.role === 'SELLER' 
              ? 'Manage your organic inventory and track listings' 
              : 'Browse and purchase direct farm-fresh products'}
          </p>
        </div>
        {user && user.role === 'SELLER' && (
          <Link to="/add-product" className="btn btn-success px-4 py-2 rounded-pill fw-bold shadow-sm">
            ➕ Add New Product
          </Link>
        )}
      </div>

      {message && (
        <div className="alert alert-success d-flex align-items-center rounded-3 shadow-sm mb-4" role="alert">
          <span className="me-2">ℹ️</span>
          <div>{message}</div>
        </div>
      )}

      {/* Statistics Cards */}
      {user && (
        <div className="row g-4 mb-5">
          {user.role === 'SELLER' ? (
            <>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 border-start border-success border-4 rounded-3">
                  <div className="card-body p-3">
                    <span className="text-muted small fw-bold text-uppercase d-block mb-1">Products Listed</span>
                    <span className="fs-3 fw-bold text-success">{totalProducts}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 border-start border-primary border-4 rounded-3">
                  <div className="card-body p-3">
                    <span className="text-muted small fw-bold text-uppercase d-block mb-1">Total Inventory Stock</span>
                    <span className="fs-3 fw-bold text-primary">{totalStock} units</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 border-start border-warning border-4 rounded-3">
                  <div className="card-body p-3">
                    <span className="text-muted small fw-bold text-uppercase d-block mb-1">Low Stock Alerts</span>
                    <span className="fs-3 fw-bold text-warning">{lowStockCount} items</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-6">
                <div className="card shadow-sm border-0 border-start border-success border-4 rounded-3">
                  <div className="card-body p-3">
                    <span className="text-muted small fw-bold text-uppercase d-block mb-1">Available Organic Items</span>
                    <span className="fs-3 fw-bold text-success">{totalProducts}</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card shadow-sm border-0 border-start border-danger border-4 rounded-3">
                  <div className="card-body p-3">
                    <span className="text-muted small fw-bold text-uppercase d-block mb-1">Out of Stock items</span>
                    <span className="fs-3 fw-bold text-danger">{outOfStockCount}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* RENDER SELLER VIEW: Clean Management Table */}
      {user && user.role === 'SELLER' && (
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-success text-white">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Description</th>
                    <th className="py-3">Price (₹)</th>
                    <th className="py-3">Stock Quantity</th>
                    <th className="py-3">Stock Status</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">
                        No products found. Start by adding one above!
                      </td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id}>
                        <td className="px-4 fw-semibold text-secondary">#{product.id}</td>
                        <td className="fw-bold text-success">{product.name}</td>
                        <td className="text-muted text-truncate" style={{ maxWidth: '250px' }}>
                          {product.description}
                        </td>
                        <td className="fw-bold">₹{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                          {product.quantity === 0 ? (
                            <span className="badge bg-danger rounded-pill px-3 py-2">Out of Stock</span>
                          ) : product.quantity <= 5 ? (
                            <span className="badge bg-warning text-dark rounded-pill px-3 py-2">Low Stock</span>
                          ) : (
                            <span className="badge bg-success rounded-pill px-3 py-2">In Stock</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Link to={`/edit-product/${product.id}`}
                              className="btn btn-warning btn-sm px-3 rounded-pill fw-semibold shadow-sm">
                              ✏️ Edit
                            </Link>
                            <button className="btn btn-danger btn-sm px-3 rounded-pill fw-semibold shadow-sm"
                              onClick={() => handleDelete(product.id)}>
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER BUYER VIEW: Grid of Product Cards */}
      {user && user.role === 'BUYER' && (
        <div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.length === 0 ? (
              <div className="col-12 text-center py-5">
                <span className="fs-1 d-block mb-3">🧺</span>
                <p className="text-muted fs-5">No organic produce available at the moment. Check back soon!</p>
              </div>
            ) : (
              products.map(product => (
                <div className="col" key={product.id}>
                  <div className="card h-100 shadow-sm border-0 rounded-3 card-hover border-top border-success border-3">
                    <div className="card-body p-4 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className="badge bg-success text-white px-2 py-1.5 rounded-pill fw-bold">
                          100% Organic
                        </span>
                        {product.quantity === 0 ? (
                          <span className="badge bg-danger text-white rounded-pill px-2 py-1.5 small fw-bold">Sold Out</span>
                        ) : product.quantity <= 5 ? (
                          <span className="badge bg-warning text-dark rounded-pill px-2 py-1.5 small fw-bold">Low Stock</span>
                        ) : (
                          <span className="badge bg-success-subtle text-success rounded-pill px-2 py-1.5 small fw-bold">In Stock</span>
                        )}
                      </div>

                      <h4 className="card-title fw-bold text-success mb-2">{product.name}</h4>
                      <p className="card-text text-muted mb-4 flex-grow-1">{product.description}</p>
                      
                      <div className="bg-light p-3 rounded-3 mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="text-secondary small">Price:</span>
                          <span className="fs-5 fw-bold text-success">₹{product.price}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-secondary small">Available:</span>
                          <span className="fw-semibold">{product.quantity} units</span>
                        </div>
                      </div>

                      {product.quantity > 0 && (
                        <div className="mt-auto">
                          <div className="d-flex align-items-center gap-2 mb-3">
                            <label className="text-muted small fw-semibold me-auto">Qty:</label>
                            <input type="number" min="1" max={product.quantity}
                              defaultValue="1" style={{ width: '70px' }}
                              className="form-control form-control-sm text-center fw-bold border-success"
                              onChange={(e) => setOrderQty({
                                ...orderQty, [product.id]: parseInt(e.target.value) || 1
                              })} />
                          </div>
                          <button className="btn btn-success w-100 py-2 rounded-pill fw-bold shadow-sm"
                            onClick={() => handleOrder(product.id)}>
                            🛒 Buy Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* RENDER ADMIN VIEW: Plain Read-Only Table */}
      {user && user.role === 'ADMIN' && (
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-success text-white">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Description</th>
                    <th className="py-3">Price (₹)</th>
                    <th className="py-3">Stock Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">No products listed.</td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id}>
                        <td className="px-4">#{product.id}</td>
                        <td className="fw-bold">{product.name}</td>
                        <td className="text-muted">{product.description}</td>
                        <td className="fw-bold">₹{product.price}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
