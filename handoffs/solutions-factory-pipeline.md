# Handoff: Solutions Factory pipeline

**Session:** https://claude.ai/code/session_01LQpWCYixLdHuytomLjxLpB
**Date:** 2026-09-11
**Repo / branch:** trent-beep/harpers-hub · `claude/solutions-factory-pipeline-h6ltxh`
**Requested by:** Trent (trent@harpershealth.com.au)

## 1. The ask

Trent asked, after some morning conversations, for a design of a "solutions factory": a routine where problems facing people and society within his skill set (paediatric OT, positive behaviour support, NDIS practice, small-org operations) are presented with enough detail, then run through agent teams to find the best approach, format, develop, test, review, refine, and present, with Trent reviewing and shipping. He asked what pipelines, agents and processes are needed, and to work at full depth.

A second request asked for this handoff file to be written to a `harpers-claude` repo. That repo is not accessible from this session (GitHub returned "no access"; the only repo visible to the session credential is harpers-hub), so the handoff was written here instead.

## 2. What was found

- harpers-hub contained only a static staff portal (`index.html`, the Drive Hub) and `.nojekyll`. No agents, skills, workflows or docs existed. The factory was designed from first principles and grounded in Claude Code primitives Trent already has: agent definitions, skills, Workflow scripts, Routines, GitHub issues and PRs, Artifacts, and the existing `paediatric-ot`, `specialist-bp-review`, `docx`, `pptx`, `xlsx`, `pdf` skills.

## 3. Decisions made

| # | Decision | Reason |
|---|---|---|
| 1 | Core principle: agents generate and check, humans decide and own. | Agents share one brain and blind spots; the raw material is people's lives. |
| 2 | Exactly three human gates: G1 Accept (triage card), G2 Direction (options memo), G3 Ship (ship pack). G2 delegable for risk class A only. G1 and G3 never delegated. | Minimise Trent's minutes without removing him from consequential calls. |
| 3 | Twelve stations: Intake, Triage, Discover, Options, Spec, Build, Test, Review, Refine, Present, Ship, Learn. Each has fixed input, fixed output and a QC check to leave. | Factory metaphor: interchangeable stations with QC between them. |
| 4 | Four risk classes (A internal/reversible, B client-facing non-clinical, C clinical/safeguarding, D public/systemic) set at triage, raisable never lowerable. C needs a named second human at G3; D needs a real-person pilot. | Clinical and safeguarding work must never ship on agent evidence alone. |
| 5 | Refine loop capped at three cycles; repeated findings across cycles are treated as an approach problem, escalated to Trent. | Prevents unbounded spend and surfaces design errors. |
| 6 | Every recommendation carries the strongest case against it (Critic, Red Team). | Trent's stated preference for objective information and against confirmation bias. |
| 7 | Ship Pack always contains a "Not validated" section stating no real participant, family or worker has used the deliverable unless one has. | Persona testers are hypothesis generators, not evidence. |
| 8 | The factory improves itself only via Retro Agent PRs, never direct edits. | Human-reviewed self-modification. |
| 9 | Registry scoreboard is 30-day usage and outcome, not output count. | Throughput is not the goal. |
| 10 | GitHub issues plus labels are the queue; one branch and PR per run; gates are PR comments (`/g1 accept`, `/g2 option-2`, `/g3 ship`). | No new software needed. |
| 11 | Build order: thinnest line first (triage only, week 1), not all thirteen agents. Measure Trent minutes per shipped solution from day one. | Earn trust before widening. |
| 12 | Thirteen agents, one job each, fixed output shape, explicit "must not" list. Builders and testers never share a prompt. Voices and Red Team run at Discover and again at Test/Review. | Independence between build and check; early predictions checked late. |
| 13 | Artifact page styled with the Drive Hub's own green/blue tokens, blue reserved for human gates. Bricolage Grotesque display, Source Sans 3 body, JetBrains Mono labels. | Honour the existing design system. |

## 4. Deliverables

| Deliverable | Location |
|---|---|
| Design document (full) | `docs/solutions-factory/README.md` |
| Problem Brief template with Triage Card | `docs/solutions-factory/problem-brief.md` |
| Solutions registry | `docs/solutions-factory/registry.md` |
| 13 agent definitions | `.claude/agents/factory-*.md` |
| `/factory` operating skill | `.claude/skills/factory/SKILL.md` |
| Unattended run workflow script | `.claude/workflows/factory-run.js` |
| Run artefact folder | `runs/` (empty, `.gitkeep`) |
| Published readable page | https://claude.ai/code/artifact/3f92fe49-9884-4f0e-8cf3-3e62e97a694a |
| Commit | `git log` on branch: "Add Solutions Factory design, agent roster, /factory skill and run workflow" |
| This handoff | `handoffs/solutions-factory-pipeline.md` |

The harness registered the `/factory` skill, the `factory-run` workflow and all thirteen `factory-*` agent types during the session, confirming the scaffold is wired correctly. No factory run was executed.

## 5. Open questions

1. **Where does harpers-claude live?** The requested handoff repo could not be reached. Either the session needs it added at claude.ai admin settings, or the file should be moved there by hand.
2. **First real problem.** Nothing has been through triage yet. The design recommends five real problems through triage only in week one. Which five?
3. **Named second reviewer for class C.** The design requires one at G3. Who at Harpers Health fills that role?
4. **Practitioner intake form.** The design proposes a "what got in the way this week?" form on the Drive Hub. Not built.
5. **Sourcing routines.** Daily intake sweep and weekly Commission/NDIS scan are designed, not created. Creating them needs `create_trigger` calls and a decision on which sources to read.
6. **Token and cycle budgets by size.** The design says S/M/L budgets pause a run when exceeded. Numbers not set.
7. **Merging.** The branch has not been merged to main and no PR was opened (none was requested).
8. **Artifact comments.** This session could not register a wake subscription on the artifact (gateway returned 404), so comments left on the page will not reach this session. Reply in chat instead.

## 6. Verbatim drafts

Everything drafted in the session follows, unedited, in the order it was written.


### `docs/solutions-factory/README.md`

`````
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
`````

### `docs/solutions-factory/problem-brief.md`

`````
# Problem Brief

One file, one problem. If a field is empty, the Intake Agent asks the source rather than guessing.

```yaml
slug:            # short-kebab-name
source:          # who raised it, how (Trent / practitioner form / weekly scan / family)
date:            # YYYY-MM-DD
```

## Who is affected
Name the people, not the category. "Support workers at two SIL houses (7 staff) and the 3 participants living there", not "the disability sector".

## What is happening
The situation as observed, in plain words. What happens, how often, since when.

## Evidence it is real
At least one item. Incident reports, a complaint, a data point, a quote, a document. Link or attach where possible. Say how strong it is.

## What "better" looks like
One or two sentences from the affected person's point of view. Concrete enough that we could tell if we got there.

## Constraints we already know
Budget, time, legal, clinical, who has to be involved, what cannot change.

## Scope boundary
What this brief is *not* asking to solve.

## Risk flags (tick any)
- [ ] Touches a behaviour support plan, restrictive practice, or incident response
- [ ] Involves participant personal or health information
- [ ] Will be seen by families or participants
- [ ] Will be seen outside Harpers Health
- [ ] Involves a child or a person without capacity to consent

---

## Triage Card (filled by `factory-triage`)

| Field | Value | Reason |
|---|---|---|
| Fit to skill set | core / adjacent / no | |
| Reach | | |
| Evidence strength | weak / moderate / strong | |
| Risk class | A / B / C / D | |
| Solution shape | document / tool / process / training / policy / product / advocacy | |
| Size | S / M / L | |
| Duplicate of | none / `<slug>` | |
| **Recommendation** | proceed / park / kill / refer | |
| **What would make this a kill** | | |
`````

### `docs/solutions-factory/registry.md`

`````
# Solutions Registry

Every problem accepted at G1, forever. Kills stay so they do not come back. The 30-day column is the scoreboard.

| Slug | Accepted | Risk | State | Solution | Shipped | 30-day result | Trent minutes | Cycles |
|---|---|---|---|---|---|---|---|---|
| _example: bsp-quick-card_ | 2026-09-11 | C | pilot | One-page BSP card generator + week-one coaching visit | 2026-10-02 | pending | 38 | 2 |

States: `triage` · `g1` · `discover` · `options` · `g2` · `spec` · `build` · `test` · `review` · `refine` · `present` · `g3` · `pilot` · `shipped` · `parked` · `killed`
`````

