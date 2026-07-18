import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryGrid({ setActiveTab, setSelectedCategory, onCtaClick }) {
  const categories = [
    {
      title: "Feminino",
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=750&fit=crop&q=80",
      tab: "feminino",
      category: "todos"
    },
    {
      title: "Masculino",
      img: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=750&fit=crop&q=80",
      tab: "masculino",
      category: "todos"
    },
    {
      title: "Acessórios",
      img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=750&fit=crop&q=80",
      tab: "todos",
      category: "acessorios"
    }
  ];

  const handleCategorySelect = (tab, category) => {
    setActiveTab(tab);
    setSelectedCategory(category);
    if (onCtaClick) onCtaClick();
  };

  return (
    <section className="categories-section">
      <div className="container">
        <span className="section-subtitle">Curadoria Smille</span>
        <h3 className="section-title">Explore as Coleções</h3>
        
        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="category-card"
              onClick={() => handleCategorySelect(cat.tab, cat.category)}
            >
              <img 
                src={cat.img} 
                alt={`Coleção ${cat.title}`} 
                className="category-card-img"
              />
              <div className="category-card-overlay">
                <h4 className="category-card-title">{cat.title}</h4>
                <span className="category-card-cta">
                  Descobrir looks <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
