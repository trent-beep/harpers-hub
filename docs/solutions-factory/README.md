# The Solutions Factory

A repeatable pipeline that takes a problem facing people or society, inside Trent's skill set, and turns it into a shippable solution with agent teams doing the research, design, build, test and review, and Trent making the calls that only a human should make.

This document is the design. The rest of this folder and `.claude/` is the scaffold that makes it runnable.

---

## 1. The one idea the whole factory rests on

**Agents generate and check. Humans decide and own.**

Every stage below is built to produce evidence a decision can be made on, not to make the decision. There are exactly three places where Trent's judgement is required, and the factory is arranged so that everything else can run without waiting on him.

| Gate | Question Trent answers | What he sees |
|---|---|---|
| **G1 Accept** | Is this a problem worth our time, and is it ours to solve? | Triage card (1 screen) |
| **G2 Direction** | Is this the right approach, at the right size? | Options memo with a recommended option and the case against it |
| **G3 Ship** | Does this go out under our name? | Ship pack: the deliverable, evidence trail, risks, rollout |

G2 can be delegated to the factory for low-risk work (see §6, Risk classes). G1 and G3 never are.

---

## 2. Why "factory" is the right metaphor, and where it breaks

A factory has a fixed line, interchangeable stations, quality control between stations, and a defect loop that sends work back rather than forward. That maps well:

- **Stations** are pipeline stages with a defined input artefact and a defined output artefact.
- **QC between stations** is a gate check: the output must satisfy a checklist before the next station starts.
- **Defect loop** is the Test → Review → Refine cycle, capped so it cannot spin forever.

Where the metaphor breaks, and the design has to compensate:

1. **The workers all share one brain.** Every agent is the same model with a different prompt. They share blind spots. A "family persona" agent is not a family. So the factory treats persona feedback as *hypothesis generation*, and the ship pack must say explicitly what has and has not been validated with real people.
2. **The raw material is people's lives.** Clinical, disability and safeguarding content carries risk a widget doesn't. So risk class is set at intake and it changes what the line is allowed to do without a human.
3. **Throughput is not the goal.** Ten mediocre solutions are worse than two that get used. The factory measures adoption and outcome after ship, not output.

---

## 3. The line, station by station

```
 INTAKE ──► TRIAGE ──►[G1]──► DISCOVER ──► OPTIONS ──►[G2]──► SPEC ──► BUILD ──► TEST ──► REVIEW ──► REFINE ──► PRESENT ──►[G3]──► SHIP ──► LEARN
                                  ▲                                                          │           │            │
                                  └── kill / park ◄──────────────────────────────────────────┴───────────┴────────────┘
```

Each station: **who works it, what goes in, what comes out, and the QC check to leave.**

### 0. Intake
- **Who:** anyone. Trent, a practitioner, a family, a routine that scans a source.
- **In:** a problem, in any form. Voice note, email, a line in a meeting.
- **Out:** a **Problem Brief** (`problem-brief.md`). One file, one problem, filed as a GitHub issue labelled `factory:intake`.
- **QC:** the brief has an affected person, a specific situation, at least one piece of evidence it is real, and a sentence describing what "better" would look like. If it doesn't, the Intake Agent goes back to the source with questions rather than guessing.

*Example.* "Support workers don't follow the BSP strategies" becomes: *Support workers at two SIL houses (7 staff) report not reading Kane's 42-page BSP; two incident reports in July show strategies not applied; families notice inconsistency between shifts. Better looks like: any worker can find the right response for a given behaviour in under 30 seconds.*

### 1. Triage
- **Who:** Triage Agent.
- **In:** Problem Brief.
- **Out:** **Triage Card**: fit to skill set (yes / adjacent / no), affected population and reach, evidence strength, risk class (§6), likely solution shape (document, tool, process, training, policy, product, advocacy), rough size (S / M / L), duplicate check against the registry, and a recommendation: proceed, park, kill, or refer.
- **QC:** every field filled with a reason, not a score alone. A one-line "what would make this a kill" so Trent can disagree fast.
- **→ G1.** Trent accepts, parks, or kills. Target: 2 minutes per card.

