---
date: 2026-03-20
status: substantive
sources_checked:
  - klatch
---

# Cross-Pollination Brief: Klatch → Piper Morgan

**Date:** 2026-03-20
**Source project:** Klatch
**For:** Piper Morgan team

## Key Insights

### 1. Intelligence Feed Protocol — Standing Monitoring as Infrastructure
**Relevance:** PM's 14-agent team has no formal mechanism for tracking external changes.
**Source:** `docs/INTELLIGENCE.md`, `docs/intel/2026-03-20-sweep.md`
**Summary:** Argus ran the first structured intelligence sweep: 20 items scored by relevance. Daedalus cherry-picked three quick wins and shipped same day. Intelligence-to-implementation cycle took hours.
**Suggested action:** CIO role could adopt a similar standing sweep protocol.

### 2. Klatch Creation UI — Multi-Entity Group Chat Ships
**Relevance:** Coordination surface PM's multi-agent days have shown is needed.
**Source:** `docs/logs/2026-03-20-1955-daedalus-opus-log.md`
**Summary:** Shipped klatch creation (issue #10): chat/klatch toggle, project dropdown, entity picker, interaction mode selector.
**Suggested action:** Track for potential shared coordination layer.

### 3. AXT Two-Track Testing
**Relevance:** PM tests code behavior but not agent experience.
**Source:** Theseus session
**Summary:** AAXT (automated, no LLM calls) gates MAXT (manual, qualitative). Separates plumbing from perception.
**Suggested action:** Assert against assembled context rather than LLM output.

### 4. Piper Alpha Planning
**Relevance:** PA is a natural Klatch user; ceiling/path framing useful for PM.
**Source:** CIO memos
**Summary:** "Ceiling moments" vs. "path moments" for when structured capabilities vs. conversational approach.
**Suggested action:** Ceiling/path framing could inform workflow vs. floor routing.

### 5. Reliability Incident — Session Wrap Verification
**Relevance:** Extends evidence requirements to session completion.
**Source:** `docs/mail/calliope-to-argus-reliability-incident-2026-03-20.md`
**Summary:** Force push destroyed demo commits. Fix: mandatory verification before claiming done.
**Suggested action:** Consider general session-wrap verification protocol.
