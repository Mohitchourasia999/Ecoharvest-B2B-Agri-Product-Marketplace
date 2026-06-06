import { useState, useEffect } from 'react'
import userService from '../services/userService'
import productService from '../services/productService'
import orderService from '../services/orderService'

/**
 * Purpose: Admin Panel page. Shows three sections:
 * 1. All Users - table of all registered users
 * 2. All Products - table of all products
 * 3. All Orders - table of all orders
 * 
 * Only accessible by ADMIN role (enforced by ProtectedRoute and backend).
 * Fetches data from all three APIs on component load.
 */
function AdminPanel() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  // Fetch all data on component load
  useEffect(() => {
    userService.getAll()
      .then(res => setUsers(res.data))
      .catch(() => setError('Failed to load users'))

    productService.getAll()
      .then(res => setProducts(res.data))
      .catch(() => setError('Failed to load products'))

    orderService.getAll()
      .then(res => setOrders(res.data))
      .catch(() => setError('Failed to load orders'))
  }, [])

  const [activeTab, setActiveTab] = useState('users')

  // Calculate platform stats
  const totalUsers = users.length
  const totalProductsCount = products.length
  const totalOrdersCount = orders.length
  const totalPlatformRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)

  return (
    <div className="container py-3">
      {/* Title */}
      <div className="mb-4 text-center text-md-start">
        <h2 className="fw-bold text-success">⚙️ Platform Administration</h2>
        <p className="text-muted">Monitor user activity, product listings, and purchase logs</p>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center rounded-3 shadow-sm mb-4" role="alert">
          <span className="me-2">⚠️</span>
          <div>{error}</div>
        </div>
      )}

      {/* Stats Cards Row */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-sm-6">
          <div className="card shadow-sm border-0 border-start border-primary border-4 rounded-3 h-100">
            <div className="card-body p-3">
              <span className="text-muted small fw-bold text-uppercase d-block mb-1">Total Users</span>
              <span className="fs-3 fw-bold text-primary">{totalUsers}</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card shadow-sm border-0 border-start border-success border-4 rounded-3 h-100">
            <div className="card-body p-3">
              <span className="text-muted small fw-bold text-uppercase d-block mb-1">Listed Products</span>
              <span className="fs-3 fw-bold text-success">{totalProductsCount}</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card shadow-sm border-0 border-start border-warning border-4 rounded-3 h-100">
            <div className="card-body p-3">
              <span className="text-muted small fw-bold text-uppercase d-block mb-1">Total Orders</span>
              <span className="fs-3 fw-bold text-warning">{totalOrdersCount}</span>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card shadow-sm border-0 border-start border-danger border-4 rounded-3 h-100">
            <div className="card-body p-3">
              <span className="text-muted small fw-bold text-uppercase d-block mb-1">Platform Revenue</span>
              <span className="fs-3 fw-bold text-danger">₹{totalPlatformRevenue.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs nav-fill mb-4 border-bottom-0 shadow-sm rounded-3 bg-white p-2">
        <li className="nav-item">
          <button className={`nav-link rounded-pill fw-bold border-0 py-2.5 ${activeTab === 'users' ? 'bg-success text-white' : 'text-success'}`}
            onClick={() => setActiveTab('users')}>
            👥 Manage Users ({totalUsers})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill fw-bold border-0 py-2.5 ${activeTab === 'products' ? 'bg-success text-white' : 'text-success'}`}
            onClick={() => setActiveTab('products')}>
            🌾 Product Catalog ({totalProductsCount})
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link rounded-pill fw-bold border-0 py-2.5 ${activeTab === 'orders' ? 'bg-success text-white' : 'text-success'}`}
            onClick={() => setActiveTab('orders')}>
            📦 System Orders ({totalOrdersCount})
          </button>
        </li>
      </ul>

      {/* Tab Content Cards */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">

          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-success text-white">
                  <tr>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Email Address</th>
                    <th className="py-3">Account Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-5 text-muted">No users registered on the platform.</td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user.id}>
                        <td className="px-4 fw-semibold text-secondary">#{user.id}</td>
                        <td className="fw-bold">{user.name}</td>
                        <td className="text-muted">{user.email}</td>
                        <td>
                          <span className={`badge px-3 py-2 rounded-pill fw-bold text-uppercase ${
                            user.role === 'ADMIN' ? 'bg-danger' :
                            user.role === 'SELLER' ? 'bg-warning text-dark' : 'bg-primary'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Products Table */}
          {activeTab === 'products' && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-success text-white">
                  <tr>
                    <th className="py-3 px-4">Product ID</th>
                    <th className="py-3">Product Name</th>
                    <th className="py-3">Price (₹)</th>
                    <th className="py-3">Stock Count</th>
                    <th className="py-3">Seller Name</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">No products listed in catalog.</td>
                    </tr>
                  ) : (
                    products.map(product => (
                      <tr key={product.id}>
                        <td className="px-4 fw-semibold text-secondary">#{product.id}</td>
                        <td className="fw-bold text-success">{product.name}</td>
                        <td className="fw-bold">₹{product.price}</td>
                        <td>
                          {product.quantity === 0 ? (
                            <span className="badge bg-danger rounded-pill px-3 py-1.5">Out of Stock</span>
                          ) : (
                            `${product.quantity} units`
                          )}
                        </td>
                        <td className="text-muted fw-semibold">
                          {product.seller ? product.seller.name : <span className="text-muted italic">N/A</span>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Orders Table */}
          {activeTab === 'orders' && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-success text-white">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3">Product Name</th>
                    <th className="py-3">Buyer Name</th>
                    <th className="py-3">Quantity</th>
                    <th className="py-3">Total Amount</th>
                    <th className="py-3">Transaction Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5 text-muted">No transactions recorded.</td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id}>
                        <td className="px-4 fw-semibold text-secondary">#{order.id}</td>
                        <td className="fw-bold text-success">
                          {order.product ? order.product.name : <span className="text-muted italic">N/A</span>}
                        </td>
                        <td className="fw-semibold">
                          {order.buyer ? order.buyer.name : <span className="text-muted italic">N/A</span>}
                        </td>
                        <td>{order.quantity} units</td>
                        <td className="fw-bold">₹{order.totalPrice}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString(undefined, {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default AdminPanel
