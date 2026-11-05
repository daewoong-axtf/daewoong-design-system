// component.html의 생성 구역을 채운다
//   <!--ICONS:start-->…<!--ICONS:end-->  design/icons/*.svg → <symbol id="i-<name>">
//   <!--NAV:start-->…<!--NAV:end-->      두 페이지의 <section>을 모아 사이드바 링크를 만든다 (Components는 NAV_GROUPS 순서로 묶는다)
// foundations.html도 ICONS·NAV를 같은 내용으로 채운다
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

/** 사이드바 묶음 — Storybook Component 메뉴와 같다. 페이지의 절도 이 순서로 놓는다 */
export const NAV_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Actions', ids: ['button'] },
  { label: 'Inputs', ids: ['field', 'text-input', 'checkbox', 'radio', 'switch', 'slider', 'select', 'segmented-control'] },
  { label: 'Feedback', ids: ['dialog', 'alert-dialog', 'bottom-sheet', 'side-sheet', 'popover', 'dropdown-menu', 'tooltip', 'toast', 'callout'] },
  { label: 'Display', ids: ['accordion', 'avatar', 'badge', 'card', 'chip', 'divider', 'list', 'table'] },
  { label: 'Navigation', ids: ['breadcrumb', 'pagination', 'side-navigation', 'tabs', 'top-navigation'] },
  { label: 'State', ids: ['empty-state', 'progress-circle', 'skeleton'] },
]

/** 메뉴 검색 별칭 — 메뉴에 보이는 말과 다른 언어로 찾아도 나오게 한다 */
const SEARCH_ALIASES: Record<string, string> = {
  palette: 'color 색 컬러', roles: 'role token 토큰 색 bg fg stroke', type: 'typography font 글자 폰트', 'text-style': 'text style 글자', spacing: 'spacing margin padding 여백',
  radius: 'radius 라운드', shadow: 'shadow depth 그림자', 'control-height': 'height size 크기', motion: 'motion animation easing 애니메이션', interaction: 'interaction focus hover pressed 포커스 상태',
  icons: 'icon lucide', layout: 'layout breakpoint 브레이크포인트 반응형',
  button: '버튼', field: '필드 폼 라벨', 'text-input': '입력 인풋 검색 텍스트', checkbox: '체크박스', radio: '라디오', switch: '스위치 토글', slider: '슬라이더', select: '셀렉트 드롭다운', 'segmented-control': '세그먼트 토글',
  dialog: '다이얼로그 모달', 'alert-dialog': '확인 경고 모달', 'bottom-sheet': '바텀시트 드로어', 'side-sheet': '사이드시트 패널', popover: '팝오버', 'dropdown-menu': '드롭다운 메뉴', tooltip: '툴팁', toast: '토스트 알림', callout: '콜아웃 안내 alert',
  accordion: '아코디언 접기', avatar: '아바타 프로필', badge: '뱃지 배지', card: '카드', chip: '칩 필터', divider: '구분선 separator', list: '목록 리스트', table: '테이블 표',
  breadcrumb: '브레드크럼 경로', pagination: '페이지네이션 페이지', 'side-navigation': '사이드바 sidebar 메뉴', tabs: '탭', 'top-navigation': '상단 헤더 gnb', 'empty-state': '빈 상태', 'progress-circle': '로딩 스피너 spinner', skeleton: '스켈레톤 로딩',
}

const read = (file: string): string => readFileSync(join(DESIGN, file), 'utf8')
const link = (page: string, id: string, name: string): string => `<a href="${page}#${id}" data-q="${SEARCH_ALIASES[id] ?? ''}">${name}</a>`

function nav(components: string, foundations: string): string {
  const items = new Map([...components.matchAll(/<section class="demo" id="([^"]+)">\s*<h2>([^<]+?)\s*</g)].map(([, id, name]) => [id, name.trim()]))
  const order = NAV_GROUPS.flatMap((g) => g.ids)
  if (order.join() !== [...items.keys()].join()) throw new Error('component.html의 절 순서가 NAV_GROUPS와 다르다')
  const foundation = [...foundations.matchAll(/<section id="([^"]+)"><h2>([^<]+)<\/h2>/g)].map(([, id, name]) => link('foundations.html', id, name))
  const groups = NAV_GROUPS.map((g) => `<p class="page-nav__group">${g.label}</p>${g.ids.map((id) => link('component.html', id, items.get(id) ?? id)).join('')}`)
  return `\n<p class="page-nav__title">Foundations</p>${foundation.join('')}\n<p class="page-nav__title">Components</p>\n${groups.join('\n')}\n`
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

export const buildCatalog = (html: string): string => fill(fill(html, 'ICONS', symbols()), 'NAV', nav(html, read('foundations.html')))
export const buildFoundations = (html: string): string => fill(fill(html, 'ICONS', symbols()), 'NAV', nav(read('component.html'), html))

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targets: Array<[string, string]> = [
    [join(DESIGN, 'component.html'), buildCatalog(read('component.html'))],
    [join(DESIGN, 'foundations.html'), buildFoundations(read('foundations.html'))],
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
