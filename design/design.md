# Daewoong Design System — Foundations

> 값의 정본은 [`tokens.json`](tokens.json)이고, 이 문서는 그 값을 **언제·어디에** 쓰는지 정한다.
> 표의 값과 `tokens.json`이 다르면 `tokens.json`이 맞다. CSS 변수는 [`tokens.css`](tokens.css)에 `--dw-<이름>`으로 있다.
> 프로젝트에 붙이는 방법은 [14장 환경별 적용](#14-환경별-적용)에 있다.

## 1. 원칙

- **색은 역할로 부른다.** 화면은 역할 토큰(`bg-*` · `fg-*` · `stroke-*`)만 쓴다. 컴포넌트 명세는 역할 토큰을 우선하되, 다크 모드에서 대응하는 역할이 없는 중립 회색 몇 자리에 한해 `gray-*`·`static-*` 팔레트를 직접 쓴다. **유채색 팔레트(`orange`·`blue`·`green`·`yellow`·`red`·`purple`)는 어디서도 직접 쓰지 않는다** — 브랜드 교체가 역할 토큰만으로 끝나게 하기 위해서다.
- **깊이는 색으로 먼저 만든다.** 표면 층위(`bg-layer-basement` → `bg-layer-default` → `bg-layer-floating`)로 구분하고, 그림자는 떠 있는 요소(메뉴·다이얼로그·토스트)와 7장 표의 `shadow-s1` 자리에만 쓴다.
- **브랜드 색은 꼭 필요한 곳에만 쓴다.** 화면의 주된 행동 1개, 선택 상태, 강조 링크 정도로 제한한다.
- **상태를 색 하나로만 알리지 않는다.** 오류·경고·성공에는 항상 아이콘이나 텍스트를 함께 붙인다(WCAG 1.4.1).
- **임의의 수치를 만들지 않는다.** 간격·크기·모서리·그림자·모션은 아래 스케일 안에서만 고른다.

## 2. 색

### 2.1 테마

| 방식 | 동작 |
| --- | --- |
| 기본 | OS 설정(`prefers-color-scheme`)을 따른다 |
| `<html data-theme="light">` | 라이트 고정 |
| `<html data-theme="dark">` | 다크 고정 |

다크 값은 팔레트를 통째로 바꿔 만든다. 역할 이름은 두 테마에서 같다.

### 2.2 팔레트

| 계열 | 단계 | 용도 |
| --- | --- | --- |
| `gray` | 00, 100–1000 | 뉴트럴. 00은 흰색(라이트) |
| `gray-alpha` | 100–1000 | 반투명 뉴트럴 |
| `orange` | 100–1000 | **브랜드** (대웅 오렌지 `#F18A00` — 4장 참고) |
| `blue` | 100–1000 | 정보(informative), 포커스 링 |
| `green` | 100–1000 | 성공(positive) |
| `yellow` | 100–1000 | 경고(warning) |
| `red` | 100–1000 | 오류·파괴(critical) |
| `purple` | 100–1000 | 예비. 역할에 연결하지 않음 |
| `static-white` / `static-black` | — | 테마와 무관하게 고정 |
| `static-white-alpha` / `static-black-alpha` | 50·100–1000 | 스크림·오버레이 등 테마 무관 반투명 |

### 2.3 역할 토큰

이름 규칙: `<층>-<의미>[-<강도>][-<상태>]`

- **층** `bg`(배경) · `fg`(글자·아이콘) · `stroke`(테두리·구분선)
- **의미** `brand` · `neutral` · `critical` · `informative` · `positive` · `warning` · `layer` · `overlay` · `transparent` · `disabled` · `placeholder` · `focus-ring`
- **강도** `solid`(채운 면) · `weak`(옅은 면) · `muted` · `subtle` · `contrast` · `inverted`
- **상태** `pressed` · `selected`

짝 규칙 — 배경 위 글자는 아래 짝으로만 쓴다.

| 배경 | 글자·아이콘 |
| --- | --- |
| `bg-layer-default` · `bg-layer-floating` · `bg-neutral-subtle` | `fg-neutral`, `fg-neutral-muted`, `fg-neutral-subtle` |
| `bg-brand-solid` | `fg-on-brand-solid` |
| `bg-neutral-solid` | `fg-on-neutral-solid` |
| `bg-critical-solid` · `bg-positive-solid` · `bg-informative-solid` · `bg-warning-solid` | `fg-on-<의미>-solid` |
| `bg-<의미>-weak` | `fg-<의미>-contrast` |
| `bg-disabled` | `fg-disabled` |

| 역할 | 라이트 | 다크 |
| --- | --- | --- |
| `bg-brand-solid` | `orange-600` | `orange-700` |
| `bg-brand-solid-pressed` | `orange-700` | `orange-800` |
| `bg-brand-weak` | `orange-100` | `orange-100` |
| `bg-brand-weak-pressed` | `orange-200` | `orange-200` |
| `bg-critical-solid` | `red-800` | `red-500` |
| `bg-critical-solid-pressed` | `red-900` | `red-400` |
| `bg-critical-weak` | `red-100` | `red-100` |
| `bg-critical-weak-pressed` | `red-200` | `red-200` |
| `bg-disabled` | `gray-200` | `gray-300` |
| `bg-informative-solid` | `blue-800` | `blue-500` |
| `bg-informative-solid-pressed` | `blue-900` | `blue-400` |
| `bg-informative-weak` | `blue-100` | `blue-100` |
| `bg-informative-weak-pressed` | `blue-200` | `blue-200` |
| `bg-layer-basement` | `gray-200` | `gray-00` |
| `bg-layer-default` | `gray-00` | `gray-100` |
| `bg-layer-default-pressed` | `gray-100` | `gray-300` |
| `bg-layer-floating` | `gray-00` | `gray-200` |
| `bg-layer-floating-pressed` | `gray-100` | `gray-300` |
| `bg-neutral-inverted` | `gray-900` | `gray-1000` |
| `bg-neutral-inverted-pressed` | `gray-800` | `gray-800` |
| `bg-neutral-muted` | `gray-100` | `gray-200` |
| `bg-neutral-solid` | `gray-900` | `gray-1000` |
| `bg-neutral-solid-muted` | `gray-800` | `gray-400` |
| `bg-neutral-solid-muted-pressed` | `gray-900` | `gray-500` |
| `bg-neutral-solid-pressed` | `gray-800` | `gray-800` |
| `bg-neutral-subtle` | `gray-00` | `gray-100` |
| `bg-neutral-weak` | `gray-200` | `gray-300` |
| `bg-neutral-weak-alpha` | `static-black-alpha-200` | `static-white-alpha-200` |
| `bg-neutral-weak-alpha-pressed` | `static-black-alpha-300` | `static-white-alpha-300` |
| `bg-neutral-weak-pressed` | `gray-300` | `gray-400` |
| `bg-overlay` | `static-black-alpha-700` | `static-black-alpha-700` |
| `bg-overlay-muted` | `static-black-alpha-500` | `static-black-alpha-500` |
| `bg-positive-solid` | `green-800` | `green-500` |
| `bg-positive-solid-pressed` | `green-900` | `green-400` |
| `bg-positive-weak` | `green-100` | `green-100` |
| `bg-positive-weak-pressed` | `green-200` | `green-200` |
| `bg-transparent` | oklch(0 0 0 / 0) | oklch(1 0 0 / 0) |
| `bg-transparent-pressed` | `static-black-alpha-100` | `static-white-alpha-50` |
| `bg-transparent-selected` | `static-black-alpha-200` | `static-white-alpha-100` |
| `bg-transparent-selected-pressed` | `static-black-alpha-300` | `static-white-alpha-200` |
| `bg-warning-solid` | `yellow-300` | `yellow-800` |
| `bg-warning-solid-pressed` | `yellow-400` | `yellow-900` |
| `bg-warning-weak` | `yellow-100` | `yellow-100` |
| `bg-warning-weak-pressed` | `yellow-200` | `yellow-200` |
| `fg-brand` | `orange-800` | `orange-700` |
| `fg-brand-contrast` | `orange-900` | `orange-800` |
| `fg-critical` | `red-800` | `red-700` |
| `fg-critical-contrast` | `red-900` | `red-900` |
| `fg-disabled` | `gray-500` | `gray-500` |
| `fg-informative` | `blue-800` | `blue-700` |
| `fg-informative-contrast` | `blue-900` | `blue-900` |
| `fg-neutral` | `gray-1000` | `gray-1000` |
| `fg-neutral-inverted` | `gray-00` | `gray-100` |
| `fg-neutral-muted` | `gray-800` | `gray-800` |
| `fg-neutral-subtle` | `gray-700` | `gray-700` |
| `fg-on-brand-solid` | `static-black` | `static-black` |
| `fg-on-critical-solid` | `static-white` | `static-white` |
| `fg-on-informative-solid` | `static-white` | `static-white` |
| `fg-on-neutral-solid` | `gray-00` | `gray-100` |
| `fg-on-positive-solid` | `static-white` | `static-white` |
| `fg-on-warning-solid` | `static-black-alpha-900` | `static-black-alpha-900` |
| `fg-placeholder` | `gray-600` | `gray-600` |
| `fg-positive` | `green-800` | `green-700` |
| `fg-positive-contrast` | `green-900` | `green-900` |
| `fg-warning` | `yellow-800` | `yellow-700` |
| `fg-warning-contrast` | `yellow-900` | `yellow-900` |
| `stroke-brand-solid` | `orange-700` | `orange-700` |
| `stroke-brand-weak` | `orange-300` | `orange-300` |
| `stroke-critical-solid` | `red-700` | `red-700` |
| `stroke-critical-weak` | `red-300` | `red-300` |
| `stroke-focus-ring` | `blue-600` | `blue-600` |
| `stroke-informative-solid` | `blue-700` | `blue-700` |
| `stroke-informative-weak` | `blue-300` | `blue-300` |
| `stroke-neutral-contrast` | `gray-1000` | `gray-1000` |
| `stroke-neutral-muted` | `static-black-alpha-300` | `static-white-alpha-100` |
| `stroke-neutral-solid` | `gray-800` | `gray-800` |
| `stroke-neutral-subtle` | `static-black-alpha-200` | `static-white-alpha-50` |
| `stroke-neutral-weak` | `gray-400` | `gray-400` |
| `stroke-positive-solid` | `green-700` | `green-700` |
| `stroke-positive-weak` | `green-300` | `green-300` |
| `stroke-warning-solid` | `yellow-700` | `yellow-700` |
| `stroke-warning-weak` | `yellow-300` | `yellow-300` |

### 2.4 Warning과 브랜드색 구분

대웅 오렌지와 Warning 노랑은 색상이 가까워 나란히 있으면 헷갈린다. 네 가지로 구분한다.

- **색상:** Warning은 빨강기가 없는 노랑(`yellow-*`)이고, 브랜드는 `orange-*`다. 서로의 자리에 쓰지 않는다.
- **명도:** Warning은 `bg-warning-weak` + `fg-warning-contrast`처럼 옅은 면에 진한 글자를 쓴다.
- **맥락:** 브랜드는 누르는 행동, Warning은 읽는 상태에 쓴다. Warning 채움 버튼을 만들지 않는다.
- **아이콘:** Warning에는 항상 경고 아이콘을 붙인다. 색만으로 알리지 않는다.

## 3. 타이포그래피

### 3.1 서체

`--dw-font-sans` — 기본 서체는 **Pretendard**다. 웹은 [`fonts/pretendard.css`](fonts/pretendard.css)를 연결한다. 글자 범위별로 나뉜 공식 파일이라 화면에 나온 글자의 조각만 내려받고, 내부망에서도 외부 CDN 없이 뜬다. 라이선스는 [OFL 1.1](fonts/OFL.txt)이고, 파일을 수정하거나 서브셋을 새로 만들어 같은 이름으로 배포하지 않는다. 파일이 없으면 시스템 서체로 대체된다. 두께는 `regular 400` · `medium 500` · `bold 700` 세 가지만 쓴다.

`--dw-font-mono` — 코드와 자릿수를 맞춰야 하는 값에 쓴다. 웹폰트를 싣지 않고 설치된 서체를 쓴다.

### 3.2 스케일

| 토큰 | 크기 | 줄 높이 |
| --- | --- | --- |
| `t1` | 11px | 15px |
| `t2` | 12px | 16px |
| `t3` | 13px | 18px |
| `t4` | 14px | 19px |
| `t5` | 16px | 22px |
| `t6` | 18px | 24px |
| `t7` | 20px | 27px |
| `t8` | 22px | 30px |
| `t9` | 24px | 32px |
| `t10` | 26px | 35px |
| `t11` | 28px | 38px |
| `t12` | 32px | 42px |
| `t13` | 40px | 52px |
| `t14` | 48px | 60px |

CSS 변수: `--dw-font-<t>-size`, `--dw-font-<t>-line-height`. 글자 간격(letter-spacing)은 0.

### 3.3 텍스트 스타일

화면의 글자는 스케일을 직접 고르지 않고 아래 스타일을 쓴다. 컴포넌트 안의 글자는 그 컴포넌트 명세의 값을 따른다. 값은 `tokens.json`의 `typography.style`에 있고, CSS 변수는 `--dw-text-<스타일>-size` · `-line-height` · `-weight`다.

| 스타일 | 스케일 | 두께 | 쓰는 자리 |
| --- | --- | --- | --- |
| `display` | t12 (32/42) | bold | 랜딩·빈 화면의 큰 제목 |
| `heading-xl` | t9 (24/32) | bold | 페이지 제목 |
| `heading-lg` | t7 (20/27) | bold | 섹션 제목, 다이얼로그 제목 |
| `heading-md` | t6 (18/24) | bold | 카드 제목, 시트 제목 |
| `heading-sm` | t5 (16/22) | bold | 목록 그룹 제목 |
| `body-lg` | t5 (16/22) | regular | 본문 기본 |
| `body-md` | t4 (14/19) | regular | 보조 본문, 표 셀 |
| `body-sm` | t3 (13/18) | regular | 설명 문구, 필드 안내 |
| `label-lg` | t5 (16/22) | medium | 큰 버튼, 탭 |
| `label-md` | t4 (14/19) | medium | 기본 버튼, 입력 라벨 |
| `label-sm` | t3 (13/18) | medium | 작은 버튼, 칩, 뱃지 |
| `caption` | t2 (12/16) | regular | 타임스탬프, 각주 |

## 4. 브랜드 교체

브랜드 램프 `orange-*`는 대웅 오렌지(`#F18A00`, `oklch(0.729 0.169 61.3)`)를 라이트 600·다크 700에 둔 램프다. 밝은 오렌지라 흰 글자는 대비가 모자라므로(2.5:1) `fg-on-brand-solid`는 `static-black`(8.4:1), 흰 바탕 위 `fg-brand`는 `orange-800`(5.2:1)을 쓴다. 다시 바꿀 때의 절차:

1. `tokens.json`의 `palette.light.orange-100 … orange-1000`과 `palette.dark.orange-*`를 새 값으로 바꾼다(단계 의미 유지: 100 가장 옅음 → 1000 가장 짙음, 600이 라이트 `bg-brand-solid`, 700이 다크 `bg-brand-solid`).
2. `pnpm build:tokens`로 `tokens.css`를 다시 만든다.
3. 대비를 다시 잰다 — `bg-brand-solid` 위 `fg-on-brand-solid` 4.5:1 이상(WCAG AA), `bg-layer-default` 위 `fg-brand` 4.5:1 이상. 미달이면 `role.*.fg-on-brand-solid`를 어두운 색(`{palette.gray-1000}` 또는 `{palette.static-black}`)으로 바꾼다.
4. `pnpm test`.

컴포넌트 명세와 CSS는 역할 토큰만 쓰므로 다른 파일은 고치지 않는다.

## 5. 간격

| 토큰 | 값 |
| --- | --- |
| `x0_5` | 2px |
| `x1` | 4px |
| `x1_5` | 6px |
| `x2` | 8px |
| `x2_5` | 10px |
| `x3` | 12px |
| `x3_5` | 14px |
| `x4` | 16px |
| `x4_5` | 18px |
| `x5` | 20px |
| `x6` | 24px |
| `x7` | 28px |
| `x8` | 32px |
| `x9` | 36px |
| `x10` | 40px |
| `x12` | 48px |
| `x13` | 52px |
| `x14` | 56px |
| `x16` | 64px |

CSS 변수: `--dw-spacing-<토큰>` (예: `--dw-spacing-x4`).

의미 간격:

| 토큰 | 값 | 쓰는 자리 |
| --- | --- | --- |
| `spacing-x-global-gutter` | x4 (16px) | 화면 좌우 여백(모바일) |
| `spacing-x-between-chips` | x2 (8px) | 칩·뱃지 사이 |
| `spacing-y-component-default` | x3 (12px) | 같은 그룹 안 컴포넌트 사이 |
| `spacing-y-between-text` | x1_5 (6px) | 제목과 설명 사이 |
| `spacing-y-nav-to-title` | x5 (20px) | 상단 내비게이션과 페이지 제목 사이 |
| `spacing-y-screen-bottom` | x14 (56px) | 스크롤 끝 하단 여백 |

### 컨트롤 높이

버튼과 입력 필드는 같은 높이 스케일을 쓴다. 같은 크기는 나란히 놓아도 정렬된다. `underline` Text Input은 예외로 medium 34px, large 40px이다.

| 크기 | 높이 | `dw-*` | React Button `size` | React Input `inputSize` | React Select `size` |
| --- | --- | --- | --- | --- | --- |
| xsmall | 32px `x8` | `--xsmall` | `xs` · `icon-xs` | `xs` | 없음 |
| small | 36px `x9` | `--small` | `sm` · `icon-sm` | `sm` | `sm` |
| medium | 40px `x10` | `--medium` | `default` · `icon` | `default` | `default` |
| large | 52px `x13` | `--large` | `lg` · `icon-lg` | `lg` | `lg` |

`dw-*` Select는 medium·large만 있다.

## 6. 모서리

| 토큰 | 값 | 쓰는 자리 |
| --- | --- | --- |
| `r1` | 4px | 체크박스 |
| `r2` | 8px | 버튼(small·medium), 입력 필드(medium) |
| `r3` | 12px | 버튼(large), 입력 필드(large), 카드, 다이얼로그 닫기 버튼 |
| `r4` | 16px | 큰 카드·패널 |
| `r5` | 20px | 다이얼로그, 바텀 시트 상단 |
| `full` | 9999px | 버튼(xsmall), 칩, 스위치, 아바타, 뱃지 |

그 밖의 `r0_5`(2px) · `r1_5`(6px) · `r2_5`(10px) · `r3_5`(14px) · `r6`(24px)은 컴포넌트 명세가 지정할 때만 쓴다. 중첩된 면은 바깥 radius = 안쪽 radius + 사이 간격.

## 7. 깊이

| 토큰 | 라이트 | 쓰는 자리 |
| --- | --- | --- |
| `shadow-s1` | 0 1px 4px 0 / 7.8% | 테두리 있는 컨트롤(outline 버튼, 입력, Select, 체크박스, 라디오), 스위치 트랙, 슬라이더 손잡이, outline 카드, Segmented Control의 선택 표시 |
| `shadow-s2` | 0 2px 10px 0 / 10.2% | 토스트, elevated 카드 |
| `shadow-s3` | 0 4px 16px 0 / 12.2% | 다이얼로그, 시트, 드롭다운 메뉴, 팝오버, Select 목록 |

다크 모드는 알파가 훨씬 크다(`tokens.json` `shadow.dark`). 한 벌만 쓰지 않는다.

### 쌓임 순서 (z-index)

겹치는 요소의 앞뒤는 토큰으로 정한다. 숫자를 직접 쓰지 않는다. 카탈로그의 [쌓임 순서](storybook.html#z-index)에서 볼 수 있다.

| 토큰 | 값 | 자리 |
| --- | --- | --- |
| `z-tooltip` | 70 | Tooltip, Info Tooltip |
| `z-toast` | 60 | Toast |
| `z-dropdown` | 55 | Select, Combobox, Date Picker 목록, Dropdown Menu, Popover |
| `z-modal` | 50 | Dialog, Alert Dialog, Bottom Sheet, Side Sheet |
| `z-overlay` | 50 | 모달의 Backdrop(딤) |
| `z-notice` | 20 | Connection Status Banner |
| `z-raised` | 10 | Top Navigation, 모바일 하단 고정 액션 |
| `z-base` | 0 | 일반 콘텐츠 |

- **`z-overlay`와 `z-modal`은 같은 값이다.** 같은 값은 문서 순서로 쌓인다. 모달 위에 모달을 열면 뒤 모달의 딤이 앞 모달을 덮어야 해서 나누지 않는다.
- **`z-dropdown`은 모달보다 높다.** 모달 안에서 연 목록이 모달 뒤로 깔리면 안 된다. React는 Portal로 `body`에 붙으므로 이 값이 없으면 여는 순서에 따라 깔린다.
- **`z-toast`는 모달보다 높다.** 모달을 연 채 저장해도 결과가 보여야 한다.
- **컴포넌트 안에서만 쓰는 정렬은 예외다.** Root가 쌓임 맥락을 만든 안쪽의 `-1`·`1`은 토큰이 아니어도 된다.

### 빗금 패턴

비활성 구간이나 차단 영역은 색을 채우지 않고 빗금으로 표시해 아래 내용이 비치게 한다. `.dw-hatch`를 쓴다. `repeating-linear-gradient`는 iOS Safari에서 큰 요소의 타일이 끊기므로 고정 타일로 그린다.

## 8. 모션

| 토큰 | 값 |
| --- | --- |
| `duration-d1` | 50ms |
| `duration-d2` | 100ms |
| `duration-d3` | 150ms |
| `duration-d4` | 200ms |
| `duration-d5` | 250ms |
| `duration-d6` | 300ms |
| `duration-color-transition` | {motion.duration.d3} |
| `duration-pressed-scale` | {motion.duration.d3} |
| `easing-linear` | `cubic-bezier(0, 0, 1, 1)` |
| `easing-easing` | `cubic-bezier(0.35, 0, 0.35, 1)` |
| `easing-enter` | `cubic-bezier(0, 0, 0.15, 1)` |
| `easing-exit` | `cubic-bezier(0.35, 0, 1, 1)` |
| `easing-enter-expressive` | `cubic-bezier(0.03, 0.4, 0.1, 1)` |
| `easing-exit-expressive` | `cubic-bezier(0.35, 0, 0.95, 0.55)` |
| `easing-pressed-scale` | `cubic-bezier(0, 0, 0.15, 1)` |
| `scale-s95` · `s97` · `s98` | 0.95 · 0.97 · 0.98 (`prefers-reduced-motion: reduce`에서 1) |

- **마이크로 모션**(누름·포커스·색 변화)은 200ms 이하 — 색 전환은 `duration-color-transition` + `easing-easing`.
- **매크로 모션**(다이얼로그·시트·페이지)은 200ms 초과 — 등장 `duration-d6` + `easing-enter`, 퇴장 `duration-d4` + `easing-exit`.
- **누름 피드백**: 누를 수 있는 면은 `:active`에서 `scale`을 줄인다(`duration-pressed-scale` + `easing-pressed-scale`). 높이 40px 이하 컨트롤 → `scale-s95`, 41–64px → `scale-s97`, 그보다 큰 면(카드·리스트 행) → `scale-s98`.
- `prefers-reduced-motion: reduce`이면 이동·확대 애니메이션을 끄고 투명도 전환만 남긴다.

## 9. 레이아웃과 브레이크포인트

### 9.1 브레이크포인트

값은 `tokens.json`의 `breakpoint`에 있다. 카탈로그의 [브레이크포인트](storybook.html#breakpoint)에서 지금 화면이 어느 구간인지 볼 수 있다.

| 토큰 | 최소 너비 | 기준 기기 | 화면 좌우 여백 |
| --- | --- | --- | --- |
| (기본) | 0 | 휴대폰 | 16px (`spacing-x-global-gutter`) |
| `breakpoint-sm` | 640px | 큰 휴대폰 | 16px |
| `breakpoint-md` | 768px | 태블릿 | 24px |
| `breakpoint-lg` | 1024px | 작은 데스크톱 | 32px |
| `breakpoint-xl` | 1280px | 데스크톱 | 32px |
| `breakpoint-2xl` | 1536px | 넓은 데스크톱 | 32px |

- CSS `@media`에는 변수를 쓸 수 없다. 위 숫자를 그대로 적는다. `--dw-breakpoint-*`는 JS에서 값을 읽을 때 쓴다.
- 위로 올라가는 기준은 `min-width: <값>`, 아래를 뜻할 때는 `max-width: <값 - 1>`이다. 예: `md` 미만은 `max-width: 767px`. 다른 숫자는 만들지 않는다.
- Tailwind 기본 `sm`~`2xl`과 같은 값이라 React에서는 `md:`처럼 그대로 쓴다.
- "모바일"은 `md`(768px) 미만을 뜻한다.

### 9.2 레이아웃

- 모바일 우선 — 기본 스타일이 모바일이고, 위 너비부터 덮어쓴다.
- 콘텐츠 최대 너비: 정보형 페이지 1040px, 넓은 목록·대시보드 1280px.
- 사이드 내비게이션은 `lg`(1024px) 이상에서 펼치고, 미만에서는 상단 메뉴 버튼으로 여는 off-canvas가 된다.
- 다이얼로그는 768px 미만에서 화면 폭의 90%, 이상에서 고정 폭(480/800px)으로 가운데 뜬다. 아래서 올라오는 형태가 필요하면 Bottom Sheet를 쓴다.
- 터치 타깃은 최소 44×44px. 보이는 크기가 작으면 투명 히트 영역을 넓힌다.
- 가로로 눕힌 휴대폰은 너비가 넓어도 모바일이다. 높이 500px 이하 가로 화면(`(max-height: 500px) and (orientation: landscape)`)에는 데스크톱 배치를 쓰지 않는다.
- 모바일 키보드가 올라오면 시트와 하단 고정 버튼을 키보드 위로 민다(`visualViewport` 높이 기준).

## 10. 아이콘

[Lucide](https://lucide.dev) (ISC). 쓰는 아이콘만 [`icons/`](icons/)에 들어 있고, 언어와 상관없이 파일만 읽으면 된다.

| 파일 | 내용 |
| --- | --- |
| `icons/<name>.svg` | 아이콘 하나 (24×24, stroke 2, `currentColor`) |
| `icons/sprite.svg` | 전체를 `<symbol id="<name>">`로 묶은 파일 |
| `icons/icons.json` | 이름·분류·파일·React 이름·SVG 원문 목록. 어떤 아이콘이 있는지는 여기서 찾는다 |

세 파일은 `pnpm build:icons`가 lucide-react(고정 버전, `icons.json`의 `version`)에서 만든다. 손으로 고치지 않는다. 목록에 없는 아이콘이 필요하면 lucide.dev에서 같은 이름을 찾아 `scripts/build-icons.ts`의 `GROUPS`에 넣는다.

환경별로 쓰는 방법:

| 환경 | 방법 |
| --- | --- |
| 서버 템플릿 (Jinja·Django, Thymeleaf·JSP·FreeMarker) | SVG 원문을 그대로 넣거나 `<svg><use href="/icons/sprite.svg#search"/></svg>` (스프라이트는 같은 출처에서 서빙) |
| React | `lucide-react`의 `<SearchIcon />` (`icons.json`의 `react`) |
| Vue · Svelte · Angular · React Native | 각 Lucide 패키지(`lucide-vue-next` · `lucide-svelte` · `lucide-angular` · `lucide-react-native`)에서 같은 이름 |
| Python 데이터 앱 (Streamlit 등) | `icons.json`의 `svg`를 HTML로 렌더 |
| PDF · 메일 · 리포트 | SVG를 PNG로 변환 (`cairosvg`, Apache Batik). 메일은 SVG를 못 띄우는 클라이언트가 많아 PNG를 쓴다 |
| Java·Kotlin 데스크탑 (JavaFX · Swing) | SVG 로더 라이브러리로 읽는다. `path`만 쓰지 않고 `circle`·`line`도 섞여 있어 JavaFX `SVGPath`로 바로 그리기는 어렵다 |
| Android (Kotlin: Jetpack Compose · XML View) | Android Studio Vector Asset으로 SVG를 VectorDrawable로 변환해 `painterResource(R.drawable.ic_search)`로 쓴다. 변환 뒤 `strokeColor`가 남아 있는지 확인하고(비었으면 `#000000`으로 채운다) 색은 `Icon`의 `tint`로 입힌다 |

```html
<!-- Jinja · Thymeleaf 공통: 크기는 width/height, 색은 감싼 요소의 color(fg-* 토큰) -->
<button class="dw-button" aria-label="검색">
  <svg width="20" height="20" aria-hidden="true"><use href="/icons/sprite.svg#search"/></svg>
</button>
```

| 크기 | 쓰는 자리 | stroke |
| --- | --- | --- |
| 16px | 작은 버튼·칩·뱃지 안 | 2 |
| 20px | 화면에 직접 놓는 기본 크기. 컴포넌트 안은 그 명세의 값을 따른다 | 2 |
| 24px | 내비게이션·아이콘 버튼 | 2 |

색은 `currentColor` — 아이콘을 담은 요소의 `fg-*`를 따른다. 의미 있는 아이콘(단독 아이콘 버튼)은 접근 가능한 이름을 붙이고, 장식용은 `aria-hidden="true"`.

## 11. 포커스

키보드 포커스(`:focus-visible`)는 모든 상호작용 요소에 같은 모양으로 보인다.

```css
outline: 2px solid var(--dw-stroke-focus-ring);
outline-offset: 2px;
```

마우스 클릭으로는 보이지 않는다(`:focus-visible`만 사용). 입력 필드는 outline 대신 테두리를 2px `stroke-neutral-contrast`로 바꾸는 방식을 쓴다([Text Input](components/text-input.md)).

## 12. 하지 말 것

- 유채색 팔레트(`--dw-orange-600`, `--dw-blue-700` 등)를 컴포넌트·화면 CSS에서 직접 쓰지 않는다. 화면 CSS는 회색 팔레트도 쓰지 않는다.
- 브랜드 색을 넓은 배경에 칠하지 않는다.
- 스케일 밖 수치(15px 간격, 7px radius 등)를 만들지 않는다. `z-index` 숫자와 브레이크포인트 밖 분기점도 만들지 않는다.
- 뱃지를 누를 수 있게 만들지 않는다. 구분선을 목록 마지막 항목 뒤에 넣지 않는다. 메뉴 항목 사이에 구분선을 넣지 않는다.
- 그림자를 한 화면에 여러 단계로 겹쳐 쓰지 않는다.

## 13. 알려진 빈칸

- 다크 테마는 정의돼 있으나 서비스 화면에서 충분히 검증되지 않았다.

## 14. 환경별 적용

백엔드 언어가 무엇이든 **화면이 브라우저에 뜨면 스타일은 CSS로 들어간다.** 그래서 갈래는 셋이다.

| 환경 | 쓰는 것 | 컴포넌트 |
| --- | --- | --- |
| Next.js · React | `tokens.css` + `shadcn.css` + Tailwind CSS v4 | shadcn/ui |
| 서버가 HTML을 만드는 웹 (Python: Django·Flask·FastAPI + Jinja, Java·Kotlin: Spring + Thymeleaf·JSP, Kotlin: Ktor + FreeMarker 등) | `tokens.css` + `components.css` + `js/components.js` | `storybook.html`의 `dw-*` 클래스 |
| 웹이 아닌 곳 (Android(Kotlin) · iOS · Flutter · JavaFX · PDF 리포트) | `tokens.json`의 값 | 각 플랫폼 방식으로 구현, 치수는 `components/<name>.md` |

어느 갈래든 색·간격·모서리는 토큰으로만 부른다(1장). 다크 모드는 `<html data-theme="dark">`이고, 속성이 없으면 OS 설정을 따른다(2.1).

### 14.1 Next.js · React — shadcn 우선

1. shadcn/ui를 설치하고 필요한 컴포넌트를 `npx shadcn add <name>`으로 가져온다. **컴포넌트 소스의 구조·변형 이름·색 클래스는 고치지 않는다.**
2. `design/tokens.css`와 `design/shadcn.css`를 프로젝트에 복사하고 전역 CSS에서 순서대로 불러온다.

```css
/* app/globals.css */
@import "./design/fonts/pretendard.css";
@import "tailwindcss";
@import "tw-animate-css";
@import "./design/tokens.css";   /* 값 */
@import "./design/shadcn.css";   /* shadcn 변수(--primary 등) → 역할 토큰 */
```

3. 다크 모드를 next-themes로 켜면 `<ThemeProvider attribute="data-theme">`로 둔다(`class` 방식이 아니다).
4. 색을 바꾸고 싶으면 컴포넌트나 `shadcn.css`가 아니라 `tokens.json`을 고치고 `tokens.css`를 다시 만든다.
5. shadcn에 없는 컴포넌트(Callout · Chip · Bottom Sheet 등)는 `components/<name>.md` 치수대로 Tailwind로 만들고, 색은 `bg-[var(--dw-bg-brand-solid)]`처럼 역할 토큰으로 부른다.

컨트롤 높이는 예외로 이 저장소의 `src/components/ui`에서 5장 스케일에 맞췄다. 프로젝트에서 shadcn을 새로 받았다면 Button·Input·Select·Toggle의 높이를 같은 값으로 맞춘다. 그 밖의 크기·변형은 명세와 조금 다를 수 있고, 차이는 Storybook 각 스토리 설명에 적었다.

### 14.2 서버 템플릿 웹 — CSS 파일 + 클래스

React 없이 HTML에 클래스만 붙이면 같은 모양이 된다. 다이얼로그 열고 닫기·포커스 이동 같은 동작은 `components.js`가 맡는다.

```html
<!-- base 템플릿 <head> (Jinja·Thymeleaf·JSP 공통) -->
<link rel="stylesheet" href="/design/fonts/pretendard.css">
<link rel="stylesheet" href="/design/tokens.css">
<link rel="stylesheet" href="/design/components.css">
<script src="/design/js/components.js" defer></script>
```

```html
<button class="dw-button dw-button--brand-solid dw-button--medium" type="button">저장</button>

<button class="dw-button dw-button--neutral-outline dw-button--medium" type="button" data-dw-open="confirm">삭제</button>
<!-- 다이얼로그 마크업은 storybook.html의 Dialog 예시를 그대로 복사한다 -->
```

- 있는 컴포넌트의 클래스 이름과 마크업 구조는 [`storybook.html`](storybook.html)에서 복사한다. 없는 컴포넌트는 프로젝트에서 토큰을 써서 만든다([README](README.md#사용-방법)).
- 동작 훅은 `data-dw="<name>"`(컴포넌트 루트), `data-dw-open="<id>"`(여는 버튼), `data-dw-close`(닫는 버튼)이다.
- 코드에서 열고 닫을 때는 `window.dw`의 `openModal`·`closeModal`·`showToast`를 쓴다.
- 폼은 `data-dw-validate`를 붙인다. 오류가 있으면 첫 오류로 포커스를 옮기고, 통과하면 그대로 제출한다. JS로 전송할 때는 `dw:form-valid`를 받는다([Form](components/form.md)).
- 입력하며 서버를 검색하는 선택 입력은 Combobox async를 쓴다. `data-dw-combobox-url`만 넣으면 화면 JS 없이 동작한다([Combobox](components/combobox.md)).
- 아이콘은 10장의 `icons/sprite.svg`를 쓴다.
- 화면 고유 레이아웃 CSS를 쓸 때도 값은 `var(--dw-spacing-x4)`처럼 토큰으로 부른다.

### 14.3 웹이 아닌 곳 — tokens.json

CSS를 쓸 수 없으므로 `tokens.json`을 읽어 각 플랫폼의 색·치수 정의로 옮긴다.

- 색은 `role.light`·`role.dark`의 역할 토큰 이름을 그대로 쓰고(`bgBrandSolid` 등), 값은 `{palette.<name>}` 참조를 풀어 넣는다. 색 값은 oklch라서 sRGB(HEX)로 변환해야 하는 플랫폼이 많다.
- 간격·모서리는 px 값을 플랫폼 단위(dp · pt)로, 글자 크기는 sp · pt로 1:1 옮긴다.
- 브레이크포인트는 창 너비 기준으로 같은 값을 쓴다. 쌓임 순서는 숫자가 아니라 앞뒤 순서를 따른다.
- 컴포넌트는 `components/<name>.md`의 Anatomy · Specification을 따라 만든다.

Kotlin은 화면이 어디에 뜨느냐로 갈린다. Spring·Ktor로 HTML을 만들면 14.2, Android 앱이면 이 절을 따른다. Jetpack Compose에서는 토큰을 이름 그대로 Kotlin 상수로 옮긴다.

```kotlin
// 이름은 역할 토큰 그대로, 값은 tokens.json을 sRGB로 변환한 것
object DwColors {
    val BgBrandSolid = Color(0xFFF18A00)
    val FgOnBrandSolid = Color(0xFF000000)
}
object DwSpacing { val X4 = 16.dp }
object DwRadius { val R2 = 8.dp }

Button(
    onClick = onSave,
    shape = RoundedCornerShape(DwRadius.R2),
    colors = ButtonDefaults.buttonColors(
        containerColor = DwColors.BgBrandSolid,
        contentColor = DwColors.FgOnBrandSolid,
    ),
) { Text("저장") }
```

라이트·다크 값이 다른 토큰은 두 벌로 두고 `isSystemInDarkTheme()`으로 고른다.

## 15. CI

회사 로고 파일은 [`brand/`](brand/)에 있다. 카탈로그의 [CI](storybook.html#ci)에서 볼 수 있다.

| 파일 | 쓰는 곳 |
| --- | --- |
| `ci-kor.svg` · `ci-kor.png` | 국문, 밝은 배경 |
| `ci-kor-on-dark.svg` · `ci-kor-on-dark.png` | 국문, 어두운 배경. 엠블럼은 오렌지, 글자는 흰색 |
| `ci-en.svg` | 영문, 밝은 배경 |
| `ci-en-on-dark.svg` | 영문, 어두운 배경. 엠블럼은 오렌지, 글자는 흰색 |
| `emblem.svg` · `emblem.png` | 좁은 자리. 앱 아이콘, 파비콘 후보 |
| `ci-kor.ai` | 국문 원본. 인쇄와 디자인 작업 |

- 색과 비율을 바꾸거나 다시 그리지 않는다. 흰색 단색 로고는 공식 파일이 아니므로 쓰지 않는다.
- 다크 모드를 지원하는 화면은 테마에 맞춰 파일을 바꾼다.
- 국문 SVG는 원본 `ci-kor.ai`의 벡터를 여백만 잘라 옮긴 것이다. 영문 SVG는 회사 홈페이지의 공개 파일이고, `ci-en-on-dark.svg`는 그 파일의 글자색만 국문 어두운 배경용과 같은 흰색으로 바꾼 것이다. 공식 파일이 나오면 교체한다. 국문 로고의 오렌지는 `#F28B00`이고 UI 토큰 `#F18A00`과 조금 다르다. 로고 파일의 색을 토큰에 맞추지 않는다.
- 최소 크기와 보호 여백은 회사 CI 가이드를 따른다.
