import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showLogin1Popup, setShowLogin1Popup] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = originalResults.filter((medicine) =>
      medicine.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
    setSearchPerformed(true);
  };

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(
          "https://api-pharmit.online/api/medicines?populate=*"
        );
        const jsonData = await response.json();
        setOriginalResults(jsonData.data);
        setResults(jsonData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMedicines();
  }, []);

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setSearchPerformed(false);
      setResults(originalResults);
      return;
    }

    const filteredSuggestions = originalResults.filter((medicine) =>
      medicine.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5));
  };

  const handleSuggestionClick = (suggestionName) => {
    setQuery(suggestionName);
    setSuggestions([]);
    const filteredResults = originalResults.filter(
      (medicine) =>
        medicine.name.toLowerCase() === suggestionName.toLowerCase()
    );
    setResults(filteredResults);
    setSearchPerformed(true);
  };

  const handleAddToCart = (medicine) => {
    if (!isAuthenticated) {
      setShowLogin1Popup(true);
      return;
    }
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex((item) => item.id === medicine.id);
  
    if (itemIndex !== -1) {
      cart[itemIndex].quantity += 1;
    } else {
      cart.push({ ...medicine, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${medicine.name} added to the cart!`);
  };

  const handleCartClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowLoginPopup(true);
    }
  };

  return (
    <div className="search-page">
      <header className="header">
        <button onClick={handleBack} className="back-button">
          ← Back
        </button>
        <div className="logo">PharmIt</div>
        <nav className="nav">
          <Link to="/cart" onClick={handleCartClick} className="cart-link">Cart</Link>
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

{showLogin1Popup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Please Login</h3>
            <p>You need to login to add medicines to the cart</p>
            <div className="popup-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <button onClick={() => setShowLogin1Popup(false)} className="close-btn">Close</button>
            </div>
          </div>
        </div>
      )}

      <section className="search-section">
        <h1>Search for Medicines</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter medicine name"
            value={query}
            onChange={handleQueryChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion.name)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}

        {searchPerformed && (
          <div className="results">
            {results.length === 0 ? (
              <p>No medicines found</p>
            ) : (
              results.map((medicine) => (
                <div key={medicine.id} className="medicine-item">
                  <h3>{medicine.name}</h3>

                  {/* Render description as paragraphs */}
                  {medicine.description.map((descBlock, idx) => (
                    <p key={idx}>
                      {descBlock.children
                        .map((child) => child.text)
                        .join(" ")}
                    </p>
                  ))}

                  {/* Display medicine image */}
                  <img
                    src={`https://api-pharmit.online${medicine.image[0].url}`}
                    alt={medicine.name}
                    className="medicine-image"
                  />

                  <p className="price">₹{medicine.price}</p>

                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(medicine)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>&copy; 2024 PharmIt. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SearchPage;
