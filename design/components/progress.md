# Progress

> 클래스 `.dw-progress` · 레퍼런스 [catalog.html#progress](../catalog.html#progress)

## 개요

작업의 진행을 가로 막대로 보여 준다. 진행률을 알면 값만큼 채우고(determinate), 모르면 막대가 흐른다(indeterminate).
**쓰지 말 것** — 콘텐츠 자리 로딩([Skeleton](skeleton.md)), 버튼 안 로딩([Button](button.md) `data-loading`), 단계 표시([Stepper](stepper.md)), 값을 고르는 입력([Slider](slider.md)).

**Progress Circle과의 구분**

| 묻는 것 | Progress | [Progress Circle](progress-circle.md) |
| --- | --- | --- |
| 자리 | 가로로 넓은 자리: 파일 올리기, 페이지 맨 위, 카드 안 | 작은 자리: 버튼 옆, 영역 가운데 |
| 길이 | 수 초 이상 걸리는 작업 | 짧은 대기 |
| 값 읽기 | 남은 양이 한눈에 보인다 | 대략만 보인다 |
| 크기 | 부모 폭을 채운다 | 24px·40px 고정 |

진행률을 숫자로 함께 보이거나 여러 항목의 진행을 나란히 비교하면 Progress, 진행 중이라는 사실만 알리면 Progress Circle이다.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root (Track) | `.dw-progress` | ✓ | `<div role="progressbar">` 바탕 막대 |
| Indicator | `.dw-progress__indicator` | ✓ | 채워지는 막대 |

```html
<!-- determinate -->
<div class="dw-progress" role="progressbar" aria-label="파일 올리는 중"
     aria-valuemin="0" aria-valuemax="100" aria-valuenow="60" style="--dw-progress-value: 60">
  <div class="dw-progress__indicator"></div>
</div>

<!-- indeterminate: aria-valuenow가 없다 -->
<div class="dw-progress" role="progressbar" aria-label="불러오는 중">
  <div class="dw-progress__indicator"></div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| value | 0–100 · 없음 | 없음(indeterminate) | `aria-valuenow` + `--dw-progress-value` |
| size | `medium` · `small` | `medium` | `.dw-progress--small` |
| tone | `brand` · `neutral` | `brand` | `.dw-progress--neutral` |

## Specification

### 크기

| size | height | radius |
| --- | --- | --- |
| `medium` | 8px `x2` | `radius-full` |
| `small` | 4px `x1` | `radius-full` |

Root는 `width: 100%; overflow: hidden`이다.

### 색

| tone | Track | Indicator |
| --- | --- | --- |
| `brand` | `bg-brand-weak` | `bg-brand-solid` |
| `neutral` | `bg-neutral-weak` | `gray-500` |

### 모션

- **determinate**: Indicator는 폭 100%이고 `transform: translateX(value% − 100%)`로 민다. 값 변화 전환 `transform` `duration-d6` `easing-enter`.
- **indeterminate**: Indicator 폭 40%, `translateX(-100%)` → `translateX(250%)`, 1.5s `easing-easing` 무한.
- **모션 줄이기**: 값 전환을 끈다. indeterminate는 이동 없이 폭 100%로 두고 불투명도만 1 → 0.4로 오간다(1.5s 왕복). 멈춘 40% 막대는 40% 진행처럼 보이므로 쓰지 않는다.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Determinate | value 있음 | 값만큼 채워짐 | `transform` `duration-d6` `easing-enter` |
| Indeterminate | value 없음 | 40% 막대가 왼쪽에서 오른쪽으로 흐름 | 위 모션 |
| Complete | value 100 | 가득 참. 곧 다음 화면·완료 표시로 넘긴다 | — |

상태 구분은 `aria-valuenow` 유무로 한다. `data-state`는 모달이 여닫을 때 덮어쓰므로 쓰지 않는다.

## Behavior & Accessibility

- `role="progressbar"` + `aria-label`(또는 `aria-labelledby`). determinate는 `aria-valuemin="0" aria-valuemax="100" aria-valuenow`, indeterminate는 `aria-valuenow`를 두지 않는다.
- 값 범위 밖은 0–100으로 자른다.
- 로딩 영역을 감싸는 요소에 `aria-busy="true"`를 둔다.
- 값 변화를 일일이 읽히지 않는다. 끝나면 Toast 등으로 결과를 알린다.

키보드 조작이 없다. 포커스를 받지 않는다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 부모 폭을 채운다 |

## Do / Don't

- **Do** 진행률을 알면 determinate를 쓴다.
- **Do** 무엇이 진행 중인지 옆에 글로 쓴다("파일 올리는 중 3/5").
- **Don't** 값을 지어내 움직이지 않는다. 모르면 indeterminate다.
- **Don't** 값을 뒤로 되돌리지 않는다.
