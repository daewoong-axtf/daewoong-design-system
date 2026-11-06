# Text Input

> 클래스 `.dw-text-input` · 레퍼런스 [storybook.html#text-input](../storybook.html#text-input)

## 개요

한 줄 텍스트(`<input>`) 또는 여러 줄 텍스트(`<textarea>`)를 입력받는다. 라벨·오류는 [Field](field.md)로 감싸 붙인다.
**쓰지 말 것** — 정해진 보기 중 고르는 입력(Select·Radio), 날짜([Date Picker](date-picker.md)).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-text-input` | ✓ | 테두리·배경·모서리. 포커스·오류 테두리는 `::after`로 그린다 |
| Prefix icon | `.dw-text-input__icon` (값 앞) | | 검색 돋보기 등 |
| Prefix text | `.dw-text-input__affix` (값 앞) | | `₩`, `https://` 등 |
| Value | `.dw-text-input__value` | ✓ | 실제 `<input>`/`<textarea>`. 테두리·배경 없음 |
| Suffix text | `.dw-text-input__affix` (값 뒤) | | `원`, `kg` 등 |
| Suffix icon / 버튼 | `.dw-text-input__icon` (값 뒤) | | 지우기·비밀번호 보기 버튼 등 |
| Status | `.dw-text-input__status` (맨 뒤) | | 오류·성공 아이콘. 자리를 미리 잡아 두고 상태에 따라 보인다 |

```html
<div class="dw-text-input dw-text-input--medium">
  <svg class="dw-text-input__icon" aria-hidden="true">…search…</svg>
  <input class="dw-text-input__value" type="text" placeholder="검색어 입력">
</div>
```

상태 아이콘은 맨 뒤에 둔다. 지우기 버튼이 있으면 그 앞이다.

```html
<div class="dw-text-input dw-text-input--medium">
  <input class="dw-text-input__value" id="email" aria-describedby="email-desc">
  <button class="dw-text-input__icon" type="button" aria-label="입력 지우기" data-dw-clear hidden>…circle-x…</button>
  <span class="dw-text-input__status" aria-hidden="true">
    <svg class="dw-text-input__status-critical">…circle-alert…</svg>
    <svg class="dw-text-input__status-positive">…circle-check…</svg>
  </span>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| variant | `outline` · `underline` | `outline` | underline은 `.dw-text-input--underline` |
| size | `xsmall` · `small` · `medium` · `large` · `responsive` | `medium` | `.dw-text-input--<size>` |
| multiline | boolean | false | Value를 `<textarea>`로 |
| invalid | boolean | false | Value에 `aria-invalid="true"` |
| valid | boolean | false | [Field](field.md) Root에 `data-valid` |
| disabled | boolean | false | Value에 `disabled` |
| readonly | boolean | false | Value에 `readonly` |

`responsive`는 1280px 미만에서 `large`, 이상에서 `medium` 값을 쓴다.

## Specification

### 크기 — outline

| size | min-height | 좌우 여백 | gap | radius | font | icon |
| --- | --- | --- | --- | --- | --- | --- |
| `xsmall` | 32px `x8` | 10px `x2_5` | 6px `x1_5` | 8px `r2` | t3 13/18 | 14px |
| `small` | 36px `x9` | 12px `x3` | 8px `x2` | 8px `r2` | t4 14/19 | 16px |
| `medium` | 40px `x10` | 14px `x3_5` | 8px `x2` | 8px `r2` | t4 14/19 | 16px |
| `large` | 52px `x13` | 16px `x4` | 10px `x2_5` | 12px `r3` | t5 16/22 | 20px |

`xsmall`·`small`은 표 안이나 필터 바처럼 조밀한 데스크톱 자리에 쓰고, outline 한 줄 입력만 지원한다.

좌우 여백은 Root의 padding이 아니라 **맨 앞·맨 뒤 자식의 여백**이다(앞 아이콘이 있으면 아이콘 왼쪽에 크기별 좌우 여백, Value는 붙는다).

### 크기 — underline

| size | min-height | padding-block | gap | font | icon |
| --- | --- | --- | --- | --- | --- |
| `medium` | 34px | 6px `x1_5` | 8px `x2` | t5 16/22 | 20px |
| `large` | 40px `x10` | 8px `x2` | 10px `x2_5` | t6 18/24 | 24px |

underline은 좌우 여백·모서리가 없다.

### 여러 줄 (textarea)

| size | min-height | padding-block |
| --- | --- | --- |
| `medium` | 82px | 12px `x3` |
| `large` | 94px | 14px `x3_5` |

`resize: none`. 내용이 늘면 높이를 자동으로 늘린다(최대 높이는 화면이 정한다).

### 색

| 부위 | 상태 | 값 |
| --- | --- | --- |
| Root 테두리 (outline) | 기본 | `inset 0 0 0 1px stroke-neutral-weak` (box-shadow), 그림자 없음 |
| Root 테두리 (underline) | 기본 | 아래쪽만 `inset 0 -1px 0 0 stroke-neutral-weak` |
| `::after` 테두리 | focus(포커스 안에 있음) | 2px `stroke-neutral-contrast` (underline은 아래쪽만) |
| `::after` 테두리 | invalid (포커스 여부 무관) | 2px `stroke-critical-solid` |
| Root 배경 | 기본 | 투명(부모 표면) |
| Root 배경 (outline) | disabled · readonly | `bg-disabled` |
| Value 글자 | 기본 | `fg-neutral`, regular |
| Value 글자 | disabled | `fg-disabled` (placeholder도) |
| Value 글자 (underline) | readonly | `fg-neutral-muted` (placeholder도) |
| Placeholder | 기본 | `fg-placeholder`, regular |
| Affix 텍스트 | 기본 / disabled | `fg-neutral-subtle` / `fg-disabled` |
| 아이콘 | 기본 / disabled | `fg-neutral-muted` / `fg-disabled` |
| Status | invalid / valid | `fg-critical` / `fg-positive`, 크기는 표의 icon |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Enabled | — | 1px weak 테두리 | — |
| Focus | Value에 포커스(`:focus-within`) | 2px contrast 테두리. readonly도 같다(키보드 사용자에게 위치를 보인다) | `border-color` 100ms `easing-easing` |
| Invalid | `aria-invalid="true"` | 2px critical 테두리 | 같음 |
| Valid | Field에 `data-valid` | 테두리는 그대로, Status에 성공 아이콘, Field에 성공 메시지 | 없음(즉시) |
| Disabled | `disabled` | `bg-disabled`(outline), 글자 `fg-disabled`, `cursor: not-allowed` | — |
| Readonly | `readonly` | outline: `bg-disabled`, underline: 글자 `fg-neutral-muted` | — |

포커스 표시는 outline 링이 아니라 위 테두리로 한다(`outline: none`). 자동완성 노란 배경은 지운다.

### 상태 조합

| 조합 | 테두리 | 맨 뒤 | Field 아래 |
| --- | --- | --- | --- |
| 기본, 값 없음 | 1px weak | 빈 자리 | 설명 |
| 입력 중, 값 있음 | 2px contrast | 지우기 | 설명 |
| 오류, 포커스 없음 | 2px critical | 오류 아이콘 | 오류 메시지 |
| 오류, 입력 중, 값 있음 | 2px critical | 지우기 | 오류 메시지 |
| 성공, 포커스 없음 | 1px weak | 성공 아이콘 | 성공 메시지 |
| 성공, 입력 중, 값 있음 | 2px contrast | 지우기 | 성공 메시지 |
| 성공, disabled | 없음, `bg-disabled` | 성공 아이콘 | 성공 메시지 |
| 오류, disabled | 없음, `bg-disabled` | 없음 | 설명 |

Status가 있는 Root에서 지우기 버튼은 입력 중이거나 마우스를 올렸을 때만 보인다. 그 밖에는 값이 있어도 숨는다.

## Behavior & Accessibility

- 라벨은 [Field](field.md)의 `<label for>`로 붙인다. 라벨 없이 쓰면(검색창 등) Value에 `aria-label`.
- `type="search"`에서 브라우저가 그리는 기본 지우기 버튼은 숨긴다. 지우기 버튼은 `data-dw-clear` 하나만 둔다.
- 오류는 `aria-invalid="true"` + `aria-describedby`(Field 명세).
- Status는 장식이다(`aria-hidden="true"`). 상태는 메시지로 전한다. 색과 아이콘만으로 알리지 않는다.
- 알맞은 `type`·`inputmode`·`autocomplete`를 준다(이메일 `type="email" autocomplete="email"`, 숫자 `inputmode="numeric"`).
- 지우기 버튼(suffix)은 값이 있을 때만 보이고 `aria-label="입력 지우기"`, 누르면 값을 비우고 Value로 포커스를 돌린다.
- Root를 클릭하면 Value로 포커스가 간다(아이콘·affix 영역 포함).

| 키 | 동작 |
| --- | --- |
| Tab | Value로 진입·이탈 |
| Esc | (검색 입력에서) 값 지우기 — 선택 사항 |

### 구현 세부

- 상태는 Value(`disabled`·`readonly`·`aria-invalid`)에 걸고, Root 스타일은 `:has()`로 잡는다. 예: `.dw-text-input:has(.dw-text-input__value:disabled)`.
- 포커스·오류 테두리는 Root의 `::after`(absolute, `inset: 0`, 투명 2px border)로 그리고 `border-color`를 바꾼다.
- 지우기 버튼 마크업은 `<button class="dw-text-input__icon" type="button" aria-label="입력 지우기" data-dw-clear>`이고 값이 없으면 `hidden`이다. 터치 화면에서 히트 영역은 44px다.
- disabled와 invalid가 함께 오면 disabled가 이긴다.
- textarea `min-height`는 표의 값을 그대로 쓴다. 줄 높이로 계산한 값과 1px 다를 수 있다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` size = `large` |
| ≥ 1280px | `responsive` size = `medium` |

모바일 iOS 확대를 막기 위해 모바일에서 Value 글자는 16px 이상이어야 한다 — 모바일 폼에서는 `large` 또는 `responsive`를 쓴다.

## Do / Don't

- **Do** 입력 형식이 있으면 placeholder가 아니라 Field Description에 예시를 쓴다.
- **Do** 같은 폼 안에서는 size를 섞지 않는다.
- **Do** 서버 검증처럼 시간이 걸리는 입력에 Status 자리를 둔다. 결과가 떠도 값이 밀리지 않는다.
- **Do** 값을 고르면 바로 끝나는 행동(중복 확인, 인증번호 받기)은 [Input Group](input-group.md)의 붙인 버튼을 쓴다.
- **Don't** 포커스 테두리를 지우지 않는다.
- **Don't** outline과 underline을 한 폼에 섞지 않는다.
- **Don't** 평범한 필수 입력에 성공 표시를 달지 않는다. 형식 확인이나 서버 확인처럼 확인 자체가 의미 있을 때만 쓴다.
