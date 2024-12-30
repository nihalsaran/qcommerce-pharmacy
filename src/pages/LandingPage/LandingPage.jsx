import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LandingPage.css';

const API_BASE_URL = 'https://api-pharmit.online/api'; // Replace with your Strapi base URL

const LandingPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/medicines?populate=*`);
        setMedicines(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medicines:', error);
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLoginPopup(true);
    }
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/medicines?populate=*`);
        setMedicines(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medicines:', error);
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="logo">PharmIt</div>
        <nav className="nav">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-link">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
          <Link to="/cart" onClick={handleCartClick}>Cart</Link>
        </nav>
      </header>

      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Please Login</h3>
            <p>You need to login to access the cart</p>
            <div className="popup-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <button onClick={() => setShowLoginPopup(false)} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}

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
        {loading ? (
          <p>Loading medicines...</p>
        ) : (
          <div className="medicine-grid">
            {medicines.map((medicine) => {
              const { id, name, description, price, image } = medicine;

              // Extracting the image URL (thumbnail format)
              const imageUrl = image?.[0]?.formats?.thumbnail?.url
                ? `https://api-pharmit.online${image[0].formats.thumbnail.url}`
                : null;

              // Extracting a textual description
              const descriptionText =
                description?.[0]?.children?.[0]?.text || 'No description available.';

              return (
                <div key={id} className="medicine-item">
                  {imageUrl && <img src={imageUrl} alt={name} className="medicine-image" />}
                  <h3>{name}</h3>
                  <p>{descriptionText}</p>
                  <p><strong>Price:</strong> ₹{price}</p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 PharmIt. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;