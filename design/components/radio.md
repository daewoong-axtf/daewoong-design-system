# Radio

> 클래스 `.dw-radio` · 레퍼런스 [component.html#radio](../component.html#radio)

## 개요

서로 배타적인 보기 2–6개 중 하나를 고른다. 모든 보기가 늘 보여야 할 때 쓴다.
**쓰지 말 것** — 보기 7개 이상(Select), 2개 보기를 바로 전환(Segmented Control), 여러 개 선택(Checkbox).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Group | `.dw-radio-group` | ✓ | `<fieldset>` 또는 `role="radiogroup"`, 세로 배치 |
| Root | `.dw-radio` | ✓ | `<label>` |
| Control | `.dw-radio__control` | ✓ | `<input type="radio">`, `appearance: none`으로 원을 그린다 |
| Label | `.dw-radio__label` | ✓ | 보기 문구 |

선택 표시(가운데 점)는 Control의 `::after`.

```html
<fieldset class="dw-radio-group">
  <legend class="dw-field__label">배송 방법</legend>
  <label class="dw-radio">
    <input class="dw-radio__control" type="radio" name="ship" value="normal" checked>
    <span class="dw-radio__label">일반 배송</span>
  </label>
</fieldset>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` | `medium` | `.dw-radio--large` |
| tone | `brand` · `neutral` | `brand` | `.dw-radio--neutral` |
| disabled | boolean | false | `disabled` (그룹 전체는 `<fieldset disabled>`) |

## Specification

| size | Root min-height | Control | 점 | 점(disabled 켜짐) | Label font | gap |
| --- | --- | --- | --- | --- | --- | --- |
| `medium` | 32px `x8` | 20×20px `x5` 원 | 8px `x2` | 10px `x2_5` | t4 14/19 | 8px `x2` |
| `large` | 36px `x9` | 24×24px `x6` 원 | 10px `x2_5` | 12px `x3` | t5 16/22 | 8px `x2` |

Root·Control·Label 세로 정렬 규칙은 [Checkbox](checkbox.md)와 같다.

| 상태 | Control bg | Control 테두리 | 점 | Label |
| --- | --- | --- | --- | --- |
| 꺼짐 | 투명 | 1px `stroke-neutral-weak` | — | `fg-neutral` |
| 꺼짐 hover·pressed | `bg-transparent-pressed` | 1px `stroke-neutral-weak` | — | |
| 켜짐(brand) | `bg-brand-solid` | 없음 | `fg-on-brand-solid` | |
| 켜짐(brand) hover·pressed | `bg-brand-solid-pressed` | 없음 | | |
| 켜짐(neutral) | `bg-neutral-solid` | 없음 | `fg-on-neutral-solid` | |
| 켜짐(neutral) hover·pressed | `bg-neutral-solid-pressed` | 없음 | | |
| disabled 꺼짐 | `gray-300` | 1px `stroke-neutral-weak` | — | `fg-disabled` |
| disabled 켜짐 | 투명 | 1px `gray-300` | `gray-300` (크기는 표의 disabled 값) | `fg-disabled` |

## States

[Checkbox](checkbox.md)의 States와 같다(hover·pressed·focus-visible·disabled, 누름 `scale-s95`).

## Behavior & Accessibility

- 같은 `name`의 네이티브 `<input type="radio">` 묶음을 `<fieldset>` + `<legend>`로 감싼다.
- 처음부터 하나가 선택돼 있어야 한다(선택 안 함이 가능하면 "선택 안 함" 보기를 둔다).

| 키 | 동작 |
| --- | --- |
| Tab | 그룹 안의 선택된 항목으로 진입, 다음 Tab은 그룹 밖으로 |
| ↑ / ← | 이전 보기 선택 |
| ↓ / → | 다음 보기 선택 |
| Space | 포커스된 보기 선택 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 세로 배치 고정. 보기가 짧고 2–3개면 640px 이상에서 가로(`.dw-radio-group--row`, gap 24px `x6`) |

## Do / Don't

- **Do** 추천 보기를 첫 번째에 두고 기본 선택한다.
- **Don't** 라디오 하나만 단독으로 쓰지 않는다(Checkbox).
