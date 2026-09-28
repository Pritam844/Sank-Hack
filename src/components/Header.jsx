import React from 'react';
import { ChefHat, Trash2, Refrigerator } from 'lucide-react';
import './Header.css';

export default function Header({ 
  ingredientCount,
  onClearIngredients,
  onLogoClick
}) {
  return (
    <header className="mobile-header">
      <div className="mobile-header-inner">
        {/* Brand */}
        <div className="mobile-brand" onClick={onLogoClick}>
          <div className="mobile-logo-badge">
            <ChefHat size={20} />
          </div>
          <div className="mobile-brand-title">
            <span>Fridge</span><span className="accent-2">2</span><span>Table</span>
          </div>
        </div>

        {/* Inventory Counter & Quick Clear */}
        <div className="mobile-header-actions">
          <div className="fridge-count-pill" title={`${ingredientCount} items in fridge`}>
            <Refrigerator size={14} />
            <span>{ingredientCount} items</span>
          </div>

          {ingredientCount > 0 && (
            <button 
              type="button"
              className="btn-mobile-clear"
              onClick={onClearIngredients}
              title="Clear Fridge items"
              aria-label="Clear Fridge items"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
