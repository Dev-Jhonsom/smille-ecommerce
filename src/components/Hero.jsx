import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onCtaClick, setActiveTab }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: "/images/hero_bg.png",
      subtitle: "Nova Coleção Festival 2026",
      titleStart: "Vista o que",
      titleAccent: "você sente",
      desc: "Peças feitas para quem vive a música de corpo e alma. Looks autênticos, confortáveis e cheios de atitude para você curtir cada momento do festival do seu jeito."
    },
    {
      image: "/images/hero_bg_2.png",
      subtitle: "Sunset Vibe Collection",
      titleStart: "Sinta a batida,",
      titleAccent: "viva a pista",
      desc: "Looks confortáveis e tecidos leves que acompanham seu ritmo sob o sol do deserto. Vista-se com leveza, movimento e personalidade do pôr do sol ao amanhecer."
    }
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {/* Background slideshow tracks */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        />
      ))}

      {/* Main Overlay Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-content">
          <span className="hero-subtitle">{slides[activeSlide].subtitle}</span>
          <h1 className="hero-title">
            {slides[activeSlide].titleStart}<br />
            <span className="text-neon-purple">{slides[activeSlide].titleAccent}</span>
          </h1>
          <p className="hero-description">
            {slides[activeSlide].desc}
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => {
                setActiveTab('feminino');
                onCtaClick();
              }}
            >
              Coleção Feminina <ArrowRight size={16} />
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setActiveTab('masculino');
                onCtaClick();
              }}
            >
              Coleção Masculina
            </button>
          </div>
        </div>
      </div>

      {/* Slider dots indicators */}
      <div className="hero-slider-dots">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            className={`hero-slider-dot ${idx === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(idx)}
            aria-label={`Ir para banner ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