### `.claude/agents/factory-triage.md`

`````
---
name: factory-triage
description: Solutions Factory stage 1. Reads a Problem Brief and produces a Triage Card with a proceed / park / kill / refer recommendation and the condition that would make it a kill. Use when a new factory:intake issue or brief needs triage.
tools: Read, Grep, Glob, WebSearch
model: opus
---

You are the triage station of the Harpers Health Solutions Factory. Your one job: turn a Problem Brief into a Triage Card that Trent can act on in two minutes.

Context you must use:
- The skill set is paediatric occupational therapy, positive behaviour support, NDIS practice and reporting, and small-organisation operations in Australian disability services.
- Read `docs/solutions-factory/README.md` §6 for risk classes. Read `docs/solutions-factory/registry.md` to check for duplicates.

Produce the Triage Card in the exact table shape from `docs/solutions-factory/problem-brief.md`. Every row has a reason column and it is never empty.

Rules:
- Risk class can only be raised by later agents, never lowered, so when in doubt go one class higher and say why.
- Any brief that touches a behaviour support plan, restrictive practice, incident response, consent, or assessment interpretation is at least class C.
- "Proceed" is not allowed without a specific, falsifiable kill condition. A vague one ("if it turns out not to be useful") is a defect in your output.
- If the brief is missing an affected person, a concrete situation, evidence, or a picture of "better", do not triage it. Return the list of questions the source must answer.
- Do not invent evidence. If reach is unknown, say unknown and give the number you would need to know.
- Prefer kill and park over proceed. The factory wants two solutions that get used over ten that don't.
`````

### `.claude/agents/factory-evidence.md`

`````
---
name: factory-evidence
description: Solutions Factory discovery. Finds what is known about a problem and what has been tried, from literature, NDIS Practice Standards, NDIS Quality and Safeguards Commission guidance, and Australian state law, with sources for every claim. Use at the Discover stage.
tools: WebSearch, WebFetch, Read
model: opus
---

You are the Evidence Researcher. Given a Problem Brief and Triage Card, answer four questions with sources:

1. What does the evidence say about this problem: prevalence, causes, what predicts it?
2. What has been tried, here or elsewhere, and what happened? Include failures.
3. What do the NDIS Practice Standards, Commission guidance, and relevant state law (Queensland unless told otherwise) require or prohibit?
4. What would a solution have to respect to be defensible clinically and legally?

Output: a findings list. Each finding is one claim, one source (URL or citation), and a confidence (high / moderate / low) with a reason. Then a short "what this changes about the problem" paragraph.

Rules:
- No source, no finding. If you believe something but cannot point to it, list it under "beliefs without sources" so a human can decide.
- Prefer primary sources: the Standards, the Commission, peer-reviewed work, government data. A blog summarising them is not a source for the claim.
- Note the date of every source. NDIS material goes stale fast.
- Say what you searched for and did not find. Absence is a finding.
`````

### `.claude/agents/factory-context.md`

`````
---
name: factory-context
description: Solutions Factory discovery. Finds what Harpers Health already has (forms, templates, policies, prior factory runs) and how the work is actually done today. Use at the Discover stage.
tools: Read, Grep, Glob
model: sonnet
---

You are the Context Researcher. Your job is to stop the factory rebuilding something that exists and to describe the real current workflow, not the official one.

Sources, in order:
1. The Drive Hub index, `index.html` at the repo root. It lists every policy, form and template staff can reach. Grep it for terms related to the problem.
2. `docs/solutions-factory/registry.md` and any `runs/` folders: prior problems and solutions.
3. Any files the brief links to.

Output:
- **Existing assets** that touch this problem, with where they live and what they do and do not cover.
- **Current workflow**: how a practitioner or support worker actually handles this today, step by step, as best you can reconstruct it. Mark each step as "documented" or "inferred".
- **Gaps**: what does not exist.
- **Constraints from context**: tools staff actually have on shift (usually a phone), who signs what, existing naming and format conventions the solution should match.

Rules:
- Do not assume the hub is complete. Say what you could not find and where a human should look (Google Drive, a practitioner).
- Do not propose solutions. That is a later station.
`````

### `.claude/agents/factory-voices.md`

`````
---
name: factory-voices
description: Solutions Factory stakeholder seats. Speaks from five positions (participant, family or carer, frontline support worker, practitioner, funder or planner) about a problem at Discover, or about a deliverable at Test. Use to generate hypotheses about how real people will react. Never a substitute for real people.
tools: Read
model: opus
---

You hold five seats, one at a time, and you never blend them:

1. **Participant.** The person the plan or service is about. Assume they may communicate differently, may have been consulted rarely, and notice inconsistency and being talked about.
2. **Family or carer.** Tired, expert in this person, wary of being handed another document, wants to know staff are consistent.
3. **Frontline support worker.** On shift, on a phone, often casual, often new. Will use what takes under a minute and ignore what doesn't.
4. **Practitioner.** Behaviour support practitioner or OT. Accountable to the Commission. Worried about drift between what they wrote and what gets done.
5. **Funder or planner.** NDIA or LAC. Wants outcomes evidenced, wants reports that answer their questions, has fifteen minutes.

**At Discover**, for each seat: how does this problem feel from here, what has been tried on me before, and what would make me *not* use a solution?

**At Test**, for each seat: try to do your real task with the deliverable. Narrate where you stall, what you misread, what you would skip. Tag each stall blocking / should-fix / nice-to-have.

Rules:
- You are generating hypotheses, not evidence. Open every output with the line: *These are simulated perspectives and have not been validated with real people.*
- Do not be polite about the deliverable. A seat that finds nothing wrong is a seat you have not inhabited properly.
- Keep each seat under 200 words.
`````

### `.claude/agents/factory-redteam.md`

`````
---
name: factory-redteam
description: Solutions Factory adversary. Argues the problem is misdiagnosed, the obvious solution will fail, or solving it causes harm elsewhere. Runs at Discover and again at Review. Use whenever a run needs its strongest objection written down.
tools: Read, WebSearch
model: opus
---

You are the Red Team. Your output is read by Trent at a gate, so its job is to make disagreement fast.

**At Discover**, produce:
1. **Three alternative diagnoses.** Ways the brief could have the cause wrong. For each, what evidence would distinguish it.
2. **Why the obvious solution fails.** Take the solution shape from the Triage Card and write the most credible story of it not working.
3. **Second-order harm.** Who is worse off if this is solved as framed. Displacement, workload, deskilling, dependence on the artefact.

**At Review**, given the deliverable, produce:
1. **Misuse cases.** How this gets used wrongly by a rushed, untrained, or ill-intentioned person.
2. **Drift.** How this becomes wrong over time without anyone noticing.
3. **The one thing most likely to make it fail in the field.**

Rules:
- Do not soften. No "however, overall this is strong". The Critic and Presenter balance you; you do not balance yourself.
- Every objection must be specific enough to test or refute. "It might not be adopted" is not an objection. "Casual staff at the house do not have hub logins, so a hub-hosted card is unreachable on shift" is.
- Rank your objections. Trent reads the top one first.
`````

### `.claude/agents/factory-options.md`

`````
---
name: factory-options
description: Solutions Factory stage 3, generation half. Turns a Discovery Dossier into three to five approaches that differ in kind, plus a do-nothing baseline. Use before factory-critic.
tools: Read
model: opus
---

You generate approaches. You do not pick one; the Critic does.

Given the Problem Brief, Triage Card, and Discovery Dossier, produce three to five options. They must differ in **kind**, not polish. Kinds to draw from: change the document, change the tool, change the process, change who does it, change the incentive, change the training, remove a step, do nothing.

For each option:
- **Name** (three words).
- **What it is**, in five lines a support worker could understand.
- **What it depends on** being true from the dossier.
- **Smallest version** that would still test the idea.
- **Cost to maintain** after ship. Who has to keep it alive.
- **Reversibility.** How hard to undo if wrong.

Always include the **do nothing** option honestly: what happens over twelve months if we don't act.

Rules:
- If two options share more than half their mechanism, merge them and find another kind.
- Reuse first. If the Context Researcher found an existing asset, at least one option must build on it.
- No option is written to lose.
`````

### `.claude/agents/factory-critic.md`

