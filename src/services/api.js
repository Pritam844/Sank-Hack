import { matchRecipesFromDatabase } from './recipeDatabase.js';

// Primary Spoonacular API Key provided by user
const API_KEY = '943617de30a949569d4f9278331e9ea3';

/**
 * Fetch recipes dynamically matching ingredients.
 * Prioritizes live Spoonacular API with Indian cuisine & max-used-ingredients ranking,
 * and seamlessly falls back to the dynamic smart recipe engine if quota or network fails.
 * 
 * @param {string} ingredientsString - Comma-separated list of ingredients
 * @param {string} cuisine - 'Indian' (default) or 'all'
 * @param {number} number - Maximum results to return
 * @returns {Promise<Array>}
 */
export const fetchIndianRecipes = async (ingredientsString, cuisine = 'Indian', number = 12) => {
  if (!ingredientsString || ingredientsString.trim() === '') {
    return [];
  }

  const cleanIngredients = ingredientsString.trim();

  try {
    const cuisineParam = cuisine && cuisine !== 'all' ? `&cuisine=${encodeURIComponent(cuisine)}` : '';
    
    // Spoonacular complexSearch: sort by max-used-ingredients, fill ingredient data & recipe info
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${encodeURIComponent(
        cleanIngredients
      )}${cuisineParam}&sort=max-used-ingredients&fillIngredients=true&addRecipeInformation=true&number=${number}&apiKey=${API_KEY}`
    );

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.results) && data.results.length > 0) {
        return data.results;
      }
    } else {
      console.warn(`Spoonacular API returned HTTP ${response.status}. Using dynamic matching engine.`);
    }
  } catch (error) {
    console.error("Network or Spoonacular API error:", error);
  }

  // If Spoonacular returned 0 items or quota reached (402), dynamically match user's exact ingredients!
  const localMatches = matchRecipesFromDatabase(cleanIngredients, cuisine);
  if (localMatches.length > 0) {
    return localMatches;
  }

  // If still 0 matches, search without cuisine constraint to ensure user always gets recipes
  return matchRecipesFromDatabase(cleanIngredients, 'all');
};

/**
 * Alternative findByIngredients endpoint
 */
export const fetchIndianRecipesByIngredients = async (ingredientsString) => {
  return fetchIndianRecipes(ingredientsString, 'Indian', 12);
};

// Alias for backwards compatibility
export const fetchRecipesByIngredients = (ingredientsString, cuisine = 'Indian', number = 12) => {
  return fetchIndianRecipes(ingredientsString, cuisine, number);
};

/**
 * Fetch detailed recipe information including instructions, timing, and nutrition
 */
export const fetchRecipeInformation = async (id) => {
  // If ID matches our local database item, return it directly
  if (typeof id === 'number' && id >= 1000 && id <= 2000) {
    const local = matchRecipesFromDatabase('', 'all').find(r => r.id === id);
    if (local) return local;
  }

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
    );

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(`Error fetching recipe info for ID ${id}:`, error);
  }

  return null;
};
