# Switch

> 클래스 `.dw-switch` · 레퍼런스 [catalog.html#switch](../catalog.html#switch)

## 개요

설정 하나를 **즉시** 켜고 끈다. 저장 버튼 없이 바로 반영된다.
**쓰지 말 것** — 제출해야 반영되는 폼 안의 선택(Checkbox).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-switch` | ✓ | `<label>` |
| Label | `.dw-switch__label` | | 설정 이름. 라벨 앞(왼쪽)에 둔다 |
| Control | `.dw-switch__control` | ✓ | `<input type="checkbox" role="switch">`, 트랙을 그린다 |

손잡이(thumb)는 Control의 `::after`.

```html
<label class="dw-switch">
  <span class="dw-switch__label">푸시 알림</span>
  <input class="dw-switch__control" type="checkbox" role="switch" checked>
</label>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `16` · `24` · `32` | `32` | `.dw-switch--16` · `--24` · `--32` |
| tone | `brand` · `neutral` | `brand` | `.dw-switch--neutral` |
| checked · disabled | boolean | false | Control 속성 |

## Specification

| size | 트랙 (W×H) | 안쪽 여백 | 손잡이 | 켜짐 이동 | Root min-height | Label font | gap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `16` | 26×16px | 2px | 12px | 10px | 24px `x6` | t3 13/18 | 6px `x1_5` |
| `24` | 38×24px | 2px | 20px | 14px | 24px `x6` | t4 14/19 | 8px `x2` |
| `32` | 52×32px | 3px | 26px | 20px | 32px `x8` | t5 16/22 | 10px `x2_5` |

- 트랙·손잡이 모두 `radius-full`. 트랙 그림자는 `shadow-s1`.
- 손잡이는 꺼짐에서 `scale(0.8)`, 켜짐에서 `scale(1) translateX(이동)`.
- Label은 `font-weight-medium`, `fg-neutral`.

| 상태 | 트랙 | 손잡이 |
| --- | --- | --- |
| 꺼짐 | `fg-placeholder` (gray-600) | brand: `static-white` / neutral: `fg-on-neutral-solid` |
| 켜짐(brand) | `bg-brand-solid` | `static-white` |
| 켜짐(neutral) | `bg-neutral-solid` | `fg-on-neutral-solid` |
| disabled | 위 색 그대로 + Control `opacity: 0.38`, Label `opacity: 0.58` | neutral 꺼짐 손잡이는 `static-black-alpha-700` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| On/Off | 클릭·Space | 트랙 색, 손잡이 이동·확대 | 손잡이 `transform` `duration-d3` `easing-easing`; 트랙 `background-color` `duration-d1` `easing-easing` 20ms 지연 |
| Pressed | `:active` | Control `scale-s95` | `duration-pressed-scale` |
| Focus-visible | 키보드 | 트랙에 `outline 2px stroke-focus-ring`, offset 2px | |
| Disabled | `disabled` | opacity 위 표 | Label `opacity` `duration-d1` |

## Behavior & Accessibility

- `<input type="checkbox" role="switch">` — 스크린리더가 "스위치, 켬/끔"으로 읽는다.
- 바뀌는 즉시 저장한다. 실패하면 이전 상태로 되돌리고 Toast로 알린다.
- 라벨이 화면에 없으면 Control에 `aria-label`.

| 키 | 동작 |
| --- | --- |
| Space | 켜기/끄기 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음. 설정 목록에서는 Root를 `width: 100%; justify-content: space-between`으로 라벨 왼쪽·스위치 오른쪽 |

## Do / Don't

- **Do** 라벨은 켜졌을 때의 상태를 쓴다("알림 받기").
- **Don't** "켜짐/꺼짐" 텍스트를 스위치 옆에 따로 붙이지 않는다.
