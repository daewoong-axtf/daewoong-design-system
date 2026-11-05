# Chip

> 클래스 `.dw-chip` · 레퍼런스 [storybook.html#chip](../storybook.html#chip)

## 개요

목록을 거르거나(필터), 여러 짧은 보기 중 고르거나(토글), 짧은 행동을 실행하는 작은 알약 모양 버튼이다.
**쓰지 말 것** — 상태 표시만 하는 라벨(Badge), 화면의 주된 행동(Button).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-chip` | ✓ | `<button>`. 토글이면 `aria-pressed` |
| Prefix icon | `.dw-chip__icon` (앞) | | |
| Label | `.dw-chip__label` | ✓(icon-only 제외) | |
| Suffix icon | `.dw-chip__icon` (뒤) | | 드롭다운 ▾, 지우기 X 등 |

```html
<button type="button" class="dw-chip dw-chip--outline-weak" aria-pressed="false">
  <span class="dw-chip__label">최신순</span>
</button>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| variant | `solid` · `outline-strong` · `outline-weak` | `solid` | `.dw-chip--<variant>` |
| size | `small` · `medium` · `large` | `medium` | `.dw-chip--<size>` |
| layout | `with-text` · `icon-only` | `with-text` | `.dw-chip--icon-only` |
| selected | boolean | false | `aria-pressed="true"` (또는 radio·checkbox 역할이면 `aria-checked`) |
| disabled | boolean | false | `disabled` |

## Specification

| size | height | padding-inline | min-width (텍스트 / 아이콘만) | 아이콘 | font |
| --- | --- | --- | --- | --- | --- |
| `small` | 32px | 6px `x1_5` | 44px / 32px | 14px | t4 14/19 medium |
| `medium` | 36px | 8px `x2` | 48px / 36px | 16px (뒤 아이콘 14px) | t4 14/19 medium |
| `large` | 40px | 10px `x2_5` | 52px / 40px | 16px | t4 14/19 medium |

- 모서리 `radius-full`, 라벨 좌우 padding 6px `x1_5`, 앞 아이콘 왼쪽·뒤 아이콘 오른쪽 padding 6px `x1_5`.
- 칩 사이 간격 8px(`spacing-x-between-chips`).

| variant | 상태 | bg | 테두리(inset box-shadow) | 글자·아이콘 |
| --- | --- | --- | --- | --- |
| `solid` | 기본 | `bg-neutral-weak-alpha` | — | `fg-neutral` |
| | hover | `bg-neutral-weak-alpha-pressed` | — | |
| | 선택 | `bg-neutral-solid` | — | `fg-on-neutral-solid` |
| | 선택 hover | `bg-neutral-solid-pressed` | — | |
| `outline-strong` | 기본 | `bg-transparent` | 1px `stroke-neutral-muted` | `fg-neutral` |
| | hover | `bg-transparent-pressed` | | |
| | 선택 | `bg-neutral-solid` | — | `fg-on-neutral-solid` |
| | 선택 hover | `bg-neutral-solid-pressed` | — | |
| `outline-weak` | 기본 | `bg-transparent` | 1px `stroke-neutral-muted` | `fg-neutral` |
| | hover | `bg-transparent-pressed` | | |
| | 선택 | `bg-neutral-weak` | 1px `stroke-neutral-contrast` | `fg-neutral` |
| | 선택 hover | `bg-neutral-weak-pressed` | 1px `stroke-neutral-contrast` | |
| 모두 | disabled | 위 색 그대로 | | Root `opacity: 0.5` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | 정밀 포인터 | 위 hover 색 | `background-color` `duration-color-transition` `easing-easing` |
| Pressed | `:active` | 터치에선 hover 색, `scale-s95` | `duration-pressed-scale` |
| Focus-visible | 키보드 | `outline 2px stroke-focus-ring`, offset 2px | |
| Selected | 클릭 | 위 선택 색 | 색 전환 |
| Disabled | `disabled` | `opacity: 0.5`, `cursor: not-allowed` | |

## Behavior & Accessibility

- 필터·토글 칩: `<button aria-pressed>`. 하나만 고르는 칩 묶음이면 `role="radiogroup"` 안에 `role="radio" aria-checked`(키보드는 Radio와 같음).
- 실행 칩: 일반 `<button>`.
- 칩 묶음이 넘치면 가로 스크롤(`overflow-x: auto`, 스크롤바 숨김) — 줄바꿈하지 않는다.

| 키 | 동작 |
| --- | --- |
| Enter · Space | 선택 토글 / 실행 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 칩 묶음은 한 줄 가로 스크롤, 좌우 끝을 화면 여백(16px)까지 붙인다 |
| ≥ 768px | 줄바꿈 허용(`flex-wrap: wrap`, 세로 간격 8px) |

## Do / Don't

- **Do** 라벨은 1–2 단어.
- **Don't** 한 묶음에 variant를 섞지 않는다.
