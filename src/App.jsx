import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'

const App = () => {
  return (
    <div>
      
        <BrowserRouter>
          <Navbar />

          
            <Routes>
              <Route path="/" element={<Navigate to="/products" />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
          
        </BrowserRouter>
      
    </div>
  );
}

export default App