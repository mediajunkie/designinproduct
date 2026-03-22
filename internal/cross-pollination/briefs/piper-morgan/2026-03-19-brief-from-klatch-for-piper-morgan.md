---
date: 2026-03-19
status: substantive
sources_checked:
  - klatch
---

# Cross-Pollination Brief: Klatch → Piper Morgan

**Date:** 2026-03-19 (retrospective)
**Source project:** Klatch
**For:** Piper Morgan team

## Key Insights

### 1. Five-Layer Prompt Assembly Model — Testable Context Injection
**Relevance:** Addresses Piper Morgan's #1 agent pain point (session-start orientation).
**Source:** `CLAUDE.md`, `packages/server/src/claude/client.ts`
**Summary:** System prompts from 5 discrete layers (kit briefing, project instructions, project memory, channel addendum, entity prompt), each independently verifiable via `prompt-debug` endpoint. Structure vs. accumulated knowledge never conflated.
**Suggested action:** Separate static structure from dynamic state. Static layers change rarely; dynamic layers could be generated at session start.

### 2. Session Wrap Verification Protocol
**Relevance:** Trust but verify agent self-reported completion.
**Source:** `CLAUDE.md`, Calliope's reliability incident memo
**Summary:** After a bad rebase silently lost commits that an agent claimed were done, Klatch mandated: (1) `git log` to confirm commits, (2) `ls`/`cat` to confirm files, (3) push session log last. No force-push without PM approval.
**Suggested action:** Extend Piper Morgan's evidence requirements to session-level git verification.

### 3. Cloud Session Import — Cross-Environment Bridge
**Relevance:** Same two-environment problem driving Mailbox v3.
**Source:** Daedalus session log (v0.8.7)
**Summary:** Three import paths (agent self-export, file upload, manual). Buffer-based parser, basename matching for project linking, zero schema changes.
**Suggested action:** Proves unified data model can represent heterogeneous sources. Pattern available if PM needs cross-environment session consolidation.

### 4. Intelligence Feed as Standing Practice
**Relevance:** Systematized ecosystem monitoring, directly adoptable.
**Source:** `docs/INTELLIGENCE.md`, `docs/intel/2026-03-20-sweep.md`
**Summary:** 20-item scored sweep with actionable routing. Key PM-relevant findings: Compaction API (custom summarization), Agent SDK (programmable agents), MCP standardization.
**Suggested action:** Adopt similar protocol. Compaction API especially relevant for long-running agent conversations.

### 5. Two-Track Testing (AAXT/MAXT)
**Relevance:** Separates mechanical from qualitative testing.
**Source:** Theseus session log, `docs/mail/theseus-to-argus-aaxt-harness.md`
**Summary:** Automated structural tests (no LLM, CI-friendly) gate manual qualitative tests (real agents, interpretation). Don't waste expensive sessions on broken plumbing.
**Suggested action:** Consider a qualitative testing layer to catch UX-level issues that unit tests miss (like the #922 routing race).
