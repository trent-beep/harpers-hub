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
