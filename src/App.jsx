import React, { useState, useEffect } from 'react';
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
import { getProducts } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Produtos vindos da API
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── Fetch produtos da API ──────────────────────────────────────────────────
  useEffect(() => {
    setLoadingProducts(true);
    setApiError(false);

    const filters = {};
    if (activeTab !== 'todos') filters.department = activeTab;
    if (selectedCategory !== 'todos') filters.category = selectedCategory;
    if (searchQuery.trim()) filters.search = searchQuery.trim();

    getProducts(filters)
      .then((data) => {
        // Normaliza o campo sizes para ser compatível com o frontend
        const normalized = data.map((p) => ({
          ...p,
          sizes: typeof p.sizes === 'string' ? JSON.parse(p.sizes) : p.sizes,
          reviewsCount: p.reviews_count,
          hoverImage: p.hover_image,
          inStock: p.in_stock,
        }));
        setProducts(normalized);
      })
      .catch(() => setApiError(true))
      .finally(() => setLoadingProducts(false));
  }, [activeTab, selectedCategory, searchQuery]);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory('todos');
  };

  const handleAddToCart = (product, size) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += 1;
        return updated;
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId, size, change) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const handleClearCart = () => setCartItems([]);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const scrollToCatalog = () => {
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        activeTab={activeTab}
        setActiveTab={handleActiveTabChange}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Hero onCtaClick={scrollToCatalog} setActiveTab={handleActiveTabChange} />

      <Features />

      <CategoryGrid
        setActiveTab={setActiveTab}
        setSelectedCategory={setSelectedCategory}
        onCtaClick={scrollToCatalog}
      />

      <Catalog
        products={products}
        loading={loadingProducts}
        apiError={apiError}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddToCart={handleAddToCart}
        onQuickView={handleQuickView}
      />

      <Newsletter />

      <Footer setActiveTab={handleActiveTabChange} onCtaClick={scrollToCatalog} />

      <CartDrawer
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckoutOpen={() => setIsCheckoutOpen(true)}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />
    </>
  );
}
