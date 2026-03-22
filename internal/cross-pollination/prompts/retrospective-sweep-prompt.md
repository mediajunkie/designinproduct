# Cross-Pollination Retrospective Sweep

You are running a retrospective cross-pollination sweep for Design in Product. This is the same process as the daily sweep, but targeted at a specific date range in the past rather than the last 24 hours.

## Input

The user will provide:
- **Date or date range** to sweep (e.g., "March 15" or "March 10-15")
- Optionally, a **focus** (e.g., "just Klatch" or "architecture changes only")

## What You Need Access To

You need read/write access to these three GitHub repositories:
- `mediajunkie/designinproduct` — the hub repo (where briefs are published)
- `design-in-product/klatch` — Klatch project
- `mediajunkie/piper-morgan-product` — Piper Morgan project

## Step 1: Read the Project Registry

Read `internal/cross-pollination/projects.json` from `mediajunkie/designinproduct`. This tells you which repos to scan and where to look.

## Step 2: Scan Both Projects for the Target Period

For each project in the registry:

1. **List commits** for the target date range. Use the commit timestamps to identify activity boundaries.
2. **Read changed files** in the `watch_paths` directories — session logs, planning docs, intel sweeps, memos, architecture docs, briefings.
3. **For multi-day ranges**, process the full range as a single sweep rather than producing separate daily briefs. The window should be noted in the front matter.

## Step 3: Extract Cross-Relevant Insights

Same criteria as the daily sweep — ask "would the other project benefit from knowing this?" for each finding.

For retrospective sweeps, also look for:
- **Patterns that emerged over the date range** (not just individual events)
- **Decisions whose consequences became visible later**
- **Threads that connect across multiple days**

Aim for 4-8 insights. A multi-day range may justify more.

## Step 4: Produce All Outputs

Follow the same output process as the daily sweep. The only differences:

1. **Date the brief using the last day of the range** (or the single date if one day).
2. **Set the window field** to reflect the actual range, e.g., `"48h (March 19-20, 2026)"` or `"5d (March 10-14, 2026)"`.
3. **Note it's retrospective** in the executive summary — e.g., "Retrospective sweep covering..."
4. **Check for conflicts** — if a brief already exists for the target date, use a suffix: `YYYY-MM-DD-brief-retro.md`.

### Website Brief

Create `src/internal/briefs/YYYY-MM-DD-brief.md` (or `-brief-retro.md` if date conflicts) in the hub repo with the standard Eleventy front matter:

```yaml
---
layout: layouts/brief.njk
title: "Cross-Pollination Brief — [Month Day, Year]"
ogTitle: "Cross-Pollination Brief — [Month Day, Year]"
ogDescription: "[1-2 sentence summary]"
date: YYYY-MM-DD
status: substantive
sources_checked:
  - klatch
  - piper-morgan
window: "[range description]"
---
```

Body structure: same as daily sweep (H1 title, executive summary, Key Insights with numbered H3s, Emerging Patterns, Background Changes, Sources Read).

### Hub Page

Update `src/internal/index.njk` — move current Latest Brief to Previous, insert new card as Latest.

### Per-Project Targeted Briefs

Write and deliver to each project repo:
- `docs/briefs/cross-pollination/current.md` (overwrite)
- `docs/briefs/cross-pollination/YYYY-MM-DD.md` (archive)

Also archive in hub at `internal/cross-pollination/briefs/{project}/`.

### Commit to Hub Repo

Push new brief + updated hub page. Commit message:
```
Add cross-pollination brief for [Month Day, Year] (retrospective)

[1-2 sentence summary]
```

## Step 5: Verify

1. Confirm commits landed in all three repos.
2. Check that the GitHub Pages workflow triggered on the hub repo.
3. Report: brief date, window, status, number of insights, delivery confirmation.

## Troubleshooting

If something doesn't work as expected:
- Read `internal/cross-pollination/process/daily-sweep.md` for the full process spec.
- Read `internal/cross-pollination/projects.json` for the project registry.
- Check `src/_includes/layouts/brief.njk` for the brief template.
- Check `.eleventy.js` for Eleventy config.
- Check `.github/workflows/deploy.yml` for Pages deployment.

## Example Invocations

User says: "Run a retrospective sweep for March 15"
→ Scan commits from March 15, produce brief dated 2026-03-15.

User says: "Sweep March 10 through March 14"
→ Scan 5 days of commits, produce single brief dated 2026-03-14 with `window: "5d (March 10-14, 2026)"`.

User says: "Retrospective sweep for March 17, just architecture changes"
→ Scan March 17, focus on architecture docs and ADRs, note the narrowed scope in the executive summary.
