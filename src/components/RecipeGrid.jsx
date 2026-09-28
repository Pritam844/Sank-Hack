import React, { useState, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import { SlidersHorizontal, Sparkles, Frown, ArrowDownUp } from 'lucide-react';
import './RecipeGrid.css';

export default function RecipeGrid({
  recipes,
  isLoading,
  savedRecipeIds,
  onToggleSave,
  onSelectRecipe,
  onTryPreset
}) {
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'missing' | 'likes'

  const sortedRecipes = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];
    const list = [...recipes];

    if (sortBy === 'match') {
      return list.sort((a, b) => {
        const aUsed = a.usedIngredientCount ?? a.usedIngredients?.length ?? 0;
        const aMissed = a.missedIngredientCount ?? a.missedIngredients?.length ?? 0;
        const aTotal = aUsed + aMissed;
        const aRatio = aTotal > 0 ? aUsed / aTotal : 0;

        const bUsed = b.usedIngredientCount ?? b.usedIngredients?.length ?? 0;
        const bMissed = b.missedIngredientCount ?? b.missedIngredients?.length ?? 0;
        const bTotal = bUsed + bMissed;
        const bRatio = bTotal > 0 ? bUsed / bTotal : 0;

        return bRatio - aRatio;
      });
    }

    if (sortBy === 'missing') {
      return list.sort((a, b) => {
        const aMissed = a.missedIngredientCount ?? a.missedIngredients?.length ?? 0;
        const bMissed = b.missedIngredientCount ?? b.missedIngredients?.length ?? 0;
        return aMissed - bMissed;
      });
    }

    if (sortBy === 'likes') {
      return list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    return list;
  }, [recipes, sortBy]);

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="results-container">
        <div className="results-header">
          <div className="skeleton-title shimmer-bg" style={{ width: 220, height: 28, borderRadius: 8 }} />
        </div>
        <div className="recipe-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="skeleton-card glass-panel shimmer-bg">
              <div className="skeleton-img" />
              <div className="skeleton-body">
                <div className="skeleton-line" style={{ width: '80%' }} />
                <div className="skeleton-line" style={{ width: '60%' }} />
                <div className="skeleton-line" style={{ width: '40%', marginTop: 'auto' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Empty state
  if (!recipes || recipes.length === 0) {
    return (
      <section className="results-container">
        <div className="empty-state glass-panel">
          <div className="empty-icon-wrap">
            <Sparkles size={40} className="empty-icon" />
          </div>
          <h3 className="empty-title">Ready to cook something amazing?</h3>
          <p className="empty-desc">
            Add ingredients above like <strong>eggs</strong>, <strong>tomatoes</strong>, or <strong>cheese</strong> and hit <strong>"Match Rescue Recipes"</strong>.
          </p>
          <div className="preset-suggestions">
            <span className="preset-label">Or try a popular leftover combo:</span>
            <div className="preset-buttons">
              <button 
                type="button" 
                className="preset-btn"
                onClick={() => onTryPreset(['eggs', 'tomatoes', 'onions'])}
              >
                🍳 Dhaba Egg Bhurji (Eggs, Tomatoes, Onions)
              </button>
              <button 
                type="button" 
                className="preset-btn"
                onClick={() => onTryPreset(['paneer', 'tomatoes', 'butter', 'garlic'])}
              >
                🧀 Shahi Paneer Butter Masala (Paneer, Tomatoes, Butter)
              </button>
              <button 
                type="button" 
                className="preset-btn"
                onClick={() => onTryPreset(['potatoes', 'garlic', 'onions'])}
              >
                🥔 Crispy Aloo Jeera Skillet (Potatoes, Garlic, Onions)
              </button>
              <button 
                type="button" 
                className="preset-btn"
                onClick={() => onTryPreset(['chicken', 'onions', 'tomatoes', 'ginger'])}
              >
                🍗 Homestyle Chicken Curry (Chicken, Onions, Tomatoes)
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="results-container">
      {/* Header with Sort and Stats */}
      <div className="results-header">
        <div>
          <h2 className="results-title">
            Matching <span className="gradient-text">Rescue Recipes</span>
          </h2>
          <p className="results-count">
            Found {sortedRecipes.length} dishes tailored to your inventory
          </p>
        </div>

        {/* Sort controls */}
        <div className="sort-controls">
          <ArrowDownUp size={15} className="sort-icon" />
          <span className="sort-label">Sort by:</span>
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="match">Highest Fridge Match %</option>
            <option value="missing">Fewest Missing Groceries</option>
            <option value="likes">Most Popular / Saved</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="recipe-grid">
        {sortedRecipes.map((recipe, index) => (
          <div 
            key={recipe.id} 
            className="recipe-grid-item"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <RecipeCard
              recipe={recipe}
              isSaved={savedRecipeIds.has(recipe.id)}
              onToggleSave={onToggleSave}
              onSelectRecipe={onSelectRecipe}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
