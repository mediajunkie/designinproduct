# Cross-Pollination Daily Sweep

## Purpose

This document defines the process for a daily agent sweep that reads recent changes across all registered projects and produces targeted intelligence briefs for each team.

## How It Works

### 1. Read the Registry

Load `projects.json` from this directory. For each project, note the `watch_paths` — these are the directories where knowledge artifacts appear.

### 2. Identify What's New (per project)

For each registered project, examine files changed or added in the last 24-48 hours across all `watch_paths`. Focus on:

- **Session logs** — what did the agents work on today?
- **Planning docs** — any shifts in roadmap, priorities, or strategy?
- **Research/intel** — new discoveries, external news, capability assessments?
- **Architecture docs** — structural decisions, new models, patterns?
- **Memos and briefings** — inter-agent communication, role briefings?

### 3. Extract Cross-Relevant Insights

For each insight or artifact found, assess: **would the other project(s) benefit from knowing this?**

Relevance signals:
- Shared concerns (agent coordination, context management, prompt engineering)
- Reusable patterns or models (e.g., a five-layer context model)
- External news that affects multiple projects (Anthropic releases, API changes)
- Architectural decisions that solved a problem the other project also faces
- Methodology improvements that are transferable
- Roadmap shifts that change the relationship between projects

### 4. Write the Unified Website Brief

Produce a single unified brief covering all projects, written as a Markdown file with Eleventy front matter. Save to `src/internal/briefs/YYYY-MM-DD-brief.md` in the hub repo.

#### Front Matter (required)

```yaml
---
layout: layouts/brief.njk
title: "Cross-Pollination Brief — [Month Day, Year]"
ogTitle: "Cross-Pollination Brief — [Month Day, Year]"
ogDescription: "[1-2 sentence summary for social sharing]"
date: YYYY-MM-DD
status: substantive | nominal
sources_checked:
  - klatch
  - piper-morgan
window: "[time window, e.g. '24h (March 21-22, 2026)']"
---
```

#### Body Structure

```markdown
# Cross-Pollination Brief — [Month Day, Year]

[Executive summary: 2-4 sentences. What happened, why it matters.]

---

## Key Insights

### 1. [Insight Title]
**From:** [source project] (`path/to/source/file`)
**Relevant to:** [target project]

[Description paragraphs]

**Suggested action ([Target Project]):** [Actionable recommendation]

---

### 2. [Next insight...]
...

## Emerging Patterns
[Cross-project patterns, convergent discoveries, methodology themes]

## Background Changes (Noted, Low Priority)
- [Bullet list of notable but non-urgent changes]

## Sources Read

**[Project 1]:**
- `path/to/file` — [brief description]

**[Project 2]:**
- `path/to/file` — [brief description]
```

The unified brief covers insights in **both directions** — Klatch insights relevant to Piper Morgan and vice versa — in a single document. Each insight names its source and target. This is the human-readable version.

### 5. Update the Hub Page

Update `src/internal/index.njk`:

1. Move the current "Latest Brief" card into the "Previous Briefs" section
2. Insert a new "Latest Brief" card with the new date, status, summary, and insight tags
3. Link to `/internal/briefs/YYYY-MM-DD-brief/`

The hub page card format:

```html
<div class="hub-brief-card hub-brief-card--substantive">
  <div class="hub-brief-card__header">
    <h3 class="hub-brief-card__date">[Month Day, Year]</h3>
    <span class="hub-brief-card__status hub-brief-card__status--substantive">Substantive</span>
  </div>
  <p class="hub-brief-card__summary">[2-3 sentence summary]</p>
  <div class="hub-brief-card__insights">
    <span class="hub-brief-card__insight-tag">[Tag 1]</span>
    <!-- typically 4-6 tags -->
  </div>
  <div class="hub-brief-card__links">
    <a href="/internal/briefs/YYYY-MM-DD-brief/" class="btn pink-btn hub-brief-card__link">Read Full Brief</a>
  </div>
</div>
```

### 6. Commit to Hub Repo

Commit the new brief and updated hub page to `mediajunkie/designinproduct` on the `main` branch. The GitHub Actions workflow (`deploy.yml`) will automatically build the Eleventy site and deploy to GitHub Pages.

### 7. Write Per-Project Targeted Briefs

For each target project, also produce a **targeted brief** containing only the insights relevant to that project. These are written in plain Markdown (no Eleventy front matter) with YAML front matter for agent parsing:

```yaml
---
date: YYYY-MM-DD
status: substantive | nominal
sources_checked:
  - [list of source project slugs]
---
```

