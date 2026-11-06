# Segmented Control

> 클래스 `.dw-segmented` · 레퍼런스 [catalog.html#segmented-control](../catalog.html#segmented-control)

## 개요

2–5개의 보기 중 하나를 골라 **같은 화면의 보기 방식**을 바로 바꾼다(목록/지도, 주/월).
**쓰지 말 것** — 서로 다른 콘텐츠 영역 전환(Tabs), 폼 입력값 선택(Radio).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-segmented` | ✓ | `role="radiogroup"`, 회색 알약 트랙 |
| Indicator | `.dw-segmented__indicator` | ✓ | 선택된 칸 뒤의 흰 알약. 선택이 바뀌면 미끄러진다 |
| Item | `.dw-segmented__item` | ✓ | `<label>` + 숨긴 `<input type="radio">` |

```html
<div class="dw-segmented" role="radiogroup" aria-label="보기 방식" style="--count: 2; --index: 0">
  <span class="dw-segmented__indicator" aria-hidden="true"></span>
  <label class="dw-segmented__item"><input type="radio" name="view" value="list" checked>목록</label>
  <label class="dw-segmented__item"><input type="radio" name="view" value="map">지도</label>
</div>
```

`--count`(칸 수)와 `--index`(선택 칸 0부터)를 Root에 둔다. 선택이 바뀌면 `--index`를 갱신한다.

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| items | 2–5 | — | Item 개수, `--count` |
| value | 보기 하나 | 첫 보기 | `checked`, `--index` |
| disabled | boolean (항목별) | false | 해당 `<input disabled>` |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | grid, 칸 너비 균등(`grid-auto-columns: 1fr`), padding 4px `x1`, `radius-full`, `bg-neutral-weak-alpha` |
| Indicator | Root 안쪽 4px 띄우고 칸 하나 크기, `radius-full`, bg `gray-00`, `inset 0 0 0 1px stroke-neutral-muted`, 그림자 `shadow-s1`, `translateX(index × 100%)` |
| Item | min 86×34px, padding 6px 24px (`x1_5` `x6`), gap 6px, `radius-full`, t5 16/22 **bold**, 가운데 정렬 |
| Item 글자 | 기본 `fg-neutral-subtle`, 선택 `fg-neutral`, disabled `fg-disabled` |
| Item hover (선택 안 됨) | bg `bg-neutral-weak-pressed` |
| Item hover (선택됨) | bg `gray-100` + `inset 0 0 0 1px stroke-neutral-muted` |
| Item disabled 선택됨 | bg `bg-disabled` + `inset 0 0 0 1px stroke-neutral-muted` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| 선택 변경 | 클릭·화살표 | Indicator 이동, 글자 색 | Indicator `transform` `duration-d4` `easing-easing`; 글자·배경 `duration-color-transition` |
| Pressed | `:active` | Item 내용 `scale-s95` | |
| Focus-visible | 키보드 | Item에 `outline 2px stroke-focus-ring`, offset 2px | |

## Behavior & Accessibility

- 네이티브 radio 묶음(Radio와 같은 키보드 동작). `<input>`은 시각적으로 숨기고 포커스 표시는 Item(`:has(:focus-visible)`)에.
- Root에 `aria-label` 또는 `aria-labelledby`.
- 선택은 즉시 반영된다(제출 없음).

| 키 | 동작 |
| --- | --- |
| ← / → | 이전/다음 칸 선택 |
| Tab | 그룹 진입·이탈 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | Root는 내용 폭(`inline-grid`). 모바일 상단 전환은 `width: 100%` |

## Do / Don't

- **Do** 라벨은 길이가 비슷한 1–2 단어.
- **Don't** 6개 이상 두지 않는다(Tabs 또는 Select).
