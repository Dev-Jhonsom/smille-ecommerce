import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Sparkles } from 'lucide-react';

export default function Header({ cartCount, onCartOpen, activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeItems = [
    "Frete grátis em compras acima de R$ 150",
    "Parcele em até 6x sem juros no cartão",
    "Use o cupom: SUNSET10 para 10% de desconto",
    "Ganhe 5% de desconto pagando via PIX",
  ];

  // Double the list to ensure infinite smooth scrolling loop
  const doubleMarquee = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <>
      {/* Infinite Promo Announcement Ticker Bar */}
      <div className="promo-bar">
        <div className="marquee-container">
          <div className="marquee-content">
            {doubleMarquee.map((text, idx) => (
              <span key={idx} className="marquee-item">
                <Sparkles size={11} style={{ opacity: 0.8 }} /> {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          {/* Brand Logo */}
          <div className="logo" onClick={() => setActiveTab('todos')}>
            SMILLE <span className="logo-dot"></span>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <button 
                  className={`nav-link ${activeTab === 'todos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('todos')}
                  style={{ background: 'none', border: 'none' }}
                >
                  Coleções
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'feminino' ? 'active' : ''}`}
                  onClick={() => setActiveTab('feminino')}
                  style={{ background: 'none', border: 'none' }}
                >
                  Feminino
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'masculino' ? 'active' : ''}`}
                  onClick={() => setActiveTab('masculino')}
                  style={{ background: 'none', border: 'none' }}
                >
                  Masculino
                </button>
              </li>
            </ul>
          </nav>

          {/* Search bar & Cart toggle */}
          <div className="header-actions">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Buscar looks..." 
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button className="icon-btn" onClick={onCartOpen} aria-label="Abrir Carrinho">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
