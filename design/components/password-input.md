# Password Input

> 클래스 `.dw-password-input` · 레퍼런스 [catalog.html#password-input](../catalog.html#password-input)

## 개요

[Text Input](text-input.md)에 표시·숨김 토글을 붙인 비밀번호 입력이다. 라벨·오류는 [Field](field.md)로 붙인다.
**쓰지 말 것** — 인증번호처럼 가릴 필요가 없는 값, 비밀번호가 아닌 일반 입력.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-text-input.dw-password-input` | ✓ | Text Input에 수정자를 더한다 |
| Value | `.dw-text-input__value` | ✓ | `<input type="password">` |
| Toggle | `button.dw-text-input__icon` | ✓ | `data-dw-password-toggle` |
| Show icon | `.dw-password-input__show` | ✓ | `eye`. 가린 상태에서 보인다 |
| Hide icon | `.dw-password-input__hide` | ✓ | `eye-off`. 표시 상태에서 보인다 |

```html
<div class="dw-text-input dw-text-input--responsive dw-password-input">
  <input class="dw-text-input__value" id="pw" type="password" autocomplete="current-password">
  <button class="dw-text-input__icon" type="button" aria-label="비밀번호 표시" aria-pressed="false" data-dw-password-toggle>
    <svg class="dw-password-input__show" aria-hidden="true"><use href="#i-eye"/></svg>
    <svg class="dw-password-input__hide" aria-hidden="true"><use href="#i-eye-off"/></svg>
  </button>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | [Text Input](text-input.md)과 같음 | `medium` | `.dw-text-input--<size>` |
| autocomplete | `current-password` · `new-password` | — | 로그인은 전자, 가입·변경은 후자 |
| invalid | boolean | false | Value에 `aria-invalid="true"` |
| disabled | boolean | false | Value와 Toggle 모두 `disabled` |

## Specification

### 크기

치수는 [Text Input](text-input.md)을 그대로 따른다.

| size | min-height | Toggle 아이콘 | 터치 히트 |
| --- | --- | --- | --- |
| `medium` | 40px `x10` | 16px | 44px |
| `large` | 52px `x13` | 20px | 44px |
| `responsive` | 1280px 미만 `large`, 이상 `medium` | 같음 | 44px |

### 색

| 부위 | 상태 | 값 |
| --- | --- | --- |
| Toggle 아이콘 | 기본 | `fg-neutral-muted` |
| Toggle 아이콘 | hover(정밀 포인터) | `fg-neutral` |
| Toggle 아이콘 | disabled | `fg-disabled` |
| Toggle 포커스 | focus-visible | 2px `stroke-focus-ring`, 간격 2px |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hidden | 기본 | `type="password"`, `aria-pressed="false"`, `eye` | — |
| Visible | Toggle 누름 | `type="text"`, `aria-pressed="true"`, `eye-off` | 없음(즉시) |
| Invalid·Disabled·Readonly | [Text Input](text-input.md) | 같다. 단 Readonly에서도 Toggle은 동작한다 | — |

## Behavior & Accessibility

- `components.js`가 `[data-dw-password-toggle]` 클릭을 받아 같은 Root의 Value `type`과 `aria-pressed`를 바꾼다.
- Toggle의 `aria-label`은 **"비밀번호 표시"로 고정**하고 상태는 `aria-pressed`로만 알린다. 이름까지 바꾸면 "숨기기, 눌림"처럼 뜻이 뒤집혀 읽힌다.
- 값과 포커스를 건드리지 않는다. 포커스는 Toggle에 남는다.
- `type="button"`을 반드시 준다. 없으면 누를 때 폼이 제출된다.
- 브라우저 기본 표시 버튼(`::-ms-reveal`)은 숨긴다. 토글은 하나만 둔다.
- 붙여넣기와 비밀번호 관리자를 막지 않는다.

| 키 | 동작 |
| --- | --- |
| Tab | Value → Toggle → 다음 요소 |
| Enter · Space (Toggle) | 표시·숨김 전환 |
| Enter (Value) | 폼 제출 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` size = `large` |
| ≥ 1280px | `responsive` size = `medium` |

터치 화면에서 Toggle의 히트 영역은 44px이다.

## Do / Don't

- **Do** 규칙은 Field Description에 쓴다("8자 이상 입력하세요").
- **Do** 처음에는 가린 상태로 보여준다.
- **Don't** 비밀번호 확인 입력을 넣느라 토글을 없애지 않는다.
- **Don't** 표시 상태를 저장해 다음 방문에 되살리지 않는다.
