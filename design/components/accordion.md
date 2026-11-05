# Accordion

> 클래스 `.dw-accordion` · 레퍼런스 [storybook.html#accordion](../storybook.html#accordion)

## 개요

제목을 눌러 내용을 펼치고 접는다. 자주 묻는 질문, 긴 설명의 단계별 공개에 쓴다.
**쓰지 말 것** — 항상 보여야 하는 정보, 화면 전환(Tabs).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-accordion` | ✓ | `data-dw="accordion"` |
| Item | `.dw-accordion__item` | ✓ | |
| Header | `.dw-accordion__header` | ✓ | `<h3>` 등 제목 요소 |
| Trigger | `.dw-accordion__trigger` | ✓ | `<button aria-expanded aria-controls>` |
| Prefix | `.dw-accordion__prefix` | | 앞 아이콘 22px |
| Title · Description | `__title` · `__description` | ✓ · | |
| Chevron | `.dw-accordion__chevron` | ✓ | `chevron-down`, 열리면 180° |
| Panel | `.dw-accordion__panel` | ✓ | `role="region" aria-labelledby` |

```html
<div class="dw-accordion" data-dw="accordion">
  <div class="dw-accordion__item">
    <h3 class="dw-accordion__header">
      <button type="button" class="dw-accordion__trigger" id="acc-1" aria-expanded="false" aria-controls="acc-1-panel">
        <span class="dw-accordion__body"><span class="dw-accordion__title">환불은 어떻게 하나요?</span></span>
        <svg class="dw-accordion__chevron" aria-hidden="true">…</svg>
      </button>
    </h3>
    <div class="dw-accordion__panel" id="acc-1-panel" role="region" aria-labelledby="acc-1" hidden>
      <div class="dw-accordion__panel-inner">…</div>
    </div>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| variant | `inline` · `separated` | `inline` | `.dw-accordion--separated` |
| size | `medium` · `large` · `responsive` | `medium` | `.dw-accordion--<size>` (`responsive`는 768 이상 large) |
| multiple | boolean | true | `data-single`이면 하나만 열림 |
| disabled | boolean (항목별) | false | Trigger `disabled` |

## Specification

| size | Trigger padding 위아래 | Title | Description | Chevron |
| --- | --- | --- | --- | --- |
| `medium` | 16px `x4` | t5 16/22 medium | t3 13/18 medium | 20px |
| `large` | 20px `x5` | t7 20/27 medium | t5 16/22 medium | 24px |

| 항목 | 값 |
| --- | --- |
| Trigger | 너비 100%, 좌우 padding 16px(gutter), `display: flex; align-items: center`, 배경 투명 |
| Prefix | 오른쪽 12px, 22px 아이콘 `fg-neutral` |
| Body | 세로 gap 2px, Title `fg-neutral`, Description `fg-neutral-subtle` |
| Chevron | 왼쪽 12px, `fg-neutral-subtle`, `margin-left: auto`, 열림 `rotate(180deg)` |
| Panel 안쪽 | 좌우 padding 16px, 아래 padding 16px, t4 14/19 `fg-neutral-muted` |
| `inline` | 항목 사이 1px `stroke-neutral-subtle`(좌우 12px 들여서). hover: 뒤 면이 좌우 6px 들어온 radius 10px `bg-transparent-pressed` |
| `separated` | 항목마다 `inset 0 0 0 1px stroke-neutral-weak`, radius 12px `r3`, 항목 사이 8px. hover: Trigger 전체 `bg-transparent-pressed` |
| disabled | Title·Description·아이콘 `fg-disabled`, `cursor: not-allowed` |

열기·닫기: Panel `height 0 ↔ 내용 높이` + `opacity 0 ↔ 1`, `duration-d4` `easing-easing`. Chevron 회전도 같은 시간.

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Collapsed | — | Panel `hidden`, `aria-expanded="false"` |
| Expanded | Trigger 클릭·Enter·Space | Panel 펼침, Chevron 회전 |
| Hover | 정밀 포인터 | variant hover 면 |
| Pressed | `:active` | Trigger 내용 `scale-s98` |
| Focus-visible | 키보드 | Trigger `outline 2px stroke-focus-ring`, offset 2px |

## Behavior & Accessibility

WAI-ARIA APG **Accordion** 패턴.

- Trigger는 제목 요소(`<h2>`–`<h6>`) 안의 `<button>`. `aria-expanded`·`aria-controls`.
- Panel은 `role="region"` + `aria-labelledby="<trigger id>"`(항목이 6개 이하일 때 권장).
- 닫힌 Panel은 `hidden`(모션 끝난 뒤)으로 Tab 순서에서 뺀다.
- 기본은 여러 개 동시 열림. `data-single`이면 하나를 열 때 나머지를 닫는다.

| 키 | 동작 |
| --- | --- |
| Enter · Space | 펼치기/접기 |
| Tab | 다음 Trigger(열린 Panel 안 요소 포함) |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | `responsive` = `medium` |
| ≥ 768px | `responsive` = `large` |

## Do / Don't

- **Do** 제목은 내용을 예측할 수 있게(질문형 등).
- **Don't** 아코디언 안에 아코디언을 넣지 않는다.
