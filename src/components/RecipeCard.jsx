import React, { useState } from 'react';
import { Heart, ShoppingBag, CheckCircle2, AlertCircle, ExternalLink, Flame, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import MissingIngredientItem from './MissingIngredientItem';
import './RecipeCard.css';

export default function RecipeCard({
  recipe,
  isSaved,
  onToggleSave,
  onSelectRecipe
}) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const usedCount = recipe.usedIngredientCount ?? (recipe.usedIngredients ? recipe.usedIngredients.length : 0);
  const missedCount = recipe.missedIngredientCount ?? (recipe.missedIngredients ? recipe.missedIngredients.length : 0);
  const totalCount = usedCount + missedCount;
  const matchPercentage = totalCount > 0 ? Math.round((usedCount / totalCount) * 100) : 100;
  const isExactMatch = missedCount === 0;

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (!isSaved) {
      // Fire confetti burst from heart position!
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 25,
        spread: 45,
        origin: { x, y },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899'],
        ticks: 120,
        gravity: 1.2
      });
    }
    onToggleSave(recipe);
  };

  const getGroceryOrderLink = (ingredientName) => {
    // Generate an Instacart or Amazon Fresh search link
    return `https://www.instacart.com/store/search?q=${encodeURIComponent(ingredientName)}`;
  };

  return (
    <article 
      className={`recipe-card glass-panel ${isExactMatch ? 'is-exact-match' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectRecipe(recipe)}
    >
      {/* Top Image Container */}
      <div className="card-image-wrap">
        <img
          src={
            imgError || !recipe.image
              ? 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80'
              : recipe.image
          }
          alt={recipe.title}
          className="card-image"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="card-image-gradient" />

        {/* Match Badge */}
        <div 
          className={`badge-match ${isExactMatch ? 'badge-exact-match' : ''}`} 
          title={isExactMatch ? "100% Exact Match - You have all required ingredients!" : `${usedCount} of ${totalCount} ingredients found in your fridge`}
        >
          <span className="match-num">{isExactMatch ? '✨ 100%' : `${matchPercentage}%`}</span>
          <span className="match-label">{isExactMatch ? 'Exact Match' : 'Fridge Match'}</span>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          type="button"
          className={`btn-save-heart ${isSaved ? 'is-saved' : ''}`}
          onClick={handleSaveClick}
          aria-label={isSaved ? "Remove from saved recipes" : "Save recipe to favorites"}
          title={isSaved ? "Saved to favorites" : "Save to favorites"}
        >
          <Heart size={18} fill={isSaved ? "#ff5e57" : "none"} color={isSaved ? "#ff5e57" : "#ffffff"} />
        </button>
      </div>

      {/* Card Body */}
      <div className="card-body">
        <h3 className="recipe-title" title={recipe.title}>
          {recipe.title}
        </h3>

        {/* Recipe Meta Badges */}
        <div className="recipe-meta-row">
          {recipe.readyInMinutes && (
            <div className="meta-item">
              <Clock size={13} />
              <span>{recipe.readyInMinutes}m</span>
            </div>
          )}
          {recipe.likes !== undefined && (
            <div className="meta-item likes">
              <Flame size={13} />
              <span>{recipe.likes} saves</span>
            </div>
          )}
          <div className={`meta-item ratio ${isExactMatch ? 'ratio-exact' : ''}`}>
            <span>{isExactMatch ? 'All in fridge' : `${usedCount} in fridge / ${missedCount} missing`}</span>
          </div>
        </div>

        {/* Used Ingredients Section */}
        {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
          <div className="ingredients-block">
            <div className="block-label text-emerald">
              <CheckCircle2 size={13} />
              <span>In Your Fridge ({recipe.usedIngredients.length})</span>
            </div>
            <div className="chips-list">
              {recipe.usedIngredients.map((item, idx) => (
                <span key={item.id || idx} className="used-chip">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Ingredients Section or Zero Missing Banner */}
        {isExactMatch ? (
          <div className="exact-match-tag">
            <Sparkles size={14} className="text-emerald" />
            <span>Zero missing groceries &bull; Cook immediately!</span>
          </div>
        ) : (
          recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
            <div className="ingredients-block">
              <div className="block-label text-amber">
                <AlertCircle size={13} />
                <span>Missing Items ({recipe.missedIngredients.length})</span>
              </div>
              <div className="chips-list">
                {recipe.missedIngredients.map((item, idx) => (
                  <MissingIngredientItem
                    key={item.id || idx}
                    ingredient={item}
                    variant="chip"
                  />
                ))}
              </div>
            </div>
          )
        )}

        {/* View Details Footer */}
        <div className="card-footer">
          <button 
            type="button" 
            className="btn-view-details"
            onClick={() => onSelectRecipe(recipe)}
          >
            <span>View Recipe & Instructions</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </article>
  );
}
