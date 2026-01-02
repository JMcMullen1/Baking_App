import { IngredientSubstitution } from '../types';

export const SUBSTITUTIONS: IngredientSubstitution[] = [
  {
    ingredient: 'Butter',
    category: 'Fats',
    substitutes: [
      {
        name: 'Margarine',
        ratio: '1:1',
        notes: 'Use stick margarine, not spread. May alter flavor slightly.',
      },
      {
        name: 'Coconut oil',
        ratio: '1:1',
        notes: 'Use solid coconut oil. Adds subtle coconut flavor.',
      },
      {
        name: 'Vegetable oil',
        ratio: '1 cup butter = 3/4 cup oil',
        notes: 'Works for moist cakes. May need to reduce other liquids.',
      },
      {
        name: 'Applesauce',
        ratio: '1:1',
        notes: 'For healthier baking. Reduces fat content, makes denser texture.',
      },
    ],
  },
  {
    ingredient: 'Eggs',
    category: 'Binding',
    substitutes: [
      {
        name: 'Flax egg',
        ratio: '1 egg = 1 tbsp ground flax + 3 tbsp water',
        notes: 'Mix and let sit 5 minutes. Works well in dense baked goods.',
      },
      {
        name: 'Chia egg',
        ratio: '1 egg = 1 tbsp chia seeds + 3 tbsp water',
        notes: 'Mix and let sit 5 minutes. Similar to flax egg.',
      },
      {
        name: 'Applesauce',
        ratio: '1 egg = 1/4 cup applesauce',
        notes: 'Best for moist cakes and muffins. Adds sweetness.',
      },
      {
        name: 'Mashed banana',
        ratio: '1 egg = 1/4 cup mashed banana',
        notes: 'Adds banana flavor. Good for quick breads and muffins.',
      },
      {
        name: 'Yogurt',
        ratio: '1 egg = 1/4 cup yogurt',
        notes: 'Plain yogurt works best. Adds moisture.',
      },
    ],
  },
  {
    ingredient: 'All-purpose flour',
    category: 'Flour',
    substitutes: [
      {
        name: 'Bread flour',
        ratio: '1:1',
        notes: 'Higher protein. Creates chewier texture.',
      },
      {
        name: 'Cake flour',
        ratio: '1 cup AP = 1 cup + 2 tbsp cake flour',
        notes: 'Lower protein. Creates more tender, delicate texture.',
      },
      {
        name: 'Whole wheat flour',
        ratio: '1 cup AP = 3/4 cup whole wheat',
        notes: 'Denser, nuttier flavor. May need more liquid.',
      },
      {
        name: 'Gluten-free flour blend',
        ratio: '1:1',
        notes: 'Use a 1:1 baking blend. May need xanthan gum if not included.',
      },
    ],
  },
  {
    ingredient: 'Granulated sugar',
    category: 'Sweeteners',
    substitutes: [
      {
        name: 'Brown sugar',
        ratio: '1:1',
        notes: 'Adds moisture and molasses flavor. Use packed measurement.',
      },
      {
        name: 'Honey',
        ratio: '1 cup sugar = 3/4 cup honey',
        notes: 'Reduce liquid by 1/4 cup. Lower oven temp by 25°F.',
      },
      {
        name: 'Maple syrup',
        ratio: '1 cup sugar = 3/4 cup maple syrup',
        notes: 'Reduce liquid by 3 tbsp. Adds maple flavor.',
      },
      {
        name: 'Coconut sugar',
        ratio: '1:1',
        notes: 'Similar to brown sugar. Lower glycemic index.',
      },
    ],
  },
  {
    ingredient: 'Buttermilk',
    category: 'Dairy',
    substitutes: [
      {
        name: 'Milk + Vinegar',
        ratio: '1 cup buttermilk = 1 cup milk + 1 tbsp vinegar',
        notes: 'Let sit 5 minutes before using. White vinegar or apple cider vinegar works.',
      },
      {
        name: 'Milk + Lemon juice',
        ratio: '1 cup buttermilk = 1 cup milk + 1 tbsp lemon juice',
        notes: 'Let sit 5 minutes before using.',
      },
      {
        name: 'Plain yogurt',
        ratio: '1:1',
        notes: 'Thin with milk if too thick. Greek yogurt works too.',
      },
      {
        name: 'Sour cream',
        ratio: '1:1',
        notes: 'Thin with milk if needed. Adds richness.',
      },
    ],
  },
  {
    ingredient: 'Heavy cream',
    category: 'Dairy',
    substitutes: [
      {
        name: 'Half and half + Butter',
        ratio: '1 cup cream = 7/8 cup half & half + 1/8 cup melted butter',
        notes: 'Works for most recipes. Lower fat content.',
      },
      {
        name: 'Milk + Butter',
        ratio: '1 cup cream = 3/4 cup milk + 1/4 cup melted butter',
        notes: 'Works in a pinch. Will be thinner.',
      },
      {
        name: 'Coconut cream',
        ratio: '1:1',
        notes: 'Use full-fat canned coconut milk, chilled. Scoop thick cream from top.',
      },
    ],
  },
  {
    ingredient: 'Baking powder',
    category: 'Leavening',
    substitutes: [
      {
        name: 'Baking soda + Cream of tartar',
        ratio: '1 tsp baking powder = 1/4 tsp baking soda + 1/2 tsp cream of tartar',
        notes: 'Mix fresh for each use.',
      },
      {
        name: 'Baking soda + Vinegar',
        ratio: '1 tsp baking powder = 1/4 tsp baking soda + 1/2 tsp vinegar',
        notes: 'Add vinegar to wet ingredients. Works for emergency.',
      },
      {
        name: 'Baking soda + Lemon juice',
        ratio: '1 tsp baking powder = 1/4 tsp baking soda + 1/2 tsp lemon juice',
        notes: 'Add lemon juice to wet ingredients.',
      },
    ],
  },
  {
    ingredient: 'Cocoa powder',
    category: 'Chocolate',
    substitutes: [
      {
        name: 'Unsweetened chocolate',
        ratio: '3 tbsp cocoa + 1 tbsp fat = 1 oz unsweetened chocolate',
        notes: 'Melt chocolate before using. Adjust fat in recipe.',
      },
      {
        name: 'Semi-sweet chocolate',
        ratio: '3 tbsp cocoa + 1 tbsp fat + 1 tbsp sugar = 1 oz semi-sweet chocolate',
        notes: 'Reduce sugar in recipe accordingly.',
      },
    ],
  },
  {
    ingredient: 'Vanilla extract',
    category: 'Flavorings',
    substitutes: [
      {
        name: 'Vanilla bean',
        ratio: '1 tsp extract = 1 vanilla bean',
        notes: 'Split bean and scrape seeds. More expensive but superior flavor.',
      },
      {
        name: 'Vanilla paste',
        ratio: '1:1',
        notes: 'Contains vanilla seeds. More concentrated flavor.',
      },
      {
        name: 'Almond extract',
        ratio: '1 tsp vanilla = 1/2 tsp almond',
        notes: 'Strong flavor. Use half the amount. Changes flavor profile.',
      },
      {
        name: 'Maple syrup',
        ratio: '1 tsp vanilla = 1 tbsp maple syrup',
        notes: 'Adds sweetness and liquid. Adjust recipe accordingly.',
      },
    ],
  },
  {
    ingredient: 'Cornstarch',
    category: 'Thickeners',
    substitutes: [
      {
        name: 'All-purpose flour',
        ratio: '1 tbsp cornstarch = 2 tbsp flour',
        notes: 'Use double the amount. May make result less clear.',
      },
      {
        name: 'Arrowroot',
        ratio: '1:1',
        notes: 'Works well in acidic mixtures. Creates clear finish.',
      },
      {
        name: 'Tapioca starch',
        ratio: '1:1',
        notes: 'Good for pie fillings. Creates glossy finish.',
      },
    ],
  },
];

export const findSubstitutions = (ingredient: string): IngredientSubstitution | undefined => {
  return SUBSTITUTIONS.find(
    (sub) => sub.ingredient.toLowerCase() === ingredient.toLowerCase()
  );
};

export const getSubstitutionsByCategory = (category: string): IngredientSubstitution[] => {
  return SUBSTITUTIONS.filter((sub) => sub.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(SUBSTITUTIONS.map((sub) => sub.category)));
};
