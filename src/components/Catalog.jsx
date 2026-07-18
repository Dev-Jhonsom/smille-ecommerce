import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { RotateCcw, Loader, AlertTriangle } from 'lucide-react';

export default function Catalog({ 
  products, 
  loading = false,
  apiError = false,
  activeTab, 
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery, 
  setSearchQuery, 
  onAddToCart, 
  onQuickView 
}) {
  const [priceRange, setPriceRange] = useState(350);
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['todos', 'roupas', 'conjuntos', 'acessorios'];

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('todos');
    setPriceRange(350);
    setSearchQuery('');
    setSortBy('featured');
  };

  // Ordenacao local dos produtos recebidos da API
  const filteredProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low')  return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating')     return b.rating - a.rating;
    return 0;
  });

  return (
    <section className="catalog-section" id="catalog-section">
      <div className="container">
        
        {/* Catalog header controls */}
        <div className="catalog-header">
          <div>
            <h2 className="catalog-title">
              Looks {activeTab === 'todos' ? 'de Festival' : activeTab === 'feminino' ? 'Femininos' : 'Masculinos'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {filteredProducts.length} itens encontrados
            </p>
          </div>

          <div className="catalog-controls">
            <label htmlFor="sort-select" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ordenar por:</label>
            <select 
              id="sort-select" 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Destaques</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="rating">Avaliação</option>
            </select>
          </div>
        </div>

        {/* Catalog grid and filters */}
        <div className="catalog-shell">
          
          {/* Filters Sidebar */}
          <aside className="filters-sidebar glass">
            <div className="filter-group">
              <h4 className="filter-group-title">Coleção</h4>
              <div className="filter-list">
                <button 
                  className={`filter-btn ${activeTab === 'todos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('todos')}
                >
                  Tudo
                </button>
                <button 
                  className={`filter-btn ${activeTab === 'feminino' ? 'active' : ''}`}
                  onClick={() => setActiveTab('feminino')}
                >
                  Feminino
                </button>
                <button 
                  className={`filter-btn ${activeTab === 'masculino' ? 'active' : ''}`}
                  onClick={() => setActiveTab('masculino')}
                >
                  Masculino
                </button>
              </div>
            </div>

            <div className="filter-group">
              <h4 className="filter-group-title">Categoria</h4>
              <div className="filter-list">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {cat === 'todos' ? 'Todas Categorias' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4 className="filter-group-title">Preço Máximo</h4>
              <div className="price-range">
                <input 
                  type="range" 
                  min="50" 
                  max="350" 
                  step="10"
                  className="price-slider"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <div className="price-label">
                  <span>R$ 50</span>
                  <span className="text-neon-green" style={{ fontWeight: '700' }}>
                    R$ {priceRange.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button 
              className="btn btn-secondary" 
              onClick={resetFilters}
              style={{ width: '100%', marginTop: '1rem', padding: '0.6rem 1rem', fontSize: '0.75rem', gap: '0.4rem' }}
            >
              <RotateCcw size={14} /> Limpar Filtros
            </button>
          </aside>

          {/* Grid panel */}
          <main>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px', color: 'var(--text-muted)', gap: '0.75rem' }}>
                <Loader size={22} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Carregando looks...</span>
              </div>
            ) : apiError ? (
              <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '8px', color: 'var(--text-muted)' }}>
                <AlertTriangle size={40} style={{ color: 'var(--accent-pink)', marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Não foi possível conectar ao servidor.</p>
                <p style={{ fontSize: '0.85rem' }}>Verifique se o backend Python está rodando em localhost:8000.</p>
              </div>
            ) : products.length > 0 ? (
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="glass" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '8px', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Nenhum look encontrado com os filtros atuais.</p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Limpar Filtros
                </button>
              </div>
            )}
          </main>

        </div>

      </div>
    </section>
  );
}
