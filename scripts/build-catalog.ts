// component.html의 생성 구역을 채운다
//   <!--ICONS:start-->…<!--ICONS:end-->  design/icons/*.svg → <symbol id="i-<name>">
//   <!--NAV:start-->…<!--NAV:end-->      <section class="demo" id="…"><h2>이름 … → 상단 링크
// 그리고 design/js/components.ts → components.js (타입만 지우고 즉시 실행 함수로 감싼다)
//   node scripts/build-catalog.ts [--check]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'

process.removeAllListeners('warning') // stripTypeScriptTypes 실험 기능 경고 숨김
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DESIGN = fileURLToPath(new URL('../design', import.meta.url))

function symbols(): string {
  const files = readdirSync(join(DESIGN, 'icons')).filter((f) => f.endsWith('.svg') && f !== 'sprite.svg').sort()
  const body = files.map((f) => {
    const svg = readFileSync(join(DESIGN, 'icons', f), 'utf8')
    const inner = svg.replace(/^[\s\S]*?>/, '').replace(/<\/svg>\s*$/, '').replace(/\s*\n\s*/g, '')
    return `<symbol id="i-${f.replace('.svg', '')}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</symbol>`
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">\n${body.join('\n')}\n</svg>`
}

function nav(html: string): string {
  const items = [...html.matchAll(/<section class="demo" id="([^"]+)">\s*<h2>([^<]+?)\s*</g)]
  return items.map(([, id, name]) => `<a href="#${id}">${name.trim()}</a>`).join('')
}

const fill = (html: string, key: string, content: string): string =>
  html.replace(new RegExp(`<!--${key}:start-->[\\s\\S]*?<!--${key}:end-->`), `<!--${key}:start-->${content}<!--${key}:end-->`)

export function buildBehaviorJs(ts: string): string {
  const js = stripTypeScriptTypes(ts, { mode: 'strip' })
    .replace(/^export \{\}\s*$/m, '')
    .split('\n')
    // 타입 자리에 남은 공백 덩어리를 정리한다 (들여쓰기는 유지)
    .map((l) => {
      const indent = /^\s*/.exec(l)?.[0] ?? ''
      const body = l.slice(indent.length).replace(/ {2,}(.)/g, (_, next: string) => (')],;.('.includes(next) ? next : ` ${next}`))
      return (indent + body).trimEnd()
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  return `// 생성 파일 — components.ts를 고치고 pnpm build:catalog\n;(() => {\n${js}\n})()\n`
}

export function buildCatalog(html: string): string {
  return fill(fill(html, 'ICONS', symbols()), 'NAV', nav(html))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targets: Array<[string, string]> = [
    [join(DESIGN, 'component.html'), buildCatalog(readFileSync(join(DESIGN, 'component.html'), 'utf8'))],
    [join(DESIGN, 'js', 'components.js'), buildBehaviorJs(readFileSync(join(DESIGN, 'js', 'components.ts'), 'utf8'))],
  ]
  for (const [file, out] of targets) {
    let current = ''
    try {
      current = readFileSync(file, 'utf8')
    } catch {}
    if (process.argv.includes('--check')) {
      if (out !== current) {
        console.error(`${file} 가 최신이 아니다 — pnpm build:catalog`)
        process.exitCode = 1
      }
    } else {
      writeFileSync(file, out)
      console.log(`→ ${file}`)
    }
  }
}
