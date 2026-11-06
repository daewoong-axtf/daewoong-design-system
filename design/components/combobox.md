# Combobox

> 클래스 `.dw-combobox` · 레퍼런스 [catalog.html#combobox](../catalog.html#combobox)

## 개요

글자를 쳐서 목록을 좁히고 그중 하나(또는 여럿)를 고르는 입력이다. 보기가 화면에 있으면 로컬로 좁히고, 많으면 [async](#async)로 입력마다 서버에서 찾는다.
**쓰지 말 것** — 보기가 적을 때([Select](select.md)), 필터 드롭다운([Searchable Select](searchable-select.md)), 목록 검색([Text Input](text-input.md) + 검색 실행), 자유 입력을 값으로 받을 때.

## Anatomy

입력은 Text Input, 목록은 Select의 Content·Item을 그대로 쓴다.

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-combobox.dw-select` | ✓ | `data-dw="combobox"`, 위치 기준. `.dw-select--<size>`로 목록 크기를 정한다 |
| Control | `.dw-text-input.dw-combobox__control` | ✓ | `.dw-text-input--<size>`로 Root와 같은 크기를 준다 |
| Input | `.dw-text-input__value` | ✓ | `role="combobox"` |
| Clear | `.dw-text-input__icon.dw-combobox__clear` | | `circle-x`, 값이 있을 때만 |
| Toggle | `.dw-text-input__icon.dw-combobox__toggle` | ✓ | `chevron-down`, `tabindex="-1"` |
| Content | `.dw-select__content.dw-combobox__content` | ✓ | 스크롤 영역. role 없음 |
| Status | `.dw-combobox__status` | ✓ | `role="status" aria-live="polite"`. 비워서 둔다 |
| Retry | `.dw-button.dw-combobox__retry` | async | "다시 시도", `hidden` |
| List | `.dw-combobox__list` | ✓ | `role="listbox"` + 이름 |
| Item | `.dw-select__item` | ✓ | `role="option"`. Label·Description·Check는 Select와 같다 |
| Reason | `.dw-badge` | | 고를 수 없는 사유. Check 자리 |
| Match | `.dw-combobox__match` | | 맞는 글자 강조(`data-highlight`) |
| Value | `input[type="hidden"]` | ✓ | Root 바로 아래. 제출 값 |
| Chips · Chip | `.dw-combobox__chips` · `.dw-combobox__chip` | 다중 | Input 앞. `.dw-combobox__chip-label`, `.dw-combobox__chip-remove` |

```html
<div class="dw-combobox dw-select dw-select--responsive" data-dw="combobox">
  <div class="dw-text-input dw-text-input--responsive dw-combobox__control">
    <input class="dw-text-input__value" id="city" type="text" role="combobox" aria-autocomplete="list"
           aria-expanded="false" aria-controls="city-list" autocomplete="off" placeholder="도시 검색">
    <button class="dw-text-input__icon dw-combobox__toggle" type="button" tabindex="-1" aria-label="목록 열기">…chevron-down…</button>
  </div>
  <div class="dw-select__content dw-combobox__content" hidden>
    <div class="dw-combobox__status" role="status" aria-live="polite"></div>
    <div class="dw-combobox__list" id="city-list" role="listbox" aria-label="도시">
      <div class="dw-select__item" role="option" id="city-seoul" data-value="seoul" aria-selected="false">
        <span class="dw-select__item-label">서울</span>
        <svg class="dw-select__check" aria-hidden="true">…check…</svg>
      </div>
    </div>
  </div>
  <input type="hidden" name="city">
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` · `responsive` | `medium` | Root `.dw-select--<size>` + Control `.dw-text-input--<size>` |
| value | 보기 값 | 없음 | hidden input `value` + input `value`(문구) + Item `aria-selected` |
| multiple | boolean | false | Root `data-multiple`, `data-name="<제출 이름>"`. hidden input을 두지 않는다 |
| highlight | boolean | false | Root `data-highlight` |
| invalid · disabled · readonly · required | boolean | false | Input `aria-invalid` / `disabled` / `readonly` / `required` |
| 문구 | 문자열 | 아래 표 | Root `data-msg-idle`·`-loading`·`-empty`·`-error`·`-results`·`-remove` |

| 문구 | 기본값 |
| --- | --- |
| 입력 전 | `N자 이상 입력해주세요` |
| 검색 중 | `검색 중…` |
| 결과 없음 | `검색 결과가 없어요` |
| 오류 | `검색하지 못했어요. 다시 시도해주세요.` |
| 결과 수 낭독 | `검색 결과 {count}개` |
| 칩 빼기 | `{label} 빼기` |

값이 바뀌면 hidden input이 `change`를 내고 Root가 `dw:combobox-change`를 낸다. `detail`은 단일이 `{ value, label }`, 다중이 `{ values: [{ value, label }] }`다.

## Specification

Control은 [Text Input](text-input.md#specification), Content·Item은 [Select](select.md#specification)의 수치와 색을 그대로 쓴다. 다른 것만 적는다.

| 항목 | 값 |
| --- | --- |
| Toggle | 크기는 Text Input 아이콘, `fg-neutral-muted`, hover `fg-neutral`, 터치 히트 44px |
| Clear | Toggle과 같고 색은 `fg-neutral-subtle` |
| Status | padding 8px 16px (`x2` `x4`), 글자는 Item Label과 같은 크기, `fg-neutral-subtle`, 가운데 정렬. 결과가 있으면 스크린 리더에만 읽힌다 |
| 스피너 | Select 아이콘 크기, 2px 고리, `stroke-neutral-muted`/`fg-neutral-muted`, 0.8s 회전(움직임 줄이기 3s) |
| Retry | Button `neutral-weak` `small`, 가운데, 아래 8px `x2` |
| Match | bg `bg-brand-weak`, radius 4px `r1` |
| Chip | 높이 28px `x7`, padding 8px·4px, radius 8px `r2`, bg `bg-neutral-weak-alpha`, t3 13/18 medium, 말줄임 |
| Chip Remove | 20px `x5`, 아이콘 14px `fg-neutral-muted`, 터치 히트 44px |
| 다중 Control | 칩과 입력이 줄을 바꾼다. padding 4px 0 4px 8px, 입력 최소 폭 64px `x16`, 높이는 내용을 따른다 |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Closed | — | Content `hidden`, `aria-expanded="false"` | |
| Open | 입력 클릭·Toggle·↓·↑·글자 입력 | Content 표시. 선택된 Item이 보이면 강조 | Select 열기 |
| Filtering | 글자 입력 | 맞는 Item만 남고 첫 Item 강조 | |
| No result | 맞는 Item 없음 | List `hidden`, Status "검색 결과가 없어요" | |
| Highlighted | 화살표·hover | Select Item 강조 면 | Select와 같다 |
| Selected (단일) | 클릭·Enter | 입력에 문구, 값 갱신, 닫힘 | Select 닫기 |
| Selected (다중) | 클릭·Enter | 칩 추가(이미 있으면 뺌), 입력 비움, 열림 유지 | |
| Dismissed | Esc·Tab·바깥 클릭 | 닫고 입력은 확정 값의 문구로 돌아간다. 입력을 다 지웠으면 값도 비운다 | Select 닫기 |

## Behavior & Accessibility

WAI-ARIA APG **Editable Combobox With List Autocomplete** 패턴.

- Input: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls="<list id>"`, 강조 중 `aria-activedescendant`. 포커스는 Input에 머문다.
- **목록에서 골라야 값이 된다.** 친 글자는 값이 아니다.
- 고른 값의 문구로는 좁히지 않는다. 다시 열면 전체 목록이 보인다.
- 한글은 조합 중에도 좁힌다. `compositionend`를 기다리지 않고 `input` 이벤트를 쓴다. 조합 중인 키 입력(`isComposing`)은 목록 조작에 쓰지 않는다.
- 아래 공간이 192px보다 좁으면 위로 편다. 위·아래는 열 때 정하고 결과가 바뀌어도 뒤집지 않는다.
- 모달·시트 본문 안에서는 Select처럼 화면 기준(`position: fixed`)으로 띄워 잘리지 않고, 본문이 스크롤되면 입력을 따라간다.
- 모달 안의 Esc는 목록만 닫는다.
- 폼 검증은 Input으로 돈다. 다중의 `required`는 칩이 있으면 풀린다.

| 키 | 동작 |
| --- | --- |
| ↓ · ↑ | (닫힘) 열기 · (열림) 다음/이전 Item, disabled 건너뜀, 끝에서 멈춤 |
| Enter | (열림) 강조된 Item 선택, 없으면 닫기. 응답 대기 중이면 무시. 오류면 다시 시도 · (닫힘) 폼 제출 |
| Esc | 닫고 입력을 되돌린다 |
| Tab | 닫고 다음 요소로. 오류 상태면 다시 시도 버튼으로 |
| Backspace | (다중, 입력이 빌 때) 마지막 칩 빼기 |
| Home · End | 입력 안 커서 이동 |

## async

입력할 때마다 서버에서 찾는 변형이다. 보기가 많아 페이지에 다 실을 수 없을 때(회원 검색 등) 쓴다. React는 `AsyncCombobox`(`src/components/ui/async-combobox.tsx`)다.

### 명시 실행 규칙의 예외

[interaction.md 11장](../guides/interaction.md#11-목록-검색필터)의 "검색은 사용자가 명시적으로 실행한다"는 **화면의 결과를 바꾸는 필터·목록 검색**의 규칙이다. async는 그것이 아니라 **선택 입력의 자동완성**이다. 치는 동안 바뀌는 것은 팝업 안 후보뿐이고, 화면의 데이터와 URL은 고르기 전까지 그대로다. 그래서 검색 버튼 없이 입력 즉시 조회한다. 결과 목록을 화면에 펼치는 검색에는 쓰지 않는다.

### 연결

Root에 `data-dw-combobox-url`을 준다. **화면 JS 없이 JSON 응답만 맞추면 되어 서버 언어와 무관하므로 이것이 기본이다.** `{query}`는 인코딩해 치환한다.

```html
<div class="dw-combobox dw-select dw-select--responsive" data-dw="combobox"
     data-dw-combobox-url="/api/members?q={query}" data-dw-combobox-min="2">
  <div class="dw-text-input dw-text-input--responsive dw-combobox__control">
    <input class="dw-text-input__value" id="owner" type="text" role="combobox" aria-autocomplete="list"
           aria-expanded="false" aria-controls="owner-list" autocomplete="off" placeholder="이름 입력 (2자 이상)">
    <button class="dw-text-input__icon dw-combobox__clear" type="button" aria-label="담당 회원 지우기" hidden>…circle-x…</button>
    <button class="dw-text-input__icon dw-combobox__toggle" type="button" tabindex="-1" aria-label="목록 열기">…chevron-down…</button>
  </div>
  <div class="dw-select__content dw-combobox__content" hidden>
    <div class="dw-combobox__status" role="status" aria-live="polite"></div>
    <button class="dw-button dw-button--neutral-weak dw-button--small dw-combobox__retry" type="button" hidden>다시 시도</button>
    <div class="dw-combobox__list" id="owner-list" role="listbox" aria-label="담당 회원"></div>
  </div>
  <input type="hidden" name="owner">
</div>
```

서버는 `GET` 요청에 2xx와 아래 JSON 배열로 답한다. 그 밖의 응답은 오류 상태가 된다.

```json
[
  { "value": "m1", "label": "김하늘", "description": "영업팀" },
  { "value": "m3", "label": "김하윤", "disabled": true, "reason": "휴직 중" }
]
```

인증 헤더가 필요하거나 응답 모양이 다르면 `dw:combobox-search`를 받아 화면이 직접 찾는다. 요청 직전 Root에서 버블링되며, `preventDefault()`하면 fetch를 하지 않는다. URL 없이 쓸 때는 Root에 `data-dw-combobox-async`를 둔다.

```js
root.addEventListener('dw:combobox-search', (e) => {
  e.preventDefault()
  const { query, signal, respond, fail } = e.detail
  api.searchMembers(query, { signal }).then(respond, fail)
})
```

### 속성

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| url | `{query}`를 품은 URL | 없음 | `data-dw-combobox-url` |
| async | boolean | false | `data-dw-combobox-async` (이벤트로만 찾을 때) |
| min | 글자 수 | 2 | `data-dw-combobox-min` (React `minLength`) |
| debounce | ms | 400 | `data-dw-combobox-debounce` (React `debounceMs`) |

### 흐름

| 항목 | 규칙 |
| --- | --- |
| debounce | 입력이 400ms 멎으면 요청한다. 한글은 자모마다 입력이 바뀌어 더 짧으면 치는 중에도 요청이 나간다 |
| 최소 글자 수 | 앞뒤 공백을 뺀 길이로 잰다. 미달이면 요청하지 않고 결과를 비우고 입력 전 안내를 보인다 |
| 취소 | 새 입력·닫기가 이전 요청을 `AbortController`로 취소한다. 취소된 요청의 응답은 도착해도 버린다. 서버나 화면이 signal을 무시해도 안전하다 |
| 대기 중 표시 | debounce를 기다리는 동안 직전 결과·안내를 그대로 둔다. 입력마다 바꾸면 그것이 깜빡임이다 |
| 검색 중 지연 | 요청을 보내고 **200ms** 안에 응답이 오면 "검색 중"을 건너뛴다. 넘으면 보이고 직전 결과는 남겨 둔다 |
| 선택 유지 | 고른 값(단일의 문구, 다중의 칩)은 목록과 따로 들고 있어 결과가 바뀌거나 비어도 남는다. 다시 나타난 Item에는 `aria-selected`가 붙는다 |
| 응답 대기 중 Enter | 무시한다. 낡은 결과를 고르지 않게 한다 |
| 응답 뒤 강조 | 첫 고를 수 있는 Item을 강조한다. Enter로 바로 고른다 |

### 상태

Status의 `data-state`로 나뉜다.

| 상태 | `data-state` | 표시 | 낭독 |
| --- | --- | --- | --- |
| 입력 전 | `idle` | "2자 이상 입력해주세요" | 안내 문구 |
| 검색 중 | `loading` | 스피너 + "검색 중…" | "검색 중…" |
| 결과 | `results` | Item 목록 (Status는 숨김) | "검색 결과 3개" |
| 결과 없음 | `empty` | "검색 결과가 없어요" | 같은 문구 |
| 오류 | `error` | 문구 + Retry | 같은 문구 |

- 요청이 나가 있는 동안 List는 `aria-busy="true"`다.
- 결과 수와 상태는 Status의 `aria-live="polite"`로 읽힌다.
- Retry는 debounce 없이 같은 검색어로 다시 요청하고 포커스를 입력으로 돌린다. Enter도 같다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1280px | `responsive` = `large`. 입력 52px, 보기 46px |
| 터치 | Clear·Toggle·Chip Remove 히트 44px |
| 다중 | 칩이 많으면 Control이 세로로 자란다 |

## Do / Don't

- **Do** placeholder에 무엇으로 찾는지와 최소 글자 수를 쓴다. 예: "이름 입력 (2자 이상)"
- **Do** 고를 수 없는 보기는 빼지 말고 사유 Badge를 붙인다.
- **Don't** async를 화면 목록 필터로 쓰지 않는다.
- **Don't** Enter로 친 글자를 값으로 삼지 않는다.
