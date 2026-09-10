import { describe, it, expect } from 'vitest';
import { checkMessageMasking } from './domain';

describe('T-12 Masking Logic', () => {
  it('detects emails', () => {
    expect(checkMessageMasking('my email is test@example.com')).toBe(true);
  });

  it('detects phone numbers', () => {
    expect(checkMessageMasking('call me at +1-555-123-4567')).toBe(true);
    expect(checkMessageMasking('call me at 087 123 4567')).toBe(true);
  });

  it('allows normal text', () => {
    expect(checkMessageMasking('The stopcock is under the sink.')).toBe(false);
  });
});
