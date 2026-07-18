import React from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onQuickView, onAddToCart }) {
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="product-card glass glass-hover">
      <div className="product-image-container" onClick={() => onQuickView(product)}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image main-img"
        />
        <img 
          src={product.hoverImage} 
          alt={`${product.name} - verso`} 
          className="product-image hover-img"
        />
        
        {/* Overlay showing Quick View button */}
        <div className="quick-view-overlay">
          <button 
            className="btn btn-secondary" 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', gap: '0.25rem' }}
          >
            <Eye size={14} /> Espiar
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name" onClick={() => onQuickView(product)} style={{ cursor: 'pointer' }}>
          {product.name}
        </h3>
        
        <div className="product-meta">
          <div className="product-price">{formatPrice(product.price)}</div>
          <div className="product-rating">
            <Star size={14} fill="#fbbf24" stroke="none" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => onAddToCart(product, product.sizes[0] || 'U')}
          style={{ width: '100%', marginTop: '1.25rem', padding: '0.6rem 1rem', fontSize: '0.75rem' }}
        >
          <ShoppingCart size={14} /> Adicionar
        </button>
      </div>
    </div>
  );
}
