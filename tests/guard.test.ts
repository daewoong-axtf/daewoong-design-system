import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DESIGN = fileURLToPath(new URL('../design/', import.meta.url))
const read = (p: string): string => readFileSync(join(DESIGN, p), 'utf8')
const specs = readdirSync(join(DESIGN, 'components')).filter((f) => f.endsWith('.md') && !f.startsWith('_'))
const markdown = readdirSync(DESIGN, { recursive: true, encoding: 'utf8' }).filter((f) => f.endsWith('.md'))

test('every spec has its class in components.css', () => {
  const css = read('components.css')
  for (const f of specs) {
    const cls = /클래스 `(\.dw-[\w-]+)`/.exec(read(`components/${f}`))?.[1]
    assert.ok(cls, `${f}: 머리글에 클래스가 없다`)
    assert.ok(css.includes(cls) || read('storybook.html').includes(cls.slice(1)), `${f}: ${cls}`)
  }
})

test('components.css uses role tokens instead of chromatic palette', () => {
  const hits = read('components.css').match(/var\(--dw-(orange|blue|green|yellow|red|purple)-[^)]*\)/g)
  assert.equal(hits, null)
})

test('every spec keeps the template sections', () => {
  const sections = [...read('components/_template.md').matchAll(/^## (.+)$/gm)].map((m) => m[1])
  for (const f of specs) {
    const doc = read(`components/${f}`)
    for (const s of sections) assert.ok(doc.includes(`## ${s}`), `${f}: ${s}`)
  }
})

test('relative links in design/ resolve', () => {
  for (const f of markdown) {
    const text = read(f).replace(/```[\s\S]*?```/g, '')
    for (const [, href] of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      if (/^(https?:|#|mailto:)/.test(href)) continue
      assert.ok(existsSync(join(DESIGN, dirname(f), decodeURI(href.split('#')[0]))), `${f}: ${href}`)
    }
  }
})

test('text styles match the tokens and the Storybook helper', () => {
  const tokens = JSON.parse(read('tokens.json'))
  const doc = read('design.md')
  const helper = readFileSync(new URL('../src/stories/foundations/_components/ds-text.tsx', import.meta.url), 'utf8')
  for (const [name, s] of Object.entries<{ scale: string; weight: string }>(tokens.typography.style)) {
    assert.ok(doc.includes(`| \`${name}\` | ${s.scale} `), `design.md: ${name}`)
    assert.ok(helper.includes(`${/-/.test(name) ? `'${name}'` : name}: scale('${s.scale}', '${s.weight}')`), `ds-text: ${name}`)
  }
})
