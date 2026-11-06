# Choice Card

> 클래스 `.dw-choice-card` · 레퍼런스 [storybook.html#choice-card](../storybook.html#choice-card)

## 개요

설명이 필요한 보기를 카드로 고른다. 요금제, 알림 주기처럼 보기마다 한 줄 이상의 설명이 붙을 때 쓴다.
**쓰지 말 것** — 설명 없는 짧은 보기([Radio](radio.md)·[Checkbox](checkbox.md)), 눌러서 다른 화면으로 가는 카드([Card](card.md)).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-choice-card` | ✓ | `<label>`. 카드 전체가 눌리는 영역 |
| Control | `.dw-radio__control` · `.dw-checkbox__control` | ✓ | `.dw-radio`·`.dw-checkbox`로 감싼다 |
| Content | `.dw-choice-card__content` | ✓ | 글자 묶음 |
| Title | `.dw-choice-card__title` | ✓ | 보기 이름 |
| Description | `.dw-choice-card__description` | | 보기 설명 |

```html
<fieldset>
  <legend>알림 주기</legend>
  <label class="dw-choice-card">
    <span class="dw-radio"><input class="dw-radio__control" type="radio" name="period" checked></span>
    <span class="dw-choice-card__content">
      <span class="dw-choice-card__title">매일</span>
      <span class="dw-choice-card__description">하루 한 번 모아서 받아요</span>
    </span>
  </label>
</fieldset>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| control | `radio` · `checkbox` | — | Control의 `type` |
| checked | boolean | false | Control의 `checked` |
| invalid | boolean | false | Control에 `aria-invalid="true"` 또는 Field Root에 `data-invalid` |
| disabled | boolean | false | Control에 `disabled` |

## Specification

| 항목 | 값 |
| --- | --- |
| 여백 | 16px `x4` |
| 간격 | Control과 글자 12px `x3`, 제목과 설명 2px `x0_5` |
| 모서리 | 12px `r3` |
| Title | t5 16/22 bold, `fg-neutral` |
| Description | t4 14/19, `fg-neutral-subtle` |

| 상태 | bg | 테두리 |
| --- | --- | --- |
| 기본 | 투명 | 1px `stroke-neutral-weak` |
| 선택 | 투명 | 2px `stroke-brand-solid` |
| 오류 | 투명 | 2px `stroke-critical-solid` |
| disabled | `bg-disabled` | 1px `stroke-neutral-weak`, 글자 `fg-disabled` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | 포인터 | `bg-transparent-pressed` | 색 전환 |
| Focus | Control에 키보드 포커스 | Root에 2px `stroke-focus-ring` | `outline-color` 150ms |
| Selected | Control `:checked` | 2px 테두리, Control 켜짐 | `border-color` 100ms |
| Invalid | `aria-invalid="true"` | 2px critical 테두리 | 같음 |
| Disabled | `disabled` | 위 표, `cursor: not-allowed` | — |

## Behavior & Accessibility

- 그룹은 `<fieldset>`과 `<legend>`로 묶는다. React는 `RadioGroup`에 `aria-label`을 준다.
- 키보드는 Control을 따른다. Radio는 화살표, Checkbox는 Space다.
- 선택은 테두리 두께와 Control로 함께 보인다. 색만으로 알리지 않는다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| `md` 미만 | 한 줄에 하나씩 쌓는다 |
| `md`부터 | [Grid](grid.md)로 칸을 나눠 나란히 둘 수 있다 |

## Do / Don't

- **Do** 카드 높이가 달라지지 않도록 설명 길이를 비슷하게 맞춘다.
- **Don't** 카드 안에 링크나 버튼을 넣지 않는다. 눌렀을 때 무엇이 동작하는지 모호해진다.
