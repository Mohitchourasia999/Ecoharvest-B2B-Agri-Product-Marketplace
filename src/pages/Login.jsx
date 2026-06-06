import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../services/authService'

/**
 * Purpose: Login page with email and password form.
 * On successful login, stores user in parent state and redirects based on role.
 * 
 * Props:
 * - onLogin: callback function from App.jsx to update user state
 * 
 * useState: manages form input values and error messages
 * useNavigate: programmatic navigation after login
 */
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent page reload on form submit
    setError('')

    try {
      // Call backend login API
      const response = await authService.login(email, password)
      const user = response.data

      // Call parent's onLogin to update state and localStorage
      onLogin(user)

      // Redirect based on role
      if (user.role === 'ADMIN') {
        navigate('/admin')
      } else if (user.role === 'SELLER') {
        navigate('/products')
      } else {
        navigate('/products')
      }
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="row justify-content-center align-items-center py-5">
      <div className="col-md-5 col-sm-10 col-xs-12">
        <div className="card shadow border-0 border-top border-success border-4 rounded-3 p-4">
          <div className="card-body">
            <div className="text-center mb-4">
              <span className="fs-1">🌿</span>
              <h3 className="card-title fw-bold mt-2 text-success">Login to EcoHarvest</h3>
              <p className="text-muted small">Access your organic marketplace dashboard</p>
            </div>

            {/* Error alert */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center rounded-3" role="alert">
                <span className="me-2">⚠️</span>
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white text-muted">✉️</span>
                  <input type="email" className="form-control border-start-0"
                    placeholder="name@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white text-muted">🔑</span>
                  <input type="password" className="form-control border-start-0"
                    placeholder="Enter your password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100 py-2 rounded-pill fw-bold shadow-sm">
                Sign In
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted">New to EcoHarvest? </span>
              <Link to="/register" className="text-success fw-bold text-decoration-none">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
