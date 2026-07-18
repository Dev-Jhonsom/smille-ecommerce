import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, QrCode, FileText } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [shippingForm, setShippingForm] = useState({
    nome: '',
    email: '',
    cep: '',
    endereco: '',
    cidade: ''
  });

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shippingForm.nome || !shippingForm.email || !shippingForm.cep || !shippingForm.endereco) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Simulate payment API call
    setStep(3);
    onClearCart();
  };

  const handleClose = () => {
    // Reset state when closing
    setStep(1);
    setPaymentMethod('pix');
    setShippingForm({
      nome: '',
      email: '',
      cep: '',
      endereco: '',
      cidade: ''
    });
    onClose();
  };

  const mockOrderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
        
        {/* Close Button */}
        {step !== 3 && (
          <button className="modal-close-btn" onClick={handleClose} aria-label="Fechar Checkout">
            <X size={20} />
          </button>
        )}

        <div className="checkout-modal-layout">
          
          {/* Steps Progress Indicator */}
          <div className="checkout-steps-bar">
            <div className={`checkout-step-indicator ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <div className={`checkout-step-indicator ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
              {step > 2 ? '✓' : '2'}
            </div>
            <div className={`checkout-step-indicator ${step === 3 ? 'active' : ''}`}>
              3
            </div>
          </div>

          {/* STEP 1: SHIPPING INFORMATION */}
          {step === 1 && (
            <div>
              <h3 className="detail-modal-name" style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Dados de Envio
              </h3>
              <form onSubmit={handleShippingSubmit} className="checkout-form">
                <div className="form-group">
                  <label className="form-label">Nome Completo *</label>
                  <input 
                    type="text" 
                    name="nome" 
                    required 
                    className="form-input" 
                    value={shippingForm.nome}
                    onChange={handleInputChange}
                    placeholder="João da Silva"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">E-mail *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="form-input" 
                    value={shippingForm.email}
                    onChange={handleInputChange}
                    placeholder="joao@exemplo.com"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">CEP *</label>
                    <input 
                      type="text" 
                      name="cep" 
                      required 
                      className="form-input" 
                      value={shippingForm.cep}
                      onChange={handleInputChange}
                      placeholder="01000-000"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cidade *</label>
                    <input 
                      type="text" 
                      name="cidade" 
                      required 
                      className="form-input" 
                      value={shippingForm.cidade}
                      onChange={handleInputChange}
                      placeholder="São Paulo"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Endereço Completo *</label>
                  <input 
                    type="text" 
                    name="endereco" 
                    required 
                    className="form-input" 
                    value={shippingForm.endereco}
                    onChange={handleInputChange}
                    placeholder="Av. Paulista, 1000 - Apto 12"
                  />
                </div>

                <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total a pagar:</span>
                    <div style={{ fontFamily: 'var(--font-display)', color: 'var(--primary-neon)', fontWeight: '700', fontSize: '1.2rem' }}>
                      {formatPrice(total)}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Ir para Pagamento
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2: PAYMENT SELECTION */}
          {step === 2 && (
            <div>
              <h3 className="detail-modal-name" style={{ fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Forma de Pagamento
              </h3>
              
              <div className="payment-options">
                <div 
                  className={`payment-card ${paymentMethod === 'pix' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <QrCode size={24} className="text-neon-green" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>PIX Instantâneo</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Liberação imediata do pedido. Ganhe 5% OFF.</span>
                  </div>
                </div>

                <div 
                  className={`payment-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={24} className="text-neon-purple" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Cartão de Crédito</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parcele em até 6x sem juros.</span>
                  </div>
                </div>

                <div 
                  className={`payment-card ${paymentMethod === 'boleto' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('boleto')}
                >
                  <FileText size={24} className="text-neon-pink" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Boleto Bancário</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vence em 2 dias úteis.</span>
                  </div>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handlePaymentSubmit} className="checkout-form" style={{ marginTop: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Número do Cartão</label>
                    <input type="text" placeholder="0000 0000 0000 0000" required className="form-input" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Validade</label>
                      <input type="text" placeholder="MM/AA" required className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input type="text" placeholder="000" required className="form-input" />
                    </div>
                  </div>
                </form>
              )}

              <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                  Voltar
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handlePaymentSubmit}
                >
                  {paymentMethod === 'pix' ? 'Confirmar Pix' : 'Confirmar Pagamento'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {step === 3 && (
            <div className="success-screen">
              <div className="success-icon-glow">
                <CheckCircle size={44} />
              </div>
              <h3 className="success-title">Pedido Confirmado!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto' }}>
                Obrigado por comprar na <strong>Smille</strong>, <strong>{shippingForm.nome}</strong>! Enviamos um e-mail de confirmação para <strong>{shippingForm.email}</strong> com todos os detalhes do rastreamento.
              </p>
              
              <div className="glass" style={{ width: '100%', padding: '1.5rem', borderRadius: '8px', margin: '1rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span>Pedido:</span>
                  <strong className="text-neon-purple">#{mockOrderNumber}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span>Método:</span>
                  <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>{paymentMethod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  <span>Valor Pago:</span>
                  <strong className="text-neon-green">{formatPrice(total)}</strong>
                </div>
              </div>

              <button className="btn btn-primary" onClick={handleClose} style={{ width: '100%' }}>
                Continuar Comprando
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
