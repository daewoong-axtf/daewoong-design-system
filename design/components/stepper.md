# Stepper

> 클래스 `.dw-stepper` · 레퍼런스 [catalog.html#stepper](../catalog.html#stepper)

## 개요

여러 단계로 나뉜 흐름에서 전체 단계와 지금 위치를 보여 준다. 표시 전용이며 누르는 요소가 아니다.
**쓰지 말 것** — 사이트 위치 경로([Breadcrumb](breadcrumb.md)), 같은 수준 화면 전환([Tabs](tabs.md)), 수치 진행률([Progress](progress.md)), 2단계뿐인 흐름.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-stepper` | ✓ | `<ol aria-label>` |
| Item | `.dw-stepper__item` | ✓ | `<li data-status>`. 현재 단계에 `aria-current="step"` |
| Indicator | `.dw-stepper__indicator` | ✓ | 원. 완료는 `check`, 그 외는 번호 |
| Label | `.dw-stepper__label` | ✓ | 단계 이름 |
| Connector | `.dw-stepper__connector` | | 다음 단계로 잇는 선. 마지막 Item에는 없다 |

```html
<ol class="dw-stepper" aria-label="주문 진행 단계">
  <li class="dw-stepper__item" data-status="complete">
    <span class="dw-stepper__indicator"><svg aria-hidden="true"><use href="#i-check"/></svg></span>
    <span class="dw-stepper__label">장바구니<span class="dw-visually-hidden"> 완료</span></span>
    <span class="dw-stepper__connector" aria-hidden="true"></span>
  </li>
  <li class="dw-stepper__item" data-status="current" aria-current="step">
    <span class="dw-stepper__indicator"><span aria-hidden="true">2</span></span>
    <span class="dw-stepper__label">결제</span>
    <span class="dw-stepper__connector" aria-hidden="true"></span>
  </li>
  <li class="dw-stepper__item" data-status="upcoming">
    <span class="dw-stepper__indicator"><span aria-hidden="true">3</span></span>
    <span class="dw-stepper__label">완료</span>
  </li>
</ol>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| steps | 단계 이름 3–5개 | — | Item 개수 |
| current | 현재 단계 번호(0부터) | — | 앞 Item은 `complete`, 해당 Item은 `current`, 뒤는 `upcoming`. 단계 수와 같으면 모두 `complete` |

## Specification

### 크기

| 부위 | 놓인 폭 < 640px | 놓인 폭 ≥ 640px |
| --- | --- | --- |
| Root 너비 | 100% | 내용만큼(`fit-content`), 최대 100% |
| Indicator | 28px `x7`, `radius-full`, 테두리 1px | 같음 |
| Indicator 글자 | t4 14/19 medium | 같음 |
| 체크 아이콘 | 16px `x4` | 같음 |
| Indicator → Label | 8px `x2` | 같음 |
| Label | t4 14/19, 현재 단계만 보임, 넘치면 말줄임 | t4 14/19, 모두 보임 |
| Connector | 남는 폭 채움(최소 8px `x2`), 높이 1px, 좌우 8px `x2` | 32px `x8`, 높이 1px, 좌우 12px `x3` |

### 색

| status | Indicator bg | Indicator fg | Indicator 테두리 | Label | Connector |
| --- | --- | --- | --- | --- | --- |
| `complete` | `bg-brand-solid` | `fg-on-brand-solid` | `bg-brand-solid` | `fg-neutral-subtle` regular | `bg-brand-solid` |
| `current` | `bg-transparent` | `fg-brand` | `stroke-brand-solid` | `fg-neutral` medium | `stroke-neutral-weak` |
| `upcoming` | `bg-transparent` | `fg-neutral-subtle` | `stroke-neutral-weak` | `fg-neutral-subtle` regular | `stroke-neutral-weak` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Complete | current보다 앞 | 체크 + 채운 원 | — |
| Current | current와 같음 | 테두리 원 + 강조 라벨, `aria-current="step"` | — |
| Upcoming | current보다 뒤 | 흐린 원 + 흐린 라벨 | — |

단계 변화에 전환을 주지 않는다. 단계가 바뀌면 화면 내용이 함께 바뀌므로 표시만 즉시 갱신한다.

상태 속성은 `data-status`다. `data-state`는 모달이 여닫을 때 덮어쓰므로 쓰지 않는다.

## Behavior & Accessibility

- 순서가 뜻을 가지므로 `<ol>`이고, Root의 `aria-label`로 무슨 단계인지 밝힌다.
- 현재 단계는 Item의 `aria-current="step"`으로 전한다.
- 완료는 체크 아이콘만으로 전하지 않는다. Label 끝에 `.dw-visually-hidden`으로 " 완료"를 넣는다.
- 번호는 `<ol>`이 이미 읽으므로 `aria-hidden`이다.
- 좁은 화면에서 숨긴 Label은 시각적으로만 감춘다. `display: none`을 쓰지 않는다.
- 다단계 흐름의 뒤로 가기는 [interaction.md 13장](../guides/interaction.md#13-다단계-흐름)을 따른다.

키보드 조작이 없다. 포커스를 받지 않는다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| 놓인 폭 < 640px | 가로 100%. 현재 단계 Label만 보이고 Connector가 남는 폭을 채운다 |
| 놓인 폭 ≥ 640px | 모든 Label 표시. Connector 32px 고정 |

## Do / Don't

- **Do** 단계 이름은 2–6자 명사로 쓴다("배송지", "결제").
- **Do** 단계는 3–5개로 둔다. 많으면 흐름을 묶는다.
- **Don't** 지나간 단계로 이동하는 링크로 만들지 않는다. 이동은 화면의 버튼이 맡는다.
- **Don't** 현재 단계를 색으로만 구분하지 않는다.
