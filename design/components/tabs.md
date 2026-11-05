# Tabs

> 클래스 `.dw-tabs` · 레퍼런스 [storybook.html#tabs](../storybook.html#tabs)

## 개요

같은 화면 안에서 성격이 다른 콘텐츠 영역을 전환한다("진행 중 / 완료 / 취소"). 선택한 탭 아래 검은 선이 붙는다.
**쓰지 말 것** — 같은 내용의 보기 방식만 바꿀 때(Segmented Control), 다른 페이지 이동(내비게이션 링크).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-tabs` | ✓ | `data-dw="tabs"` |
| List | `.dw-tabs__list` | ✓ | `role="tablist"`, 아래 1px 선 |
| Trigger | `.dw-tabs__trigger` | ✓ | `role="tab"` `<button>` |
| Indicator | `.dw-tabs__indicator` | ✓ | 선택 탭 아래 2px 선. 선택이 바뀌면 미끄러진다 |
| Panel | `.dw-tabs__panel` | ✓ | `role="tabpanel"` |

```html
<div class="dw-tabs" data-dw="tabs">
  <div class="dw-tabs__list" role="tablist" aria-label="주문 상태">
    <button type="button" class="dw-tabs__trigger" role="tab" id="tab-a" aria-selected="true" aria-controls="panel-a">진행 중</button>
    <button type="button" class="dw-tabs__trigger" role="tab" id="tab-b" aria-selected="false" aria-controls="panel-b" tabindex="-1">완료</button>
    <span class="dw-tabs__indicator" aria-hidden="true"></span>
  </div>
  <div class="dw-tabs__panel" role="tabpanel" id="panel-a" aria-labelledby="tab-a" tabindex="0">…</div>
  <div class="dw-tabs__panel" role="tabpanel" id="panel-b" aria-labelledby="tab-b" tabindex="0" hidden>…</div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `small` · `medium` | `medium` | `.dw-tabs--small` |
| layout | `hug` · `fill` | `hug` | `.dw-tabs--fill` (탭이 폭을 나눠 가짐) |
| sticky | boolean | false | `.dw-tabs--sticky` (List가 스크롤 시 위에 붙음) |
| count | 숫자 | 없음 | Trigger 안 `<span class="dw-tabs__count">` |

## Specification

| size | List·Trigger 높이 | Trigger padding | font |
| --- | --- | --- | --- |
| `small` | 40px | 10px `x2_5` | t4 14/19 bold |
| `medium` | 44px | 10px `x2_5` | t5 16/22 bold |

| 항목 | 값 |
| --- | --- |
| List | bg `bg-layer-default`, 아래 선 `inset 0 -1px stroke-neutral-muted`, `overflow-x: auto`(스크롤바 숨김), 줄바꿈 없음 |
| `hug` | List 좌우 padding 16px(gutter), 탭은 내용 폭, 왼쪽 정렬 |
| `fill` | List padding 0, 각 탭 `flex: 1`. Indicator는 탭 폭에서 좌우 16px씩 뺀 길이 |
| Trigger 글자 | 기본 `fg-neutral-subtle`, 선택 `fg-neutral`, disabled `fg-disabled` |
| Trigger 정렬 | `align-items: flex-end`(글자를 아래쪽에), 가운데 정렬, `white-space: nowrap` |
| Indicator | 높이 2px, `fg-neutral`, List 바닥에 붙음, 위치·폭은 선택 탭에 맞춤 |
| Count | 탭 라벨 뒤 4px, 같은 글자 크기 regular |
| sticky | List `position: sticky; top: 0; z-index: 1` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| 선택 변경 | 클릭·화살표 | 글자 색, Indicator 이동 | Indicator `left`·`width` `duration-d4` `easing-easing` |
| Pressed | `:active` | Trigger `scale-s97` | `duration-pressed-scale` |
| Focus-visible | 키보드 | Trigger 안쪽 `outline 2px stroke-focus-ring`(offset −2px) | |
| Disabled | `disabled` | `fg-disabled`, 건너뜀 | |

## Behavior & Accessibility

WAI-ARIA APG **Tabs** 패턴(자동 활성화).

- 선택 탭만 `tabindex="0"`, 나머지 `-1`(roving). 화살표로 이동하면 **바로 선택**된다.
- 선택 탭이 List 밖에 있으면 보이게 가로 스크롤(`scroll-margin-inline: 16px`).
- Panel은 `tabindex="0"`(안에 포커스 가능한 요소가 없을 때 키보드로 진입 가능하게).
- 탭 상태를 URL 쿼리에 반영할지는 화면이 정한다(새로고침 시 유지 권장).

| 키 | 동작 |
| --- | --- |
| ← / → | 이전/다음 탭 선택 (끝에서 순환, disabled 건너뜀) |
| Home / End | 첫/마지막 탭 |
| Tab | 선택 탭 → Panel |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 탭 2–3개는 `fill`, 그 이상은 `hug` + 가로 스크롤 |
| ≥ 768px | `hug` |

## Do / Don't

- **Do** 탭 라벨은 1–2 단어, 개수는 7개 이하.
- **Don't** 탭 안에 또 탭을 두지 않는다(안쪽은 Segmented Control·Chip).
