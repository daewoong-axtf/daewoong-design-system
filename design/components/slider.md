# Slider

> 클래스 `.dw-slider` · 레퍼런스 [storybook.html#slider](../storybook.html#slider)

## 개요

연속된 범위에서 값 하나를 끌어서 고른다(음량, 가격 상한). 정확한 값이 중요하면 숫자 입력을 함께 둔다.
**쓰지 말 것** — 정확한 숫자 입력(Text Input), 보기 몇 개 중 선택(Segmented Control).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-slider` | ✓ | `<input type="range">` 자체. 트랙·채움·손잡이를 의사 요소로 그린다 |

채움(range) 폭은 `--value`(0–100, %)로 그린다. 값이 바뀌면 갱신한다.

```html
<input class="dw-slider" type="range" min="0" max="100" value="40" style="--value: 40" aria-label="음량">
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| min · max · step | 숫자 | 0 · 100 · 1 | 네이티브 속성 |
| value | 숫자 | min | `value` + `--value` |
| disabled | boolean | false | `disabled` |

## Specification

| 항목 | 값 |
| --- | --- |
| 전체 높이 | 26px |
| 트랙 | 높이 4px `x1`, `radius-full`, `stroke-neutral-weak`(gray-400) |
| 채움 | 트랙 왼쪽부터 값까지, `fg-neutral` |
| 손잡이 | 20×20px `x5` 원, `bg-neutral-solid`, 그림자 `shadow-s1` |
| 드래그 중 손잡이 | `scale(1.2)` |
| disabled | 트랙 `bg-disabled`, 채움·손잡이 `fg-disabled`, `cursor: not-allowed` |
| focus-visible | 손잡이에 `outline 2px stroke-focus-ring`, offset 2px |

전환: 손잡이 `transform`·outline `duration-d3` `easing-easing`.

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Dragging | 손잡이를 잡고 끔 | 손잡이 1.2배, `cursor: grabbing` |
| Focus-visible | 키보드 | 손잡이 포커스 링 |
| Disabled | `disabled` | 위 색 |

## Behavior & Accessibility

- 네이티브 `<input type="range">`(APG Slider 키보드 동작이 기본 제공).
- 라벨은 `<label for>` 또는 `aria-label`. 값에 단위가 있으면 `aria-valuetext`("40%").
- 트랙 아무 곳이나 누르면 그 값으로 이동한다.

| 키 | 동작 |
| --- | --- |
| ← ↓ / → ↑ | step만큼 감소/증가 |
| PageDown / PageUp | 10 step |
| Home / End | min / max |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 폭은 부모를 채운다. 손잡이 히트 영역은 터치에서 44px |

## Do / Don't

- **Do** 현재 값을 슬라이더 옆이나 위에 텍스트로 보여준다.
- **Don't** 범위가 아주 넓은 값(0–100,000)을 슬라이더만으로 받지 않는다.