### 2. Discover
- **Who:** four agents in parallel, then a synthesiser.
  - **Evidence Researcher**: what does the literature, NDIS Practice Standards, Quality and Safeguards Commission guidance, and relevant state law say? What has been tried elsewhere and what happened?
  - **Context Researcher**: what does Harpers Health already have? Existing forms, templates, policies (the Drive Hub is the index), prior factory runs, the practitioners' current workflow.
  - **Stakeholder Voices**: writes the problem from five seats: the participant, the family or carer, the frontline worker, the practitioner, the funder or planner. Each seat says what would make them *not* use the solution.
  - **Red Team**: argues the problem is misdiagnosed, the obvious solution will fail, or solving it causes harm somewhere else.
- **Out:** **Discovery Dossier**: findings with sources, a "what we now believe the real problem is" statement, and a list of constraints the solution must respect.
- **QC:** the dossier must contain at least one finding that changed the framing from the brief. If discovery only confirmed the brief, the synthesiser says so explicitly and Trent can decide whether it was too shallow.

### 3. Options
- **Who:** Options Agent generates, Critic Agent scores.
- **In:** Discovery Dossier.
- **Out:** **Options Memo**: three to five distinct approaches (distinct in *kind*, not in polish). Each scored on impact, feasibility for us, time to first value, reversibility, risk, and cost to maintain. One recommended option, plus the strongest case against it, plus the "do nothing" baseline.
- **QC:** no option is a straw man. The Critic must be able to defend any option as the winner under some plausible weighting.
- **→ G2.** Trent picks, or for risk class A the factory auto-selects the recommendation and logs it for later review.

### 4. Spec
- **Who:** Spec Writer.
- **In:** chosen option, dossier.
- **Out:** **Build Spec**: what exactly gets built, for whom, acceptance criteria written as tests ("a new support worker with no context can find the response to X in under 30 s"), the test plan, out-of-scope list, rollout plan, and a definition of done.
- **QC:** every acceptance criterion is checkable by an agent or a named human without interpretation.

### 5. Build
- **Who:** a Builder matched to the deliverable type. The factory does not have one builder; it routes.
  - Documents and clinical resources → the `paediatric-ot` and `specialist-bp-review` personas plus `docx` / `pdf` skills.
  - Web tools → the pattern used by the Drive Hub: static, single-file, no backend unless the spec demands it.
  - Processes and SOPs → a process builder that outputs a one-page procedure plus a checklist plus a training note.
  - Training → slides (`pptx`) plus a facilitator guide plus a five-question check.
  - Data and analysis → `xlsx` or a notebook, with the query logged.
- **Out:** the deliverable, plus a build log of decisions made where the spec was silent.
- **QC:** builds against the spec only. Anything the builder wants to add goes in the log as a proposal, not in the deliverable.

### 6. Test
- **Who:** testers in parallel, each with one job.
  - **Acceptance Tester**: runs every criterion in the spec and reports pass / fail with evidence.
  - **Persona Testers**: the five stakeholder seats from Discovery each try to use the deliverable for their real task and report where they stall.
  - **Compliance Tester**: NDIS Practice Standards, restrictive practice rules, privacy (APPs), consent, mandatory reporting, and Harpers' own policies.
  - **Plain-Language Tester**: reading level, jargon, length, and whether a tired person at 9 pm could use it.
  - **Accessibility Tester** (for tools and documents): keyboard, contrast, screen reader, mobile.
- **Out:** **Test Report**: findings tagged blocking / should-fix / nice-to-have, each with a reproduction.
- **QC:** a finding without a reproduction is not a finding.

### 7. Review
- **Who:** two reviewers with opposite briefs.
  - **Domain Reviewer**: would a senior practitioner sign this? Uses the `specialist-bp-review` editing rules.
  - **Adversarial Reviewer**: how does this fail in the real world? What gets misused, misread, or ignored?
