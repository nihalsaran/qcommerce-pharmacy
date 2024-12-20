import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './LandingPage.css';

const LandingPage = () => {
  const medicines = [
    { name: 'Paracetamol', description: 'Pain reliever and a fever reducer.' },
    { name: 'Ibuprofen', description: 'Nonsteroidal anti-inflammatory drug (NSAID).' },
    { name: 'Aspirin', description: 'Used to reduce pain, fever, or inflammation.' },
    { name: 'Antacid', description: 'Neutralizes stomach acidity.' },
    { name: 'Cough Syrup', description: 'Relieves cough and throat irritation.' },
    { name: 'Antihistamine', description: 'Relieves allergy symptoms.' },
    { name: 'Vitamin C', description: 'Boosts the immune system.' },
    { name: 'Loperamide', description: 'Used to treat diarrhea.' }
  ];

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">PharmIt</div>
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
          {medicines.map((medicine, idx) => (
            <div key={idx} className="medicine-item">
              <h3>{medicine.name}</h3>
              <p>{medicine.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 PharmIt. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
