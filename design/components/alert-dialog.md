# Alert Dialog

> 클래스 `.dw-alert-dialog` · 레퍼런스 [component.html#alert-dialog](../component.html#alert-dialog)

## 개요

진행 전에 사용자의 **결정**을 받는 작은 모달이다(삭제 확인, 저장 안 하고 나가기). 버튼으로만 닫힌다.
**쓰지 말 것** — 폼·긴 내용(Dialog), 단순 결과 알림(Toast).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-alert-dialog` | ✓ | `data-dw="alert-dialog"`, `hidden`으로 닫힘 |
| Backdrop | `.dw-alert-dialog__backdrop` | ✓ | 어두운 막 — **눌러도 닫히지 않는다** |
| Content | `.dw-alert-dialog__content` | ✓ | `role="alertdialog"` |
| Header | `.dw-alert-dialog__header` | ✓ | |
| Title | `.dw-alert-dialog__title` | ✓ | 질문형 |
| Description | `.dw-alert-dialog__description` | | 결과 설명 |
| Footer | `.dw-alert-dialog__footer` | ✓ | 버튼 1–2개 |

```html
<div class="dw-alert-dialog" data-dw="alert-dialog" id="confirm-delete" hidden>
  <div class="dw-alert-dialog__backdrop" data-state="open"></div>
  <div class="dw-alert-dialog__content" role="alertdialog" aria-modal="true"
       aria-labelledby="confirm-delete-title" aria-describedby="confirm-delete-desc" data-state="open">
    <div class="dw-alert-dialog__header">
      <h2 class="dw-alert-dialog__title" id="confirm-delete-title">게시글을 삭제할까요?</h2>
      <p class="dw-alert-dialog__description" id="confirm-delete-desc">삭제하면 되돌릴 수 없어요.</p>
    </div>
    <div class="dw-alert-dialog__footer">
      <button type="button" class="dw-button dw-button--neutral-weak" data-dw-close>취소</button>
      <button type="button" class="dw-button dw-button--critical-solid">삭제</button>
    </div>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| actions | 1개(확인) · 2개(취소 + 실행) | 2개 | Footer 버튼 |
| destructive | boolean | false | 실행 버튼 `critical-solid`(아니면 `brand-solid` 또는 `neutral-solid`) |

## Specification

| 항목 | 값 |
| --- | --- |
| 배치 | 화면 가운데, 좌우 여백 32px `x8` (safe-area 포함) |
| Backdrop | `bg-overlay` |
| Content | **max-width 272px**, 최대 높이 100%(넘치면 세로 스크롤), radius 20px `r5`, bg `bg-layer-floating`, `word-break: break-all` |
| Header | padding 20px 20px 0 (`x5`), gap 6px `x1_5` |
| Title | t7 20/27 bold, `fg-neutral` |
| Description | t5 16/22 regular, `fg-neutral`, `white-space: pre-wrap` |
| Footer | padding 16px 20px 20px (`x4` `x5` `x5`), 버튼 가로 나란히 gap 8px `x2`, 각 `flex: 1`. 버튼 글자가 넘치면 세로로 쌓는다(실행 버튼이 위) |
| 버튼 | [Button](button.md) `medium` |
| 열기 | Backdrop opacity 0→1 `duration-d2` `easing-enter` · Content opacity 0→1 + scale **1.3→1** `duration-d4` `easing-enter-expressive` |
| 닫기 | 둘 다 opacity 1→0 `duration-d2` `easing-exit` |

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Closed | — | Root `hidden` |
| Open | 트리거 | 위 열기 모션, 배경 inert, 스크롤 잠금 |
| Closing | 버튼 | 위 닫기 모션 후 `hidden` |

## Behavior & Accessibility

[Dialog](dialog.md)와 같다(포커스 가두기·복귀·inert·스크롤 잠금·겹침). 다른 점:

- `role="alertdialog"`, `aria-describedby`로 Description 연결.
- **Backdrop 클릭으로 닫히지 않는다.** Esc는 "취소"와 같다(취소 버튼이 없는 1버튼 확인은 Esc로 그 버튼 실행).
- 처음 포커스는 **취소 버튼**(파괴적 실행 버튼에 두지 않는다). 1버튼이면 그 버튼.

| 키 | 동작 |
| --- | --- |
| Tab / Shift+Tab | 버튼 사이 순환 |
| Esc | 취소 |
| Enter · Space | 포커스된 버튼 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음. 272px 고정 폭 가운데(아주 좁은 화면은 좌우 32px 여백 안에서 줄어든다) |

## Do / Don't

- **Do** 버튼은 동사로 쓴다("삭제", "나가기") — "확인/예"만 쓰지 않는다.
- **Don't** 입력 필드를 넣지 않는다(Dialog).
