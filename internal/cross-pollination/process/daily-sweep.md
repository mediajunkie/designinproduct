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

### 4. Write Targeted Briefs

For each target project, produce a brief in `briefs/{project-id}/` named:
```
YYYY-MM-DD-brief-from-{source}-for-{target}.md
```

#### Brief Format

```markdown
# Cross-Pollination Brief: {Source} -> {Target}
**Date:** YYYY-MM-DD
**Source project:** {source name}
**For:** {target name} team

## Key Insights

### 1. [Insight title]
**Relevance:** [Why this matters to the target project]
**Source:** [File path in source repo]
**Summary:** [2-5 sentences on what was discovered/decided/built]
**Suggested action:** [What the target team might want to do with this]

### 2. [Next insight...]
...

## Context & Background
[Any broader context that helps the target team understand these insights]

## Raw Sources
- [List of files read with brief descriptions]
```

### 5. Commit to Hub Repo

Commit briefs to the hub repo (`mediajunkie/designinproduct`) on the `main` branch.

### 6. Deliver to Project Repos

After committing to the hub, **deliver each brief directly to its target project repo**. This is the critical step that eliminates HTTP fetching and GitHub Pages rate limiting.

For each target project in `projects.json`:

1. **Write `current.md`** — Push the brief to the project's `brief_delivery_path` (e.g., `docs/briefs/cross-pollination/current.md`), overwriting the previous day's content.
2. **Write dated archive** — Also push as `docs/briefs/cross-pollination/YYYY-MM-DD.md` so history is preserved.
3. **Use `push_files`** — Commit both files in a single push to minimize noise:
   ```
   push_files to {project repo}, branch: main
   files:
     - docs/briefs/cross-pollination/current.md (the brief)
     - docs/briefs/cross-pollination/YYYY-MM-DD.md (dated archive)
   message: "docs: cross-pollination brief for YYYY-MM-DD"
   ```

**Why this matters:** Agents read `current.md` as a local file at session start (per each project's CLAUDE.md). No HTTP requests, no rate limits, no 403 errors. The website remains the human-readable version; the committed file is the agent-readable version.

### 7. Verify Delivery

After pushing to each project repo, confirm the commit landed by checking the response. If a push fails (e.g., conflict), log the failure and continue with other deliveries — do not block the entire sweep.

## Scaling to N Projects

When a new project is added to `projects.json`:
- A new directory is created under `briefs/{project-id}/`
- The project repo gets a `docs/briefs/cross-pollination/` directory with `current.md` and `README.md`
- The project's CLAUDE.md is updated to include reading the brief at session start
- The sweep automatically includes it in both directions: reading its artifacts AND producing/delivering briefs for it
- With N projects, each project receives up to N-1 briefs per day (one from each other project)
- Briefs can be consolidated into a single daily digest if the volume becomes unwieldy

## Running the Sweep

This process is designed to be run by a Claude Code agent with access to all registered repos. The agent should:

1. Clone or fetch the latest from each registered project repo
2. Run the identification and extraction steps above
3. Write briefs to this hub repo
4. **Deliver briefs to each project repo** (Step 6)
5. Optionally notify project teams (via commit message, issue, or other mechanism)

### Invocation

```
Read projects.json, then for each project:
  - Fetch recent changes (git log --since="24 hours ago" --name-only)
  - Read changed files in watch_paths
  - Extract insights relevant to other projects
  - Write briefs to hub repo
  - Deliver briefs to each target project repo
```

## What This Is NOT

- Not a general AI news aggregator (projects have their own intel sweeps for that)
- Not a code sync tool (projects remain independent codebases)
- Not a replacement for direct collaboration when deep alignment is needed
- Not a reporting tool for the project owner (though the briefs are useful context)

It is a **bounded, specific, daily knowledge-sharing process** between sibling projects.