- **Out:** review findings, merged with the Test Report into one ranked list.

### 8. Refine
- **Who:** the Builder, then Test and Review re-run on what changed.
- **Loop rule:** up to three cycles. Blocking findings must reach zero. If cycle three still has blockers, the run escalates to Trent with the list rather than trying a fourth time. Repeated findings across cycles mean the approach is wrong, not the execution; the Presenter says so.

### 9. Present
- **Who:** Presenter Agent.
- **In:** everything.
- **Out:** **Ship Pack**, one page plus attachments:
  1. The problem in two sentences and what changed in our understanding of it.
  2. The deliverable.
  3. Evidence trail: sources, tests passed, findings closed, findings accepted as-is and why.
  4. What we did *not* validate (always includes: "no real participant or family has used this yet" unless one has).
  5. Risks, and the one thing most likely to make this fail.
  6. Rollout: who, where, when, and how we'll know it worked in 30 days.
  7. Cost: agent time, Trent time, cycles used.
- **→ G3.** Trent ships, returns with notes, or kills.

### 10. Ship
- **Who:** Ship Agent, with Trent's approval recorded.
- Publishes to the right place: the Drive Hub, Google Drive, a PR to a repo, a training calendar entry. Registers the solution in the registry. Sets a 30-day follow-up routine.

### 11. Learn
- **Who:** Retro Agent, 30 days after ship, and after any kill.
- Collects: was it used, by whom, what broke, what the humans said. Writes a retro and proposes changes to the factory's own prompts, checklists and templates as a PR. The factory improves itself, but only via reviewed PRs.

---

## 4. The agent roster

Definitions live in `.claude/agents/`. Every agent has one job, a fixed output shape, and a list of things it must not do.

| Agent | Stage | One job | Must not |
|---|---|---|---|
| `factory-intake` | 0 | Turn a raw problem into a complete Problem Brief | Invent evidence |
| `factory-triage` | 1 | Produce a Triage Card and a proceed / park / kill recommendation | Recommend proceed without naming the kill condition |
| `factory-evidence` | 2 | Find what is known and what has been tried, with sources | Cite anything it cannot point to |
| `factory-context` | 2 | Find what Harpers already has and how work is actually done today | Assume the hub is complete |
| `factory-voices` | 2, 6 | Speak from five stakeholder seats | Claim to represent real people |
| `factory-redteam` | 2, 7 | Argue the problem or solution is wrong | Soften its findings |
| `factory-options` | 3 | Generate distinct approaches | Pad with variants of one idea |
| `factory-critic` | 3 | Score options and recommend one | Hide the case against its recommendation |
| `factory-spec` | 4 | Write a testable Build Spec | Write a criterion that needs interpretation |
| `factory-builder-*` | 5 | Build to spec | Add scope |
| `factory-test-*` | 6 | Find defects with reproductions | Report a finding without one |
| `factory-review-domain` | 7 | Sign-off review as a senior practitioner | Approve a clinical claim without a source |
| `factory-presenter` | 9 | Assemble the Ship Pack | Omit what wasn't validated |
| `factory-ship` | 10 | Publish and register | Publish without a recorded G3 |
| `factory-retro` | 11 | Measure and propose improvements | Change the factory directly |

Two design rules for the roster:

- **Same seat, different stage.** The Stakeholder Voices and Red Team run at Discovery *and* at Test/Review. What they predicted early is checked late. Where the prediction was wrong, the Retro Agent learns from it.
- **Builders and testers never share a prompt.** The tester is told the spec, not the builder's reasoning.

---

## 5. The processes around the line

The line is the easy part. These are what make it run week after week.

**Problem sourcing.** Three feeds into Intake:
1. Trent's own observations, captured in one place (a GitHub issue with the `factory:intake` label, a voice note that an intake routine transcribes).
2. Practitioner feed: a short form on the Drive Hub. "What got in the way this week?"
3. Scheduled scans: a weekly routine that reads Commission alerts, NDIS pricing and policy updates, and the incident register summary, and drafts briefs for anything that looks like a pattern.