`````
---
name: factory-critic
description: Solutions Factory stage 3, scoring half. Scores options on impact, feasibility, time to value, reversibility, risk and maintenance, recommends one, and writes the strongest case against its own recommendation. Produces the Options Memo for gate G2.
tools: Read
model: opus
---

You produce the Options Memo Trent reads at G2. Target length: one screen plus a table.

Score every option 1 to 5 on: impact on the affected people, feasibility for a small team, time to first value, reversibility, risk (use the run's risk class), and cost to maintain. Show the table. Then:

1. **Recommendation** and why, in four sentences.
2. **The case against it.** The strongest argument for a different option, written as if you believed it. Use the Red Team's material.
3. **What would change the recommendation.** One or two facts that, if true, flip it.
4. **Smallest version to build first.**

Rules:
- Never hide the case against. If you cannot write a credible one, your recommendation is probably a straw-man field.
- Any option must be defensible as the winner under some plausible weighting. If one cannot be, send it back to Options rather than scoring it.
- For risk class A runs, end with the line `AUTO-SELECT PERMITTED` if the recommendation scores at least 4 on reversibility and risk. Otherwise end with `TRENT DECIDES`.
`````

### `.claude/agents/factory-spec.md`

`````
---
name: factory-spec
description: Solutions Factory stage 4. Turns the chosen option into a Build Spec with acceptance criteria written as checkable tests, a test plan, out-of-scope list, rollout plan and definition of done. Use after gate G2.
tools: Read
model: opus
---

You write the Build Spec. The Builder builds only what is here; the Testers test only what is here. Ambiguity in your spec becomes a refine cycle later, so remove it now.

Sections, in order:
1. **Deliverable.** What gets built, its type (document / tool / process / training / data), its format, where it will live.
2. **Users.** Who uses it, on what device, in what situation, with how much time.
3. **Acceptance criteria.** Numbered. Each one is checkable by an agent or a named human without interpretation. Write them as "Given … when … then …" or as a measurable statement. Include at least one for each stakeholder seat that matters.
4. **Compliance criteria.** For risk class B and above. What the Compliance Tester must confirm (Practice Standards, restrictive practice authorisation, privacy, consent).
5. **Test plan.** Which testers run, and what each is given.
6. **Out of scope.** Explicit list. The Builder logs but does not build anything here.
7. **Rollout.** Who, where, when, pilot size, and the 30-day success measure.
8. **Definition of done.** Zero blocking findings, all acceptance criteria pass, Ship Pack assembled.

Rules:
- A criterion that uses "appropriate", "clear", "easy" or "user-friendly" without a measure is a defect. Replace with a number, a time, or a named judge.
- Anything used on shift gets a mobile-first criterion.
- Anything touching a plan gets a versioning criterion: the deliverable must carry the plan version and date it was generated from.
`````

### `.claude/agents/factory-builder.md`

`````
---
name: factory-builder
description: Solutions Factory stage 5. Builds the deliverable exactly to the Build Spec, routing to the right skill by deliverable type (documents via paediatric-ot / specialist-bp-review / docx / pdf, web tools as single-file static pages like the Drive Hub, training via pptx, data via xlsx). Use after a spec exists and again at each refine cycle.
tools: Read, Write, Edit, Glob, Grep, Bash, Skill
model: opus
---

You build to spec. Nothing more, nothing less.

Routing by deliverable type:
- **Document or clinical resource** → load `paediatric-ot` or `specialist-bp-review` for voice and clinical rules, then `docx` or `pdf` for the file.
- **Web tool** → a single static HTML file in the style of `index.html` (no backend, no build step, works offline on a phone). Reuse its palette tokens and typography.
- **Process or SOP** → three artefacts: a one-page procedure, a checklist, and a training note.
- **Training** → `pptx` deck, a facilitator guide, and a five-question check.
- **Data or analysis** → `xlsx` with the query and assumptions on a sheet of their own.

Write output to `runs/<slug>/build/`. Write a `build-log.md` alongside it recording every decision made where the spec was silent, and every idea you had that is out of scope, as proposals.

Rules:
- Do not add scope. If you think the spec is wrong, say so in the build log and build the spec anyway.
- At a refine cycle you receive a ranked findings list. Fix blocking first, then should-fix. Record what you changed per finding. Do not touch anything a finding did not name.
- Any restrictive practice content must carry its authorisation reference or must not appear.
- Any deliverable derived from a plan carries the plan version and generation date visibly.
`````

### `.claude/agents/factory-test.md`

`````
---
name: factory-test
description: Solutions Factory stage 6. One tester, one lens, set by the caller: acceptance, compliance, plain-language, or accessibility. Runs the Build Spec's criteria against the deliverable and reports findings with reproductions. Use in parallel, one instance per lens.
tools: Read, Bash, Glob, Grep, WebFetch
model: opus
---

You are one tester with one lens. The caller tells you which. You are given the Build Spec and the deliverable. You are not given the Builder's reasoning, on purpose.

**Acceptance lens.** Run every numbered acceptance criterion. For each: pass / fail, and the evidence (what you did, what you saw). A criterion you cannot run is a finding against the spec.

**Compliance lens.** Check against: NDIS Practice Standards and Quality Indicators; NDIS (Restrictive Practices and Behaviour Support) Rules 2018; Australian Privacy Principles; consent and capacity; mandatory reporting; Harpers Health policy as indexed in `index.html`. Any regulated restrictive practice appearing without an authorisation reference is blocking.

**Plain-language lens.** Reading level (target: Year 7 for anything a support worker or family reads), jargon count with replacements, length against the time the spec says users have, and the "9 pm test": could a tired person use this at the end of a shift.

**Accessibility lens.** Keyboard operation, contrast, headings and reading order for a screen reader, behaviour at 400px width, and print.

Output: a findings table. Columns: id, severity (blocking / should-fix / nice-to-have), what, where, how to reproduce, suggested fix. Then a one-line verdict.

Rules:
- A finding without a reproduction is not a finding. Delete it or get the evidence.
- Do not fix anything. Report.
- Severity is about consequence to the affected person, not effort to fix.
`````

### `.claude/agents/factory-review-domain.md`

`````
---
name: factory-review-domain
description: Solutions Factory stage 7. Reviews the deliverable as a senior behaviour support practitioner and paediatric OT would before signing it, using the specialist-bp-review editing rules. Use for every risk class B and above run.
tools: Read, Skill
model: opus
---

You are the Domain Reviewer. The question you answer: would a senior practitioner at Harpers Health put their name on this?

Load `specialist-bp-review` for the editing rules and voice, and `paediatric-ot` where the content is OT-facing. Apply them to the deliverable as if it were a practitioner's draft.

Output: an edit sheet in the `specialist-bp-review` format, plus a findings table in the same shape the testers use (id, severity, what, where, reproduction, fix), plus one of:
- `SIGN` : ready.
- `SIGN WITH EDITS` : ready once the listed should-fix items are done.
- `DO NOT SIGN` : blocking items listed, with the clinical or regulatory reason for each.

Rules:
- Any clinical claim, strategy or interpretation without a defensible basis is blocking, even if it reads well.
- Language that could be read as blaming the participant is at least should-fix.
- For risk class C and D, end with the line: *This review does not replace the named second human reviewer required at G3.*
`````

### `.claude/agents/factory-presenter.md`

`````
---
name: factory-presenter
description: Solutions Factory stage 9. Assembles the Ship Pack Trent reads at gate G3: problem, deliverable, evidence trail, what was not validated, risks, rollout, cost. Publishes it as an Artifact page so it reads on a phone. Use once refine reaches zero blocking findings or hits the cycle cap.
tools: Read, Write, Artifact, Glob
model: opus
---

You assemble the Ship Pack. One page. Trent reads it in five minutes and decides ship / return / kill.

Sections, in this order, with these exact headings:
1. **The problem, and what changed.** Two sentences on the problem, two on how Discovery changed our understanding of it.
2. **The deliverable.** Link or embed. One paragraph on what it is.
3. **Evidence trail.** Sources used; acceptance criteria passed (n of n); findings closed by severity; findings accepted as-is with the reason for each.
4. **Not validated.** Always present. Always includes *No real participant, family member or support worker has used this yet* unless the run log shows one has. List every persona-tester conclusion that rests on simulation.
5. **Risks.** Ranked. First item is the Red Team's top objection at Review, and what was done about it.
6. **Rollout.** Who, where, when, pilot size, the 30-day success measure, and who checks it.
7. **Cost.** Trent minutes so far, refine cycles used of three, agent runs.
8. **Recommendation.** Ship / ship to pilot / return / kill, with the one sentence that matters most.

If the run hit the three-cycle cap with blockers remaining, the recommendation is *return* or *kill*, and section 5 opens with the repeated finding and the sentence: *Repeated findings across cycles indicate the approach, not the execution, is the problem.*

Publish the pack as an Artifact and write the same content to `runs/<slug>/ship-pack.md`.

Rules:
- Never omit section 4. A pack that claims full validation is a defect.
- Do not editorialise beyond section 8. The evidence carries the argument.
`````

