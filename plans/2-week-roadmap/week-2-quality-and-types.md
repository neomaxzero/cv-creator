# Week 2 — Types, Tests, and Quality Gates

## Outcomes

- Core CV domain model is type-safe.
- Editing workflows are covered by automated tests.
- CI-style quality checks are defined and enforced.

## Milestones

### 1) TypeScript Migration for Domain Model

- [ ] Introduce TypeScript configuration for Vite React app.
- [ ] Define CV domain types/interfaces (profile, experience, projects, skills, metadata).
- [ ] Migrate state/data modules first (`data`, `hooks`, utilities).
- [ ] Migrate components incrementally, prioritizing high-change surfaces.
- [ ] Add runtime schema validation for imported JSON (e.g., Zod).

**Acceptance criteria**

- Core data flows are typed end-to-end.
- Invalid import payloads are rejected with helpful messages.
- Type checking passes with no unresolved critical errors.

---

### 2) Test Coverage for Core Flows

- [ ] Set up Vitest + React Testing Library.
- [ ] Add tests for CV section CRUD operations.
- [ ] Add tests for persistence hydration/autosave behavior.
- [ ] Add tests for JSON import/export roundtrip.
- [ ] Add a smoke test for rendering the composed app.

**Acceptance criteria**

- Core editing and persistence behavior has reliable automated coverage.
- Test suite can run locally with a single documented command.

---

### 3) Stronger Linting + Automation

- [ ] Expand ESLint rules for consistency, a11y, and complexity where practical.
- [ ] Add import ordering/style consistency rules.
- [ ] Add scripts for `lint`, `test`, `typecheck`, and optional `format:check`.
- [ ] Add CI workflow (or equivalent orchestrator job) to enforce checks on PRs.

**Acceptance criteria**

- PR checks fail fast for lint/type/test regressions.
- Developer commands are stable and documented.

---

### 4) Accessibility + Performance Quick Pass

- [ ] Ensure form controls have proper labels and keyboard navigation.
- [ ] Verify focus behavior after add/remove actions.
- [ ] Audit obvious unnecessary rerenders and apply memoization where beneficial.
- [ ] Capture follow-up issues for larger UX/perf work.

**Acceptance criteria**

- Keyboard-first editing is viable for common workflows.
- No obvious high-frequency rerender bottlenecks remain in core paths.

## Suggested PR Breakdown

1. `chore/typescript-domain-model`
2. `test/core-editor-flows`
3. `ci/quality-gates-and-a11y-pass`

## Risks and Mitigations

- **Risk:** Full TS migration exceeds one-week scope.  
  **Mitigation:** Type high-value modules first and defer low-risk UI leaf nodes.
- **Risk:** Test setup churn slows feature progress.  
  **Mitigation:** Start with smoke + core path tests, then iterate depth.

## End-of-Week Checkpoint

- [ ] Type-safe core model merged.
- [ ] Core workflow tests green and reliable.
- [ ] CI quality gates active.
- [ ] Follow-up backlog created for next iteration (PDF export, advanced templates, collaboration).
