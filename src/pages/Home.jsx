import { Link } from 'react-router-dom'

/**
 * Purpose: Landing page of the application.
 * Shows a welcome message and brief description of EcoHarvest.
 * Uses Bootstrap Jumbotron-style layout with cards.
 */
function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-success-subtle p-5 rounded-4 mb-5 border border-success-subtle shadow-sm text-center text-lg-start">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-bold mb-3 shadow-sm">
              🌱 Direct Farm-to-Table Marketplace
            </span>
            <h1 className="display-4 fw-extrabold text-success mb-3">EcoHarvest 🌿</h1>
            <p className="lead text-dark mb-4 fs-5">
              Your trusted marketplace for organic and eco-friendly products.
              Buy fresh, chemical-free produce directly from verified farmers and sellers.
            </p>
            <div className="d-grid d-md-flex gap-3 justify-content-center justify-content-lg-start">
              <Link to="/products" className="btn btn-success btn-lg px-4 py-2 rounded-pill fw-bold shadow">
                Browse Products
              </Link>
              <Link to="/register" className="btn btn-outline-success btn-lg px-4 py-2 rounded-pill fw-bold bg-white">
                Start Selling
              </Link>
            </div>
          </div>
          <div className="col-lg-4 d-none d-lg-block text-center">
            <span style={{ fontSize: '9rem' }} className="d-block animate-bounce">🥗</span>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-success">Featured Organic Products</h2>
          <p className="text-muted">Handpicked, chemical-free, and freshly harvested items</p>
        </div>
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body p-4 d-flex flex-column">
                <span className="badge bg-success-subtle text-success align-self-start mb-3 px-3 py-1.5 rounded-pill fw-bold">
                  Vegetables
                </span>
                <h5 className="card-title fw-bold">Fresh Organic Spinach</h5>
                <p className="card-text text-muted flex-grow-1">
                  Rich in iron and fiber. Freshly harvested from local organic farms without synthetic fertilizers.
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="fs-5 fw-bold text-success">₹40 / kg</span>
                  <Link to="/products" className="btn btn-sm btn-outline-success rounded-pill px-3">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body p-4 d-flex flex-column">
                <span className="badge bg-success-subtle text-success align-self-start mb-3 px-3 py-1.5 rounded-pill fw-bold">
                  Pantry
                </span>
                <h5 className="card-title fw-bold">Pure Raw Honey</h5>
                <p className="card-text text-muted flex-grow-1">
                  100% natural, unfiltered, raw wildflower honey. Rich in antioxidants and health benefits.
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="fs-5 fw-bold text-success">₹250 / 500g</span>
                  <Link to="/products" className="btn btn-sm btn-outline-success rounded-pill px-3">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-3">
              <div className="card-body p-4 d-flex flex-column">
                <span className="badge bg-success-subtle text-success align-self-start mb-3 px-3 py-1.5 rounded-pill fw-bold">
                  Fruits
                </span>
                <h5 className="card-title fw-bold">Organic Vine Tomatoes</h5>
                <p className="card-text text-muted flex-grow-1">
                  Sweet and juicy tomatoes ripened on the vine. Ideal for salads, soups, and healthy recipes.
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="fs-5 fw-bold text-success">₹60 / kg</span>
                  <Link to="/products" className="btn btn-sm btn-outline-success rounded-pill px-3">
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-light p-5 rounded-4 border shadow-sm mb-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-success">Why Choose EcoHarvest?</h2>
          <p className="text-muted">Empowering sustainable agriculture and healthy living</p>
        </div>
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-3">
              <span className="fs-1 d-block mb-3">🧑‍🌾</span>
              <h5 className="fw-bold">100% Direct Trade</h5>
              <p className="text-muted mb-0">
                Direct connect between organic farmers and buyers. Eliminates middlemen, ensuring fair pay for farmers.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <span className="fs-1 d-block mb-3">🛡️</span>
              <h5 className="fw-bold">Quality Verified</h5>
              <p className="text-muted mb-0">
                All products on our platform are verified organic, chemical-free, and sustainably produced.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              <span className="fs-1 d-block mb-3">🌎</span>
              <h5 className="fw-bold">Eco-Friendly Living</h5>
              <p className="text-muted mb-0">
                Support agricultural methods that protect soil vitality, reduce carbon footprint, and maintain biodiversity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
