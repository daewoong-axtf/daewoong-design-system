# Reveal

> 클래스 `.dw-reveal` · 레퍼런스 [storybook.html#reveal](../storybook.html#reveal)

## 개요

화면 아래에 있던 내용이 스크롤로 들어올 때 살짝 떠오르며 나타나게 하는 래퍼다. 소개 페이지처럼 읽어 내려가는 화면의 구역 단위에 쓴다.
**쓰지 말 것** — 표·폼·목록처럼 일하는 화면, 데이터 로딩 표시([Skeleton](skeleton.md)), 경고·오류처럼 바로 읽어야 하는 내용.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-reveal` | ✓ | 감싸는 블록. `data-dw="reveal"` |

```html
<div class="dw-reveal" data-dw="reveal">…내용…</div>

<!-- 순차 등장 -->
<div class="dw-reveal" data-dw="reveal" style="--dw-reveal-delay: 80ms">…내용…</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| delay | 0–240ms, 80ms 단위 | `0ms` | `--dw-reveal-delay` |
| once | boolean | `true` | `data-once="false"`면 벗어날 때 다시 숨겨 되풀이한다 |

## Specification

### 크기

| 항목 | 값 |
| --- | --- |
| 이동 거리 | 위로 20px `x5` (`translate`) |
| 판정 | 요소가 1px이라도 뷰포트에 들어오면 (`threshold: 0`, `rootMargin: 0`) |

### 색

색이 없다. 내용의 색을 바꾸지 않는다.

`threshold`나 음수 `rootMargin`을 주지 않는다. 화면보다 훨씬 긴 요소와 페이지 맨 아래의 낮은 요소는 그 조건에 끝내 닿지 못해 영영 보이지 않는다.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| 기본 | 스크립트 없음, 처음 화면 안이나 위, 모션 줄이기 | 그대로 보임. `data-reveal` 없음 | — |
| Hidden | 로드 때 뷰포트 아래에 있음 | `data-reveal="hidden"`: `opacity: 0`, `translate: 0 20px` | 없음 |
| Visible | 뷰포트 진입 | `data-reveal="visible"`: 기본 모습으로 | `duration-d6` `easing-enter` + delay |

## Behavior & Accessibility

- **기본이 보이는 상태다.** 숨김은 스크립트가 `data-reveal="hidden"`을 붙일 때만 걸린다. 스크립트가 실패하거나 없어도 내용이 보인다.
- 로드 때 뷰포트 아래에 있는 요소만 숨긴다. 이미 화면에 있거나 위로 지나간 요소는 건드리지 않는다. 보이던 내용을 지웠다 그리면 깜빡인다.
- `prefers-reduced-motion: reduce`면 스크립트가 숨기지 않고, 스타일도 숨김을 무효로 한다. 움직임 없이 처음부터 보인다.
- `IntersectionObserver`가 없으면 숨기지 않는다.
- 숨김은 `opacity`로만 한다. `visibility`·`display`를 쓰지 않으므로 스크린리더와 찾기(Ctrl+F), 키보드 포커스가 그대로 닿는다. 포커스가 들어가면 스크롤이 따라가 나타난다.
- 인쇄할 때는 숨김을 무효로 한다.
- 스크립트 실행 뒤 DOM에 추가된 요소는 효과 없이 그대로 보인다.

키보드 조작이 없다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음 |

## Do / Don't

- **Do** 구역이나 카드 묶음 단위로 건다.
- **Do** 한 줄의 순차 등장은 3개 안팎으로 하고 delay 합을 240ms 안에 둔다.
- **Don't** 첫 화면의 핵심 내용에 걸지 않는다.
- **Don't** 문단·표 행마다 걸지 않는다.
