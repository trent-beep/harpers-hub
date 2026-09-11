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
