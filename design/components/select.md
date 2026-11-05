# Select

> 클래스 `.dw-select` · 레퍼런스 [component.html#select](../component.html#select)

## 개요

7개 이상(또는 공간이 좁을 때 2개 이상)의 보기 중 하나를 고르는 드롭다운이다. 라벨·오류는 [Field](field.md)로 붙인다.
**쓰지 말 것** — 보기가 적고 공간이 있을 때(Radio), 검색이 필요한 긴 목록(검색 입력 + 목록, v1.1).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-select` | ✓ | `data-dw="select"`, 위치 기준 |
| Trigger | `.dw-select__trigger` | ✓ | `<button role="combobox">` — 모양은 Text Input과 같은 상자 |
| Value | `.dw-select__value` | ✓ | 선택된 보기 문구 또는 placeholder(`data-placeholder`) |
| Chevron | `.dw-select__chevron` | ✓ | `chevron-down` |
| Content | `.dw-select__content` | ✓ | `role="listbox"` 팝업 |
| Group | `.dw-select__group` | | 보기 묶음, 묶음 사이 구분선 |
| Group label | `.dw-select__group-label` | | |
| Item | `.dw-select__item` | ✓ | `role="option"` |
| Item label · description | `.dw-select__item-label` · `.dw-select__item-description` | | 설명은 선택 |
| Indicator | `.dw-select__check` | ✓ | 선택된 Item의 `check` |

```html
<div class="dw-select dw-select--medium" data-dw="select">
  <button type="button" class="dw-select__trigger" role="combobox" aria-haspopup="listbox"
          aria-expanded="false" aria-controls="city-list" aria-labelledby="city-label city-value">
    <span class="dw-select__value" id="city-value" data-placeholder>도시 선택</span>
    <svg class="dw-select__chevron" aria-hidden="true">…</svg>
  </button>
  <div class="dw-select__content" id="city-list" role="listbox" aria-labelledby="city-label" hidden>
    <div class="dw-select__item" role="option" id="city-seoul" aria-selected="false">
      <span class="dw-select__item-label">서울</span>
      <svg class="dw-select__check" aria-hidden="true">…</svg>
    </div>
  </div>
  <input type="hidden" name="city">
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` · `responsive` | `medium` | `.dw-select--<size>` (`responsive`는 1280 미만 large) |
| value | 보기 하나 | 없음(placeholder) | Item `aria-selected="true"`, hidden input 값 |
| invalid · disabled · readonly | boolean | false | Trigger `aria-invalid` / `disabled` / `aria-readonly` |

## Specification

### Trigger

| size | height | padding-inline | gap | radius | font | 아이콘 |
| --- | --- | --- | --- | --- | --- | --- |
| `medium` | 40px `x10` | 14px `x3_5` | 8px `x2` | 8px `r2` | t4 14/19 | 16px |
| `large` | 52px `x13` | 16px `x4` | 10px `x2_5` | 12px `r3` | t5 16/22 | 20px |

| 상태 | 값 |
| --- | --- |
| 기본 | bg `bg-transparent`, 테두리 `inset 0 0 0 1px stroke-neutral-weak`, 그림자 `shadow-s1`, Value `fg-neutral`, placeholder `fg-placeholder`, Chevron `fg-neutral-muted` |
| hover | bg `bg-transparent-pressed` |
| 열림·포커스 | `::after` 2px `stroke-neutral-contrast` (Text Input 포커스와 같음) |
| focus-visible | `outline 2px stroke-focus-ring`, offset 2px |
| invalid | `::after` 2px `stroke-critical-solid` |
| disabled | bg `bg-disabled`, 글자·아이콘 `fg-disabled` |
| readonly | bg `bg-disabled`, 글자 `fg-neutral`, 열리지 않음 |

Value는 한 줄 말줄임(`text-overflow: ellipsis`).

### Content

| 항목 | 값 |
| --- | --- |
| 위치 | Trigger 바로 아래 4px, 폭 = Trigger 폭. 아래 공간이 부족하면 위로 |
| 모양 | bg `bg-layer-floating`, radius 20px `r5`, `shadow-s3`, `overflow: hidden` |
| 스크롤 영역 | 최대 높이 `min(480px, 남은 화면 높이)`, padding 위아래 8px `x2`, 묶음 사이 gap 8px `x2` |
| 묶음 구분선 | 두 번째 묶음부터 위에 1px `stroke-neutral-muted`, 좌우 16px 들여서, 아래 8px |
| Group label | medium: t3 13/18 regular, padding 8px 16px · large: t4 14/19 medium, padding 10px 16px · 색 `fg-neutral-subtle` |
| 열기 모션 | opacity 0→1 + scale 0.95→1, `duration-d3` `easing-enter` (기준점 = Trigger 쪽 가장자리) |
| 닫기 모션 | opacity 1→0, `duration-d2` `easing-exit` |

### Item

| size | padding | gap | 앞 아이콘 | label | description | check |
| --- | --- | --- | --- | --- | --- | --- |
| `medium` | 10px 16px (`x2_5` `x4`) | 8px | 18px | t4 14/19 | t2 12/16 | 12px |
| `large` | 12px 16px (`x3` `x4`) | 12px | 22px | t5 16/22 | t3 13/18 | 14px |

- label `fg-neutral` regular, description `fg-neutral-subtle`, check·아이콘 `fg-neutral`. disabled는 모두 `fg-disabled`.
- 강조(키보드 이동·hover)·누름: Item 뒤에 좌우 8px 들인 radius 12px `r3` 면이 `bg-transparent-pressed`로 깔린다(`::before`, `inset-inline` 0→8px 전환 `duration-d3`).

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Closed | — | Content `hidden` |
| Open | Trigger 클릭·Enter·Space·↓·↑ | Content 표시, 선택된 Item(없으면 첫 Item) 강조 |
| Highlighted | 화살표·hover | Item 강조 면 |
| Selected | 클릭·Enter | Value 갱신, Content 닫힘, 포커스 Trigger로 |

## Behavior & Accessibility

필수 Select는 Trigger에 `aria-required="true"`를 붙인다. 폼 제출 검증은 hidden input 값이 비었는지로 판단한다.

WAI-ARIA APG **Select-Only Combobox** 패턴.

- Trigger: `role="combobox"`, `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, 강조 중 `aria-activedescendant="<item id>"`. 포커스는 Trigger에 머문다.
- Content: `role="listbox"`, Item: `role="option"` + `aria-selected`, 비활성은 `aria-disabled="true"`.
- 바깥 클릭·Esc·Tab으로 닫힌다(Tab은 닫고 다음 요소로).
- 폼 값은 hidden input으로 제출.

| 키 | 동작 |
| --- | --- |
| Enter · Space · ↓ · ↑ | (닫힘) 열기 |
| ↓ / ↑ | (열림) 다음/이전 Item 강조 (disabled 건너뜀, 끝에서 멈춤) |
| Home / End | 처음/마지막 Item |
| Enter · Space | 강조된 Item 선택 후 닫기 |
| Esc | 선택 없이 닫기 |
| 문자 입력 | 그 글자로 시작하는 Item 강조 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` = `large` |
| < 768px | 보기가 10개 이상이면 Content 대신 Bottom Sheet 목록으로 열 수 있다(선택 사항) |

## Do / Don't

- **Do** placeholder는 "○○ 선택" 형태로 쓴다.
- **Don't** 보기 2–3개짜리를 Select로 숨기지 않는다(Radio·Segmented Control).
