/**
 * Purpose: Static About Us page.
 * Provides information about EcoHarvest.
 * No backend calls - purely informational.
 */
function About() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow-sm border-0 rounded-3 p-4">
          <div className="card-body">
            <h2 className="fw-bold text-success mb-4 text-center">About EcoHarvest</h2>
            <hr className="mb-4" />

            <div className="row g-4">
              <div className="col-lg-7">
                <p className="fs-5 text-dark leading-relaxed">
                  <strong>EcoHarvest</strong> is a modern, transparent online marketplace dedicated to connecting
                  organic farmers and sellers directly with health-conscious buyers across India.
                </p>
                <p className="text-muted">
                  Our mission is to make organic products accessible and affordable for everyone.
                  We believe in sustainable farming practices that are healthy for consumers and protective of the environment.
                </p>

                <h4 className="fw-bold text-success mt-4">Our Vision</h4>
                <p className="text-muted">
                  To become India's leading platform for organic produce, empowering local
                  farmers and promoting a healthier lifestyle through technology-driven transparent commerce.
                </p>
              </div>

              <div className="col-lg-5">
                <div className="bg-success-subtle p-4 rounded-3 border border-success-subtle">
                  <h4 className="fw-bold text-success mb-3">Why Choose EcoHarvest?</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">🌿 <strong>100% Organic:</strong> Verified chemical-free products.</li>
                    <li className="mb-2">🚜 <strong>Farm Direct:</strong> No intermediaries, maximizing fresh delivery.</li>
                    <li className="mb-2">💰 <strong>Fair Trade:</strong> Equitable prices for farmers and consumers.</li>
                    <li className="mb-2">🌱 <strong>Sustainable:</strong> Eco-friendly organic farming support.</li>
                    <li className="mb-2">💻 <strong>Easy Platform:</strong> Straightforward ordering and tracking.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-5 p-4 bg-light rounded-3 text-center border">
              <h4 className="fw-bold mb-2">Our Team</h4>
              <p className="text-muted mb-0">
                EcoHarvest was developed as a CDAC Mini Project to showcase the application of modern web technologies
                in solving real-world supply chain challenges in agriculture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
