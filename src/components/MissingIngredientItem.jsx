import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, ChevronDown, ExternalLink } from 'lucide-react';
import './MissingIngredientItem.css';

const PLATFORMS = [
  {
    id: 'zepto',
    name: 'Zepto',
    shortName: 'Zepto',
    badgeClass: 'platform-zepto',
    iconText: '🚀',
    getUrl: (item) => `https://www.zeptonow.com/search?q=${encodeURIComponent(item)}`
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    shortName: 'Blinkit',
    badgeClass: 'platform-blinkit',
    iconText: '🟡',
    getUrl: (item) => `https://blinkit.com/s/?q=${encodeURIComponent(item)}`
  },
  {
    id: 'swiggy',
    name: 'Swiggy Instamart',
    shortName: 'Instamart',
    badgeClass: 'platform-swiggy',
    iconText: '⚡',
    getUrl: (item) => `https://www.swiggy.com/instamart/search?query=${encodeURIComponent(item)}`
  },
  {
    id: 'bigbasket',
    name: 'BigBasket (bbnow)',
    shortName: 'BigBasket',
    badgeClass: 'platform-bigbasket',
    iconText: '🧺',
    getUrl: (item) => `https://www.bigbasket.com/ps/?q=${encodeURIComponent(item)}`
  },
  {
    id: 'flipkart',
    name: 'Flipkart Minutes',
    shortName: 'Flipkart Minutes',
    badgeClass: 'platform-flipkart',
    iconText: '🛍️',
    getUrl: (item) => `https://www.flipkart.com/search?q=${encodeURIComponent(item)}&marketplace=GROCERY`
  }
];

export default function MissingIngredientItem({ 
  ingredient, 
  variant = 'chip' // 'chip' | 'card'
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const ingredientName = typeof ingredient === 'string' ? ingredient : (ingredient?.name || '');
  const displayName = typeof ingredient === 'string' ? ingredient : (ingredient?.original || ingredient?.name || '');

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDropdown]);

  const handleRedirect = (platformId, e) => {
    e.stopPropagation();
    const platform = PLATFORMS.find((p) => p.id === platformId);
    if (!platform) return;

    const url = platform.getUrl(ingredientName);
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowDropdown(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  if (variant === 'card') {
    // Rich view for RecipeModal
    return (
      <div className="missing-grocery-card">
        <div className="missing-grocery-info">
          <span className="missing-dot">⚠️</span>
          <span className="missing-name">{displayName}</span>
        </div>

        <div className="missing-platforms-row">
          <span className="order-hint">Instant Delivery in 10 mins:</span>
          <div className="platform-btn-group">
            {PLATFORMS.map((platform) => (
              <button
                key={platform.id}
                type="button"
                className={`btn-platform-badge ${platform.badgeClass}`}
                onClick={(e) => handleRedirect(platform.id, e)}
                title={`Search for "${ingredientName}" on ${platform.name}`}
              >
                <span>{platform.iconText}</span>
                <span>{platform.shortName}</span>
                <ExternalLink size={11} className="external-ico" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default compact chip view for RecipeCard
  return (
    <div className="missing-chip-wrapper" ref={dropdownRef}>
      <div className="missing-chip" onClick={toggleDropdown}>
        <span className="chip-ingredient-name">{ingredientName}</span>
        <button
          type="button"
          className="btn-chip-order"
          onClick={toggleDropdown}
          title={`Order ${ingredientName} via Zepto, Blinkit, Instamart, BigBasket, Flipkart Minutes`}
        >
          <ShoppingBag size={11} />
          <span>Order</span>
          <ChevronDown size={11} className={`chevron-icon ${showDropdown ? 'open' : ''}`} />
        </button>
      </div>

      {showDropdown && (
        <div className="order-dropdown-menu" onClick={(e) => e.stopPropagation()}>
          <div className="dropdown-header">
            <span>Order "{ingredientName}" in 10 mins:</span>
          </div>
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              type="button"
              className="dropdown-item"
              onClick={(e) => handleRedirect(platform.id, e)}
            >
              <span className="dropdown-platform-icon">{platform.iconText}</span>
              <div className="dropdown-platform-details">
                <span className="dropdown-platform-name">{platform.name}</span>
                <span className="dropdown-platform-sub">10-min instant delivery</span>
              </div>
              <ExternalLink size={12} className="dropdown-arrow" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
