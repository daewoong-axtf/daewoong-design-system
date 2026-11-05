# Side Sheet

> 클래스 `.dw-side-sheet` · 레퍼런스 [storybook.html#side-sheet](../storybook.html#side-sheet)

## 개요

화면 오른쪽(또는 왼쪽)에서 미끄러져 들어오는 모달 패널이다. 목록을 유지한 채 상세 보기·편집, 긴 필터, 모바일 내비게이션 서랍에 쓴다.
**쓰지 말 것** — 짧은 확인(Alert Dialog), 짧은 폼(Dialog).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-side-sheet` | ✓ | `data-dw="side-sheet"`, `hidden` |
| Backdrop | `.dw-side-sheet__backdrop` | ✓ | 누르면 닫힘 |
| Content | `.dw-side-sheet__content` | ✓ | `role="dialog" aria-modal="true"` |
| Header · Title · Description | `__header` · `__title` · `__description` | ✓ · ✓ · | |
| Body | `.dw-side-sheet__body` | ✓ | 스크롤 |
| Footer | `.dw-side-sheet__footer` | | |
| Close | `.dw-side-sheet__close` | ✓ | 오른쪽 위 `x` |

```html
<div class="dw-side-sheet dw-side-sheet--small" data-dw="side-sheet" id="sheet-detail" hidden>
  <div class="dw-side-sheet__backdrop" data-dw-close data-state="open"></div>
  <div class="dw-side-sheet__content" role="dialog" aria-modal="true" aria-labelledby="sheet-detail-title"
       data-side="right" data-state="open">
    <div class="dw-side-sheet__header"><h2 class="dw-side-sheet__title" id="sheet-detail-title">상세</h2></div>
    <div class="dw-side-sheet__body">…</div>
    <div class="dw-side-sheet__footer">…</div>
    <button type="button" class="dw-side-sheet__close" aria-label="닫기" data-dw-close>…x…</button>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| side | `right` · `left` | `right` | Content `data-side` |
| size | `small` · `medium` · `large` | `small` | `.dw-side-sheet--<size>` |

## Specification

| size | 너비 (≥ 768px) |
| --- | --- |
| `small` | 480px |
| `medium` | 720px |
| `large` | 960px |

768px 미만에서는 size와 관계없이 화면 폭(safe-area 제외)의 **80%**. 어떤 경우에도 화면 폭을 넘지 않는다.

| 항목 | 값 |
| --- | --- |
| Content | 위아래 꽉 채움, 지정 쪽 가장자리에 붙음, bg `bg-layer-floating`, 모서리 없음, 세로 배치 |
| Backdrop | `bg-overlay` |
| Header | min-height 70px, padding 24px 24px 16px (`x6` `x6` `x4`, 위는 + safe-area-top), gap 6px. 오른쪽 padding 52px(Close 자리) |
| Title | t8 22/30 bold, `fg-neutral` |
| Description | t5 16/22 regular, `fg-neutral-muted` |
| Body | padding-inline 24px `x6`, `flex: 1`, `overflow-y: auto`. 스크롤되면 위 1px `stroke-neutral-muted` 선, 아래 48px 페이드 |
| Footer | padding 16px 24px 24px (`x4` `x6` `x6`) |
| Close | 22px `x` `fg-neutral-subtle`, 히트 52px, top 28px · right 24px(아이콘 기준), radius 12px `r3`, hover `bg-transparent-pressed` |
| 열기 | Content `translateX(±100%) → 0`, `duration-d6` `easing-enter-expressive` · Backdrop opacity 0→1 `duration-d6` `easing-enter` |
| 닫기 | Content `0 → translateX(±100%)`, `duration-d6` `easing-exit-expressive` · Backdrop opacity 1→0 `duration-d6` `easing-exit` |

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Closed | — | `hidden` |
| Open | 트리거 | 열기 모션, 배경 inert, 스크롤 잠금 |
| Closing | Backdrop·Close·Esc | 닫기 모션 후 `hidden` |

## Behavior & Accessibility

[Dialog](dialog.md)와 같다(APG Dialog). 처음 포커스는 Body의 첫 컨트롤, 없으면 Close. 편집 중 이탈 경고는 화면이 Alert Dialog로 처리한다.

| 키 | 동작 |
| --- | --- |
| Tab / Shift+Tab | 시트 안 순환 |
| Esc | 닫기 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 폭 80% (내비게이션 서랍은 `left`) |
| ≥ 768px | size 폭 |

## Do / Don't

- **Do** 시트를 연 목록 행은 시트가 열려 있는 동안 선택 상태로 표시한다.
- **Don't** Side Sheet 안에서 다른 Side Sheet를 열지 않는다.
