# Divider

> 클래스 `.dw-divider` · 레퍼런스 [component.html#divider](../component.html#divider) · DW 구성(원본 recipe 없음)

## 개요

내용 묶음 사이를 가르는 선이다. 같은 화면 안에서 섹션을 나눌 때 쓴다.
**쓰지 말 것** — 간격만으로 충분히 구분될 때(여백 우선), 목록 행 사이(List `divided`).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-divider` | ✓ | `<hr>` (가로) · `<div role="separator" aria-orientation="vertical">` (세로) |

```html
<hr class="dw-divider">
<hr class="dw-divider dw-divider--thick">
<span class="dw-divider dw-divider--vertical" role="separator" aria-orientation="vertical"></span>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| orientation | `horizontal` · `vertical` | `horizontal` | `.dw-divider--vertical` |
| weight | `thin` · `thick` | `thin` | `.dw-divider--thick` |
| inset | boolean | false | `.dw-divider--inset` (좌우 16px 들임) |

## Specification

| 항목 | 값 |
| --- | --- |
| thin | 두께 1px, `stroke-neutral-subtle` |
| thick | 두께 8px, `bg-neutral-weak` (모바일 섹션 구분 띠) |
| horizontal | 너비 100%, `margin: 0`, `border: 0` |
| vertical | 높이 = 부모 줄높이(기본 12px), 두께 1px, `align-self: center`, 좌우 margin 8px `x2` |
| inset | 좌우 margin 16px `x4` |

## States

정적 요소라 상태가 없다.

## Behavior & Accessibility

- 의미 있는 구분이면 `<hr>`(separator로 읽힘). 순수 장식이면 `aria-hidden="true"` 또는 CSS 테두리.
- 텍스트 사이 세로 구분(예: "수정 | 삭제")은 장식이므로 `aria-hidden="true"`.

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 섹션 구분은 `thick`(화면 끝까지) |
| ≥ 768px | 섹션 구분은 `thin` |

## Do / Don't

- **Do** 선보다 여백을 먼저 쓴다.
- **Don't** 카드 테두리와 Divider를 겹쳐 이중선을 만들지 않는다.
