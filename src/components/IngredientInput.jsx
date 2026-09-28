import React, { useState } from 'react';
import { Plus, X, Search, Sparkles, Refrigerator, ArrowRight, UtensilsCrossed } from 'lucide-react';
import './IngredientInput.css';

const POPULAR_SUGGESTIONS = [
  { name: 'Paneer', emoji: '🧀' },
  { name: 'Eggs', emoji: '🥚' },
  { name: 'Tomatoes', emoji: '🍅' },
  { name: 'Onions', emoji: '🧅' },
  { name: 'Potatoes', emoji: '🥔' },
  { name: 'Rice', emoji: '🍚' },
  { name: 'Garlic', emoji: '🧄' },
  { name: 'Ginger', emoji: '🫚' },
  { name: 'Chicken', emoji: '🍗' },
  { name: 'Spinach', emoji: '🥬' },
  { name: 'Butter', emoji: '🧈' },
  { name: 'Green Chili', emoji: '🌶️' }
];

export default function IngredientInput({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onSearch,
  isLoading,
  cuisine = 'Indian',
  onCuisineChange
}) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Split by comma in case user pastes "paneer, tomatoes, butter"
    const items = inputValue
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    items.forEach(item => {
      onAddIngredient(item);
    });

    setInputValue('');
  };

  const handleSuggestionClick = (item) => {
    if (ingredients.some(i => i.toLowerCase() === item.name.toLowerCase())) {
      onRemoveIngredient(item.name);
    } else {
      onAddIngredient(item.name);
    }
  };

  return (
    <section className="ingredient-hero">
      <div className="hero-content">
        <div className="hero-badge">
          <Refrigerator size={16} />
          <span>Smart Food Rescue Engine &bull; Max-Match Ranking</span>
        </div>

        <h2 className="hero-heading">
          What’s in your <span className="gradient-text">fridge today?</span>
        </h2>
        <p className="hero-subtext">
          Enter leftover ingredients you have on hand. We’ll find delicious Indian and homestyle dishes using the maximum ingredients with zero waste!
        </p>

        {/* Cuisine Selector Bar */}
        <div className="cuisine-selector-bar">
          <span className="cuisine-selector-label">
            <UtensilsCrossed size={14} />
            <span>Cuisine Preference:</span>
          </span>
          <div className="cuisine-toggle-group">
            <button
              type="button"
              className={`btn-cuisine-toggle ${cuisine === 'Indian' ? 'active' : ''}`}
              onClick={() => onCuisineChange && onCuisineChange('Indian')}
            >
              <span>🇮🇳 Indian Cuisine</span>
              <span className="priority-pill">Best Match</span>
            </button>
            <button
              type="button"
              className={`btn-cuisine-toggle ${cuisine === 'all' ? 'active' : ''}`}
              onClick={() => onCuisineChange && onCuisineChange('all')}
            >
              <span>🌍 All Cuisines</span>
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <Search className="input-icon" size={22} />
            <input
              type="text"
              className="main-input"
              placeholder="Type ingredients (e.g., paneer, tomatoes, onions) & press Enter..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <button 
              type="submit" 
              className="btn-add"
              disabled={!inputValue.trim()}
              title="Add ingredient"
            >
              <Plus size={20} />
              <span>Add</span>
            </button>
          </div>
        </form>

        {/* Selected Ingredients Chips */}
        <div className="selected-ingredients-section">
          <div className="selected-header">
            <span className="selected-title">
              Your Kitchen Inventory ({ingredients.length})
            </span>
            {ingredients.length > 0 && (
              <span className="selected-hint">Click &times; to remove</span>
            )}
          </div>

          <div className="tags-container">
            {ingredients.length === 0 ? (
              <div className="tags-empty-hint">
                No items added yet. Click suggestions below or type above!
              </div>
            ) : (
              ingredients.map((item) => (
                <div key={item} className="tag-chip active-chip">
                  <span className="chip-name">{item}</span>
                  <button
                    type="button"
                    className="chip-remove-btn"
                    onClick={() => onRemoveIngredient(item)}
                    aria-label={`Remove ${item}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Add Suggestions */}
        <div className="suggestions-section">
          <div className="suggestions-label">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Quick Add Leftovers:</span>
          </div>

          <div className="suggestions-pills">
            {POPULAR_SUGGESTIONS.map((item) => {
              const isSelected = ingredients.some(
                i => i.toLowerCase() === item.name.toLowerCase()
              );
              return (
                <button
                  key={item.name}
                  type="button"
                  className={`pill-btn ${isSelected ? 'pill-selected' : ''}`}
                  onClick={() => handleSuggestionClick(item)}
                >
                  <span className="pill-emoji">{item.emoji}</span>
                  <span className="pill-text">{item.name}</span>
                  {isSelected && <span className="pill-check">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="search-action-wrapper">
          <button
            type="button"
            className="btn-find-recipes"
            disabled={ingredients.length === 0 || isLoading}
            onClick={onSearch}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner" />
                <span>Finding Best {cuisine === 'Indian' ? 'Indian' : ''} Matches...</span>
              </>
            ) : (
              <>
                <span>
                  Match {cuisine === 'Indian' ? 'Indian' : ''} Rescue Recipes ({ingredients.length})
                </span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
