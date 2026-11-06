# Pagination

> 클래스 `.dw-pagination` · 레퍼런스 [catalog.html#pagination](../catalog.html#pagination)

## 개요

긴 목록·표를 페이지 단위로 나눠 이동한다. 관리 화면 표 아래에 둔다.
**쓰지 말 것** — 모바일 피드처럼 계속 이어 보는 목록(무한 스크롤·"더 보기" 버튼).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-pagination` | ✓ | `<nav aria-label="페이지">` |
| List | `.dw-pagination__list` | ✓ | `<ul>` |
| Prev · Next | `.dw-pagination__nav` | ✓ | `chevron-left` · `chevron-right` 버튼 |
| Page | `.dw-pagination__page` | ✓ | 숫자 `<a>`·`<button>`, 현재는 `aria-current="page"` |
| Ellipsis | `.dw-pagination__ellipsis` | | 생략 `…` (누를 수 없음) |

```html
<nav class="dw-pagination" aria-label="페이지">
  <ul class="dw-pagination__list">
    <li><a class="dw-pagination__nav" href="?page=1" aria-label="이전 페이지">…chevron-left…</a></li>
    <li><a class="dw-pagination__page" href="?page=1">1</a></li>
    <li><a class="dw-pagination__page" href="?page=2" aria-current="page">2</a></li>
    <li><span class="dw-pagination__ellipsis" aria-hidden="true">…</span></li>
    <li><a class="dw-pagination__page" href="?page=10">10</a></li>
    <li><a class="dw-pagination__nav" href="?page=3" aria-label="다음 페이지">…chevron-right…</a></li>
  </ul>
</nav>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| page · total | 숫자 | — | 현재 페이지, 전체 페이지 수 |
| siblings | 숫자 | 1 | 현재 페이지 양옆에 보일 숫자 수 |

## Specification

| 항목 | 값 |
| --- | --- |
| List | 가로, `align-items: center`, gap 4px `x1`, 가운데 정렬 |
| Page · Nav | 40×40px `x10`, radius 8px `r2`, 배경 투명 |
| Page 글자 | t4 14/19 bold, `fg-neutral`, `tabular-nums` |
| Nav 아이콘 | 16px `x4`, `fg-neutral` |
| hover | bg `bg-transparent-pressed` |
| 현재 페이지 | bg `bg-neutral-solid`, 글자 `fg-on-neutral-solid`, hover `bg-neutral-solid-pressed` |
| disabled (첫/끝의 Prev·Next) | 아이콘 `fg-disabled`, bg 없음, `cursor: not-allowed` |
| Ellipsis | 40×40px 칸, 글자 `fg-neutral-subtle` |

**보이는 숫자 규칙** (total ≤ 7이면 전부): 1, 마지막, 현재 ± siblings는 항상 보이고, 그 사이 끊긴 구간은 Ellipsis 하나로. 끊긴 구간이 숫자 1개뿐이면 Ellipsis 대신 그 숫자를 보인다. 보이는 칸 수는 항상 7개로 유지한다(1 2 3 4 5 … 10 / 1 … 4 5 6 … 10 / 1 … 6 7 8 9 10).

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | 정밀 포인터 | 위 hover 색 | `background-color` `duration-color-transition` |
| Pressed | `:active` | `scale-s97` | `duration-pressed-scale` |
| Focus-visible | 키보드 | `outline 2px stroke-focus-ring`, offset 2px | |
| Current | — | 위 현재 색 | |
| Disabled | 첫/끝 페이지 | Prev/Next 비활성(`aria-disabled="true"`, 링크면 href 제거) | |

## Behavior & Accessibility

- `<nav aria-label="페이지">`. 현재 페이지는 `aria-current="page"`.
- 숫자 링크에 문맥이 부족하면 `aria-label="3 페이지"`처럼 숫자를 낱말로 띄운다. Prev·Next는 반드시 `aria-label`. 비활성 Prev·Next는 `href`가 없으므로 `role="link"`를 함께 쓴다.
- 페이지는 URL 쿼리(`?page=`)에 반영해 새로고침·공유 시 유지한다. 페이지를 바꾸면 목록 맨 위로 스크롤하고 포커스는 목록 제목(또는 표)으로 옮긴다.
- 검색·필터를 바꾸면 페이지는 1로 돌아간다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 640px | siblings 0, 보이는 칸 5개(1 … 5 … 10). 칸 44×44px |
| ≥ 640px | siblings 1, 7칸, 40px |

## Do / Don't

- **Do** 표 아래 가운데에 두고, 총 건수는 별도로 보여준다.
- **Don't** total이 1이면 Pagination을 숨긴다.
