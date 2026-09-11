# Handoff: Problem-solving discussion (loneliness, Loop, Product A)

- **Session:** https://claude.ai/code/session_01UTx2GF6XsfTcyqmeB9MNcz
- **Dates:** 10–11 September 2026
- **Participant:** Trent (Harpers Health)
- **Branch:** `claude/problem-solving-discussion-6vaq75` in `trent-beep/harpers-hub`
- **Intended location:** `harpers-claude` repo, `handoffs/`. That repo was not accessible to this session's GitHub credential, so the record lives here until moved.

---

## 1. Purpose of the session

Open exploration, started in the car after a training day in Sydney. Trent asked what problems in the world sit on top of his skills, then asked to explore loneliness as a problem space, then connected the discussion to an existing app in development, **Loop**. No code was written. The deliverable is the thinking, captured here.

Context Trent supplied about himself during the session: behaviour support practitioner and psychologist, runs Harpers Health (about 25 staff), father of a child who went through cancer, survivor of a domestic violence relationship, has done a lot of personal therapy including EMDR, supported his parents financially from a young age, organises social gatherings, has ADHD, strong at school in textiles and making (sail-cloth backpack, interest in leadlight and jewellery), has multiple apps in development including an assessment application and a proactive clinic intervention program for business growth. Public references he gave: harpershealth.com.au and "H project tech" site.

---

## 2. Decisions made

| # | Decision | Made by | Notes |
|---|----------|---------|-------|
| 1 | Loneliness is the problem space to explore first | Trent | Chosen from the list in section 4 |
| 2 | Trent is not (yet) a polymath by the strict definition; closer to a broad-range maker | Agreed by both | Trent: "not a polymath just yet, maybe one day" |
| 3 | Nature / bilateral-movement mechanism claims are not evidence-backed and should not be built on | Agreed by both | Nature stays in designs as a low-cost helper, not as a mechanism |
| 4 | Polyvagal theory to be used as a metaphor with people, not as a mechanism in anything published | Claude recommendation, not contested | |
| 5 | Loop's core is an assessment-and-planning engine, not a feature menu. Interventions are plan outputs tailored per person | Trent (correcting Claude's misreading) | See section 6 |
| 6 | Loop's intake is a scripted version of Trent's strengths-based conversational method | Agreed by both | See section 7 |
| 7 | Split into two products. **Product A** (person-owned regulation plan, employer sees aggregate only) built first. **Product B** (fitness-for-duty / remove from task) parked, not rejected | Trent | Trent holds that people sometimes should be taken off a task; both agreed trust and data are prerequisites |
| 8 | Alerts to family members, task-removal thresholds, machine learning, and AR glasses are out of Product A version one | Claude proposal, Trent asked to proceed with Product A | |
| 9 | First validation step is the intake, run by hand with about ten Harpers Health staff, before any software | Claude proposal | Not yet confirmed by Trent as an action |

---

## 3. Deliverables

No files, artifacts, or code were produced in this session other than this handoff. Everything drafted was in chat and is reproduced verbatim in section 9.

---

## 4. Opportunity map produced (session start)

Problems in Trent's professional lane where a practitioner-built tool could help, ranked:

1. **Unauthorised and stale restrictive practices.** Commission enforcement findings: practices with no current BSP, plans past 12-month review, no fade-out pathway, untrained workers, late monthly reporting. A live RRP register with authorisation status per state, review dates, training status, and reporting status.
2. **Implementing providers can't use BSPs.** A "plan to shift card" layer: per-shift, plain-language, practitioner-authored guidance with quick data capture.
3. **Thriving Kids transition from 1 October 2026.** Children 8 and under with low to moderate needs move from NDIS to state foundational supports, scaling to 2028. State-specific navigation content or triage tool for families and referrers.
4. **2026 tightening of practitioner requirements.** Supervision and competency portfolio tool for provisional-to-core practitioners.
5. **Family and carer skill transfer.** Deliver the plan as short timed prompts to carers, collect what happened.
6. **Functional behaviour data clinicians actually use.** ABC capture designed around what an FBA needs, with pattern summaries.

