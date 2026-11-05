import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import type { Tokens } from '../scripts/types.ts'

const tokens: Tokens = JSON.parse(readFileSync(new URL('../design/tokens.json', import.meta.url), 'utf8'))
const AA = 4.5

/** oklch(L C h) → 선형 sRGB의 상대 휘도 */
function luminance(oklch: string): number {
  const [L, C, h] = (oklch.match(/[\d.]+/g) ?? []).map(Number)
  const a = C * Math.cos((h * Math.PI) / 180)
  const b = C * Math.sin((h * Math.PI) / 180)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const clamp = (v: number) => Math.min(1, Math.max(0, v))
  return (
    0.2126 * clamp(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s) +
    0.7152 * clamp(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s) +
    0.0722 * clamp(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
  )
}

function ratio(mode: 'light' | 'dark', fg: string, bg: string): number {
  const color = (role: string) => tokens.palette[mode][tokens.role[mode][role].replace(/[{}]/g, '').split('.')[1]]
  const [x, y] = [luminance(color(fg)), luminance(color(bg))].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

const INTENTS = ['brand', 'critical', 'informative', 'positive']
const TEXT = ['fg-neutral', 'fg-neutral-muted', 'fg-neutral-subtle', 'fg-brand', 'fg-critical', 'fg-informative', 'fg-positive', 'fg-warning']
const SURFACES = ['bg-layer-default', 'bg-layer-floating', 'bg-layer-basement', 'bg-neutral-weak']

for (const mode of ['light', 'dark'] as const) {
  test(`${mode}: 채운 면 위 글자는 AA를 넘는다`, () => {
    for (const i of INTENTS) {
      for (const bg of [`bg-${i}-solid`, `bg-${i}-solid-pressed`]) {
        const r = ratio(mode, `fg-on-${i}-solid`, bg)
        assert.ok(r >= AA, `fg-on-${i}-solid / ${bg}: ${r.toFixed(2)}`)
      }
    }
  })

  test(`${mode}: 표면 위 글자는 AA를 넘는다`, () => {
    for (const fg of TEXT) {
      for (const bg of SURFACES) {
        const r = ratio(mode, fg, bg)
        assert.ok(r >= AA, `${fg} / ${bg}: ${r.toFixed(2)}`)
      }
    }
  })
}
