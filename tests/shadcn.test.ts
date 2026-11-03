import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (p: string): string => readFileSync(new URL(`../design/${p}`, import.meta.url), 'utf8')

test('shadcn.css only points at tokens that tokens.css defines', () => {
  const defined = new Set([...read('tokens.css').matchAll(/(--dw-[a-z0-9_-]+):/g)].map((m) => m[1]))
  const used = [...read('shadcn.css').matchAll(/var\((--dw-[a-z0-9_-]+)\)/g)].map((m) => m[1])
  assert.ok(used.length > 0)
  for (const name of used) assert.ok(defined.has(name), name)
})

test('shadcn.css maps every standard shadcn color variable', () => {
  const css = read('shadcn.css')
  for (const v of ['background', 'foreground', 'primary', 'primary-foreground', 'secondary', 'muted', 'accent', 'destructive', 'border', 'input', 'ring']) {
    assert.match(css, new RegExp(`--${v}: var\\(--dw-`), v)
  }
})
