# Casework — holding the file

A standalone project (living on a side branch for now): a small, disciplined
human-plus-AI team that supports long-term missing persons cases by maintaining
complete public-record case files, keeping cases visible, and generating
carefully-vetted leads for official channels.

It exists because of a pattern families describe again and again: early
investigative gaps, then years where *nobody is still reading the file*. The
diffusion of responsibility that let Kitty Genovese's neighbours each assume
someone else would act is the same force that lets a cold case sit untouched —
and it dissolves when someone is clearly holding the file. Machines are good at
exactly the part humans can't sustain: complete corpora, tireless re-reading,
quarterly re-sweeps, and never getting bored.

**Start here:**

1. [`CHARTER.md`](CHARTER.md) — the rules. Read first; everything else obeys it.
2. [`PIPELINE.md`](PIPELINE.md) — the process: 7 agents, 6 stages, 4 gates.
3. [`cases/`](cases/) — the case files.

**The team** (runnable Claude Code agent definitions in `.claude/agents/`):

| Agent | Role |
|---|---|
| `case-archivist` | Builds and re-sweeps the master sourced case file |
| `osint-researcher` | Multi-angle public-web and archive sweeps |
| `contradiction-analyst` | Hunts conflicts, drift, and gaps inside the record |
| `geospatial-analyst` | Tests the geography — routes, timings, search coverage |
| `pattern-matcher` | Cross-references official registers and remains programs |
| `adversarial-reviewer` | Tries to kill every lead; only survivors move on |
| `case-narrator` | Handoff briefs for officials; awareness pages for the public |

**What this project is not:** detectives, police, a tip line, or a forum. Leads
go to official channels through a human. Tips from the public go to
Crime Stoppers — **1800 333 000** — always.
