# Form

> 클래스 `.dw-form` · 레퍼런스 [storybook.html#form](../storybook.html#form)

## 개요

[Field](field.md)를 쌓아 값을 받고, 제출할 때 한 번에 검증하는 폼 구성이다. 입력 요소를 새로 만들지 않고 Field·[Text Input](text-input.md)·[Select](select.md) 등을 그대로 배치한다.
**쓰지 말 것** — 저장 버튼 없이 바로 반영되는 설정([Switch](switch.md) 토글), 목록 검색([Search Input](search-input.md)).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-form` | ✓ | `<form>`. 세로 배치 |
| Field | `.dw-field` | ✓ | 입력 하나. 검증 단위다 |
| Row | `.dw-form__row` | | 필드를 나란히 놓는 줄. 짧은 값끼리만 쓴다 |
| Section | `.dw-form-section` | | 긴 폼의 구획. [Form Section](form-section.md) |
| Warning | `.dw-callout` | | 필드 하나에 매이지 않는 사유. 제출 버튼 바로 위 ([interaction.md 9장](../guides/interaction.md#9-폼-안-경고)) |
| Actions | `.dw-form__actions` | ✓ | 취소·제출 버튼 줄 |

```html
<form class="dw-form" action="/orders" method="post" data-dw-validate novalidate>
  <div class="dw-field">
    <div class="dw-field__header">
      <label class="dw-field__label" for="order-name">받는 분<span class="dw-field__indicator">(필수)</span></label>
    </div>
    <div class="dw-text-input dw-text-input--responsive">
      <input class="dw-text-input__value" id="order-name" name="name" required autocomplete="name">
    </div>
    <div class="dw-field__footer">
      <p class="dw-field__error" id="order-name-err"><svg aria-hidden="true"><use href="#i-circle-alert"/></svg>받는 분 이름을 입력하세요</p>
    </div>
  </div>
  <div class="dw-form__actions">
    <button class="dw-button dw-button--neutral-weak dw-button--large" type="button">취소</button>
    <button class="dw-button dw-button--brand-solid dw-button--large" type="submit">저장</button>
  </div>
</form>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| validate | boolean | false | Root에 `data-dw-validate novalidate`. `novalidate`가 없으면 브라우저 말풍선이 먼저 뜬다 |
| rule | 필드별 | 없음 | 컨트롤의 `required`·`type`·`pattern`·`minlength`·`maxlength`, Select는 Trigger의 `aria-required="true"` |
| error text | 필드별 | — | 필드마다 `.dw-field__error` 하나. 규칙이 여러 개면 한 문장에 모두 담는다 |

## Specification

### 간격

| 항목 | 값 |
| --- | --- |
| Root gap | 20px `x5`. Section을 담으면 32px `x8` |
| Row | ≥ 768px 2열 · 열 간격 16px `x4`. < 768px 1열 · 간격 20px `x5` |
| Actions | flex, 오른쪽 정렬, gap 8px `x2`, 위쪽 추가 여백 4px `x1` |
| 버튼 순서 | 취소가 왼쪽, 제출이 오른쪽 |
| 버튼 size | [Text Input](text-input.md)과 높이를 맞춘다. 입력이 `responsive`면 `large` |

### 색

Root는 색을 갖지 않는다. 부모 표면 위에 놓이고, 오류 색은 [Field](field.md)와 컨트롤 명세를 따른다.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Editing | — | 오류 없음. 입력 중인 빈 필드를 오류로 표시하지 않는다 | — |
| Invalid | 제출 시 검증 실패 | 실패한 Field마다 `data-invalid`, 컨트롤에 `aria-invalid="true"`, `aria-describedby`를 오류 `id`로 교체, 첫 오류 필드로 포커스 | 없음(즉시) |
| Recovering | 오류 필드의 입력 변경 | 입력할 때마다 다시 검증해 통과하면 위 표시를 지우고 `aria-describedby`를 설명 `id`로 되돌린다 | 없음(즉시) |
| Submitting | 검증 통과 후 요청 중 | 제출 버튼 `data-loading aria-busy="true"`, 취소는 `disabled`([interaction.md 7장](../guides/interaction.md#7-제출-처리-중-잠금)) | — |
| Rejected | 서버가 거부 | 필드 문제면 그 필드를 Invalid로, 폼 전체 문제면 Warning을 보인다. 입력값은 유지한다 | — |

제출 버튼은 **항상 활성**이다. 검증 때문에 `disabled`를 걸지 않는다. Submitting의 잠금은 중복 제출 방지다.

## Behavior & Accessibility

`data-dw-validate`는 `components.js`가 제공한다. 폼에 코드를 더 붙이지 않아도 다음이 동작한다.

1. `submit`을 받아 필드를 검사한다. 오류가 있으면 전송을 막는다.
2. 폼 안의 `.dw-field`를 문서 순서로 돌며 첫 컨트롤을 `checkValidity()`로 검사한다. Select는 `aria-required="true"`일 때 값 유무를 본다.
3. 실패한 Field를 Invalid로 표시하고 첫 오류 컨트롤로 포커스를 옮긴다.

`.dw-field`로 감싸지 않은 컨트롤은 검증하지 않는다. 입력 중 재검증은 `.dw-text-input__value`와 Select에서만 일어난다. Checkbox·Radio는 다음 제출 때 다시 검사한다.

### 제출 진행

검증을 통과하면 브라우저 기본 제출이 진행된다. 서버 렌더 폼은 추가 코드가 필요 없다. 화면 JS로 직접 전송할 때는 취소 가능한 `dw:form-valid` 이벤트를 받아 `preventDefault()`하고 전송한다.

```js
document.addEventListener('dw:form-valid', (e) => {
  e.preventDefault()
  send(new FormData(e.target))
})
```

### 서버 오류·별도 규칙

- 서버가 거부한 필드는 Field에 `data-invalid`, 컨트롤에 `aria-invalid="true"`, `aria-describedby`에 오류 `id`를 넣고 포커스를 옮긴다. 값을 고치면 Recovering으로 지워진다.
- 두 필드를 비교하는 규칙은 컨트롤의 `setCustomValidity()`로 건다. 통과하면 `setCustomValidity('')`로 비운다.
- 오류 문구에 `role="alert"`를 붙이지 않는다([accessibility.md](../guides/accessibility.md)).
- 작성·수정 폼은 저장하지 않은 변경이 있으면 이탈 전에 확인한다([interaction.md 10장](../guides/interaction.md#10-페이지-이탈-경고)).

| 키 | 동작 |
| --- | --- |
| Tab | 필드 순서대로 이동 |
| Enter (한 줄 입력) | 제출 |
| Enter (`<textarea>`) | 줄바꿈 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | Row 1열, Actions의 버튼이 폭을 나눠 가진다 |
| ≥ 768px | Row 2열, Actions 오른쪽 정렬 |

모바일 폼의 입력은 `large` 또는 `responsive` size를 쓴다([Text Input](text-input.md)).

## Do / Don't

- **Do** 대부분 필수면 선택 항목에만 `(선택)`을 표시한다.
- **Do** 필드가 많으면 [Form Section](form-section.md)으로 나눈다.
- **Don't** 제출 버튼을 검증 결과로 비활성화하지 않는다.
- **Don't** 입력 중 조합이 끝나지 않은 값에 오류를 띄우지 않는다.
- **Don't** 검증 코드를 화면마다 새로 쓰지 않는다. `data-dw-validate`를 쓴다.
