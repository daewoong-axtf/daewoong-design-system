# Searchable Select

> 클래스 `.dw-searchable-select` · 레퍼런스 [storybook.html#searchable-select](../storybook.html#searchable-select)

## 개요

보기가 많은 드롭다운을 글자로 좁혀 고르는 선택 전용 조합이다. [Combobox](combobox.md) 위에 맞는 글자 강조, 지우기, "비면 전체"를 얹었다. 필터 조건에 잘 맞는다.
**쓰지 말 것** — 보기가 6개 이하([Select](select.md)), 서버에서 찾는 목록(Combobox [async](combobox.md#async)), 자유 입력을 값으로 받을 때(Text Input).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-searchable-select.dw-combobox.dw-select` | ✓ | `data-dw="combobox" data-highlight` |
| 그 밖의 부위 | [Combobox Anatomy](combobox.md#anatomy) | ✓ | Clear는 필수로 둔다 |

```html
<div class="dw-searchable-select dw-combobox dw-select dw-select--responsive" data-dw="combobox" data-highlight>
  <div class="dw-text-input dw-text-input--responsive dw-combobox__control">
    <input class="dw-text-input__value" id="vendor" type="text" role="combobox" aria-autocomplete="list"
           aria-expanded="false" aria-controls="vendor-list" autocomplete="off" placeholder="전체">
    <button class="dw-text-input__icon dw-combobox__clear" type="button" aria-label="거래처 지우기" hidden>…circle-x…</button>
    <button class="dw-text-input__icon dw-combobox__toggle" type="button" tabindex="-1" aria-label="목록 열기">…chevron-down…</button>
  </div>
  <div class="dw-select__content dw-combobox__content" hidden>
    <div class="dw-combobox__status" role="status" aria-live="polite"></div>
    <div class="dw-combobox__list" id="vendor-list" role="listbox" aria-label="거래처">
      <div class="dw-select__item" role="option" data-value="a" aria-selected="false">
        <span class="dw-select__item-label">한빛상사</span>
        <svg class="dw-select__check" aria-hidden="true">…check…</svg>
      </div>
    </div>
  </div>
  <input type="hidden" name="vendor">
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` · `responsive` | `medium` | Combobox와 같다 |
| value | 보기 값 또는 빈 값 | 빈 값(전체) | hidden input `value`, 표시 문구는 input `value` |
| placeholder | 문자열 | `전체` | input `placeholder` |
| label | 문자열 | 필수 | Clear 이름("거래처 지우기")과 listbox 이름 |

React는 보기를 문자열 목록(`options`)으로 받는다. 보이는 문구와 값이 같다.

## Specification

크기·색은 [Combobox](combobox.md#specification)와 같다. 다른 것만 적는다.

| 항목 | 값 |
| --- | --- |
| placeholder 글자색 | `fg-neutral-muted` — "전체"는 안내가 아니라 현재 값이다 |
| 강조 | `.dw-combobox__match`, bg `bg-brand-weak`, radius `r1`. 맞는 첫 부분 하나만 |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Empty | 값 없음 | placeholder "전체", Clear 숨김 | |
| Filtering | 글자 입력 | 맞는 보기만 남고 강조, 첫 보기 강조 면 | |
| No result | 맞는 보기 없음 | "검색 결과가 없어요" | |
| Selected | 보기 선택 | 값 갱신, 닫힘, Clear 표시 | |
| Cleared | Clear·입력을 다 지우고 벗어남 | 값 비움(전체), 입력으로 포커스 | |

## Behavior & Accessibility

키보드·ARIA는 [Combobox](combobox.md#behavior--accessibility)를 따른다.

- **목록에서 골라야 값이 바뀐다.** 친 글자로 조회하지 않는다. 고르지 않고 벗어나면 입력은 이전 값으로 돌아간다.
- 부분일치로 좁힌다. 한글 조합 중에도 좁힌다.
- 선택은 한 번에 끝나는 행동이라 [interaction.md 11장](../guides/interaction.md#11-목록-검색필터)의 Select처럼 바꾸는 즉시 조회한다.
- 보기에 없는 값(URL로 들어온 값)도 지우지 않는다. 서버가 input `value`와 hidden input에 그 값을 그대로 넣으면 보인다.

| 키 | 동작 |
| --- | --- |
| 글자 입력 | 좁히기 |
| ↓ ↑ · Enter · Esc | Combobox와 같다 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` = `large`, 보기 높이 46px |

## Do / Don't

- **Do** 조건 시트의 긴 보기 목록에 쓴다.
- **Don't** 입력을 그대로 검색어로 보내지 않는다. 그 자리는 검색 입력이다.
