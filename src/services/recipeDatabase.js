/**
 * Comprehensive Recipe Database with Authentic Indian & Global dishes
 * Used for dynamic real-time ingredient matching and zero-waste rescue.
 */
export const RECIPE_DATABASE = [
  // --- CHICKEN DISHES ---
  {
    id: 1001,
    title: "Homestyle Indian Chicken Curry",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 30,
    servings: 4,
    likes: 1280,
    summary: "A comforting, fragrant chicken curry simmered in caramelized onions, ginger-garlic paste, and crushed tomatoes.",
    ingredients: [
      { id: 1, name: "chicken", original: "500g bone-in or boneless chicken", amount: 500, unit: "g" },
      { id: 2, name: "onions", original: "2 finely sliced onions", amount: 2, unit: "medium" },
      { id: 3, name: "tomatoes", original: "2 puréed tomatoes", amount: 2, unit: "medium" },
      { id: 4, name: "ginger", original: "1 tbsp minced fresh ginger", amount: 1, unit: "tbsp" },
      { id: 5, name: "garlic", original: "1 tbsp crushed garlic", amount: 1, unit: "tbsp" },
      { id: 6, name: "garam masala", original: "1 tsp garam masala", amount: 1, unit: "tsp" },
      { id: 7, name: "turmeric & chili", original: "1 tsp turmeric & red chili powder", amount: 1, unit: "tsp" }
    ],
    instructions: "1. Heat oil in a heavy-bottomed pot. Sauté onions until deep golden brown.\n2. Add ginger and garlic paste; stir for 1 minute until fragrant.\n3. Add chopped or puréed tomatoes and spice powders; cook until oil separates.\n4. Add chicken pieces, bhunno (sear) on high heat for 5 minutes, then add 1/2 cup warm water.\n5. Cover and simmer on low for 18-20 minutes until chicken is tender. Garnish with coriander."
  },
  {
    id: 1002,
    title: "Rich Restaurant-Style Butter Chicken (Murgh Makhani)",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 35,
    servings: 4,
    likes: 2450,
    summary: "Tender grilled chicken pieces bathed in a luscious, velvety tomato-butter gravy scented with kasuri methi.",
    ingredients: [
      { id: 8, name: "chicken", original: "400g boneless chicken thigh or breast", amount: 400, unit: "g" },
      { id: 9, name: "butter", original: "3 tbsp butter", amount: 3, unit: "tbsp" },
      { id: 10, name: "tomatoes", original: "4 large ripe tomatoes", amount: 4, unit: "large" },
      { id: 11, name: "heavy cream", original: "1/4 cup fresh heavy cream", amount: 0.25, unit: "cup" },
      { id: 12, name: "garlic", original: "4 cloves garlic", amount: 4, unit: "cloves" },
      { id: 13, name: "kasuri methi", original: "1 tbsp dried fenugreek leaves", amount: 1, unit: "tbsp" }
    ],
    instructions: "1. Sear marinated chicken pieces in butter until charred and set aside.\n2. In the same pan, simmer tomatoes, garlic, and spices until soft, then blend into a silky smooth puree.\n3. Return gravy to pan, stir in butter and heavy cream.\n4. Add the seared chicken into the gravy and simmer for 6-8 minutes.\n5. Finish by crushing kasuri methi over the top."
  },
  {
    id: 1003,
    title: "Aromatic Chicken & Rice Biryani Bowl",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 40,
    servings: 4,
    likes: 1980,
    summary: "Fluffy basmati rice layered with spiced marinated chicken, crispy fried onions, and whole warm spices.",
    ingredients: [
      { id: 14, name: "chicken", original: "400g chicken cubes", amount: 400, unit: "g" },
      { id: 15, name: "rice", original: "2 cups basmati rice", amount: 2, unit: "cups" },
      { id: 16, name: "onions", original: "2 large onions (for birista)", amount: 2, unit: "large" },
      { id: 17, name: "yogurt / curd", original: "1/2 cup whisked curd", amount: 0.5, unit: "cup" },
      { id: 18, name: "mint & coriander", original: "Handful chopped fresh mint & coriander", amount: 1, unit: "bunch" },
      { id: 19, name: "biryani masala", original: "1 tbsp biryani masala", amount: 1, unit: "tbsp" }
    ],
    instructions: "1. Marinate chicken in yogurt, biryani masala, ginger, and garlic for 15 minutes.\n2. Cook basmati rice in salted boiling water until 70% done, then drain.\n3. Cook marinated chicken in a heavy pot until 80% done.\n4. Layer half-cooked rice over chicken, top with fried onions, fresh mint, and ghee.\n5. Seal pot with tight lid and cook on dum (very low heat) for 15 minutes."
  },
  {
    id: 1004,
    title: "Wok-Tossed Chicken Fried Rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Asian", "Indian"],
    readyInMinutes: 15,
    servings: 2,
    likes: 870,
    summary: "A high-heat wok toss of leftover cooked rice, diced chicken, soy sauce, and scallions.",
    ingredients: [
      { id: 20, name: "chicken", original: "150g diced cooked or raw chicken", amount: 150, unit: "g" },
      { id: 21, name: "rice", original: "3 cups cold day-old cooked rice", amount: 3, unit: "cups" },
      { id: 22, name: "eggs", original: "2 beaten eggs", amount: 2, unit: "pieces" },
      { id: 23, name: "garlic", original: "4 minced garlic cloves", amount: 4, unit: "cloves" },
      { id: 24, name: "soy sauce", original: "2 tbsp dark soy sauce", amount: 2, unit: "tbsp" },
      { id: 25, name: "spring onions", original: "1/2 cup chopped spring onions", amount: 0.5, unit: "cup" }
    ],
    instructions: "1. Heat oil in a wok over high heat. Scramble eggs and set aside.\n2. Add garlic and chicken; stir-fry until golden.\n3. Add chilled rice, breaking up any clumps with a spatula.\n4. Drizzle soy sauce and pepper around the wok rim; toss vigorously for 2 minutes.\n5. Fold in scrambled eggs and chopped spring onions."
  },

  // --- EGG DISHES ---
  {
    id: 1005,
    title: "Dhaba Style Spiced Egg Bhurji (Indian Scramble)",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 12,
    servings: 2,
    likes: 1140,
    summary: "Street-style spiced Indian scrambled eggs packed with caramelized onions, juicy tomatoes, and green chilies.",
    ingredients: [
      { id: 26, name: "eggs", original: "4 large eggs", amount: 4, unit: "pieces" },
      { id: 27, name: "onions", original: "2 medium finely chopped onions", amount: 2, unit: "medium" },
      { id: 28, name: "tomatoes", original: "2 ripe chopped tomatoes", amount: 2, unit: "medium" },
      { id: 29, name: "butter", original: "2 tbsp butter or oil", amount: 2, unit: "tbsp" },
      { id: 30, name: "green chili", original: "2 chopped green chilies", amount: 2, unit: "pieces" },
      { id: 31, name: "garam masala", original: "1/2 tsp garam masala", amount: 0.5, unit: "tsp" }
    ],
    instructions: "1. Melt butter in a skillet. Sauté onions and green chilies until lightly browned.\n2. Add chopped tomatoes, turmeric, and salt; cook until tomatoes turn mushy.\n3. Whisk eggs in a bowl, then pour into the pan.\n4. Stir continuously on medium heat until soft curds form.\n5. Sprinkle garam masala and chopped coriander; serve with warm pav or toast."
  },
  {
    id: 1006,
    title: "Golden Tariwala Boiled Egg Curry",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 22,
    servings: 3,
    likes: 890,
    summary: "Pan-blistered hard-boiled eggs simmered in a spiced onion-tomato gravy.",
    ingredients: [
      { id: 32, name: "eggs", original: "4-6 hard-boiled eggs", amount: 5, unit: "pieces" },
      { id: 33, name: "onions", original: "2 chopped onions", amount: 2, unit: "medium" },
      { id: 34, name: "tomatoes", original: "2 chopped tomatoes", amount: 2, unit: "medium" },
      { id: 35, name: "garlic", original: "4 cloves crushed garlic", amount: 4, unit: "cloves" },
      { id: 36, name: "ginger", original: "1 inch grated ginger", amount: 1, unit: "inch" },
      { id: 37, name: "turmeric", original: "1/2 tsp turmeric powder", amount: 0.5, unit: "tsp" }
    ],
    instructions: "1. Make small slits in boiled eggs. Fry in hot oil with a pinch of turmeric until golden blistered.\n2. Sauté onions, ginger, and garlic in the same oil until browned.\n3. Add tomatoes and spices; cook until oil releases.\n4. Add 1 cup of water to make a gravy; bring to a boil.\n5. Drop in the fried eggs and simmer for 5-7 minutes."
  },
  {
    id: 1007,
    title: "Fluffy Cheesy Herb Omelette",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Global"],
    readyInMinutes: 10,
    servings: 1,
    likes: 720,
    summary: "A golden French-style skillet omelette folded with melted cheese, black pepper, and herbs.",
    ingredients: [
      { id: 38, name: "eggs", original: "3 fresh eggs", amount: 3, unit: "pieces" },
      { id: 39, name: "cheese", original: "1/3 cup shredded cheddar or mozzarella", amount: 0.33, unit: "cup" },
      { id: 40, name: "butter", original: "1 tbsp butter", amount: 1, unit: "tbsp" },
      { id: 41, name: "milk", original: "1 tbsp milk", amount: 1, unit: "tbsp" },
      { id: 42, name: "black pepper", original: "Freshly cracked black pepper", amount: 0.25, unit: "tsp" }
    ],
    instructions: "1. Beat eggs with milk, salt, and pepper until frothy.\n2. Melt butter in a non-stick pan over medium-low heat.\n3. Pour egg mixture, dragging cooked edges to the center.\n4. When almost set, sprinkle shredded cheese over one half.\n5. Fold gently and slide onto a warm plate."
  },

  // --- PANEER DISHES ---
  {
    id: 1008,
    title: "Royal Shahi Paneer Butter Masala",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 25,
    servings: 3,
    likes: 2150,
    summary: "Soft paneer cubes simmered in a velvety, buttery tomato gravy spiced with cardamom and kasuri methi.",
    ingredients: [
      { id: 43, name: "paneer", original: "250g fresh paneer cubes", amount: 250, unit: "g" },
      { id: 44, name: "tomatoes", original: "4 plump tomatoes", amount: 4, unit: "large" },
      { id: 45, name: "butter", original: "3 tbsp butter", amount: 3, unit: "tbsp" },
      { id: 46, name: "garlic", original: "4 cloves garlic", amount: 4, unit: "cloves" },
      { id: 47, name: "cream", original: "2 tbsp fresh cream", amount: 2, unit: "tbsp" },
      { id: 48, name: "kasuri methi", original: "1 tbsp dried fenugreek", amount: 1, unit: "tbsp" }
    ],
    instructions: "1. Sauté tomatoes, garlic, and cashews/onions in 1 tbsp butter, then puree until silky.\n2. Heat remaining butter in a skillet, add gravy and simmer for 5 minutes.\n3. Stir in cream, salt, and garam masala.\n4. Gently fold in paneer cubes; simmer on low for 3 minutes.\n5. Garnish with crushed kasuri methi."
  },
  {
    id: 1009,
    title: "Healthy Dhaba Style Palak Paneer",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 25,
    servings: 3,
    likes: 1650,
    summary: "Fresh spinach leaves blanched and blended with garlic, ginger, and cumin, served with tender paneer.",
    ingredients: [
      { id: 49, name: "paneer", original: "200g paneer cubes", amount: 200, unit: "g" },
      { id: 50, name: "spinach", original: "1 large bunch fresh spinach (palak)", amount: 1, unit: "bunch" },
      { id: 51, name: "garlic", original: "6 cloves sliced garlic", amount: 6, unit: "cloves" },
      { id: 52, name: "onions", original: "1 finely chopped onion", amount: 1, unit: "medium" },
      { id: 53, name: "green chili", original: "2 green chilies", amount: 2, unit: "pieces" },
      { id: 54, name: "butter", original: "1 tbsp butter or ghee", amount: 1, unit: "tbsp" }
    ],
    instructions: "1. Blanch spinach in boiling water for 2 minutes, then plunge into cold ice water.\n2. Puree spinach with green chilies into a vibrant green paste.\n3. Sauté onions and garlic in ghee until golden brown.\n4. Pour in spinach puree; simmer for 4 minutes.\n5. Add paneer cubes, season with salt and garam masala, simmer 2 minutes."
  },
  {
    id: 1010,
    title: "Spicy Street-Style Paneer Bhurji",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 15,
    servings: 2,
    likes: 930,
    summary: "Crumbled cottage cheese sautéed with onions, tomatoes, bell peppers, and pav bhaji masala.",
    ingredients: [
      { id: 55, name: "paneer", original: "200g fresh crumbled paneer", amount: 200, unit: "g" },
      { id: 56, name: "onions", original: "1 chopped onion", amount: 1, unit: "medium" },
      { id: 57, name: "tomatoes", original: "1 chopped tomato", amount: 1, unit: "medium" },
      { id: 58, name: "bell pepper", original: "1/2 cup diced capsicum", amount: 0.5, unit: "cup" },
      { id: 59, name: "butter", original: "2 tbsp butter", amount: 2, unit: "tbsp" },
      { id: 60, name: "pav bhaji masala", original: "1 tsp pav bhaji or garam masala", amount: 1, unit: "tsp" }
    ],
    instructions: "1. Melt butter in a skillet. Sauté onions and bell peppers for 3 minutes.\n2. Add tomatoes and spices; cook until soft and fragrant.\n3. Add crumbled paneer; mix gently so it stays soft.\n4. Cook for just 2-3 minutes so paneer doesn’t get chewy.\n5. Finish with fresh coriander and lemon juice."
  },

  // --- POTATO / VEG DISHES ---
  {
    id: 1011,
    title: "Crispy Aloo Jeera Skillet (Cumin Potatoes)",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 15,
    servings: 3,
    likes: 850,
    summary: "Golden skillet-crisped potatoes tossed with fragrant crackling cumin seeds and garlic.",
    ingredients: [
      { id: 61, name: "potatoes", original: "3 boiled and cubed potatoes", amount: 3, unit: "medium" },
      { id: 62, name: "cumin", original: "1.5 tbsp whole cumin seeds (jeera)", amount: 1.5, unit: "tbsp" },
      { id: 63, name: "garlic", original: "4 crushed garlic cloves", amount: 4, unit: "cloves" },
      { id: 64, name: "turmeric", original: "1/2 tsp turmeric powder", amount: 0.5, unit: "tsp" },
      { id: 65, name: "coriander", original: "Chopped fresh cilantro", amount: 1, unit: "tbsp" }
    ],
    instructions: "1. Heat oil in a pan. Add cumin seeds and let them sizzle and crackle.\n2. Add crushed garlic and green chili; stir for 30 seconds.\n3. Add boiled potato cubes, turmeric, and salt.\n4. Sauté on medium-high heat for 6-8 minutes until edges turn golden and crisp.\n5. Garnish with fresh coriander."
  },
  {
    id: 1012,
    title: "Cheesy Loaded Potato Bake",
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Global"],
    readyInMinutes: 25,
    servings: 3,
    likes: 1100,
    summary: "Tender sliced potatoes layered with melted gooey cheese, garlic butter, and fresh herbs.",
    ingredients: [
      { id: 66, name: "potatoes", original: "3 medium sliced potatoes", amount: 3, unit: "medium" },
      { id: 67, name: "cheese", original: "1 cup grated cheddar / mozzarella", amount: 1, unit: "cup" },
      { id: 68, name: "butter", original: "2 tbsp melted butter", amount: 2, unit: "tbsp" },
      { id: 69, name: "garlic", original: "3 minced garlic cloves", amount: 3, unit: "cloves" },
      { id: 70, name: "milk", original: "1/4 cup warm milk", amount: 0.25, unit: "cup" }
    ],
    instructions: "1. Thinly slice potatoes and toss with melted garlic butter, salt, and pepper.\n2. Layer in a baking dish or skillet, sprinkling cheese between layers.\n3. Pour milk over potatoes; cover and bake or pan-cook on low for 18 minutes.\n4. Uncover, top with extra cheese, and broil/grill until bubbling and golden."
  },

  // --- LENTILS & DAL ---
  {
    id: 1013,
    title: "Homestyle Dal Tadka with Garlic Ghee Tempering",
    image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 20,
    servings: 4,
    likes: 1540,
    summary: "Comforting yellow lentils tempered in sizzling ghee with caramelized garlic, onions, and cumin.",
    ingredients: [
      { id: 71, name: "dal", original: "1 cup yellow toor or moong dal", amount: 1, unit: "cup" },
      { id: 72, name: "onions", original: "1 finely diced onion", amount: 1, unit: "medium" },
      { id: 73, name: "tomatoes", original: "2 ripe chopped tomatoes", amount: 2, unit: "medium" },
      { id: 74, name: "garlic", original: "6 sliced garlic cloves", amount: 6, unit: "cloves" },
      { id: 75, name: "ghee / butter", original: "2 tbsp ghee or butter", amount: 2, unit: "tbsp" },
      { id: 76, name: "cumin", original: "1 tsp cumin seeds", amount: 1, unit: "tsp" }
    ],
    instructions: "1. Pressure cook or boil dal with turmeric and salt until tender; whisk lightly.\n2. Heat ghee in a tadka pan. Add cumin seeds and sliced garlic; fry until golden brown.\n3. Add onions and tomatoes; cook until soft and oil separates.\n4. Pour the sizzling tadka directly over the warm dal; stir and cover immediately.\n5. Serve piping hot with rice or roti."
  },
  {
    id: 1014,
    title: "Amritsari Chana Masala (Spiced Chickpeas)",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 25,
    servings: 4,
    likes: 1320,
    summary: "Tender chickpeas simmered in a dark, robust gravy spiced with dried pomegranate, onions, and ginger.",
    ingredients: [
      { id: 77, name: "chickpeas / chana", original: "2 cups boiled chickpeas or canned chana", amount: 2, unit: "cups" },
      { id: 78, name: "onions", original: "2 pureed onions", amount: 2, unit: "medium" },
      { id: 79, name: "tomatoes", original: "2 pureed tomatoes", amount: 2, unit: "medium" },
      { id: 80, name: "ginger", original: "1 inch ginger juliennes", amount: 1, unit: "inch" },
      { id: 81, name: "chana masala", original: "1.5 tbsp chole masala", amount: 1.5, unit: "tbsp" }
    ],
    instructions: "1. Sauté onion puree in oil until deep golden.\n2. Add tomato puree and chana masala; cook until oil releases.\n3. Add boiled chickpeas along with 1 cup of cooking water.\n4. Lightly mash a few chickpeas with the back of a ladle to thicken the gravy.\n5. Simmer for 10 minutes and garnish with ginger juliennes."
  },

  // --- PASTA & GLOBAL ---
  {
    id: 1015,
    title: "Mediterranean Burst Tomato & Garlic Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Italian", "Global"],
    readyInMinutes: 18,
    servings: 2,
    likes: 910,
    summary: "Sweet cherry tomatoes blistered in olive oil with slivered garlic, tossed with pasta and parmesan.",
    ingredients: [
      { id: 82, name: "pasta", original: "250g penne or spaghetti", amount: 250, unit: "g" },
      { id: 83, name: "tomatoes", original: "2 cups cherry tomatoes", amount: 2, unit: "cups" },
      { id: 84, name: "garlic", original: "5 thinly sliced garlic cloves", amount: 5, unit: "cloves" },
      { id: 85, name: "cheese", original: "1/4 cup grated cheese", amount: 0.25, unit: "cup" },
      { id: 86, name: "olive oil / butter", original: "2 tbsp olive oil or butter", amount: 2, unit: "tbsp" }
    ],
    instructions: "1. Boil pasta in heavily salted water until al dente.\n2. Heat olive oil in a skillet. Sauté garlic and whole cherry tomatoes until tomatoes burst.\n3. Press tomatoes gently with a fork to release juices and form a sauce.\n4. Toss pasta into the pan with 1/4 cup pasta water.\n5. Top with grated cheese and fresh basil/pepper."
  },
  {
    id: 1016,
    title: "Creamy Garlic Butter Cheese Pasta",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Global"],
    readyInMinutes: 15,
    servings: 2,
    likes: 1240,
    summary: "Rich, decadent comfort pasta tossed in a velvety garlic butter sauce with melting cheese.",
    ingredients: [
      { id: 87, name: "pasta", original: "200g penne or macaroni", amount: 200, unit: "g" },
      { id: 88, name: "cheese", original: "1/2 cup grated cheese", amount: 0.5, unit: "cup" },
      { id: 89, name: "butter", original: "2 tbsp butter", amount: 2, unit: "tbsp" },
      { id: 90, name: "milk", original: "1/2 cup milk", amount: 0.5, unit: "cup" },
      { id: 91, name: "garlic", original: "3 minced garlic cloves", amount: 3, unit: "cloves" }
    ],
    instructions: "1. Cook pasta until al dente; drain and reserve water.\n2. Melt butter in a skillet, sauté minced garlic for 1 minute.\n3. Pour in milk and warm gently; melt in the grated cheese on low heat.\n4. Toss cooked pasta into the creamy sauce until glossy and coated.\n5. Season with black pepper and chili flakes."
  },

  // --- RICE DISHES ---
  {
    id: 1017,
    title: "Golden Fragrant Jeera Rice & Garlic Tadka",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 12,
    servings: 3,
    likes: 670,
    summary: "Basmati rice tossed with crackling roasted cumin seeds, ghee, and sweet caramelized onions.",
    ingredients: [
      { id: 92, name: "rice", original: "3 cups cooked leftover basmati rice", amount: 3, unit: "cups" },
      { id: 93, name: "cumin", original: "1.5 tbsp whole cumin seeds", amount: 1.5, unit: "tbsp" },
      { id: 94, name: "ghee / butter", original: "2 tbsp ghee or butter", amount: 2, unit: "tbsp" },
      { id: 95, name: "onions", original: "1 thinly sliced onion", amount: 1, unit: "medium" },
      { id: 96, name: "garlic", original: "3 cloves garlic", amount: 3, unit: "cloves" }
    ],
    instructions: "1. Heat ghee in a pan. Add cumin seeds and let them sizzle.\n2. Add sliced onions and garlic; sauté until golden and aromatic.\n3. Add cold cooked rice and salt.\n4. Gently toss with a fork so grains stay intact.\n5. Cover for 2 minutes to steam through."
  },
  {
    id: 1018,
    title: "South Indian Comforting Curd Rice (Thayir Sadam)",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 10,
    servings: 2,
    likes: 810,
    summary: "Soothing mashed rice folded with creamy curd and tempered with mustard seeds, curry leaves, and ginger.",
    ingredients: [
      { id: 97, name: "rice", original: "2 cups soft cooked rice", amount: 2, unit: "cups" },
      { id: 98, name: "yogurt / curd", original: "1 cup thick fresh curd", amount: 1, unit: "cup" },
      { id: 99, name: "ginger", original: "1 tsp minced ginger", amount: 1, unit: "tsp" },
      { id: 100, name: "green chili", original: "1 chopped green chili", amount: 1, unit: "piece" },
      { id: 101, name: "mustard seeds", original: "1 tsp mustard seeds", amount: 1, unit: "tsp" }
    ],
    instructions: "1. Warm and slightly mash the cooked rice in a bowl.\n2. Stir in curd and a splash of milk; season with salt.\n3. Heat oil in a tadka spoon; crackle mustard seeds, green chilies, and ginger.\n4. Pour tempering over the curd rice and mix well.\n5. Serve chilled with pickle."
  },

  // --- BREAD & TOAST SNACKS ---
  {
    id: 1019,
    title: "Bombay Street Masala Cheese Toast",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 12,
    servings: 2,
    likes: 990,
    summary: "Crispy griddled sandwich stuffed with spiced potatoes, onions, tomatoes, and melting cheese.",
    ingredients: [
      { id: 102, name: "bread", original: "4 slices white or brown bread", amount: 4, unit: "slices" },
      { id: 103, name: "cheese", original: "1/2 cup grated cheese", amount: 0.5, unit: "cup" },
      { id: 104, name: "potatoes", original: "1 boiled and mashed potato", amount: 1, unit: "medium" },
      { id: 105, name: "onions", original: "1/2 sliced onion", amount: 0.5, unit: "medium" },
      { id: 106, name: "tomatoes", original: "1 sliced tomato", amount: 1, unit: "medium" },
      { id: 107, name: "butter", original: "2 tbsp butter", amount: 2, unit: "tbsp" }
    ],
    instructions: "1. Season mashed potatoes with chaat masala, turmeric, and salt.\n2. Spread potato mixture onto bread slices; top with onion, tomato, and cheese.\n3. Close sandwich and butter the outer sides generously.\n4. Toast in a hot skillet on medium heat until golden crisp on both sides.\n5. Cut into triangles and serve with ketchup."
  },
  {
    id: 1020,
    title: "Spicy Indian Masala French Toast",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80",
    cuisines: ["Indian"],
    readyInMinutes: 10,
    servings: 2,
    likes: 640,
    summary: "Savory, spiced egg-dipped bread slices pan-fried with onions, tomatoes, and coriander.",
    ingredients: [
      { id: 108, name: "bread", original: "4 slices bread", amount: 4, unit: "slices" },
      { id: 109, name: "eggs", original: "2 eggs", amount: 2, unit: "pieces" },
      { id: 110, name: "onions", original: "2 tbsp finely chopped onion", amount: 2, unit: "tbsp" },
      { id: 111, name: "tomatoes", original: "2 tbsp finely chopped tomato", amount: 2, unit: "tbsp" },
      { id: 112, name: "green chili", original: "1 chopped green chili", amount: 1, unit: "piece" },
      { id: 113, name: "butter", original: "1 tbsp butter", amount: 1, unit: "tbsp" }
    ],
    instructions: "1. Whisk eggs with chopped onions, tomatoes, chilies, turmeric, and salt.\n2. Dip bread slices into the egg mixture, coating evenly on both sides.\n3. Melt butter in a skillet; place coated bread into the pan.\n4. Cook 2-3 minutes per side until golden brown and cooked through.\n5. Serve hot with chai."
  }
];

