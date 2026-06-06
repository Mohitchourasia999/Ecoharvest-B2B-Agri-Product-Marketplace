import { useState, useEffect } from 'react'
import orderService from '../services/orderService'

/**
 * Purpose: Displays orders based on user role.
 * - BUYER: sees their own orders (GET /api/orders/buyer)
 * - ADMIN: sees all orders (GET /api/orders)
 * 
 * Props:
 * - user: current logged-in user object (used to determine role)
 */
function Orders({ user }) {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')

  // Fetch orders on component load
  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      // Admin sees all orders
      orderService.getAll()
        .then(res => setOrders(res.data))
        .catch(() => setError('Failed to load orders'))
    } else {
      // Buyer sees own orders
      orderService.getBuyerOrders()
        .then(res => setOrders(res.data))
        .catch(() => setError('Failed to load orders'))
    }
  }, [user])

  // Calculations for Buyer Stats
  const totalOrdersCount = orders.length
  const totalSpent = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)

  return (
    <div className="container py-3">
      {/* Title Header */}
      <div className="mb-4">
        <h2 className="fw-bold text-success">
          {user && user.role === 'ADMIN' ? '📦 System Orders Log' : '🛍️ My Order History'}
        </h2>
        <p className="text-muted">
          {user && user.role === 'ADMIN' 
            ? 'Track and monitor all orders placed across the system' 
            : 'View details of your past organic purchases'}
        </p>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center rounded-3 shadow-sm mb-4" role="alert">
          <span className="me-2">⚠️</span>
          <div>{error}</div>
        </div>
      )}

      {/* Buyer Statistics Cards */}
      {user && user.role === 'BUYER' && (
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 border-start border-success border-4 rounded-3">
              <div className="card-body p-3">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Total Orders Placed</span>
                <span className="fs-3 fw-bold text-success">{totalOrdersCount}</span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm border-0 border-start border-primary border-4 rounded-3">
              <div className="card-body p-3">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Total Amount Spent</span>
                <span className="fs-3 fw-bold text-primary">₹{totalSpent.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table inside Card */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-success text-white">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3">Product Name</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Total Price</th>
                  <th className="py-3">Order Date</th>
                  {user && user.role === 'ADMIN' && <th className="py-3">Buyer Name</th>}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={user && user.role === 'ADMIN' ? 6 : 5} className="text-center py-5 text-muted">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td className="px-4 fw-semibold text-secondary">#{order.id}</td>
                      <td className="fw-bold text-success">
                        {order.product ? order.product.name : <span className="text-muted italic">N/A</span>}
                      </td>
                      <td>{order.quantity} units</td>
                      <td className="fw-bold">₹{order.totalPrice}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}</td>
                      {user && user.role === 'ADMIN' && (
                        <td>{order.buyer ? order.buyer.name : <span className="text-muted italic">N/A</span>}</td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
