# Action Area

> 클래스 `.dw-action-area` · 레퍼런스 [storybook.html#action-area](../storybook.html#action-area)

## 개요

화면이나 폼의 마지막 행동을 아래쪽에 모은다. 모바일 작성 화면의 저장, 시트 하단 확인에 쓴다.
**쓰지 말 것** — 표나 카드 안의 작은 행동(Button), 다이얼로그 하단(Dialog footer).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-action-area` | ✓ | 여백과 배경 |
| Caption | `.dw-action-area__caption` | | 버튼 위 짧은 안내 |
| Buttons | `.dw-action-area__buttons` | ✓ | [Button](button.md)을 담는다 |

```html
<div class="dw-action-area dw-action-area--split dw-action-area--sticky dw-action-area--divided">
  <p class="dw-action-area__caption">저장하면 바로 적용돼요</p>
  <div class="dw-action-area__buttons">
    <button class="dw-button dw-button--neutral-weak dw-button--large" type="button">취소</button>
    <button class="dw-button dw-button--brand-solid dw-button--large" type="submit">저장</button>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| layout | `stacked` · `split` · `compact` | `stacked` | `.dw-action-area--split` · `--compact` · React `layout` |
| sticky | boolean | false | `.dw-action-area--sticky` · React `sticky` |
| divided | boolean | false | `.dw-action-area--divided` · React `divided` |
| caption | 텍스트 | 없음 | Caption 요소 · React `caption` |

## Specification

| 항목 | 값 |
| --- | --- |
| 여백 | 위아래 12px `x3`, 좌우 16px `x4` |
| 간격 | Caption과 버튼, 버튼끼리 8px `x2` |
| 배경 | `bg-layer-default` |
| Caption | t3 13/18, `fg-neutral-subtle`, 가운데 정렬. compact는 오른쪽 |
| divided | 위쪽 1px `stroke-neutral-weak` |
| sticky | `bottom: 0`, `z-raised`, 아래 여백은 12px과 안전영역 중 큰 값 |

| layout | 배치 | 버튼 |
| --- | --- | --- |
| `stacked` | 세로, 가득 | 주 버튼이 위, 보조는 아래 `ghost` |
| `split` | 가로, 1:2 | 보조가 왼쪽, 주 버튼이 오른쪽 |
| `compact` | 가로, 오른쪽 정렬, 내용 맞춤 | 데스크톱 웹. `medium` |

## States

상태가 없다. 버튼의 상태는 [Button](button.md)을 따른다.

## Behavior & Accessibility

- 저장 중에는 주 버튼에 `data-loading`을 주고 Root는 그대로 둔다.
- sticky는 스크롤 영역 안에서 붙는다. 스크롤 영역의 맨 끝 자식으로 둔다.
- 포커스가 Action Area에 가려지지 않게 스크롤 영역에 `scroll-padding-bottom`을 Root 높이만큼 준다.
- 읽는 순서는 마크업 순서다. 주 버튼을 CSS로 옮기지 않는다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| `md` 미만 | `stacked` 또는 `split`, `large` 버튼, 필요하면 sticky |
| `md`부터 | `compact`를 쓸 수 있다. sticky는 긴 폼에서만 쓴다 |

## Do / Don't

- **Do** 주 버튼은 하나만 둔다.
- **Do** 긴 작성 화면에서 sticky를 써서 저장을 찾으러 내려가지 않게 한다.
- **Don't** 버튼을 3개 이상 넣지 않는다. 나머지는 [Dropdown Menu](dropdown-menu.md)로 옮긴다.
- **Don't** 짧은 화면에 sticky를 쓰지 않는다. 내용을 가린다.
