import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'

import { buildIcons, GROUPS } from '../scripts/build-icons.ts'

const dir = new URL('../design/icons/', import.meta.url)
const lucide = JSON.parse(readFileSync(new URL('../node_modules/lucide-react/package.json', import.meta.url), 'utf8')) as {
  version: string
}

test('design/icons/ is generated from the installed lucide-react', () => {
  const out = buildIcons(lucide.version)
  assert.deepEqual(readdirSync(dir).sort(), [...out.keys()].sort())
  for (const [file, content] of out) assert.equal(readFileSync(new URL(file, dir), 'utf8'), content, file)
})

test('lucide-react is pinned to an exact version', () => {
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
    devDependencies?: Record<string, string>
    dependencies?: Record<string, string>
  }
  const range = pkg.dependencies?.['lucide-react'] ?? pkg.devDependencies?.['lucide-react']
  assert.equal(range, lucide.version)
})

test('icons.json lists every icon once with its sprite symbol', () => {
  const manifest = JSON.parse(readFileSync(new URL('icons.json', dir), 'utf8')) as {
    groups: { icons: { name: string; file: string }[] }[]
  }
  const names = manifest.groups.flatMap((g) => g.icons.map((i) => i.name))
  assert.equal(new Set(names).size, names.length)
  assert.deepEqual(names, GROUPS.flatMap((g) => g.names))
  const sprite = readFileSync(new URL('sprite.svg', dir), 'utf8')
  for (const n of names) assert.ok(sprite.includes(`<symbol id="${n}"`), n)
})
