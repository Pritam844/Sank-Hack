# 🥗 Fridge2Table — Zero Waste Recipe Rescue

**Fridge2Table** is a minimalist, ultra-clean web application built to eliminate food waste and turn leftover fridge ingredients into delicious meals. Powered by React 19, Vite, Spoonacular API, and Firebase Realtime Database.

---

## 🌟 Key Features

1. **Rapid Leftover Ingredient Input:**
   - Instant search bar with Enter / Add chip creation.
   - Quick-add pantry tags (Eggs, Cheese, Chicken, Rice, Tomatoes, Garlic, Onions, Spinach, etc.).
   - Pre-loaded rescue combinations (Breakfast Skillet, Quick Pasta, Savory Rice Bowl).

2. **Smart Recipe Matching (Spoonacular API):**
   - Matches recipes ranked by highest percentage of fridge ingredients used.
   - Sort by **Fridge Match %**, **Fewest Missing Groceries**, or **Popularity / Saves**.
   - Graceful fallback rescue dishes if the Spoonacular API quota is reached.

3. **Missing Items & 10-Minute Grocery Quick Orders:**
   - Clearly separates **Used Ingredients** (green chips) from **Missing Items** (amber chips).
   - Instant 1-click delivery links for **Zepto**, **Blinkit**, **Swiggy Instamart**, **BigBasket**, and **Flipkart Minutes**!

4. **Detailed Cooking Modal:**
   - Full step-by-step preparation and cooking instructions.
   - Cooking time and serving counts.
   - Direct link to original publisher source.

5. **Saved Favorites (Firebase Realtime Database Integration):**
   - Save or unsave recipes with real-time cloud synchronization.
   - Confetti burst animation on bookmarking.
   - Search & filter within saved favorites.
   - Seamless local-storage fallback for offline resilience.

---

## 🛠️ Tech Stack

- **Frontend:** React 19 + Vite 8
- **Styling:** Custom Vanilla CSS Design System (Culinary Neon Dark Theme, glassmorphism, micro-animations)
- **API Service:** Spoonacular Food API (`findByIngredients` & `information`)
- **Backend / Database:** Firebase Realtime Database (`firebase/database`)
- **Icons:** Lucide React

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

The application runs locally at: `http://localhost:5173/`

---

## 📁 Project Structure

```
d:\antigraviy\Snack Hack\
├── index.html                     # HTML5 with SEO meta tags & Google Fonts
├── vite.config.js                 # Vite + React configuration
├── package.json                   # Dependencies & scripts
└── src/
    ├── main.jsx                   # React root entry point
    ├── index.css                  # Global design tokens & glassmorphism
    ├── App.jsx                    # State, search logic, Firebase sync & toast
    ├── App.css                    # App layout & toast styles
    ├── firebase.js                # Firebase app & database initialization
    ├── services/
    │   └── api.js                 # Spoonacular API service & fallback catalog
    └── components/
        ├── Header.jsx & .css      # Brand bar, counters & navigation
        ├── IngredientInput.jsx    # Search bar & quick suggestions
        ├── RecipeCard.jsx & .css  # Card with match %, order links, heart save
        ├── RecipeGrid.jsx & .css  # Responsive grid, sorting, skeleton states
        ├── RecipeModal.jsx & .css # Full recipe details & grocery shopping
        ├── SavedRecipes.jsx & .css# Firebase saved recipe vault
        └── Footer.jsx & .css      # Food rescue tips & tech attribution
```
