import { MeasurementUnit, Temperature } from '../types';

// Temperature conversions
export const celsiusToFahrenheit = (celsius: number): number => {
  return Math.round((celsius * 9) / 5 + 32);
};

export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

// Weight conversions (to grams as base unit)
const WEIGHT_TO_GRAMS: Record<string, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
};

// Volume conversions (to ml as base unit)
const VOLUME_TO_ML: Record<string, number> = {
  ml: 1,
  l: 1000,
  cup: 236.588,
  tbsp: 14.787,
  tsp: 4.929,
};

export const convertWeight = (
  amount: number,
  from: MeasurementUnit,
  to: MeasurementUnit
): number => {
  if (from === to) return amount;

  const fromFactor = WEIGHT_TO_GRAMS[from];
  const toFactor = WEIGHT_TO_GRAMS[to];

  if (!fromFactor || !toFactor) {
    throw new Error(`Cannot convert weight from ${from} to ${to}`);
  }

  const grams = amount * fromFactor;
  return parseFloat((grams / toFactor).toFixed(2));
};

export const convertVolume = (
  amount: number,
  from: MeasurementUnit,
  to: MeasurementUnit
): number => {
  if (from === to) return amount;

  const fromFactor = VOLUME_TO_ML[from];
  const toFactor = VOLUME_TO_ML[to];

  if (!fromFactor || !toFactor) {
    throw new Error(`Cannot convert volume from ${from} to ${to}`);
  }

  const ml = amount * fromFactor;
  return parseFloat((ml / toFactor).toFixed(2));
};

export const convert = (
  amount: number,
  from: MeasurementUnit,
  to: MeasurementUnit
): number => {
  // Check if it's a weight conversion
  if (WEIGHT_TO_GRAMS[from] && WEIGHT_TO_GRAMS[to]) {
    return convertWeight(amount, from, to);
  }

  // Check if it's a volume conversion
  if (VOLUME_TO_ML[from] && VOLUME_TO_ML[to]) {
    return convertVolume(amount, from, to);
  }

  throw new Error(`Cannot convert from ${from} to ${to}`);
};

// Common ingredient approximations (cups to grams)
export const INGREDIENT_CUPS_TO_GRAMS: Record<string, number> = {
  'all-purpose flour': 125,
  'bread flour': 130,
  'cake flour': 115,
  'whole wheat flour': 120,
  'granulated sugar': 200,
  'brown sugar': 220,
  'powdered sugar': 120,
  butter: 227,
  'butter (melted)': 227,
  oil: 218,
  milk: 240,
  water: 240,
  'cocoa powder': 85,
  'chocolate chips': 170,
  'rolled oats': 90,
  honey: 340,
  'maple syrup': 320,
  'sour cream': 240,
  'greek yogurt': 245,
};

export const cupsToGrams = (
  ingredient: string,
  cups: number
): number | null => {
  const lowerIngredient = ingredient.toLowerCase();
  const gramsPerCup = INGREDIENT_CUPS_TO_GRAMS[lowerIngredient];

  if (!gramsPerCup) return null;

  return Math.round(cups * gramsPerCup);
};

// Recipe scaling
export const scaleRecipe = (
  amount: number,
  scaleFactor: number
): number => {
  return parseFloat((amount * scaleFactor).toFixed(2));
};

// Pan size conversions
export interface PanConversion {
  from: string;
  to: string;
  factor: number;
  notes: string;
}

export const PAN_SIZES = [
  {
    name: '8" Round',
    dimensions: '8" diameter',
    volume: '50 sq in',
    equivalent: '8x8" square',
  },
  {
    name: '9" Round',
    dimensions: '9" diameter',
    volume: '64 sq in',
    equivalent: '9x9" square',
  },
  {
    name: '8x8" Square',
    dimensions: '8x8"',
    volume: '64 sq in',
    equivalent: '9" round',
  },
  {
    name: '9x9" Square',
    dimensions: '9x9"',
    volume: '81 sq in',
    equivalent: '10" round',
  },
  {
    name: '9x13" Rectangle',
    dimensions: '9x13"',
    volume: '117 sq in',
    equivalent: 'Two 8" rounds',
  },
  {
    name: '10" Bundt',
    dimensions: '10" diameter',
    volume: '12 cups',
    equivalent: '9x13" rectangle',
  },
  {
    name: '9x5" Loaf',
    dimensions: '9x5x3"',
    volume: '8 cups',
    equivalent: '8x8" square',
  },
];

export const calculatePanAdjustment = (
  fromPanArea: number,
  toPanArea: number
): number => {
  return fromPanArea / toPanArea;
};

// Time formatting helpers
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const formatTimeWithMilliseconds = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const ms = Math.floor((milliseconds % 1000) / 10);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}.${ms
    .toString()
    .padStart(2, '0')}`;
};

export const parseTimeString = (timeString: string): number => {
  const parts = timeString.split(':');
  let seconds = 0;

  if (parts.length === 3) {
    // HH:MM:SS
    seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
  } else if (parts.length === 2) {
    // MM:SS
    seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }

  return seconds * 1000; // Convert to milliseconds
};
