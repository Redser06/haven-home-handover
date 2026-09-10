# AGENTS.md — Rules for every agent building Haven

**This file is normative.** It applies to Antigravity, Claude, and any other agent that touches this repository. It exists because agentic builders reliably under-invest in definition of done and testing; these rules are designed to make that impossible to do silently. If a rule conflicts with getting something working quickly, **the rule wins** — flag the conflict to the human instead of resolving it yourself.

**Sources of truth, in order of precedence:**
1. `AGENTS.md` (this file) — how you must work
2. `docs/REQUIREMENTS.md` — what to build (IDs: `H-*` `F-*` `N-*` `E-*` `D-*` `T-*`)
3. Phase handoff briefs (issued by the human, one phase at a time)

---

## Rule 1 — Nothing is "done" without `verify.sh`

`scripts/verify.sh` (typecheck → lint → unit tests + coverage → build → E2E) is the **only** accepted evidence that anything works.

- You may not claim a feature is complete, working, or "should be fine" unless `verify.sh` was run and passed **after your final change**.
- If `verify.sh` does not exist yet (pre-Phase-0), create it before writing any feature code.
- Exit code 0 is the only green. A green-feeling build log is not a green build.

## Rule 2 — Tests are part of the definition of done, not a follow-up task

A feature is done only when **all five** hold:

1. The feature's requirement ID(s) from `docs/REQUIREMENTS.md` are implemented
2. A test file exists whose **name references that requirement ID** (e.g. `F-11.chat.test.tsx`, `T-9.expiry.e2e.ts`)
3. The test fails if the feature breaks (write it, break the code on purpose once, watch it fail, fix it — this one-time red check is mandatory for every new feature test)
4. `verify.sh` is green
5. `docs/FEATURE_SET.md` status for that feature is updated, including the test file reference

"Tests will be added later" is not a valid state. **A feature without a test referencing its ID is not shipped** — it is in progress.

## Rule 3 — Never weaken a test to pass it

- You may not delete a failing test, reduce its assertions, loosen its threshold, skip it (`it.skip`, `xfail`, `try/catch` wrapping), or mark it flaky without **explicit human approval in writing**.
- If a test fails, your job is to diagnose the failure and report it honestly. A red test is information, not an obstacle.
- The only permitted "fix" for a failing test is changing the **code** or proving the test itself was wrong (in which case: report why, and wait for approval before editing it).

## Rule 4 — Coverage is measured per file; headlines are forbidden

- Every file under `lib/` and every file in `components/` created or modified by you must reach **≥ 80% line coverage, per file**. This is the floor; the aggregate number is irrelevant and must never be quoted as evidence.
- When reporting coverage, report the **per-file table** from the coverage tool for the files you touched, not the project total. "Project coverage is 85%" is a headline, and headlines are not evidence (files at 5% hide inside them).
- Coverage config must include the coverage floor as a hard CI gate (Vitest `coverage.thresholds`), so under-coverage fails the build rather than failing quietly.

## Rule 5 — Claims require evidence; measure, never estimate

Every completion report must contain:

- The **exact commands** you ran and their **exit codes**
- **Measured test counts** (e.g. `142 passed, 0 failed, 0 skipped`) — never "all tests pass"
- The **per-file coverage table** (Rule 4)
- Anything you did **not** do, stated explicitly ("T-7 upload test not written — blocked on Storage bucket setup")

Before asserting any numeric claim (test counts, coverage, token entropy bits, retention intervals), verify it **by two independent routes** where feasible — e.g. read the coverage tool's own output AND check the specific file's line, rather than trusting one tool's summary. A single source of truth you didn't measure is a headline.

## Rule 6 — Scope fences

- You work on **one phase at a time**, as briefed. The brief lists the files you may create or modify. Files outside the fence are off-limits.
- No speculative refactors, no drive-by improvements, no "while I was in there" changes. If you see a problem outside your fence, **report it**; do not fix it.
- New dependencies require a one-line justification in your report (`package: reason`). Zero-justification additions are forbidden.
- Demo/seed data may exist in test fixtures and storybook-style previews only. **Hardcoded demo content in production code paths is a defect** — if `App.jsx` fiction like "12 Oak Drive" or token `HANDOVER-9823-OAK` appears outside test fixtures, that is a bug you introduced.

## Rule 7 — Date handling

- Any test touching dates, expiry, or retention must seed time via an **injected clock or fake timers**. Seeding relative to `Date()` is forbidden in test code.
- Expiry/grace tests must explicitly cover: month/quarter/year boundaries, 31 January + N days, leap day, and grace windows straddling a month end (REQUIREMENTS.md §12.3). These cases are part of the definition of done for any date-sensitive feature, not nice-to-haves.

## Rule 8 — Security-relevant behaviour is tested against the spec, not the implementation

- Token entropy (≥ 64 bits), rate limiting, cross-handover isolation (T-5), and destruction-job idempotence (T-13) are tested by **observing behaviour**, not by mocking internals to produce a pass.
- You may not stub out row-level security, auth, or the destruction job in tests that are supposed to verify them. If the test environment can't exercise the real mechanism, report that as a blocker — do not simulate success.
- Plaintext secrets (key safe) must never appear in logs, snapshots, or fixtures. If a snapshot diff shows a plaintext PIN, that is a failed review.

## Rule 9 — Report failures, stop, and ask

When you hit a blocker (failing test you can't fix, missing credential, environment problem, requirement conflict):

1. **Stop** on that item
2. Report: what you attempted, the exact error, your hypothesis
3. Move to the next in-scope item if one exists, or end the session with a clear list of what is done / blocked / not started

A partially-complete honest report beats a "done" report with an unexplained gap. **Unexplained gaps are treated as undisclosed failures** — the human will re-verify your claims, and an undisclosed failure voids trust in the whole report.

## Rule 10 — Leave the codebase more navigable than you found it

- Every module: header comment stating its job. Every exported function: TSDoc. Non-obvious logic: a comment explaining *why* (REQUIREMENTS.md D-7).
- Components stay ≤ ~200 lines. If you exceed that, decompose or explain why in the file header.
- Update `docs/FEATURE_SET.md` in the same commit as the feature it describes. A stale status doc is a defect.

---

## Definition of done checklist (output this verbatim at the end of every task)

```
DoD — [feature / phase item]
[ ] Requirement ID implemented: <IDs>
[ ] Test file(s) named after requirement ID: <paths>
[ ] Red-check performed (new tests were made to fail once): yes/no
[ ] verify.sh run after final change: exit <code>, <date>
[ ] Tests: <n> passed, <n> failed, <n> skipped (measured)
[ ] Per-file coverage for touched files: <table>
[ ] No tests weakened, skipped, or deleted: yes
[ ] No out-of-scope changes: yes (or list)
[ ] New dependencies: none (or list with justification)
[ ] FEATURE_SET.md / docs updated: <paths>
[ ] Known gaps stated: <list or "none">
```

A task report without this checklist is incomplete.