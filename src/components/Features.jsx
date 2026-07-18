import React from 'react';
import { Truck, CreditCard, RefreshCw, Compass } from 'lucide-react';

export default function Features() {
  const items = [
    {
      icon: <Truck size={22} />,
      title: "Frete Grátis",
      desc: "Em compras acima de R$ 150"
    },
    {
      icon: <CreditCard size={22} />,
      title: "Até 6x Sem Juros",
      desc: "Parcelas mínimas de R$ 50"
    },
    {
      icon: <RefreshCw size={22} />,
      title: "Troca Simplificada",
      desc: "Até 30 dias para trocar grátis"
    },
    {
      icon: <Compass size={22} />,
      title: "Curadoria Exclusiva",
      desc: "Peças selecionadas a dedo"
    }
  ];

  return (
    <section className="container">
      <div className="features-grid">
        {items.map((item, idx) => (
          <div key={idx} className="feature-item">
            <div className="feature-icon-wrapper">
              {item.icon}
            </div>
            <h4 className="feature-title">{item.title}</h4>
            <p className="feature-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
