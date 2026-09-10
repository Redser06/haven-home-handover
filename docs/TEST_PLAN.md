# Test Plan

## Layers
- Unit (Vitest, `lib/` domain logic)
- Component (RTL, per-screen behaviour)
- E2E (Playwright, full journeys)
- Security (token abuse, cross-tenancy, rate limits)

## Scenarios
- **T-1 to T-14** as outlined in REQUIREMENTS.md

## Date handling
- All tests touching dates, expiry, or retention must use injected clock or fake timers.

## DoD
- Requirement ID -> implementation -> test file referencing that ID -> verify.sh green -> FEATURE_SET.md status updated.
