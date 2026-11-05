# Filter Tags

> 클래스 `.dw-filter-tags` · 레퍼런스 [storybook.html#filter-tags](../storybook.html#filter-tags)

## 개요

조건 시트에서 건 조건을 필터 줄 바로 아래에 지우기 아이콘이 있는 [Chip](chip.md)으로 보이는 줄이다. 조건을 하나씩 해제할 수 있다. 배치는 [ux-guideline.md 5.3](../guides/ux-guideline.md#53-조건-줄)을 따른다.
**쓰지 말 것** — 필터 줄에 이미 보이는 기간·범위·검색어, 조건을 고르는 용도(Chip).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-filter-tags` | ✓ | `<ul aria-label="적용된 조회 조건">` |
| Item | `<li>` | ✓ | |
| Tag | `.dw-chip.dw-chip--outline-weak.dw-chip--small` | ✓ | `<button>`, 전체가 지우기 버튼. `data-key`에 조건 이름 |
| Label | `.dw-chip__label` | ✓ | `조건: 값` |
| Icon | `.dw-chip__icon` | ✓ | 뒤쪽 `x` |

```html
<ul class="dw-filter-tags" aria-label="적용된 조회 조건" data-dw-filter-for="order-filter" data-dw-focus-to="order-filter-open">
  <li>
    <button type="button" class="dw-chip dw-chip--outline-weak dw-chip--small" data-key="status" aria-label="주문 상태: 배송 중 조건 지우기">
      <span class="dw-chip__label">주문 상태: 배송 중</span>
      <svg class="dw-chip__icon" aria-hidden="true"><use href="#i-x"/></svg>
    </button>
  </li>
</ul>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| items | 조건 이름 + 값의 목록 | 없음 | `<li>` 한 개씩. 비면 Root `hidden` |
| focus target | 요소 id | 없음 | `data-dw-focus-to`, 마지막 태그를 지운 뒤 포커스를 받는다 |
| sheet | 요소 id | 없음 | `data-dw-filter-for`, 연결된 [Filter Sheet](filter-sheet.md) |

## Specification

Tag의 크기·색·상태는 [Chip](chip.md) `outline-weak` · `small`을 따른다.

| 항목 | 값 |
| --- | --- |
| Root | 가로 배치 `flex-wrap: wrap`, 가로 gap 8px `x2`, 세로 gap 12px `x3`, 목록 표시 없음 |
| Tag | 최대 너비 100% |
| Label | 한 줄 말줄임(`text-overflow: ellipsis`) |
| Icon | 14px, 줄어들지 않음 |

세로 gap이 12px인 이유는 터치 히트 영역 44px이 윗줄과 겹치지 않게 하기 위해서다.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Empty | 걸린 조건 없음 | 줄 자체가 없다. 자리표시 문구도 없다 | |
| Hover · Pressed · Focus-visible | | [Chip](chip.md)과 같다 | |
| Removed | Tag 클릭·Enter·Space | 그 조건만 풀고 즉시 다시 조회한다 | |

## Behavior & Accessibility

- 해제는 한 번에 끝나는 명시적 행동이므로 바로 조회한다([interaction.md 11장](../guides/interaction.md#11-목록-검색필터)).
- `aria-label`은 보이는 글자를 그대로 포함한다: `<조건>: <값> 조건 지우기`. 말줄임으로 잘린 값도 이름에는 전부 넣는다.
- 지운 뒤 포커스는 다음 Tag로, 없으면 이전 Tag로, 마지막이었으면 `data-dw-focus-to` 요소(Filter Button)로 옮긴다. 포커스가 사라지지 않게 한다.
- 레퍼런스는 지울 때 Root에서 `dw-filter-remove` 이벤트(`detail.key`)를 낸다.

| 키 | 동작 |
| --- | --- |
| Tab | 다음 Tag |
| Enter · Space | 그 조건 지우기 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 모든 너비 | 넘치면 다음 줄로 내려간다. 가로 스크롤을 쓰지 않는다 |
| < 640px | 긴 값은 한 Tag가 줄을 다 쓰고 말줄임된다 |

## Do / Don't

- **Do** 문구는 `조건: 값` 형식으로 쓴다.
- **Do** 조건 수는 [Filter Button](filter-button.md)의 숫자와 항상 같게 둔다.
- **Don't** `전체` 같은 기본값을 태그로 보이지 않는다.
- **Don't** 지울 때 확인을 묻지 않는다. 다시 걸면 된다.
