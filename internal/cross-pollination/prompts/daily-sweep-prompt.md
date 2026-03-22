# Cross-Pollination Daily Sweep

You are running the daily cross-pollination sweep for Design in Product. This process reads recent activity from sibling AI agent projects and produces intelligence briefs that surface cross-relevant insights.

## What You Need Access To

You need read/write access to these three GitHub repositories:
- `mediajunkie/designinproduct` — the hub repo (where briefs are published)
- `design-in-product/klatch` — Klatch project
- `mediajunkie/piper-morgan-product` — Piper Morgan project

## Step 1: Read the Project Registry

Read `internal/cross-pollination/projects.json` from the `mediajunkie/designinproduct` repo. This tells you:
- Which repos to scan (`projects[].repo`)
- Where to look for activity (`projects[].watch_paths`)
- Where to deliver briefs (`projects[].brief_delivery_path`)

## Step 2: Scan Both Projects for Recent Activity

For each project in the registry, check what changed in the last 24 hours:

1. **List recent commits** (last 24h) to identify which files changed.
2. **Read changed files** in the `watch_paths` directories — session logs, planning docs, intel sweeps, memos, architecture docs, briefings.
3. **Note key activity**: What did agents work on? What decisions were made? What patterns emerged? What broke? What shipped?

Focus on substance, not routine. A session log that says "started session, read docs, no work done" is not noteworthy. A session log that describes implementing a new feature, discovering a bug, or making an architectural decision is.

## Step 3: Identify Cross-Relevant Insights

For each significant finding, ask: **would the other project benefit from knowing this?**

Strong cross-relevance signals:
- Shared concerns (agent coordination, context management, prompt engineering)
- Reusable patterns or models
- External news affecting multiple projects (Anthropic releases, API changes)
- Architectural decisions that solved a problem the other project also faces
- Methodology improvements that are transferable
- Convergent discoveries (both projects independently arriving at the same solution)

Aim for 4-8 insights. Fewer is fine if it was a quiet day — don't pad. If nothing cross-relevant happened, produce a `nominal` brief that confirms the sweep ran.

## Step 4: Write the Unified Website Brief

Create the brief at `src/internal/briefs/YYYY-MM-DD-brief.md` in the hub repo.

Use **exactly** this front matter structure:

```yaml
---
layout: layouts/brief.njk
title: "Cross-Pollination Brief — [Month Day, Year]"
ogTitle: "Cross-Pollination Brief — [Month Day, Year]"
ogDescription: "[1-2 sentence summary for social sharing]"
date: YYYY-MM-DD
status: substantive
sources_checked:
  - klatch
  - piper-morgan
window: "24h ([Month Day-Day, Year])"
---
```

Use **exactly** this body structure:

```markdown
# Cross-Pollination Brief — [Month Day, Year]

[Executive summary: 2-4 sentences covering the day's key themes.]

---

## Key Insights

### 1. [Insight Title]
**From:** [source project] (`path/to/source/file`)
**Relevant to:** [target project]

[Description — what happened, why it matters, how it connects.]

**Suggested action ([Target Project]):** [Specific, actionable recommendation.]

---

### 2. [Next insight...]
...

## Emerging Patterns
[Cross-project patterns, convergent discoveries, methodology themes. 2-3 paragraphs.]

## Background Changes (Noted, Low Priority)
- [Bullet list of notable but non-urgent changes from both projects]

## Sources Read

**Klatch:**
- `path/to/file` — [brief description]

**Piper Morgan:**
- `path/to/file` — [brief description]
```

The brief covers insights in **both directions** in a single document. Each insight names its source project and target project.

## Step 5: Update the Hub Page

Read `src/internal/index.njk` from the hub repo. Update it:

1. **Move** the current "Latest Brief" card into the "Previous Briefs" section (add it as the first card there).
2. **Replace** the "Latest Brief" card with a new one for today's brief.

The card format:

```html
<div class="hub-brief-card hub-brief-card--substantive">
  <div class="hub-brief-card__header">
    <h3 class="hub-brief-card__date">[Month Day, Year]</h3>
    <span class="hub-brief-card__status hub-brief-card__status--substantive">Substantive</span>
  </div>
  <p class="hub-brief-card__summary">[2-3 sentence summary]</p>
  <div class="hub-brief-card__insights">
    <span class="hub-brief-card__insight-tag">[Tag 1]</span>
    <span class="hub-brief-card__insight-tag">[Tag 2]</span>
    <!-- 4-6 tags, one per key insight -->
  </div>
  <div class="hub-brief-card__links">
    <a href="/internal/briefs/YYYY-MM-DD-brief/" class="btn pink-btn hub-brief-card__link">Read Full Brief</a>
  </div>
</div>
```

For a `nominal` brief, use `hub-brief-card--nominal` and `hub-brief-card__status--nominal` instead.

## Step 6: Commit to the Hub Repo

Push the new brief and updated hub page to `mediajunkie/designinproduct` on `main`. Use a commit message like:

```
Add cross-pollination brief for [Month Day, Year]

[1-2 sentence summary of key themes]
```

## Step 7: Write and Deliver Per-Project Targeted Briefs

For **each** project in the registry, write a targeted brief containing only the insights relevant to that project. Use this format:

```yaml
---
date: YYYY-MM-DD
status: substantive
sources_checked:
  - [source project slugs]
---

# Cross-Pollination Brief: [Source] → [Target]

**Date:** YYYY-MM-DD
**Source project:** [source name]
**For:** [target name] team

## Key Insights

### 1. [Insight Title]
**Relevance:** [Why this matters to the target]
**Source:** `path/to/file`
**Summary:** [2-5 sentences]
**Suggested action:** [What the target team should consider]

...

## Raw Sources
- [List of files read]
```

Deliver to each project repo using `push_files`:

- `docs/briefs/cross-pollination/current.md` — overwrites previous (agents read this at session start)
- `docs/briefs/cross-pollination/YYYY-MM-DD.md` — dated archive (never overwritten)

Commit message: `docs: cross-pollination brief for YYYY-MM-DD`

Also archive targeted briefs in the hub repo at:
- `internal/cross-pollination/briefs/{target-id}/YYYY-MM-DD-brief-from-{source}-for-{target}.md`

## Step 8: Verify

1. **Check each push response** — confirm commits landed in all three repos.
2. **Check the GitHub Pages deployment** — the hub repo has a GitHub Actions workflow (`deploy.yml`) that builds and deploys on push to main. After your commit, verify the workflow triggered successfully. If it fails, read the error — common issues are missing Eleventy filters or front matter problems.
3. **Report what you published** — list the brief date, status, number of insights, and confirm delivery to each project repo.

## If It's a Quiet Day

If the sweep finds no cross-relevant activity, produce a `nominal` brief:
- Front matter: `status: nominal`
- Body: Short paragraph confirming the sweep ran, what was checked, and that nothing cross-relevant was found.
- Still update the hub page and deliver to repos — the `nominal` status confirms the system is running.

## Troubleshooting

If something doesn't work as expected:
- Read `internal/cross-pollination/process/daily-sweep.md` in the hub repo for the full process specification.
- Read `internal/cross-pollination/projects.json` for the project registry.
- Check `src/_includes/layouts/brief.njk` for the brief layout template.
- Check `.eleventy.js` for Eleventy configuration (input: `src/`, output: `_site/`).
- Check `.github/workflows/deploy.yml` for the Pages deployment workflow.
