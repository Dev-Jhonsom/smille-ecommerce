import React, { useState, useEffect } from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState('');

  // Reset selected size and active image when product changes or modal opens
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'U');
      setActiveImage(product.image);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const imagesList = [product.image, product.hoverImage].filter(Boolean);

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Fechar Detalhes">
          <X size={20} />
        </button>

        <div className="detail-modal-layout">
          {/* Left panel: Image & Thumbnails */}
          <div className="detail-modal-image-panel">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="detail-modal-img"
            />
            
            {/* Interactive Image Thumbnails */}
            {imagesList.length > 1 && (
              <div className="thumbnail-list">
                {imagesList.map((imgUrl, idx) => (
                  <button 
                    key={idx}
                    className={`thumbnail-item ${activeImage === imgUrl ? 'active' : ''}`}
                    onClick={() => setActiveImage(imgUrl)}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`Miniatura ${idx + 1}`} 
                      className="thumbnail-img"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right panel: Information */}
          <div className="detail-modal-info-panel">
            <span className="product-category" style={{ marginBottom: '0.5rem' }}>{product.category}</span>
            <h2 className="detail-modal-name">{product.name}</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="detail-modal-price">{formatPrice(product.price)}</div>
              <div className="product-rating" style={{ padding: '0.25rem 0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }}>
                <Star size={14} fill="#fbbf24" stroke="none" />
                <span style={{ fontWeight: '600', color: '#d1a153' }}>{product.rating.toFixed(1)}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '0.25rem' }}>({product.reviewsCount} avaliações)</span>
              </div>
            </div>

            <p className="detail-modal-desc">{product.description}</p>

            {/* Sizing selector */}
            {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'U' && (
              <div className="detail-modal-options">
                <h4 className="options-title">Selecione o tamanho</h4>
                <div className="size-selector">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart button */}
            <button 
              className="btn btn-primary"
              onClick={() => {
                onAddToCart(product, selectedSize || 'U');
                onClose();
              }}
              style={{ width: '100%', marginTop: 'auto', padding: '1rem' }}
            >
              <ShoppingCart size={18} /> Adicionar ao Carrinho
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
