// ===========================
// BAKING APP - Main Application
// ===========================

const app = {
    // State
    currentView: 'home',
    recipes: [],
    timers: [],
    alarms: [],
    stopwatch: {
        running: false,
        startTime: 0,
        elapsedTime: 0,
        splits: []
    },
    settings: {
        notifications: false,
        sound: true,
        theme: 'pastel'
    },
    currentScale: 1,
    currentRecipe: null,
    currentAlarm: null,
    activeAlarmId: null,

    // Dog tips
    dogTips: [
        { tip: "Room temperature ingredients mix better! Take out eggs and butter 30 minutes early.", author: "Bailey 🐶" },
        { tip: "Measure flour by spooning it into the cup, not scooping - you'll get too much!", author: "Nellie 🦮" },
        { tip: "Don't overmix! Mix just until combined for tender cakes and muffins.", author: "Bailey 🐶" },
        { tip: "Preheat your oven fully! It takes at least 10-15 minutes.", author: "Nellie 🦮" },
        { tip: "Rotate your baking pans halfway through for even browning.", author: "Bailey 🐶" },
        { tip: "Let cakes cool completely before frosting or they'll melt!", author: "Nellie 🦮" },
        { tip: "Fresh baking powder and baking soda make a huge difference - replace yearly!", author: "Bailey 🐶" },
        { tip: "Don't open the oven door too early or your cake might sink!", author: "Nellie 🦮" },
        { tip: "Sift dry ingredients for lighter, airier baked goods.", author: "Bailey 🐶" },
        { tip: "When in doubt, use an oven thermometer - many ovens run hot or cold!", author: "Nellie 🦮" }
    ],

    // Initialize app
    init() {
        console.log('🧁 Initializing Baking App...');
        this.loadData();
        this.setupEventListeners();
        this.setupNotifications();
        this.setupAudio();
        this.renderHome();
        this.startAlarmChecker();
        this.updateActiveItems();
        this.rotateDogTip();
        console.log('✅ Baking App ready!');
    },

    // ===========================
    // DATA MANAGEMENT
    // ===========================

    loadData() {
        // Load from localStorage with versioning
        const savedRecipes = localStorage.getItem('bakingapp_recipes');
        const savedSettings = localStorage.getItem('bakingapp_settings');
        const savedAlarms = localStorage.getItem('bakingapp_alarms');

        if (savedRecipes) {
            this.recipes = JSON.parse(savedRecipes);
        } else {
            // Load Simone's Classics
            this.recipes = this.getSimonesClassics();
            this.saveData();
        }

        if (savedSettings) {
            this.settings = JSON.parse(savedSettings);
            this.applySettings();
        }

        if (savedAlarms) {
            this.alarms = JSON.parse(savedAlarms);
        }
    },

    saveData() {
        localStorage.setItem('bakingapp_recipes', JSON.stringify(this.recipes));
        localStorage.setItem('bakingapp_settings', JSON.stringify(this.settings));
        localStorage.setItem('bakingapp_alarms', JSON.stringify(this.alarms));
    },

    getSimonesClassics() {
        return [
            {
                id: Date.now() + 1,
                name: "Classic Chocolate Chip Cookies",
                tags: ["cookies", "chocolate", "easy"],
                temp: "180°C / 350°F",
                time: "12-14 minutes",
                ingredients: [
                    "225g unsalted butter, softened",
                    "200g granulated sugar",
                    "165g brown sugar",
                    "2 large eggs",
                    "2 tsp vanilla extract",
                    "280g all-purpose flour",
                    "1 tsp baking soda",
                    "1 tsp salt",
                    "340g chocolate chips"
                ],
                steps: [
                    "Preheat oven to 180°C (350°F)",
                    "Cream butter and sugars until fluffy (3-4 minutes)",
                    "Beat in eggs and vanilla extract",
                    "Mix flour, baking soda, and salt in separate bowl",
                    "Gradually add dry ingredients to wet ingredients",
                    "Fold in chocolate chips",
                    "Drop rounded tablespoons onto baking sheet",
                    "Bake 12-14 minutes until golden edges",
                    "Cool on pan for 5 minutes, then transfer to wire rack"
                ],
                notes: "For chewier cookies, slightly underbake. For crispier, bake 2 minutes longer.",
                favorite: false,
                created: Date.now()
            },
            {
                id: Date.now() + 2,
                name: "Sourdough Bread",
                tags: ["bread", "sourdough", "advanced"],
                temp: "230°C / 450°F",
                time: "35-40 minutes",
                ingredients: [
                    "500g bread flour",
                    "350ml water",
                    "100g active sourdough starter",
                    "10g salt"
                ],
                steps: [
                    "Mix flour and water, let rest 30 minutes (autolyse)",
                    "Add starter and salt, mix until combined",
                    "Bulk fermentation: 4-6 hours with stretch and folds every 30 min (first 2 hours)",
                    "Pre-shape into round, rest 30 minutes",
                    "Final shape and place in banneton seam-side up",
                    "Cold proof in fridge 8-12 hours or overnight",
                    "Preheat Dutch oven at 230°C for 30 minutes",
                    "Score bread and place in hot Dutch oven",
                    "Bake covered 20 minutes, then uncovered 15-20 minutes until deep golden",
                    "Cool completely on wire rack before slicing"
                ],
                notes: "Timing depends on room temperature. Watch the dough, not the clock!",
                favorite: true,
                created: Date.now()
            },
            {
                id: Date.now() + 3,
                name: "Vanilla Birthday Cake",
                tags: ["cake", "vanilla", "celebration"],
                temp: "175°C / 350°F",
                time: "25-30 minutes",
                ingredients: [
                    "280g all-purpose flour",
                    "2 tsp baking powder",
                    "1/2 tsp salt",
                    "170g unsalted butter, softened",
                    "300g granulated sugar",
                    "3 large eggs",
                    "2 tsp vanilla extract",
                    "240ml whole milk"
                ],
                steps: [
                    "Preheat oven to 175°C (350°F). Grease and flour two 9-inch round pans",
                    "Whisk flour, baking powder, and salt together",
                    "Cream butter and sugar until light and fluffy (5 minutes)",
                    "Add eggs one at a time, beating well after each",
                    "Mix in vanilla extract",
                    "Alternately add flour mixture and milk in three additions",
                    "Divide batter between pans",
                    "Bake 25-30 minutes until toothpick comes out clean",
                    "Cool in pans 10 minutes, then turn out onto wire racks",
                    "Cool completely before frosting"
                ],
                notes: "For best results, use room temperature ingredients. Frost with buttercream!",
                favorite: true,
                created: Date.now()
            },
            {
                id: Date.now() + 4,
                name: "Flaky Croissants",
                tags: ["pastry", "french", "advanced"],
                temp: "200°C / 400°F",
                time: "15-18 minutes",
                ingredients: [
                    "500g all-purpose flour",
                    "10g salt",
                    "80g sugar",
                    "10g instant yeast",
                    "300ml whole milk",
                    "250g cold butter for lamination",
                    "1 egg for egg wash"
                ],
                steps: [
                    "Make dough: mix flour, salt, sugar, yeast, and milk. Knead 5 minutes",
                    "Rest dough in fridge 1 hour",
                    "Roll dough into rectangle. Place cold butter slab in center",
                    "Fold dough over butter (letter fold). Roll out and fold 2 more times",
                    "Chill 30 minutes between each fold",
                    "After final fold, chill 2 hours or overnight",
                    "Roll dough 5mm thick. Cut into triangles",
                    "Roll each triangle from wide end to point",
                    "Proof 2 hours until puffy",
                    "Brush with egg wash",
                    "Bake at 200°C for 15-18 minutes until golden brown"
                ],
                notes: "Keep butter cold! Work quickly and chill between steps. This is a 2-day project.",
                favorite: false,
                created: Date.now()
            },
            {
                id: Date.now() + 5,
                name: "Blueberry Muffins",
                tags: ["muffins", "breakfast", "easy"],
                temp: "190°C / 375°F",
                time: "20-25 minutes",
                ingredients: [
                    "250g all-purpose flour",
                    "150g granulated sugar",
                    "2 tsp baking powder",
                    "1/2 tsp salt",
                    "1 large egg",
                    "240ml milk",
                    "80ml vegetable oil",
                    "1 tsp vanilla extract",
                    "200g fresh or frozen blueberries"
                ],
                steps: [
                    "Preheat oven to 190°C (375°F). Line muffin tin with papers",
                    "Mix flour, sugar, baking powder, and salt",
                    "In separate bowl, whisk egg, milk, oil, and vanilla",
                    "Pour wet into dry ingredients. Stir until JUST combined (lumpy is ok!)",
                    "Gently fold in blueberries",
                    "Fill muffin cups 3/4 full",
                    "Optional: sprinkle tops with coarse sugar",
                    "Bake 20-25 minutes until golden and toothpick comes out clean",
                    "Cool 5 minutes in pan, then transfer to wire rack"
                ],
                notes: "Don't overmix or muffins will be tough! Toss frozen berries in flour to prevent sinking.",
                favorite: true,
                created: Date.now()
            },
            {
                id: Date.now() + 6,
                name: "Brownies (Fudgy)",
                tags: ["brownies", "chocolate", "easy"],
                temp: "175°C / 350°F",
                time: "25-30 minutes",
                ingredients: [
                    "170g unsalted butter",
                    "200g dark chocolate, chopped",
                    "250g granulated sugar",
                    "3 large eggs",
                    "1 tsp vanilla extract",
                    "95g all-purpose flour",
                    "30g cocoa powder",
                    "1/2 tsp salt"
                ],
                steps: [
                    "Preheat oven to 175°C (350°F). Line 9x9 pan with parchment",
                    "Melt butter and chocolate together (microwave or double boiler)",
                    "Whisk in sugar until combined",
                    "Add eggs one at a time, whisking well",
                    "Stir in vanilla",
                    "Gently fold in flour, cocoa powder, and salt",
                    "Pour into prepared pan",
                    "Bake 25-30 minutes (toothpick should have moist crumbs, not wet batter)",
                    "Cool completely before cutting"
                ],
                notes: "For extra fudgy, slightly underbake. They'll firm up as they cool!",
                favorite: true,
                created: Date.now()
            },
            {
                id: Date.now() + 7,
                name: "Cinnamon Rolls",
                tags: ["bread", "breakfast", "intermediate"],
                temp: "180°C / 350°F",
                time: "20-25 minutes",
                ingredients: [
                    "480g all-purpose flour",
                    "50g granulated sugar",
                    "7g instant yeast",
                    "1/2 tsp salt",
                    "240ml warm milk",
                    "60g butter, melted",
                    "1 large egg",
                    "Filling: 100g brown sugar, 2 tbsp cinnamon, 50g softened butter",
                    "Frosting: 120g cream cheese, 60g butter, 200g powdered sugar, 1 tsp vanilla"
                ],
                steps: [
                    "Mix flour, sugar, yeast, and salt",
                    "Add warm milk, melted butter, and egg. Knead 5-7 minutes",
                    "First rise: cover and let rise 1 hour until doubled",
                    "Roll dough into 40x30cm rectangle",
                    "Spread softened butter, then sprinkle cinnamon-sugar filling",
                    "Roll up tightly from long edge. Cut into 12 rolls",
                    "Place in greased 9x13 pan. Second rise 45 minutes",
                    "Bake at 180°C for 20-25 minutes until golden",
                    "Cool slightly. Make frosting and spread while warm"
                ],
                notes: "Make ahead: after cutting, refrigerate overnight. Bring to room temp before baking.",
                favorite: true,
                created: Date.now()
            },
            {
                id: Date.now() + 8,
                name: "Lemon Bars",
                tags: ["bars", "lemon", "easy"],
                temp: "175°C / 350°F",
                time: "45-50 minutes total",
                ingredients: [
                    "Crust: 200g all-purpose flour, 50g powdered sugar, 170g cold butter",
                    "Filling: 4 large eggs, 300g granulated sugar, 60g all-purpose flour",
                    "120ml fresh lemon juice (about 4 lemons)",
                    "Zest of 2 lemons",
                    "Powdered sugar for dusting"
                ],
                steps: [
                    "Preheat oven to 175°C (350°F). Line 9x13 pan with parchment",
                    "Crust: mix flour and powdered sugar. Cut in cold butter until crumbly",
                    "Press into pan. Bake 15-20 minutes until lightly golden",
                    "Filling: whisk eggs, sugar, flour, lemon juice, and zest",
                    "Pour over hot crust",
                    "Bake 20-25 minutes until set (shouldn't jiggle)",
                    "Cool completely at room temperature",
                    "Refrigerate 2 hours before cutting",
                    "Dust with powdered sugar before serving"
                ],
                notes: "Use fresh lemon juice for best flavor! Cut with a hot, wet knife for clean edges.",
                favorite: false,
                created: Date.now()
            },
            {
                id: Date.now() + 9,
                name: "Pizza Dough",
                tags: ["bread", "savory", "easy"],
                temp: "250°C / 475°F",
                time: "12-15 minutes",
                ingredients: [
                    "500g all-purpose flour or bread flour",
                    "7g instant yeast",
                    "10g salt",
                    "10g sugar",
                    "30ml olive oil",
                    "320ml warm water"
                ],
                steps: [
                    "Mix flour, yeast, salt, and sugar",
                    "Add olive oil and warm water",
                    "Knead 8-10 minutes until smooth and elastic",
                    "Place in oiled bowl, cover, rise 1-2 hours until doubled",
                    "Divide into 2-3 portions for pizzas",
                    "Shape into balls, rest 15 minutes",
                    "Stretch or roll to desired thickness",
                    "Add toppings",
                    "Bake at 250°C on preheated pizza stone or baking sheet for 12-15 minutes"
                ],
                notes: "For crispy crust, preheat oven and pan thoroughly. Can refrigerate dough 24-72 hours for better flavor!",
                favorite: false,
                created: Date.now()
            },
            {
                id: Date.now() + 10,
                name: "Apple Pie",
                tags: ["pie", "fruit", "intermediate"],
                temp: "220°C / 425°F then 190°C / 375°F",
                time: "45-55 minutes",
                ingredients: [
                    "Crust: 2 store-bought or homemade pie crusts",
                    "Filling: 7-8 medium apples, peeled and sliced",
                    "150g granulated sugar",
                    "30g all-purpose flour",
                    "1 tsp cinnamon",
                    "1/4 tsp nutmeg",
                    "1/4 tsp salt",
                    "1 tbsp lemon juice",
                    "2 tbsp butter",
                    "1 egg for egg wash"
                ],
                steps: [
                    "Line 9-inch pie pan with first crust",
                    "Mix apples, sugar, flour, cinnamon, nutmeg, salt, and lemon juice",
                    "Pour filling into crust. Dot with butter",
                    "Cover with second crust. Seal and crimp edges",
                    "Cut vents in top crust. Brush with egg wash",
                    "Bake at 220°C for 20 minutes",
                    "Reduce to 190°C and bake 35-45 minutes more until golden",
                    "If edges brown too quickly, cover with foil",
                    "Cool at least 2 hours before slicing"
                ],
                notes: "Use a mix of tart and sweet apples (Granny Smith + Honeycrisp). Serve with vanilla ice cream!",
                favorite: true,
                created: Date.now()
            },
            {
                id: Date.now() + 11,
                name: "Banana Bread",
                tags: ["bread", "easy", "breakfast"],
                temp: "175°C / 350°F",
                time: "60-70 minutes",
                ingredients: [
                    "3 ripe bananas, mashed (about 1.5 cups)",
                    "80ml melted butter",
                    "150g granulated sugar",
                    "1 large egg, beaten",
                    "1 tsp vanilla extract",
                    "1 tsp baking soda",
                    "Pinch of salt",
                    "190g all-purpose flour",
                    "Optional: 100g chocolate chips or walnuts"
                ],
                steps: [
                    "Preheat oven to 175°C (350°F). Grease 9x5 loaf pan",
                    "Mash bananas in large bowl",
                    "Mix in melted butter",
                    "Stir in sugar, egg, and vanilla",
                    "Sprinkle baking soda and salt over mixture, mix in",
                    "Add flour, stir until just combined",
                    "Fold in chocolate chips or nuts if using",
                    "Pour into prepared loaf pan",
                    "Bake 60-70 minutes until toothpick comes out clean",
                    "Cool in pan 10 minutes, then turn out onto wire rack"
                ],
                notes: "The riper the bananas, the better! Brown bananas = more flavor. Freezes beautifully.",
                favorite: true,
                created: Date.now()
            },
            {
                id: Date.now() + 12,
                name: "Sugar Cookies (Cut-Out)",
                tags: ["cookies", "decorated", "intermediate"],
                temp: "175°C / 350°F",
                time: "8-10 minutes",
                ingredients: [
                    "280g all-purpose flour",
                    "1/2 tsp baking powder",
                    "1/4 tsp salt",
                    "170g unsalted butter, softened",
                    "200g granulated sugar",
                    "1 large egg",
                    "1 tsp vanilla extract",
                    "Royal icing for decorating"
                ],
                steps: [
                    "Whisk flour, baking powder, and salt",
                    "Cream butter and sugar until fluffy",
                    "Beat in egg and vanilla",
                    "Gradually mix in dry ingredients",
                    "Divide dough in half, flatten into discs, wrap in plastic",
                    "Chill at least 2 hours or overnight",
                    "Roll dough 6mm thick on floured surface",
                    "Cut shapes, place on baking sheet",
                    "Bake at 175°C for 8-10 minutes (don't brown!)",
                    "Cool completely before decorating"
                ],
                notes: "Chill cut shapes before baking to prevent spreading. Decorate with royal icing!",
                favorite: false,
                created: Date.now()
            }
        ];
    },

    // ===========================
    // NAVIGATION
    // ===========================

    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });

        // Tag filters
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterRecipes(e.target.dataset.tag);
            });
        });

        // Alarm repeat selector
        const alarmRepeat = document.getElementById('alarm-repeat');
        if (alarmRepeat) {
            alarmRepeat.addEventListener('change', (e) => {
                const customDays = document.getElementById('alarm-custom-days');
                if (e.target.value === 'custom') {
                    customDays.style.display = 'block';
                } else {
                    customDays.style.display = 'none';
                }
            });
        }
    },

    switchView(viewName) {
        this.currentView = viewName;

        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === viewName) {
                btn.classList.add('active');
            }
        });

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}-view`).classList.add('active');

        // Render view content
        switch(viewName) {
            case 'home':
                this.renderHome();
                break;
            case 'recipes':
                this.renderRecipes();
                break;
            case 'timers':
                this.renderTimers();
                break;
            case 'stopwatch':
                this.renderStopwatch();
                break;
            case 'alarms':
                this.renderAlarms();
                break;
            case 'helpers':
                this.renderHelpers();
                break;
            case 'settings':
                this.renderSettings();
                break;
        }
    },

    // ===========================
    // HOME VIEW
    // ===========================

    renderHome() {
        this.rotateDogTip();
        this.updateActiveItems();
    },

    rotateDogTip() {
        const randomTip = this.dogTips[Math.floor(Math.random() * this.dogTips.length)];
        document.getElementById('dog-tip').textContent = randomTip.tip;
        document.getElementById('tip-author').textContent = `— ${randomTip.author}`;
    },

    updateActiveItems() {
        const container = document.getElementById('home-active-list');
        const activeTimers = this.timers.filter(t => t.running);
        const activeAlarms = this.alarms.filter(a => a.enabled);

        if (activeTimers.length === 0 && activeAlarms.length === 0) {
            container.innerHTML = '<p class="empty-state">No active timers or alarms</p>';
            return;
        }

        let html = '';
        activeTimers.forEach(timer => {
            const remaining = Math.max(0, timer.targetTime - Date.now());
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            html += `
                <div class="timer-card running" style="margin-bottom: 10px;">
                    <div>⏱️ ${timer.label}</div>
                    <div style="font-weight: bold; color: var(--primary);">${minutes}:${seconds.toString().padStart(2, '0')}</div>
                </div>
            `;
        });

        activeAlarms.forEach(alarm => {
            html += `
                <div class="alarm-card active" style="margin-bottom: 10px;">
                    <div>⏰ ${alarm.label || 'Alarm'}</div>
                    <div style="font-weight: bold;">${alarm.time} - ${alarm.repeat}</div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    quickAction(type, minutes) {
        if (type === 'timer') {
            this.addTimerPreset(minutes, this.getPresetLabel(minutes));
            this.switchView('timers');
        }
    },

    getPresetLabel(minutes) {
        const labels = {
            10: 'Preheat Oven',
            30: 'Take Butter Out',
            8: 'Check Cookies',
            45: 'Bread Proofing',
            20: 'Cake Cooldown'
        };
        return labels[minutes] || `${minutes} minute timer`;
    },

    // ===========================
    // RECIPES
    // ===========================

    renderRecipes() {
        this.filterRecipes('all');
    },

    searchRecipes() {
        const query = document.getElementById('recipe-search').value.toLowerCase();
        const activeTag = document.querySelector('.tag-btn.active').dataset.tag;

        let filtered = this.recipes;

        // Filter by tag
        if (activeTag !== 'all') {
            if (activeTag === 'favorites') {
                filtered = filtered.filter(r => r.favorite);
            } else {
                filtered = filtered.filter(r => r.tags.includes(activeTag));
            }
        }

        // Filter by search
        if (query) {
            filtered = filtered.filter(r =>
                r.name.toLowerCase().includes(query) ||
                r.tags.some(t => t.toLowerCase().includes(query)) ||
                r.ingredients.some(i => i.toLowerCase().includes(query))
            );
        }

        this.displayRecipes(filtered);
    },

    filterRecipes(tag) {
        document.getElementById('recipe-search').value = '';
        this.searchRecipes();
    },

    displayRecipes(recipes) {
        const container = document.getElementById('recipes-list');

        if (recipes.length === 0) {
            container.innerHTML = '<p class="empty-state">No recipes found</p>';
            return;
        }

        container.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" onclick="app.viewRecipe(${recipe.id})">
                <h3>
                    ${recipe.name}
                    ${recipe.favorite ? '<span style="color: gold;">⭐</span>' : ''}
                </h3>
                <div class="recipe-tags">
                    ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
                </div>
                ${recipe.temp ? `<div class="recipe-meta">🌡️ ${recipe.temp}</div>` : ''}
                ${recipe.time ? `<div class="recipe-meta">⏱️ ${recipe.time}</div>` : ''}
                <div class="recipe-actions">
                    <button class="icon-btn" onclick="event.stopPropagation(); app.toggleFavorite(${recipe.id})" title="Favorite">
                        ${recipe.favorite ? '⭐' : '☆'}
                    </button>
                    <button class="icon-btn" onclick="event.stopPropagation(); app.editRecipe(${recipe.id})" title="Edit">
                        ✏️
                    </button>
                    <button class="icon-btn" onclick="event.stopPropagation(); app.deleteRecipe(${recipe.id})" title="Delete">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    },

    viewRecipe(id) {
        const recipe = this.recipes.find(r => r.id === id);
        if (!recipe) return;

        this.currentRecipe = recipe;
        this.currentScale = 1;

        const modal = document.getElementById('recipe-detail-modal');
        const detail = document.getElementById('recipe-detail');

        detail.innerHTML = `
            <div class="recipe-detail-header">
                <div class="recipe-detail-title">
                    <h2>${recipe.name} ${recipe.favorite ? '⭐' : ''}</h2>
                    <div class="recipe-tags">
                        ${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="recipe-detail-actions">
                    <button class="btn btn-secondary" onclick="app.generateShoppingList([${recipe.id}])">
                        🛒 Shopping List
                    </button>
                </div>
            </div>

            ${recipe.temp ? `<p><strong>🌡️ Temperature:</strong> ${recipe.temp}</p>` : ''}
            ${recipe.time ? `<p><strong>⏱️ Time:</strong> ${recipe.time}</p>` : ''}

            <div class="scale-buttons">
                <h3>Scale Recipe:</h3>
                <button class="scale-btn ${this.currentScale === 0.5 ? 'active' : ''}" onclick="app.scaleRecipe(0.5)">0.5×</button>
                <button class="scale-btn ${this.currentScale === 1 ? 'active' : ''}" onclick="app.scaleRecipe(1)">1×</button>
                <button class="scale-btn ${this.currentScale === 2 ? 'active' : ''}" onclick="app.scaleRecipe(2)">2×</button>
                <button class="scale-btn ${this.currentScale === 3 ? 'active' : ''}" onclick="app.scaleRecipe(3)">3×</button>
            </div>

            <div class="ingredients-list">
                <h3>📝 Ingredients</h3>
                <ul id="scaled-ingredients">
                    ${this.getScaledIngredients(recipe, this.currentScale).map(ing =>
                        `<li>${ing}</li>`
                    ).join('')}
                </ul>
            </div>

            <div class="steps-list">
                <h3>👩‍🍳 Steps</h3>
                <ol>
                    ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>

            ${recipe.notes ? `
                <div class="helper-note">
                    <strong>📌 Notes:</strong> ${recipe.notes}
                </div>
            ` : ''}
        `;

        modal.classList.add('show');
    },

    scaleRecipe(scale) {
        this.currentScale = scale;
        this.viewRecipe(this.currentRecipe.id);
    },

    getScaledIngredients(recipe, scale) {
        return recipe.ingredients.map(ing => {
            if (scale === 1) return ing;

            // Try to scale numeric quantities
            const match = ing.match(/^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)?\s+(.+)$/);
            if (match) {
                const amount = parseFloat(match[1]);
                const unit = match[2] || '';
                const ingredient = match[3];
                const scaledAmount = amount * scale;

                // Format nicely
                let displayAmount = scaledAmount;
                if (scaledAmount % 1 !== 0) {
                    displayAmount = scaledAmount.toFixed(1);
                }

                return `${displayAmount}${unit ? ' ' + unit : ''} ${ingredient}`;
            }

            // If no number found, append note
            return `${ing} (scale manually: ${scale}×)`;
        });
    },

    closeRecipeDetail() {
        document.getElementById('recipe-detail-modal').classList.remove('show');
    },

    showAddRecipe() {
        document.getElementById('recipe-form-title').textContent = 'Add New Recipe';
        document.getElementById('recipe-form').reset();
        document.getElementById('recipe-id').value = '';
        document.getElementById('recipe-form-modal').classList.add('show');
    },

    editRecipe(id) {
        const recipe = this.recipes.find(r => r.id === id);
        if (!recipe) return;

        document.getElementById('recipe-form-title').textContent = 'Edit Recipe';
        document.getElementById('recipe-id').value = recipe.id;
        document.getElementById('recipe-name').value = recipe.name;
        document.getElementById('recipe-tags').value = recipe.tags.join(', ');
        document.getElementById('recipe-temp').value = recipe.temp || '';
        document.getElementById('recipe-time').value = recipe.time || '';
        document.getElementById('recipe-ingredients').value = recipe.ingredients.join('\n');
        document.getElementById('recipe-steps').value = recipe.steps.join('\n');
        document.getElementById('recipe-notes').value = recipe.notes || '';

        document.getElementById('recipe-form-modal').classList.add('show');
    },

    saveRecipe(event) {
        event.preventDefault();

        const id = document.getElementById('recipe-id').value;
        const recipeData = {
            id: id ? parseInt(id) : Date.now(),
            name: document.getElementById('recipe-name').value,
            tags: document.getElementById('recipe-tags').value.split(',').map(t => t.trim()).filter(t => t),
            temp: document.getElementById('recipe-temp').value,
            time: document.getElementById('recipe-time').value,
            ingredients: document.getElementById('recipe-ingredients').value.split('\n').filter(i => i.trim()),
            steps: document.getElementById('recipe-steps').value.split('\n').filter(s => s.trim()),
            notes: document.getElementById('recipe-notes').value,
            favorite: false,
            created: Date.now()
        };

        if (id) {
            // Update existing
            const index = this.recipes.findIndex(r => r.id === parseInt(id));
            if (index !== -1) {
                recipeData.favorite = this.recipes[index].favorite;
                this.recipes[index] = recipeData;
            }
        } else {
            // Add new
            this.recipes.push(recipeData);
        }

        this.saveData();
        this.closeRecipeForm();
        this.renderRecipes();
    },

    closeRecipeForm() {
        document.getElementById('recipe-form-modal').classList.remove('show');
    },

    deleteRecipe(id) {
        if (!confirm('Delete this recipe? This cannot be undone.')) return;

        this.recipes = this.recipes.filter(r => r.id !== id);
        this.saveData();
        this.renderRecipes();
    },

    toggleFavorite(id) {
        const recipe = this.recipes.find(r => r.id === id);
        if (recipe) {
            recipe.favorite = !recipe.favorite;
            this.saveData();
            this.renderRecipes();
        }
    },

    generateShoppingList(recipeIds) {
        const recipes = this.recipes.filter(r => recipeIds.includes(r.id));

        const modal = document.getElementById('shopping-list-modal');
        const content = document.getElementById('shopping-list-content');

        let html = '<div class="ingredients-list"><ul>';

        recipes.forEach(recipe => {
            html += `<li><strong>${recipe.name}</strong></li>`;
            recipe.ingredients.forEach(ing => {
                html += `<li style="margin-left: 20px;">☐ ${ing}</li>`;
            });
        });

        html += '</ul></div>';
        content.innerHTML = html;
        modal.classList.add('show');
    },

    closeShoppingList() {
        document.getElementById('shopping-list-modal').classList.remove('show');
    },

    copyShoppingList() {
        const content = document.getElementById('shopping-list-content').innerText;
        navigator.clipboard.writeText(content).then(() => {
            alert('✅ Shopping list copied to clipboard!');
        });
    },

    // ===========================
    // TIMERS
    // ===========================

    renderTimers() {
        const container = document.getElementById('timers-list');

        if (this.timers.length === 0) {
            container.innerHTML = '<p class="empty-state">No timers. Add one or use a preset!</p>';
            return;
        }

        container.innerHTML = this.timers.map((timer, index) => {
            const remaining = timer.running ? Math.max(0, timer.targetTime - Date.now()) : timer.duration * 60000;
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);

            return `
                <div class="timer-card ${timer.running ? 'running' : ''}">
                    <div class="timer-header">
                        <div class="timer-label">${timer.label}</div>
                        <button class="icon-btn" onclick="app.removeTimer(${index})">🗑️</button>
                    </div>
                    <div class="timer-display">${minutes}:${seconds.toString().padStart(2, '0')}</div>
                    <div class="timer-controls">
                        ${!timer.running ?
                            `<button class="btn btn-primary" onclick="app.startTimer(${index})">Start</button>` :
                            `<button class="btn btn-secondary" onclick="app.pauseTimer(${index})">Pause</button>`
                        }
                        <button class="btn btn-secondary" onclick="app.resetTimer(${index})">Reset</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    addTimer() {
        const minutes = prompt('Timer duration in minutes:', '10');
        if (!minutes || isNaN(minutes)) return;

        const label = prompt('Timer label (optional):', `${minutes} min timer`);

        this.timers.push({
            label: label || `${minutes} min timer`,
            duration: parseInt(minutes),
            running: false,
            targetTime: 0
        });

        this.renderTimers();
    },

    addTimerPreset(minutes, label) {
        this.timers.push({
            label,
            duration: minutes,
            running: false,
            targetTime: 0
        });

        this.renderTimers();
    },

    startTimer(index) {
        const timer = this.timers[index];
        timer.running = true;
        timer.targetTime = Date.now() + (timer.duration * 60000);

        this.renderTimers();
        this.updateActiveItems();

        // Update every second
        timer.interval = setInterval(() => {
            const remaining = timer.targetTime - Date.now();

            if (remaining <= 0) {
                this.timerComplete(index);
            } else {
                this.renderTimers();
                this.updateActiveItems();
            }
        }, 1000);
    },

    pauseTimer(index) {
        const timer = this.timers[index];
        const remaining = Math.max(0, timer.targetTime - Date.now());

        timer.running = false;
        timer.duration = Math.ceil(remaining / 60000);
        clearInterval(timer.interval);

        this.renderTimers();
        this.updateActiveItems();
    },

    resetTimer(index) {
        const timer = this.timers[index];
        timer.running = false;
        clearInterval(timer.interval);

        // Reset to original duration (stored in label if available)
        const match = timer.label.match(/(\d+)\s*min/);
        if (match) {
            timer.duration = parseInt(match[1]);
        }

        this.renderTimers();
        this.updateActiveItems();
    },

    removeTimer(index) {
        clearInterval(this.timers[index].interval);
        this.timers.splice(index, 1);
        this.renderTimers();
        this.updateActiveItems();
    },

    timerComplete(index) {
        const timer = this.timers[index];
        clearInterval(timer.interval);
        timer.running = false;

        this.showTimerComplete(timer.label);
        this.playAlert();
        this.showNotification('Timer Complete!', timer.label);

        this.renderTimers();
        this.updateActiveItems();
    },

    showTimerComplete(label) {
        const modal = document.getElementById('timer-complete-modal');
        document.getElementById('timer-complete-message').textContent = `"${label}" is done!`;
        modal.classList.add('show');
    },

    closeTimerComplete() {
        document.getElementById('timer-complete-modal').classList.remove('show');
    },

    // ===========================
    // STOPWATCH
    // ===========================

    renderStopwatch() {
        this.updateStopwatchDisplay();
        this.renderSplits();
    },

    updateStopwatchDisplay() {
        const display = document.getElementById('stopwatch-time');
        const totalMs = this.stopwatch.running
            ? this.stopwatch.elapsedTime + (Date.now() - this.stopwatch.startTime)
            : this.stopwatch.elapsedTime;

        const hours = Math.floor(totalMs / 3600000);
        const minutes = Math.floor((totalMs % 3600000) / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const tenths = Math.floor((totalMs % 1000) / 100);

        display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${tenths}`;
    },

    startStopwatch() {
        if (!this.stopwatch.running) {
            this.stopwatch.running = true;
            this.stopwatch.startTime = Date.now();

            document.getElementById('stopwatch-start').textContent = 'Pause';
            document.getElementById('stopwatch-split').disabled = false;

            this.stopwatch.interval = setInterval(() => {
                this.updateStopwatchDisplay();
            }, 100);
        } else {
            // Pause
            this.stopwatch.running = false;
            this.stopwatch.elapsedTime += Date.now() - this.stopwatch.startTime;
            clearInterval(this.stopwatch.interval);

            document.getElementById('stopwatch-start').textContent = 'Resume';
        }
    },

    splitStopwatch() {
        const totalMs = this.stopwatch.elapsedTime + (Date.now() - this.stopwatch.startTime);
        this.stopwatch.splits.push({
            number: this.stopwatch.splits.length + 1,
            time: totalMs
        });
        this.renderSplits();
    },

    resetStopwatch() {
        this.stopwatch.running = false;
        this.stopwatch.startTime = 0;
        this.stopwatch.elapsedTime = 0;
        this.stopwatch.splits = [];
        clearInterval(this.stopwatch.interval);

        document.getElementById('stopwatch-start').textContent = 'Start';
        document.getElementById('stopwatch-split').disabled = true;

        this.updateStopwatchDisplay();
        this.renderSplits();
    },

    renderSplits() {
        const container = document.getElementById('splits-list');
        const copyBtn = document.getElementById('copy-splits-btn');

        if (this.stopwatch.splits.length === 0) {
            container.innerHTML = '<p class="empty-state">No splits yet</p>';
            copyBtn.disabled = true;
            return;
        }

        copyBtn.disabled = false;

        container.innerHTML = this.stopwatch.splits.map(split => {
            const hours = Math.floor(split.time / 3600000);
            const minutes = Math.floor((split.time % 3600000) / 60000);
            const seconds = Math.floor((split.time % 60000) / 1000);
            const tenths = Math.floor((split.time % 1000) / 100);

            return `
                <div class="split-item">
                    <span class="split-number">Split ${split.number}</span>
                    <span>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${tenths}</span>
                </div>
            `;
        }).join('');
    },

    copySplits() {
        const text = this.stopwatch.splits.map(split => {
            const hours = Math.floor(split.time / 3600000);
            const minutes = Math.floor((split.time % 3600000) / 60000);
            const seconds = Math.floor((split.time % 60000) / 1000);
            const tenths = Math.floor((split.time % 1000) / 100);
            return `Split ${split.number}: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${tenths}`;
        }).join('\n');

        navigator.clipboard.writeText(text).then(() => {
            alert('✅ Splits copied to clipboard!');
        });
    },

    // ===========================
    // ALARMS
    // ===========================

    renderAlarms() {
        const container = document.getElementById('alarms-list');

        if (this.alarms.length === 0) {
            container.innerHTML = '<p class="empty-state">No alarms. Add one or use a preset!</p>';
            return;
        }

        container.innerHTML = this.alarms.map((alarm, index) => `
            <div class="alarm-card ${alarm.enabled ? 'active' : ''}">
                <div class="alarm-header">
                    <div class="alarm-label">
                        <div style="font-size: 1.5rem; font-weight: bold;">${alarm.time}</div>
                        <div>${alarm.label || 'Alarm'}</div>
                        <div style="font-size: 0.9rem; color: var(--text-light);">${this.getRepeatText(alarm)}</div>
                    </div>
                    <label style="cursor: pointer;">
                        <input type="checkbox" ${alarm.enabled ? 'checked' : ''}
                               onchange="app.toggleAlarm(${index})"
                               style="width: 30px; height: 30px;">
                    </label>
                </div>
                <div class="alarm-controls">
                    <button class="btn btn-secondary btn-small" onclick="app.editAlarm(${index})">Edit</button>
                    <button class="btn btn-danger btn-small" onclick="app.deleteAlarm(${index})">Delete</button>
                </div>
            </div>
        `).join('');
    },

    getRepeatText(alarm) {
        if (alarm.repeat === 'once') return 'Once';
        if (alarm.repeat === 'daily') return 'Every day';
        if (alarm.repeat === 'weekdays') return 'Weekdays';
        if (alarm.repeat === 'weekends') return 'Weekends';
        if (alarm.repeat === 'custom' && alarm.days) {
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return alarm.days.map(d => dayNames[d]).join(', ');
        }
        return alarm.repeat;
    },

    showAddAlarm() {
        document.getElementById('alarm-form-title').textContent = 'Add Alarm';
        document.getElementById('alarm-form').reset();
        document.getElementById('alarm-id').value = '';
        document.getElementById('alarm-custom-days').style.display = 'none';
        document.getElementById('alarm-form-modal').classList.add('show');
    },

    editAlarm(index) {
        const alarm = this.alarms[index];

        document.getElementById('alarm-form-title').textContent = 'Edit Alarm';
        document.getElementById('alarm-id').value = index;
        document.getElementById('alarm-time').value = alarm.time;
        document.getElementById('alarm-label').value = alarm.label || '';
        document.getElementById('alarm-repeat').value = alarm.repeat;

        if (alarm.repeat === 'custom') {
            document.getElementById('alarm-custom-days').style.display = 'block';
            document.querySelectorAll('#alarm-custom-days input[type="checkbox"]').forEach(cb => {
                cb.checked = alarm.days.includes(parseInt(cb.value));
            });
        }

        document.getElementById('alarm-form-modal').classList.add('show');
    },

    saveAlarm(event) {
        event.preventDefault();

        const index = document.getElementById('alarm-id').value;
        const repeat = document.getElementById('alarm-repeat').value;

        let days = [];
        if (repeat === 'custom') {
            days = Array.from(document.querySelectorAll('#alarm-custom-days input[type="checkbox"]:checked'))
                .map(cb => parseInt(cb.value));
        } else if (repeat === 'weekdays') {
            days = [1, 2, 3, 4, 5];
        } else if (repeat === 'weekends') {
            days = [0, 6];
        } else if (repeat === 'daily') {
            days = [0, 1, 2, 3, 4, 5, 6];
        }

        const alarmData = {
            time: document.getElementById('alarm-time').value,
            label: document.getElementById('alarm-label').value,
            repeat,
            days,
            enabled: true,
            created: Date.now()
        };

        if (index !== '') {
            // Update existing
            this.alarms[parseInt(index)] = alarmData;
        } else {
            // Add new
            this.alarms.push(alarmData);
        }

        this.saveData();
        this.closeAlarmForm();
        this.renderAlarms();
    },

    closeAlarmForm() {
        document.getElementById('alarm-form-modal').classList.remove('show');
    },

    toggleAlarm(index) {
        this.alarms[index].enabled = !this.alarms[index].enabled;
        this.saveData();
        this.renderAlarms();
        this.updateActiveItems();
    },

    deleteAlarm(index) {
        if (!confirm('Delete this alarm?')) return;
        this.alarms.splice(index, 1);
        this.saveData();
        this.renderAlarms();
        this.updateActiveItems();
    },

    addAlarmPreset(minutes, label) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        this.alarms.push({
            time,
            label,
            repeat: 'once',
            days: [],
            enabled: true,
            created: Date.now()
        });

        this.saveData();
        this.renderAlarms();
        this.updateActiveItems();
    },

    startAlarmChecker() {
        setInterval(() => {
            this.checkAlarms();
        }, 30000); // Check every 30 seconds
    },

    checkAlarms() {
        const now = new Date();
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        const currentDay = now.getDay();

        this.alarms.forEach((alarm, index) => {
            if (!alarm.enabled) return;
            if (alarm.time !== currentTime) return;

            // Check if alarm should trigger today
            let shouldTrigger = false;
            if (alarm.repeat === 'once') {
                shouldTrigger = true;
                // Disable after trigger
                alarm.enabled = false;
            } else if (alarm.repeat === 'daily') {
                shouldTrigger = true;
            } else if (alarm.days.includes(currentDay)) {
                shouldTrigger = true;
            }

            if (shouldTrigger) {
                this.triggerAlarm(alarm, index);
            }
        });

        this.saveData();
    },

    triggerAlarm(alarm, index) {
        this.activeAlarmId = index;
        this.playAlert();
        this.showNotification('⏰ Alarm!', alarm.label || 'Alarm');

        const modal = document.getElementById('alarm-trigger-modal');
        document.getElementById('alarm-trigger-message').textContent = alarm.label || 'Alarm!';
        modal.classList.add('show');
    },

    dismissAlarm() {
        document.getElementById('alarm-trigger-modal').classList.remove('show');
        this.activeAlarmId = null;
        this.renderAlarms();
    },

    snoozeAlarm(minutes) {
        if (this.activeAlarmId === null) return;

        const alarm = this.alarms[this.activeAlarmId];
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        const newTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Create new one-time alarm
        this.alarms.push({
            time: newTime,
            label: `${alarm.label} (snoozed)`,
            repeat: 'once',
            days: [],
            enabled: true,
            created: Date.now()
        });

        this.saveData();
        this.dismissAlarm();
    },

    // ===========================
    // HELPERS
    // ===========================

    renderHelpers() {
        // Already rendered in HTML
    },

    convertUnits() {
        const value = parseFloat(document.getElementById('convert-value').value);
        const from = document.getElementById('convert-from').value;
        const to = document.getElementById('convert-to').value;

        if (isNaN(value)) {
            alert('Please enter a valid number');
            return;
        }

        const conversions = {
            // Weight
            'g-oz': v => v / 28.3495,
            'oz-g': v => v * 28.3495,

            // Volume
            'ml-floz': v => v / 29.5735,
            'floz-ml': v => v * 29.5735,
            'ml-cups': v => v / 240,
            'cups-ml': v => v * 240,
            'ml-tbsp': v => v / 15,
            'tbsp-ml': v => v * 15,
            'ml-tsp': v => v / 5,
            'tsp-ml': v => v * 5,
            'cups-tbsp': v => v * 16,
            'tbsp-cups': v => v / 16,
            'cups-tsp': v => v * 48,
            'tsp-cups': v => v / 48,
            'tbsp-tsp': v => v * 3,
            'tsp-tbsp': v => v / 3,

            // Temperature
            'celsius-fahrenheit': v => (v * 9/5) + 32,
            'fahrenheit-celsius': v => (v - 32) * 5/9
        };

        const key = `${from}-${to}`;
        let result;

        if (from === to) {
            result = value;
        } else if (conversions[key]) {
            result = conversions[key](value);
        } else {
            alert('Cannot convert between these units');
            return;
        }

        const resultDiv = document.getElementById('convert-result');
        resultDiv.textContent = `${value} ${this.getUnitLabel(from)} = ${result.toFixed(2)} ${this.getUnitLabel(to)}`;
        resultDiv.classList.add('show');
    },

    getUnitLabel(unit) {
        const labels = {
            'g': 'g',
            'oz': 'oz',
            'ml': 'ml',
            'floz': 'fl oz',
            'cups': 'cups',
            'tbsp': 'tbsp',
            'tsp': 'tsp',
            'celsius': '°C',
            'fahrenheit': '°F'
        };
        return labels[unit] || unit;
    },

    convertPanSize() {
        const original = parseFloat(document.getElementById('pan-original').value);
        const newPan = parseFloat(document.getElementById('pan-new').value);

        const ratio = newPan / original;

        const resultDiv = document.getElementById('pan-result');
        resultDiv.textContent = `Multiply all ingredients by ${ratio.toFixed(2)}× (${Math.round(ratio * 100)}%)`;
        resultDiv.classList.add('show');
    },

    // ===========================
    // SETTINGS
    // ===========================

    renderSettings() {
        document.getElementById('setting-notifications').checked = this.settings.notifications;
        document.getElementById('setting-sound').checked = this.settings.sound;
        document.getElementById('setting-theme').value = this.settings.theme;

        this.updateNotificationStatus();
    },

    applySettings() {
        // Apply theme (could expand this)
        document.body.className = this.settings.theme;
    },

    toggleNotifications() {
        this.settings.notifications = document.getElementById('setting-notifications').checked;

        if (this.settings.notifications && 'Notification' in window) {
            Notification.requestPermission().then(permission => {
                this.settings.notifications = (permission === 'granted');
                document.getElementById('setting-notifications').checked = this.settings.notifications;
                this.updateNotificationStatus();
                this.saveData();
            });
        } else {
            this.saveData();
            this.updateNotificationStatus();
        }
    },

    updateNotificationStatus() {
        const status = document.getElementById('notification-status');

        if (!('Notification' in window)) {
            status.textContent = '❌ Notifications not supported in this browser';
            status.style.background = 'var(--danger)';
        } else if (Notification.permission === 'granted' && this.settings.notifications) {
            status.textContent = '✅ Notifications enabled';
            status.style.background = 'var(--success)';
        } else if (Notification.permission === 'denied') {
            status.textContent = '❌ Notifications blocked by browser';
            status.style.background = 'var(--danger)';
        } else {
            status.textContent = '⚠️ Click checkbox to enable';
            status.style.background = 'var(--warning)';
        }
    },

    toggleSound() {
        this.settings.sound = document.getElementById('setting-sound').checked;
        this.saveData();
    },

    changeTheme() {
        this.settings.theme = document.getElementById('setting-theme').value;
        this.applySettings();
        this.saveData();
    },

    exportData() {
        const data = {
            recipes: this.recipes,
            alarms: this.alarms,
            settings: this.settings,
            version: 1,
            exported: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `baking-app-backup-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        alert('✅ Data exported successfully!');
    },

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);

                    if (confirm('Import data? This will replace all current data.')) {
                        if (data.recipes) this.recipes = data.recipes;
                        if (data.alarms) this.alarms = data.alarms;
                        if (data.settings) this.settings = data.settings;

                        this.saveData();
                        this.applySettings();
                        this.renderRecipes();
                        this.renderAlarms();
                        this.renderSettings();

                        alert('✅ Data imported successfully!');
                    }
                } catch (err) {
                    alert('❌ Error importing data: Invalid file format');
                }
            };

            reader.readAsText(file);
        };

        input.click();
    },

    resetAllData() {
        if (!confirm('⚠️ Reset ALL data? This will delete all recipes, timers, and settings. This cannot be undone!')) {
            return;
        }

        if (!confirm('Are you REALLY sure? This is permanent!')) {
            return;
        }

        localStorage.clear();
        location.reload();
    },

    // ===========================
    // NOTIFICATIONS & AUDIO
    // ===========================

    setupNotifications() {
        if ('Notification' in window && Notification.permission === 'default') {
            // Don't auto-request, wait for user action
        }
    },

    showNotification(title, body) {
        if (this.settings.notifications && 'Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">🧁</text></svg>',
                badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">🧁</text></svg>'
            });
        }
    },

    setupAudio() {
        // Create simple beep using Web Audio API
        this.audioContext = null;

        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    playAlert() {
        if (!this.settings.sound) return;

        if (this.audioContext) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.5);
        }
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}
