# Search Input

> 클래스 `.dw-search-input` · 레퍼런스 [storybook.html#search-input](../storybook.html#search-input)

## 개요

목록을 검색어로 좁히는 입력이다. [Text Input](text-input.md)에 돋보기와 `data-dw-clear` 지우기 버튼을 얹어 `<form role="search">`로 묶는다.
**쓰지 말 것** — 일반 폼 안의 값 입력(Text Input), 타이핑마다 후보를 고르는 입력(Combobox).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `form.dw-search-input` | ✓ | `role="search"`. 필터 값이 더 있으면 함께 담는다 |
| Input | `.dw-text-input` | ✓ | [Text Input](text-input.md) |
| Search icon | `.dw-text-input__icon` | ✓ | 값 앞 `search` |
| Value | `.dw-text-input__value` | ✓ | `type="search"`, `name`, `aria-label`, `enterkeyhint="search"` |
| Clear | `button.dw-text-input__icon` | ✓ | `data-dw-clear`, 값 뒤 `circle-x` |
| Submit | `.dw-button` | | [검색] 버튼. 없으면 Enter로만 실행한다 |

```html
<form class="dw-search-input" role="search" action="/orders" method="get">
  <div class="dw-text-input dw-text-input--responsive">
    <svg class="dw-text-input__icon" aria-hidden="true"><use href="#i-search"/></svg>
    <input class="dw-text-input__value" type="search" name="q" aria-label="주문 검색" placeholder="주문 번호·회원 이름" enterkeyhint="search">
    <button class="dw-text-input__icon" type="button" aria-label="입력 지우기" data-dw-clear hidden><svg aria-hidden="true"><use href="#i-circle-x"/></svg></button>
  </div>
  <button class="dw-button dw-button--neutral-solid dw-button--medium" type="submit">검색</button>
</form>
```

값을 채워 그릴 때는 Clear의 `hidden`을 뺀다.

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` · `responsive` | `medium` | `.dw-text-input--<size>` |
| submit button | boolean | true | Submit 유무 |

## Specification

### 크기

| 항목 | 값 |
| --- | --- |
| Root | flex, gap 8px `x2`, 폭 100%. Input이 남은 폭을 채운다 |
| Input | [Text Input](text-input.md) 크기 표 |
| Submit | `medium`. 입력이 `responsive`면 1280px 미만에서 높이 52px `x13`로 입력과 맞춘다 |

### 색

| 부위 | 값 |
| --- | --- |
| Input | [Text Input](text-input.md) |
| Submit | [Button](button.md) `neutral-solid` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Empty | 값 없음 | Clear 숨김 | — |
| Typing | 입력 | Clear 표시. **조회하지 않는다** | — |
| Searched | Enter · Submit | 값을 URL 쿼리에 남기고 페이지 1로 조회 | — |
| Cleared | Clear | 값을 비우고 Value로 포커스, 바로 폼을 제출해 전체 조회 | — |

## Behavior & Accessibility

- 조회는 사용자가 실행한다([interaction.md 11장](../guides/interaction.md#11-목록-검색필터)). `input` 이벤트로 조회하지 않는다.
- Clear의 값 비움·포커스 복귀는 Text Input의 `data-dw-clear`가 맡는다. `components.js`는 그 뒤에 `form.dw-search-input`이면 `requestSubmit()`을 호출한다. Text Input을 단독으로 쓸 때의 지우기는 값만 비운다.
- 페이지 번호를 폼에 넣지 않으면 GET 제출만으로 페이지가 1로 돌아간다. 다른 필터는 `<input type="hidden">`으로 유지한다.
- 빈 값으로 제출하면 전체 조회다.
- 목록만 갈아끼우는 화면은 `submit`에서 `preventDefault()` 후 조회한다. 페이지 전체를 다시 그리면 포커스가 사라지므로 지우기로 돌아온 응답은 입력에 포커스를 준다.
- 결과 건수 변화는 [접근성 가이드](../guides/accessibility.md)대로 `role="status"`로 알린다.

| 키 | 동작 |
| --- | --- |
| Enter | 조회 |
| Esc | 브라우저 기본으로 값만 비운다. 조회는 하지 않는다 |
| Tab | Value → Clear → Submit |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` size = `large`, Submit 높이를 맞춘다 |
| 전체 | Input이 줄고 Submit 폭은 유지한다 |

터치 화면에서 Clear의 히트 영역은 44px이다. 모바일에서는 글자가 16px인 `large` 또는 `responsive`를 쓴다.

## Do / Don't

- **Do** placeholder에 찾을 수 있는 항목을 쓴다("주문 번호·회원 이름").
- **Do** 조회한 값을 입력에 남긴다.
- **Don't** 타이핑 중 조회하지 않는다.
- **Don't** placeholder를 라벨로 삼지 않는다. `aria-label`을 준다.
