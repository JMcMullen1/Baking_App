import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  convertWeight,
  convertVolume,
  scaleRecipe,
  formatTime,
  formatTimeWithMilliseconds,
} from '../src/utils/conversions';

describe('Temperature Conversions', () => {
  test('converts celsius to fahrenheit correctly', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(175)).toBe(347);
    expect(celsiusToFahrenheit(-40)).toBe(-40);
  });

  test('converts fahrenheit to celsius correctly', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
    expect(fahrenheitToCelsius(212)).toBe(100);
    expect(fahrenheitToCelsius(350)).toBe(177);
    expect(fahrenheitToCelsius(-40)).toBe(-40);
  });
});

describe('Weight Conversions', () => {
  test('converts grams to ounces', () => {
    const result = convertWeight(100, 'g', 'oz');
    expect(result).toBeCloseTo(3.53, 1);
  });

  test('converts pounds to grams', () => {
    const result = convertWeight(1, 'lb', 'g');
    expect(result).toBeCloseTo(453.59, 1);
  });

  test('converts kg to pounds', () => {
    const result = convertWeight(1, 'kg', 'lb');
    expect(result).toBeCloseTo(2.20, 1);
  });

  test('returns same value for same units', () => {
    expect(convertWeight(100, 'g', 'g')).toBe(100);
  });
});

describe('Volume Conversions', () => {
  test('converts milliliters to cups', () => {
    const result = convertVolume(236.588, 'ml', 'cup');
    expect(result).toBeCloseTo(1, 1);
  });

  test('converts cups to milliliters', () => {
    const result = convertVolume(1, 'cup', 'ml');
    expect(result).toBeCloseTo(236.59, 1);
  });

  test('converts tablespoons to teaspoons', () => {
    const result = convertVolume(1, 'tbsp', 'tsp');
    expect(result).toBeCloseTo(3, 0);
  });

  test('converts liters to milliliters', () => {
    expect(convertVolume(1, 'l', 'ml')).toBe(1000);
  });
});

describe('Recipe Scaling', () => {
  test('scales recipe up by 2x', () => {
    expect(scaleRecipe(100, 2)).toBe(200);
    expect(scaleRecipe(1.5, 2)).toBe(3);
  });

  test('scales recipe down by 0.5x', () => {
    expect(scaleRecipe(100, 0.5)).toBe(50);
    expect(scaleRecipe(3, 0.5)).toBe(1.5);
  });

  test('keeps recipe same at 1x', () => {
    expect(scaleRecipe(100, 1)).toBe(100);
    expect(scaleRecipe(2.5, 1)).toBe(2.5);
  });

  test('scales recipe up by 3x', () => {
    expect(scaleRecipe(50, 3)).toBe(150);
  });
});

describe('Time Formatting', () => {
  test('formats time in minutes and seconds', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(1000)).toBe('0:01');
    expect(formatTime(60000)).toBe('1:00');
    expect(formatTime(90000)).toBe('1:30');
  });

  test('formats time with hours', () => {
    expect(formatTime(3600000)).toBe('1:00:00');
    expect(formatTime(3661000)).toBe('1:01:01');
  });

  test('formats time with milliseconds', () => {
    expect(formatTimeWithMilliseconds(0)).toBe('0:00.00');
    expect(formatTimeWithMilliseconds(1234)).toBe('0:01.23');
    expect(formatTimeWithMilliseconds(61234)).toBe('1:01.23');
  });

  test('formats hours with milliseconds', () => {
    const result = formatTimeWithMilliseconds(3661234);
    expect(result).toContain('1:01:01');
  });
});

describe('Edge Cases', () => {
  test('handles zero values', () => {
    expect(scaleRecipe(0, 2)).toBe(0);
    expect(convertWeight(0, 'g', 'oz')).toBe(0);
    expect(convertVolume(0, 'ml', 'cup')).toBe(0);
  });

  test('handles decimal scale factors', () => {
    expect(scaleRecipe(100, 1.5)).toBe(150);
    expect(scaleRecipe(100, 0.75)).toBe(75);
  });

  test('maintains precision for small amounts', () => {
    const result = scaleRecipe(0.25, 2);
    expect(result).toBe(0.5);
  });
});
