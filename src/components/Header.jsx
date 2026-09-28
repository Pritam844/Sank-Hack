import React from 'react';
import { ChefHat, Bookmark, Sparkles, Trash2 } from 'lucide-react';
import './Header.css';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  savedCount, 
  ingredientCount,
  onClearIngredients 
}) {
  return (
    <header className="header-container">
      <div className="header-inner">
        {/* Logo and branding */}
        <div className="brand" onClick={() => setActiveTab('search')}>
          <div className="logo-badge">
            <ChefHat className="logo-icon" size={28} />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">
              Fridge<span className="accent-2">2</span>Table
            </h1>
            <p className="brand-tagline">Zero food waste. Endless delicious meals.</p>
          </div>
        </div>

        {/* Navigation / Actions */}
        <div className="header-actions">
          {ingredientCount > 0 && activeTab === 'search' && (
            <button 
              className="btn-ghost"
              onClick={onClearIngredients}
              title="Clear all ingredients"
            >
              <Trash2 size={16} />
              <span>Clear Fridge ({ingredientCount})</span>
            </button>
          )}

          <nav className="tab-nav">
            <button
              className={`nav-tab ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              <Sparkles size={16} />
              <span>Discover</span>
            </button>

            <button
              className={`nav-tab ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark size={16} />
              <span>Saved Recipes</span>
              {savedCount > 0 && (
                <span className="badge-counter">{savedCount}</span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