For each target project in `projects.json`, also archive a copy in the hub repo:
```
internal/cross-pollination/briefs/{target-id}/YYYY-MM-DD-brief-from-{source}-for-{target}.md
```

### 8. Deliver to Project Repos

After committing to the hub, **deliver each targeted brief directly to its target project repo**. This is the critical step that eliminates HTTP fetching and GitHub Pages rate limiting.

For each target project in `projects.json`:

1. **Write `current.md`** — Push the targeted brief to the project's `brief_delivery_path` (e.g., `docs/briefs/cross-pollination/current.md`), overwriting the previous day's content.
2. **Write dated archive** — Also push as `docs/briefs/cross-pollination/YYYY-MM-DD.md` so history is preserved.
3. **Use `push_files`** — Commit both files in a single push to minimize noise:
   ```
   push_files to {project repo}, branch: main
   files:
     - docs/briefs/cross-pollination/current.md (the targeted brief)
     - docs/briefs/cross-pollination/YYYY-MM-DD.md (dated archive)
   message: "docs: cross-pollination brief for YYYY-MM-DD"
   ```

**Why both channels:** The website brief is the unified, human-readable version with full context and emerging patterns. The repo-delivered brief is targeted to each project's agents — it contains only the insights relevant to that team. Agents read `current.md` as a local file at session start (per each project's CLAUDE.md). No HTTP requests, no rate limits, no 403 errors.

### 9. Verify Delivery

After pushing to each project repo, confirm the commit landed by checking the response. If a push fails (e.g., conflict), log the failure and continue with other deliveries — do not block the entire sweep.

## Output Summary

Each sweep produces these artifacts:

| Artifact | Location | Audience | Format |
|----------|----------|----------|--------|
| Unified website brief | `src/internal/briefs/YYYY-MM-DD-brief.md` (hub repo) | Humans, rendered at designinproduct.com | Eleventy Markdown with front matter |
| Hub page update | `src/internal/index.njk` (hub repo) | Humans, rendered at designinproduct.com | Nunjucks template |
| Per-project targeted briefs | `internal/cross-pollination/briefs/{project}/` (hub repo) | Archive | Plain Markdown |
| Delivered briefs | `docs/briefs/cross-pollination/current.md` (each project repo) | Agents, read as local file | Plain Markdown |

## Scaling to N Projects

When a new project is added to `projects.json`, the onboarding steps are:

### New Project Onboarding Checklist

1. **Add to `projects.json`:** Include `id`, `name`, `repo`, `watch_paths`, `brief_delivery_path`, `config_file`, and `topics`.
2. **Create brief directory in project repo:** `docs/briefs/cross-pollination/` with `current.md` (placeholder) and `README.md` (explaining the system).
3. **Update project's CLAUDE.md:** Add instruction to read `docs/briefs/cross-pollination/current.md` at session start. Place it in the session-start or coordination protocol section.
4. **Create brief archive directory in hub repo:** `internal/cross-pollination/briefs/{project-id}/`
5. **Update hub page** (`src/internal/index.njk`): Add a project card to the "Registered Projects" section.
6. **First sweep includes new project:** The sweep automatically reads the new project's `watch_paths` AND produces/delivers briefs for it.

### Scaling Notes

- With N projects, each project receives up to N-1 targeted briefs per day (one from each other project)
- The unified website brief always covers all projects in a single document
- Targeted briefs can be consolidated into a single daily digest per project if volume becomes unwieldy
- The `brief_delivery_path` in `projects.json` allows each project to choose its own directory structure

## Running the Sweep

This process is designed to be run by a Claude Code agent with access to all registered repos. The agent should:

1. Load `projects.json` and fetch the latest from each registered project repo
2. Run the identification and extraction steps (Steps 2-3)
3. Write the unified website brief and update the hub page (Steps 4-5)
4. Commit to the hub repo (Step 6)
5. Write and deliver per-project targeted briefs (Steps 7-8)
6. Verify delivery (Step 9)

### Invocation

```
Read projects.json, then for each project:
  - Fetch recent changes (git log --since="24 hours ago" --name-only)
  - Read changed files in watch_paths
  - Extract insights relevant to other projects
  - Write unified brief to src/internal/briefs/
  - Update hub page src/internal/index.njk
  - Commit to hub repo
  - Write and deliver targeted briefs to each project repo
```

## What This Is NOT

- Not a general AI news aggregator (projects have their own intel sweeps for that)
- Not a code sync tool (projects remain independent codebases)
- Not a replacement for direct collaboration when deep alignment is needed
- Not a reporting tool for the project owner (though the briefs are useful context)

It is a **bounded, specific, daily knowledge-sharing process** between sibling projects.
