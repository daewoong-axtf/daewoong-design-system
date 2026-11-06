# Table

> 클래스 `.dw-table` · 레퍼런스 [catalog.html#table](../catalog.html#table)

## 개요

같은 속성을 가진 여러 행을 비교하며 보는 데이터 표다(관리 화면 목록).
**쓰지 말 것** — 레이아웃 정렬 용도, 속성이 1–2개뿐인 목록(List).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Wrapper | `.dw-table-wrap` | ✓ | 가로 스크롤 영역, `tabindex="0"` + `role="region"` + `aria-label` |
| Root | `.dw-table` | ✓ | `<table>` |
| Caption | `.dw-table__caption` | | `<caption>` (시각적으로 숨겨도 됨) |
| Head cell | `.dw-table__head` | ✓ | `<th scope="col">` |
| Row | `.dw-table__row` | ✓ | `<tr>` |
| Cell | `.dw-table__cell` | ✓ | `<td>` |
| Empty | `.dw-table__empty` | | 데이터 없음 행 — [Empty State](empty-state.md) |

```html
<div class="dw-table-wrap" role="region" aria-label="회원 목록" tabindex="0">
  <table class="dw-table">
    <caption class="dw-visually-hidden">회원 목록</caption>
    <thead><tr><th class="dw-table__head" scope="col">이름</th><th class="dw-table__head dw-table__head--num" scope="col">이용 횟수</th></tr></thead>
    <tbody><tr class="dw-table__row"><td class="dw-table__cell">홍길동</td><td class="dw-table__cell dw-table__cell--num">12</td></tr></tbody>
  </table>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| density | `medium` · `compact` | `medium` | `.dw-table--compact` |
| 숫자 열 | — | — | `--num` (오른쪽 정렬, `font-variant-numeric: tabular-nums`) |
| row interactive | boolean | false | 행 클릭으로 상세 열기 |
| row selected | boolean | false | `aria-selected="true"` |
| sortable 열 | `none` · `ascending` · `descending` | — | `<th aria-sort>` + 안의 `<button>` |

## Specification

| 항목 | medium | compact |
| --- | --- | --- |
| Head 높이 | 44px | 36px |
| Row 높이(최소) | 52px | 40px |
| 셀 padding 좌우 | 16px `x4` | 12px `x3` |
| Head font | t3 13/18 medium, `fg-neutral-subtle` | 같음 |
| Cell font | t4 14/19 regular, `fg-neutral` | 같음 |

| 항목 | 값 |
| --- | --- |
| Root | 너비 100%, `border-collapse: separate; border-spacing: 0`, 셀 `vertical-align: middle` |
| Head 배경 | `bg-neutral-weak-alpha`, 아래 1px `stroke-neutral-muted` |
| Row 구분선 | 각 행 아래 1px `stroke-neutral-subtle` |
| Wrapper | `overflow-x: auto`, 테두리 `inset 0 0 0 1px stroke-neutral-muted`, radius 12px `r3`(모서리 셀도 잘리게 `overflow: hidden` 보장) |
| hover (interactive) | 행 bg `bg-transparent-pressed`, `cursor: pointer` |
| selected | 행 bg `bg-brand-weak` |
| 정렬 버튼 | Head 텍스트 + 12px `chevron-up`/`chevron-down`(현재 정렬 방향만 `fg-neutral`, 아니면 `fg-placeholder`) |
| 첫 열 고정(선택) | `position: sticky; left: 0`, bg `bg-layer-default`, 가로 스크롤 시 오른쪽 그림자 `shadow-s1` |

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Hover | interactive 행 | 위 hover 색, `duration-color-transition` |
| Focus-visible | 행 안의 링크·버튼 | 해당 요소 포커스 링 |
| Loading | 데이터 요청 | 행 자리에 [Skeleton](skeleton.md) 5행 |
| Empty | 결과 0건 | 열 전체를 합친 한 셀에 Empty State |

## Behavior & Accessibility

- 진짜 `<table>`을 쓴다(`<div>` 그리드 금지). `<th scope="col">`, 행 머리가 있으면 `<th scope="row">`.
- 행 클릭 상세는 **행 안의 주 링크(대개 이름 셀)** 를 실제 `<a>`/`<button>`으로 두고, 행 클릭은 그 링크를 누른 것과 같게 한다 — 키보드는 그 링크로 접근.
- 정렬: `<th aria-sort>` 안의 `<button>`이 토글한다(none → ascending → descending).
- 가로 스크롤 Wrapper는 키보드로 스크롤할 수 있게 `tabindex="0"`.
- 페이지 이동은 [Pagination](pagination.md), 총 건수는 표 위나 아래에 텍스트로.

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 열이 4개 이하면 가로 스크롤 유지, 그보다 많으면 행마다 [Card](card.md)로 바꿔 "라벨: 값" 세로 목록 |
| ≥ 768px | 표 |

## Do / Don't

- **Do** 숫자·날짜 열은 오른쪽 정렬, 글자 열은 왼쪽 정렬.
- **Don't** 셀 안 텍스트를 여러 줄로 길게 쓰지 않는다 — 말줄임 후 상세에서.
