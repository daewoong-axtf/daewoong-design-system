# Calendar

> 클래스 `.dw-calendar` · 레퍼런스 [catalog.html#calendar](../catalog.html#calendar)

## 개요

화면에 펴 두고 날짜 하나나 기간을 고르는 달력 면이다. 입력 칸에서 여는 형태는 [Date Picker](date-picker.md)가 이 달력을 품는다.
**쓰지 말 것** — 일정을 표시하는 월간·주간 화면(시간 격자, [ux-guideline 2.3](../guides/ux-guideline.md)), 생년월일처럼 먼 날짜를 바로 치는 편이 빠른 입력(Text Input).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-calendar` | ✓ | `data-dw="calendar"`, `role="group"` + `aria-label` |
| Header | `.dw-calendar__header` | ✓ | 이전·제목·다음 |
| Nav | `.dw-calendar__nav` | ✓ | `chevron-left`·`chevron-right` |
| Title | `.dw-calendar__title` | ✓ | "2026년 5월", `aria-live="polite"` |
| Selects · Select | `.dw-calendar__selects` · `.dw-calendar__select` | | 연·월 드롭다운(`data-caption="dropdown"`). 네이티브 select |
| Grid | `.dw-calendar__grid` | ✓ | `<table role="grid">` |
| Weekday | `.dw-calendar__weekday` | ✓ | `<th scope="col" abbr="일요일">` |
| Cell | `.dw-calendar__cell` | ✓ | `<td role="gridcell" aria-selected>` |
| Day | `.dw-calendar__day` | ✓ | `<button>` |

서버는 Root와 hidden input만 그린다. Header와 Grid는 `js/components.js`가 만든다. 아이콘은 스프라이트의 `#i-chevron-left`·`#i-chevron-right`를 쓴다.

```html
<!-- 단일 -->
<div class="dw-calendar" role="group" aria-label="주문 날짜" data-dw="calendar" data-value="2026-05-20">
  <input type="hidden" name="order-date" value="2026-05-20" data-dw-calendar-field="value">
</div>

<!-- 범위 -->
<div class="dw-calendar" role="group" aria-label="배송 기간" data-dw="calendar" data-mode="range"
     data-start="2026-05-18" data-end="2026-05-27" data-min="2026-05-13">
  <input type="hidden" name="ship-start" value="2026-05-18" data-dw-calendar-field="start">
  <input type="hidden" name="ship-end" value="2026-05-27" data-dw-calendar-field="end">
</div>
```

JS가 만드는 칸은 아래 모양이다. 다른 언어로 옮길 때 같은 구조를 그린다.

```html
<td class="dw-calendar__cell" role="gridcell" aria-selected="true">
  <button type="button" class="dw-calendar__day" data-date="2026-05-20" tabindex="0">
    <span class="dw-visually-hidden">2026년 5월 20일 수요일</span>
    <span aria-hidden="true">20</span>
  </button>
</td>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| mode | `single` · `range` | `single` | `data-mode` |
| value | yyyy-mm-dd | 없음 | `data-value` (single) |
| start · end | yyyy-mm-dd | 없음 | `data-start` · `data-end` (range) |
| min · max | yyyy-mm-dd | 없음 | `data-min` · `data-max`. 범위 밖 날짜는 비활성 |
| month | yyyy-mm | 고른 달, 없으면 오늘 달 | `data-month` (처음 보일 달) |
| caption | `label` · `dropdown` | `label` | `data-caption` |
| week start | 0(일)–6(토) | 0 | `data-week-start` |
| locale | BCP 47 | `<html lang>`, 없으면 `ko-KR` | `data-locale` |
| today | yyyy-mm-dd | 브라우저 날짜 | `data-today`. 서버 기준 날짜가 따로 있을 때 준다 |
| 문구 | 문자열 | `이전 달`·`다음 달`·`연도`·`월` | `data-label-prev`·`-next`·`-year`·`-month` |

값이 바뀌면 hidden input이 `change`를 내고, Root가 `dw:calendar-change`를 낸다. `detail`은 single이 `{ value }`, range가 `{ start, end }`다. 날짜 글자는 전부 `Intl.DateTimeFormat`으로 만든다.

## Specification

| 항목 | 값 |
| --- | --- |
| 폭 | 7 × 칸 + 좌우 padding. 부모보다 넓어지지 않는다 |
| 칸 | 40px `x10`. 768px 미만·터치는 44px |
| 주 | 항상 6줄. 달을 옮겨도 높이가 변하지 않는다 |
| Root | padding 12px `x3`, radius 20px `r5`, gap 8px `x2`, bg `bg-layer-default`, 테두리 `inset 0 0 0 1px stroke-neutral-muted` |
| Title | t5 16/22 bold, `fg-neutral`, 고정폭 숫자 |
| Nav | 칸과 같은 크기, radius 12px `r3`, 아이콘 18px `fg-neutral-muted` |
| Weekday | 높이 32px `x8`, t2 12/16, `fg-neutral-subtle` |
| Day | t4 14/19, radius 12px `r3` |

### 색

| 상태 | bg | fg | 그 밖의 표시 |
| --- | --- | --- | --- |
| 기본 | `bg-transparent` | `fg-neutral` | |
| 다른 달 | `bg-transparent` | `fg-neutral-subtle` | |
| 오늘 | `bg-transparent` | `fg-neutral` | bold + 아래 4px 점(`currentColor`), `aria-current="date"` |
| 선택 | `bg-brand-solid` | `fg-on-brand-solid` | bold |
| 범위 가운데 | 칸 뒤 띠 `bg-brand-weak` | `fg-neutral` | 시작·끝 칸은 안쪽 절반에만 띠, 줄 양 끝은 radius `r3` |
| 비활성 | `bg-transparent` | `fg-disabled` | 취소선, `aria-disabled="true"` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| hover | 포인터 | bg `bg-transparent-pressed`, 선택 칸은 `bg-brand-solid-pressed` | `duration-color-transition` |
| pressed | 누름 | hover와 같은 면, scale `s95` | `duration-pressed-scale` |
| focus-visible | 키보드 | outline 2px `stroke-focus-ring`, 안쪽 offset | `duration-d3` |
| 범위 시작만 고름 | 첫 클릭 | 그 칸만 선택 | |
| 범위 완성 | 다음 클릭 | 앞선 날이면 둘을 바꿔 시작·끝으로 삼는다. 완성된 뒤 다시 누르면 새 시작이다 | |

## Behavior & Accessibility

WAI-ARIA APG **Date Grid** 패턴.

- Tab은 칸 하나에만 멈춘다. 고른 날 → 오늘 → 그 달 1일 순으로 정하고 나머지 칸은 `tabindex="-1"`이다.
- 칸의 이름은 `aria-label`이 아니라 내용으로 준다. 보이는 숫자 "20"이 이름 "2026년 5월 20일 수요일"의 낱말과 맞지 않아 음성 입력이 칸을 찾지 못하기 때문이다.
- 비활성 칸도 방향키로 지나갈 수 있게 `disabled`가 아니라 `aria-disabled`를 쓴다. `min`·`max` 밖으로는 커서가 나가지 않는다.
- 다른 달 칸을 고르면 그 달로 넘어간다. 달이 바뀌어도 포커스는 칸에 남는다.
- 달 끝에서는 Nav도 `aria-disabled="true"`가 된다. 포커스를 잃지 않게 `disabled`를 쓰지 않는다.
- 폼 reset은 처음 값으로 되돌린다.
- 페이지가 뜰 때 문서에 있는 달력을 그린다. 그 뒤에 넣는 단독 달력은 지원하지 않는다. Date Picker 안의 달력은 열 때마다 그린다.

| 키 | 동작 |
| --- | --- |
| ← → ↑ ↓ | 하루·한 주 이동, 달을 넘으면 그 달로 |
| Home / End | 그 주의 처음/끝 |
| PageUp / PageDown | 이전/다음 달 같은 날 (없으면 말일) |
| Shift + PageUp / PageDown | 이전/다음 해 |
| Enter · Space | 그 날 선택 |
| Tab | 칸에서 다음 요소로. 팝업·모달 안에서는 그 안에서 돈다 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px · 터치 | 칸 44px. 폭 332px |
| 320–359px | 칸 폭이 부모에 맞춰 줄고 높이는 44px을 지킨다 |

## Do / Don't

- **Do** 고를 수 없는 날은 숨기지 말고 비활성으로 둔다.
- **Do** 서버 시간대가 기준이면 `data-today`를 준다.
- **Don't** 날짜 문자열을 이어 붙이지 않는다. `Intl`로 만든다.
- **Don't** 휴일·상태를 색 하나로만 알리지 않는다.
