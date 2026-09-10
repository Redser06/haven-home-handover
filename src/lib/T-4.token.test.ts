import { describe, it, expect } from 'vitest';
import { isTokenValid } from './domain';

describe('T-4 Token Validation', () => {
  it('validates correct tokens', () => {
    expect(isTokenValid('HANDOVER-9823-OAK')).toBe(true);
  });

  it('rejects incorrect tokens', () => {
    expect(isTokenValid('garbage')).toBe(false);
    expect(isTokenValid('HANDOVER-')).toBe(false);
    expect(isTokenValid('9823-OAK')).toBe(false);
  });
});
