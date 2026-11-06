# Timeline

> 클래스 `.dw-timeline` · 레퍼런스 [catalog.html#timeline](../catalog.html#timeline)

## 개요

시간순으로 일어나는 일을 세로로 보여 준다. 하루 일정, 배송 이력, 문서 처리 이력에 쓴다.
**쓰지 말 것** — 시간이 없는 단순 목록(List), 사용자가 밟아 가는 다단계 입력, 달력처럼 시간 칸에 맞춰 봐야 하는 일정.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-timeline` | ✓ | `<ol>` |
| Item | `.dw-timeline__item` | ✓ | `<li>`, 진행 중이면 `aria-current="true"` |
| Time | `.dw-timeline__time` | ✓ | 시간 문구 |
| Marker | `.dw-timeline__marker` | ✓ | `aria-hidden="true"`, 점과 선을 담는다 |
| Dot | `.dw-timeline__dot` | ✓ | |
| Line | `.dw-timeline__line` | ✓ | 마지막 항목에서는 보이지 않는다 |
| Content | `.dw-timeline__content` | ✓ | |
| Title | `.dw-timeline__title` | ✓ | |
| Description | `.dw-timeline__description` | | |

```html
<ol class="dw-timeline">
  <li class="dw-timeline__item" aria-current="true">
    <div class="dw-timeline__time">13:00</div>
    <div class="dw-timeline__marker" aria-hidden="true">
      <span class="dw-timeline__dot"></span><span class="dw-timeline__line"></span>
    </div>
    <div class="dw-timeline__content">
      <div class="dw-timeline__title">상품 포장</div>
      <div class="dw-timeline__description">서울 물류센터</div>
    </div>
  </li>
</ol>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| time | 문자열 | — | Time |
| title | 문자열 | — | Title |
| description | 문자열 | 없음 | Description |
| active | boolean | false | Item `aria-current="true"` |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | 3칸 그리드 `minmax(48px, max-content)` · 14px `x3_5` · `minmax(0, 1fr)`, 칸 gap 12px `x3` |
| Item | `grid-template-columns: subgrid`로 Root의 칸을 그대로 쓴다 |
| Time | t2 12/16, `fg-neutral-subtle`, `tabular-nums`, 오른쪽 정렬, 줄바꿈 없음, 위 padding 2px `x0_5` |
| Dot | 10px `x2_5` 원, `stroke-neutral-weak`, 위 4px `x1`, 아래 2px `x0_5` |
| Line | 너비 1px, 남은 높이를 채움, `stroke-neutral-muted` |
| Content | 아래 padding 20px `x5`, 마지막 항목 0 |
| Title | t4 14/19 medium, `fg-neutral` |
| Description | t4 14/19, `fg-neutral-subtle` |
| active Dot | bg `bg-brand-solid`, 바깥 2px `bg-brand-weak` 테두리 |
| active Title | bold |

시간 칸은 가장 긴 Time에 맞추며 모든 항목이 같은 폭을 쓴다.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Default | — | 회색 점 | |
| Active | 진행 중인 항목 | 위 active 값, `aria-current="true"` | |

## Behavior & Accessibility

- 순서가 뜻을 가지므로 `<ol>`을 쓴다.
- 자체 동작이 없다.
- 진행 중 표시는 색 하나로 알리지 않는다. 점 테두리와 제목 굵기가 함께 바뀌고 `aria-current`로 전달한다.
- 진행 중 항목은 한 Timeline에 하나만 둔다.
- Marker는 장식이라 `aria-hidden="true"`다.

| 키 | 동작 |
| --- | --- |
| Tab | 포커스를 받지 않는다. Content 안 링크만 받는다 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 모든 너비 | 같은 3칸이다. 긴 Title·Description은 내용 칸 안에서 줄을 바꾼다 |
| < 640px | 칸이 좁으면 Time을 `13:00`처럼 짧은 형식으로 쓴다 |

## Do / Don't

- **Do** 시간 형식을 한 Timeline 안에서 맞춘다.
- **Do** 위에서 아래로 시간이 흐르게 둔다.
- **Don't** 항목에 버튼을 많이 넣지 않는다. 상세는 링크로 넘긴다.
- **Don't** Line 색으로 상태를 나타내지 않는다.
