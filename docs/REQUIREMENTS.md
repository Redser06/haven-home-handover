# Haven — Home Handover: Requirements v1.0

**Status:** Baseline. Decisions previously marked open (§10 of v0.1) are now **resolved** (§6).
**Baseline artefact:** the 451-line `App.jsx` prototype (commit `3ad357f`) is a **UI spec only**. Nothing in it is trusted as code; it defines what the screens look like and do.
**Companion documents:** normative agent behaviour rules live in [`AGENTS.md`](../AGENTS.md) (definition of done, testing gates, evidence protocol). This document defines **what** to build; `AGENTS.md` defines **how agents building it must behave**. Where the two conflict, `AGENTS.md` wins.

Requirement IDs: `H-*` core concepts · `F-*` functional · `N-*` non-functional · `E-*` engineering baseline · `D-*` documentation · `R-*` resolved decisions.

---

## 1. Problem statement

On completion day, ownership of a house changes hands — but knowledge of the house does not. The seller is the only person who knows where the stopcock is, how to reboot the solar inverter, when the boiler was last serviced, and what the alarm code is. The buyer inherits a folder of PDFs and a house that doesn't come with a manual.

Haven is the structured handover between the two parties, under two hard constraints:

1. **Privacy** — buyer and seller never exchange personal contact details, and the channel between them has a defined end of life.
2. **Expiry** — the platform serves the handover window, not forever. What persists (the home's documentation) is architecturally separated from what must die (the channel between two strangers).

## 2. Personas

| Persona | Who | What they need |
|---|---|---|
| **Seller** | Outgoing owner | Dump everything they know once — devices, guides, manuals, codes — then walk away |
| **Buyer** | Incoming owner | Find everything, ask questions before it's gone, keep the docs forever |
| **Facilitator** (Phase 4) | Estate agent / conveyancer | Create and manage handovers for many properties at once |

The product is **self-serve first** (R-D): it must work end-to-end for two strangers with no middleman. Facilitators become a distribution layer, not a prerequisite.

## 3. Core concept: the Handover Workspace

One handover = one property = one token. Everything hangs off this.

- **H-1** A *handover* is the root entity: property address, completion date, two participants (seller, buyer), and a lifecycle state (§3.1).
- **H-2** Access is granted by a *handover token* (e.g. `HANDOVER-9823-OAK`). The seller creates the handover and passes the token to the buyer out-of-band (text, email, in person).
- **H-3** Token rules: single-use per participant, high-entropy (≥ 64 bits of randomness — never derived from the address), independently revocable per participant, entry rate-limited (N-3).
- **H-4** Lifecycle states and allowed transitions (§3.1). Invalid transitions must be rejected by the data layer, not just the UI.
- **H-5 — The expiry rule. The most important requirement in this document.** At expiry, the handover splits in two:
  - **Persists, owned by the buyer forever:** manuals, warranties, device inventory, guides, dashboard configuration. This is the product's entire value — losing it defeats the point.
  - **Destroyed, per retention schedule (N-4):** the chat transcript, the key-safe contents, the tokens themselves.
- **H-6** Before expiry, the buyer gets an explicit **export** step (zip bundle of documents + guides, optionally including their copy of the chat) so nothing they want to keep is lost.
- **H-7** The seller may end the handover early, with buyer notification — never silent destruction.

### 3.1 Lifecycle state machine

```
draft ──activate──> active ──expiry date reached──> expiring ──grace elapsed──> archived
  │                    │                               │
  └──cancel──> cancelled (data destroyed)              └── buyer notified at entry,
                                                           destruction schedule runs at archiving
active ──seller early-close──> closing ──buyer ack or 48h──> archived (same destruction rules)
```

| State | Seller can | Buyer can | Chat | Key safe |
|---|---|---|---|---|
| `draft` | Edit everything | No access | — | — |
| `active` | Edit, add, reply, early-close | Read, download, chat, reveal | Live | Live |
| `expiring` (last 14 days) | Edit + end early | Read + export prompt | Live | Live + destruction warning |
| `closing`/`archived` | Nothing (journey over) | Read content only | Grace 7 days, then destroyed | Destroyed at archive |
| `cancelled` | — | Read nothing | Destroyed | Destroyed |

**H-4a** State transitions and expiry processing run server-side (scheduled function), never client-side. A client cannot delay or accelerate expiry.

## 4. Feature requirements (functional)

### 4.1 Home Overview dashboard
- **F-1** Property summary: address, EIRcode, completion date, BER rating, participant names + roles, handover state + expiry countdown.
- **F-2** Smart-system tiles (heating, solar/PV, battery, EV charger): current status + link to device entry. Phase 1 values are **manually entered** by the seller. Live telemetry is Phase 5.

### 4.2 Device inventory & guides
- **F-3** Seller adds devices: name, make/model, category, install date, warranty expiry, location in house, notes.
- **F-4** Per-device step-by-step guides ("how to reboot your Solis inverter"): ordered steps, optional photo per step. Keep and elevate — this is the prototype's best feature.
- **F-5** Buyer marks a guide "done" or flags "doesn't match my house"; seller sees flags in the window and can correct.

### 4.3 Manuals & warranties
- **F-6** Real file uploads (PDF/JPEG/PNG, ≤ 25 MB each), attached per device or per property; buyer downloads originals unchanged.
- **F-7** Warranty expiry dates surface as "expiring soon" (< 90 days) on the dashboard during the window.

### 4.4 Key safe & alarm codes
- **F-8** Seller stores secrets (alarm PIN, key-safe code, meter box key location) **encrypted client-side** (N-2), each with optional individual expiry.
- **F-9** Reveal requires hold-to-reveal and writes an audit event. Metadata ("Alarm code exists") visible before reveal.
- **F-10** Key-safe contents are **never** retained post-expiry by default (H-5). Buyer sees a destruction warning while `expiring`: "Save the codes you still need — destroyed on \<date\>."

### 4.5 Secure chat
- **F-11** Real 1:1 chat between the two participants of *that* handover only. Realtime delivery; read receipts optional, default **off**.
- **F-12** Contact-detail shielding: phone/email patterns detected in outbound messages trigger a soft warning ("Keep it here — messages disappear at handover end"). **Warn-only** (R-B); hard masking revisited with usage data.
- **F-13** Chat destroyed at expiry per H-5. Unrecoverable after.
- **F-14** A token grants access to exactly its own handover. Cross-handover access impossible by construction — enforced in the data layer (row-level security scoped to handover membership) and tested (T-5).

### 4.6 Lifecycle UX
- **F-15** Both parties see a live countdown to expiry with a plain-language statement of what survives and what is destroyed.
- **F-16** At expiry: chat read-only for 7-day grace, then destroyed; tokens invalidated; content re-parented to the buyer's account; seller's copy removed. Seller early-close follows the same destruction rules (H-7).

### 4.7 Accounts & onboarding
- **F-17** Sign-up/sign-in by email magic link (N-1). On first token redemption, an existing account is bound to the handover; a new user is created through redemption and prompted to set a display name.
- **F-18** Seller onboarding flow: create handover → enter property basics → (optionally) invite buyer by generating + copying the token. Empty states teach, not scold.

## 5. Non-functional requirements

- **N-1 Auth:** email magic link minimum; Google sign-in optional. Auth identity is separate from the token; the token *binds* an identity to a handover.
- **N-2 Encryption:** key-safe secrets encrypted client-side with a per-handover key derived and held only on participant devices; server stores ciphertext only. Approach documented in ADR-002 before implementation.
- **N-3 Token abuse resistance:** ≥ 64 bits entropy; entry rate-limited (10 attempts/hour/IP); failed attempts logged; constant-time comparison against hashed tokens.
- **N-4 Privacy / GDPR (Irish market):** documented, user-visible retention schedule per data class:
  | Data class | Retention |
  |---|---|
  | Content (docs, guides, devices, dashboard) | Indefinite, owned by buyer after expiry |
  | Chat messages | Destroyed at archive + 7-day grace |
  | Key-safe secrets | Destroyed at archive |
  | Audit events | 12 months, then purged |
  | Account data | Until user deletion request |
  Plus a plain-language privacy notice for both parties. The retention schedule is user-visible (F-15) — privacy posture is a feature, not a policy page.
- **N-5 Availability:** token redemption and chat are the "must not be down on completion day" paths.
- **N-6 Platform:** responsive web first — the buyer's first visit may be from a phone standing at the front door. PWA-grade later.
- **N-7 Observability:** structured logging of security-relevant events (token attempts, reveals, exports, expirations, destruction jobs).

## 6. Resolved decisions (were §10 open decisions in v0.1)

- **R-A Backend = Supabase.** Auth (magic link) + Postgres + Storage + Realtime in one platform; row-level security maps directly onto "a token grants access to exactly one handover" (F-14, T-5). The prototype's Firebase config is vestigial and will be deleted in Phase 0. Hosting/deployment via Antigravity's auto-deploy; ADR-001 records the decision.
- **R-B Contact masking = warn-only** in Phase 1 (F-12). Hard masking is rejected for now: it risks mangling legitimate content (a gate code looks like a phone number). Revisit with real usage data in Phase 3+.
- **R-C Key safe = build it**, with client-side encryption (N-2), hold-to-reveal + audit (F-9), and destruction at expiry (F-10). It is differentiating and genuinely useful; it is also the highest-consequence data in the system and is therefore explicitly in scope for the Phase 2 security review. If the review says the risk is unacceptable, fallback = store pointers only ("codes are in the red folder in the kitchen drawer").
- **R-D Self-serve first.** Phases 1–3 build and harden the two-persona product. Facilitators (Phase 4) are a management layer over a product that already works.

## 7. Data model (target, Phase 1)

All tables tenant-scoped by `handover_id`; row-level security grants access only to participants of that handover. This one mechanism is what makes F-14 and T-5 true.

| Table | Key fields | Notes |
|---|---|---|
| `profiles` | `user_id`, `display_name` | Role-agnostic; roles are per-handover |
| `handovers` | `id`, `address`, `eircode`, `completion_date`, `ber_rating`, `state`, `seller_user_id`, `buyer_user_id`, `expiry_at` | Root entity; state machine §3.1 |
| `handover_tokens` | `id`, `handover_id`, `role`, `code_hash`, `expires_at`, `consumed_by`, `consumed_at`, `revoked` | Code itself never stored — hash only (N-3) |
| `devices` | `id`, `handover_id`, `name`, `make`, `model`, `category`, `install_date`, `warranty_expiry`, `location`, `notes` | |
| `guides` | `id`, `handover_id`, `device_id?`, `title`, `steps` (jsonb: text + photo path per step), `flags` | Buyer flags per F-5 |
| `documents` | `id`, `handover_id`, `device_id?`, `storage_path`, `filename`, `mime`, `size`, `uploaded_by` | Storage bucket scoped per handover path |
| `secrets` | `id`, `handover_id`, `label`, `ciphertext`, `nonce`, `individual_expiry`, `destroyed_at` | Plaintext never stored server-side (N-2) |
| `messages` | `id`, `handover_id`, `sender_id`, `body`, `flagged`, `created_at`, `deleted_at` | Bulk-deleted by destruction job |
| `audit_events` | `id`, `handover_id`, `user_id`, `type`, `payload`, `created_at` | Appends only; purge at 12 months |

Destruction/expiry processing: a scheduled server function walks handovers past their dates, performs re-parenting and deletion per H-5, and writes completion to `audit_events`. Every destruction step must be idempotent (re-running must not double-delete or resurrect data).

## 8. Screens (Phase 1–2 surface)

1. **Sign in** (magic link) · **Redeem token** (rate-limited)
2. **Handover dashboard** — F-1, F-2, F-7, F-15 countdown
3. **Devices** list + **device detail** with guides — F-3, F-4, F-5
4. **Documents** — F-6
5. **Key safe** — F-8, F-9, F-10
6. **Chat** — F-11, F-12
7. **Export / expiry panel** — H-6, F-15, F-16
8. **Seller: create handover** — H-2, F-18

## 9. Documentation requirements

- **D-1 `README.md`** — what Haven is (the problem in three sentences), architecture overview, local setup, scripts, test instructions, deploy, links to all docs.
- **D-2 `docs/FEATURE_SET.md`** — every feature: requirement ID, status (shipped / partial / planned / untested), delivering phase, and **test coverage** (which test file verifies it). Living source of truth.
- **D-3 `docs/ROADMAP.md`** — phased plan (§11) with exit criteria.
- **D-4 `docs/TEST_PLAN.md`** — layers, full scenario matrix (§12), fixtures, run instructions, date-handling rules, definition of done for testing.
- **D-5 `docs/adr/`** — ADR-001 backend platform (R-A), ADR-002 key-safe encryption, ADR-003 retention/destruction design, ADR-004 frontend structure/TypeScript conversion. Written **before** the implementation they constrain.
- **D-6 `CLAUDE.md` / `AGENTS.md`** at repo root — agent behaviour rules, conventions, verify command, doc map. `AGENTS.md` is the enforcement surface.
- **D-7 Code documentation standard:** every module carries a header comment stating its job; every exported function has a TSDoc comment; non-obvious logic gets inline comments explaining *why*; components ≤ ~200 lines with a comment block for responsibility and props.
- **D-8 Traceability:** test files reference requirement IDs (e.g. `F-11.chat.test.tsx`, `T-9.expiry.e2e.ts`); FEATURE_SET.md tracks test coverage per feature. A feature without a test referencing its ID is **not shipped** (AGENTS.md gate).

## 10. Engineering baseline

- **E-1 Repo hygiene:** remove committed `node_modules/` and `dist/`; add `.gitignore`; delete the vestigial Firebase config; flatten the nested duplicate `haven-home-handover/` directory so the app lives at repo root.
- **E-2 TypeScript** throughout. The 451-line `App.jsx` is decomposed into components (layout, dashboard, devices, chat, key-safe, lifecycle) plus a UI-free `lib/` domain layer (token logic, expiry math, retention rules, masking) that is trivially unit-testable.
- **E-3 Tooling:** Vitest + React Testing Library, Playwright, ESLint + Prettier, GitHub Actions CI (lint → typecheck → unit → build on every push; E2E on PRs).
- **E-4 One verification command:** `scripts/verify.sh` = typecheck → lint → unit tests + coverage → build → E2E. This is the only accepted evidence that anything works (AGENTS.md rule 1).
- **E-5 Preview deployment** via Antigravity auto-deploy, so both personas can be exercised live.

## 11. Roadmap

| Phase | Theme | Delivers | Exit criterion |
|---|---|---|---|
| **0** | Docs + hygiene | E-1…E-5; D-1…D-6; ADR-004 | Prototype re-created as componentized TS app; `verify.sh` green in CI; preview deployed; all docs exist |
| **1** | The real handover | H-1…H-4; F-1, F-3, F-6, F-11, F-14, F-17, F-18; N-1; data model §7 | Two people complete create → redeem → chat → upload on the live preview |
| **2** | Lifecycle & safety | H-5…H-7; F-8, F-9, F-10, F-12, F-15, F-16; N-2, N-3, N-4; destruction job | A handover runs to expiry and the destruction schedule is demonstrably correct; security review pass |
| **3** | Richness | F-2, F-4, F-5, F-7 full UX; guides polish; warranty tracking | A seller can document an entire eco-home (the 12 Oak Drive scenario) without gaps |
| **4** | Channel | Facilitator accounts: create/manage many handovers, bulk token send, admin view | One agent manages 10 handovers |
| **5** | Integrations | Read-only telemetry: Zappi, Solis, smart thermostats | Live solar/charger data on a real home |

Out of scope throughout: payments, marketplace features, native mobile apps, anything requiring the seller after expiry.

## 12. Test requirements (normative — the part Antigravity must not skim)

**12.1 Layers.** Unit (Vitest, `lib/` domain logic), component (RTL, per-screen behaviour), E2E (Playwright, both personas' full journeys), security (token abuse, cross-tenancy, rate limits).

**12.2 Non-negotiable scenarios.** Each maps to a test whose name carries the ID:

| ID | Scenario | Verifies |
|---|---|---|
| T-1 | Seller creates handover → token generated and valid | H-2, H-3 |
| T-2 | Buyer redeems token → access granted, token consumed | H-3, F-14 |
| T-3 | Token reuse rejected (same or different user) | H-3 |
| T-4 | Wrong/expired/garbage token rejected; rate limit trips at threshold | N-3 |
| T-5 | Buyer of handover A cannot read or write any part of handover B (chat, docs, key safe, devices) | F-14, N-3 |
| T-6 | Realtime chat: send → received both directions < 2 s | F-11 |
| T-7 | Upload manual → buyer downloads byte-identical file | F-6 |
| T-8 | Key safe reveal works; audit event written | F-8, F-9 |
| T-9 | Expiry: chat destroyed (after grace), key safe destroyed, **manuals/guides survive and are owned by buyer** | H-5, F-16 |
| T-10 | Export before expiry yields a complete bundle | H-6 |
| T-11 | Seller early-close notifies buyer; content still passes to buyer | H-7, F-16 |
| T-12 | Masking warns on phone/email typed in chat | F-12 |
| T-13 | Destruction job is idempotent (re-run deletes nothing extra, resurrects nothing) | H-4a, §7 |
| T-14 | State machine rejects invalid transitions server-side | H-4 |

**12.3 Date-handling rule.** Expiry logic is date-sensitive. Every test seeds dates with an injected clock or fake timers — **never** relative to `Date()`. Tests must explicitly cover: expiry on month/quarter/year boundaries, 31 January + 14 days, leap day, and the 7-day grace window straddling a month end. A handover created 31 January with a 14-day window must behave identically in a 30-day month.

**12.4 Coverage.** Per-file 80% floor on all `lib/` files and every new `components/` file, enforced in CI. Aggregate coverage numbers are **not acceptable evidence** — per-file numbers are (AGENTS.md rule 4).

**12.5 Definition of done (per feature).** Requirement ID → implementation → test file referencing that ID → `verify.sh` green → FEATURE_SET.md status updated. A phase's exit criterion is met only when every feature it delivers satisfies this loop.

## 13. Agent work protocol (summary — full normative text in AGENTS.md)

- Work is issued **one phase at a time**, each with a scope-fenced file list; agents do not range freely across the repo.
- Claims require evidence: exact commands run, exit codes, measured test counts and per-file coverage. "Tests pass" without the command output is not a report.
- Weakened assertions, deleted failing tests, and skipped checks are forbidden without explicit human approval.
- New dependencies require a one-line justification recorded in the phase handoff.