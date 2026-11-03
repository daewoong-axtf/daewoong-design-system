import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Tokens } from '../scripts/types.ts'
import { readFileSync } from 'node:fs'

const read = (p: string): string => readFileSync(new URL(`../design/${p}`, import.meta.url), 'utf8')
const tokens: Tokens = JSON.parse(read('tokens.json'))

test('design.md lists every role token', () => {
  const doc = read('design.md')
  for (const name of Object.keys(tokens.role.light)) assert.ok(doc.includes(`| \`${name}\` |`), name)
})

test('component.html generated regions are current', async () => {
  const { buildCatalog } = await import('../scripts/build-catalog.ts')
  const html = read('component.html')
  assert.equal(buildCatalog(html), html)
})

test('components.js is generated from components.ts', async () => {
  const { buildBehaviorJs } = await import('../scripts/build-catalog.ts')
  assert.equal(buildBehaviorJs(read('js/components.ts')), read('js/components.js'))
})
