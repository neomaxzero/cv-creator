# Week 1 — Foundation, Refactor, and Persistence

## Outcomes

- Codebase is modularized out of `src/App.jsx`.
- CV data persists across refreshes.
- README reflects the actual product and development workflow.
- Baseline linting and local quality automation are in place.

## Milestones

### 1) Project Structure Refactor (No Behavior Change)

- [ ] Create `src/data/initialCv.js` and move seed data out of `App.jsx`.
- [ ] Create `src/hooks/useCvState.js` to centralize CV state and update handlers.
- [ ] Split UI into focused components under `src/components/` (editor panels, preview, shared form controls).
- [ ] Keep existing UX and visual behavior unchanged during refactor.
- [ ] Add short architecture notes to explain module boundaries.

**Acceptance criteria**

- App behavior remains functionally identical.
- `App.jsx` acts primarily as composition/root container.
- No regressions in add/edit/delete flows for major CV sections.

---

### 2) Deterministic ID Strategy

- [ ] Replace `Math.random()`-based ID generation with `crypto.randomUUID()` where available.
- [ ] Add fallback strategy if needed for non-browser/runtime compatibility.
- [ ] Ensure all newly created entities use the same ID utility.

**Acceptance criteria**

- No random-collision-prone ID generator remains in active creation paths.
- ID utility has a single source of truth.

---

### 3) Persistence + Import/Export

- [ ] Add autosave to `localStorage` (debounced or effect-based).
- [ ] Hydrate state from saved data on app load.
- [ ] Add “Export JSON” for user CV data.
- [ ] Add “Import JSON” with basic validation + error messaging.
- [ ] Add reset-to-default action with confirmation.

**Acceptance criteria**

- Edits survive page refresh.
- Import failures are handled gracefully and visibly.
- Exported JSON can be re-imported successfully.

---

### 4) Documentation + Tooling Baseline

- [ ] Rewrite repository README from Vite template to product-specific docs.
- [ ] Document feature set, local run steps, and development workflow.
- [ ] Clarify future roadmap and contribution expectations.
- [ ] Introduce basic formatting/lint commands (and optionally pre-commit hooks).

**Acceptance criteria**

- New contributors can run and understand the project from README alone.
- Lint command is documented and reliable.

## Suggested PR Breakdown

1. `refactor/module-split-app`
2. `feature/persistence-import-export`
3. `docs/readme-and-dev-workflow`

## Risks and Mitigations

- **Risk:** Refactor introduces hidden state regressions.  
  **Mitigation:** Keep Week 1 refactor behavior-preserving and validate core flows manually.
- **Risk:** `localStorage` shape drift after future updates.  
  **Mitigation:** Version stored payload and validate during hydration.

## End-of-Week Checkpoint

- [ ] Refactor merged with no UX regression.
- [ ] Persistence/import/export merged and verified.
- [ ] README and baseline tooling updated.
- [ ] Backlog prepared for Week 2 TypeScript/tests.
