# Collapsible

> 클래스 `.dw-collapsible` · 레퍼런스 [catalog.html#collapsible](../catalog.html#collapsible)

## 개요

한 영역만 접고 펴는 구조다. 부가 정보, 고급 설정처럼 평소에 가려도 되는 내용에 쓴다.
**쓰지 말 것** — 비슷한 항목이 여럿 나란한 목록([Accordion](accordion.md)), 항상 보여야 하는 정보, 화면 전환(Tabs).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-collapsible` | ✓ | |
| Trigger | `.dw-collapsible__trigger` | ✓ | `<button aria-expanded aria-controls>` |
| Chevron | `.dw-collapsible__chevron` | ✓ | `chevron-down`, 열리면 180° |
| Panel | `.dw-collapsible__panel` | ✓ | 닫히면 `hidden` |
| Panel inner | `.dw-collapsible__panel-inner` | ✓ | 안쪽 여백·글자 |

```html
<div class="dw-collapsible">
  <button type="button" class="dw-collapsible__trigger" aria-expanded="false" aria-controls="order-more">
    상세 조건
    <svg class="dw-collapsible__chevron" aria-hidden="true">…</svg>
  </button>
  <div class="dw-collapsible__panel" id="order-more" hidden>
    <div class="dw-collapsible__panel-inner">…</div>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| open | boolean | false | Trigger `aria-expanded`, Panel `hidden` |
| block | boolean | false | `.dw-collapsible--block`, Trigger가 너비를 채우고 Chevron이 오른쪽 끝 |
| disabled | boolean | false | Trigger `disabled` |

## Specification

| 항목 | 값 |
| --- | --- |
| Trigger | min-height 44px, padding 8px `x2`, gap 4px `x1`, radius 8px `r2`, 배경 투명 |
| Trigger 글자 | t4 14/19 medium, `fg-neutral`, 왼쪽 정렬 |
| Chevron | 16px `x4`, `fg-neutral-subtle` |
| Panel inner | padding 8px `x2`, t4 14/19, `fg-neutral-muted` |
| disabled | 글자·Chevron `fg-disabled`, `cursor: not-allowed` |

열기·닫기는 [Accordion](accordion.md)과 같다: Panel `height 0 ↔ 내용 높이` + `opacity 0 ↔ 1`, `duration-d4` `easing-easing`. Chevron 회전도 같은 시간이다. 모션 줄이기면 투명도만 바꾼다.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Collapsed | — | Panel `hidden`, `aria-expanded="false"` | |
| Expanded | Trigger 클릭·Enter·Space | Panel 펼침, Chevron 회전 | `duration-d4` |
| Hover | 정밀 포인터 | Trigger bg `bg-transparent-pressed` | `background-color` `duration-color-transition` |
| Pressed | `:active` | `scale-s98` | `duration-pressed-scale` |
| Focus-visible | 키보드 | `outline 2px stroke-focus-ring`, offset 2px | |
| Disabled | `disabled` | 위 disabled 색, 눌리지 않음 | |

## Behavior & Accessibility

WAI-ARIA APG **Disclosure** 패턴.

- Accordion과 달리 제목 요소로 감싸지 않아도 되고 Panel에 `role="region"`을 주지 않는다. 묶음이 없어 Trigger 사이를 오갈 일이 없다.
- Trigger 문구로 어떤 내용이 접혀 있는지 알린다. 열림·닫힘은 `aria-expanded`로 전달하므로 문구를 바꾸지 않아도 된다.
- 닫힌 Panel은 모션이 끝난 뒤 `hidden`으로 Tab 순서에서 뺀다.
- 레퍼런스는 Accordion의 패널 동작(`setAccordionItem`)을 그대로 쓴다.

| 키 | 동작 |
| --- | --- |
| Enter · Space | 펼치기/접기 |
| Tab | 다음 요소(열린 Panel 안 요소 포함) |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 모든 너비 | 같은 모양이다. Trigger 높이는 항상 44px 이상이다 |
| < 640px | 좁은 칸에서는 `block`을 써서 누르는 영역을 넓힌다 |

## Do / Don't

- **Do** Trigger를 접히는 내용 바로 위에 둔다.
- **Don't** 필수 입력을 접어 두지 않는다.
- **Don't** Collapsible을 여러 개 이어 붙이지 않는다. [Accordion](accordion.md)을 쓴다.
