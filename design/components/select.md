# Select

> 클래스 `.dw-select` · 레퍼런스 [storybook.html#select](../storybook.html#select)

## 개요

7개 이상(또는 공간이 좁을 때 2개 이상)의 보기 중 하나 또는 여러 개를 고르는 드롭다운이다. 라벨·오류는 [Field](field.md)로 붙인다.
**쓰지 말 것** — 보기가 적고 공간이 있을 때(Radio), 검색이 필요한 긴 목록([Searchable Select](searchable-select.md)).

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
| Chip | `.dw-select__chip` | 다중 | 고른 값. Value 안에 쌓인다. Trigger가 버튼이라 칩에는 버튼을 넣지 않는다 |

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

앞 아이콘은 Value 앞에 `.dw-select__icon`으로 넣는다. 상태 아이콘은 Chevron 앞에 둔다.

```html
<svg class="dw-select__icon" aria-hidden="true">…</svg>
<span class="dw-select__value">서울</span>
<span class="dw-select__status" aria-hidden="true">
  <svg class="dw-select__status-critical">…circle-alert…</svg>
  <svg class="dw-select__status-positive">…circle-check…</svg>
</span>
<svg class="dw-select__chevron" aria-hidden="true">…</svg>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` · `responsive` | `medium` | `.dw-select--<size>` (`responsive`는 1280 미만 large) |
| value | 보기 하나 | 없음(placeholder) | Item `aria-selected="true"`, hidden input 값 |
| invalid · disabled · readonly | boolean | false | Trigger `aria-invalid` / `disabled` / `aria-readonly` |
| valid | boolean | false | Field Root에 `data-valid` |
| leading icon | 아이콘 | 없음 | `.dw-select__icon` |

긴 값은 한 줄에서 말줄임한다. 줄을 바꾸지 않는다. 전체 문구는 목록을 열어 확인한다.

## 다중 선택

Root에 `data-multiple`을 주고, 제출 이름은 `data-name`, 값이 없을 때의 문구는 `data-placeholder`에 적는다. Content에는 `aria-multiselectable="true"`를 붙인다. 처음부터 고른 값이 있으면 칩과 hidden input을 마크업에 함께 적는다. 이후의 칩과 hidden input은 스크립트가 맞춘다.

```html
<div class="dw-select dw-select--medium" data-dw="select" data-multiple data-name="region" data-placeholder="지역 선택">
  <button type="button" class="dw-select__trigger" role="combobox" aria-haspopup="listbox"
          aria-expanded="false" aria-controls="region-list" aria-labelledby="region-label region-value">
    <span class="dw-select__value" id="region-value"><span class="dw-select__chip">서울</span></span>
    <svg class="dw-select__chevron" aria-hidden="true">…</svg>
  </button>
  <div class="dw-select__content" id="region-list" role="listbox" aria-multiselectable="true" aria-labelledby="region-label" hidden>
    <div class="dw-select__item" role="option" id="region-seoul" data-value="seoul" aria-selected="true">…</div>
    <div class="dw-select__item" role="option" id="region-busan" data-value="busan" aria-selected="false">…</div>
  </div>
  <input type="hidden" name="region" value="seoul">
</div>
```

| 항목 | 동작 |
| --- | --- |
| 고르기 | 켜고 끈다. 목록은 Esc, Tab, Trigger, 바깥 클릭으로 닫는다 |
| 빼기 | 목록에서 다시 누른다 |
| 폼 값 | 고른 값마다 같은 이름의 hidden input을 둔다. 고른 값이 없으면 hidden input도 없다 |
| 칩 순서 | 목록 순서를 따른다 |
| 필수 | `aria-required="true"`이면 하나 이상 골라야 한다 |
| 이벤트 | 바뀔 때마다 Root가 `dw:select-change`를 낸다. `detail`은 `{ values: [{ value, label }] }` |
| React | `MultiSelect`(`options`, `value`, `onValueChange`, `placeholder`, `name`) |

| 고르는 것 | 쓰는 곳 |
| --- | --- |
| Select 다중 선택 | 보기가 짧아 목록에서 바로 찾을 수 있을 때 |
| [Combobox](combobox.md) `multiple` | 보기가 많아 검색이 필요할 때, 칩을 바로 지워야 할 때 |
| [Checkbox](checkbox.md) | 보기가 6개 이하이고 자리가 있을 때 |

## Specification

### Chip (다중)

| 항목 | 값 |
| --- | --- |
| Trigger | 높이는 표의 값이 최소이고 칩이 늘면 줄을 바꿔 커진다. 위아래 padding 4px `x1` |
| Chip | 높이 28px `x7`, 좌우 8px `x2`, 간격 4px `x1`, 모서리 8px `r2`, `bg-neutral-weak-alpha`, t3 13 medium |
| 긴 값 | 칩 안에서 말줄임한다 |
| disabled | 글자 `fg-disabled` |

### Trigger

| size | height | padding-inline | gap | radius | font | 아이콘 |
| --- | --- | --- | --- | --- | --- | --- |
| `medium` | 40px `x10` | 14px `x3_5` | 8px `x2` | 8px `r2` | t4 14/19 | 16px |
| `large` | 52px `x13` | 16px `x4` | 10px `x2_5` | 12px `r3` | t5 16/22 | 20px |

| 상태 | 값 |
| --- | --- |
| 기본 | bg `bg-transparent`, 테두리 `inset 0 0 0 1px stroke-neutral-weak`, 그림자 없음, Value `fg-neutral`, placeholder `fg-neutral-subtle`, Chevron `fg-neutral-muted` |
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
| Selected | 클릭·Enter | Value 갱신, Content 닫힘, 포커스 Trigger로. 다중은 Content가 열려 있다 |

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
| Enter · Space | 강조된 Item 선택 후 닫기. 다중은 켜고 끄며 닫지 않는다 |
| Esc | 선택 없이 닫기. 다중은 이미 고른 값을 유지한다 |
| 문자 입력 | 그 글자로 시작하는 Item 강조 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` = `large` |
| < 768px | 보기가 10개 이상이면 Content 대신 Bottom Sheet 목록으로 열 수 있다(선택 사항) |

## Do / Don't

- **Do** placeholder는 "○○ 선택" 형태로 쓴다.
- **Don't** 보기 2–3개짜리를 Select로 숨기지 않는다(Radio·Segmented Control).
