import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, cpSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildCss } from '../scripts/build-tokens.ts'
import type { Tokens } from '../scripts/types.ts'

const ROOT = new URL('..', import.meta.url).pathname
const tokens: Tokens = JSON.parse(readFileSync(join(ROOT, 'design/tokens.json'), 'utf8'))
const css = buildCss(tokens)

function leaves(obj: object, path: string[] = []): string[][] {
  return Object.entries(obj).flatMap(([k, v]) => (typeof v === 'object' ? leaves(v as object, [...path, k]) : [[...path, k]]))
}

test('every token emitted', () => {
  for (const name of Object.keys(tokens.palette.light)) assert.ok(css.includes(`--dw-${name}:`), name)
  for (const name of Object.keys(tokens.role.light)) assert.ok(css.includes(`--dw-${name}:`), name)
  for (const name of Object.keys(tokens.spacing)) assert.ok(css.includes(`--dw-spacing-${name}:`), name)
  for (const name of Object.keys(tokens.radius)) assert.ok(css.includes(`--dw-radius-${name}:`), name)
  for (const name of Object.keys(tokens.shadow.light)) assert.ok(css.includes(`--dw-shadow-${name}:`), name)
  for (const t of Object.keys(tokens.typography.scale)) {
    assert.ok(css.includes(`--dw-font-${t}-size:`), t)
    assert.ok(css.includes(`--dw-font-${t}-line-height:`), t)
  }
  for (const name of Object.keys(tokens.motion.duration)) assert.ok(css.includes(`--dw-duration-${name}:`), name)
  for (const name of Object.keys(tokens.motion.easing)) assert.ok(css.includes(`--dw-easing-${name}:`), name)
  for (const name of Object.keys(tokens.motion.scale.default)) assert.ok(css.includes(`--dw-scale-${name}:`), name)
  assert.ok(leaves(tokens).length > 300)
})

test('dark blocks', () => {
  assert.ok(css.includes('[data-theme="dark"]'))
  assert.ok(css.includes(':root:not([data-theme="light"])'))
  assert.ok(css.includes('@media (prefers-color-scheme: dark)'))
  assert.ok(css.includes('@media (prefers-reduced-motion: reduce)'))
})

test('role references palette', () => {
  assert.ok(css.includes('--dw-bg-brand-solid: var(--dw-orange-600);'))
  assert.ok(css.includes('--dw-spacing-spacing-x-global-gutter: var(--dw-spacing-x4);'))
  assert.ok(css.includes('--dw-duration-color-transition: var(--dw-duration-d3);'))
})

test('brand swap propagates', () => {
  const copy = structuredClone(tokens)
  copy.palette.light['orange-600'] = 'oklch(0.5 0.1 200)'
  const out = buildCss(copy)
  assert.ok(out.includes('--dw-orange-600: oklch(0.5 0.1 200);'))
  assert.ok(out.includes('--dw-bg-brand-solid: var(--dw-orange-600);'))
})

test('generated file is current', () => {
  assert.equal(readFileSync(join(ROOT, 'design/tokens.css'), 'utf8'), css)
})

test('check mode detects drift', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dw-tokens-'))
  cpSync(join(ROOT, 'design/tokens.json'), join(dir, 'tokens.json'))
  writeFileSync(join(dir, 'tokens.css'), '/* stale */\n')
  assert.throws(() => execFileSync('node', [join(ROOT, 'scripts/build-tokens.ts'), '--check', '--dir', dir], { stdio: 'pipe' }))
})
