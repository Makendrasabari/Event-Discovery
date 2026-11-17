import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Briefcase, Palette, GraduationCap, ArrowRight } from 'lucide-react';

const iconMap = {
  Cpu,
  Briefcase,
  Palette,
  GraduationCap
};

const CategoryCard = ({ category, index = 0, isArranged = true }) => {
  const IconComponent = iconMap[category.iconName] || Cpu;

  return (
    <Link 
      to={`/explore?category=${category.name}`} 
      className={`category-card group category-card-shuffle ${isArranged ? 'is-arranged' : ''} shuffle-pos-${index % 4}`}
      style={{
        transitionDelay: isArranged ? `${index * 150}ms` : '0ms'
      }}
    >
      <div className="category-bg-thumb">
        <img 
          src={category.image} 
          alt={category.name} 
          className="category-img"
          loading="lazy"
        />
        <div className="category-overlay-tint" />
      </div>

      <div className="category-card-inner">
        <div className="category-icon-bubble">
          <IconComponent size={24} className="category-icon text-pink" />
        </div>

        <div className="category-card-text">
          <div className="category-badge-pill">{category.badge}</div>
          <h3 className="category-card-name">{category.name}</h3>
          <p className="category-card-desc">{category.description}</p>
        </div>

        <div className="category-card-footer">
          <span className="category-count">{category.count} Curated Events</span>
          <span className="category-explore-link">
            <span>Explore</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
