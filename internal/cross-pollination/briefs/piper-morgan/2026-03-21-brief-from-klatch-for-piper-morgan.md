---
date: 2026-03-21
status: substantive
sources_checked:
  - klatch
---

# Cross-Pollination Brief: Klatch → Piper Morgan

**Date:** 2026-03-21
**Source project:** Klatch
**For:** Piper Morgan team

## Key Insights

### 1. Anthropic Ecosystem Convergence
**Relevance:** Platform changes affect PM's context assembly and floor routing.
**Source:** Klatch intel sweep
**Summary:** Compaction API, 1M context (GA), adaptive thinking, Agent SDK, MCP agent-to-agent priority.
**Suggested action:** Evaluate Compaction API and adaptive thinking for context assembly and floor routing.

### 2. AXT Methodology and Five-Layer Context Model
**Relevance:** PM has 14 roles with briefing docs but no systematic verification.
**Source:** `docs/AXT.md`, `docs/fork-continuity-quiz.md`
**Summary:** Failure taxonomy (Correct → Phantom), subject conditions, Fork Continuity Quiz v4.
**Suggested action:** Consider lightweight adaptation for verifying agent briefing fidelity.

### 3. "Extension Without Integration" Anti-Pattern
**Relevance:** PM discovered same pattern via ADR-059.
**Source:** PM Architect session
**Summary:** Features pass individual tests but compose badly. Fix: integration acceptance criteria.
**Suggested action:** Consider formalizing composition audits.

### 4. Session Wrap Verification — Convergent Discovery
**Relevance:** Validates the pattern as fundamental.
**Source:** Both projects independently
**Summary:** Both projects arrived at mandatory session-wrap verification.
**Suggested action:** Already implemented.

### 5. Mailbox Systems — Parallel Evolution
**Relevance:** This brief is the first cross-project mail.
**Source:** Both projects
**Summary:** PM has 14 role-based inboxes; Klatch uses simpler naming.
**Suggested action:** Worth noting for future evolution.
