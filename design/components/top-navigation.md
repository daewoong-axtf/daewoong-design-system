# Top Navigation (App Bar)

> 클래스 `.dw-topbar` · 레퍼런스 [storybook.html#top-navigation](../storybook.html#top-navigation)

## 개요

화면 맨 위에 고정되는 막대다. 왼쪽(뒤로가기·메뉴·로고), 가운데/왼쪽 제목, 오른쪽 행동 아이콘으로 구성된다.
**쓰지 말 것** — 콘텐츠 안의 섹션 제목(그냥 heading).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-topbar` | ✓ | `<header>` |
| Left | `.dw-topbar__left` | | 뒤로가기(`chevron-left`)·메뉴(`menu`)·로고 |
| Title | `.dw-topbar__title` | | 화면 제목 `<h1>` |
| Subtitle | `.dw-topbar__subtitle` | | |
| Right | `.dw-topbar__right` | | 아이콘 버튼·텍스트 버튼 |
| Icon button | `.dw-topbar__icon-button` | | 24px 아이콘, 히트 44px |
| Text button | `.dw-topbar__text-button` | | |

```html
<header class="dw-topbar">
  <div class="dw-topbar__left">
    <button type="button" class="dw-topbar__icon-button" aria-label="뒤로 가기">…chevron-left…</button>
  </div>
  <h1 class="dw-topbar__title">주문 상세</h1>
  <div class="dw-topbar__right">
    <button type="button" class="dw-topbar__icon-button" aria-label="더 보기">…ellipsis…</button>
  </div>
</header>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| title align | `center` · `left` | `center` (< 1024px), `left` (≥ 1024px) | `.dw-topbar--left` |
| tone | `layer` · `transparent` | `layer` | `.dw-topbar--transparent` (이미지 위) |
| divider | boolean | false | `.dw-topbar--divider` (아래 1px 선) |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | 높이 56px (+ safe-area-top), 좌우 padding 16px `x4`, `display: flex; align-items: center`, `position: sticky; top: 0; z-index: 10` |
| tone `layer` | bg `bg-layer-default` |
| tone `transparent` | 투명, 아이콘·글자 `static-white` |
| divider | 아래 `inset 0 -1px stroke-neutral-muted` |
| Title (단독) | t6 18/24 bold, `fg-neutral`, 한 줄 말줄임 |
| Title (Subtitle 있음) | t5 16/22 bold + Subtitle t2 12/16 regular `fg-neutral-subtle` |
| `center` | Title을 Root 정가운데 절대 배치, 좌우 끝 영역 중 넓은 쪽 폭만큼 양쪽 여백을 줘 겹치지 않게 |
| `left` | Title이 Left 다음에 이어 붙음, `flex: 1` |
| Icon button | 44×44px 히트, 아이콘 24px `fg-neutral`, radius 4px `r1`. 맨 끝 버튼은 바깥으로 −10px(아이콘이 16px 여백선에 맞도록) |
| Text button | 높이 44px, padding 0 10px, radius 8px `r2`, t5 16/22 bold `fg-neutral`, 최대 96px 말줄임, hover `bg-transparent-pressed` |
| Right | `margin-left: auto`, gap 0 |

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Hover | 버튼 + 정밀 포인터 | bg `bg-transparent-pressed` |
| Pressed | `:active` | `scale-s95` |
| Focus-visible | 키보드 | 버튼 안쪽 `outline 2px stroke-focus-ring`(offset −2px) |
| Scrolled | 콘텐츠가 위로 스크롤 | divider가 없던 경우 아래 선이 생김(`data-scrolled`) |

## Behavior & Accessibility

- `<header>` 안에 화면의 `<h1>` 하나.
- 아이콘 버튼은 모두 `aria-label`.
- 뒤로가기는 브라우저 이력 뒤로, 이력이 없으면 상위 화면으로.
- 데스크톱에서 [Side Navigation](side-navigation.md)과 함께 쓰면 메뉴 버튼은 숨긴다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1024px | 제목 가운데, Left에 `menu` 버튼(Side Navigation을 서랍으로 연다) |
| ≥ 1024px | 제목 왼쪽, 메뉴 버튼 숨김, 높이 64px, 좌우 padding 24px `x6` |

## Do / Don't

- **Do** 오른쪽 행동은 2개까지, 나머지는 `ellipsis` 메뉴로.
- **Don't** 제목을 두 줄로 쓰지 않는다.
