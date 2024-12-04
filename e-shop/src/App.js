// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'
import Products from './Components/Products';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Register from './Components/Register';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ProtectedWrapper from './Components/ProtectedWrapper'
import Launcher from './Components/Launcher';



function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
          <Navbar/>
            <Routes>
              <Route element={<ProtectedWrapper />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
              </Route >
              <Route path='/' element={<Launcher />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;