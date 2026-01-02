// Recipe types
export interface Recipe {
  id: string;
  title: string;
  category: RecipeCategory;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  prepTime: number; // in minutes
  bakeTime: number; // in minutes
  temperature: Temperature;
  servings: number;
  notes?: string;
  isFavorite: boolean;
  lastBaked?: string; // ISO date string
  imageUrl?: string;
  tags: string[];
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: MeasurementUnit;
  notes?: string;
}

export type RecipeCategory =
  | 'Cookies'
  | 'Cakes'
  | 'Bread'
  | 'Pastries'
  | 'Desserts'
  | 'Other';

export interface Temperature {
  celsius: number;
  fahrenheit: number;
}

export type MeasurementUnit =
  | 'g'
  | 'kg'
  | 'oz'
  | 'lb'
  | 'ml'
  | 'l'
  | 'cup'
  | 'tbsp'
  | 'tsp'
  | 'whole';

// Alarm types
export interface Alarm {
  id: string;
  label: string;
  time: string; // HH:mm format
  enabled: boolean;
  repeat: AlarmRepeat;
  sound: string;
  snoozeEnabled: boolean;
  snoozeDuration: number; // in minutes
  createdAt: string; // ISO date string
}

export interface AlarmPreset {
  id: string;
  label: string;
  duration: number; // in minutes
  icon: string;
}

export type AlarmRepeat =
  | 'once'
  | 'daily'
  | 'weekdays'
  | 'weekends'
  | 'custom';

export interface CustomRepeat {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

// Timer types
export interface Timer {
  id: string;
  label: string;
  duration: number; // in seconds
  remaining: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  createdAt: string; // ISO date string
  startedAt?: string; // ISO date string
}

// Stopwatch types
export interface StopwatchState {
  isRunning: boolean;
  isPaused: boolean;
  elapsedTime: number; // in milliseconds
  splits: Split[];
  startedAt?: number; // timestamp
  pausedAt?: number; // timestamp
}

export interface Split {
  id: string;
  time: number; // in milliseconds
  lapTime: number; // in milliseconds
  timestamp: number; // when the split was recorded
}

// Settings types
export interface Settings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  measurementSystem: 'metric' | 'imperial';
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  defaultAlarmSound: string;
  theme: 'light' | 'dark' | 'auto';
  userName: string;
}

// Shopping list types
export interface ShoppingList {
  id: string;
  items: ShoppingItem[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: number;
  unit: MeasurementUnit;
  checked: boolean;
  recipeId?: string;
}

// Bake session types
export interface BakeSession {
  id: string;
  recipeId: string;
  startTime: string; // ISO date string
  endTime?: string; // ISO date string
  notes: string;
  scaleFactor: number;
  success: boolean;
  rating?: number; // 1-5
}

// Substitution types
export interface IngredientSubstitution {
  ingredient: string;
  substitutes: Substitute[];
  category: string;
}

export interface Substitute {
  name: string;
  ratio: string; // e.g., "1:1" or "1 cup = 3/4 cup"
  notes: string;
}

// Conversion types
export interface Conversion {
  from: MeasurementUnit;
  to: MeasurementUnit;
  factor: number;
}

export interface PanSize {
  name: string;
  dimensions: string;
  volume: string;
  notes?: string;
}

// Mascot types
export type MascotType = 'bailey' | 'nellie';

export interface MascotTip {
  id: string;
  mascot: MascotType;
  text: string;
  category: string;
}

// Data versioning
export interface DataVersion {
  version: string;
  lastUpdated: string; // ISO date string
}

// Storage keys
export const STORAGE_KEYS = {
  RECIPES: '@baking_app_recipes',
  ALARMS: '@baking_app_alarms',
  TIMERS: '@baking_app_timers',
  STOPWATCH: '@baking_app_stopwatch',
  SETTINGS: '@baking_app_settings',
  SHOPPING_LIST: '@baking_app_shopping_list',
  BAKE_SESSIONS: '@baking_app_bake_sessions',
  DATA_VERSION: '@baking_app_data_version',
} as const;
