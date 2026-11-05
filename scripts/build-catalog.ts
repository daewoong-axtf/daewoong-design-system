// storybook.html의 생성 구역을 채운다
//   <!--ICONS:start-->…<!--ICONS:end-->  design/icons/*.svg → <symbol id="i-<name>">
//   <!--NAV:start-->…<!--NAV:end-->      <section>을 모아 사이드바 링크를 만든다 (INTRO_ID·FOUNDATION_IDS·NAV_GROUPS 순서)
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

/** 페이지의 절도 아래 순서로 놓는다 */
const INTRO_ID = 'introduction'
const FOUNDATION_IDS = ['ci', 'palette', 'roles', 'font', 'type', 'text-style', 'spacing', 'radius', 'shadow', 'z-index', 'control-height', 'pattern', 'motion', 'interaction', 'icons', 'breakpoint', 'layout']

/** 사이드바 묶음 — Storybook Component 메뉴와 같다 */
export const NAV_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Actions', ids: ['button', 'filter-button'] },
  { label: 'Inputs', ids: ['field', 'form', 'text-input', 'password-input', 'input-group', 'search-input', 'checkbox', 'radio', 'switch', 'slider', 'select', 'searchable-select', 'combobox', 'calendar', 'date-picker', 'time-select', 'time-picker', 'segmented-control', 'filter-sheet', 'filter-tags'] },
  { label: 'Feedback', ids: ['dialog', 'alert-dialog', 'bottom-sheet', 'side-sheet', 'popover', 'dropdown-menu', 'tooltip', 'info-tooltip', 'toast', 'callout', 'connection-status-banner'] },
  { label: 'Display', ids: ['accordion', 'avatar', 'badge', 'status-badge', 'card', 'stat-card', 'chip', 'collapsible', 'divider', 'form-section', 'list', 'reveal', 'table', 'timeline'] },
  { label: 'Navigation', ids: ['breadcrumb', 'list-footer', 'page-header', 'pagination', 'side-navigation', 'stepper', 'tabs', 'top-navigation'] },
  { label: 'State', ids: ['empty-state', 'error-view', 'progress', 'progress-circle', 'skeleton'] },
]

/** 메뉴 검색 별칭 — 메뉴에 보이는 말과 다른 언어로 찾아도 나오게 한다 */
const SEARCH_ALIASES: Record<string, string> = {
  font: '폰트 서체 글꼴 pretendard font typeface', 'z-index': 'z-index 쌓임 순서 레이어 앞뒤 겹침 overlay 딤 modal',
  ci: 'ci 로고 logo 엠블럼 심볼 브랜드 대웅제약 영문 english daewoong',
  introduction: '소개 시작 사용법 개요 overview readme',
  palette: 'color 색 컬러', roles: 'role token 토큰 색 bg fg stroke', type: 'typography font 글자 폰트', 'text-style': 'text style 글자', spacing: 'spacing margin padding 여백',
  radius: 'radius 라운드', shadow: 'shadow depth 그림자', 'control-height': 'height size 크기', motion: 'motion animation easing 애니메이션', interaction: 'interaction focus hover pressed 포커스 상태',
  pattern: 'pattern hatch 빗금 차단',
  icons: 'icon lucide', breakpoint: 'breakpoint 브레이크포인트 반응형 화면 크기 모바일 태블릿', layout: 'layout 레이아웃 여백 너비 gutter',
  form: '폼 제출 검증', 'form-section': '폼 묶음 섹션', 'password-input': '비밀번호 패스워드', 'input-group': '입력 그룹 단위 addon', 'search-input': '검색창', 'info-tooltip': '도움말 물음표 툴팁',
  calendar: '달력 캘린더', 'date-picker': '날짜 선택 datepicker', 'time-select': '시간 선택', 'time-picker': '시간 입력', combobox: '콤보박스 자동완성 비동기 async api autocomplete', 'searchable-select': '검색 셀렉트',
  'filter-button': '필터 버튼', 'filter-sheet': '필터 시트 조회 조건', 'filter-tags': '필터 태그 칩', 'list-footer': '목록 하단 건수', 'page-header': '페이지 제목 헤더', collapsible: '접기 펼치기', 'stat-card': '통계 지표 카드 kpi', timeline: '타임라인 이력',
  'status-badge': '상태 뱃지 역할 role', 'error-view': '오류 화면 404 500', 'connection-status-banner': '연결 끊김 오프라인 offline 배너', reveal: '스크롤 등장 애니메이션', stepper: '단계 진행 스텝퍼', progress: '진행률 막대 프로그레스',
  button: '버튼', field: '필드 폼 라벨', 'text-input': '입력 인풋 검색 텍스트', checkbox: '체크박스', radio: '라디오', switch: '스위치 토글', slider: '슬라이더', select: '셀렉트 드롭다운', 'segmented-control': '세그먼트 토글',
  dialog: '다이얼로그 모달', 'alert-dialog': '확인 경고 모달', 'bottom-sheet': '바텀시트 드로어', 'side-sheet': '사이드시트 패널', popover: '팝오버', 'dropdown-menu': '드롭다운 메뉴', tooltip: '툴팁', toast: '토스트 알림', callout: '콜아웃 안내 alert',
  accordion: '아코디언 접기', avatar: '아바타 프로필', badge: '뱃지 배지', card: '카드', chip: '칩 필터', divider: '구분선 separator', list: '목록 리스트', table: '테이블 표',
  breadcrumb: '브레드크럼 경로', pagination: '페이지네이션 페이지', 'side-navigation': '사이드바 sidebar 메뉴', tabs: '탭', 'top-navigation': '상단 헤더 gnb', 'empty-state': '빈 상태', 'progress-circle': '로딩 스피너 spinner', skeleton: '스켈레톤 로딩',
}

const link = (id: string, name: string): string => `<a href="#${id}" data-q="${SEARCH_ALIASES[id] ?? ''}">${name}</a>`

function nav(html: string): string {
  const items = new Map([...html.matchAll(/<section class="demo" id="([^"]+)">[\s\S]*?<h2>([^<]+?)\s*</g)].map(([, id, name]) => [id, name.trim()]))
  const order = [INTRO_ID, ...FOUNDATION_IDS, ...NAV_GROUPS.flatMap((g) => g.ids)]
  if (order.join() !== [...items.keys()].join()) throw new Error('storybook.html의 절 순서가 INTRO_ID·FOUNDATION_IDS·NAV_GROUPS와 다르다')
  const named = (id: string) => link(id, items.get(id) ?? id)
  const groups = NAV_GROUPS.map((g) => `<p class="page-nav__group">${g.label}</p>${g.ids.map(named).join('')}`)
  return `\n${named(INTRO_ID)}\n<p class="page-nav__title">Foundations</p>${FOUNDATION_IDS.map(named).join('')}\n<p class="page-nav__title">Components</p>\n${groups.join('\n')}\n`
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

export const buildCatalog = (html: string): string => fill(fill(html, 'ICONS', symbols()), 'NAV', nav(html))

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targets: Array<[string, string]> = [
    [join(DESIGN, 'storybook.html'), buildCatalog(readFileSync(join(DESIGN, 'storybook.html'), 'utf8'))],
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
