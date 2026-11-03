# Progress Circle (Spinner)

> 클래스 `.dw-progress-circle` · 레퍼런스 [component.html#progress-circle](../component.html#progress-circle)

## 개요

작업이 진행 중임을 원형으로 보여준다. 진행률을 알면 채워지는 원(determinate), 모르면 도는 원(indeterminate, 스피너)이다.
**쓰지 말 것** — 콘텐츠 자리 로딩(Skeleton), 버튼 안 로딩([Button](button.md) `data-loading`이 자체 스피너를 가진다).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-progress-circle` | ✓ | `<svg role="progressbar">` |
| Track | `.dw-progress-circle__track` | ✓ | 바탕 원 `<circle>` |
| Range | `.dw-progress-circle__range` | ✓ | 진행 호 `<circle>` |

```html
<svg class="dw-progress-circle dw-progress-circle--40" viewBox="0 0 40 40" role="progressbar"
     aria-label="불러오는 중" data-state="indeterminate">
  <circle class="dw-progress-circle__track" cx="20" cy="20" r="17.5"/>
  <circle class="dw-progress-circle__range" cx="20" cy="20" r="17.5"/>
</svg>
```

반지름 r = (size − 두께) / 2. 둘레 C = 2πr.

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `24` · `40` | `40` | `.dw-progress-circle--24` · `--40` |
| tone | `neutral` · `brand` · `static-white` | `neutral` | `.dw-progress-circle--<tone>` |
| value | 0–100 · 없음 | 없음(indeterminate) | `aria-valuenow` + `data-state="determinate"` |

## Specification

| size | 지름 | 두께(stroke-width) | r |
| --- | --- | --- | --- |
| `24` | 24px `x6` | 3px | 10.5 |
| `40` | 40px `x10` | 5px | 17.5 |

| tone | Track | Range |
| --- | --- | --- |
| `neutral` | `bg-neutral-weak` (gray-200) | `gray-500` |
| `brand` | `bg-brand-weak` | `bg-brand-solid` |
| `static-white` | `static-white-alpha-300` | `static-white` |

- 두 원 모두 `fill: none`. Range는 `stroke-linecap: round`, 12시 방향에서 시작(`rotate(-90deg)`, 기준점 가운데).
- **determinate**: Range `stroke-dasharray: (C × value/100) C`. 값 변화 전환 `stroke-dasharray` 300ms `easing-enter`.
- **indeterminate**: Root가 1.2s마다 한 바퀴(`cubic-bezier(0.35, 0.25, 0.65, 0.75)`, 무한). Range 머리는 0→75% 구간에서 `dasharray 0 → C`, 꼬리는 33%→100% 구간에서 `dashoffset 0 → −C` (각 1.2s 무한, 머리 `cubic-bezier(0.35, 0, 0.65, 1)` · 꼬리 `cubic-bezier(0.35, 0, 0.65, 0.6)`).
- 모션 줄이기: 회전은 유지하되 3s로 느리게, 머리·꼬리 애니메이션은 끄고 1/4 호로 고정.

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Indeterminate | value 없음 | 회전 + 늘었다 줄어드는 호 |
| Determinate | value 있음 | 값만큼 채워진 호 |

## Behavior & Accessibility

- `role="progressbar"` + `aria-label`. determinate는 `aria-valuemin="0" aria-valuemax="100" aria-valuenow`.
- 로딩 영역을 감싸는 요소에 `aria-busy="true"`.
- 400ms 안에 끝나는 작업에는 띄우지 않는다(깜빡임 방지 — 300ms 지연 후 표시).

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음 |

## Do / Don't

- **Do** 전체 화면 로딩은 콘텐츠 영역 가운데에 `40`.
- **Don't** 같은 화면에 스피너와 Skeleton을 함께 쓰지 않는다.
