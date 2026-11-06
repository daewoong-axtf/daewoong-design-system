import { test } from 'node:test'
import assert from 'node:assert/strict'
import type { Tokens } from '../scripts/types.ts'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const raw: string = readFileSync(new URL('../design/tokens.json', import.meta.url), 'utf8')
const tokens: Tokens = JSON.parse(raw)

// 원본 디자인 시스템의 식별자 — 이 파일에도 글자 그대로 남지 않도록 이스케이프로 적는다
export const FORBIDDEN = /\u0073eed|\u0063arrot|\u006barrot|\uB2F9\uADFC|\u0064aangn|\u006danner|\uB9E4\uB108\uC628\uB3C4|\uC9C0\uD0B4\uC774|\u006aikimi/i

test('role count is 91', () => {
  assert.equal(Object.keys(tokens.role.light).length, 91)
})

test('every role has light and dark', () => {
  assert.deepEqual(Object.keys(tokens.role.light).sort(), Object.keys(tokens.role.dark).sort())
})

test('every palette has light and dark', () => {
  assert.deepEqual(Object.keys(tokens.palette.light).sort(), Object.keys(tokens.palette.dark).sort())
})

test('brand ramp exists', () => {
  assert.ok(tokens.palette.light['orange-600'])
})

test('secondary brand role points to charcoal and teal is gone', () => {
  assert.equal(tokens.role.light['bg-brand-secondary-solid'], '{palette.charcoal-700}')
  assert.equal(tokens.role.dark['bg-brand-secondary-solid'], '{palette.charcoal-500}')
  assert.ok(!Object.keys(tokens.role.light).some((k) => k.includes('tertiary')))
  assert.ok(!Object.keys(tokens.palette.light).some((k) => k.startsWith('teal-')))
})

test('brand role points to orange', () => {
  assert.equal(tokens.role.light['bg-brand-solid'], '{palette.orange-600}')
  assert.equal(tokens.role.dark['bg-brand-solid'], '{palette.orange-700}')
})

test('role references resolve', () => {
  for (const mode of ['light', 'dark'] as const) {
    for (const [k, v] of Object.entries(tokens.role[mode])) {
      const m = /^\{palette\.(.+)\}$/.exec(v)
      if (m) assert.ok(tokens.palette[mode][m[1]], `${mode}.${k} → ${v}`)
      else assert.match(v, /^oklch\(/, `${mode}.${k}`)
    }
  }
})

test('colors are oklch', () => {
  for (const mode of ['light', 'dark'] as const) {
    for (const [k, v] of Object.entries(tokens.palette[mode])) assert.match(v, /^oklch\([\d.]+ [\d.]+ [\d.]+( \/ [\d.]+)?\)$/, k)
  }
  assert.equal(tokens.palette.light['gray-00'], 'oklch(1 0 0)')
})

test('excluded tokens absent', () => {
  assert.doesNotMatch(raw, /magic|banner/)
})

test('forbidden identifiers absent', () => {
  assert.doesNotMatch(raw, FORBIDDEN)
})

test('forbidden identifiers absent from every tracked file', () => {
  const root = new URL('..', import.meta.url).pathname
  const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
    .split('\0')
    .filter((f) => f && !/\.(png|svg|woff2?|ico)$/.test(f))
  const hits = files.filter((f) => FORBIDDEN.test(readFileSync(new URL(f, `file://${root}`), 'utf8')))
  assert.deepEqual(hits, [])
})

test('scales pinned', () => {
  assert.equal(tokens.spacing.x4, '16px')
  assert.equal(tokens.spacing['spacing-x-global-gutter'], '{spacing.x4}')
  assert.equal(tokens.radius.full, '9999px')
  assert.equal(tokens.radius.r2, '8px')
  assert.equal(tokens.shadow.light.s1, '0px 1px 4px 0px oklch(0 0 0 / 0.078)')
  assert.equal(tokens.typography.scale.t5.fontSize, '16px')
  assert.equal(tokens.typography.scale.t5.lineHeight, '22px')
  assert.equal(tokens.typography.fontWeight.bold, '700')
  assert.equal(tokens.motion.duration.d3, '150ms')
  assert.equal(tokens.motion.easing.enter, 'cubic-bezier(0, 0, 0.15, 1)')
  assert.equal(tokens.motion.scale.default.s95, '0.95')
  assert.equal(tokens.motion.scale.reducedMotion.s95, '1')
})
