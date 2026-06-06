import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/authService'

/**
 * Purpose: Registration page for new users.
 * Users can register as SELLER or BUYER (not ADMIN).
 * 
 * On success, redirects to login page.
 * Uses controlled form inputs with useState.
 */
function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('BUYER')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await authService.register({ name, email, password, role })
      setSuccess('Registration successful! Redirecting to login...')
      // Redirect to login after 2 seconds
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError('Registration failed. Please try again.')
      }
    }
  }

  return (
    <div className="row justify-content-center align-items-center py-5">
      <div className="col-md-5 col-sm-10 col-xs-12">
        <div className="card shadow border-0 border-top border-success border-4 rounded-3 p-4">
          <div className="card-body">
            <div className="text-center mb-4">
              <span className="fs-1">🌱</span>
              <h3 className="card-title fw-bold mt-2 text-success">Create Account</h3>
              <p className="text-muted small">Join EcoHarvest as a Buyer or Seller</p>
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center rounded-3 mb-3" role="alert">
                <span className="me-2">⚠️</span>
                <div>{error}</div>
              </div>
            )}
            {success && (
              <div className="alert alert-success d-flex align-items-center rounded-3 mb-3" role="alert">
                <span className="me-2">✅</span>
                <div>{success}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-white text-muted">👤</span>
                  <input type="text" className="form-control border-start-0"
                    placeholder="John Doe"
                    value={name} onChange={(e) => setName(e.target.value)}
                    required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white text-muted">✉️</span>
                  <input type="email" className="form-control border-start-0"
                    placeholder="john@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white text-muted">🔑</span>
                  <input type="password" className="form-control border-start-0"
                    placeholder="Min 6 characters"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Select Role</label>
                <div className="input-group">
                  <span className="input-group-text bg-white text-muted">💼</span>
                  <select className="form-select border-start-0"
                    value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="BUYER">Buyer (Shop Organic Products)</option>
                    <option value="SELLER">Seller (Sell Organic Products)</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 py-2 rounded-pill fw-bold shadow-sm">
                Get Started
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted">Already have an account? </span>
              <Link to="/login" className="text-success fw-bold text-decoration-none">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
