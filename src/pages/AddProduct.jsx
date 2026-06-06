import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productService from '../services/productService'

/**
 * Purpose: Form to Add or Edit a product (SELLER only).
 * 
 * When URL is /add-product: creates a new product
 * When URL is /edit-product/:id: loads existing product and updates it
 * 
 * useParams: extracts the :id from the URL (for edit mode)
 * useNavigate: redirects to products page after save
 */
function AddProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams() // id is present only in edit mode

  const isEditMode = !!id // true if id exists in URL

  // If edit mode, load existing product data
  useEffect(() => {
    if (isEditMode) {
      productService.getById(id)
        .then(res => {
          const product = res.data
          setName(product.name)
          setDescription(product.description)
          setPrice(product.price)
          setQuantity(product.quantity)
        })
        .catch(() => setError('Failed to load product'))
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const product = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    }

    try {
      if (isEditMode) {
        await productService.update(id, product)
      } else {
        await productService.add(product)
      }
      navigate('/products') // Redirect to products list
    } catch (err) {
      setError('Failed to save product. Please try again.')
    }
  }

  return (
    <div className="row justify-content-center align-items-center py-4">
      <div className="col-md-7 col-sm-10 col-xs-12">
        <div className="card shadow border-0 border-top border-success border-4 rounded-3 p-4">
          <div className="card-body">
            <div className="text-center mb-4">
              <span className="fs-1">{isEditMode ? '✏️' : '🌾'}</span>
              <h3 className="card-title fw-bold mt-2 text-success">
                {isEditMode ? 'Edit Organic Product' : 'List New Organic Product'}
              </h3>
              <p className="text-muted small">Provide details about your fresh organic product</p>
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center rounded-3 mb-3" role="alert">
                <span className="me-2">⚠️</span>
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Product Name</label>
                <input type="text" className="form-control border-success-subtle"
                  placeholder="e.g. Organic Red Apples, Fresh Broccoli"
                  value={name} onChange={(e) => setName(e.target.value)}
                  required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea className="form-control border-success-subtle" rows="3"
                  placeholder="Describe how the product was grown, harvesting details, pack sizes..."
                  value={description} onChange={(e) => setDescription(e.target.value)}
                  required />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Price (₹)</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-success-subtle">₹</span>
                    <input type="number" className="form-control border-success-subtle" step="0.01" min="0"
                      placeholder="0.00"
                      value={price} onChange={(e) => setPrice(e.target.value)}
                      required />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-semibold">Stock Quantity</label>
                  <input type="number" className="form-control border-success-subtle" min="0"
                    placeholder="e.g. 50"
                    value={quantity} onChange={(e) => setQuantity(e.target.value)}
                    required />
                </div>
              </div>
              <div className="mt-4 d-flex gap-2">
                <button type="button" onClick={() => navigate('/products')} className="btn btn-outline-secondary w-50 py-2 rounded-pill fw-bold">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success w-50 py-2 rounded-pill fw-bold shadow-sm">
                  {isEditMode ? 'Update Product' : 'List Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
