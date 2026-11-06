# Badge

> 클래스 `.dw-badge` · 레퍼런스 [catalog.html#badge](../catalog.html#badge)

## 개요

상태·분류를 짧게 표시하는 작은 라벨이다("진행 중", "신규"). 누르는 요소가 아니다.
**쓰지 말 것** — 선택·필터(Chip), 숫자 알림 점(v1.1 Notification Badge).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-badge` | ✓ | `<span>` |
| Icon | `.dw-badge__icon` | | 앞 아이콘 |
| Label | `.dw-badge__label` | ✓ | 한 줄, 넘치면 말줄임 |

```html
<span class="dw-badge dw-badge--positive dw-badge--weak">
  <span class="dw-badge__label">승인</span>
</span>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| tone | `neutral` · `brand` · `brand-secondary` · `informative` · `positive` · `warning` · `critical` | `neutral` | `.dw-badge--<tone>` |
| variant | `weak` · `solid` · `outline` | `weak` | `.dw-badge--<variant>` |
| size | `medium` · `large` | `medium` | `.dw-badge--large` |

## Specification

| size | min-height | padding | radius | gap | 아이콘 | font |
| --- | --- | --- | --- | --- | --- | --- |
| `medium` | 20px `x5` | 2px 6px (`x0_5` `x1_5`) | 4px `r1` | 2px | 12px | t1 11/15 |
| `large` | 24px `x6` | 4px 8px (`x1` `x2`) | 6px `r1_5` | 2px | 14px | t2 12/16 |

글자 굵기: weak **medium**, solid·outline **bold**. Root는 `inline-flex; align-items: center; overflow: hidden`, 아이콘 색은 글자색(`currentColor`).

| tone | weak (bg / 글자) | solid (bg / 글자) | outline (테두리 inset 1px / 글자) |
| --- | --- | --- | --- |
| `neutral` | `bg-neutral-weak` / `fg-neutral-muted` | `gray-800` / `fg-on-neutral-solid` | `stroke-neutral-muted` / `fg-neutral-muted` |
| `brand` | `bg-brand-weak` / `fg-brand-contrast` | `bg-brand-solid` / `fg-on-brand-solid` | `stroke-brand-weak` / `fg-brand` |
| `brand-secondary` | `bg-brand-secondary-weak` / `fg-brand-secondary-contrast` | `bg-brand-secondary-solid` / `fg-on-brand-secondary-solid` | `stroke-brand-secondary-weak` / `fg-brand-secondary` |
| `informative` | `bg-informative-weak` / `fg-informative-contrast` | `bg-informative-solid` / `fg-on-informative-solid` | `stroke-informative-weak` / `fg-informative` |
| `positive` | `bg-positive-weak` / `fg-positive-contrast` | `bg-positive-solid` / `fg-on-positive-solid` | `stroke-positive-weak` / `fg-positive` |
| `warning` | `bg-warning-weak` / `fg-warning-contrast` | `bg-warning-solid` / `fg-on-warning-solid` | `stroke-warning-weak` / `fg-warning` |
| `critical` | `bg-critical-weak` / `fg-critical-contrast` | `bg-critical-solid` / `fg-on-critical-solid` | `stroke-critical-weak` / `fg-critical` |

## States

정적 요소라 상호작용 상태가 없다.

## Behavior & Accessibility

- 텍스트 그대로 읽힌다. 색만으로 의미를 전하지 않는다 — 라벨 문구가 의미를 가져야 한다.
- 표 셀 등에서 상태를 나타낼 때 라벨은 명사·완료형("승인", "반려", "대기").

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음 |

## Do / Don't

- **Do** 한 화면에서 같은 상태엔 같은 tone·variant.
- **Don't** 한 줄에 Badge를 3개 넘게 늘어놓지 않는다.
