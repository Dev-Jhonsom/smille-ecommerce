import React from 'react';

export default function Footer({ setActiveTab, onCtaClick }) {
  const handleLinkClick = (tab) => {
    setActiveTab(tab);
    if (onCtaClick) onCtaClick();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="logo" onClick={() => handleLinkClick('todos')}>
              SMILLE <span className="logo-dot"></span>
            </div>
            <p className="footer-desc">
              Moda autêntica para quem vive festivais de verdade. Peças pensadas para conforto, estilo e liberdade — do pôr do sol até o amanhecer.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="footer-title">Coleções</h4>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleLinkClick('todos')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Ver Tudo
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleLinkClick('feminino')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Feminino
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleLinkClick('masculino')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Masculino
                </button>
              </li>
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h4 className="footer-title">Suporte</h4>
            <ul className="footer-links">
              <li><a href="#faq" className="footer-link">Perguntas Frequentes</a></li>
              <li><a href="#shipping" className="footer-link">Envios & Entrega</a></li>
              <li><a href="#returns" className="footer-link">Trocas & Devoluções</a></li>
              <li><a href="#size-guide" className="footer-link">Guia de Tamanhos</a></li>
            </ul>
          </div>

          {/* Contact info / Socials */}
          <div>
            <h4 className="footer-title">Social & Beat</h4>
            <ul className="footer-links">
              <li><a href="#instagram" className="footer-link">@smille.store</a></li>
              <li><a href="#tiktok" className="footer-link">TikTok</a></li>
              <li><a href="#soundcloud" className="footer-link">SoundCloud Waves</a></li>
              <li><a href="#contact" className="footer-link">contato@smille.com.br</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom footer bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Smille Store. Todos os direitos reservados.</p>
          <p>Feito com amor para quem vive a música.</p>
        </div>
      </div>
    </footer>
  );
}
