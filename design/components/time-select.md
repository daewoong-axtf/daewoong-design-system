# Time Select

> 클래스 `.dw-time-select` · 레퍼런스 [storybook.html#time-select](../storybook.html#time-select)

## 개요

정해진 시간 슬롯 중 하나를 고르는 네이티브 select다. **슬롯의 간격과 범위는 화면이 정한다.** 이 컴포넌트는 슬롯을 만들지 않고 받기만 한다.
**쓰지 말 것** — 분 단위 자유 입력([Time Picker](time-picker.md)), 시간이 아닌 보기([Select](select.md)).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-time-select` | ✓ | 위치 기준 |
| Control | `.dw-time-select__control` | ✓ | `<select>` |
| Chevron | `.dw-time-select__chevron` | ✓ | `chevron-down` |
| Range | `.dw-time-range` | | 시작·종료를 묶는 `role="group"` |
| Separator | `.dw-time-range__separator` | | `~`, `aria-hidden="true"` |

```html
<span class="dw-time-select dw-time-select--responsive">
  <select class="dw-time-select__control" id="start" name="start">
    <option>09:00</option>
    <option>09:30</option>
    <option selected>10:00</option>
  </select>
  <svg class="dw-time-select__chevron" aria-hidden="true">…chevron-down…</svg>
</span>
```

```html
<div class="dw-time-range" role="group" aria-labelledby="ship-time-label">
  <span class="dw-time-select dw-time-select--responsive">…aria-label="시작"…</span>
  <span class="dw-time-range__separator" aria-hidden="true">~</span>
  <span class="dw-time-select dw-time-select--responsive">…aria-label="종료"…</span>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` · `responsive` | `medium` | `.dw-time-select--<size>` (`responsive`는 1280 미만 large) |
| slots | HH:mm 목록 | 필수 | `<option>` 목록 (React `slots`) |
| value | HH:mm | 없음 | `selected` |
| invalid · disabled · required | boolean | false | `aria-invalid` / `disabled` / `required` |

## Specification

상자는 [Select Trigger](select.md#specification)와 같은 높이·테두리다.

| size | height | padding-inline | radius | font | 아이콘 |
| --- | --- | --- | --- | --- | --- |
| `medium` | 40px `x10` | 14px `x3_5` | 8px `r2` | t4 14/19 | 16px |
| `large` | 52px `x13` | 16px `x4` | 12px `r3` | t5 16/22 | 20px |

| 상태 | 값 |
| --- | --- |
| 기본 | bg `bg-transparent`, 테두리 `inset 0 0 0 1px stroke-neutral-weak`, 그림자 없음, 글자 `fg-neutral`, 고정폭 숫자, Chevron `fg-neutral-muted` |
| 범위 묶음 | 두 칸이 같은 폭, gap 8px `x2`, Separator `fg-neutral-muted` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| hover | 포인터 | bg `bg-transparent-pressed` | `duration-color-transition` |
| focus | 포커스 | 테두리 2px `stroke-neutral-contrast` | `duration-d2` |
| focus-visible | 키보드 | outline 2px `stroke-focus-ring`, offset 2px | `duration-d3` |
| invalid | `aria-invalid="true"` | 테두리 2px `stroke-critical-solid` | |
| disabled | `disabled` | bg `bg-disabled`, 글자·아이콘 `fg-disabled` | |

## Behavior & Accessibility

- 네이티브 select라 JS가 없어도 돌고, 모바일에서는 기기의 선택기가 열린다. 시간은 24시간제로 쓴다([content-i18n](../guides/content-i18n.md)).
- **슬롯 밖 값을 잃지 않는다.** 저장된 값이 슬롯에 없으면(예: `23:59`) 그 값을 목록 맨 앞에 넣어 조회·수정 때 그대로 보인다.
- **빈 값 보기를 두지 않는다.** 값이 비어 있을 때만 `<option value="" disabled selected>--:--</option>`을 맨 앞에 두고, 값이 채워지면 걷어낸다. 목록에서 다시 비우는 길이 없어야 필수값이 지워지지 않는다.
- 범위 묶음의 각 칸에는 `aria-label`로 시작·종료를 적는다.

| 키 | 동작 |
| --- | --- |
| ↑ ↓ · 문자 입력 | 브라우저 기본(보기 이동·찾기) |
| Enter · Space | 브라우저 기본(목록 열기) |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` = `large` (터치 타깃 52px) |
| 좁은 폭의 범위 묶음 | 두 칸이 나란히 줄어든다. 줄을 바꾸지 않는다 |

## Do / Don't

- **Do** 슬롯은 쓰는 시간대로 좁힌다. 하루 전체를 30분 간격으로 늘어놓으면 48개다.
- **Do** 슬롯 간격은 화면의 업무 단위에 맞춘다.
- **Don't** 12시간제 표기를 섞지 않는다.
