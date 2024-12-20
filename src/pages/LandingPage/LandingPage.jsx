import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">MediQuick</div>
        <nav className="nav">
          <Link to="/login">Login</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Get Your Medicines Delivered Fast</h1>
        <p className="hero-text">Search or upload your prescription to get started.</p>
        <div className="cta-buttons">
          <Link to="/search" className="cta-button search-btn">Search for Medicines</Link>
          <Link to="/upload" className="cta-button upload-btn">Upload Prescription</Link>
        </div>
      </section>

      {/* Popular Medicines Section */}
      <section className="popular-medicines">
        <h2 className="section-title">Popular Medicines</h2>
        <div className="medicine-grid">
          {/* Replace with dynamic content */}
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="medicine-item">
              <h3>Medicine {idx + 1}</h3>
              <p>Description of medicine {idx + 1}.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 MediQuick. All rights reserved.</p>
        <p>Contact Us: support@mediquick.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;
