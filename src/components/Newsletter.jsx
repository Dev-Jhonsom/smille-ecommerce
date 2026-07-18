import React, { useState } from 'react';
import { Mail, Check, Loader } from 'lucide-react';
import { subscribeNewsletter } from '../services/api';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      await subscribeNewsletter(email);
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-container glass" style={{ padding: '3rem 2rem' }}>
          <span className="section-subtitle" style={{ marginBottom: '0.5rem' }}>Club Smille</span>

          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
              <div style={{ background: 'var(--primary-neon)', color: '#12100e', width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={22} />
              </div>
              <h3 className="newsletter-title" style={{ fontSize: '1.75rem', marginBottom: 0 }}>Bem-vindo ao Club!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Enviamos seu cupom de 15% OFF para o seu e-mail. Fique ligado nos próximos drops. 🌅
              </p>
            </div>
          ) : (
            <>
              <h3 className="newsletter-title">Junte-se à Nossa Comunidade</h3>
              <p className="newsletter-desc">
                Inscreva-se para receber acessos antecipados a novas coleções, cupons exclusivos e dicas de styling.
              </p>

              {error && (
                <p style={{ color: 'var(--accent-pink)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {error}
                </p>
              )}

              <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading
                    ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Inscrevendo...</>
                    : <><Mail size={16} /> Fazer Parte</>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
