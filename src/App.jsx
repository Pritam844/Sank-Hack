import React, { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set, remove } from 'firebase/database';
import { db } from './firebase';
import { fetchIndianRecipes } from './services/api';

import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeGrid from './components/RecipeGrid';
import SavedRecipes from './components/SavedRecipes';
import RecipeModal from './components/RecipeModal';
import Footer from './components/Footer';

import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import './App.css';

export default function App() {
  // Navigation tab: 'search' | 'saved'
  const [activeTab, setActiveTab] = useState('search');

  // Cuisine style filter: 'Indian' (default) | 'all'
  const [cuisine, setCuisine] = useState('Indian');

  // Ingredients in fridge
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem('f2t_ingredients');
    return saved ? JSON.parse(saved) : ['eggs', 'tomatoes', 'onions'];
  });

  // Matched recipes from Spoonacular
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Firebase Realtime DB saved recipes
  const [savedRecipes, setSavedRecipes] = useState({});
  const [savedRecipeIds, setSavedRecipeIds] = useState(new Set());

  // Active selected recipe for modal
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync ingredients to local storage
  useEffect(() => {
    localStorage.setItem('f2t_ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  // Connect to Firebase Realtime Database for saved recipes
  useEffect(() => {
    try {
      const savedRef = ref(db, 'savedRecipes');
      const unsubscribe = onValue(
        savedRef,
        (snapshot) => {
          const data = snapshot.val() || {};
          setSavedRecipes(data);

          // Build quick lookup Set of saved IDs
          const idSet = new Set();
          Object.values(data).forEach((item) => {
            if (item.id) idSet.add(item.id);
          });
          setSavedRecipeIds(idSet);
        },
        (error) => {
          console.warn('Firebase sync notice (using local session fallback):', error.message);
          // Fallback to local storage if Firebase rule restricts write
          const localSaved = localStorage.getItem('f2t_saved_recipes');
          if (localSaved) {
            try {
              const parsed = JSON.parse(localSaved);
              setSavedRecipes(parsed);
              const idSet = new Set(Object.values(parsed).map((i) => i.id));
              setSavedRecipeIds(idSet);
            } catch (e) {
              console.error(e);
            }
          }
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Firebase initialization error:', err);
    }
  }, []);

  // Add ingredient
  const handleAddIngredient = (name) => {
    const clean = name.trim().toLowerCase();
    if (!clean) return;

    if (ingredients.some((item) => item.toLowerCase() === clean)) {
      showToast(`"${name}" is already in your fridge list.`, 'info');
      return;
    }

    setIngredients((prev) => [...prev, clean]);
  };

  // Remove ingredient
  const handleRemoveIngredient = (name) => {
    setIngredients((prev) => prev.filter((item) => item.toLowerCase() !== name.toLowerCase()));
  };

  // Clear all ingredients
  const handleClearIngredients = () => {
    setIngredients([]);
    setRecipes([]);
    showToast('Fridge cleared.', 'info');
  };

  // Trigger recipe search with Indian cuisine filter & max-used-ingredients ranking
  const handleSearch = useCallback(async (customCuisine) => {
    if (ingredients.length === 0) {
      showToast('Please add at least 1 ingredient from your fridge!', 'info');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    const activeCuisine = customCuisine || cuisine;

    try {
      const query = ingredients.join(',');
      const results = await fetchIndianRecipes(query, activeCuisine, 12);

      setRecipes(results);
      if (results.length === 0) {
        showToast('No matching recipes found. Try adding common staples like onions, tomatoes, or eggs!', 'info');
      } else {
        showToast(`Discovered ${results.length} delicious ${activeCuisine === 'Indian' ? 'Indian ' : ''}recipes!`, 'success');
      }
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
      setErrorMsg('Could not connect to recipe service. Please try again.');
      showToast('Could not fetch recipes. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, cuisine]);

  // Handle cuisine toggle change
  const handleCuisineChange = (newCuisine) => {
    setCuisine(newCuisine);
    handleSearch(newCuisine);
  };

  // Initial fetch on mount with default ingredients
  useEffect(() => {
    if (ingredients.length > 0 && recipes.length === 0) {
      handleSearch();
    }
  }, []);

  // Try preset combo
  const handleTryPreset = (combo) => {
    setIngredients(combo);
    setTimeout(() => {
      const query = combo.join(',');
      setIsLoading(true);
      fetchIndianRecipes(query, cuisine, 12).then((results) => {
        setRecipes(results);
        setIsLoading(false);
        showToast(`Loaded ${results.length} recipes for preset!`, 'success');
      });
    }, 100);
  };

  // Save / Bookmark recipe to Firebase Realtime DB
  const handleToggleSave = async (recipe) => {
    const isAlreadySaved = savedRecipeIds.has(recipe.id);

    try {
      if (isAlreadySaved) {
        // Find key in savedRecipes
        const targetEntry = Object.entries(savedRecipes).find(
          ([_, item]) => item.id === recipe.id
        );

        if (targetEntry) {
          const [key] = targetEntry;
          const targetRef = ref(db, `savedRecipes/${key}`);
          await remove(targetRef);
          showToast(`Removed "${recipe.title.slice(0, 30)}..." from saved.`, 'info');
        }
      } else {
        // Save to Firebase
        const newRef = ref(db, `savedRecipes/rec_${recipe.id}`);
        await set(newRef, {
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          likes: recipe.likes || 0,
          usedIngredientCount: recipe.usedIngredientCount || 0,
          missedIngredientCount: recipe.missedIngredientCount || 0,
          usedIngredients: recipe.usedIngredients || [],
          missedIngredients: recipe.missedIngredients || [],
          readyInMinutes: recipe.readyInMinutes || null,
          savedAt: Date.now()
        });

        showToast(`Saved "${recipe.title.slice(0, 30)}..." to your vault!`, 'success');
      }
    } catch (err) {
      console.warn('Firebase write failed, using local storage fallback:', err.message);
      // Fallback local storage saving
      setSavedRecipes((prev) => {
        const updated = { ...prev };
        if (isAlreadySaved) {
          delete updated[`rec_${recipe.id}`];
        } else {
          updated[`rec_${recipe.id}`] = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            likes: recipe.likes || 0,
            usedIngredients: recipe.usedIngredients || [],
            missedIngredients: recipe.missedIngredients || []
          };
        }
        localStorage.setItem('f2t_saved_recipes', JSON.stringify(updated));
        const idSet = new Set(Object.values(updated).map((i) => i.id));
        setSavedRecipeIds(idSet);
        return updated;
      });
      showToast(isAlreadySaved ? 'Removed from saved.' : 'Saved to favorites (local session)!', 'success');
    }
  };

  // Direct remove from Saved view
  const handleRemoveSaved = async (id, fbKey) => {
    try {
      const targetKey = fbKey || `rec_${id}`;
      const targetRef = ref(db, `savedRecipes/${targetKey}`);
      await remove(targetRef);
      showToast('Recipe removed from vault.', 'info');
    } catch (err) {
      console.warn('Firebase delete error, removing locally:', err.message);
      setSavedRecipes((prev) => {
        const updated = { ...prev };
        delete updated[fbKey || `rec_${id}`];
        localStorage.setItem('f2t_saved_recipes', JSON.stringify(updated));
        const idSet = new Set(Object.values(updated).map((i) => i.id));
        setSavedRecipeIds(idSet);
        return updated;
      });
      showToast('Recipe removed.', 'info');
    }
  };

  const savedCount = Object.keys(savedRecipes || {}).length;

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} className="toast-icon" />}
          {toast.type === 'error' && <AlertTriangle size={18} className="toast-icon" />}
          {toast.type === 'info' && <Info size={18} className="toast-icon" />}
          <span className="toast-text">{toast.message}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedCount}
        ingredientCount={ingredients.length}
        onClearIngredients={handleClearIngredients}
      />

      <main className="app-main">
        {activeTab === 'search' ? (
          <>
            {/* Fridge Inventory Input Hero */}
            <IngredientInput
              ingredients={ingredients}
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              onSearch={() => handleSearch()}
              isLoading={isLoading}
              cuisine={cuisine}
              onCuisineChange={handleCuisineChange}
            />

            {/* Recipes Grid */}
            <RecipeGrid
              recipes={recipes}
              isLoading={isLoading}
              savedRecipeIds={savedRecipeIds}
              onToggleSave={handleToggleSave}
              onSelectRecipe={(r) => setSelectedRecipe(r)}
              onTryPreset={handleTryPreset}
            />
          </>
        ) : (
          /* Firebase Saved Recipes View */
          <SavedRecipes
            savedRecipes={savedRecipes}
            onRemoveSaved={handleRemoveSaved}
            onSelectRecipe={(r) => setSelectedRecipe(r)}
            onBackToSearch={() => setActiveTab('search')}
          />
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isSaved={savedRecipeIds.has(selectedRecipe.id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* Eco & API Footer */}
      <Footer />
    </div>
  );
}