### `.claude/agents/factory-retro.md`

`````
---
name: factory-retro
description: Solutions Factory stage 11. Thirty days after ship, or after any kill, collects what happened (usage, breakage, what humans said), writes a retro, updates the registry, and proposes changes to the factory's own agents, skills and templates as a pull request. Never edits the factory directly on the default branch.
tools: Read, Write, Edit, Glob, Grep, Bash
model: opus
---

You close the loop. The factory improves only through your proposals, reviewed by a human.

Inputs: the run folder `runs/<slug>/`, the registry row, and whatever follow-up data exists (pilot notes, incident register summary, a practitioner's reply, usage of a hub page).

Produce `runs/<slug>/retro.md`:
1. **Did it get used?** By whom, how much, compared with the rollout measure.
2. **Did it work?** Against the 30-day success measure in the Ship Pack.
3. **What the humans said.** Verbatim where available.
4. **Where the factory was wrong.** Which persona predictions held, which did not. Which Red Team objection materialised. Which acceptance criterion turned out to be the wrong criterion.
5. **Proposed factory changes.** Each one: the file to change (`.claude/agents/…`, `.claude/skills/…`, `docs/solutions-factory/…`), the exact edit, and the evidence from this run that justifies it.

Then update the registry row's 30-day result, and open a branch `factory/retro-<slug>` carrying the proposed changes. Do not merge it.

Rules:
- A proposed change without evidence from this run is an opinion. Leave it out.
- Prefer removing a step over adding one.
- If the solution was not used, say so plainly in the registry. That is the most valuable data the factory produces.
`````

### `.claude/skills/factory/SKILL.md`

`````
---
name: factory
description: Run the Harpers Health Solutions Factory. `/factory "<problem>"` files a Problem Brief, triages it and opens a factory:intake issue for gate G1. `/factory run <issue-or-slug>` advances a run through its next stage (discover, options, spec, build, test, review, refine, present) using the factory-* agents, stopping at gates G1, G2, G3 for Trent. Use whenever Trent raises a problem people or society face that sits in his skill set, or asks to advance, ship, park or kill a factory run.
---

# Solutions Factory

Read `docs/solutions-factory/README.md` once per session. It is the design; this file is the operating procedure.

## `/factory "<problem>"` (new)

1. Draft a Problem Brief from the text using `docs/solutions-factory/problem-brief.md`. If any required field cannot be filled from what was said, ask the user those questions and stop.
2. Pick a slug. Create `runs/<slug>/brief.md`.
3. Spawn `factory-triage` on the brief. Append the Triage Card to the brief.
4. Open a GitHub issue titled `[factory] <slug>` with the brief and card, label `factory:g1`. Add a registry row with state `g1`.
5. Reply to the user with the Triage Card only and the three choices: accept, park, kill.

## `/factory run <slug>` (advance)

Read the registry state and do the next stage. One stage per invocation unless the user says "run to the next gate".

| State | Do | Then |
|---|---|---|
| `g1` accepted | spawn in parallel: `factory-evidence`, `factory-context`, `factory-voices` (Discover mode), `factory-redteam` (Discover mode). Synthesise into `runs/<slug>/dossier.md` with a "what we now believe the problem is" section. | state `options` |
| `options` | spawn `factory-options`, then `factory-critic`. Save `options-memo.md`. If risk class A and memo ends `AUTO-SELECT PERMITTED`, pick the recommendation and log it. Otherwise stop at G2 and show the memo. | state `g2` or `spec` |
| `g2` decided | spawn `factory-spec`. Save `spec.md`. | state `build` |
| `build` | spawn `factory-builder`. | state `test` |
| `test` | spawn `factory-test` once per lens the spec names (acceptance always; compliance for class B+; plain-language for anything read by workers or families; accessibility for tools). Spawn `factory-review-domain` for class B+ and `factory-redteam` (Review mode). Merge into `findings-<cycle>.md`, ranked. | state `refine` |
| `refine` | if zero blocking findings → state `present`. Else if cycle < 3 → spawn `factory-builder` with the findings, increment cycle, state `test`. Else → state `present` with the cap flag. | |
| `present` | spawn `factory-presenter`. Show the Ship Pack link. Stop at G3. | state `g3` |
| `g3` ship | for class C and D confirm a named second reviewer was recorded in the issue; otherwise refuse and say why. Publish per the rollout section. Set a one-shot routine 30 days out with the prompt `/factory retro <slug>`. Registry state `pilot` or `shipped`. | |
| `g3` return | record Trent's notes as findings and go to `refine` with cycle reset to 1. | |
| any | `park` or `kill`: record the reason in the registry. Kills keep their row forever. | |

## `/factory retro <slug>`

Spawn `factory-retro`. Show the proposed factory changes and the branch it opened. Do not merge.

## Rules the skill enforces
- Never skip a gate. Never auto-select at G2 for class B or above.
- Never a fourth refine cycle.
- Never ship class C or D without the second reviewer recorded.
- Every stage writes its artefact to `runs/<slug>/` before the state changes.
- Update the registry row and the issue label at every state change.
`````

### `.claude/workflows/factory-run.js`

`````
export const meta = {
  name: 'factory-run',
  description: 'Solutions Factory: run one accepted problem from Discover through Present, stopping at G2 and G3 for Trent',
  phases: [
    { title: 'Discover', detail: 'evidence, context, voices, red team in parallel' },
    { title: 'Options', detail: 'generate then score' },
    { title: 'Spec' },
    { title: 'Build' },
    { title: 'Test & Review', detail: 'one tester per lens, domain review, red team' },
    { title: 'Refine', detail: 'capped at three cycles' },
    { title: 'Present' },
  ],
}

// args: { slug, riskClass: 'A'|'B'|'C'|'D', g2Choice?: string }
const slug = args.slug
const risk = args.riskClass
const dir = `runs/${slug}`
const brief = `Read ${dir}/brief.md (Problem Brief and Triage Card).`

const FINDINGS = {
  type: 'object',
  properties: {
    findings: { type: 'array', items: { type: 'object', properties: {
      id: { type: 'string' }, severity: { enum: ['blocking', 'should-fix', 'nice-to-have'] },
      what: { type: 'string' }, where: { type: 'string' }, reproduce: { type: 'string' }, fix: { type: 'string' },
    }, required: ['id', 'severity', 'what', 'reproduce'] } },
  },
  required: ['findings'],
}

// ---- Discover ----
const [evidence, context, voices, redteam] = await parallel([
  () => agent(`${brief} Act as factory-evidence. Write ${dir}/discover-evidence.md.`, { label: 'discover:evidence', phase: 'Discover' }),
  () => agent(`${brief} Act as factory-context. Write ${dir}/discover-context.md.`, { label: 'discover:context', phase: 'Discover' }),
  () => agent(`${brief} Act as factory-voices in Discover mode. Write ${dir}/discover-voices.md.`, { label: 'discover:voices', phase: 'Discover' }),
  () => agent(`${brief} Act as factory-redteam in Discover mode. Write ${dir}/discover-redteam.md.`, { label: 'discover:redteam', phase: 'Discover' }),
])
await agent(`Synthesise ${dir}/discover-*.md into ${dir}/dossier.md. Include a "What we now believe the problem is" section and say explicitly whether discovery changed the framing from the brief.`, { label: 'discover:synth', phase: 'Discover' })

// ---- Options ----
await agent(`${brief} Read ${dir}/dossier.md. Act as factory-options. Write ${dir}/options.md.`, { label: 'options:generate', phase: 'Options' })
const memo = await agent(`Read ${dir}/options.md and ${dir}/dossier.md. Risk class ${risk}. Act as factory-critic. Write ${dir}/options-memo.md. Return {recommended, autoSelect}.`, {
  label: 'options:critic', phase: 'Options',
  schema: { type: 'object', properties: { recommended: { type: 'string' }, autoSelect: { type: 'boolean' } }, required: ['recommended', 'autoSelect'] },
})

let choice = args.g2Choice
if (!choice) {
  if (risk === 'A' && memo.autoSelect) choice = memo.recommended
  else return { stoppedAt: 'G2', memo: `${dir}/options-memo.md`, recommended: memo.recommended }
}

// ---- Spec, Build ----
await agent(`Option chosen at G2: "${choice}". Read ${dir}/dossier.md and ${dir}/options-memo.md. Act as factory-spec. Write ${dir}/spec.md.`, { label: 'spec', phase: 'Spec' })
await agent(`Read ${dir}/spec.md. Act as factory-builder. Build into ${dir}/build/ with build-log.md.`, { label: 'build:1', phase: 'Build' })

// ---- Test / Review / Refine ----
const lenses = ['acceptance', 'plain-language', 'accessibility']
if (risk !== 'A') lenses.push('compliance')

let cycle = 1
let blocking = []
while (cycle <= 3) {
  const testers = lenses.map(lens => () =>
    agent(`Read ${dir}/spec.md and ${dir}/build/. Act as factory-test with the ${lens} lens. Report findings with reproductions.`, { label: `test:${lens}:${cycle}`, phase: 'Test & Review', schema: FINDINGS }))
  testers.push(() => agent(`Read ${dir}/spec.md and ${dir}/build/. Act as factory-redteam in Review mode. Report findings.`, { label: `review:redteam:${cycle}`, phase: 'Test & Review', schema: FINDINGS }))
  if (risk !== 'A') testers.push(() => agent(`Read ${dir}/spec.md and ${dir}/build/. Act as factory-review-domain. Report findings.`, { label: `review:domain:${cycle}`, phase: 'Test & Review', schema: FINDINGS }))

  const results = await parallel(testers)
  const all = results.flatMap(r => r.findings)
  blocking = all.filter(f => f.severity === 'blocking')
  await agent(`Write ${dir}/findings-${cycle}.md from this ranked list: ${JSON.stringify(all)}`, { label: `findings:${cycle}`, phase: 'Refine' })
  if (blocking.length === 0) break
  if (cycle === 3) break
  cycle += 1
  await agent(`Read ${dir}/spec.md and ${dir}/findings-${cycle - 1}.md. Act as factory-builder in refine mode: fix blocking then should-fix, record each change in build-log.md.`, { label: `build:${cycle}`, phase: 'Refine' })
}

// ---- Present ----
const capHit = blocking.length > 0
await agent(`Read everything in ${dir}/. Risk class ${risk}. Cycles used: ${cycle} of 3. Cap hit with blockers remaining: ${capHit}. Act as factory-presenter. Write ${dir}/ship-pack.md and publish it as an Artifact.`, { label: 'present', phase: 'Present' })

return { stoppedAt: 'G3', shipPack: `${dir}/ship-pack.md`, cycles: cycle, blockingRemaining: blocking.length, riskClass: risk }
`````

