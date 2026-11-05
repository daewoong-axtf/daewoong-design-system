# Field

> 클래스 `.dw-field` · 레퍼런스 [storybook.html#field](../storybook.html#field)

## 개요

입력 컨트롤(Text Input·Textarea·Select 등)에 라벨·필수 표시·설명·오류 메시지·글자 수를 붙이는 래퍼다. 모든 폼 입력은 Field로 감싼다.
**쓰지 말 것** — 체크박스·라디오·스위치 하나짜리 옵션(그 컴포넌트의 자체 라벨을 쓴다).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-field` | ✓ | 세로 배치 |
| Header | `.dw-field__header` | | 라벨 줄. 라벨이 없으면 생략 |
| Label | `.dw-field__label` | ✓(시각적으로 숨길 수는 있음) | `<label for>` |
| Indicator | `.dw-field__indicator` | | `(필수)`/`(선택)` 텍스트 또는 6px 점 |
| Control | 입력 컴포넌트 | ✓ | `.dw-text-input` 등 |
| Footer | `.dw-field__footer` | | 설명·오류·성공·글자 수 줄 |
| Success message | `.dw-field__success` | | 확인을 마쳤을 때의 안내. Root에 `data-valid`가 있을 때만 보인다 |
| Description | `.dw-field__description` | | 도움말 |
| Error message | `.dw-field__error` | 오류일 때 | 오류 설명. 있으면 Description 대신 보인다 |
| Character count | `.dw-field__count` | | `12/50` 형식, 오른쪽 정렬 |

```html
<div class="dw-field">
  <div class="dw-field__header">
    <label class="dw-field__label" for="name">이름<span class="dw-field__indicator">(필수)</span></label>
  </div>
  <div class="dw-text-input dw-text-input--medium">
    <input class="dw-text-input__value" id="name" aria-describedby="name-desc" required>
  </div>
  <div class="dw-field__footer">
    <p class="dw-field__description" id="name-desc">실명을 입력하세요</p>
    <span class="dw-field__count" aria-hidden="true">0/20</span>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| indicator | 없음 · `required-text` · `optional-text` · `required-dot` | 없음 | Indicator 요소 유무와 내용 |
| label weight | `medium` · `bold` | `medium` | `.dw-field__label--bold` |
| invalid | boolean | false | 컨트롤에 `aria-invalid="true"`, Root에 `data-invalid` |
| valid | boolean | false | Root에 `data-valid`. invalid가 함께 있으면 invalid가 이긴다 |
| disabled | boolean | false | 컨트롤에 `disabled`, Root에 `data-disabled` |
| max length | 숫자 | 없음 | Character count 표시 |

## Specification

| 항목 | 값 |
| --- | --- |
| Root 방향·간격 | column, gap 8px `x2` |
| Header | flex, `space-between`, 가운데 정렬, gap 10px `x2_5`, 좌우 padding 2px `x0_5` |
| Label | t5 16/22, `font-weight-medium`, `fg-neutral` |
| Indicator 텍스트 | t4 14px(line-height 22px), regular, `fg-neutral-subtle`, 왼쪽 여백 4px |
| Indicator 점 | 6×6px 원, `fg-critical`, 라벨 첫 줄 위쪽에서 4px, 왼쪽 여백 4px |
| Footer | flex, 위 정렬, gap 8px `x2`, 좌우 padding 2px `x0_5` |
| Description | t4 14/19, regular, `fg-neutral-subtle`. 앞 아이콘(선택) 16px, 오른쪽 여백 6px, 아이콘 색 `fg-neutral-subtle` |
| Error message | t4 14/19, regular, `fg-critical`. 앞 아이콘 `circle-alert` 16px, 오른쪽 여백 6px, 색 `fg-critical` |
| Character count | t4 14/19, `margin-left: auto`. 현재 수 `fg-neutral`(0이면 `fg-neutral-subtle`), `/최대` `fg-neutral-subtle`. invalid면 둘 다 `fg-critical` |
| disabled | Label·Description 색은 그대로, 컨트롤만 disabled 표현 |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Default | — | Description 표시 | — |
| Valid | 형식 확인·서버 확인 통과 | Description 숨김, Success message 표시, 컨트롤 테두리는 그대로. 값이 바뀌면 `data-valid`가 풀린다 | 없음(즉시) |
| Invalid | 제출 시 검증 실패, 또는 이미 오류였던 필드의 입력 변경 | Description 숨김, Error message 표시, 컨트롤 테두리 critical(컨트롤 명세), 글자 수 critical | 없음(즉시) |
| Disabled | `disabled` | 컨트롤만 비활성 표현 | — |

검증 시점: **첫 오류는 제출 시** 보여준다. 이후 그 필드는 입력할 때마다 다시 검증해 오류가 풀리면 즉시 지운다. 입력 중인 빈 필드를 처음부터 빨갛게 만들지 않는다.

## Behavior & Accessibility

- `<label for>`로 컨트롤과 연결한다. 라벨을 숨겨야 하면 시각적으로만 숨기는 클래스를 쓰고 지우지 않는다.
- 컨트롤의 `aria-describedby`에 Description 또는 Error message의 `id`를 넣는다(보이는 쪽만).
- 오류 시 컨트롤에 `aria-invalid="true"`. Error message에 `role="alert"`를 붙이지 않는다 — 제출 실패 시 **첫 오류 필드로 포커스를 옮기면** 스크린리더가 라벨·오류를 함께 읽는다.
- 필수 필드는 컨트롤에 `required`(또는 `aria-required="true"`). 점 표시만 쓸 때는 라벨에 시각적으로 숨긴 "필수"를 넣는다.
- Character count는 `aria-hidden="true"`로 두고, 최대 길이 도달 시에만 시각적으로 숨긴 안내를 갱신한다.

### 구현 세부

- Error: `<p class="dw-field__error" id="…"><svg aria-hidden="true">…</svg>문구</p>`. Root에 `data-invalid`가 없으면 숨기고, 있으면 Description을 숨긴다.
- 필수 점 표시: `<span class="dw-field__indicator dw-field__indicator--dot"><span class="dw-visually-hidden">필수</span></span>`.
- 시각적 숨김은 `.dw-visually-hidden`을 쓴다. 이 이름을 새로 만들지 않는다.
- Character count: `<span class="dw-field__count" aria-hidden="true" data-empty><b>0</b>/20</span>`. 숫자는 `<b>`, 값이 0이면 `data-empty`다.
- 넣을 내용이 없으면 Footer 요소를 두지 않는다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음. 폭은 부모를 가득 채운다(`width: 100%`) |

## 성공 메시지

성공은 확인 자체가 의미 있을 때만 쓴다(사용할 수 있는 아이디, 인증 완료). 색은 `fg-positive`, 글자는 오류 메시지와 같은 t4, 앞에 16px `circle-check` 아이콘을 둔다.

```html
<div class="dw-field" data-valid>
  <div class="dw-field__header"><label class="dw-field__label" for="login-id">아이디</label></div>
  <div class="dw-text-input dw-text-input--responsive">
    <input class="dw-text-input__value" id="login-id" aria-describedby="login-id-ok" value="dw-2026">
  </div>
  <div class="dw-field__footer">
    <p class="dw-field__error" id="login-id-err">…</p>
    <p class="dw-field__success" id="login-id-ok" role="status">…circle-check…사용할 수 있는 아이디예요</p>
  </div>
</div>
```

`aria-describedby`는 지금 보이는 메시지를 가리킨다. 서버 확인처럼 나중에 나타나는 성공은 `role="status"`로 둬 스크린리더가 읽게 한다.

## Do / Don't

- **Do** 오류 메시지는 무엇이 문제인지와 어떻게 고치는지를 함께 쓴다("8자 이상 입력하세요").
- **Do** 필수·선택 중 적은 쪽만 표시한다(대부분 필수면 선택에만 `(선택)`).
- **Don't** placeholder를 라벨 대신 쓰지 않는다.
- **Don't** 오류를 색으로만 표시하지 않는다(아이콘+문구).
