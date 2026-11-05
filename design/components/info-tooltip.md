# Info Tooltip

> 클래스 `.dw-info-tooltip` · 레퍼런스 [storybook.html#info-tooltip](../storybook.html#info-tooltip)

## 개요

라벨 옆 안내 아이콘이다. 상시 두기엔 부차적이지만 모르면 잘못 설정하게 되는 정책·배경 안내를 담는다. [Tooltip](tooltip.md)과 달리 **눌러서 열어** 터치·키보드에서도 같게 동작하며, [Popover](popover.md)를 재사용한다.
**쓰지 말 것** — 항상 읽어야 하는 입력 제약([Field](field.md) Description), 버튼·링크가 든 내용([Popover](popover.md)), 아이콘 버튼의 이름 설명([Tooltip](tooltip.md)).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Trigger | `.dw-info-tooltip` | ✓ | `<button>`. Popover Trigger 속성을 갖는다. 16px `info` 아이콘 |
| Panel | `.dw-popover.dw-info-tooltip__panel` | ✓ | Popover Content. `tabindex="-1"`, `aria-label` |
| List | `.dw-info-tooltip__list` | ✓ | `<ul>`. 항목 하나에 한 문장 |

```html
<div class="dw-field__header">
  <label class="dw-field__label" for="date">희망 배송일</label>
  <button class="dw-info-tooltip" type="button" aria-label="희망 배송일 안내"
          aria-haspopup="dialog" aria-expanded="false" aria-controls="date-info" data-dw-popover="date-info">
    <svg aria-hidden="true"><use href="#i-info"/></svg>
  </button>
  <div class="dw-popover dw-info-tooltip__panel" id="date-info" role="dialog" aria-label="희망 배송일 안내" tabindex="-1" hidden>
    <ul class="dw-info-tooltip__list">
      <li>주말과 공휴일에는 배송하지 않아요.</li>
    </ul>
  </div>
</div>
```

Trigger는 `<label>` 밖에 둔다. 안에 두면 누를 때 입력으로 포커스가 간다. 동작 코드는 더하지 않는다. `data-dw-popover`가 전부 처리한다.

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| label | 텍스트 | — | Trigger·Panel 이름 `{label} 안내` |
| items | 문장 목록 | — | `<li>` 하나에 한 문장 |
| placement | [Popover](popover.md)와 같음 | `bottom-start` | Panel의 `data-placement` |

## Specification

### 크기

| 항목 | 값 |
| --- | --- |
| Trigger | 24×24px, 아이콘 16px, 바깥 여백 -4px(레이아웃에서는 16px 차지), radius `full` |
| Trigger 터치 히트 | 44×44px |
| Field Header 안 | 왼쪽 정렬, 라벨과 gap 8px `x2` |
| Panel | 내용 폭, 최대 280px, 나머지는 [Popover](popover.md) 표면 |
| List | padding 12px 16px (`x3` `x4`), 항목 gap 8px `x2`, t4 14/19 regular, `word-break: keep-all` |
| 항목 점 | 6×6px 원, 글자 앞 여백 14px `x3_5`, 위에서 7px |
| Bottom Sheet 안 | List padding 20px 16px 24px (`x5` `x4` `x6`), t5 16/22, 점 위에서 8px |

### 색

| 부위 | 상태 | 값 |
| --- | --- | --- |
| Trigger 아이콘 | 기본 | `fg-neutral-subtle` |
| Trigger 아이콘 | hover(정밀 포인터) · 열림 | `fg-neutral` |
| Trigger 포커스 | focus-visible | 2px `stroke-focus-ring` |
| Panel 배경 | 전체 | `bg-layer-floating`, `shadow-s3` |
| 항목 글자 | 전체 | `fg-neutral` |
| 항목 점 | 전체 | `fg-neutral-subtle` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Closed | — | Panel `hidden`, `aria-expanded="false"` | 닫기 모션(Popover) |
| Open | Trigger 클릭·탭·Enter·Space | Panel 표시, 포커스는 Panel로 | 열기 모션(Popover) |
| Closed (다시) | Trigger 재클릭 · 바깥 클릭 · Esc | 포커스는 Trigger로 | Popover와 같음 |

마우스를 올리거나 포커스만 해서는 열지 않는다. 읽는 도중 닫히지 않게 하기 위해서다.

## Behavior & Accessibility

- [Popover](popover.md)의 동작을 그대로 쓴다. 한 번에 하나만 열리고, Trigger가 화면 밖으로 나가면 닫힌다.
- 포커스 가능한 요소가 Panel에 없으므로 Panel 자체가 `tabindex="-1"`로 포커스를 받아 스크린리더가 내용을 읽는다.
- 이름은 무엇에 대한 안내인지 적는다. "도움말"만 쓰지 않는다.
- Panel 안에 버튼·링크를 넣지 않는다. 필요하면 Popover를 쓴다.

| 키 | 동작 |
| --- | --- |
| Enter · Space (Trigger) | 열기/닫기 |
| Esc | 닫기 후 Trigger로 포커스 |
| Tab (열림) | 닫고 Trigger 다음 요소로 |
| Shift+Tab (열림) | 닫고 Trigger로 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | [Popover](popover.md)와 같이 [Bottom Sheet](bottom-sheet.md)로 연다. Handle·Backdrop으로 닫고, 글자는 16px |
| ≥ 768px | Trigger에 붙여 띄운다 |

## Do / Don't

- **Do** 두세 문장 안으로 쓴다. 해요체로 쓴다.
- **Do** 라벨 바로 옆에 둔다.
- **Don't** 모든 라벨에 붙이지 않는다.
- **Don't** 입력 형식처럼 놓치면 안 되는 내용을 여기에만 두지 않는다.
