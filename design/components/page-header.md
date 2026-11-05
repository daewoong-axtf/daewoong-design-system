# Page Header

> 클래스 `.dw-page-header` · 레퍼런스 [storybook.html#page-header](../storybook.html#page-header)

## 개요

페이지 맨 위에서 제목·설명·주요 행동을 보여 주는 영역이다. 배치는 [ux-guideline.md 5.1](../guides/ux-guideline.md#51-제목-줄)을 따른다.
**쓰지 말 것** — 전역 메뉴(Top Navigation), 섹션 제목(Card Header), 한 페이지에 두 번.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-page-header` | ✓ | |
| Main | `.dw-page-header__main` | ✓ | 뒤로가기·제목·설명을 세로로 쌓는다 |
| Back | `.dw-page-header__back` | | `<a>`, `chevron-left` + 라벨 |
| Title | `.dw-page-header__title` | ✓ | `<h1>` |
| Description | `.dw-page-header__description` | | |
| Actions | `.dw-page-header__actions` | | 주요 버튼. 주된 행동이 가장 오른쪽 |

```html
<div class="dw-page-header">
  <div class="dw-page-header__main">
    <a class="dw-page-header__back" href="/orders"><svg aria-hidden="true">…chevron-left…</svg>주문 목록</a>
    <h1 class="dw-page-header__title">주문 관리</h1>
    <p class="dw-page-header__description">접수된 주문을 확인하고 처리해요.</p>
  </div>
  <div class="dw-page-header__actions">
    <button type="button" class="dw-button dw-button--neutral-weak dw-button--medium">내려받기</button>
    <button type="button" class="dw-button dw-button--brand-solid dw-button--medium">등록</button>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| title | 문자열 | — | Title |
| description | 문자열 | 없음 | Description |
| back | 주소 + 라벨 | 없음 | Back, 라벨 기본값 `뒤로` |
| actions | 버튼 | 없음 | Actions |
| hide title mobile | boolean | false | `.dw-page-header--hide-title-mobile` |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | 세로 배치, gap 12px `x3`. 768px 이상은 가로 배치 `justify-content: space-between`, 위 정렬, gap 16px `x4` |
| Main | 세로 배치, gap 4px `x1` |
| Back | t4 14/19, `fg-neutral-subtle`, gap 4px `x1`, 왼쪽 −4px, 아이콘 16px, 히트 높이 44px. hover·pressed `fg-neutral` |
| Title | t9 24/32 bold, `fg-neutral` |
| Description | t4 14/19 regular, `fg-neutral-subtle` |
| Actions (데스크톱) | 가로 배치, gap 8px `x2`, 줄어들지 않음 |
| Actions (모바일) | 화면 아래 고정, `z-raised`, padding 12px 16px, 아래 padding `max(12px, safe-area-bottom)`, bg `bg-layer-default`, 위쪽 1px `stroke-neutral-muted`, 버튼은 같은 너비로 채움 |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | Back + 정밀 포인터 | 글자 `fg-neutral` | `color` `duration-color-transition` |
| Pressed | Back `:active` | 글자 `fg-neutral` | |
| Focus-visible | Back 키보드 | `outline 2px stroke-focus-ring`, offset 2px | |

## Behavior & Accessibility

- Title은 페이지의 유일한 `<h1>`이다.
- 뒤로가기는 일반 링크다. 앱의 라우터를 쓰면 같은 클래스를 그 링크 요소에 준다.
- `hide title mobile`은 화면에서만 제목을 뺀다. 제목은 시각적으로 숨긴 상태로 접근성 트리와 문서 구조에 남고, 설명은 사라진다.
- Actions는 DOM이 한 벌이다. 위치만 CSS로 바꾸므로 같은 id가 두 벌 생기지 않는다. Tab 순서는 제목 바로 뒤다.
- 고정 바가 본문 마지막 줄을 덮지 않게 페이지 틀이 본문 아래에 바 높이만큼 여백을 둔다. 버튼 `medium` 기준 64px + safe-area-bottom이다.

| 키 | 동작 |
| --- | --- |
| Tab | Back → Actions 순서로 이동 |
| Enter | Back 이동 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 세로 배치. Actions는 화면 아래 고정 바, `hide title mobile`이면 제목·설명이 화면에서 빠지고 Back은 남는다 |
| ≥ 768px · 높이 > 500px | 가로 배치. Actions는 제목 오른쪽 |
| 높이 ≤ 500px 가로 화면 | 너비와 상관없이 모바일 배치 |

## Do / Don't

- **Do** [Top Navigation](top-navigation.md)이 같은 이름을 보여 주는 화면에서 `hide title mobile`을 켠다([ux-guideline.md 6.2](../guides/ux-guideline.md#62-상단)).
- **Do** 행동은 [내려받기] → [등록] 순으로 둔다.
- **Don't** 화면 이름이 다른 곳에 없는 화면에서 `hide title mobile`을 켜지 않는다.
- **Don't** 고정 바에 버튼을 세 개 넘게 넣지 않는다.
