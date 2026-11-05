# Dialog

> 클래스 `.dw-dialog` · 레퍼런스 [storybook.html#dialog](../storybook.html#dialog)

## 개요

현재 화면 위에 떠서 작업 하나(짧은 폼·상세 확인·선택)를 끝내게 하는 모달 창이다. 열려 있는 동안 뒤 화면은 조작할 수 없다.
**쓰지 말 것** — 단순 확인·경고(Alert Dialog), 결과 알림(Toast), 모바일에서 아래서 올라오는 목록·선택(Bottom Sheet), 길고 복잡한 작업(별도 페이지).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `data-dw="dialog"` | ✓ | 닫혀 있을 때 `hidden`. Backdrop·Positioner를 묶는 래퍼(스타일 없음) |
| Backdrop | `.dw-dialog__backdrop` | ✓ | 화면 전체를 덮는 어두운 막 |
| Positioner | `.dw-dialog__positioner` | ✓ | 화면 가운데 정렬용 고정 레이어 |
| Content | `.dw-dialog` | ✓ | 창. `role="dialog"` |
| Header | `.dw-dialog__header` | ✓ | 제목·설명 |
| Title | `.dw-dialog__title` | ✓ | `<h2>` |
| Description | `.dw-dialog__description` | | 보조 문구 |
| Close button | `.dw-dialog__close` | | 오른쪽 위 X |
| Body | `.dw-dialog__body` | | 스크롤되는 본문 |
| Footer | `.dw-dialog__footer` | ✓ | 버튼 영역 |

```html
<button type="button" data-dw-open="dlg">열기</button>

<div data-dw="dialog" id="dlg" hidden>
<div class="dw-dialog__backdrop" data-state="closed"></div>
<div class="dw-dialog__positioner">
  <div class="dw-dialog dw-dialog--medium" role="dialog" aria-modal="true"
       aria-labelledby="dlg-title" aria-describedby="dlg-desc" data-state="closed" tabindex="-1">
    <div class="dw-dialog__header" data-has-close>
      <h2 class="dw-dialog__title" id="dlg-title">제목</h2>
      <p class="dw-dialog__description" id="dlg-desc">설명</p>
    </div>
    <button class="dw-dialog__close" type="button" aria-label="닫기" data-dw-close>…x…</button>
    <div class="dw-dialog__body">…</div>
    <div class="dw-dialog__footer">
      <button class="dw-button dw-button--brand-solid dw-button--large dw-button--full">확인</button>
    </div>
  </div>
</div>
</div>
```

레퍼런스 동작은 [`js/components.js`](../js/components.js) — `data-dw-open="<id>"` 트리거, `data-dw-close` 닫기, `data-dismissible="false"`로 Esc·바깥 클릭 닫기 끄기.

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `large` | `medium` | `.dw-dialog--<size>` |
| close button | boolean | true | Close button 요소 유무 + Header `data-has-close` |
| dismissible | boolean | true | Esc·Backdrop 클릭으로 닫힘 여부 |
| footer layout | 세로 쌓기 · 가로 | 세로 쌓기 | 가로는 `.dw-dialog__footer--row` |

## Specification

| 항목 | 값 |
| --- | --- |
| Backdrop | `position: fixed; inset: 0`, `bg-overlay` |
| Positioner | `position: fixed; inset: 0`, flex 가운데 정렬, safe-area 만큼 padding |
| Content 폭 (< 768px) | 화면 폭의 90% (`calc(0.9 * 100vw)`) |
| Content 폭 (≥ 768px) | `medium` 480px · `large` 800px, 최대 `100vw - 40px` |
| Content 최대 높이 | 화면 높이의 80% (`min(80dvh, 100%)`) |
| Content | `bg-layer-floating`, radius 20px `r5`, flex column, `overflow: hidden` |
| Header | padding 24px `x6`(위·좌·우), 아래 16px `x4`, column gap 6px `x1_5`. Close가 있으면 오른쪽 padding 24 + 22 + 6 = 52px |
| Title | t8 22/30, bold, `fg-neutral` |
| Description | t5 16/22, regular, `fg-neutral-muted`, 줄바꿈 유지(`white-space: pre-wrap`) |
| Body | 좌우 padding 24px `x6`, `flex: 1`, `overflow-y: auto` |
| Body 스크롤됨 | 위쪽 구분선 `inset 0 1px 0 0 stroke-neutral-muted` |
| Body 넘침 | 아래 48px `x12` 페이드(`mask-image: linear-gradient(to top, transparent 0, black 48px)`) + padding-bottom 48px |
| Footer | padding 위 16px `x4`, 좌·우·아래 24px `x6`. 세로 쌓기: column, `align-items: stretch`, gap 8px `x2`. 가로: row, gap 8px, 버튼 `flex: 1` |
| Footer 버튼 | Button `large` |
| Close button | 위 28px `x7`·오른쪽 24px `x6` 위치, 아이콘 `x` 22px `fg-neutral-subtle`, 히트 영역 52×52px(아이콘 둘레 15px), radius 12px `r3`, hover/pressed bg `bg-transparent-pressed`, 누름 `scale-s95` |
| Body 포커스 링 | 스크롤 가능한 Body에 키보드 포커스가 오면 안쪽 2px `stroke-focus-ring` |

### 모션

| 대상 | 열기 | 닫기 |
| --- | --- | --- |
| Backdrop | opacity 0→1, `duration-d2`(100ms) `easing-enter` | 1→0, `duration-d2` `easing-exit` |
| Content | opacity 0→1 + scale 1.3→1, `duration-d4`(200ms) `easing-enter-expressive` | opacity 1→0(scale 유지), `duration-d2` `easing-exit` |

`prefers-reduced-motion: reduce`면 scale 없이 opacity만.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Closed | — | DOM에 없거나 `hidden` | — |
| Open | 트리거 실행 | Backdrop·Content 표시, 배경 스크롤 잠금 | 위 모션 |
| Closing | 닫기 요청 | 닫기 모션 후 제거 | 위 모션 |

## Behavior & Accessibility

WAI-ARIA APG **Dialog (Modal)** 패턴을 따른다.

- Content: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`(Title), `aria-describedby`(Description, 있을 때).
- 열면 포커스를 Content 안 **첫 번째 포커스 가능한 요소**로 옮긴다(입력 폼이면 첫 입력, 아니면 Content 자체 `tabindex="-1"`). 파괴적 행동 버튼에는 처음 포커스를 주지 않는다.
- 열려 있는 동안 포커스는 Content 안에서만 돈다(포커스 트랩). 뒤 화면은 `inert`.
- 닫으면 포커스를 **연 트리거**로 되돌린다.
- 배경 스크롤을 잠근다(`body { overflow: hidden }`, 스크롤바 폭만큼 padding 보정).
- 닫기 수단: Close button, Esc, Backdrop 클릭(dismissible일 때), Footer의 취소 버튼.
- 저장되지 않은 입력이 있으면 Esc·Backdrop으로 닫기 전에 확인한다(Alert Dialog).

| 키 | 동작 |
| --- | --- |
| Tab / Shift+Tab | Content 안에서 다음/이전 요소, 끝에서 처음으로 순환 |
| Esc | 닫기(dismissible일 때) |

### 구현 세부

- 트리거 하나에 `data-dw-open="<id>"`를 붙인다. `<button>`에는 항상 `type="button"`과 Button 클래스를 쓴다.
- Backdrop·Content의 `data-state`는 `open`·`closed` 두 값이다. Closing은 `closed` 상태의 CSS 애니메이션이고, 끝나면 Root를 `hidden`으로 바꾼다. 열기와 닫기 모션이 달라 transition이 아니라 keyframes를 쓴다.
- Positioner가 Backdrop을 덮는다. 바깥 클릭은 Positioner의 클릭 대상이 Content 밖일 때로 판단한다.
- `data-dismissible="false"`는 Root에 붙인다.
- 처음 포커스: `data-dw-autofocus` → Close 버튼과 critical 버튼을 뺀 첫 포커스 가능 요소 → Content 순서다.
- Body가 스크롤되면 `data-scrolled`, 아래로 더 넘치면 `data-overflow`를 붙인다. 넘치는 Body는 키보드로 스크롤할 수 있게 `tabindex="0"`이다.
- Close의 위치 28px·24px은 아이콘 기준이다. 버튼은 `margin: -15px`, `padding: 15px`로 아이콘을 둘러싼다.
- 그림자는 [`design.md` 7장](../design.md#7-깊이)의 `shadow-s3`다.
- 뒤 화면 `inert`는 Root를 `body` 바로 아래로 옮긴 뒤 그 형제에 건다.
- 주 버튼은 자동으로 닫지 않는다. 화면이 작업을 끝내고 닫는다. 보조 버튼은 `neutral-weak`, 닫기만 하면 `data-dw-close`를 붙인다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 폭 90%, 가운데 |
| ≥ 768px | 폭 480px(`medium`) / 800px(`large`), 가운데 |

모바일에서 아래서 올라오는 형태가 필요하면 Dialog가 아니라 Bottom Sheet를 쓴다.

## Do / Don't

- **Do** 제목은 무엇을 하는 창인지 한 줄로 쓴다.
- **Do** Footer의 주된 버튼을 세로 쌓기에선 위, 가로에선 오른쪽에 둔다.
- **Don't** Dialog 위에 Dialog를 띄우지 않는다(확인용 Alert Dialog는 예외).
- **Don't** Body 안에 또 다른 스크롤 영역을 두지 않는다.
