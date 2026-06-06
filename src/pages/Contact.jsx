import { useState } from 'react'

/**
 * Purpose: Contact Us page with a simple form.
 * This is a static form - it does NOT send data to the backend.
 * On submit, it just shows a success message.
 * This satisfies the requirement of having a Contact Us page.
 */
function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-10">
        <div className="card shadow-sm border-0 rounded-3 p-4">
          <div className="card-body">
            <h2 className="fw-bold text-success mb-4 text-center">Contact Us</h2>
            <hr className="mb-4" />

            <div className="row g-5">
              {/* Form Side */}
              <div className="col-lg-6">
                <h4 className="fw-bold text-success mb-3">Send a Message</h4>
                {submitted ? (
                  <div className="alert alert-success d-flex align-items-center rounded-3 p-3">
                    <span className="fs-4 me-2">✉️</span>
                    <div>Thank you for your message! We will get back to you soon.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Your Name</label>
                      <input type="text" className="form-control" placeholder="Enter your name" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Your Email</label>
                      <input type="email" className="form-control" placeholder="name@example.com" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Message</label>
                      <textarea className="form-control" rows="4" placeholder="How can we help you?" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-success w-100 py-2 rounded-pill fw-bold shadow-sm">
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* Information Side */}
              <div className="col-lg-6">
                <h4 className="fw-bold text-success mb-3">Get in Touch</h4>
                <p className="text-muted mb-4">
                  Have questions about our organic standards, shipping, or selling on EcoHarvest?
                  Reach out to our support team and we will be happy to help.
                </p>
                <div className="p-4 bg-light rounded-3 border border-light-subtle">
                  <div className="d-flex align-items-center mb-3">
                    <span className="fs-3 me-3">📧</span>
                    <div>
                      <strong className="d-block">Email Support</strong>
                      <span className="text-muted">support@ecoharvest.com</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span className="fs-3 me-3">📞</span>
                    <div>
                      <strong className="d-block">Call Center</strong>
                      <span className="text-muted">+91 9876543210</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="fs-3 me-3">📍</span>
                    <div>
                      <strong className="d-block">Office Location</strong>
                      <span className="text-muted">CDAC, Mumbai, Maharashtra, India</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
