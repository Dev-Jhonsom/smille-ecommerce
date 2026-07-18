import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import CategoryGrid from './components/CategoryGrid';
import Catalog from './components/Catalog';
import Newsletter from './components/Newsletter';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { products } from './data/products';

export default function App() {
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  
  // Modals visibility state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Wrapper for switching departments (resets category filter)
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory('todos');
  };

  // Cart actions
  const handleAddToCart = (product, size) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex].quantity += 1;
        return updated;
      } else {
        return [...prevItems, { product, size, quantity: 1 }];
      }
    });
    
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId, size, change) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (productId, size) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open Quick View detail modal
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  // Scroll to catalog section smoothly
  const scrollToCatalog = () => {
    const section = document.getElementById('catalog-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Count total quantity of items in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Navigation Header with Top Announcement Marquee */}
      <Header 
        cartCount={cartCount} 
        onCartOpen={() => setIsCartOpen(true)} 
        activeTab={activeTab} 
        setActiveTab={handleActiveTabChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Slideshow Banner */}
      <Hero 
        onCtaClick={scrollToCatalog} 
        setActiveTab={handleActiveTabChange} 
      />

      {/* Value Propositions / Vantagens bar */}
      <Features />

      {/* Explore Collections visual category cards */}
      <CategoryGrid 
        setActiveTab={setActiveTab}
        setSelectedCategory={setSelectedCategory}
        onCtaClick={scrollToCatalog} 
      />

      {/* Catalog & Filter controls */}
      <Catalog 
        products={products}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddToCart={handleAddToCart}
        onQuickView={handleQuickView}
      />

      {/* Club Smille Newsletter Sign Up */}
      <Newsletter />

      {/* Footer Details */}
      <Footer 
        setActiveTab={handleActiveTabChange} 
        onCtaClick={scrollToCatalog}
      />

      {/* Cart Slider Drawer */}
      <CartDrawer 
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckoutOpen={() => setIsCheckoutOpen(true)}
      />

      {/* Product Details Modal Overlay with front/back thumbnails selector */}
      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Simulated Checkout Form Steps */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />
    </>
  );
}
