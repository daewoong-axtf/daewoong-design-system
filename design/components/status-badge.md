# Status Badge

> 클래스 `.dw-status-badge` · 레퍼런스 [storybook.html#status-badge](../storybook.html#status-badge)

## 개요

표·목록·상세 머리에서 대상의 **현재 상태**나 **역할**을 한눈에 구분하게 하는 라벨이다. 상태는 점을 붙여 "지금 이 상태"임을 보이고, 역할처럼 변하지 않는 속성은 점을 뺀다. 누르는 요소가 아니다.
**쓰지 말 것** — 대상의 분류·표시("신규", "추천")는 [Badge](badge.md), 선택·필터는 [Chip](chip.md), 진행 단계는 [Stepper](stepper.md).

**Badge와의 구분**

| 묻는 것 | Status Badge | [Badge](badge.md) |
| --- | --- | --- |
| 무엇을 말하나 | 대상이 지금 어떤 상태인가, 어떤 역할인가 | 대상에 붙은 분류·표시 |
| 시간에 따라 | 같은 대상이 값을 바꿔 가며 한 칸을 차지한다 | 있거나 없다 |
| 모양 | 옅은 바탕 한 종류, 점으로 상태를 표시 | weak·solid·outline, 아이콘 가능 |
| 크기 | 24px 한 종류 | 20px·24px |

표의 "상태" 열처럼 값이 열거되는 자리는 Status Badge, 제목 옆에 붙는 짧은 꼬리표는 Badge다. 같은 값을 화면마다 다른 컴포넌트로 표시하지 않는다.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-status-badge` | ✓ | `<span>` |
| Dot | `.dw-status-badge__dot` | | 지름 6px 점. 상태일 때 둔다 |
| Label | `.dw-status-badge__label` | ✓ | 한 줄, 넘치면 말줄임 |

```html
<!-- 상태: 점 있음 -->
<span class="dw-status-badge dw-status-badge--positive">
  <span class="dw-status-badge__dot" aria-hidden="true"></span>
  <span class="dw-status-badge__label">활성</span>
</span>

<!-- 역할: 점 없음 -->
<span class="dw-status-badge dw-status-badge--brand">
  <span class="dw-status-badge__label">관리자</span>
</span>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| tone | `neutral` · `brand` · `informative` · `positive` · `warning` · `critical` | `neutral` | `.dw-status-badge--<tone>` |
| dot | boolean | `true` | `.dw-status-badge__dot` 유무 |

## Specification

### 크기

| min-height | padding | gap | radius | Dot | font |
| --- | --- | --- | --- | --- | --- |
| 24px `x6` | 2px 8px (`x0_5` `x2`) | 6px `x1_5` | 6px `r1_5` | 6px `x1_5`, `radius-full` | t2 12/16 medium |

Root는 `inline-flex; align-items: center; overflow: hidden; max-width: 100%`이다.

### 색

Dot은 글자색(`currentColor`)을 따른다.

| tone | bg | fg |
| --- | --- | --- |
| `neutral` | `bg-neutral-weak` | `fg-neutral-muted` |
| `brand` | `bg-brand-weak` | `fg-brand-contrast` |
| `informative` | `bg-informative-weak` | `fg-informative-contrast` |
| `positive` | `bg-positive-weak` | `fg-positive-contrast` |
| `warning` | `bg-warning-weak` | `fg-warning-contrast` |
| `critical` | `bg-critical-weak` | `fg-critical-contrast` |

### tone 고르기

| 의미 | tone |
| --- | --- |
| 정상·활성·완료 | `positive` |
| 비활성·기본 등급·종료 | `neutral` |
| 진행 중·담당 | `informative` |
| 대기·주의·중간 권한 | `warning` |
| 실패·중지 | `critical` |
| 최상위 권한·강조 | `brand` |

역할에 tone을 줄 때는 권한이 높을수록 `brand`에 가깝게 둔다. 한 제품 안에서 값과 tone의 대응을 표로 정해 두고 지킨다.

## States

정적 요소라 상호작용 상태가 없다.

## Behavior & Accessibility

- 텍스트 그대로 읽힌다. Dot은 장식이므로 `aria-hidden="true"`다.
- 색만으로 의미를 전하지 않는다. 라벨이 의미를 가져야 한다.
- 실시간으로 값이 바뀌는 자리는 Status Badge가 아니라 감싸는 영역에 `role="status"`를 둔다.
- 라벨은 명사·완료형으로 쓴다("활성", "대기", "중지").

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음. 부모보다 넓으면 Label이 말줄임된다 |

## Do / Don't

- **Do** 같은 값에는 화면이 달라도 같은 tone을 쓴다.
- **Do** 상태는 점을 붙이고 역할은 점을 뺀다.
- **Don't** 버튼처럼 눌리게 만들지 않는다.
- **Don't** 한 칸에 Status Badge를 2개 넘게 두지 않는다.
