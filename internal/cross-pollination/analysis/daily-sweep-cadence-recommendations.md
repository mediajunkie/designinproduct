# Daily Sweep Cadence Recommendations

**Produced:** March 23, 2026
**Based on:** Cross-project retrospective analysis, March 10-21, 2026
**Status:** Recommendation — not yet applied to `process/daily-sweep.md`

---

## Problem

The daily-sweep process defines `status: substantive | nominal` in the brief front matter but provides no guidance on when to use which. The sweep agent must decide every day whether to produce a full brief or a short one, with no heuristic to guide the decision.

## Recommendation 1: Add Cadence Tiers to daily-sweep.md

Insert a new section after "Extract Cross-Relevant Insights" (Step 3) titled **"Determine Brief Status"** with three tiers:

### Substantive
**When:** Active cross-project surface area exists.
- Shared architectural decisions (both projects solving the same problem)
- Cross-project imports, references, or consumption of each other's artifacts
- Converging roadmaps or dependency formation
- External events (Anthropic releases, API changes) affecting both projects
- One project's discovery directly informing the other's decisions

**Output:** Full brief with insights, suggested actions, emerging patterns, and sources.

### Nominal
**When:** Both projects are active but on independent tracks.
- High commit counts on both sides but no shared surface area
- Parallel intensity (both busy, different domains)
- Background changes worth noting but not actionable

**Output:** Short brief (~20 lines):
```markdown
# Cross-Pollination Brief — [Date]

Both projects active. No cross-relevant changes identified.

## Background (Noted, Low Priority)
- [Project A]: [1-2 bullet summary]
- [Project B]: [1-2 bullet summary]

## Sources Checked
[List of watch paths scanned]
```

### Skip
**When:** One or both projects are idle.
- Fewer than 3 commits across all watched paths
- Weekend/holiday with only maintenance commits
- No session logs, no planning docs, no architectural changes

**Output:** No brief produced. No commit to project repos. Hub page not updated.

---

## Recommendation 2: Add a Relevance Test Heuristic

Before writing insights, the sweep agent should apply this test to each candidate insight:

> **Would removing one project's work from yesterday change any decision the other project makes today?**

- If **yes** for any insight → status is **substantive**
- If **no** for all insights → status is **nominal**
- If there's **nothing to test** (no activity) → **skip**

This prevents two failure modes:
1. **Over-reporting:** Producing substantive briefs when projects are just busy in parallel (the March 12-16 pattern)
2. **Under-reporting:** Skipping briefs when genuine cross-relevance exists but activity is low (a single architectural memo could be substantive)

---

## Recommendation 3: Add Historical Context Window

The current sweep looks at a 24-48 hour window. Add a provision for **catch-up sweeps**:

> If no brief was produced for 3+ consecutive days, the next sweep should extend its window to cover the gap. Use the retrospective sweep prompt (`prompts/retrospective-sweep.md`) with the appropriate date range.

This prevents knowledge gaps after weekends or low-activity periods.

---

## Recommendation 4: Track Cadence Decisions

Add a simple log to the hub repo:

```
internal/cross-pollination/cadence-log.csv
```

Format:
```csv
date,status,reason
2026-03-19,substantive,"ADR-059 cross-references Klatch patterns"
2026-03-18,nominal,"Both projects active, independent tracks"
2026-03-17,skip,"Weekend, <3 commits total"
```

This makes cadence decisions auditable and helps calibrate the heuristic over time.

---

## Recommendation 5: Nominal Briefs Still Deliver to Project Repos

Even nominal briefs should update `current.md` in each project repo. This ensures agents always see a fresh brief at session start, even if it just says "nothing cross-relevant today." A stale `current.md` from 5 days ago is worse than a nominal brief from today — it leaves agents uncertain whether the system is working.

---

## Recommendation 6: Recognize Temporal and Asymmetric Relevance

The initial retro assumed cross-pollination is symmetric and contemporaneous — Project A did something yesterday that Project B needs today. But the real pattern is richer:

### Three directions of relevance

1. **Project A → Project B** (cross-project, forward): Klatch discovers the 5-layer prompt model; PM agents should know about it.
2. **Project B → Project A** (cross-project, forward): PM ships registry-driven capability gating; Klatch agents should know about it.
3. **Project A → Project A** (intra-project, temporal): PM's Pattern-061 from February is useful to a new PM agent spinning up in March. Klatch's March 8 weekend sprint (Steps 1-5 in 48 hours) contains design decisions that later Klatch agents need to understand.

The daily sweep currently handles (1) and (2). Direction (3) — **later agents learning about learnings that preceded them** — is equally important but not yet served by this process.

### Why this matters

A project's accumulated methodology (patterns, ADRs, session protocols, failed experiments) is a knowledge base. When a new agent spins up, it reads its briefing docs but may not know *why* decisions were made. The cross-pollination brief can surface this:

- PM's 61 ADRs and 62 patterns are a decision-making reference for Klatch agents facing similar architectural choices
- Klatch's rapid-prototype weekend (v0.1 → v0.5 in 48 hours) contains tacit design rationale that later Klatch agents inherit without context
- PM's months of multi-agent coordination methodology (mailbox evolution, session protocols, omnibus synthesis) are directly applicable to Klatch's growing agent team

### Implication for the sweep

The relevance test (Recommendation 2) should be expanded:

> **Temporal test:** Did one project produce something during this period that would help a *future* agent on *either* project understand why things are the way they are?

This doesn't change the daily cadence — temporal relevance accumulates slowly and is better served by periodic retrospectives (like the March 10-21 retro) or by enriching the per-project traditions/briefing documents. But the sweep agent should *notice* when temporal relevance is building up and flag it:

```markdown
## Temporal Note
[Project]'s [artifact] from [date] contains [insight type] that isn't yet
captured in any agent-facing document. Consider adding to [traditions doc /
briefing / CLAUDE.md].
```

This turns the sweep into a **knowledge gap detector**, not just a news wire.

---

## Implementation

These recommendations are designed to be applied as edits to `process/daily-sweep.md`. They do not require changes to the brief format, the project registry, or the delivery pipeline. The cadence-log.csv is additive. The temporal relevance note is an optional section in the brief body.

To apply: review these recommendations, then update `daily-sweep.md` accordingly. The retro analysis at `analysis/cross-project-retro-march-10-21.md` provides the evidence base.
