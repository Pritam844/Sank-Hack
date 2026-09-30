import { firestore, db } from '../firebase';
import { collection, getDocs, doc, getDoc, query, limit } from 'firebase/firestore';
import { ref, get } from 'firebase/database';
import { matchRecipesFromDatabase } from './recipeDatabase.js';

// Curated high quality food photography for recipe cards without images
const FOOD_IMAGES = [
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80'
];

function getFallbackImage(seed = '') {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % FOOD_IMAGES.length;
  return FOOD_IMAGES[index];
}

/**
 * Normalizes a recipe document from Firebase into the standard application format
 */
function formatFirebaseRecipe(id, data, userIngredients = []) {
  const title = data.title || 'Delicious Homemade Recipe';
  const rawIngredients = Array.isArray(data.ingredients) ? data.ingredients : [];
  const rawDirections = Array.isArray(data.directions) 
    ? data.directions.join('\n') 
    : (data.directions || data.instructions || 'Follow standard preparation steps.');
  const nerList = Array.isArray(data.ner) ? data.ner : [];

  const allIngredients = rawIngredients.length > 0 
    ? rawIngredients 
    : (nerList.length > 0 ? nerList : ['Staple ingredients']);

  // Match user ingredients against recipe ingredients or NER keywords
  const userTokens = userIngredients.map(item => item.trim().toLowerCase()).filter(Boolean);
  
  const usedIngredients = [];
  const missedIngredients = [];

  allIngredients.forEach((ing, idx) => {
    const ingLower = (typeof ing === 'string' ? ing : String(ing)).toLowerCase();
    const isMatched = userTokens.some(token => ingLower.includes(token));
    const ingObj = {
      id: `${id}_ing_${idx}`,
      name: typeof ing === 'string' ? ing : String(ing),
      original: typeof ing === 'string' ? ing : String(ing)
    };

    if (isMatched) {
      usedIngredients.push(ingObj);
    } else {
      // Check if this missing ingredient is just a common household pantry staple
      const isStaple = [
        'salt', 'black pepper', 'pepper', 'water', 'oil', 'cooking oil',
        'butter', 'ghee', 'turmeric', 'chili', 'garam masala', 'cumin',
        'sugar', 'flour', 'jeera'
      ].some(s => ingLower.includes(s));

      if (!isStaple) {
        missedIngredients.push(ingObj);
      }
    }
  });

  return {
    id: id,
    title: title,
    image: data.image || getFallbackImage(title),
    readyInMinutes: data.readyInMinutes || 25,
    servings: data.servings || 4,
    instructions: rawDirections,
    summary: data.summary || `A wonderful recipe featuring ${allIngredients.slice(0, 4).join(', ')}.`,
    extendedIngredients: allIngredients.map((item, idx) => ({
      id: `${id}_ext_${idx}`,
      name: item,
      original: item
    })),
    usedIngredients,
    missedIngredients,
    usedIngredientCount: usedIngredients.length,
    missedIngredientCount: missedIngredients.length,
    likes: data.likes || 10,
    sourceUrl: data.link || ''
  };
}

/**
 * Fetch recipes matching ingredients from Firebase (Firestore / Realtime Database)
 * with automatic fallback to the smart catalog for testing and offline reliability.
 * 
 * @param {string} ingredientsString - Comma-separated list of ingredients
 * @param {string} cuisine - 'Indian' (default) or 'all'
 * @param {number} maxResults - Maximum results to return
 * @returns {Promise<Array>}
 */
export const fetchIndianRecipes = async (ingredientsString, cuisine = 'Indian', maxResults = 12) => {
  if (!ingredientsString || ingredientsString.trim() === '') {
    return [];
  }

  const cleanIngredients = ingredientsString.trim();
  const userTokens = cleanIngredients
    .split(',')
    .map(i => i.trim().toLowerCase())
    .filter(Boolean);

  // 1. Try querying Firebase Firestore 'recipes' collection
  try {
    const recipesRef = collection(firestore, 'recipes');
    const q = query(recipesRef, limit(60));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const candidates = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const formatted = formatFirebaseRecipe(docSnap.id, data, userTokens);
        if (formatted.usedIngredientCount > 0) {
          candidates.push(formatted);
        }
      });

      if (candidates.length > 0) {
        // STRICT PRIORITY: Exact matches (0 missing groceries) FIRST!
        candidates.sort((a, b) => {
          const aExact = a.missedIngredientCount === 0 ? 1 : 0;
          const bExact = b.missedIngredientCount === 0 ? 1 : 0;
          if (bExact !== aExact) return bExact - aExact;
          if (a.missedIngredientCount !== b.missedIngredientCount) {
            return a.missedIngredientCount - b.missedIngredientCount;
          }
          return b.usedIngredientCount - a.usedIngredientCount;
        });
        return candidates.slice(0, maxResults);
      }
    }
  } catch (error) {
    console.warn('Firebase Firestore query notice (testing mode / security rule / empty):', error.message);
  }

  // 2. Try querying Firebase Realtime Database '/recipes'
  try {
    const rtdbRef = ref(db, 'recipes');
    const rtdbSnap = await get(rtdbRef);
    if (rtdbSnap.exists()) {
      const data = rtdbSnap.val();
      const candidates = [];
      Object.entries(data).forEach(([key, val]) => {
        const formatted = formatFirebaseRecipe(key, val, userTokens);
        if (formatted.usedIngredientCount > 0) {
          candidates.push(formatted);
        }
      });
      if (candidates.length > 0) {
        candidates.sort((a, b) => {
          const aExact = a.missedIngredientCount === 0 ? 1 : 0;
          const bExact = b.missedIngredientCount === 0 ? 1 : 0;
          if (bExact !== aExact) return bExact - aExact;
          if (a.missedIngredientCount !== b.missedIngredientCount) {
            return a.missedIngredientCount - b.missedIngredientCount;
          }
          return b.usedIngredientCount - a.usedIngredientCount;
        });
        return candidates.slice(0, maxResults);
      }
    }
  } catch (error) {
    console.warn('Firebase Realtime DB query notice:', error.message);
  }

  // 3. Fallback to smart local dataset for seamless testing and zero-break experience
  const localMatches = matchRecipesFromDatabase(cleanIngredients, cuisine);
  if (localMatches.length > 0) {
    return localMatches;
  }

  return matchRecipesFromDatabase(cleanIngredients, 'all');
};

/**
 * Fetch recipes by ingredients list
 */
export const fetchIndianRecipesByIngredients = async (ingredientsString) => {
  return fetchIndianRecipes(ingredientsString, 'Indian', 12);
};

// Alias for backwards compatibility
export const fetchRecipesByIngredients = (ingredientsString, cuisine = 'Indian', number = 12) => {
  return fetchIndianRecipes(ingredientsString, cuisine, number);
};

/**
 * Fetch detailed recipe information by ID from Firebase or local database
 */
export const fetchRecipeInformation = async (id) => {
  // Try Firebase Firestore first
  try {
    const docId = String(id).startsWith('recipe_') ? String(id) : `recipe_${id}`;
    const docRef = doc(firestore, 'recipes', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return formatFirebaseRecipe(docSnap.id, docSnap.data(), []);
    }
  } catch (error) {
    console.warn('Firebase Firestore recipe detail fetch notice:', error.message);
  }

  // Check local database
  const local = matchRecipesFromDatabase('', 'all').find(r => r.id === id || String(r.id) === String(id));
  if (local) return local;

  return null;
};