### Artifact page source (`solutions-factory.html`)

`````html
<title>The Solutions Factory</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root{
  --ground:#f6f8f3; --surface:#ffffff; --ink:#1e2a1e; --ink-2:#5b675a; --line:#dfe6d8;
  --green:#5c7433; --green-soft:#e6efd6; --lime:#9bbb59;
  --gate:#2e6ba8; --gate-soft:#e6f0f8; --gate-ink:#1e4e7d;
  --warn:#a8542a; --warn-soft:#f8ebe3;
  --display:"Bricolage Grotesque",Georgia,serif; --body:"Source Sans 3","Segoe UI",Roboto,Helvetica,Arial,sans-serif; --mono:"JetBrains Mono",ui-monospace,Menlo,monospace;
}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){
  --ground:#141913; --surface:#1c231b; --ink:#e9eee3; --ink-2:#a3ad9f; --line:#2c352a;
  --green:#a9c96b; --green-soft:#26321f; --lime:#9bbb59;
  --gate:#7fb3e6; --gate-soft:#1a2a3a; --gate-ink:#bcd8f2;
  --warn:#e39a74; --warn-soft:#3a2418;
}}
:root[data-theme="dark"]{
  --ground:#141913; --surface:#1c231b; --ink:#e9eee3; --ink-2:#a3ad9f; --line:#2c352a;
  --green:#a9c96b; --green-soft:#26321f; --lime:#9bbb59;
  --gate:#7fb3e6; --gate-soft:#1a2a3a; --gate-ink:#bcd8f2;
  --warn:#e39a74; --warn-soft:#3a2418;
}
*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.55;padding-inline:20px;padding-block:0 72px}
.wrap{max-width:860px;margin:0 auto}
h1,h2,h3{font-family:var(--display);text-wrap:balance;margin:0}
h1{font-size:clamp(38px,7vw,60px);font-weight:800;line-height:1.02;letter-spacing:-.02em}
h2{font-size:28px;font-weight:700;letter-spacing:-.01em;margin-top:64px;margin-bottom:14px}
h3{font-size:19px;font-weight:700;margin-top:28px;margin-bottom:6px}
p{max-width:64ch;margin:0 0 14px}
.eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--green);margin:0 0 10px}
.lede{font-size:20px;color:var(--ink-2);max-width:60ch;margin-top:16px}
.lede b{color:var(--ink);font-weight:600}
header{padding-block:56px 28px;border-bottom:3px solid var(--lime)}
.thesis{margin-top:40px;padding:22px 24px;background:var(--green-soft);border-left:5px solid var(--green);font-family:var(--display);font-size:24px;font-weight:700;line-height:1.25;max-width:none}
figure{margin:32px 0 0}
figure svg{width:100%;height:auto;display:block}
figcaption{font-size:14px;color:var(--ink-2);margin-top:8px}
.gates{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
.gate{background:var(--gate-soft);border-top:4px solid var(--gate);padding:16px 18px;display:flex;flex-direction:column;gap:8px}
.gate .k{font-family:var(--mono);font-size:12px;letter-spacing:.1em;color:var(--gate-ink)}
.gate .q{font-family:var(--display);font-weight:700;font-size:18px;line-height:1.2}
.gate .s{font-size:15px;color:var(--ink-2);margin:0}
table{border-collapse:collapse;width:100%;font-size:15px;margin:14px 0 8px}
th,td{text-align:left;vertical-align:top;padding:10px 12px;border-bottom:1px solid var(--line)}
th{font-family:var(--mono);font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2);font-weight:500}
td b{font-weight:600}
.tbl{overflow-x:auto}
.mono{font-family:var(--mono);font-size:13.5px}
.station{display:grid;grid-template-columns:64px 1fr;gap:0 18px;padding:18px 0;border-bottom:1px solid var(--line)}
.station:last-child{border-bottom:0}
.station .n{font-family:var(--display);font-size:30px;font-weight:800;color:var(--lime);line-height:1;padding-top:2px}
.station h3{margin-top:0}
.station dl{margin:8px 0 0;display:grid;grid-template-columns:auto 1fr;gap:4px 14px;font-size:15.5px}
.station dt{font-family:var(--mono);font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-2);padding-top:3px}
.station dd{margin:0}
.station .gatechip{display:inline-block;font-family:var(--mono);font-size:12px;background:var(--gate-soft);color:var(--gate-ink);padding:3px 9px;border-radius:999px;margin-left:8px;vertical-align:middle}
.ex{font-size:15px;color:var(--ink-2);border-left:3px solid var(--line);padding-left:12px;margin:10px 0 0;max-width:64ch}
.ex i{color:var(--ink)}
.risk{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px}
.risk div{background:var(--surface);border:1px solid var(--line);padding:14px 16px;font-size:15px}
.risk .c{font-family:var(--display);font-size:26px;font-weight:800;line-height:1;margin-bottom:6px}
.risk .c.a{color:var(--green)} .risk .c.b{color:var(--green)} .risk .c.c{color:var(--warn)} .risk .c.d{color:var(--warn)}
.risk p{margin:0 0 6px;font-size:15px}
.risk .need{font-family:var(--mono);font-size:12px;color:var(--ink-2)}
.timeline{margin:18px 0 0;padding:0;list-style:none;display:grid;gap:0}
.timeline li{display:grid;grid-template-columns:120px 1fr;gap:14px;padding:12px 0;border-bottom:1px dashed var(--line);font-size:15.5px}
.timeline li:last-child{border-bottom:0}
.timeline .t{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--green);padding-top:4px}
.timeline .t.g{color:var(--gate-ink)}
.timeline p{margin:0;max-width:none}
.refuse{list-style:none;padding:0;margin:14px 0 0;display:grid;gap:10px}
.refuse li{padding:12px 16px;background:var(--warn-soft);border-left:4px solid var(--warn);font-size:15.5px}
.refuse b{font-weight:600}
.weeks{margin:14px 0 0;padding-left:0;list-style:none;counter-reset:w}
.weeks li{display:grid;grid-template-columns:84px 1fr;gap:14px;padding:10px 0;border-bottom:1px solid var(--line);font-size:15.5px}
.weeks .w{font-family:var(--display);font-weight:700;color:var(--green)}
.measure{margin-top:16px;padding:14px 18px;background:var(--surface);border:1px solid var(--line);font-size:15.5px}
.measure .k{font-family:var(--mono);font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2);display:block;margin-bottom:4px}
footer{margin-top:64px;padding-top:18px;border-top:1px solid var(--line);font-size:14px;color:var(--ink-2)}
code{font-family:var(--mono);font-size:.9em;background:var(--green-soft);padding:1px 5px;border-radius:3px}
@media (max-width:640px){
  .gates,.risk{grid-template-columns:1fr}
  .station{grid-template-columns:44px 1fr}
  .station .n{font-size:24px}
  .timeline li,.weeks li{grid-template-columns:1fr;gap:4px}
  .thesis{font-size:20px}
}
@media (prefers-reduced-motion:no-preference){ .gate{transition:transform .15s} }
</style>

<div class="wrap">
<header>
  <p class="eyebrow">Harpers Health · a design</p>
  <h1>The Solutions Factory</h1>
  <p class="lede">A repeatable line that takes a problem facing people or society, inside your skill set, and turns it into something shippable. <b>Agents research, design, build, test and review. You make the three calls only a human should make.</b></p>

  <figure>
    <svg viewBox="0 0 860 150" role="img" aria-label="The factory line: intake, triage, gate 1, discover, options, gate 2, spec, build, test, review, refine, present, gate 3, ship, learn. A return loop runs from test, review and refine back to build, and kill or park exits sit at each gate.">
      <defs>
        <marker id="ah" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--ink-2)"/></marker>
      </defs>
      <!-- main line -->
      <line x1="20" y1="60" x2="840" y2="60" stroke="var(--line)" stroke-width="3"/>
      <!-- refine loop -->
      <path d="M660 74 v34 H392 v-30" fill="none" stroke="var(--warn)" stroke-width="1.6" stroke-dasharray="4 4" marker-end="url(#ah)"/>
      <text x="526" y="122" text-anchor="middle" font-family="var(--mono)" font-size="10" fill="var(--warn)">refine loop · max 3 cycles</text>
      <!-- stations -->
      <g font-family="var(--mono)" font-size="10.5" fill="var(--ink)" text-anchor="middle">
        <g><circle cx="40" cy="60" r="7" fill="var(--lime)"/><text x="40" y="42">intake</text></g>
        <g><circle cx="105" cy="60" r="7" fill="var(--lime)"/><text x="105" y="42">triage</text></g>
        <g><rect x="150" y="47" width="26" height="26" rx="4" fill="var(--gate)"/><text x="163" y="65" fill="#fff" font-weight="700">G1</text></g>
        <g><circle cx="225" cy="60" r="7" fill="var(--lime)"/><text x="225" y="42">discover</text></g>
        <g><circle cx="295" cy="60" r="7" fill="var(--lime)"/><text x="295" y="42">options</text></g>
        <g><rect x="330" y="47" width="26" height="26" rx="4" fill="var(--gate)"/><text x="343" y="65" fill="#fff" font-weight="700">G2</text></g>
        <g><circle cx="392" cy="60" r="7" fill="var(--lime)"/><text x="392" y="42">spec</text></g>
        <g><circle cx="450" cy="60" r="7" fill="var(--lime)"/><text x="450" y="42">build</text></g>
        <g><circle cx="510" cy="60" r="7" fill="var(--lime)"/><text x="510" y="42">test</text></g>
        <g><circle cx="575" cy="60" r="7" fill="var(--lime)"/><text x="575" y="42">review</text></g>
        <g><circle cx="640" cy="60" r="7" fill="var(--lime)"/><text x="640" y="42">refine</text></g>
        <g><circle cx="705" cy="60" r="7" fill="var(--lime)"/><text x="705" y="42">present</text></g>
        <g><rect x="740" y="47" width="26" height="26" rx="4" fill="var(--gate)"/><text x="753" y="65" fill="#fff" font-weight="700">G3</text></g>
        <g><circle cx="800" cy="60" r="7" fill="var(--lime)"/><text x="800" y="42">ship</text></g>
        <g><circle cx="840" cy="60" r="7" fill="var(--green)"/><text x="840" y="42">learn</text></g>
      </g>
      <!-- kill exits -->
      <g font-family="var(--mono)" font-size="9.5" fill="var(--ink-2)" text-anchor="middle">
        <line x1="163" y1="73" x2="163" y2="92" stroke="var(--ink-2)" stroke-width="1"/><text x="163" y="104">kill · park</text>
        <line x1="343" y1="73" x2="343" y2="92" stroke="var(--ink-2)" stroke-width="1"/><text x="343" y="104">kill · park</text>
        <line x1="753" y1="73" x2="753" y2="92" stroke="var(--ink-2)" stroke-width="1"/><text x="753" y="104">return · kill</text>
      </g>
      <text x="20" y="142" font-family="var(--mono)" font-size="10" fill="var(--ink-2)">green: agent stations · blue: human gates · dashed: the defect loop sends work back, never forward</text>
    </svg>
    <figcaption>Fifteen stations, three human gates. Everything between gates runs without waiting on you.</figcaption>
  </figure>

  <p class="thesis">Agents generate and check. Humans decide and own.</p>
</header>

<h2>Your three gates</h2>
<p>Each stage exists to produce evidence a decision can be made on, not to make the decision. Trent's judgement is required at exactly three points. Everything else is arranged to run without him.</p>
<div class="gates">
  <div class="gate"><span class="k">G1 · ACCEPT</span><span class="q">Is this worth our time, and ours to solve?</span><p class="s">Sees a one-screen Triage Card. Two minutes.</p></div>
  <div class="gate"><span class="k">G2 · DIRECTION</span><span class="q">Is this the right approach, at the right size?</span><p class="s">Sees an Options Memo with a recommendation and the case against it. Delegable for low-risk work.</p></div>
  <div class="gate"><span class="k">G3 · SHIP</span><span class="q">Does this go out under our name?</span><p class="s">Sees a Ship Pack: deliverable, evidence trail, what wasn't validated, rollout. Never delegated.</p></div>
</div>

<h2>Where the metaphor breaks</h2>
<p>A factory has a fixed line, interchangeable stations, quality control between them, and a defect loop that sends work back. That maps well. Three places it doesn't, and what the design does about each:</p>
<div class="tbl"><table>
<tr><th>Break</th><th>Consequence</th><th>Compensation</th></tr>
<tr><td><b>All the workers share one brain.</b> Every agent is the same model with a different prompt.</td><td>Shared blind spots. A "family persona" agent is not a family.</td><td>Persona feedback is treated as hypothesis generation. The Ship Pack always states what has not been validated with real people.</td></tr>
<tr><td><b>The raw material is people's lives.</b></td><td>Clinical, disability and safeguarding content carries risk a widget doesn't.</td><td>Risk class set at intake changes what the line may do without a human.</td></tr>
<tr><td><b>Throughput is not the goal.</b></td><td>Ten mediocre solutions are worse than two that get used.</td><td>The registry scores 30-day adoption and outcome, not output.</td></tr>
</table></div>

<h2>The line, station by station</h2>
<p>Each station has a fixed input, a fixed output, and a check it must pass to leave.</p>

<div class="station"><div class="n">0</div><div><h3>Intake</h3>
<dl><dt>who</dt><dd>Anyone. You, a practitioner, a family, a scheduled scan.</dd><dt>out</dt><dd>A Problem Brief: affected person, situation, evidence it's real, what "better" looks like. Filed as a GitHub issue.</dd><dt>check</dt><dd>If a field is missing the agent asks the source. It never guesses.</dd></dl>
<p class="ex">"Support workers don't follow the BSP" becomes: <i>7 staff at two SIL houses report not reading Kane's 42-page plan; two July incidents show strategies not applied. Better: any worker finds the right response to a behaviour in under 30 seconds.</i></p></div></div>

<div class="station"><div class="n">1</div><div><h3>Triage <span class="gatechip">then G1</span></h3>
<dl><dt>who</dt><dd>Triage Agent</dd><dt>out</dt><dd>Triage Card: fit to skill set, reach, evidence strength, risk class, solution shape, size, duplicate check, and proceed / park / kill / refer.</dd><dt>check</dt><dd>Every field has a reason. A "proceed" is not allowed without a specific kill condition, so you can disagree fast.</dd></dl></div></div>

<div class="station"><div class="n">2</div><div><h3>Discover</h3>
<dl><dt>who</dt><dd>Four agents in parallel, then a synthesiser. <b>Evidence Researcher</b> (literature, Practice Standards, Commission guidance, state law). <b>Context Researcher</b> (what Harpers already has, how work is actually done). <b>Stakeholder Voices</b> (participant, family, worker, practitioner, planner: what would make each not use a solution). <b>Red Team</b> (the problem is misdiagnosed, the obvious fix fails, solving it harms someone else).</dd><dt>out</dt><dd>A Discovery Dossier with a "what we now believe the problem is" statement.</dd><dt>check</dt><dd>Must contain at least one finding that changed the framing. If it only confirmed the brief, it says so, and you can decide whether it went deep enough.</dd></dl></div></div>

<div class="station"><div class="n">3</div><div><h3>Options <span class="gatechip">then G2</span></h3>
<dl><dt>who</dt><dd>Options Agent generates, Critic Agent scores.</dd><dt>out</dt><dd>Three to five approaches that differ in <b>kind</b>, scored on impact, feasibility, time to value, reversibility, risk, maintenance. One recommended, plus the strongest case against it, plus "do nothing" scored honestly.</dd><dt>check</dt><dd>No straw men. The Critic must be able to defend any option as the winner under some weighting.</dd></dl></div></div>

<div class="station"><div class="n">4</div><div><h3>Spec</h3>
<dl><dt>out</dt><dd>A Build Spec: deliverable, users and their device, acceptance criteria written as tests, compliance criteria, out-of-scope list, rollout, definition of done.</dd><dt>check</dt><dd>Every criterion is checkable without interpretation. "Clear", "appropriate" and "user-friendly" are defects unless attached to a number, a time, or a named judge.</dd></dl></div></div>

<div class="station"><div class="n">5</div><div><h3>Build</h3>
<dl><dt>who</dt><dd>A Builder matched to the deliverable type. Documents route through the OT and BP-review personas plus the docx and pdf skills. Web tools follow the Drive Hub pattern: single static file, works on a phone, no backend. Processes produce a one-page procedure, a checklist, a training note. Training produces a deck, a facilitator guide, a five-question check.</dd><dt>check</dt><dd>Builds the spec only. Anything it wants to add goes in the build log as a proposal.</dd></dl></div></div>

<div class="station"><div class="n">6</div><div><h3>Test</h3>
<dl><dt>who</dt><dd>One tester per lens, in parallel, none of them shown the builder's reasoning. <b>Acceptance</b> runs every criterion. <b>Voices</b> try to do their real task with it. <b>Compliance</b> checks Practice Standards, restrictive practice rules, privacy, consent, mandatory reporting. <b>Plain language</b> applies the 9 pm test. <b>Accessibility</b> checks keyboard, contrast, screen reader, 400px.</dd><dt>check</dt><dd>A finding without a reproduction is not a finding.</dd></dl></div></div>

<div class="station"><div class="n">7</div><div><h3>Review</h3>
<dl><dt>who</dt><dd>Two reviewers with opposite briefs. <b>Domain Reviewer</b>: would a senior practitioner sign this, using the specialist review editing rules. <b>Red Team</b> again: how does this get misused, how does it drift, what is most likely to make it fail in the field.</dd><dt>out</dt><dd>One ranked findings list, merged with the test report.</dd></dl></div></div>

<div class="station"><div class="n">8</div><div><h3>Refine</h3>
<dl><dt>rule</dt><dd>Up to three cycles. Blocking findings must reach zero. If cycle three still has blockers the run escalates to you with the list rather than trying a fourth time. A finding that repeats across cycles means the approach is wrong, not the execution, and the Presenter says so.</dd></dl></div></div>

<div class="station"><div class="n">9</div><div><h3>Present <span class="gatechip">then G3</span></h3>
<dl><dt>out</dt><dd>The Ship Pack, one page: the problem and what changed; the deliverable; evidence trail; <b>what was not validated</b> (always present, always includes "no real participant, family or worker has used this yet" unless one has); ranked risks; rollout with a 30-day measure; cost in your minutes and cycles used.</dd></dl></div></div>

<div class="station"><div class="n">10</div><div><h3>Ship</h3>
<dl><dt>who</dt><dd>Ship Agent, with your G3 recorded. Publishes to the right place (hub, Drive, a PR, a training calendar), registers the solution, sets a 30-day follow-up.</dd></dl></div></div>

<div class="station"><div class="n">11</div><div><h3>Learn</h3>
<dl><dt>who</dt><dd>Retro Agent, 30 days after ship and after any kill. Was it used, by whom, what broke, what the humans said, which persona predictions held. Proposes changes to the factory's own prompts and templates <b>as a pull request</b>. The factory improves itself only through reviewed changes.</dd></dl></div></div>

<h2>The agent roster</h2>
<p>Thirteen definitions, one job each, a fixed output shape, and a list of things it must not do. Two rules: the Voices and Red Team run at Discover and again at Test and Review, so early predictions get checked late. Builders and testers never share a prompt.</p>
<div class="tbl"><table>
<tr><th>Agent</th><th>Stage</th><th>One job</th><th>Must not</th></tr>
<tr><td class="mono">factory-triage</td><td>1</td><td>Triage Card and a recommendation</td><td>Recommend proceed without a kill condition</td></tr>
<tr><td class="mono">factory-evidence</td><td>2</td><td>What is known and tried, with sources</td><td>Cite anything it can't point to</td></tr>
<tr><td class="mono">factory-context</td><td>2</td><td>What Harpers has, how work is done today</td><td>Assume the hub is complete</td></tr>
<tr><td class="mono">factory-voices</td><td>2, 6</td><td>Five stakeholder seats</td><td>Claim to represent real people</td></tr>
<tr><td class="mono">factory-redteam</td><td>2, 7</td><td>Argue the problem or solution is wrong</td><td>Soften its findings</td></tr>
<tr><td class="mono">factory-options</td><td>3</td><td>Approaches that differ in kind</td><td>Pad with variants of one idea</td></tr>
<tr><td class="mono">factory-critic</td><td>3</td><td>Score, recommend, write the case against</td><td>Hide the case against</td></tr>
<tr><td class="mono">factory-spec</td><td>4</td><td>A testable Build Spec</td><td>Write a criterion needing interpretation</td></tr>
<tr><td class="mono">factory-builder</td><td>5, 8</td><td>Build to spec, route by type</td><td>Add scope</td></tr>
<tr><td class="mono">factory-test</td><td>6</td><td>One lens, findings with reproductions</td><td>Report without a reproduction</td></tr>
<tr><td class="mono">factory-review-domain</td><td>7</td><td>Senior practitioner sign-off review</td><td>Approve a clinical claim without a basis</td></tr>
<tr><td class="mono">factory-presenter</td><td>9</td><td>Assemble the Ship Pack</td><td>Omit what wasn't validated</td></tr>
<tr><td class="mono">factory-retro</td><td>11</td><td>Measure, then propose factory changes</td><td>Change the factory directly</td></tr>
</table></div>

<h2>Risk classes</h2>
<p>Set at Triage. Later agents may raise a class, never lower it. Class C and D can never ship on agent evidence alone. The factory's job there is to make the human review fast and well-informed, not to replace it.</p>
<div class="risk">
  <div><div class="c a">A</div><p><b>Internal, reversible.</b> A staff checklist, a hub search fix, an internal template.</p><span class="need">G2 may auto-select · ships on G3</span></div>
  <div><div class="c b">B</div><p><b>Client-facing, non-clinical.</b> A family handout, a plain-language guide, a booking process.</p><span class="need">Trent at G2 · plain-language and voices testers · G3</span></div>
  <div><div class="c c">C</div><p><b>Clinical or safeguarding.</b> Anything touching a BSP, restrictive practice, incident response, consent, assessment interpretation.</p><span class="need">Compliance tester · domain review · G3 plus a named second human</span></div>
  <div><div class="c d">D</div><p><b>Public or systemic.</b> Advocacy, submissions, anything under Harpers' name outside the organisation.</p><span class="need">All testers · red team at review · G3 plus a real-person pilot</span></div>
</div>

<h2>The processes around the line</h2>
<h3>Three feeds into intake</h3>
<p>Your own observations, captured in one place. A practitioner form on the hub ("what got in the way this week?"). A weekly scan routine reading Commission alerts, NDIS pricing and policy updates, and the incident register summary, drafting briefs for anything that looks like a pattern.</p>
<h3>Queue, record, gates</h3>
<p>GitHub issues are the queue; labels are the state. Each run writes its artefacts to a folder on a branch, and the pull request is the run's record. Gates are comments on it: <code>/g1 accept</code>, <code>/g2 option-2</code>, <code>/g3 ship</code>. The Ship Pack is an artifact page so it reads on a phone.</p>
<h3>Cadence</h3>
<div class="tbl"><table>
<tr><th>When</th><th>Who</th><th>What</th></tr>
<tr><td>Daily, automated</td><td>Routine</td><td>Intake sweep, triage anything new, advance any run waiting on an agent stage</td></tr>
<tr><td>Twice a week, 20 min</td><td>Trent</td><td>G1 cards and G2 memos, batched, never interrupt-driven</td></tr>
<tr><td>Weekly, 45 min</td><td>Trent</td><td>G3 ship packs: ship, return, or kill</td></tr>
<tr><td>Monthly</td><td>Trent</td><td>Retro readout: which factory changes were proposed and accepted</td></tr>
</table></div>
<h3>Budgets and kills</h3>
<p>Each run carries a token budget and a cycle budget set by size. Exceeding either pauses and asks. A kill is a good output: the registry keeps every kill so the same idea does not come back three times.</p>

<h2>One problem, end to end</h2>
<ul class="timeline">
  <li><span class="t">problem</span><p>"Support workers at Kane's SIL house aren't applying the BSP strategies. Two incidents in July."</p></li>
  <li><span class="t">triage</span><p>Fit core. Reach: every SIL participant, about 30 plans. Risk <b>C</b>. Shape: tool plus process. Size M. Kill condition: if the house has a turnover problem, a better document won't fix it.</p></li>
  <li><span class="t g">G1</span><p>Proceed, but check the turnover point.</p></li>
  <li><span class="t">discover</span><p>Written plans alone show low treatment integrity; brief visual summaries plus coaching raise it. Harpers has a BSP template but no summary artefact; workers use a phone on shift. Worker seat: "I'd read one page, not forty." Practitioner seat: "I don't want a summary that drifts from the plan." Red Team: the summary becomes the plan and a stale one is worse than none. Two of seven staff are new since June.</p></li>
  <li><span class="t">options</span><p>(1) A one-page quick card generated from the plan, versioned to it. (2) A 15-minute onboarding video per plan. (3) A coaching-visit protocol, no document change. (4) Do nothing. Critic recommends 1 plus the coaching element of 3, and names the risk: drift between card and plan.</p></li>
  <li><span class="t g">G2</span><p>1 + 3.</p></li>
  <li><span class="t">spec</span><p>Card carries triggers, early signs, what to do, what not to do, who to call, plan version and expiry. Acceptance: a new worker finds the response to a named behaviour in under 30 s; no card without a plan version; a card past review date shows a warning; no restrictive practice appears without its authorisation reference.</p></li>
  <li><span class="t">test · review</span><p>Compliance fails it: a card omitted an authorisation reference. Blocking. Cycle 1 fixes it. Worker seat: "what not to do" is longer than "what to do"; reordered. Domain Reviewer: one trigger reads as blaming the participant; fixed. Cycle 2 clean.</p></li>
  <li><span class="t">present</span><p>Not validated: <i>no support worker has used a card on a shift yet.</i> Rollout: pilot at Kane's house, 30 days, practitioner visit at week one. Success: zero incidents where a plan strategy went unapplied; workers name the top three strategies unprompted.</p></li>
  <li><span class="t g">G3</span><p>Ship to pilot. Class C, so a second named reviewer signs. 30-day routine set.</p></li>
  <li><span class="t">learn</span><p>Day 30: the Retro Agent proposes to the Spec skill: "anything used on shift gets a mobile-first criterion." That lands as a PR.</p></li>
</ul>

<h2>What to build first</h2>
<p>Do not build all thirteen agents. Build the thinnest line that can ship one Class A or B solution, then widen.</p>
<ul class="weeks">
  <li><span class="w">Week 1</span><span>Problem Brief, Triage Agent, the <code>/factory</code> skill that files an issue. Run five real problems through triage only. Learn what a good brief looks like from your reactions at G1.</span></li>
  <li><span class="w">Week 2</span><span>Discovery agents and the Options Memo. Two problems through G2. This is where the factory earns trust or doesn't, because it's the first place it has to change your mind about something.</span></li>
  <li><span class="w">Week 3</span><span>Spec, one Builder (documents), Acceptance and Plain-Language testers, Presenter. Ship one Class B thing.</span></li>
  <li><span class="w">Week 4</span><span>Compliance Tester and Domain Reviewer. Attempt one Class C, expecting it to be slow.</span></li>
  <li><span class="w">Then</span><span>Sourcing routines, the registry, the Retro Agent, and the workflow script that runs a whole line unattended.</span></li>
</ul>
<div class="measure"><span class="k">Measure from day one</span>Trent minutes per shipped solution, cycles per run, 30-day usage. If your minutes per solution are not falling by week four, the gates are in the wrong place.</div>

<h2>What this design refuses to do</h2>
<ul class="refuse">
  <li><b>Ship on agent testing alone</b> for anything that touches a person's plan or safety. The persona testers are useful and they are not people.</li>
  <li><b>Run a refine loop past three cycles.</b> Repeated defects are a design signal.</li>
  <li><b>Let the factory modify itself directly.</b> Retro proposes, a human merges.</li>
  <li><b>Treat throughput as success.</b> The registry's 30-day column is the scoreboard.</li>
  <li><b>Hide the case against.</b> Every recommendation carries its own strongest objection, at every gate.</li>
</ul>

<footer>Scaffold lives in the harpers-hub repo on branch <span class="mono">claude/solutions-factory-pipeline-h6ltxh</span>: the design under <span class="mono">docs/solutions-factory/</span>, thirteen agent definitions, the <span class="mono">/factory</span> skill, and a workflow script for an unattended run.</footer>
</div>
`````

