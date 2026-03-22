---
date: 2026-03-19
status: substantive
sources_checked:
  - piper-morgan
---

# Cross-Pollination Brief: Piper Morgan → Klatch

**Date:** 2026-03-19 (retrospective)
**Source project:** Piper Morgan
**For:** Klatch team

## Key Insights

### 1. Mailbox v3: File-Based Inter-Agent Messaging System
**Relevance:** Piper Morgan built a working solution to the exact problem Klatch aims to solve — coordinating communication between multiple agents with heterogeneous capabilities.
**Source:** `mailboxes/DIRECTORY.md`, `dev/2026/03/19/mailbox-v3-plan.md`
**Summary:** Shipped 10 role-based mailboxes with slug-based routing encoded in filenames, a `/deliver-mail` skill with 3-phase assisted delivery, and an append-only delivery log. First run processed 22 items. "Assisted, not automated" — human bridges the gap between code and web agents. V3 plan explicitly names Klatch as a future integration target.
**Suggested action:** Study the two-environment asymmetry (code vs. web agents). Consider whether Klatch's entity model could serve as the shared routing layer.

### 2. Registry-Based Workflow Dispatch (ADR-059)
**Relevance:** Directly applicable to agent coordination routing.
**Source:** `docs/internal/architecture/current/adrs/adr-059-workflow-dispatcher-offer-consolidation.md`
**Summary:** Three offer/acceptance systems were racing for user input. Fix: unified registry-based dispatcher (`workflow_type → entry_point`). Anti-pattern formalized as Pattern-063: "Extension Without Integration."
**Suggested action:** Consider registry-based dispatch as Klatch adds entities and interaction modes.

### 3. Agent 360 — Session-Start Orientation Is #1 Pain Point
**Relevance:** 9 agents all cited the same conversation management problem.
**Source:** HOSR session log
**Summary:** 100% response rate, 7 cross-cutting themes. All 9 cited briefing staleness and orientation overhead. HOSR flagged Klatch's Five-Layer Model as potentially relevant.
**Suggested action:** Consider whether project memory could be live-queryable rather than static.

### 4. Floor-First Routing (ADR-060)
**Relevance:** Graceful degradation principle for multi-agent systems.
**Source:** Architect session log
**Summary:** "At least as good as a well-prompted LLM with context." Actions route to handlers; everything else routes to the floor.
**Suggested action:** Relevant for roundtable discussions where multiple entities might claim a turn.

### 5. Nine-Agent Concurrent Operations — PM as Bottleneck
**Relevance:** Real-world stress test of multi-agent coordination at scale.
**Source:** `docs/omnibus-logs/2026-03-19-omnibus-log.md`
**Summary:** First day with all 9 roles active. PM-as-manual-router was the bottleneck (4 agents cited independently). 6,190 tests, 0 failures, 2 ADRs, 22 mail items.
**Suggested action:** Use March 19 as a reference scenario for designing coordination features.
