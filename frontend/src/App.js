import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Phone, Mail, Instagram } from 'lucide-react';
import './App.css';

// Import custom font
import '@fontsource/dm-sans';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart functions
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Vintage Brown Cap",
      price: 85000,
      image: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHx0aHJpZnQlMjBoYXR8ZW58MHx8fHwxNzUzNDQxNTg5fDA&ixlib=rb-4.1.0&q=85",
      description: "Topi vintage coklat dengan karakter unik, perfect untuk daily casual look"
    },
    {
      id: 2,
      name: "Classic Gray Hat",
      price: 75000,
      image: "https://images.unsplash.com/photo-1629381565693-75f7aab090b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHx0aHJpZnQlMjBoYXR8ZW58MHx8fHwxNzUzNDQxNTg5fDA&ixlib=rb-4.1.0&q=85",
      description: "Minimalist gray cap yang cocok untuk semua outfit, timeless banget!"
    },
    {
      id: 3,
      name: "Casual Cartoon Cap", 
      price: 90000,
      image: "https://images.unsplash.com/photo-1647528458336-c0eb575af956?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHx0aHJpZnQlMjBoYXR8ZW58MHx8fHwxNzUzNDQxNTg5fDA&ixlib=rb-4.1.0&q=85",
      description: "Baseball cap dengan desain cartoon yang fun dan playful"
    },
    {
      id: 4,
      name: "Thrift Collection Hat",
      price: 95000, 
      image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHx0aHJpZnQlMjBoYXR8ZW58MHx8fHwxNzUzNDQxNTg5fDA&ixlib=rb-4.1.0&q=85",
      description: "Koleksi spesial dari thrift store terbaik, limited edition!"
    }
  ];

  return (
    <div className="App font-dm-sans bg-cream-50 text-brown-900">
      <BrowserRouter>
        {/* Navigation */}
        <Navigation 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          cartItemsCount={getTotalItems()}
          setIsCartOpen={setIsCartOpen}
        />
        
        {/* Cart Sidebar */}
        <CartSidebar 
          isOpen={isCartOpen}
          setIsOpen={setIsCartOpen}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          totalPrice={getTotalPrice()}
        />

        <Routes>
          <Route 
            path="/" 
            element={
              <Homepage 
                products={products} 
                addToCart={addToCart}
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Navigation Component
const Navigation = ({ isMobileMenuOpen, setIsMobileMenuOpen, cartItemsCount, setIsCartOpen }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-card-gradient backdrop-blur-md border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="text-2xl font-bold text-brown-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            aflevering.jo
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-brown-700 hover:text-brown-900 transition-colors">Home</a>
            <a href="#products" className="text-brown-700 hover:text-brown-900 transition-colors">Koleksi</a>
            <a href="#about" className="text-brown-700 hover:text-brown-900 transition-colors">Tentang</a>
            <a href="#contact" className="text-brown-700 hover:text-brown-900 transition-colors">Kontak</a>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brown-700 hover:text-brown-900 transition-colors"
            >
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brown-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brown-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-cream-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-brown-700">Home</a>
                <a href="#products" className="block px-3 py-2 text-brown-700">Koleksi</a>
                <a href="#about" className="block px-3 py-2 text-brown-700">Tentang</a>
                <a href="#contact" className="block px-3 py-2 text-brown-700">Kontak</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Cart Sidebar Component
const CartSidebar = ({ isOpen, setIsOpen, cartItems, updateQuantity, totalPrice }) => {
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Generate WhatsApp message
    let message = "Halo! Saya mau order dari aflevering.jo:\n\n";
    cartItems.forEach(item => {
      message += `• ${item.name} x${item.quantity} - Rp${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\nTotal: Rp${totalPrice.toLocaleString()}\n\nTerima kasih!`;
    
    const whatsappUrl = `https://wa.me/087885020234?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          
          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white z-50 shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-cream-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-brown-900">Keranjang Belanja</h2>
                <button onClick={() => setIsOpen(false)}>
                  <X className="text-brown-700" size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <p className="text-brown-600 text-center py-8">Keranjang masih kosong nih!</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-cream-50 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-brown-900">{item.name}</h3>
                        <p className="text-brown-600">Rp{item.price.toLocaleString()}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-brown-200 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-brown-200 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-cream-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-brown-900">
                    Rp{totalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-brown-600 text-white py-3 rounded-lg hover:bg-brown-700 transition-colors"
                >
                  Checkout via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Homepage Component
const Homepage = ({ products, addToCart }) => {
  return (
    <div>
      <HeroSection />
      <ProductSection products={products} addToCart={addToCart} />
      <AboutSection />
      <TestimonialSection />
      <InstagramSection />
      <ContactSection />
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-hero-gradient pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-brown-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              First Only Hat
            </motion.h1>
            <motion.p 
              className="text-xl lg:text-2xl text-brown-700 mb-8 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Casual Look from <span className="text-brown-900 font-bold">aflevering.jo</span>
            </motion.p>
            <motion.p 
              className="text-lg text-brown-600 mb-10 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Koleksi topi thrift pilihan dengan gaya casual dan timeless. Perfect buat anak muda yang suka tampil beda.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button 
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="bg-brown-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-brown-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Lihat Koleksi
              </button>
              <a 
                href="https://instagram.com/aflevering.jo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-brown-600 text-brown-600 px-8 py-4 rounded-xl font-semibold hover:bg-brown-600 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Cek IG Kami
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1614584935799-2882f2ee56d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBoYXQlMjBsaWZlc3R5bGV8ZW58MHx8fHwxNzUzNDQxNTk3fDA&ixlib=rb-4.1.0&q=85"
                alt="Model wearing casual hat"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating decorative elements */}
            <motion.div 
              className="absolute -top-4 -left-4 w-24 h-24 bg-brown-200 rounded-full opacity-60"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-4 -right-4 w-32 h-32 bg-sage-200 rounded-full opacity-50"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default App;