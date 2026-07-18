import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer({ 
  cartItems, 
  isOpen, 
  onClose, 
  onUpdateQty, 
  onRemoveItem, 
  onCheckoutOpen 
}) {
  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <>
      {/* Background Dim Backdrop */}
      <div 
        className={`cart-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />

      {/* Cart Slider Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        
        {/* Header */}
        <div className="cart-header">
          <h3 className="cart-title">Meu Carrinho</h3>
          <button className="cart-close-btn" onClick={onClose} aria-label="Fechar Carrinho">
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Items Container */}
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="cart-item">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="cart-item-img"
                />
                
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.product.name}</h4>
                  <div className="cart-item-meta">
                    <span>Tamanho: <strong>{item.size}</strong></span>
                  </div>

                  <div className="cart-item-actions">
                    {/* Quantity controls */}
                    <div className="qty-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.product.id, item.size, -1)}
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQty(item.product.id, item.size, 1)}
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button 
                      className="icon-btn" 
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      style={{ color: 'var(--text-muted)' }}
                      aria-label="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty">
              <p style={{ fontSize: '1rem', textAlign: 'center' }}>Seu carrinho está vazio.</p>
              <button 
                className="btn btn-primary" 
                onClick={onClose}
                style={{ padding: '0.6rem 1.5rem', fontSize: '0.75rem' }}
              >
                Explorar Looks
              </button>
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span className="cart-summary-label">Subtotal</span>
              <span className="cart-summary-value">{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary-line">
              <span className="cart-summary-label">Frete</span>
              <span className="cart-summary-value text-neon-green" style={{ fontWeight: '700' }}>
                GRÁTIS
              </span>
            </div>
            
            <div className="cart-summary-line" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem', marginTop: '1rem' }}>
              <span className="cart-summary-label" style={{ color: 'var(--text-primary)', fontWeight: '700' }}>Total</span>
              <span className="cart-summary-value cart-summary-total">{formatPrice(subtotal)}</span>
            </div>

            <button 
              className="btn btn-primary"
              onClick={() => {
                onCheckoutOpen();
                onClose();
              }}
              style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', justifyContent: 'center' }}
            >
              Finalizar Pedido <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </>
  );
}
