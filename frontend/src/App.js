import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Phone, Mail, Instagram } from 'lucide-react';
import './App.css';

// Import custom font
import '@fontsource/dm-sans/300.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/800.css';

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

// Product Section
const ProductSection = ({ products, addToCart }) => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-brown-900 mb-6">
            Koleksi Best Seller
          </h2>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Pilihan topi thrift terbaik yang lagi hits di kalangan anak muda. 
            Gaya casual yang timeless banget!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-card-gradient backdrop-blur-sm rounded-2xl p-6 hover-lift border border-cream-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-xl font-semibold text-brown-900 mb-2">
                {product.name}
              </h3>
              <p className="text-brown-600 mb-4 text-sm leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-brown-800">
                  Rp{product.price.toLocaleString()}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-brown-600 text-white px-6 py-2 rounded-lg hover:bg-brown-700 transition-all duration-300 hover:scale-105 font-medium"
                >
                  Beli
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <button 
            onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            className="bg-sage-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-sage-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Belanja Sekarang
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1616097143949-4200a5dfe3ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxjYXN1YWwlMjBoYXQlMjBsaWZlc3R5bGV8ZW58MHx8fHwxNzUzNDQxNTk3fDA&ixlib=rb-4.1.0&q=85"
              alt="Thrift lifestyle"
              className="w-full h-96 object-cover rounded-2xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-brown-900 mb-6">
              Tentang Kami
            </h2>
            <div className="space-y-6 text-lg text-brown-700">
              <p>
                <span className="font-semibold text-brown-900">aflevering.jo</span> lahir dari 
                kecintaan kami terhadap fashion berkelanjutan dan gaya hidup minimalis. 
                Kami percaya bahwa setiap topi punya cerita dan karakter uniknya sendiri.
              </p>
              <p>
                Di tengah era fast fashion, kami memilih jalur berbeda. Kami menghadirkan 
                koleksi topi thrift pilihan yang nggak cuma stylish, tapi juga punya nilai 
                sejarah dan kualitas yang terjamin.
              </p>
              <p>
                <span className="font-semibold text-brown-900">Philosophy kami simple:</span> 
                Fashion yang baik itu timeless, sustainable, dan accessible. Setiap topi yang 
                kami pilih udah melewati kurasi ketat buat mastiin kualitas dan style-nya 
                cocok untuk anak muda masa kini.
              </p>
            </div>

            <motion.div 
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white px-6 py-3 rounded-full shadow-md">
                <span className="text-brown-700 font-medium">🌱 Sustainable Fashion</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-md">
                <span className="text-brown-700 font-medium">👒 Curated Collection</span>
              </div>
              <div className="bg-white px-6 py-3 rounded-full shadow-md">
                <span className="text-brown-700 font-medium">✨ Timeless Style</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Section
const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah",
      text: "Topinya bagus banget! Kualitas oke dan stylenya unique. Udah beli 3 topi disini dan semua cocok banget sama outfit aku.",
      image: "https://images.unsplash.com/photo-1619258113133-3056f1ac9250?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxjYXN1YWwlMjBoYXQlMjBsaWZlc3R5bGV8ZW58MHx8fHwxNzUzNDQxNTk3fDA&ixlib=rb-4.1.0&q=85",
      rating: 5
    },
    {
      name: "Dito",
      text: "Pelayanannya ramah dan topinya sesuai ekspektasi. Harga juga reasonable untuk kualitas vintage gini. Recommended!",
      image: "https://images.unsplash.com/photo-1739289696445-498f61c9f3ab?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxjYXN1YWwlMjBoYXQlMjBsaWZlc3R5bGV8ZW58MHx8fHwxNzUzNDQxNTk3fDA&ixlib=rb-4.1.0&q=85",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-brown-900 mb-6">
            Kata Mereka
          </h2>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto">
            Testimoni dari customer yang udah merasakan kualitas topi aflevering.jo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Sticky note style */}
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 border-l-4 border-yellow-400">
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-brown-900">{testimonial.name}</h4>
                    <div className="flex text-yellow-500 text-sm">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-brown-800 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              
              {/* Pin effect */}
              <div className="absolute -top-2 left-6 w-4 h-4 bg-red-500 rounded-full shadow-md"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Instagram Section
const InstagramSection = () => {
  const instagramPosts = [
    "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHx0aHJpZnQlMjBoYXR8ZW58MHx8fHwxNzUzNDQxNTg5fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1629381565693-75f7aab090b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHx0aHJpZnQlMjBoYXR8ZW58MHx8fHwxNzUzNDQxNTg5fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1647528458336-c0eb575af956?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHw0fHx0aHJpZnQlMjBoYXR8ZW58MHx8fHwxNzUzNDQxNTg5fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1614584935799-2882f2ee56d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBoYXQlMjBsaWZlc3R5bGV8ZW58MHx8fHwxNzUzNDQxNTk3fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1616097143949-4200a5dfe3ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxjYXN1YWwlMjBoYXQlMjBsaWZlc3R5bGV8ZW58MHx8fHwxNzUzNDQxNTk3fDA&ixlib=rb-4.1.0&q=85",
    "https://images.unsplash.com/photo-1619258113133-3056f1ac9250?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxjYXN1YWwlMjBoYXQlMjBsaWZlc3R5bGV8ZW58MHx8fHwxNzUzNDQxNTk3fDA&ixlib=rb-4.1.0&q=85"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-brown-900 mb-6">
            Follow Our Journey
          </h2>
          <p className="text-xl text-brown-600 max-w-2xl mx-auto mb-8">
            Lihat koleksi terbaru dan daily inspiration dari 
            <a 
              href="https://instagram.com/aflevering.jo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brown-800 font-semibold hover:text-brown-900 transition-colors"
            >
              {' '}@aflevering.jo
            </a>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={post}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-48 lg:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="text-white" size={32} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <a
            href="https://instagram.com/aflevering.jo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Instagram size={24} />
            <span>Follow @aflevering.jo</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-brown-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's Connect!
          </h2>
          <p className="text-xl text-brown-200 max-w-2xl mx-auto">
            Ada pertanyaan atau mau custom order? Jangan ragu buat hubungi kami ya!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.a
            href="https://wa.me/087885020234"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 p-8 rounded-2xl text-center hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Phone className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-green-100">+62 821-1498-7245</p>
          </motion.a>

          <motion.a
            href="https://instagram.com/aflevering.jo"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-pink-500 to-orange-500 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Instagram className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
            <h3 className="text-xl font-semibold mb-2">Instagram</h3>
            <p className="text-pink-100">@aflevering.jo</p>
          </motion.a>

          <motion.a
            href="mailto:afleveringjo@gmail.com"
            className="bg-blue-600 p-8 rounded-2xl text-center hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Mail className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={48} />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-blue-100">afleveringjo@gmail.com</p>
          </motion.a>
        </div>

        <motion.div 
          className="text-center mt-16 pt-8 border-t border-brown-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-brown-300 mb-4">
            © 2025 aflevering.jo - All rights reserved
          </p>
          <p className="text-brown-400 text-sm">
            Made with ❤️ for thrift lovers everywhere
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default App;