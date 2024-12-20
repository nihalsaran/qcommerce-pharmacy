import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SearchPage from './pages/SeachPage/SearchPage';
import UploadPrescriptionPage from './pages/PrescriptionPage/UploadPrescriptionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/upload" element={<UploadPrescriptionPage/>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/cart" element={<div>Cart Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
