import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './UploadPrescriptionPage.css';

const UploadPrescriptionPage = () => {
  const [image, setImage] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Set image preview
    }
  };

  // Handle OCR processing
  const handleExtractText = () => {
    if (!image) {
      alert('Please upload an image');
      return;
    }

    setLoading(true);

    Tesseract.recognize(image, 'eng', {
      logger: (m) => console.log(m), // Log progress
    })
      .then(({ data: { text } }) => {
        setOcrResult(text); // Display extracted text
        extractMedicines(text); // Extract medicines from the text
      })
      .catch((err) => {
        console.error('OCR Error:', err);
        alert('Error extracting text from the image');
      })
      .finally(() => setLoading(false));
  };

  // Extract medicine names (mock function for demo)
  const extractMedicines = (text) => {
    // Example extraction - replace with more sophisticated NLP or regex logic
    const mockMedicines = ['Paracetamol', 'Aspirin', 'Ibuprofen'];
    const foundMedicines = mockMedicines.filter((medicine) => text.includes(medicine));
    setMedicines(foundMedicines);
  };

  return (
    <div className="upload-page">
      <header className="header">
        <div className="logo">MediQuick</div>
      </header>

      <section className="upload-section">
        <h1>Upload Your Prescription</h1>
        
        {/* Image Upload Section */}
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

        {/* OCR Processing Button */}
        <button onClick={handleExtractText} className="extract-button" disabled={loading}>
          {loading ? 'Processing...' : 'Extract Text from Prescription'}
        </button>

        {/* OCR Result and Medicine List */}
        {ocrResult && (
          <div className="ocr-result">
            <h2>Extracted Text:</h2>
            <p>{ocrResult}</p>
          </div>
        )}

        {/* Medicine List */}
        {medicines.length > 0 && (
          <div className="medicine-list">
            <h3>Medicines Found:</h3>
            <ul>
              {medicines.map((medicine, idx) => (
                <li key={idx}>{medicine}</li>
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
