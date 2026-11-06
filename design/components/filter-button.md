# Filter Button

> 클래스 `.dw-filter-button` · 레퍼런스 [catalog.html#filter-button](../catalog.html#filter-button)

## 개요

조회 조건을 여는 라벨 없는 아이콘 버튼이다. 걸린 조건 수를 숫자로 함께 보여서 시트를 열지 않아도 조건이 걸려 있다는 사실을 알 수 있다. 배치는 [ux-guideline.md 5.2](../guides/ux-guideline.md#52-필터-줄)를 따른다.
**쓰지 말 것** — 조건이 3개 이하라 필터 줄에 다 놓을 수 있는 화면, 글자가 필요한 일반 행동(Button). 알림 수 표시로 쓰지 않는다.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-filter-button` | ✓ | [Button](button.md) `neutral-outline` · `medium` · `icon-only`에 더한다 |
| Icon | `.dw-button__icon` | ✓ | `list-filter` |
| Count | `.dw-filter-button__count` | | 걸린 조건 수는 `data-count`에 두고 `::after`로 보인다. 0이면 `hidden` |

```html
<button type="button" class="dw-button dw-button--neutral-outline dw-button--medium dw-button--icon-only dw-filter-button"
        aria-label="조회 조건 — 2개 적용됨" aria-haspopup="dialog" data-dw-open="order-filter">
  <svg class="dw-button__icon" aria-hidden="true"><use href="#i-list-filter"/></svg>
  <span class="dw-filter-button__count" data-count="2" aria-hidden="true"></span>
</button>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| count | 0 이상의 정수 | 0 | Count `data-count`·`hidden`, Root `aria-label` |

## Specification

Root의 크기·색·상태는 [Button](button.md)을 따른다. 높이 40px `x10`은 옆 Select·검색창의 `medium`과 같다.

| 항목 | 값 |
| --- | --- |
| Icon | 18px, `fg-neutral` |
| Count 위치 | Root 오른쪽 위 모서리에서 바깥으로 4px `x1` (`top`·`right` −4px) |
| Count 크기 | height 16px `x4`, min-width 16px `x4`, padding-inline 4px `x1`, radius `radius-full` |
| Count 글자 | t1 11/15 bold, `tabular-nums` |
| Count 색 | bg `bg-brand-solid`, 글자 `fg-on-brand-solid` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| 조건 없음 | count 0 | Count 없음, 이름 `조회 조건` | |
| 조건 있음 | count ≥ 1 | Count 표시, 이름 `조회 조건 — N개 적용됨` | |
| Hover · Pressed · Focus-visible | | [Button](button.md)과 같다 | |

## Behavior & Accessibility

- 접근 가능한 이름은 Root의 `aria-label`에 둔다. 숫자는 이름에 들어 있으므로 Count는 `aria-hidden="true"`다.
- 숫자를 글자 노드로 넣지 않는다. 이름의 낱말은 `2개`인데 보이는 글자가 `2`이면 axe `label-content-name-mismatch` 위반이 된다.
- 조건 수가 바뀌면 `aria-label`과 `data-count`를 함께 바꾼다.
- 시트를 열면 `aria-haspopup="dialog"`를 붙이고, 닫히면 포커스가 이 버튼으로 돌아온다.
- 숫자 표시는 [Badge](badge.md)를 쓰지 않는다. Count는 버튼에 붙는 조건 수 전용이다.
- Count는 `pointer-events: none`이라 눌러도 버튼이 눌린다.

| 키 | 동작 |
| --- | --- |
| Enter · Space | 조회 조건을 연다 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 모든 너비 | 같은 모양이다. 터치 기기에서 히트 영역은 [Button](button.md)의 규칙으로 44px까지 넓어진다 |
| < 768px | 필터 줄에 이 버튼과 조건 수만 남는다([ux-guideline.md 6.3](../guides/ux-guideline.md#63-필터)) |

## Do / Don't

- **Do** 시트 안에서 건 조건만 센다. 필터 줄에 보이는 기간·범위·검색어는 세지 않는다.
- **Do** [Filter Tags](filter-tags.md)를 필터 줄 아래에 함께 둔다.
- **Don't** 탭 목록(`tablist`)의 자식으로 넣지 않는다.
- **Don't** 조건이 없을 때 숫자 0을 보이지 않는다.
