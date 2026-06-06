import { Link, useNavigate } from 'react-router-dom'

/**
 * Purpose: Navigation bar shown on every page.
 * Shows different links based on user role.
 * 
 * Props:
 * - user: current logged-in user object (null if not logged in)
 * - onLogout: function to call when logout is clicked
 * 
 * Bootstrap classes used:
 * - navbar, navbar-expand-lg: responsive navbar
 * - navbar-toggler: hamburger menu for mobile
 * - nav-link: styled navigation links
 */
function Navbar({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow sticky-top py-3">
      <div className="container">
        {/* Brand name - links to home */}
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
          <span className="me-2">🌿</span> EcoHarvest
        </Link>

        {/* Hamburger button for mobile view */}
        <button className="navbar-toggler border-0" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <Link className="nav-link px-3" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/contact">Contact Us</Link>
            </li>

            {/* Show Products link if logged in */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link px-3" to="/products">Products</Link>
              </li>
            )}

            {/* SELLER specific links */}
            {user && user.role === 'SELLER' && (
              <li className="nav-item">
                <Link className="nav-link px-3" to="/add-product">Add Product</Link>
              </li>
            )}

            {/* BUYER specific links */}
            {user && user.role === 'BUYER' && (
              <li className="nav-item">
                <Link className="nav-link px-3" to="/orders">My Orders</Link>
              </li>
            )}

            {/* ADMIN specific links */}
            {user && user.role === 'ADMIN' && (
              <li className="nav-item">
                <Link className="nav-link px-3" to="/admin">Admin Panel</Link>
              </li>
            )}
          </ul>

          {/* Right side - Login/Register or User info + Logout */}
          <ul className="navbar-nav ms-auto align-items-center">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <Link className="btn btn-light text-success fw-bold px-4 rounded-pill shadow-sm" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mb-2 mb-lg-0">
                  <span className="badge bg-light text-success px-3 py-2 me-lg-3 rounded-pill fw-bold border shadow-sm">
                    👤 {user.name} ({user.role})
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm px-3 py-1.5 rounded-pill fw-semibold"
                    onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
