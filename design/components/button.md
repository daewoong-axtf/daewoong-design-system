# Button

> 클래스 `.dw-button` · 레퍼런스 [catalog.html#button](../catalog.html#button)

## 개요

사용자가 명확한 행동(저장·다음·삭제 등)을 실행하게 하는 기본 컨트롤이다.
**쓰지 말 것** — 다른 페이지로 이동만 하는 경우(링크 `<a>`를 쓴다. 모양이 버튼이어야 하면 `<a class="dw-button">`), 선택 상태를 켜고 끄는 경우(Chip·Switch·Segmented Control).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Container | `.dw-button` | ✓ | 배경·테두리·모서리 |
| Prefix icon | `.dw-button__icon` (라벨 앞) | | 라벨 왼쪽 아이콘 |
| Label | 텍스트 노드 또는 `<span>` | ✓(icon-only 제외) | 동사로 끝나는 짧은 문구 |
| Suffix icon | `.dw-button__icon` (라벨 뒤) | | 라벨 오른쪽 아이콘(드롭다운 ▾ 등) |
| Spinner | `.dw-button__spinner` | loading일 때 | 로딩 표시. 라벨은 자리를 유지한 채 숨는다 |

```html
<button type="button" class="dw-button dw-button--brand-solid dw-button--medium">
  <svg class="dw-button__icon" aria-hidden="true">…</svg>
  저장
</button>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| variant | `brand-solid` · `brand-secondary-solid` · `neutral-solid` · `neutral-weak` · `critical-solid` · `brand-outline` · `neutral-outline` · `ghost` | `neutral-weak` | `.dw-button--<variant>` |
| size | `xsmall` · `small` · `medium` · `large` | `medium` | `.dw-button--<size>` |
| layout | `with-text` · `icon-only` | `with-text` | icon-only는 `.dw-button--icon-only` |
| width | 내용 맞춤 · 가득 | 내용 맞춤 | 가득은 `.dw-button--full` (`width: 100%`) |
| disabled | boolean | false | `disabled` 속성 (`<a>`면 `aria-disabled="true"`) |
| loading | boolean | false | `data-loading` 속성 + `aria-busy="true"` |

## Specification

### 크기

| size | height | padding-inline (with-text) | padding (icon-only) · min-width | gap | radius | font | prefix·suffix icon | icon-only icon | spinner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `xsmall` | 32px `x8` | 14px `x3_5` | 6px `x1_5` · 32px | 4px `x1` | `full` | t3 13/18 bold | 14px | 14px | 14px |
| `small` | 36px `x9` | 14px `x3_5` | 8px `x2` · 36px | 4px `x1` | 8px `r2` | t4 14/19 bold | 14px | 16px | 14px |
| `medium` | 40px `x10` | 16px `x4` | 10px `x2_5` · 40px | 6px `x1_5` | 8px `r2` | t4 14/19 bold | 16px | 18px | 16px |
| `large` | 52px `x13` | 20px `x5` | 14px `x3_5` · 52px | 8px `x2` | 12px `r3` | t6 18/24 bold | 22px | 22px | 18px |

- 높이는 고정이다(`height`). 라벨은 한 줄(`white-space: nowrap`).
- 폰트 두께는 모든 variant에서 `font-weight-bold`(700). `ghost`도 같다.
- 아이콘 색은 글자색(`currentColor`)을 따른다.
- `outline` 계열 테두리는 1px `solid`, 그림자 없음.
- 높이 32·36·40px 버튼은 터치 화면에서 히트 영역을 44px로 넓힌다(투명 `::before`). 시각 크기는 바꾸지 않는다.

### 위계

| variant | 쓰는 상황 | 예시 |
| --- | --- | --- |
| `brand-solid` | 화면의 대표 행동. 화면당 1개 | 저장, 신청하기 |
| `brand-secondary-solid` | 대표 행동과 나란히 놓이는 두 번째 행동 | 임시 저장, 내보내기 |
| `neutral-weak` | 부담 없는 행동 | 취소, 닫기 |

새 화면의 어두운 버튼은 `brand-secondary-solid`를 쓴다. 두 어두운 색을 나란히 두면 구분이 약해서 `neutral-solid`는 기존 화면을 유지할 때만 쓴다.

### 색

`hover`는 정밀 포인터(`@media (hover: hover) and (pointer: fine)`)에서만, `pressed`는 터치(그 밖)에서 `:active`일 때 적용한다. 두 상태의 색은 같다.

| variant | 상태 | bg | fg (글자·아이콘) | stroke |
| --- | --- | --- | --- | --- |
| `brand-solid` | 기본 | `bg-brand-solid` | `fg-on-brand-solid` | — |
| | hover · pressed · loading | `bg-brand-solid-pressed` | `fg-on-brand-solid` | — |
| `brand-secondary-solid` | 기본 | `bg-brand-secondary-solid` | `fg-on-brand-secondary-solid` | — |
| | hover · pressed · loading | `bg-brand-secondary-solid-pressed` | `fg-on-brand-secondary-solid` | — |
| `neutral-solid` | 기본 | `bg-neutral-solid` | `fg-on-neutral-solid` | — |
| | hover · pressed · loading | `bg-neutral-solid-pressed` | `fg-on-neutral-solid` | — |
| `neutral-weak` | 기본 | `bg-neutral-weak` | `fg-neutral` | — |
| | hover · pressed · loading | `bg-neutral-weak-pressed` | `fg-neutral` | — |
| `critical-solid` | 기본 | `bg-critical-solid` | `fg-on-critical-solid` | — |
| | hover · pressed · loading | `bg-critical-solid-pressed` | `fg-on-critical-solid` | — |
| `brand-outline` | 기본 · loading | `bg-transparent` | `fg-brand` | `stroke-neutral-weak` |
| | hover · pressed | `bg-transparent-pressed` | `fg-brand` | `stroke-neutral-muted` |
| `neutral-outline` | 기본 · loading | `bg-transparent` | `fg-neutral` | `stroke-neutral-weak` |
| | hover · pressed | `bg-transparent-pressed` | `fg-neutral` | `stroke-neutral-muted` |
| `ghost` | 기본 | `bg-transparent` | `fg-neutral` | — |
| | hover · pressed · loading | `bg-transparent-pressed` | `fg-neutral` | — |
| solid·weak 계열 | disabled | `bg-disabled` | `fg-disabled` | — |
| outline 계열 | disabled | `bg-transparent` | `fg-disabled` | `stroke-neutral-weak` |
| `ghost` | disabled | `bg-transparent` | `fg-disabled` | — |

스피너 트랙·진행 색:

| variant | track | range |
| --- | --- | --- |
| solid 계열(`brand`·`brand-secondary`·`neutral`·`critical`) | `static-white-alpha-300` | 해당 `fg-on-*-solid` |
| `neutral-weak` · `neutral-outline` · `ghost` | `fg-disabled` | `fg-neutral` |
| `brand-outline` | `bg-brand-weak-pressed` | `bg-brand-solid` |

> `static-white-alpha-300`은 테마와 무관한 고정 색이라 팔레트지만 직접 쓴다(`static-*` 계열만 허용).

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Enabled | — | 위 기본 색 | — |
| Hover | 정밀 포인터 올림 | bg → pressed 색 | `background-color` `duration-color-transition`(150ms) `easing-easing` |
| Pressed | `:active` | 터치에선 bg → pressed 색, 모든 입력에서 `scale` 축소(아래) | `scale` `duration-pressed-scale`(150ms) `easing-pressed-scale` |
| Focus-visible | 키보드 포커스 | `outline: 2px solid stroke-focus-ring; outline-offset: 2px` | `outline-color` `duration-d3` `easing-easing` |
| Disabled | `disabled` | disabled 색, `cursor: not-allowed`, 누름 축소 없음 | — |
| Loading | `data-loading` | pressed 색(outline 계열은 기본 색), 라벨·아이콘 `visibility: hidden`, 가운데 스피너, 클릭 무시 | — |

누름 축소 배율: height 32·36·40px → `scale-s95`(0.95), 52px → `scale-s97`(0.97). `prefers-reduced-motion: reduce`이면 1(토큰이 자동 처리).

스피너: 원형, 지름은 크기 표의 spinner 값, 선 두께 2px, 트랙 위에 1/4 호(range)가 `0.8s linear infinite`로 회전.

## Behavior & Accessibility

- `<button type="button">`(폼 제출은 `type="submit"`). 이동이면 `<a href>`.
- icon-only는 `aria-label` 필수(예: `aria-label="닫기"`). 아이콘 SVG는 `aria-hidden="true"`.
- disabled `<a>`는 `aria-disabled="true"` + `tabindex="-1"` + 클릭 차단.
- loading 중에는 `aria-busy="true"`, 클릭·Enter·Space를 무시한다. 포커스는 유지한다. 스피너에 `role="progressbar"`나 텍스트를 붙이지 않는다(`aria-busy`로 충분).

| 키 | 동작 |
| --- | --- |
| Enter · Space | 실행(`<button>` 기본 동작) |
| Tab | 다음 요소로 이동(disabled `<button>`은 건너뜀) |

### 구현 세부

- Label은 항상 `<span>`으로 감싼다. loading일 때 Label을 `opacity: 0`으로 숨겨 폭과 접근 가능한 이름을 유지한다. `visibility: hidden`을 쓰면 이름이 사라진다.
- 스피너는 Root의 마지막 자식 `<span class="dw-button__spinner" aria-hidden="true">`이고 `border` 2px로 그린다. Root에 `data-loading aria-busy="true"`를 붙이며 `disabled`는 붙이지 않는다. 키보드 포커스가 유지돼야 한다.
- loading은 cursor `progress`, 누름 축소 없음. disabled와 함께 쓰지 않는다. `prefers-reduced-motion`에서는 회전 주기를 3초로 늦춘다.
- outline 계열의 1px 테두리는 border로 그려 Root 폭에 포함한다(`box-sizing: border-box`).
- "터치 화면"은 `@media (pointer: coarse)`다. 히트 영역은 투명 `::before`로 넓혀 레이아웃을 바꾸지 않는다.
- `.dw-button`만 쓰면 모양이 없다. variant·size 클래스를 항상 같이 쓴다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 크기는 바뀌지 않는다. 하단 고정 CTA는 `large` + `.dw-button--full` |

## Do / Don't

- **Do** 화면당 `brand-solid`는 1개(주된 행동)만 둔다.
- **Do** 두 버튼을 나란히 둘 때 주된 행동을 오른쪽(가로 배치) 또는 위쪽(세로 쌓기)에 둔다.
- **Do** 되돌릴 수 없는 행동에는 `critical-solid`를 쓰고 확인 다이얼로그를 거친다.
- **Don't** 라벨을 두 줄로 만들지 않는다. 길면 문구를 줄인다.
- **Don't** 브랜드 색 버튼을 한 화면에 여러 개 두지 않는다.
- **Don't** icon-only 버튼에서 `aria-label`을 빼지 않는다.
