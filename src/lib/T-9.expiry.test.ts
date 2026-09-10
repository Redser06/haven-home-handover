import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateExpiryState } from './domain';

describe('T-9 Expiry & Grace Periods', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('identifies active state', () => {
    const createdAt = new Date('2026-01-31T00:00:00Z');
    const now = new Date('2026-02-05T00:00:00Z');
    expect(calculateExpiryState(createdAt, 30, now)).toBe('active');
  });

  it('identifies expiring state (last 14 days)', () => {
    const createdAt = new Date('2026-01-31T00:00:00Z');
    const now = new Date('2026-02-20T00:00:00Z'); // 20 days in, 10 days left
    expect(calculateExpiryState(createdAt, 30, now)).toBe('expiring');
  });

  it('identifies closing state (grace period)', () => {
    const createdAt = new Date('2026-01-31T00:00:00Z');
    const now = new Date('2026-03-03T00:00:00Z'); // past 30 days (March 2 is 30 days since Jan 31 non-leap year)
    expect(calculateExpiryState(createdAt, 30, now)).toBe('closing');
  });

  it('identifies archived state (past grace period)', () => {
    const createdAt = new Date('2026-01-31T00:00:00Z');
    const now = new Date('2026-03-15T00:00:00Z');
    expect(calculateExpiryState(createdAt, 30, now)).toBe('archived');
  });
});