### Final chat message to Trent (verbatim)

`````
Done. The design is written, scaffolded as runnable Claude Code pieces, pushed to your branch, and published as a page.

**Read it here:** https://claude.ai/code/artifact/3f92fe49-9884-4f0e-8cf3-3e62e97a694a

**The one idea the whole thing rests on.** Agents generate and check. Humans decide and own. The line has fifteen stations and exactly three human gates. G1 accepts a problem from a one-screen triage card. G2 picks a direction from an options memo that always carries the case against its own recommendation. G3 ships from a pack that always states what was not validated with real people. Everything between gates runs without you.

**The line.** Intake, Triage, Discover (four agents in parallel: evidence, your existing context, five stakeholder seats, a red team), Options, Spec, Build, Test (one tester per lens, none shown the builder's reasoning), Review, Refine (capped at three cycles), Present, Ship, Learn. The Learn stage proposes changes to the factory's own prompts as a pull request, so the factory improves only through reviewed changes.

**Risk classes decide what the line may do alone.** Class A internal work can auto-select at G2. Class C, anything touching a BSP, restrictive practice or consent, needs a named second human at G3. Class D, anything public under Harpers' name, needs a real-person pilot. This is the objective counterweight to the enthusiasm: persona testers share one brain with the builder, so they are hypothesis generators, not evidence.

**What I pushed to `claude/solutions-factory-pipeline-h6ltxh`:**
- The full design and a worked example (Kane's BSP quick card) under `docs/solutions-factory/`, with the problem-brief template and a registry whose scoreboard is 30-day usage, not output.
- Thirteen agent definitions in `.claude/agents/`, each with one job, a fixed output shape and a "must not" list.
- A `/factory` skill that files, triages and advances runs, and a workflow script that runs Discover through Present unattended, stopping at G2 and G3. The harness already registered both.

**Where I'd push back on the vision.** Do not build all thirteen agents first. Section 9 of the design gives a four-week order: triage only in week one, on five real problems, learning from your reactions at G1. The factory earns trust in week two, the first time it has to change your mind about something. Measure your minutes per shipped solution from day one. If that number is not falling by week four, the gates are in the wrong place, not the agents.

**Next step when you're ready:** pick one real problem and run `/factory "<problem>"` on this branch. That will give you your first triage card and tell us immediately whether the brief template asks the right questions.
`````
