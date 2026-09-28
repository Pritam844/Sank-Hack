import React from 'react';
import { Compass, Bookmark, Lightbulb, ChefHat } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav({ activeTab, setActiveTab, savedCount }) {
  return (
    <nav className="mobile-bottom-nav">
      <button
        type="button"
        className={`bottom-nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => setActiveTab('search')}
        aria-label="Discover Recipes"
      >
        <div className="nav-icon-wrap">
          <Compass size={22} />
        </div>
        <span className="nav-label">Discover</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${activeTab === 'saved' ? 'active' : ''}`}
        onClick={() => setActiveTab('saved')}
        aria-label="Saved Recipe Vault"
      >
        <div className="nav-icon-wrap">
          <Bookmark size={22} />
          {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
        </div>
        <span className="nav-label">Saved</span>
      </button>

      <button
        type="button"
        className={`bottom-nav-item ${activeTab === 'tips' ? 'active' : ''}`}
        onClick={() => setActiveTab('tips')}
        aria-label="Kitchen Rescue Tips"
      >
        <div className="nav-icon-wrap">
          <Lightbulb size={22} />
        </div>
        <span className="nav-label">Rescue Tips</span>
      </button>
    </nav>
  );
}
