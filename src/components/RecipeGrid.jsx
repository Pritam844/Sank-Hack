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
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'exact' | 'few'

  // Stats
  const exactMatchCount = useMemo(() => {
    return (recipes || []).filter(
      r => (r.missedIngredientCount ?? r.missedIngredients?.length ?? 0) === 0
    ).length;
  }, [recipes]);

  const fewMissingCount = useMemo(() => {
    return (recipes || []).filter(r => {
      const missed = r.missedIngredientCount ?? r.missedIngredients?.length ?? 0;
      return missed > 0 && missed <= 2;
    }).length;
  }, [recipes]);

  const sortedRecipes = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];
    let list = [...recipes];

    // Filter by mode
    if (filterMode === 'exact') {
      list = list.filter(r => (r.missedIngredientCount ?? r.missedIngredients?.length ?? 0) === 0);
    } else if (filterMode === 'few') {
      list = list.filter(r => {
        const missed = r.missedIngredientCount ?? r.missedIngredients?.length ?? 0;
        return missed <= 2;
      });
    }

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

        // 1. EXACT MATCHES (0 missing items) ALWAYS FIRST!
        const aExact = aMissed === 0 ? 1 : 0;
        const bExact = bMissed === 0 ? 1 : 0;
        if (bExact !== aExact) return bExact - aExact;

        // 2. Fewest missing ingredients
        if (aMissed !== bMissed) return aMissed - bMissed;

        // 3. Highest match ratio %
        if (bRatio !== aRatio) return bRatio - aRatio;

        // 4. Most used ingredients
        return bUsed - aUsed;
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
  }, [recipes, sortBy, filterMode]);


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
            <option value="match">Exact Match First</option>
            <option value="missing">Fewest Missing Groceries</option>
            <option value="likes">Most Popular / Saved</option>
          </select>
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="filter-pill-row">
        <button
          type="button"
          className={`filter-pill ${filterMode === 'all' ? 'active' : ''}`}
          onClick={() => setFilterMode('all')}
        >
          All ({recipes.length})
        </button>

        {exactMatchCount > 0 && (
          <button
            type="button"
            className={`filter-pill pill-exact ${filterMode === 'exact' ? 'active' : ''}`}
            onClick={() => setFilterMode('exact')}
          >
            <Sparkles size={13} />
            <span>Exact Matches ({exactMatchCount})</span>
          </button>
        )}

        {fewMissingCount > 0 && (
          <button
            type="button"
            className={`filter-pill ${filterMode === 'few' ? 'active' : ''}`}
            onClick={() => setFilterMode('few')}
          >
            <span>Missing 1-2 Items ({fewMissingCount})</span>
          </button>
        )}
      </div>

      {/* Exact Match Notification */}
      {exactMatchCount > 0 && filterMode === 'all' && (
        <div className="exact-matches-alert">
          <Sparkles size={15} className="text-emerald" />
          <span>
            <strong>{exactMatchCount} exact {exactMatchCount === 1 ? 'match' : 'matches'} found!</strong> 0 missing groceries — ready to cook right now!
          </span>
        </div>
      )}

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
