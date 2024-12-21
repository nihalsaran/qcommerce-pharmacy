import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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
        const response = await fetch('https://scz1zjz2-1337.inc1.devtunnels.ms/api/medicines?populate=*');
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

    if (value.trim() === '') {
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
    const filteredResults = originalResults.filter((medicine) =>
      medicine.name.toLowerCase() === suggestionName.toLowerCase()
    );
    setResults(filteredResults);
    setSearchPerformed(true);
  };

  return (
    <div className="search-page">
      <header className="header">
        <button onClick={handleBack} className="back-button">
          ← Back
        </button>
        <div className="logo">PharmIt</div>
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
                  {Array.isArray(medicine.description) ? (
                    medicine.description.map((descBlock, idx) => (
                      <p key={idx}>
                        {descBlock.children.map(child => child.text).join(' ')}
                      </p>
                    ))
                  ) : (
                    <p>{medicine.description}</p>
                  )}
                  <button className="add-to-cart">Add to Cart</button>
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