Recommendation given: start with item 2. Cautions given: feeling ahead of a training room is weak evidence of a market gap; compliance software already has entrants; post-training inspiration fades in two weeks; participant data needs privacy design from day one.

Sources cited in that answer:
- https://www.ndis.gov.au/media/8508/download?attachment=
- https://www.cliniccomply.com.au/blog/ndis-restrictive-practices-compliance-guide-2026
- https://ndiscompliant.com.au/blog/ndis-behaviour-support-module-guide
- https://paperbarkndis.com.au/knowledge-hub/ndis-restrictive-practices-authorisation-by-state/
- https://ndiscompliant.com.au/blog/what-is-a-restrictive-practice-in-the-ndis
- https://centreofhope.com.au/positive-behaviour-support-ndis-2026/
- https://blog.daar.com.au/news/thriving-kids-australia-ndis-reform-2026
- https://www.ndis.gov.au/news/11085-thriving-kids
- https://www.leapin.com.au/ndis/ndis-changes/
- https://dcj.nsw.gov.au/community-inclusion/disability-and-inclusion/thriving-kids.html
- https://www.health.gov.au/sites/default/files/2026-02/thriving-kids-fact-sheet_0.pdf
- https://theconversation.com/thriving-kids-could-help-secure-the-future-of-the-ndis-but-what-will-the-program-mean-for-children-and-families-263532
- https://therapycare.com.au/ndis-reforms-explained-thriving-kids-plan-updates-and-what-they-mean-for-you-and-your-family/
- https://www.specialvoices.com.au/thriving-kids-update/
- https://centreofhope.com.au/ndis-reforms-2026/

### World-scale problems list (second pass)

Ranked by scale × tractability × neglect, biased toward what one capable person can move:

1. Loneliness and social disconnection (WHO treats it as a health risk on par with smoking; about one in six people report it).
2. Youth mental health (sharp rise since about 2012; causes contested).
3. Caregiver burnout.
4. Attention and executive function in a distraction economy.
5. Antibiotic resistance, pandemics, climate adaptation (listed for honesty; need institutions, not individuals).

Neglected leverage points: skill transfer to non-professionals; plain-language translation of expert knowledge; transition points between systems; men's help-seeking. Observation: the gap is implementation, not knowledge. Trent's skill is implementation.

---

## 5. Loneliness exploration: key findings

1. **Loneliness is a gap, not an absence.** The gap between the connection someone has and the connection they need. Adding contact does not close it; most loneliness apps add contact.
2. **"The floor."** Trent's own lowest-point need was to sleep on the floor next to a friend: silent, low-demand, co-present. Nearly every loneliness product is conversational. Presence-without-conversation is an almost empty design direction.
3. **"Ask twice, then stay long enough to notice."** Trent's description of what he wished someone had done. Three parts: ask once (answer is the mask), ask again (signals the first was not politeness; cf. UK "Ask Twice" campaign), stay and look without fixing. This is a teachable human behaviour, not a product.
4. **Reframe of delivery channels.** Schools, GP surgeries, workplaces, social media are not places to reach the lonely. They are places to train the noticers.
5. **Trent's attachment framing.** Pain surfaces when a person finally feels safe; the partner cannot hold it and pulls back; the person heals in the wrong place. Implication: a third place to put the pain that does not flinch or demand (historically religion, a grandmother, a therapist).
6. **Challenges recorded.** "Most of the world is masking" is a selection effect from clinic and therapy populations. Books and audio are saturated; differentiation is moment-of-delivery and felt presence, not content. "Find the original pain" is right for one person in a room and does not scale.

---

## 6. Loop: what it is (as clarified by Trent)

Trent's description, consolidated:

