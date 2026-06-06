import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import Orders from './pages/Orders'
import AdminPanel from './pages/AdminPanel'
import authService from './services/authService'

/**
 * Purpose: Main application component. Sets up routing and manages user state.
 * 
 * User state is stored in localStorage (no Redux/Context API).
 * On app load, we check if the user session is still valid by calling /api/auth/me.
 * 
 * Routes define which component to show for each URL path.
 * ProtectedRoute wraps pages that require login.
 */
function App() {
  // user state: null = not logged in, object = logged in user
  const [user, setUser] = useState(null)

  // On app load, check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      // Verify session is still valid on the server
      authService.getCurrentUser()
        .then(res => {
          setUser(res.data)
        })
        .catch(() => {
          // Session expired, clear stored user
          localStorage.removeItem('user')
          setUser(null)
        })
    }
  }, [])

  // Called after successful login
  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Called on logout
  const handleLogout = () => {
    authService.logout().then(() => {
      setUser(null)
      localStorage.removeItem('user')
    })
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light-subtle">
      {/* Navbar is shown on every page */}
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main content area with routes */}
      <div className="main-content container my-5 flex-grow-1">
        <Routes>
          {/* Public pages - accessible without login */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected pages - require login */}
          <Route path="/products" element={
            <ProtectedRoute user={user}>
              <ProductList user={user} />
            </ProtectedRoute>
          } />
          <Route path="/add-product" element={
            <ProtectedRoute user={user}>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path="/edit-product/:id" element={
            <ProtectedRoute user={user}>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute user={user}>
              <Orders user={user} />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute user={user}>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </div>

      {/* Professional Bootstrap footer */}
      <footer className="bg-success text-white py-4 mt-auto shadow-lg">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="fs-5 fw-bold d-block mb-1">🌿 EcoHarvest</span>
              <span className="small text-white-50">
                A secure, direct-to-consumer organic products marketplace.
              </span>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="small text-white-50 d-block">
                &copy; {new Date().getFullYear()} EcoHarvest. All rights reserved.
              </span>
              <span className="small text-white-50">
                CDAC Mini Project Implementation
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
