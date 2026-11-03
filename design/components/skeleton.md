# Skeleton

> 클래스 `.dw-skeleton` · 레퍼런스 [component.html#skeleton](../component.html#skeleton)

## 개요

데이터를 불러오는 동안 실제 콘텐츠 **모양 그대로** 회색 자리를 보여준다. 로드가 끝나면 같은 자리에 실제 콘텐츠가 들어가 레이아웃이 움직이지 않는다.
**쓰지 말 것** — 버튼 클릭 후 처리 중(Button loading), 위치를 알 수 없는 로딩(Progress Circle).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-skeleton` | ✓ | 크기를 가진 빈 블록. 반짝이는 띠는 `::after` |

```html
<div aria-busy="true" aria-label="불러오는 중">
  <span class="dw-skeleton dw-skeleton--full" style="width:40px;height:40px"></span>
  <span class="dw-skeleton" style="width:60%;height:19px"></span>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| radius | `0` · `8` · `16` · `full` | `8` | `.dw-skeleton--r0` · 기본 · `--r16` · `--full` |
| width · height | 길이 | 부모·내용에 따름 | 인라인 스타일 또는 유틸리티 |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | `display: inline-block`(블록 자리면 `block`), `overflow: hidden`, bg `bg-neutral-weak`(gray-200) |
| radius | `0` 0 · `8` 8px `r2` · `16` 16px `r4` · `full` `radius-full` |
| 띠(`::after`) | 너비·높이 100%, `linear-gradient(90deg, transparent 0%, 띠색 46%, 띠색 54%, transparent 100%)` |
| 띠색 | light `static-white-alpha-700` · dark `static-white-alpha-100` |
| 움직임 | `translateX(-100%) → translateX(100%)`, 1.5s `easing-easing`, 무한 |
| 모션 줄이기 | 띠 숨김, 정지된 회색 블록 |

텍스트 줄 자리는 높이 = 해당 텍스트 스타일의 줄높이(예: t4 → 19px), 줄 사이 간격은 실제 콘텐츠와 같게 둔다. 마지막 줄은 60% 폭.

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Loading | 데이터 요청 중 | 띠 반복 |
| Loaded | 응답 | Skeleton을 실제 콘텐츠로 교체(전환 없이 바로) |

## Behavior & Accessibility

- 각 Skeleton은 장식이다. 감싸는 영역에 `aria-busy="true"`와 `aria-label="불러오는 중"`을 두고, 로드가 끝나면 `aria-busy`를 지운다.
- 300ms 안에 끝나면 Skeleton을 띄우지 않아도 된다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 실제 콘텐츠의 반응형 규칙을 그대로 따른다(모바일 1열이면 Skeleton도 1열) |

## Do / Don't

- **Do** 실제 콘텐츠와 크기·배치를 맞춘다.
- **Don't** 버튼·라벨처럼 고정 텍스트까지 Skeleton으로 만들지 않는다 — 불러오는 데이터만.
