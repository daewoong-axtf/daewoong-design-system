// design/tokens.json → design/tokens.css
//   node scripts/build-tokens.ts            # 생성
//   node scripts/build-tokens.ts --check    # 디스크의 tokens.css가 최신이 아니면 exit 1
//   --dir <path>                             # tokens.json·tokens.css가 있는 폴더 (기본 design/)
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Tokens, TokenMap } from './types.ts'

const HEADER = '/* 생성 파일 — 직접 고치지 말 것. design/tokens.json을 고치고 pnpm build:tokens */\n'

const REF_PREFIX: Record<string, string> = {
  palette: '',
  spacing: 'spacing-',
  radius: 'radius-',
  'motion.duration': 'duration-',
  'motion.easing': 'easing-',
}

function value(v: string): string {
  const m = /^\{(.+)\.([^.]+)\}$/.exec(v)
  if (!m) return v
  const prefix = REF_PREFIX[m[1]]
  if (prefix === undefined) throw new Error(`알 수 없는 참조: ${v}`)
  return `var(--dw-${prefix}${m[2]})`
}

const lines = (obj: TokenMap, prefix = '', suffix = ''): string[] =>
  Object.entries(obj).map(([k, v]) => `  --dw-${prefix}${k}${suffix}: ${value(v)};`)

function colorLines(tokens: Tokens, mode: 'light' | 'dark'): string[] {
  return [
    ...lines(tokens.palette[mode]),
    ...lines(tokens.role[mode]),
    ...lines(tokens.shadow[mode], 'shadow-'),
  ]
}

export function buildCss(tokens: Tokens): string {
  const { typography: ty, motion } = tokens
  const base = [
    `  --dw-font-sans: ${ty.fontFamily.sans};`,
    `  --dw-font-mono: ${ty.fontFamily.mono};`,
    ...lines(ty.fontWeight, 'font-weight-'),
    ...Object.entries(ty.scale).flatMap(([t, s]) => [
      `  --dw-font-${t}-size: ${s.fontSize};`,
      `  --dw-font-${t}-line-height: ${s.lineHeight};`,
    ]),
    ...Object.entries(ty.style).flatMap(([name, s]) => [
      `  --dw-text-${name}-size: var(--dw-font-${s.scale}-size);`,
      `  --dw-text-${name}-line-height: var(--dw-font-${s.scale}-line-height);`,
      `  --dw-text-${name}-weight: var(--dw-font-weight-${s.weight});`,
    ]),
    ...lines(tokens.spacing, 'spacing-'),
    ...lines(tokens.radius, 'radius-'),
    ...lines(tokens.zIndex, 'z-'),
    ...lines(motion.duration, 'duration-'),
    ...lines(motion.easing, 'easing-'),
    ...lines(motion.scale.default, 'scale-'),
  ]
  const light = colorLines(tokens, 'light')
  const dark = colorLines(tokens, 'dark')
  const indent = (ls: string[]) => ls.map((l) => `  ${l}`)
  return [
    HEADER,
    ':root {',
    '  color-scheme: light dark;',
    ...base,
    ...light,
    '}',
    '',
    '[data-theme="light"] {',
    '  color-scheme: light;',
    '}',
    '',
    '[data-theme="dark"] {',
    '  color-scheme: dark;',
    ...dark,
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  :root:not([data-theme="light"]) {',
    ...indent(dark),
    '  }',
    '}',
    '',
    '@media (prefers-reduced-motion: reduce) {',
    '  :root {',
    ...indent(lines(motion.scale.reducedMotion, 'scale-')),
    '  }',
    '}',
    '',
  ].join('\n')
}

function main(argv: string[]): void {
  const dirArg = argv.indexOf('--dir')
  const dir = dirArg === -1 ? fileURLToPath(new URL('../design', import.meta.url)) : argv[dirArg + 1]
  const css = buildCss(JSON.parse(readFileSync(join(dir, 'tokens.json'), 'utf8')))
  const out = join(dir, 'tokens.css')
  if (argv.includes('--check')) {
    let current = ''
    try {
      current = readFileSync(out, 'utf8')
    } catch {}
    if (current !== css) {
      console.error('tokens.css가 tokens.json과 다르다 — pnpm build:tokens')
      process.exit(1)
    }
    return
  }
  writeFileSync(out, css)
  console.log(`→ ${out}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2))