- A proactive heart-rate (HRV) based monitoring system that gently contacts people, or the people around them, when they are having a hard time.
- Markets imagined: skilled workforces, teams, government, military, medical, individuals.
- **Not a feature menu.** The list of possible outputs (automated text to a parent, cue to a mate, play a song, send a poem, podcast suggestion, walk prompt, sleep and diet prompts, regulation prompt, a one-to-ten regulation score, eventually AR heads-up display) is the *range of interventions a plan can produce*. Any one person's plan contains one or two, chosen from intake data and refined over time against HRV data.
- Establish a baseline of function; understand how the person functions well; task-analyse how they coped with past challenges and what they have done well; build a plan; grow a per-person library of what works.
- Claude's reframe, accepted: **Loop is a behaviour support plan for the self**, watched by physiology, with the people around the person briefed on what to do.

Challenges raised and standing:
- Wrist HRV is noisy; false positives train users to ignore alerts. Ground truth and acceptable false-positive rate undefined.
- Who receives the alert decides whether it is a safety product or a surveillance product.
- Cue wording is the intervention ("might be a good day to check in on Trent" vs "Trent's stress is elevated").
- Automated messages to third parties are the highest-harm feature; consent must be central.
- No known strong trial of physiology-triggered peer contact reducing a measurable outcome. Either a gap to fill or a warning.
- Personalisation engine: day-one forms produce little; learning from data takes weeks; a bridge for the first fortnight is needed.
- Self-report should override the sensor until data shows otherwise.
- Review cadence undefined (BSP's 12 months is too slow).

---

## 7. Trent's intake method (verbatim intent, structured by Claude)

Trent's technique: ask the person to explain something they are good at, then task-analyse it. How long they have done it, how they got into it, what they do for it, whether they collect things, when it fits their routine, how much effort it takes, how they practise. Also a success, a degree, a role. Then ask about a hard time: what, when, who was there, did they cope independently, did a parent help, did they start exercising, did they change what they listened to. Go deeper if insight is thin.

What it extracts (Claude's mapping):
- **Reinforcers.** What actually motivates them.
- **Routine anchors.** Where and when things reliably fit.
- **Effort and practice tolerance.** How they build a skill, predicting how they rebuild a habit.
- **Social scaffold.** Alone, mentored, in a club. Predicts how to reach them.
- **Identity.** The competence story to hand back when they are low.
- **Coping repertoire and rescue pattern.** Coped alone vs. was rescued. Splits people into different plans.

Conclusion: this is a repeatable interview protocol with an order, branches, and a small set of extractions. It can be carried by a guided conversational intake, with a clinician review layer for enterprise. Nobody masks when talking about what they love.

---

## 8. Product A vs Product B

**Product A.** Person owns the plan, chooses supports, system helps them stay regulated. Employer pays because burnout is expensive. Employer sees aggregate, de-identified team trends only. Precedents: Oura and Whoop enterprise and military deployments; US Army HRV readiness research without commander access to scores.

**Product B.** Alert a manager or commander that a person is not regulated before deployment or a task; remove from task (not from job). Fitness-for-duty screening. Different legal category; will be regulated as an occupational or medical assessment device. Risk: staff remove the device, game the baseline, or refuse. Precedents: fatigue detection in aviation and mining, bought by employers, hated by staff.

Trent's position on B: psychological injury happens when people mask through duty; the cost lands on families and the economy; people sometimes should be taken off a task to get back to baseline "and add some points." Managers should be leaders who ask twice and sit with people. Levels of consent needed. Agreed to two products; proceed with A.

---

## 9. Verbatim drafts

### 9.1 Product A brief (Claude, final turn before this handoff)

> **What it is in one sentence**
>
> A personal regulation plan, built from a strengths-based conversation, that watches physiology and nudges the person and their chosen supports to act before things break.
>
> **The five parts**
>
> 1. **Intake conversation.** Your method, scripted. What are you good at, how did you build it, when does it fit your life, who was around. Then a hard time, how you got through, alone or with help. Twenty minutes. Output is a profile: reinforcers, routine anchors, coping repertoire, social scaffold, and the person's own competence story.
>
> 2. **The plan.** Three things, no more. One thing the person does when their score dips. One person who gets a cue and what the cue says. One habit to rebuild, anchored to an existing routine from the intake. Written in the person's own words, because that is what makes it get used.
>
> 3. **The watcher.** Heart rate variability and sleep from whatever watch they already own, plus a one-tap daily one-to-ten. Baseline established over two weeks. Deviations trigger the plan. Self-report can override the sensor every time.
>
> 4. **The review.** Weekly, two minutes. Did the plan fire, did you do the thing, did it help. That is how the library learns and how the plan gets edited rather than shelved.
>
> 5. **Consent tiers.** Tier one is me only. Tier two is me plus a chosen person who gets a soft cue. Tier three is me plus my manager, who gets "check in on your team" style prompts and nothing numeric. The employer sees aggregate team trends only. The person can move between tiers at any time and can see every message ever sent about them.
>
> **What the employer buys**
>
> Lower burnout and turnover, an early warning at team level, and a culture where managers are prompted to lead. Priced per seat. The medical, emergency services, and defence markets you named are right, and health is the fastest entry because you already have credibility and a workforce of twenty-five to pilot on.
>
> **Deliberately out of version one**
>
> Alerts to family members, any threshold that removes someone from a task, machine learning, and glasses. Every one of those is a later layer on top of a working plan engine.
>
> **The first thing to validate**
>
> Not the sensor. The intake. Run your conversation with ten Harpers Health staff, write each a three-part plan by hand, and see whether they use it for a month with nothing but a daily one-to-ten in a spreadsheet. If people follow a hand-written plan, the software is worth building. If they do not, no amount of heart rate data will save it.

### 9.2 Polymath assessment (Claude, summarised from chat)

> Not yet, by the usual meaning of the word. The term is reserved for expert-level output in several unrelated fields. Evidence supports: high fluid ability with a spatial and systems bias; interest-gated performance consistent with ADHD; a generalist builder, closer to "multipotentialite." Risk: idea rate far above completion rate. Suggestions: pick one hands-on craft (rings recommended over leadlight for cost and cycle time) and do it seriously for a year, ten finished pieces; treat the software ideas as one product with six modules and ship one module to five external users before touching the next.

### 9.3 Example rule format proposed for a version-one plan engine

> Person reports isolating when low, has one trusted friend, has responded to physical activity before, so plan is cue the friend plus a walk prompt at score four.

Suggestion: if Trent can write twenty such rules from his caseload, that is the version-one engine and needs no machine learning.

---

## 10. Open questions

**Answered by Trent during session**
- Who gets the alert and what should they do? Both: a manager should ask twice and stay; sometimes a person should be taken off a task. Resolved by the A/B split.
- Is Loop a feature app? No. Assessment and planning engine with tailored outputs.
- Who conducts the intake? Trent's conversational method, to be scripted.

**Still open**
1. Does Loop teach managers the ask-twice-and-stay skill, or assume the organisation does? (Claude's view: it must teach it; that is the part only Trent can supply, and it makes the offer software plus training.)
2. Ground truth and acceptable false-positive rate for HRV-triggered plan firing.
3. How the engine chooses interventions in version one. Explicit rules from caseload, or learned?
4. What counts as "it helped": HRV recovery vs self-report. Provisional answer: self-report wins.
5. Review cadence for the plan.
6. The first-fortnight bridge before personalisation has data.
7. Consent and messaging design for tier-two supports (the "text to mum" risk).
8. Whether any trial exists of physiology-triggered peer contact improving outcomes. Not checked in this session.
9. Which Harpers Health staff, if any, pilot the hand-run intake and hand-written plans.
10. Loop's current state. Trent said he would share the Loop repo or description when at a computer. Two questions queued for that moment: who receives the contact today and was that deliberate; has anyone worn it through a hard week and what happened.

**Personal thread left open by Trent, not developed**
- Relationships and being "a better person." Claude noted the trait that spots flow problems can also produce impatience with slower processors, and offered a separate conversation.

---

## 11. Suggested next actions

1. Move this file to `harpers-claude/handoffs/` once that repo is accessible to a session.
2. Share the Loop repo or a written description; answer the two queued questions.
3. Draft the intake protocol as a document: question order, branches, extraction per question, plan element each feeds.
4. Write twenty version-one plan rules from caseload.
5. Decide the software-plus-training question (open question 1).
6. Run the hand-intake pilot with about ten staff for one month.
