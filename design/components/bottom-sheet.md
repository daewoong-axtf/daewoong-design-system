# Bottom Sheet

> 클래스 `.dw-bottom-sheet` · 레퍼런스 [storybook.html#bottom-sheet](../storybook.html#bottom-sheet)

## 개요

화면 아래에서 올라오는 모달 패널이다. **모바일**에서 Dialog·Popover·Dropdown Menu 대신 쓴다(선택지 목록, 짧은 폼, 확인).
**쓰지 말 것** — 데스크톱 넓은 화면(Dialog), 결정 확인(Alert Dialog — 모바일에서도 가운데 유지).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-bottom-sheet` | ✓ | `data-dw="bottom-sheet"`, `hidden` |
| Backdrop | `.dw-bottom-sheet__backdrop` | ✓ | 누르면 닫힘 |
| Content | `.dw-bottom-sheet__content` | ✓ | `role="dialog" aria-modal="true"` |
| Handle | `.dw-bottom-sheet__handle` | | 위쪽 가운데 회색 막대. 끌어서 닫기 |
| Header | `.dw-bottom-sheet__header` | | |
| Title · Description | `.dw-bottom-sheet__title` · `__description` | ✓ · | |
| Body | `.dw-bottom-sheet__body` | ✓ | 넘치면 스크롤 |
| Footer | `.dw-bottom-sheet__footer` | | 버튼 |
| Close | `.dw-bottom-sheet__close` | | 오른쪽 위 회색 원 `x` |

```html
<div class="dw-bottom-sheet" data-dw="bottom-sheet" id="sheet-sort" hidden>
  <div class="dw-bottom-sheet__backdrop" data-dw-close data-state="open"></div>
  <div class="dw-bottom-sheet__content" role="dialog" aria-modal="true" aria-labelledby="sheet-sort-title" data-state="open">
    <div class="dw-bottom-sheet__handle" aria-hidden="true"></div>
    <div class="dw-bottom-sheet__header">
      <h2 class="dw-bottom-sheet__title" id="sheet-sort-title">정렬</h2>
    </div>
    <div class="dw-bottom-sheet__body">…</div>
    <div class="dw-bottom-sheet__footer"><button class="dw-button dw-button--brand-solid dw-button--large">적용</button></div>
    <button type="button" class="dw-bottom-sheet__close" aria-label="닫기" data-dw-close>…x…</button>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| header align | `left` · `center` | `left` | `.dw-bottom-sheet--center` |
| handle | boolean | true | Handle 유무 |
| close button | boolean | false | Close 유무 (Handle·Backdrop만으로 닫을 수 있으면 생략) |

## Specification

| 항목 | 값 |
| --- | --- |
| 배치 | 화면 아래에 붙어 가운데, **max-width 480px**, 최대 높이 `min(90%, 100% − safe-area-top)` |
| Backdrop | `bg-overlay` |
| Content | bg `bg-layer-floating`, 위 모서리 radius 24px `r6`, 아래 padding = safe-area-bottom, 세로 배치 |
| Handle | 36×4px, `radius-full`, top 6px 가운데, `stroke-neutral-weak`(gray-400) · hover `gray-500`, 히트 44×44px |
| Header | padding-top 24px `x6`, padding-bottom 16px `x4`, gap 8px `x2` |
| Title | t8 22/30 bold, `fg-neutral`, 좌우 padding 16px(gutter). Close가 있으면 오른쪽 56px |
| Description | t5 16/22 regular, `fg-neutral-muted`, 좌우 16px |
| Body | 좌우 padding 16px, `overflow-y: auto` |
| Footer | padding 12px 16px 16px (`x3` `x4` `x4`), 버튼 `large` 꽉 채움 |
| Close | 28×28px 원 `bg-neutral-weak`, 14px `x` `fg-neutral`, top 24px · right 16px, 히트 44px |
| 열기 | Content `translateY(100%) → 0`, `duration-d6` `easing-enter-expressive` · Backdrop opacity 0→1 `duration-d6` `easing-enter` |
| 닫기 | Content `0 → translateY(100%)`, `duration-d6` `easing-exit-expressive` · Backdrop opacity 1→0 |

`center` 정렬이면 Header·Title·Description 가운데 정렬.

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Closed | — | `hidden` |
| Open | 트리거 | 열기 모션, 배경 inert, 스크롤 잠금 |
| Dragging | Handle·Header를 아래로 끔 | Content가 손가락을 따라 내려감(위로는 안 올라감), Backdrop 투명도 비례 감소 |
| Closing | Backdrop·Close·Esc·끌어 내림(높이의 25% 이상 또는 빠르게 튕김) | 닫기 모션 후 `hidden`. 기준 미달이면 제자리로 `duration-d4` |

## Behavior & Accessibility

[Dialog](dialog.md)와 같다(APG Dialog: 포커스 가두기·복귀·inert·스크롤 잠금·Esc·겹침). 다른 점:

- 처음 포커스는 Content(제목 읽힘) 또는 Body의 첫 컨트롤.
- 끌어 내리기는 보조 수단이다 — Backdrop·Esc·Close 중 하나는 항상 있어야 한다.
- Body가 스크롤 중일 때는 끌어 내리기 대신 스크롤이 우선(Body가 맨 위일 때만 끌기).

| 키 | 동작 |
| --- | --- |
| Tab / Shift+Tab | 시트 안 순환 |
| Esc | 닫기 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 기본 형태 |
| ≥ 768px | 화면이 같은 내용을 [Dialog](dialog.md)로 연다. 컴포넌트가 자동으로 바꾸지 않는다 |

## Do / Don't

- **Do** 선택 목록은 항목을 누르면 바로 적용하고 닫는다(Footer 없음).
- **Don't** 시트 위에 또 시트를 올리지 않는다.
