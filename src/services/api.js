const API_KEY = '75ace30215ca41d1ae9c31c9a2d21131';

/**
 * Fetch recipes filtered by cuisine (Indian prioritized) and sorted by best match (max-used-ingredients)
 * Uses complexSearch with fillIngredients=true and addRecipeInformation=true
 * @param {string} ingredientsString - Comma-separated ingredients list
 * @param {string} cuisine - Cuisine filter ('Indian' or 'all')
 * @param {number} number - Result count
 * @returns {Promise<Array>}
 */
export const fetchIndianRecipes = async (ingredientsString, cuisine = 'Indian', number = 12) => {
  if (!ingredientsString || ingredientsString.trim() === '') {
    return [];
  }

  try {
    const cuisineParam = cuisine && cuisine !== 'all' ? `&cuisine=${encodeURIComponent(cuisine)}` : '';
    
    // complexSearch with sort=max-used-ingredients, fillIngredients=true, addRecipeInformation=true
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${encodeURIComponent(
        ingredientsString
      )}${cuisineParam}&sort=max-used-ingredients&fillIngredients=true&addRecipeInformation=true&number=${number}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 402) {
        console.warn("Spoonacular API quota reached. Serving curated Indian fallback recipes.");
        return getFallbackIndianRecipes(ingredientsString);
      }
      throw new Error(`Spoonacular API returned status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results || [];

    // If Indian cuisine was selected but returned 0 results, fallback to findByIngredients
    if (results.length === 0 && cuisine === 'Indian') {
      return await fetchIndianRecipesByIngredients(ingredientsString);
    }

    return results;
  } catch (error) {
    console.error("Error fetching Indian recipes from Spoonacular:", error);
    return getFallbackIndianRecipes(ingredientsString);
  }
};

/**
 * Alternative approach: findByIngredients ranked by max used ingredients (ranking=1)
 * and prioritized for Indian cuisine
 */
export const fetchIndianRecipesByIngredients = async (ingredientsString) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
        ingredientsString
      )}&number=16&ranking=1&ignorePantry=true&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      return getFallbackIndianRecipes(ingredientsString);
    }

    const recipes = await response.json();
    if (!Array.isArray(recipes) || recipes.length === 0) {
      return getFallbackIndianRecipes(ingredientsString);
    }

    return recipes;
  } catch (error) {
    console.error("Error in fetchIndianRecipesByIngredients:", error);
    return getFallbackIndianRecipes(ingredientsString);
  }
};

// Alias for backward compatibility
export const fetchRecipesByIngredients = (ingredientsString, cuisine = 'Indian', number = 12) => {
  return fetchIndianRecipes(ingredientsString, cuisine, number);
};

/**
 * Fetch detailed recipe information including instructions, timing, and nutrition
 */
export const fetchRecipeInformation = async (id) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Spoonacular API returned status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching recipe info for ID ${id}:`, error);
    return null;
  }
};

/**
 * Curated authentic Indian rescue recipes fallback in case of rate limit or offline state
 */
const getFallbackIndianRecipes = (ingredients) => {
  return [
    {
      id: 8001,
      title: "Dhaba Style Spiced Egg Bhurji (Indian Scramble)",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
      likes: 640,
      cuisines: ["Indian"],
      usedIngredientCount: 3,
      missedIngredientCount: 2,
      usedIngredients: [
        { id: 101, name: "eggs", amount: 4, unit: "pieces", original: "4 farm eggs" },
        { id: 102, name: "onions", amount: 2, unit: "medium", original: "2 finely chopped yellow onions" },
        { id: 103, name: "tomatoes", amount: 2, unit: "medium", original: "2 ripe chopped tomatoes" }
      ],
      missedIngredients: [
        { id: 104, name: "green chilies & ginger", amount: 1, unit: "tbsp", original: "1 tbsp minced green chili & ginger" },
        { id: 105, name: "garam masala & butter", amount: 1, unit: "tsp", original: "1 tsp garam masala & butter" }
      ],
      readyInMinutes: 15,
      servings: 2,
      summary: "A fiery, street-style spiced Indian scrambled egg dish bursting with caramelized onions, tangy tomatoes, and fragrant spices."
    },
    {
      id: 8002,
      title: "Royal Shahi Paneer Butter Masala",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
      likes: 1420,
      cuisines: ["Indian"],
      usedIngredientCount: 2,
      missedIngredientCount: 2,
      usedIngredients: [
        { id: 106, name: "tomatoes", amount: 4, unit: "large", original: "4 plump tomatoes" },
        { id: 107, name: "butter", amount: 2, unit: "tbsp", original: "2 tbsp unsalted butter" }
      ],
      missedIngredients: [
        { id: 108, name: "malai paneer", amount: 250, unit: "g", original: "250g fresh paneer cubes" },
        { id: 109, name: "kasuri methi & cream", amount: 2, unit: "tbsp", original: "2 tbsp fresh cream & fenugreek" }
      ],
      readyInMinutes: 25,
      servings: 3,
      summary: "Rich and velvety tomato-butter gravy simmered with soft golden paneer cubes and finished with aromatic crushed kasuri methi."
    },
    {
      id: 8003,
      title: "Crispy Aloo Jeera Tadka (Cumin Potatoes)",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
      likes: 512,
      cuisines: ["Indian"],
      usedIngredientCount: 2,
      missedIngredientCount: 2,
      usedIngredients: [
        { id: 110, name: "potatoes", amount: 4, unit: "medium", original: "4 boiled and cubed potatoes" },
        { id: 111, name: "garlic", amount: 4, unit: "cloves", original: "4 crushed garlic cloves" }
      ],
      missedIngredients: [
        { id: 112, name: "cumin seeds (jeera)", amount: 1.5, unit: "tbsp", original: "1.5 tbsp whole roasted cumin seeds" },
        { id: 113, name: "coriander & turmeric", amount: 1, unit: "tsp", original: "1 tsp fresh turmeric & cilantro" }
      ],
      readyInMinutes: 18,
      servings: 4,
      summary: "Golden skillet-crisped potatoes tossed with crackling toasted cumin seeds, aromatic garlic, and fresh coriander."
    },
    {
      id: 8004,
      title: "Homestyle Dal Tadka with Garlic Ghee Tempering",
      image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80",
      likes: 980,
      cuisines: ["Indian"],
      usedIngredientCount: 3,
      missedIngredientCount: 1,
      usedIngredients: [
        { id: 114, name: "onions", amount: 1, unit: "large", original: "1 sliced onion" },
        { id: 115, name: "tomatoes", amount: 2, unit: "medium", original: "2 ripe tomatoes" },
        { id: 116, name: "garlic", amount: 6, unit: "cloves", original: "6 sliced garlic cloves" }
      ],
      missedIngredients: [
        { id: 117, name: "toor or moong dal", amount: 1, unit: "cup", original: "1 cup yellow lentils (dal)" }
      ],
      readyInMinutes: 22,
      servings: 4,
      summary: "Comforting yellow lentils tempered in sizzling ghee with caramelized garlic, whole dried chilies, and cumin."
    }
  ];
};
