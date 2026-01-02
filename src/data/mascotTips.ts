import { MascotTip } from '../types';

export const MASCOT_TIPS: MascotTip[] = [
  // Bailey's tips (blue hat, King Charles Cavalier)
  {
    id: 'bailey-1',
    mascot: 'bailey',
    text: 'Always measure flour by spooning it into the cup and leveling off - never scoop directly!',
    category: 'technique',
  },
  {
    id: 'bailey-2',
    mascot: 'bailey',
    text: 'Room temperature ingredients mix better! Take eggs and butter out 30 minutes before baking.',
    category: 'prep',
  },
  {
    id: 'bailey-3',
    mascot: 'bailey',
    text: 'Preheat your oven for at least 15 minutes to ensure even baking temperature!',
    category: 'baking',
  },
  {
    id: 'bailey-4',
    mascot: 'bailey',
    text: 'Dark pans absorb more heat - reduce oven temp by 25°F if using dark bakeware.',
    category: 'equipment',
  },
  {
    id: 'bailey-5',
    mascot: 'bailey',
    text: 'Don\'t overmix! Stir just until ingredients are combined to keep your baked goods tender.',
    category: 'technique',
  },
  {
    id: 'bailey-6',
    mascot: 'bailey',
    text: 'Fresh baking soda and powder are key! Replace them every 6 months for best rise.',
    category: 'ingredients',
  },
  {
    id: 'bailey-7',
    mascot: 'bailey',
    text: 'Use an oven thermometer - many ovens run hot or cold by 25°F or more!',
    category: 'equipment',
  },
  {
    id: 'bailey-8',
    mascot: 'bailey',
    text: 'Let cakes cool completely before frosting or the frosting will melt. Patience is key!',
    category: 'decorating',
  },
  {
    id: 'bailey-9',
    mascot: 'bailey',
    text: 'Toast nuts before adding to recipes for deeper, richer flavor!',
    category: 'technique',
  },
  {
    id: 'bailey-10',
    mascot: 'bailey',
    text: 'Rotate your pans halfway through baking for even browning!',
    category: 'baking',
  },

  // Nellie's tips (pink hat, Golden Retriever)
  {
    id: 'nellie-1',
    mascot: 'nellie',
    text: 'Every oven is different! Get to know yours and adjust baking times as needed.',
    category: 'baking',
  },
  {
    id: 'nellie-2',
    mascot: 'nellie',
    text: 'Sift powdered sugar for smooth, lump-free frosting every time!',
    category: 'decorating',
  },
  {
    id: 'nellie-3',
    mascot: 'nellie',
    text: 'Line your pans with parchment paper for easy release and minimal cleanup!',
    category: 'prep',
  },
  {
    id: 'nellie-4',
    mascot: 'nellie',
    text: 'Brown butter adds amazing nutty flavor to cookies and cakes - try it!',
    category: 'technique',
  },
  {
    id: 'nellie-5',
    mascot: 'nellie',
    text: 'Chill cookie dough for 30 minutes before baking to prevent spreading!',
    category: 'cookies',
  },
  {
    id: 'nellie-6',
    mascot: 'nellie',
    text: 'Add a pinch of salt to sweet recipes - it enhances all the flavors!',
    category: 'ingredients',
  },
  {
    id: 'nellie-7',
    mascot: 'nellie',
    text: 'For perfect meringue, make sure your bowl is completely clean and grease-free!',
    category: 'technique',
  },
  {
    id: 'nellie-8',
    mascot: 'nellie',
    text: 'Weighing ingredients is more accurate than measuring cups - invest in a kitchen scale!',
    category: 'equipment',
  },
  {
    id: 'nellie-9',
    mascot: 'nellie',
    text: 'Don\'t open the oven door too early! It can cause cakes to fall.',
    category: 'baking',
  },
  {
    id: 'nellie-10',
    mascot: 'nellie',
    text: 'Vanilla extract gets better with age - make your own and let it develop!',
    category: 'ingredients',
  },
  {
    id: 'nellie-11',
    mascot: 'nellie',
    text: 'Store cookies with a slice of bread to keep them soft and fresh!',
    category: 'storage',
  },
  {
    id: 'nellie-12',
    mascot: 'nellie',
    text: 'Use a toothpick test, but remember: a few moist crumbs are better than dry!',
    category: 'baking',
  },
];

export const getRandomTip = (): MascotTip => {
  return MASCOT_TIPS[Math.floor(Math.random() * MASCOT_TIPS.length)];
};

export const getTipsByMascot = (mascot: 'bailey' | 'nellie'): MascotTip[] => {
  return MASCOT_TIPS.filter((tip) => tip.mascot === mascot);
};

export const getTipsByCategory = (category: string): MascotTip[] => {
  return MASCOT_TIPS.filter((tip) => tip.category === category);
};
