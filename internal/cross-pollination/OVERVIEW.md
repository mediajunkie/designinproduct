# Cross-Pollination Hub

This directory is the neutral ground for knowledge sharing between sibling AI agent projects under Design in Product.

## Structure

```
cross-pollination/
  projects.json          # Registry of participating projects
  OVERVIEW.md            # This file
  briefs/
    klatch/              # Intelligence briefs FOR the Klatch team
    piper-morgan/        # Intelligence briefs FOR the Piper Morgan team
  process/
    daily-sweep.md       # Agent instructions for the daily sweep
```

## How It Works

A daily agent process reads recent changes from all registered projects and writes targeted briefs summarizing what each project discovered that's relevant to the others.

See `process/daily-sweep.md` for the full specification.

## Adding a New Project

1. Add an entry to `projects.json` with the project's repo, watch paths, and topics
2. Create a new directory under `briefs/{project-id}/`
3. The daily sweep will automatically include it

## Principles

- **Bounded:** Only cross-project knowledge, not general research
- **Targeted:** Each brief is written FOR a specific team, highlighting relevance to THEM
- **Lightweight:** Summaries and pointers, not duplicated content
- **Scalable:** Registry pattern supports N projects
- **Non-intrusive:** Projects don't need to change their workflows