/**
 * Intelligent Match Engine: Dynamically matches user fridge ingredients
 * against recipe database, computing exact used & missing items!
 */
export const matchRecipesFromDatabase = (ingredientsString, cuisine = 'Indian') => {
  if (!ingredientsString || ingredientsString.trim() === '') {
    return [];
  }

  // Clean and normalize user ingredients
  const userIngredients = ingredientsString
    .toLowerCase()
    .split(',')
    .map(s => s.trim().replace(/s$/, '')) // Stem simple plurals (eggs -> egg, tomatoes -> tomatoe)
    .filter(Boolean);

  const matched = [];

  for (const recipe of RECIPE_DATABASE) {
    // If specific cuisine requested (and not 'all'), check cuisine tag
    const isIndian = recipe.cuisines.includes('Indian');
    if (cuisine === 'Indian' && !isIndian) {
      continue;
    }

    const usedIngredients = [];
    const missedIngredients = [];

    // Compare each ingredient in recipe against user input
    for (const item of recipe.ingredients) {
      const itemNorm = item.name.toLowerCase().replace(/s$/, '');

      // Check if user has this ingredient
      const hasItem = userIngredients.some(u => {
        return itemNorm.includes(u) || u.includes(itemNorm) ||
               (u === 'potato' && itemNorm.includes('aloo')) ||
               (u === 'paneer' && itemNorm.includes('cottage')) ||
               (u === 'curd' && itemNorm.includes('yogurt'));
      });

      if (hasItem) {
        usedIngredients.push(item);
      } else {
        missedIngredients.push(item);
      }
    }

    // Include recipe if at least 1 ingredient matches
    if (usedIngredients.length > 0) {
      const totalCount = recipe.ingredients.length;
      const matchRatio = usedIngredients.length / totalCount;

      matched.push({
        ...recipe,
        usedIngredients,
        missedIngredients,
        usedIngredientCount: usedIngredients.length,
        missedIngredientCount: missedIngredients.length,
        matchRatio
      });
    }
  }

  // Sort by highest match % and maximum used ingredients
  matched.sort((a, b) => {
    if (b.matchRatio !== a.matchRatio) {
      return b.matchRatio - a.matchRatio;
    }
    return b.usedIngredientCount - a.usedIngredientCount;
  });

  return matched;
};
