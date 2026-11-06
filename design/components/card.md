# Card

> 클래스 `.dw-card` · 레퍼런스 [catalog.html#card](../catalog.html#card)

## 개요

관련된 정보를 한 덩어리로 묶는 상자다. 대시보드 요약, 목록의 카드형 표시(모바일 표 대체), 설정 묶음에 쓴다.
**쓰지 말 것** — 페이지 전체를 감싸는 틀(그냥 섹션), 안내 문구(Callout).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-card` | ✓ | `<section>`·`<article>`, 전체가 눌리면 `<a>` |
| Header | `.dw-card__header` | | Title + Description + 오른쪽 Action |
| Title | `.dw-card__title` | | |
| Description | `.dw-card__description` | | |
| Action | `.dw-card__action` | | 헤더 오른쪽 작은 버튼·링크 |
| Body | `.dw-card__body` | ✓ | |
| Footer | `.dw-card__footer` | | 버튼, 오른쪽 정렬 |

```html
<section class="dw-card" aria-labelledby="c1-title">
  <div class="dw-card__header">
    <h3 class="dw-card__title" id="c1-title">이번 달 이용</h3>
    <p class="dw-card__description">11월 1일–30일</p>
  </div>
  <div class="dw-card__body">…</div>
</section>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| variant | `outline` · `elevated` · `filled` · `brand-secondary` | `outline` | `.dw-card--<variant>` |
| interactive | boolean | false | Root가 `<a>`·`<button>` |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | radius 16px `r4`, padding 20px `x5`, 세로 배치 gap 16px `x4`, bg `bg-layer-default` |
| `outline` | 테두리 `inset 0 0 0 1px stroke-neutral-muted`, 그림자 `shadow-s1` |
| `elevated` | `shadow-s2`, 테두리 없음 |
| `filled` | bg `bg-neutral-weak`, 테두리 없음 |
| `brand-secondary` | bg `bg-brand-secondary-weak`, 테두리 없음, 글자 전체 `fg-brand-secondary-contrast`. 묶음을 색으로 나눌 때 쓴다 |
| Header | 가로 배치 `justify-content: space-between; align-items: flex-start`, gap 12px `x3` |
| Title | t6 18/24 bold, `fg-neutral` |
| Description | t4 14/19 regular, `fg-neutral-subtle`, Title 아래 4px `x1` |
| Footer | 가로 배치 `justify-content: flex-end`, gap 8px `x2` |
| interactive hover | `outline`·`elevated`는 bg `bg-layer-default-pressed`, `filled`는 `bg-neutral-weak-pressed`, `brand-<순위>`는 `bg-brand-<순위>-weak-pressed` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | interactive + 정밀 포인터 | 위 hover 색 | `background-color` `duration-color-transition` |
| Pressed | interactive `:active` | `scale-s98` | `duration-pressed-scale` |
| Focus-visible | interactive 키보드 | `outline 2px stroke-focus-ring`, offset 2px | |

## Behavior & Accessibility

- 제목이 있는 카드는 `aria-labelledby`로 Title과 연결한다. 제목 레벨은 페이지 구조에 맞춘다.
- interactive 카드 안에 다른 버튼·링크를 두지 않는다(중첩 상호작용 금지). 필요하면 카드는 비interactive로 두고 Title을 링크로 만든다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 640px | padding 16px `x4`, 카드 묶음은 1열 |
| 640–1023px | 2열 그리드, gap 16px |
| ≥ 1024px | 3–4열 그리드(콘텐츠에 맞게), gap 16px(`xl` 이상 24px) |

## Do / Don't

- **Do** 한 화면의 카드 variant는 하나로 통일.
- **Don't** 카드 안에 카드를 넣지 않는다.
