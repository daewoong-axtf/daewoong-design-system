# Checkbox

> 클래스 `.dw-checkbox` · 레퍼런스 [component.html#checkbox](../component.html#checkbox)

## 개요

여러 보기 중 0개 이상을 고르거나, 하나의 조건에 동의할 때 쓴다. 선택은 제출 시 반영된다.
**쓰지 말 것** — 즉시 켜지고 꺼지는 설정(Switch), 하나만 고르는 보기(Radio).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-checkbox` | ✓ | `<label>`. 표시와 라벨을 묶어 전체가 클릭 영역 |
| Control | `.dw-checkbox__control` | ✓ | `<input type="checkbox">`, `appearance: none`으로 네모 상자를 그린다 |
| Label | `.dw-checkbox__label` | ✓ | 보기 문구 |

체크 표시는 Control의 배경 이미지가 아니라 `::after`에 마스크로 그린 `check`(indeterminate는 `minus`) 아이콘이다.

```html
<label class="dw-checkbox">
  <input class="dw-checkbox__control" type="checkbox" name="agree">
  <span class="dw-checkbox__label">약관에 동의합니다</span>
</label>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` | `medium` | `.dw-checkbox--large` |
| tone | `brand` · `neutral` | `brand` | `.dw-checkbox--neutral` |
| checked | boolean · `indeterminate` | false | `checked` / `input.indeterminate = true` |
| disabled | boolean | false | Control에 `disabled` |
| label weight | `regular` · `bold` | `regular` | `.dw-checkbox__label--bold` |

## Specification

| size | Root min-height | Control | radius | 체크 아이콘 | Label font | gap |
| --- | --- | --- | --- | --- | --- | --- |
| `medium` | 32px `x8` | 20×20px `x5` | 4px `r1` | 12px | t4 14/19 | 8px `x2` |
| `large` | 36px `x9` | 24×24px `x6` | 4px `r1` | 14px | t5 16/22 | 8px `x2` |

- Root는 `inline-flex`, 위 정렬. Control은 Root 높이 가운데에 오도록 위 여백 `(Root높이 − Control)/2`(medium 6px, large 6px), Label도 첫 줄이 Root 가운데에 오도록 위 여백 `(Root높이 − 줄높이)/2`(medium 6.5px, large 7px). 라벨이 여러 줄이면 아래로 늘어난다.

| 상태 | Control bg | Control 테두리 | 체크 아이콘 | Label |
| --- | --- | --- | --- | --- |
| 꺼짐 | 투명 | 1px `stroke-neutral-weak` | — | `fg-neutral` |
| 꺼짐 hover·pressed | `bg-transparent-pressed` | 1px `stroke-neutral-weak` | — | |
| 켜짐(brand) | `bg-brand-solid` | 없음 | `fg-on-brand-solid` | |
| 켜짐(brand) hover·pressed | `bg-brand-solid-pressed` | 없음 | | |
| 켜짐(neutral) | `bg-neutral-solid` | 없음 | `fg-on-neutral-solid` | |
| 켜짐(neutral) hover·pressed | `bg-neutral-solid-pressed` | 없음 | | |
| disabled 꺼짐 | `bg-disabled` | 1px `stroke-neutral-muted` | — | `fg-disabled` |
| disabled 켜짐 | `bg-disabled` | 1px `stroke-neutral-muted` | `fg-disabled` | `fg-disabled` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | 정밀 포인터 (Root 어디든) | 위 hover 색 | `background-color` `duration-color-transition` `easing-easing` |
| Pressed | `:active` | 터치에선 pressed 색, Control `scale-s95` | `duration-pressed-scale` `easing-pressed-scale` |
| Focus-visible | 키보드 | Control에 `outline 2px stroke-focus-ring`, offset 2px | |
| Checked / Indeterminate | 클릭·Space | 위 색 + 아이콘 | 색 전환과 같음 |
| Disabled | `disabled` | 위 색, Root `cursor: not-allowed` | |

## Behavior & Accessibility

- 네이티브 `<input type="checkbox">`를 쓴다(역할·키보드·폼 제출이 그대로 동작). 라벨은 `<label>`로 감싼다.
- 그룹이면 `<fieldset>` + `<legend>`(또는 `role="group"` + `aria-labelledby`). 그룹 간격은 세로 0 — Root 최소 높이가 간격을 만든다.
- 전체 선택은 일부만 선택됐을 때 `indeterminate`.

| 키 | 동작 |
| --- | --- |
| Space | 켜기/끄기 |
| Tab | 다음 체크박스 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음. 터치 화면에서 medium Root(32px)는 위아래 투명 히트 영역 6px을 더해 44px |

## Do / Don't

- **Do** 보기 문구는 긍정형으로 쓴다("알림 받기", "알림 받지 않기" ✗).
- **Don't** 체크박스로 즉시 동작(저장·이동)을 일으키지 않는다.
