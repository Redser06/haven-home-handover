# Test Plan

## 1. Layers

- **Unit:** Vitest, `lib/` domain logic
- **Component:** RTL, per-screen behaviour
- **E2E:** Playwright, both personas' full journeys
- **Security:** Token abuse, cross-tenancy, rate limits

## 2. Non-negotiable scenarios

| ID | Scenario | Verifies |
|---|---|---|
| T-1 | Seller creates handover → token generated and valid | H-2, H-3 |
| T-2 | Buyer redeems token → access granted, token consumed | H-3, F-14 |
| T-3 | Token reuse rejected (same or different user) | H-3 |
| T-4 | Wrong/expired/garbage token rejected; rate limit trips at threshold | N-3 |
| T-5 | Buyer of handover A cannot read or write any part of handover B | F-14, N-3 |
| T-6 | Realtime chat: send → received both directions < 2 s | F-11 |
| T-7 | Upload manual → buyer downloads byte-identical file | F-6 |
| T-8 | Key safe reveal works; audit event written | F-8, F-9 |
| T-9 | Expiry: chat destroyed, key safe destroyed, manuals survive | H-5, F-16 |
| T-10 | Export before expiry yields a complete bundle | H-6 |
| T-11 | Seller early-close notifies buyer; content still passes to buyer | H-7, F-16 |
| T-12 | Masking warns on phone/email typed in chat | F-12 |
| T-13 | Destruction job is idempotent | H-4a |
| T-14 | State machine rejects invalid transitions server-side | H-4 |

## 3. Date-handling rule

Expiry logic is date-sensitive. Tests must explicitly cover month/quarter/year boundaries, leap day, and grace windows straddling a month end using an injected clock or fake timers. Seeding relative to `Date()` is forbidden.

## 4. Coverage

80% floor per-file on all `lib/` and `components/` files.