**The queue.** GitHub issues are the queue. Labels are the state: `factory:intake` → `factory:triage` → `factory:g1` → `factory:discover` → … → `factory:shipped` / `factory:parked` / `factory:killed`. Each run writes its artefacts to `runs/<slug>/` on a branch, and the PR is the run's record.

**Cadence.**
- Daily, automated: intake sweep, triage of anything new, advance any run waiting on an agent stage.
- Twice a week, Trent, 20 minutes: G1 cards and G2 memos. Batched, not interrupt-driven.
- Weekly, Trent, 45 minutes: G3 ship packs. Ship, return, or kill.
- Monthly: retro readout. Which factory changes were proposed, which were accepted.

**Registry.** `registry.md` (or a sheet) lists every problem ever accepted, its state, its solution, and its 30-day result. Triage checks it for duplicates. Options checks it for reusable parts.

**Budgets.** Each run has a token budget and a cycle budget set by size (S / M / L). Exceeding either pauses the run and asks, rather than spending on. This is what stops a Refine loop from quietly burning a day.

**Kill culture.** A kill is a good output. The Triage Card and the Options Memo both have a "why this should die" field, and the registry keeps kills so the same idea does not come back three times.

---

## 6. Risk classes and what they change

Set at Triage. Can only be raised, never lowered, by a later agent.

| Class | Examples | G2 | Extra testers | Ship needs |
|---|---|---|---|---|
| **A · Internal, reversible** | A staff checklist, a hub search improvement, an internal template | Factory may auto-select | none | G3 |
| **B · Client-facing, non-clinical** | A family handout, a plain-language guide, a booking process | Trent | Plain-Language, Voices | G3 |
| **C · Clinical or safeguarding** | Anything touching BSPs, restrictive practices, incident response, consent, assessment interpretation | Trent | Compliance, Domain Reviewer with named senior sign-off | G3 plus a named second human reviewer |
| **D · Public or systemic** | Advocacy, submissions, sector tools, anything under Harpers' name outside the organisation | Trent | All, plus Red Team at Review | G3 plus a real-person pilot before wide release |

Class C and D solutions can never be shipped on agent evidence alone. The factory's job for those is to make the human review fast and well-informed, not to replace it.

---

## 7. How this maps onto the tooling you have

None of this needs new software. It needs the pieces you already use, arranged.

| Factory concept | Implementation |
|---|---|
| Agent | `.claude/agents/factory-*.md` (definition, tools, model) |
| A stage's playbook | `.claude/skills/factory-<stage>/SKILL.md` |
| A full run | `Workflow` script `.claude/workflows/factory-run.js`: parallel discovery, pipelined test-and-review, capped refine loop |
| Queue and state | GitHub issues plus labels |
| Run record | A branch and PR per run, artefacts in `runs/<slug>/` |
| Gates | Trent comments on the PR: `/g1 accept`, `/g2 option-2`, `/g3 ship` |
| Scheduled feeds | Routines (`create_trigger`) for the daily sweep and the weekly scan |
| 30-day follow-up | A one-shot routine created at Ship |
| Ship Pack | An Artifact page, so it reads on a phone at G3 |
| Domain knowledge | Existing skills: `paediatric-ot`, `specialist-bp-review`, `docx`, `pptx`, `xlsx`, `pdf` |
| Registry | `docs/solutions-factory/registry.md` |

Start command: `/factory "<problem in one paragraph>"` runs Intake and Triage and opens the issue. `/factory run <issue>` advances it.

---

## 8. Worked example, end to end

**Problem in.** "Support workers at Kane's SIL house aren't applying the BSP strategies. Two incidents in July."

