import React, { useState } from 'react';
import { Bookmark, Trash2, ExternalLink, Clock, ArrowLeft, Search, Flame } from 'lucide-react';
import './SavedRecipes.css';

export default function SavedRecipes({
  savedRecipes,
  onRemoveSaved,
  onSelectRecipe,
  onBackToSearch
}) {
  const [filterQuery, setFilterQuery] = useState('');

  const recipeList = Object.entries(savedRecipes || {}).map(([fbKey, data]) => ({
    fbKey,
    ...data
  }));

  const filtered = recipeList.filter((item) => {
    if (!filterQuery) return true;
    return item.title?.toLowerCase().includes(filterQuery.toLowerCase());
  });

  return (
    <section className="saved-container">
      {/* Top Banner */}
      <div className="saved-top-bar">
        <button className="btn-back" onClick={onBackToSearch}>
          <ArrowLeft size={16} />
          <span>Back to Discover</span>
        </button>

        <div className="saved-title-wrap">
          <div className="saved-badge">
            <Bookmark size={16} />
            <span>Firebase Cloud Storage</span>
          </div>
          <h2 className="saved-heading">
            Your Saved <span className="gradient-text">Recipe Vault</span>
          </h2>
          <p className="saved-subtext">
            Saved meal ideas synced in real-time across your sessions.
          </p>
        </div>

        {/* Filter input */}
        {recipeList.length > 0 && (
          <div className="saved-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search your saved recipes..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="saved-search-input"
            />
          </div>
        )}
      </div>

      {/* Empty State */}
      {recipeList.length === 0 ? (
        <div className="saved-empty-card glass-panel">
          <div className="empty-bookmark-circle">
            <Bookmark size={36} />
          </div>
          <h3 className="empty-saved-title">No Saved Recipes Yet</h3>
          <p className="empty-saved-desc">
            Whenever you find a rescue recipe you love, click the heart icon on its card to save it here for later.
          </p>
          <button className="btn-go-discover" onClick={onBackToSearch}>
            Start Finding Recipes
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="saved-empty-card glass-panel">
          <p className="empty-saved-desc">No saved recipes match "{filterQuery}".</p>
        </div>
      ) : (
        /* Grid of Saved Recipe Cards */
        <div className="saved-grid">
          {filtered.map((item) => (
            <div 
              key={item.fbKey || item.id} 
              className="saved-item-card glass-panel"
              onClick={() => onSelectRecipe(item)}
            >
              <div className="saved-img-wrap">
                <img
                  src={
                    item.image || 
                    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={item.title}
                  className="saved-img"
                  loading="lazy"
                />
                <button
                  type="button"
                  className="btn-trash-unsave"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSaved(item.id, item.fbKey);
                  }}
                  title="Remove from saved recipes"
                  aria-label="Remove from saved recipes"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="saved-content">
                <h4 className="saved-item-title" title={item.title}>
                  {item.title}
                </h4>

                <div className="saved-meta-row">
                  {item.readyInMinutes && (
                    <span className="saved-meta">
                      <Clock size={12} />
                      {item.readyInMinutes}m
                    </span>
                  )}
                  {item.likes !== undefined && (
                    <span className="saved-meta likes">
                      <Flame size={12} />
                      {item.likes}
                    </span>
                  )}
                  {item.usedIngredients && (
                    <span className="saved-meta count">
                      {item.usedIngredients.length} fridge items
                    </span>
                  )}
                </div>

                <div className="saved-card-footer">
                  <button 
                    type="button" 
                    className="btn-open-saved"
                    onClick={() => onSelectRecipe(item)}
                  >
                    <span>View Cooking Steps</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
