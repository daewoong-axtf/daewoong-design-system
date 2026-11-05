# Toast (Snackbar)

> 클래스 `.dw-toast` · 레퍼런스 [storybook.html#toast](../storybook.html#toast)

## 개요

방금 한 행동의 결과를 화면 아래에 잠깐 알린다("저장했어요"). 저절로 사라지며, 선택적으로 행동 하나(실행 취소 등)를 둔다.
**쓰지 말 것** — 사라지면 안 되는 정보(Callout), 결정이 필요한 확인(Alert Dialog), 입력 오류(Field).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Region | `.dw-toast-region` | ✓ | 화면 하단 고정 영역, 페이지에 하나. `role="region" aria-label="알림"` |
| Root | `.dw-toast` | ✓ | variant 색으로 채운 상자 |
| Icon | `.dw-toast__icon` | | positive·warning·critical 일 때만 |
| Message | `.dw-toast__message` | ✓ | 한 문장 |
| Action | `.dw-toast__action` | | 텍스트 버튼 하나 |

```html
<div class="dw-toast-region" role="region" aria-label="알림">
  <div class="dw-toast dw-toast--positive" role="status" data-state="open">
    <svg class="dw-toast__icon" aria-hidden="true">…circle-check…</svg>
    <div class="dw-toast__content">
      <p class="dw-toast__message">저장했어요</p>
      <button type="button" class="dw-toast__action">실행 취소</button>
    </div>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| variant | `default` · `positive` · `warning` · `critical` | `default` | `.dw-toast--<variant>` |
| action | 텍스트 | 없음 | Action 버튼 |
| duration | ms | 4000 (Action 있으면 6000) | 동작 스크립트 |

| variant | 아이콘 | 배경 | 글자·아이콘 | 쓰는 곳 |
| --- | --- | --- | --- | --- |
| `default` | 없음 | `bg-neutral-solid` | `fg-on-neutral-solid` | 복사처럼 결과가 분명한 행동 |
| `positive` | `circle-check` | `bg-positive-solid` | `fg-on-positive-solid` | 저장·전송 완료 |
| `warning` | `triangle-alert` | `bg-warning-solid` | `fg-on-warning-solid` | 끝났지만 확인할 것이 있을 때, 일시적 불안정 |
| `critical` | `circle-alert` | `bg-critical-solid` | `fg-on-critical-solid` | 실패 |

## Specification

| 항목 | 값 |
| --- | --- |
| Region | `position: fixed`, 좌우 0, 아래 0(+ safe-area), padding 8px `x2`, 세로 쌓기 가운데 정렬, gap 8px, `z-toast`(모달 위)|
| Root | 너비 100%, **max-width 464px**, min-height 44px, padding 10px `x2_5`, radius 8px `r2`, bg·글자색은 variant 표를 따른다, `display: flex; align-items: center` |
| Icon | 24×24px, 오른쪽 padding 2px. 색은 Root 글자색을 따른다. 상태는 배경색과 아이콘 모양으로 함께 구분한다(색만으로 구분하지 않는다). default는 아이콘 없음 |
| Content | `flex: 1`, padding-inline 6px `x1_5`, gap 10px `x2_5`, `justify-content: space-between` |
| Message | t4 14/19 regular, 색은 Root 글자색 |
| Action | t4 14/19 **bold**, 색은 Root 글자색, 밑줄, 배경 없음(채운 면이라 `fg-brand`는 대비가 모자란다). 히트 영역은 좌우 8px 더 넓고 높이 44px(`::after`) |
| 등장 | opacity 0→1 + scale 0.8→1, `duration-d3` `easing-enter` |
| 퇴장 | opacity 1→0, `duration-d2` `easing-exit` |

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Open | 표시 요청 | 등장 모션, `data-state="open"` |
| Paused | Root에 hover·포커스 | 사라지는 타이머 정지 |
| Closed | 시간 경과·Action 실행·Esc(포커스가 Toast 안일 때) | 퇴장 모션 후 제거 |
| Pressed (Action) | `:active` | `scale-s95` |
| Focus-visible | 키보드 | Root `outline 2px stroke-focus-ring` / Action은 `::after`에 radius 4px 링, 색은 Root 글자색(채운 면 위라 `stroke-focus-ring`은 대비가 모자란다) |

## Behavior & Accessibility

- 한 번에 **하나만** 보인다. 새 Toast가 오면 이전 것을 바로 닫고 교체한다.
- Root는 `role="status"`(critical은 `role="alert"`). 포커스를 옮기지 않는다.
- Action은 Toast 없이도 할 수 있는 행동이어야 한다(키보드·스크린리더 사용자가 놓칠 수 있다).
- Region 아래에 고정 하단 바(탭바·고정 버튼)가 있으면 그 높이만큼 Region을 올린다(`--dw-toast-offset`).

| 키 | 동작 |
| --- | --- |
| Tab | (Toast 안에 있을 때) Action |
| Esc | Toast 닫기 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 480px | Root가 화면 폭 − 16px |
| ≥ 480px | Root 최대 464px, 가운데 |

## Do / Don't

- **Do** 과거형 한 문장("삭제했어요").
- **Don't** 오류 원인 설명처럼 긴 문장을 넣지 않는다.
