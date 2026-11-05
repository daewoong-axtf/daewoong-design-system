# Input Group

> 클래스 `.dw-input-group` · 레퍼런스 [storybook.html#input-group](../storybook.html#input-group)

## 개요

한 테두리 안에 입력과 버튼·글자를 묶는다. 입력 끝의 적용·복사 버튼, 여러 줄 입력 아래의 글자 수와 등록 버튼에 쓴다.
**쓰지 말 것** — 단위·아이콘만 붙일 때([Text Input](text-input.md)의 affix·icon), 검색([Search Input](search-input.md)), 비밀번호([Password Input](password-input.md)).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-text-input.dw-input-group` | ✓ | Text Input에 수정자를 더한다. 테두리·포커스·오류 표현을 그대로 받는다 |
| Value | `.dw-text-input__value` | ✓ | `<input>` 또는 `<textarea>` |
| Affix | `.dw-text-input__affix` | | 앞뒤 글자 |
| Addon | `.dw-input-group__addon` | | 버튼·글자를 담는 칸. 값 앞뒤 어느 쪽이든 |

```html
<div class="dw-text-input dw-text-input--medium dw-input-group">
  <input class="dw-text-input__value" aria-label="쿠폰 번호">
  <div class="dw-input-group__addon">
    <button class="dw-button dw-button--neutral-outline dw-button--xsmall" type="button">적용</button>
  </div>
</div>
```

위아래로 쌓을 때는 `.dw-input-group--stacked`를 더한다. 화면 순서는 마크업 순서다.

```html
<div class="dw-text-input dw-text-input--medium dw-input-group dw-input-group--stacked">
  <textarea class="dw-text-input__value" aria-label="문서 의견"></textarea>
  <div class="dw-input-group__addon">
    <span class="dw-field__count" aria-hidden="true" data-empty><b>0</b>/200</span>
    <button class="dw-button dw-button--brand-solid dw-button--xsmall" type="button">등록</button>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` · `responsive` | `medium` | `.dw-text-input--<size>` |
| stacked | boolean | false | `.dw-input-group--stacked` |
| invalid·disabled·readonly | boolean | false | Value의 속성. [Text Input](text-input.md)과 같다 |

## Specification

### 크기

| size | Addon 버튼 | 끝 여백 |
| --- | --- | --- |
| `medium` | `xsmall` 32px | 4px `x1` |
| `large` | `small` 36px | 8px `x2` |
| `responsive` | `xsmall` 32px | 1280px 미만 8px `x2`, 이상 4px `x1` |

Addon 안 gap은 4px `x1`이다. 그 밖의 치수는 [Text Input](text-input.md)을 따른다.

### stacked

| 항목 | 값 |
| --- | --- |
| Root | 세로 배치, gap 0, 높이는 내용을 따른다 |
| Value | 폭 100%, 좌우 padding은 Text Input 크기별 좌우 여백. 한 줄 입력의 min-height 40px `x10` |
| Addon | 양끝 정렬, gap 8px `x2`, padding 8px `x2`, 왼쪽만 크기별 좌우 여백 |

### 색

| 부위 | 상태 | 값 |
| --- | --- | --- |
| Root | 전체 | [Text Input](text-input.md) |
| Addon 글자 | 기본 / disabled | `fg-neutral-subtle` / `fg-disabled` |
| Addon 버튼 | 전체 | [Button](button.md) variant |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Focus | Value 포커스 | Root 전체에 2px contrast 테두리 | Text Input과 같음 |
| Invalid | Value `aria-invalid="true"` | Root 전체에 2px critical 테두리 | 같음 |
| Disabled | Value `disabled` | Root `bg-disabled`. Addon 버튼에도 `disabled`를 직접 준다 | — |

## Behavior & Accessibility

- Root가 `.dw-text-input`이므로 Addon의 빈 곳을 누르면 Value로 포커스가 간다. `data-dw-clear`, Field 글자 수, 폼 검증도 그대로 동작한다.
- 라벨은 [Field](field.md)로 붙인다. 라벨이 없으면 Value에 `aria-label`.
- Addon 버튼은 `type="button"`이다. 없으면 폼이 제출된다.
- 아이콘만 있는 버튼에는 `aria-label`을 준다.

| 키 | 동작 |
| --- | --- |
| Tab | Value → Addon 버튼 → 다음 요소 |
| Enter · Space (버튼) | 버튼 실행 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` size = `large`, 끝 여백 8px `x2` |
| 터치 | 버튼 터치 영역은 [Button](button.md)을 따르되 Root 밖으로 나가지 않는다. 모바일에서는 `large` 또는 `responsive`를 쓴다 |

## Do / Don't

- **Do** 입력값에 바로 작용하는 행동만 둔다.
- **Do** 기본 행동이 폼 제출이면 입력 밖의 제출 버튼을 쓴다.
- **Don't** Addon에 버튼을 두 개 넘게 넣지 않는다.
- **Don't** 다른 입력을 Addon에 넣지 않는다.
