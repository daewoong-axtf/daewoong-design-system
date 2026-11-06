# Time Picker

> 클래스 `.dw-time-picker` · 레퍼런스 [catalog.html#time-picker](../catalog.html#time-picker)

## 개요

분 단위까지 자유롭게 입력하는 시간 칸이다. 네이티브 `input[type=time]`이라 모바일에서는 기기의 시간 선택기가 열린다.
**쓰지 말 것** — 정해진 간격에서만 골라야 할 때([Time Select](time-select.md)), 날짜와 함께 고를 때는 [Date Picker](date-picker.md)와 나눠 둔다.

## Anatomy

상자는 [Text Input](text-input.md)을 그대로 쓴다.

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-text-input.dw-time-picker` | ✓ | `.dw-text-input--<size>`로 크기를 정한다 |
| Value | `.dw-text-input__value` | ✓ | `<input type="time">` |
| Range | `.dw-time-range` | | 시작·종료를 묶는 `role="group"` ([Time Select](time-select.md#anatomy)) |

```html
<div class="dw-text-input dw-text-input--responsive dw-time-picker">
  <input class="dw-text-input__value" id="open" name="open" type="time" value="09:00">
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | Text Input과 같다 | `medium` | `.dw-text-input--<size>` |
| value | HH:mm | 없음 | `value` |
| min · max · step | 네이티브 속성 | 없음 | `min` · `max` · `step` |
| invalid · disabled · readonly · required | boolean | false | Text Input과 같다 |

## Specification

크기·색·상태는 [Text Input](text-input.md#specification)과 같다. 다른 것만 적는다.

| 항목 | 값 |
| --- | --- |
| 숫자 | 고정폭 숫자 |
| 시계 아이콘 | 브라우저 기본 표시기. 색은 `color-scheme`을 따라 다크 모드에 맞는다 |
| 제출 값 | 언제나 24시간제 `HH:mm` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| focus | 포커스 | Text Input과 같다 | `duration-d2` |
| invalid | `aria-invalid="true"` | Text Input과 같다 | |
| disabled | `disabled` | Text Input과 같다. 시계 표시기 흐림 | |

## Behavior & Accessibility

- 표기는 브라우저와 OS 설정을 따른다. 오전/오후로 보일 수 있다. **24시간제 표기를 보장해야 하면 Time Select를 쓴다.**
- 입력 조각(시·분)의 키보드와 낭독은 브라우저 기본을 쓴다.
- 범위 묶음의 각 칸에는 `aria-label`로 시작·종료를 적는다.

| 키 | 동작 |
| --- | --- |
| ↑ ↓ | 조각의 값 증감 |
| ← → | 조각 이동 |
| 숫자 | 값 입력 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` = `large` (터치 타깃 52px) |
| 모바일 | 기기의 시간 선택기가 열린다 |

## Do / Don't

- **Do** 범위가 있으면 `min`·`max`를 주고 검증은 [Field](field.md)로 알린다.
- **Don't** 시계 표시기를 지워 입력 방법을 숨기지 않는다.
