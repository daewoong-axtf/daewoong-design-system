// design/icons/를 lucide-react(설치된 버전)의 아이콘 데이터에서 만든다
//   design/icons/<name>.svg   아이콘 하나씩
//   design/icons/sprite.svg   전체를 <symbol id="<name>">로 묶은 파일 — <svg><use href="sprite.svg#search"/></svg>
//   design/icons/icons.json   이름·분류·파일·SVG 원문 목록 — 언어와 상관없이 JSON만 읽으면 된다
//   node scripts/build-icons.ts [--check]
// 아이콘을 넣거나 빼려면 아래 GROUPS만 고치고 다시 돌린다. Storybook Theme 페이지도 icons.json을 읽는다.
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const ICONS_DIR = join(ROOT, 'design', 'icons')
const LUCIDE = join(ROOT, 'node_modules', 'lucide-react')

export const GROUPS: { label: string; names: string[] }[] = [
  { label: '이동 · 방향', names: ['chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'arrow-right', 'menu'] },
  {
    label: '상태 · 알림',
    names: ['info', 'circle-alert', 'triangle-alert', 'circle-check', 'circle-x', 'check', 'loader-circle', 'wifi-off', 'shield-x', 'search-x'],
  },
  { label: '액션', names: ['plus', 'minus', 'x', 'search', 'upload', 'share-2', 'trash', 'pencil', 'copy', 'download', 'list-filter', 'rotate-ccw', 'refresh-cw', 'ellipsis'] },
  { label: '표시 · 기타', names: ['eye', 'eye-off', 'calendar', 'user', 'trending-up', 'trending-down'] },
]

const ATTRS = [
  'xmlns="http://www.w3.org/2000/svg"',
  'width="24"',
  'height="24"',
  'viewBox="0 0 24 24"',
  'fill="none"',
  'stroke="currentColor"',
  'stroke-width="2"',
  'stroke-linecap="round"',
  'stroke-linejoin="round"',
]
const SVG_ATTRS = ATTRS.join(' ')

type IconNode = [string, Record<string, string>][]

/** lucide-react 아이콘 모듈의 __iconData.node를 읽는다 (react를 불러오지 않도록 텍스트로 읽는다) */
function iconNode(name: string): IconNode {
  const src = readFileSync(join(LUCIDE, 'dist', 'esm', 'icons', `${name}.mjs`), 'utf8')
  const m = /const __iconData = (\{[\s\S]*?\n\});/.exec(src)
  if (!m) throw new Error(`lucide-react에 ${name} 아이콘 데이터가 없다`)
  // 문자열·배열·객체만 담은 객체 리터럴이라 식으로 평가한다
  const data = new Function(`return ${m[1]}`)() as { node: IconNode }
  return data.node.map(([tag, attrs]) => {
    const { key: _key, ...rest } = attrs
    return [tag, rest]
  })
}

const element = ([tag, attrs]: IconNode[number]) =>
  `<${tag} ${Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')} />`

const pascal = (name: string) => name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase())

export function buildIcons(version: string): Map<string, string> {
  const out = new Map<string, string>()
  const symbols: string[] = []
  const groups = GROUPS.map((g) => ({
    label: g.label,
    icons: g.names.map((name) => {
      const children = iconNode(name).map(element)
      const svg = `<svg ${SVG_ATTRS}>${children.join('')}</svg>`
      out.set(`${name}.svg`, `<svg\n${ATTRS.map((a) => `  ${a}`).join('\n')}\n>\n${children.map((c) => `  ${c}`).join('\n')}\n</svg>\n`)
      symbols.push(`  <symbol id="${name}" viewBox="0 0 24 24">${children.join('')}</symbol>`)
      return { name, react: `${pascal(name)}Icon`, file: `${name}.svg`, svg }
    }),
  }))
  out.set(
    'sprite.svg',
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n${symbols.join('\n')}\n</svg>\n`,
  )
  const manifest = {
    $description: '생성 파일 — scripts/build-icons.ts의 GROUPS를 고치고 pnpm build:icons. 색은 currentColor, 기본 24px·stroke 2.',
    source: 'lucide',
    version,
    license: 'ISC',
    sizes: [16, 20, 24],
    groups,
  }
  out.set('icons.json', `${JSON.stringify(manifest, null, 2)}\n`)
  out.set('LICENSE.md', `아이콘은 Lucide(ISC License, https://lucide.dev) v${version}에서 가져왔다.\n`)
  return out
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const version = (JSON.parse(readFileSync(join(LUCIDE, 'package.json'), 'utf8')) as { version: string }).version
  const out = buildIcons(version)
  const stale = readdirSync(ICONS_DIR).filter((f) => !out.has(f))
  if (process.argv.includes('--check')) {
    for (const [file, content] of out) {
      let current = ''
      try {
        current = readFileSync(join(ICONS_DIR, file), 'utf8')
      } catch {}
      if (content !== current) {
        console.error(`design/icons/${file} 가 최신이 아니다 — pnpm build:icons`)
        process.exitCode = 1
      }
    }
    for (const f of stale) {
      console.error(`design/icons/${f} 는 GROUPS에 없다 — pnpm build:icons`)
      process.exitCode = 1
    }
  } else {
    for (const f of stale) rmSync(join(ICONS_DIR, f))
    for (const [file, content] of out) writeFileSync(join(ICONS_DIR, file), content)
    console.log(`→ design/icons/ (${out.size}개 파일, lucide v${version})`)
  }
}
