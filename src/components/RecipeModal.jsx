import React, { useEffect, useState } from 'react';
import { 
  X, 
  Clock, 
  Users, 
  ExternalLink, 
  ShoppingBag, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  Sparkles,
  Utensils
} from 'lucide-react';
import { fetchRecipeInformation } from '../services/api';
import MissingIngredientItem from './MissingIngredientItem';
import './RecipeModal.css';

export default function RecipeModal({
  recipe,
  onClose,
  isSaved,
  onToggleSave
}) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!recipe) return;

    const loadDetails = async () => {
      setLoading(true);
      // If recipe already has full instructions and details
      if (recipe.instructions && recipe.extendedIngredients) {
        setDetails(recipe);
        setLoading(false);
        return;
      }

      // Fetch from API
      const data = await fetchRecipeInformation(recipe.id);
      if (isMounted) {
        setDetails(data);
        setLoading(false);
      }
    };

    loadDetails();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [recipe, onClose]);

  if (!recipe) return null;

  const usedIngredients = recipe.usedIngredients || [];
  const missedIngredients = recipe.missedIngredients || [];

  const getInstacartLink = (name) => {
    return `https://www.instacart.com/store/search?q=${encodeURIComponent(name)}`;
  };

  const cleanHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Mobile Pull Handle */}
        <div className="modal-pull-handle-wrap">
          <div className="modal-pull-handle" />
        </div>

        {/* Close Button */}
        <button className="btn-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Hero Banner */}
        <div className="modal-hero">
          <img 
            src={recipe.image || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'} 
            alt={recipe.title} 
            className="modal-hero-img"
          />
          <div className="modal-hero-overlay" />
          
          <div className="modal-hero-content">
            <h2 className="modal-title">{recipe.title}</h2>
            
            <div className="modal-meta-pills">
              {(details?.readyInMinutes || recipe.readyInMinutes) && (
                <div className="modal-pill">
                  <Clock size={15} />
                  <span>{details?.readyInMinutes || recipe.readyInMinutes} Minutes</span>
                </div>
              )}
              {(details?.servings || recipe.servings) && (
                <div className="modal-pill">
                  <Users size={15} />
                  <span>{details?.servings || recipe.servings} Servings</span>
                </div>
              )}
              <button
                type="button"
                className={`modal-pill pill-save ${isSaved ? 'saved' : ''}`}
                onClick={() => onToggleSave(recipe)}
              >
                <Heart size={15} fill={isSaved ? "#ff5e57" : "none"} color={isSaved ? "#ff5e57" : "#ffffff"} />
                <span>{isSaved ? "Saved to Favorites" : "Save Recipe"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="modal-body-scroll">
          {/* Summary */}
          {details?.summary && (
            <div className="modal-section summary-box">
              <p>{cleanHtml(details.summary).slice(0, 320)}...</p>
            </div>
          )}

          {/* Missing Groceries Quick Buy Bar */}
          {missedIngredients.length > 0 && (
            <div className="modal-section missing-groceries-box">
              <div className="section-head text-amber">
                <AlertCircle size={18} />
                <h3>Missing Groceries ({missedIngredients.length} Items)</h3>
              </div>
              <p className="missing-desc">
                Need these to complete this meal? Choose your favorite 10-minute delivery app (Zepto, Blinkit, Swiggy Instamart, BigBasket, or Flipkart Minutes):
              </p>
              <div className="missing-groceries-list">
                {missedIngredients.map((item, idx) => (
                  <MissingIngredientItem
                    key={item.id || idx}
                    ingredient={item}
                    variant="card"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Used Ingredients Checklist */}
          {usedIngredients.length > 0 && (
            <div className="modal-section">
              <div className="section-head text-emerald">
                <CheckCircle2 size={18} />
                <h3>From Your Fridge ({usedIngredients.length} Items)</h3>
              </div>
              <ul className="ingredients-checklist">
                {usedIngredients.map((item, idx) => (
                  <li key={item.id || idx} className="check-item used">
                    <span className="check-bullet">✓</span>
                    <span>{item.original || item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cooking Instructions */}
          <div className="modal-section">
            <div className="section-head">
              <Utensils size={18} />
              <h3>Preparation & Instructions</h3>
            </div>

            {loading ? (
              <div className="instructions-loading">
                <div className="loading-spinner" />
                <span>Fetching step-by-step cooking steps...</span>
              </div>
            ) : details?.analyzedInstructions?.[0]?.steps?.length > 0 ? (
              <ol className="instructions-steps-list">
                {details.analyzedInstructions[0].steps.map((s) => (
                  <li key={s.number} className="step-item">
                    <span className="step-num">{s.number}</span>
                    <p className="step-text">{s.step}</p>
                  </li>
                ))}
              </ol>
            ) : details?.instructions ? (
              <div className="instructions-raw">
                <p>{cleanHtml(details.instructions)}</p>
              </div>
            ) : (
              <div className="instructions-fallback">
                <p>
                  1. Gather and prep all ingredients listed above.
                  <br />
                  2. Season and cook ingredients according to standard culinary techniques.
                  <br />
                  3. Combine and serve warm.
                </p>
              </div>
            )}
          </div>

          {/* External Links */}
          {details?.sourceUrl && (
            <div className="modal-footer-action">
              <a
                href={details.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-external-source"
              >
                <span>Read Full Original Recipe on {details.sourceName || "Publisher"}</span>
                <ExternalLink size={15} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
