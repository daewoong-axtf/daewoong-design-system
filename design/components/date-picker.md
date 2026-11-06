# Date Picker

> 클래스 `.dw-date-picker` · 레퍼런스 [catalog.html#date-picker](../catalog.html#date-picker)

## 개요

입력 칸을 눌러 [Calendar](calendar.md)를 열고 날짜 하나를 고른다. 브라우저마다 모양이 다른 `input[type=date]`를 대신한다. 라벨·오류는 [Field](field.md)로 붙인다.
**쓰지 말 것** — 기간 선택(화면에 펴 둔 Calendar `range`), 시간 선택([Time Select](time-select.md)·[Time Picker](time-picker.md)).

## Anatomy

겉모습은 [Select](select.md)의 Trigger, 팝업은 [Popover](popover.md)를 그대로 쓴다.

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-date-picker.dw-select` | ✓ | `data-dw="date-picker"`. `.dw-select--<size>`로 크기를 정한다 |
| Trigger | `.dw-select__trigger.dw-date-picker__trigger` | ✓ | `aria-haspopup="dialog"`, `data-dw-popover="<content id>"` |
| Icon | `.dw-date-picker__icon` | ✓ | `calendar` |
| Value | `.dw-select__value` | ✓ | 표기 문구 또는 placeholder(`data-placeholder`) |
| Clear | `.dw-date-picker__clear` | | `circle-x`. 값이 있을 때만 보인다 |
| Content | `.dw-popover.dw-date-picker__content` | ✓ | `role="dialog"` + `aria-label` |
| Calendar | `.dw-calendar` | ✓ | hidden input을 두지 않는다 |
| Input | `input[type="hidden"]` | ✓ | Root 바로 아래. 제출 값이자 처음 값의 정본 |

```html
<div class="dw-date-picker dw-select dw-select--responsive" data-dw="date-picker">
  <button type="button" class="dw-select__trigger dw-date-picker__trigger" aria-haspopup="dialog" aria-expanded="false"
          aria-controls="ship-pop" aria-labelledby="ship-label ship-value" data-dw-popover="ship-pop">
    <svg class="dw-date-picker__icon" aria-hidden="true">…calendar…</svg>
    <span class="dw-select__value" id="ship-value" data-placeholder>날짜 선택</span>
  </button>
  <button type="button" class="dw-date-picker__clear" aria-label="날짜 지우기" hidden>…circle-x…</button>
  <div class="dw-popover dw-date-picker__content" id="ship-pop" role="dialog" aria-label="날짜 선택" hidden>
    <div class="dw-calendar" data-dw="calendar" data-min="2026-05-13"></div>
  </div>
  <input type="hidden" name="ship-date" value="2026-05-20">
</div>
```

Value의 표기는 JS가 hidden input 값으로 채운다. 서버는 placeholder만 그린다.

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` · `responsive` | `medium` | `.dw-select--<size>` |
| value | yyyy-mm-dd | 없음 | hidden input `value` |
| min · max | yyyy-mm-dd | 없음 | Calendar `data-min` · `data-max` |
| clearable | boolean | false | Clear를 마크업에 넣는다 |
| locale | BCP 47 | `<html lang>` | Root `data-locale` |
| required · invalid · disabled · readonly | boolean | false | Trigger `aria-required` / `aria-invalid` / `disabled` / `aria-readonly` |

## Specification

크기·색·상태는 [Select Trigger](select.md#specification)와 같고, 팝업은 Popover와 같다. 다른 것만 적는다.

| 항목 | 값 |
| --- | --- |
| Icon | `medium` 16px · `large` 20px, `fg-neutral-muted`, 앞쪽 |
| 표기 | `2026년 5월 20일 (수)` ([content-i18n](../guides/content-i18n.md)), 고정폭 숫자, 한 줄 말줄임 |
| 제출 값 | yyyy-mm-dd |
| Clear | Icon과 같은 크기, 오른쪽 끝, `fg-neutral-subtle`, hover `fg-neutral`, 터치 히트 44px. 보이면 Trigger 오른쪽 padding을 넓힌다 |
| Content | Trigger 아래 4px `bottom-start`, 폭은 달력 폭, 달력의 테두리·배경은 지운다 |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Closed | — | Content `hidden` | |
| Open | Trigger 클릭·Enter·Space | 고른 날의 달을 다시 그리고 그 칸으로 포커스 | Popover 열기 |
| Selected | 날짜 선택 | Value·hidden input 갱신, `change` 발생, 닫고 Trigger로 포커스 | Popover 닫기 |
| Reselected | 같은 날 선택 | 값 유지, 닫힘 | |
| Cleared | Clear | 값을 비우고 Trigger로 포커스. 팝업은 열지 않는다 | |
| invalid | 폼 검증 | Select와 같다. 값을 고르면 해제 | |

## Behavior & Accessibility

- Trigger가 `.dw-select__trigger`라 `data-dw-validate` 폼 검증이 Select와 똑같이 돈다. 필수면 `aria-required="true"`를 붙인다.
- `data-dw="select"`를 쓰지 않는다. 쓰면 Select 동작이 겹친다.
- 모달 안에서도 Popover는 `position: fixed`라 본문 스크롤에 잘리지 않는다.
- 팝업은 비모달이다. 달력 키보드는 [Calendar](calendar.md#behavior--accessibility)를 따른다.

| 키 | 동작 |
| --- | --- |
| Enter · Space (Trigger) | 열기 |
| Esc | 닫고 Trigger로 포커스 |
| Tab (칸에서) | 닫고 Trigger 다음 요소로 |
| Shift + Tab (칸에서) | 달 이동 버튼으로 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | Popover 규칙대로 Bottom Sheet로 열린다. 달력은 시트 폭을 채운다 |
| < 1280px | `responsive` = `large` |

## Do / Don't

- **Do** 필터에서 비우면 전체가 되는 자리에는 Clear를 두고 placeholder를 "전체"로 쓴다.
- **Do** 시작일·종료일 두 칸이면 종료 칸의 `data-min`을 시작일로 맞춘다.
- **Don't** 칸을 눌렀을 때 네이티브 날짜 입력을 띄우지 않는다.
