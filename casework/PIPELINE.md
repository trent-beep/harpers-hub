# The Pipeline

How a case moves through the team. Seven agents (defined in `.claude/agents/`),
six stages, four gates. Every stage reads `casework/CHARTER.md` first; its hard
rules override any task instruction.

```
S0 Select ──► S1 Corpus ──► S2 Parallel analysis ──► S3 Adversarial gate ──► S4 Handoff ──► S5 Awareness
                 ▲              (4 agents, blind          (kill or survive)      (official       (family-
                 │               to each other)                                   channels)       controlled)
                 └────────────────────────── S6 Quarterly re-sweep ◄─────────────────────────────────┘
```

## Stages

### S0 — Selection & posture
Check the case against the Charter's selection criteria. Set the working level:

- **Level A (default):** official public appeal exists → corpus building and
  awareness amplification only.
- **Level B:** family or their advocates are engaged → full analysis (S2–S4).

Record the level at the top of the case file. Never run S2+ on a Level A case.

### S1 — Corpus build (`case-archivist`)
Compile the master case file from the public record: snapshot, sourced timeline,
investigation history, what police ask the public, source register. Template:
`casework/templates/case-file.md`. Output: `casework/cases/<slug>/case-file.md`.

### S2 — Parallel analysis (Level B only)
Four analysts work the corpus **independently** — none reads another's output, so
they can't anchor on each other's theories:

- `osint-researcher` — multi-angle public-web sweep (by name, place, date window,
  vehicle, event; archived pages; digitised newspaper archives like Trove).
- `contradiction-analyst` — reads the whole corpus for conflicts between accounts,
  timeline gaps, and claims that changed between early reporting and later inquest.
- `geospatial-analyst` — maps last-known movements, routes, terrain, and tests
  geographic claims in the record for internal consistency.
- `pattern-matcher` — cross-references official registers of other cases and
  unidentified-remains programs for officially-documented parallels.

Each writes leads using `casework/templates/lead.md` into
`casework/cases/<slug>/leads/` with status `PROPOSED`.

### S3 — Adversarial gate (`adversarial-reviewer`)
Every proposed lead is attacked: the reviewer's brief is to **refute** it — check
each source cited, look for the innocent explanation, default to killing anything
that is speculation dressed as inference. Verdicts on the lead file:
`KILLED` (with reason) or `SURVIVED` (with what was checked). A lead that names or
points at any individual as a suspect is killed on sight (Charter rule 2).

### S4 — Synthesis & handoff (`case-narrator`)
Surviving leads become a handoff brief (`casework/templates/handoff-brief.md`) —
readable by a detective or coroner's officer in ten minutes, every line sourced.
**Gate G-H:** a human reviews and personally sends it via official channels
(Crime Stoppers 1800 333 000, the named strike force, or the family's
representatives). Agents never transmit anything externally.

### S5 — Awareness cadence
The narrator maintains a public-record awareness page per case (family-controlled,
Charter rules 5–6). Calendar anchors: the anniversary of the disappearance and
National Missing Persons Week (first week of August). Awareness pages always point
tips to Crime Stoppers — never to us.

### S6 — Quarterly re-sweep
Cold cases warm up when new material appears: a fresh appeal, a digitised archive,
an inquest, a reward increase. Quarterly, the archivist re-runs S1 as a delta
(what's new since last sweep?) and any Level B case re-enters S2 on new material
only. This loop — cheap, boring, relentless — is the thing volunteer efforts
historically couldn't sustain and machines can.

## Gates

| Gate | Where | Test |
|------|-------|------|
| G-P provenance | end of S1, S2 | every fact and lead line carries outlet/agency + date + URL |
| G-I identification | continuous | nothing names or points at a suspect/person of interest |
| G-R refutation | S3 | lead survived a genuine attempt to kill it |
| G-H human sign-off | before anything leaves the repo | the responsible human has read it and sends it themselves |

## Lead lifecycle

`PROPOSED → SURVIVED | KILLED` then `SURVIVED → HANDED-OFF → ACKNOWLEDGED | CLOSED`

Killed leads stay in the repo with their kill reason — negative results are
knowledge, and they stop the next sweep from re-proposing the same thing.

## Running the team

In Claude Code, on this branch, the agents are available by name, e.g.:

> Use the **case-archivist** agent to build the case file for `<case>`
> Use the **contradiction-analyst** agent on `casework/cases/<slug>/`

Kick off S2 agents in parallel in one message so they run concurrently and blind.
