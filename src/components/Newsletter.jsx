import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-container glass">
          <span className="section-subtitle" style={{ marginBottom: '0.5rem' }}>Club Smille</span>
          
          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
              <div style={{ background: 'var(--primary-neon)', color: '#12100e', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}>
                <Check size={20} />
              </div>
              <h3 className="newsletter-title" style={{ fontSize: '1.75rem', marginBottom: '0' }}>Bem-vindo ao Club!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Enviamos seu cupom de 15% OFF para o seu e-mail. Fique ligado nos próximos drops.
              </p>
            </div>
          ) : (
            <>
              <h3 className="newsletter-title">Junte-se à Nossa Comunidade</h3>
              <p className="newsletter-desc">
                Inscreva-se na nossa newsletter para receber acessos antecipados a novas coleções, cupons exclusivos de festival e dicas de styling.
              </p>
              
              <form onSubmit={handleSubmit} className="newsletter-form">
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Seu melhor e-mail" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                  <Mail size={16} /> Fazer Parte
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
