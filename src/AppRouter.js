import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import BuyProductPage from './components/BuyProductPage';
// import AboutPage from './AboutPage'; // Import the AboutPage component

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/buyproduct" element={<BuyProductPage />} />
        {/* <Route path="/about" element={<AboutPage />} /> // Add a new route for AboutPage */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
