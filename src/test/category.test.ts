import { describe, it, expect } from 'vitest';
import { CATEGORY_MAP } from '../services/dataService';

describe('Category Mapping', () => {
  it('should have all required categories', () => {
    expect(CATEGORY_MAP).toHaveProperty('A');
    expect(CATEGORY_MAP).toHaveProperty('B');
    expect(CATEGORY_MAP).toHaveProperty('C');
    expect(CATEGORY_MAP).toHaveProperty('D');
  });

  it('should have correct trust ranges', () => {
    expect(CATEGORY_MAP.A.trustRange).toBe('80-100');
    expect(CATEGORY_MAP.B.trustRange).toBe('60-80');
    expect(CATEGORY_MAP.C.trustRange).toBe('40-60');
    expect(CATEGORY_MAP.D.trustRange).toBe('0-40');
  });

  it('should have appropriate colors', () => {
    expect(CATEGORY_MAP.A.color).toBe('green');
    expect(CATEGORY_MAP.B.color).toBe('light-green');
    expect(CATEGORY_MAP.C.color).toBe('orange');
    expect(CATEGORY_MAP.D.color).toBe('red');
  });

  it('should have security advice for each category', () => {
    Object.values(CATEGORY_MAP).forEach(category => {
      expect(category.advice).toBeTruthy();
      expect(typeof category.advice).toBe('string');
    });
  });
});