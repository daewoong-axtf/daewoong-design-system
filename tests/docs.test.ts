import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Tokens } from '../scripts/types.ts'
import { readdirSync, readFileSync } from 'node:fs'

const read = (p: string): string => readFileSync(new URL(`../design/${p}`, import.meta.url), 'utf8')
const tokens: Tokens = JSON.parse(read('tokens.json'))

test('design.md lists every role token', () => {
  const doc = read('design.md')
  for (const name of Object.keys(tokens.role.light)) assert.ok(doc.includes(`| \`${name}\` |`), name)
})

test('storybook.html generated regions are current', async () => {
  const { buildCatalog } = await import('../scripts/build-catalog.ts')
  const html = read('storybook.html')
  assert.equal(buildCatalog(html), html)
})

test('components.js is generated from components.ts', async () => {
  const { buildBehaviorJs } = await import('../scripts/build-catalog.ts')
  assert.equal(buildBehaviorJs(read('js/components.ts')), read('js/components.js'))
})

test('storybook.html shows every component spec', () => {
  const html = read('storybook.html')
  const specs = readdirSync(new URL('../design/components/', import.meta.url)).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
  for (const f of specs) assert.ok(html.includes(`<section class="demo" id="${f.replace('.md', '')}">`), f)
})

test('every dw-* class in storybook.html is defined in components.css', () => {
  const css = read('components.css')
  const defined = new Set([...css.matchAll(/\.(dw-[\w-]+)/g)].map((m) => m[1]))
  const body = read('storybook.html').replace(/<style>[\s\S]*?<\/style>/g, '')
  const used = [...body.matchAll(/class="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)).filter((c) => c.startsWith('dw-'))
  // 기본값이라 CSS 규칙이 필요 없는 클래스 (명세에 있어 마크업에는 남긴다)
  const noRule = new Set(['dw-toast--positive', 'dw-toast--warning', 'dw-toast--critical', 'dw-status-badge--neutral', 'dw-text-input--medium', 'dw-select--medium', 'dw-menu--responsive', 'dw-toast--default', 'dw-badge--neutral', 'dw-badge--weak', 'dw-chip--solid', 'dw-chip--medium', 'dw-callout--neutral', 'dw-progress-circle--neutral', 'dw-progress-circle--40', 'dw-breadcrumb', 'dw-accordion--medium'])
  const missing = [...new Set(used)].filter((c) => !defined.has(c) && !noRule.has(c))
  assert.deepEqual(missing, [])
})
