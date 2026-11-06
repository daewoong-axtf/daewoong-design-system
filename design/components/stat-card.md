# Stat Card

> 클래스 `.dw-stat-card` · 레퍼런스 [catalog.html#stat-card](../catalog.html#stat-card)

## 개요

대시보드에서 지표 하나를 이름·값·증감으로 보여 주는 칸이다. [Card](card.md) 위에 만들고 Card Group으로 나열한다.
**쓰지 말 것** — 여러 값을 비교하는 자리(Table·차트), 값이 없는 안내(Callout).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-stat-card` | ✓ | `.dw-card`에 더한다 |
| Label | `.dw-stat-card__label` | ✓ | 지표 이름 |
| Icon | `.dw-stat-card__icon` | | Label 앞 16px |
| Value | `.dw-stat-card__value` | ✓ | 이미 형식을 맞춘 문자열 |
| Meta | `.dw-stat-card__meta` | | Delta + Hint 줄 |
| Delta | `.dw-stat-card__delta` | | 증감 아이콘 + 숨김 문구 + 값 |
| Hint | `.dw-stat-card__hint` | | 기간 등 보조 설명 |

```html
<div class="dw-card dw-stat-card">
  <p class="dw-stat-card__label">신규 회원</p>
  <p class="dw-stat-card__value">1,284명</p>
  <p class="dw-stat-card__meta">
    <span class="dw-stat-card__delta dw-stat-card__delta--positive">
      <svg aria-hidden="true">…trending-up…</svg><span class="dw-visually-hidden">증가</span>+12%
    </span>
    <span class="dw-stat-card__hint">지난달 대비</span>
  </p>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| delta | 숫자(%) | 없음 | 양수 `trending-up` `+N%`, 음수 `trending-down` `-N%`, 0 `minus` `0%` |
| tone | `positive` · `critical` · `neutral` | 양수 `positive`, 음수 `critical`, 0 `neutral` | `.dw-stat-card__delta--<tone>` |
| card variant | [Card](card.md)의 variant | `outline` | `.dw-card--<variant>` |
| interactive | boolean | false | Root가 `<a>` ([Card](card.md)) |

## Specification

Root의 모양·padding은 [Card](card.md)를 따른다. 세로 gap만 4px `x1`로 줄인다.

| 항목 | 값 |
| --- | --- |
| Label | t4 14/19, `fg-neutral-subtle`, gap 6px `x1_5` |
| Icon | 16px `x4` |
| Value | t9 24/32 bold, `fg-neutral`, `tabular-nums` |
| Meta | t4 14/19, 줄바꿈 허용, 가로 gap 8px `x2`, 세로 gap 2px `x0_5` |
| Delta | medium, `tabular-nums`, gap 2px `x0_5`, 아이콘 16px `x4` |
| Delta `positive` | `fg-positive` |
| Delta `critical` | `fg-critical` |
| Delta `neutral` | `fg-neutral-subtle` |
| Hint | `fg-neutral-subtle` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Default | — | 값 표시 | |
| Loading | 조회 중 | 같은 크기의 [Skeleton](skeleton.md) | |
| Hover · Pressed · Focus-visible | interactive | [Card](card.md)와 같다 | |

## Behavior & Accessibility

- 자체 동작이 없다.
- 증감은 색 하나로 알리지 않는다. 아이콘 방향, 부호, 숨김 문구(`증가`·`감소`·`변동 없음`)를 함께 둔다.
- `tone`은 지표의 좋고 나쁨이다. 줄수록 좋은 지표(반품, 오류)는 음수에 `positive`를 준다. 아이콘 방향은 값의 부호를 따른다.
- Label이 먼저 읽히도록 DOM 순서는 Label → Value → Meta다.

| 키 | 동작 |
| --- | --- |
| Tab | interactive일 때만 포커스를 받는다 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 640px | Card Group이 한 줄에 하나. Card padding 16px |
| ≥ 640px | Card Group이 2열 |
| ≥ 1024px | Card Group의 `--dw-card-group-columns` 열 |

## Do / Don't

- **Do** 값에 단위를 붙여 형식을 맞춘 문자열로 넘긴다.
- **Do** Delta 옆 Hint에 비교 기준을 적는다.
- **Don't** Stat Card 안에 버튼을 넣지 않는다.
- **Don't** 증감을 색으로만 구분하지 않는다.
