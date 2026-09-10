# Haven — Home Handover

**Haven is the structured handover of a house between its outgoing and incoming owners.** On completion day, ownership changes hands but knowledge doesn't — the seller is the only person who knows where the stopcock is, how to reboot the solar inverter, and what the alarm code is. Haven gives them one place to hand all of it over, with no personal contact details exchanged and a defined end of life for the channel between two strangers.

Status: **pre-build** — this repo currently holds a frontend-only UI prototype plus the requirements that govern the real build.

## What this repository is

| Path | What it is |
|---|---|
| `docs/REQUIREMENTS.md` | **The contract.** All requirements (`H-*` concepts, `F-*` features, `N-*` non-functional, `T-*` test scenarios), resolved stack decisions, data model, roadmap |
| `AGENTS.md` | **Normative rules for any agent building Haven** (Antigravity, Claude, or otherwise): definition of done, testing gates, evidence protocol. Requirements define *what*; this file defines *how agents must work* |
| `docs/FEATURE_SET.md` | Living feature status + per-feature test coverage *(Phase 0 deliverable)* |
| `docs/ROADMAP.md` | Phased plan with exit criteria *(Phase 0 deliverable)* |
| `docs/TEST_PLAN.md` | Full test plan: layers, scenario matrix, date-handling rules *(Phase 0 deliverable)* |
| `docs/adr/` | Architecture decision records *(written before the decisions they constrain)* |

The original prototype (`App.jsx`, one commit, "12 Oak Drive" demo) is treated as a **UI spec only** — it shows what the screens look like; nothing in it is trusted as code.

## The one idea that drives the architecture

A handover splits in two at expiry:

- **Persists, owned by the buyer forever** — manuals, warranties, device guides, the home's documentation. This is the entire value of the product.
- **Destroyed** — the chat transcript, the key-safe contents, the tokens. Two strangers' channel should not live on a server indefinitely.

Everything else — row-level security, the retention schedule, the export step, the destruction job — hangs off that split (Requirement **H-5**).

## Stack (decided — see R-A in REQUIREMENTS.md §6)

- **Frontend:** Vite + React + **TypeScript**, componentized, with a UI-free `lib/` domain layer
- **Backend:** **Supabase** — Auth (email magic link), Postgres with row-level security scoped to handover membership, Storage for documents, Realtime for chat
- **Testing:** Vitest + React Testing Library, Playwright, CI on every push
- **Deploy:** preview deployment via Antigravity auto-deploy

## Local setup (target — lands in Phase 0)

```bash
npm install
npm run dev        # start the dev server
npm run test       # unit + component tests
npm run e2e        # Playwright end-to-end tests
./scripts/verify.sh  # the ONLY accepted evidence that anything works:
                   # typecheck → lint → unit + coverage → build → e2e
```

## Build phases

| Phase | Theme | Exit criterion |
|---|---|---|
| 0 | Docs + repo hygiene + TypeScript conversion | Prototype re-created as componentized TS app; `verify.sh` green in CI |
| 1 | The real handover (auth, tokens, chat, uploads) | Two people complete create → redeem → chat → upload on the live preview |
| 2 | Lifecycle & safety (key safe, expiry, destruction) | A handover runs to expiry; destruction schedule demonstrably correct |
| 3 | Richness (guides, dashboard, warranties) | A seller can document an entire eco-home without gaps |
| 4 | Facilitators (agents/conveyancers) | One agent manages 10 handovers |
| 5 | Live telemetry integrations (Zappi, Solis) | Real solar/charger data on a real home |

## For agents working on this repo

Read `AGENTS.md` **before writing any code**. The short version: work one phase at a time inside the scope fence, tests are part of the definition of done (not an afterthought), claims require command output as evidence, and coverage is measured per file — never quoted as an aggregate headline.