# Popover

> 클래스 `.dw-popover` · 레퍼런스 [storybook.html#popover](../storybook.html#popover)

## 개요

버튼을 눌렀을 때 그 옆에 붙어 뜨는 비모달 패널이다. 짧은 설명, 작은 설정, 보조 행동을 담는다.
**쓰지 말 것** — 행동 목록(Dropdown Menu), 집중이 필요한 작업(Dialog), hover 설명(Tooltip).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Trigger | (버튼) | ✓ | `aria-haspopup="dialog" aria-expanded aria-controls` |
| Content | `.dw-popover` | ✓ | `role="dialog"` (aria-modal 없음) |
| Header | `.dw-popover__header` | | Title + Description |
| Title | `.dw-popover__title` | | |
| Description | `.dw-popover__description` | | |
| Body | `.dw-popover__body` | | 넘치면 스크롤 |
| Footer | `.dw-popover__footer` | | 버튼 |
| Close | `.dw-popover__close` | | 오른쪽 위 `x` |

```html
<button type="button" class="dw-button" aria-haspopup="dialog" aria-expanded="false"
        aria-controls="pop-filter" data-dw-popover="pop-filter">필터</button>
<div class="dw-popover" id="pop-filter" role="dialog" aria-labelledby="pop-filter-title" hidden>
  <div class="dw-popover__header" data-show-close>
    <h2 class="dw-popover__title" id="pop-filter-title">필터</h2>
  </div>
  <div class="dw-popover__body">…</div>
  <div class="dw-popover__footer"><button class="dw-button dw-button--brand-solid">적용</button></div>
  <button type="button" class="dw-popover__close" aria-label="닫기" data-dw-close>…x…</button>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| placement | `bottom-start` · `bottom-end` · `top-start` · `top-end` | `bottom-start` | `data-placement` |
| width | 길이 | 내용 폭(최소 240px, 최대 360px) | 인라인 스타일 |

## Specification

| 항목 | 값 |
| --- | --- |
| Content | bg `bg-layer-floating`, radius 20px `r5`, `shadow-s3`, 세로 배치, Trigger와 간격 4px |
| Header | padding 24px 24px 16px (`x6` `x6` `x4`), gap 6px `x1_5`. Close가 있으면 오른쪽 padding 52px |
| Title | t7 20/27 bold, `fg-neutral`, `word-break: keep-all` |
| Description | t4 14/19 regular, `fg-neutral-muted` |
| Body | padding-inline 24px `x6`, `overflow-y: auto`. 스크롤되면 위에 1px `stroke-neutral-muted` 선, 아래로 더 있으면 하단 48px 페이드(Dialog와 같은 규칙) |
| Footer | padding 16px 24px 24px (`x4` `x6` `x6`) |
| Close | 22px 아이콘 `fg-neutral-subtle`, 히트 52px, 위치 top 27px · right 24px(아이콘 기준), radius 12px `r3`, hover `bg-transparent-pressed` |
| 열기 | opacity 0→1 + scale 0.95→1, `duration-d3` `easing-enter`, 기준점 = Trigger 쪽 모서리 |
| 닫기 | opacity 1→0 + scale 1→0.95, `duration-d2` `easing-exit` |

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Closed | — | `hidden`, Trigger `aria-expanded="false"` |
| Open | Trigger 클릭·Enter·Space | 열기 모션, 첫 포커스 가능한 요소로 포커스 |
| Closed (다시) | Trigger 재클릭 · 바깥 클릭 · Esc · Close | 닫기 모션, 포커스 Trigger로 |

## Behavior & Accessibility

- 비모달: 배경을 inert로 만들지 않고 스크롤도 잠그지 않는다. Tab이 Popover 끝을 지나면 닫고 Trigger 다음 요소로.
- 한 번에 하나만 열린다(다른 Popover·Menu가 열리면 닫힌다).
- Trigger가 화면 밖으로 스크롤되면 닫는다.

| 키 | 동작 |
| --- | --- |
| Enter · Space (Trigger) | 열기/닫기 |
| Esc | 닫기 후 Trigger로 포커스 |
| Tab | Popover 안 요소 → 끝나면 닫고 다음 요소 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | Popover 대신 [Bottom Sheet](bottom-sheet.md)로 같은 내용을 연다 |
| ≥ 768px | Trigger에 붙여 띄우고, 화면 가장자리에 닿으면 반대편 placement로 |

## Do / Don't

- **Do** 내용은 한 화면 높이 안으로.
- **Don't** Popover 안에서 또 Popover를 열지 않는다.