**Triage.** Fit: core. Reach: every SIL participant Harpers supports, roughly 30 plans. Evidence: two incident reports, family complaint. Risk: **C** (touches a BSP). Shape: tool plus process. Size: M. Not a duplicate. Recommend proceed. Kill condition: if the house has a staffing turnover problem, a better document won't fix it.

**G1.** Trent: proceed, but check the turnover point.

**Discover.** Evidence: Commission guidance on implementation of BSPs; literature on treatment integrity in PBS shows written plans alone have low adherence, and that brief visual summaries plus coaching raise it. Context: Harpers has a BSP template but no summary artefact; workers use a phone on shift, not a laptop. Voices: worker says "I'd read one page, not forty"; family says "I want to know they're all doing the same thing"; practitioner says "I don't want a summary that drifts from the plan." Red Team: the summary becomes the plan in practice and the BSP is never read; a stale summary after a plan review is worse than no summary. Turnover check: two of seven staff are new since June.

**Options.** (1) A one-page BSP "quick card" generated from the plan by a tool, versioned to the plan. (2) A 15-minute onboarding video per plan. (3) A practitioner coaching visit protocol, no document change. (4) Do nothing. Critic recommends (1) plus the coaching element of (3), and names the risk: drift between card and plan.

**G2.** Trent picks 1 + 3.

**Spec.** A generator that takes a BSP and produces a one-page card: triggers, early signs, what to do, what not to do, who to call. Card carries the BSP version and expiry. Acceptance: a new worker finds the response to a named behaviour in under 30 s; the card cannot be produced without a plan version; a card past the plan review date shows a warning. Compliance: no restrictive practice appears on the card without its authorisation reference.

**Build, Test, Review.** Builder produces the generator and the card template. Compliance Tester fails it: a card for a plan with a regulated restrictive practice omitted the authorisation reference. Blocking. Refine cycle 1 fixes it. Voices, worker seat: "what not to do" list is longer than "what to do". Should-fix; reordered. Domain Reviewer: language on one trigger could be read as blaming the participant. Fixed. Cycle 2 clean.

**Ship Pack.** Deliverable, the evidence above, and this line in "not validated": *No support worker has used a card on a shift yet.* Rollout: pilot at Kane's house for 30 days with a practitioner visit at week one. Success: zero incidents where a strategy in the plan was not applied; workers can name the top three strategies unprompted.

**G3.** Trent ships to pilot. Class C, so a second named reviewer signs. 30-day routine set.

**Learn.** At day 30, the Retro Agent collects the pilot data and proposes a change to the Spec skill: "for any deliverable used on shift, require a mobile-first acceptance criterion." That lands as a PR.

---

## 9. What to build first

Do not build all fifteen agents. Build the thinnest line that can ship one Class A or B solution, then widen.

1. **Week 1.** Problem Brief template, Triage Agent, the `/factory` skill that files an issue. Run five real problems through triage only. Learn what a good brief looks like from Trent's reactions at G1.
2. **Week 2.** Discovery agents and the Options Memo. Take the two best triaged problems through G2. This is where the factory earns trust or doesn't, because it is the first place it must change Trent's mind about something.
3. **Week 3.** Spec, one Builder (documents), Acceptance and Plain-Language testers, Presenter. Ship one Class B thing.
4. **Week 4.** Compliance Tester and Domain Reviewer. Attempt one Class C, expecting it to be slow.
5. **Then.** Routines for sourcing, the registry, the Retro Agent, and the Workflow script that runs a whole line unattended.

Measure from day one: Trent minutes per shipped solution, cycles per run, and 30-day usage. If Trent minutes per solution is not falling by week four, the gates are in the wrong place.

---

## 10. Things this design refuses to do

- **Ship on agent testing alone for anything that touches a person's plan or safety.** The persona testers are useful and they are not people.
- **Let a refine loop run past three cycles.** Repeated defects are a design signal.
- **Let the factory modify itself directly.** Retro proposes, a human merges.
- **Treat throughput as success.** The registry's 30-day column is the scoreboard.
- **Hide the case against.** Every recommendation carries its own strongest objection, at every gate.
