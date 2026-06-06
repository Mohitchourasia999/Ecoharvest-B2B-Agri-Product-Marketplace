import { Navigate } from 'react-router-dom'

/**
 * Purpose: Protects routes that require authentication.
 * If user is not logged in, redirects to login page.
 * If user is logged in, renders the child component.
 * 
 * Usage in App.jsx:
 *   <ProtectedRoute user={user}>
 *     <SomePage />
 *   </ProtectedRoute>
 * 
 * Navigate component from react-router-dom redirects the browser.
 */
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}

export default ProtectedRoute
