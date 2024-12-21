import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import nlp from 'compromise';
import './UploadPrescriptionPage.css';

const UploadPrescriptionPage = () => {
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Extract text from prescription using Tesseract.js OCR
  const handleExtractText = () => {
    if (!image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);

    Tesseract.recognize(image, 'eng', {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setOcrResult(text); // Set the extracted text
        extractMedicinesWithCompromise(text); // Pass the text to Compromise.js for extraction
      })
      .catch((err) => {
        console.error('OCR Error:', err);
        alert('Error extracting text from the image');
      })
      .finally(() => setLoading(false));
  };

  // Extract medicine names using Compromise.js
  const extractMedicinesWithCompromise = (text) => {
    try {
      const doc = nlp(text); // Process the text using Compromise.js
      const medicineEntities = doc.match('#Medicine').out('array'); // Extract entities related to medicines

      setMedicines(medicineEntities); // Set extracted medicines to state
    } catch (err) {
      console.error('Error extracting medicines:', err);
      alert('Error processing the medicines');
    }
  };

  // Handle adding medicine to cart
  const handleAddToCart = (medicine) => {
    console.log(`${medicine} added to cart.`);
    // Implement the actual cart logic here (e.g., update state, save to localStorage, etc.)
  };

  return (
    <div className="upload-page">
      <header className="header">
        <div className="logo">MediQuick</div>
      </header>

      <section className="upload-section">
        <h1>Upload Your Prescription</h1>

        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="upload-input"
        />

        {image && (
          <div className="image-preview">
            <img src={image} alt="Prescription Preview" />
          </div>
        )}

        {/* Extract text button */}
        <button onClick={handleExtractText} className="extract-button" disabled={loading}>
          {loading ? 'Processing...' : 'Extract Text from Prescription'}
        </button>

        {/* OCR result */}
        {ocrResult && (
          <div className="ocr-result">
            <h2>Extracted Text:</h2>
            <p>{ocrResult}</p>
          </div>
        )}

        {/* Display medicines */}
        {medicines.length > 0 && (
          <div className="medicine-list">
            <h3>Medicines Found:</h3>
            <ul>
              {medicines.map((medicine, idx) => (
                <li key={idx}>
                  {medicine}
                  <button onClick={() => handleAddToCart(medicine)} className="add-to-cart">
                    Add to Cart
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <footer className="footer">
        <p>&copy; 2024 MediQuick. All rights reserved.</p>
        <p>Contact Us: support@mediquick.com</p>
      </footer>
    </div>
  );
};

export default UploadPrescriptionPage;
