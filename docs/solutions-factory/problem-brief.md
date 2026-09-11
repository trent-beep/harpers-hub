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
