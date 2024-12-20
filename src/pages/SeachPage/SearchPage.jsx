import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); // Add this hook

  // Sample data (Replace this with data fetched from backend)
  const medicineList = [
    { id: 1, name: 'Paracetamol', description: 'Pain reliever and fever reducer' },
    { id: 2, name: 'Aspirin', description: 'Anti-inflammatory drug' },
    { id: 3, name: 'Ibuprofen', description: 'Anti-inflammatory and pain relief' },
    { id: 4, name: 'Amoxicillin', description: 'Antibiotic for infections' },
    // Add more medicine data here...
  ];
  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = medicineList.filter((medicine) =>
      medicine.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  };

  useEffect(() => {
    setSuggestions([]); // Clear suggestions on mount
  }, []);

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = medicineList.filter((medicine) =>
      medicine.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestionName) => {
    setQuery(suggestionName);
    setSuggestions([]); // Clear suggestions when one is selected
  };

  return (
    <div className="search-page">
      <header className="header">
      <button onClick={handleBack} className="back-button">
          ← Back
        </button>
        <div className="logo">MediQuick</div>
      </header>

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
          <button type="submit" className="search-button">Search</button>
        </form>

        {/* Display Suggestions */}
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.slice(0, 5).map((suggestion) => (
              <li key={suggestion.id} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion.name)}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}

        <div className="results">
          {results.length === 0 ? (
            <p>No medicines found</p>
          ) : (
            results.map((medicine) => (
              <div key={medicine.id} className="medicine-item">
                <h3>{medicine.name}</h3>
                <p>{medicine.description}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 MediQuick. All rights reserved.</p>
        <p>Contact Us: support@mediquick.com</p>
      </footer>
    </div>
  );
};

export default SearchPage;
