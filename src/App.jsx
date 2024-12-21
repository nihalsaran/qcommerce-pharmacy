import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import SearchPage from './pages/SeachPage/SearchPage';
import UploadPrescriptionPage from './pages/PrescriptionPage/UploadPrescriptionPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegistrationPage/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/upload" element={<UploadPrescriptionPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/cart" element={<div>Cart Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
