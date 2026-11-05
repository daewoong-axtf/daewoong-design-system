# Dropdown Menu

> 클래스 `.dw-menu` · 레퍼런스 [storybook.html#dropdown-menu](../storybook.html#dropdown-menu)

## 개요

버튼(주로 `ellipsis` 아이콘 버튼)을 누르면 **행동 목록**을 띄운다(수정·공유·삭제).
**쓰지 말 것** — 폼에 제출할 값 선택(Select), 페이지 이동 내비게이션(Side/Top Navigation), 설명·폼(Popover).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Trigger | (버튼) | ✓ | `aria-haspopup="menu" aria-expanded aria-controls` |
| Content | `.dw-menu` | ✓ | `role="menu"` |
| Group | `.dw-menu__group` | | `role="group"`, 묶음 사이 구분선 |
| Group label | `.dw-menu__group-label` | | |
| Item | `.dw-menu__item` | ✓ | `role="menuitem"` `<button>` |
| Item icon | `.dw-menu__item-icon` | | 앞 아이콘 |
| Item label · description | `.dw-menu__item-label` · `.dw-menu__item-description` | ✓ · | |
| Item check | `.dw-menu__item-check` | 선택 항목일 때 | 맨 뒤 체크 아이콘. `aria-checked="true"`일 때 보인다 |

```html
<button type="button" class="dw-button dw-button--ghost dw-button--icon-only" aria-label="더 보기"
        aria-haspopup="menu" aria-expanded="false" aria-controls="menu-post" data-dw-menu="menu-post">…ellipsis…</button>
<div class="dw-menu dw-menu--medium" id="menu-post" role="menu" aria-label="게시글 메뉴" hidden>
  <div class="dw-menu__group" role="group">
    <button type="button" class="dw-menu__item" role="menuitem" tabindex="-1">
      <span class="dw-menu__item-label">수정</span>
    </button>
    <button type="button" class="dw-menu__item dw-menu__item--critical" role="menuitem" tabindex="-1">
      <span class="dw-menu__item-label">삭제</span>
    </button>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `small` · `medium` · `responsive` | `responsive` | `.dw-menu--<size>` (`responsive`는 1280 미만 medium) |
| item tone | `neutral` · `critical` | `neutral` | `.dw-menu__item--critical` |
| item disabled | boolean | false | `disabled` / `aria-disabled="true"` |
| item role | `menuitem` · `menuitemcheckbox` · `menuitemradio` | `menuitem` | `role`, 선택 항목은 `aria-checked` |

선택 항목은 Root에 `dw:menu-change`를 낸다.

| role | 누르면 | 쓰는 곳 |
| --- | --- | --- |
| `menuitemcheckbox` | 켜고 끄며 메뉴는 열려 있다 | 표의 보이는 열 |
| `menuitemradio` | 같은 `role="group"` 안에서 하나만 켜지고 메뉴가 닫힌다 | 정렬 기준 |

## Specification

| 항목 | 값 |
| --- | --- |
| Content | 폭 medium 240px · small 200px, bg `bg-layer-floating`, radius 20px `r5`, `shadow-s3`, `overflow: hidden`, Trigger와 간격 4px |
| 스크롤 영역 | 최대 높이 `min(480px, 남은 화면 높이)`, padding 위아래 8px `x2`, 묶음 사이 gap 8px |
| 묶음 구분선 | 두 번째 묶음부터 위에 1px `stroke-neutral-muted`, 좌우 16px 들여서, 아래 8px |
| Group label | medium t4 14/19 medium, padding 10px 16px · small t3 13/18 regular, padding 8px 16px · 색 `fg-neutral-subtle` |

| Item size | padding | gap | 앞 아이콘 | label | description |
| --- | --- | --- | --- | --- | --- |
| `medium` | 12px 16px (`x3` `x4`) | 12px | 22px | t5 16/22 | t3 13/18 |
| `small` | 10px 16px (`x2_5` `x4`) | 8px | 18px | t4 14/19 | t2 12/16 |

- label regular · neutral `fg-neutral` / critical `fg-critical`(아이콘도), description `fg-neutral-subtle`, disabled 모두 `fg-disabled`.
- hover·키보드 강조: Item 뒤에 좌우 8px 들인 radius 12px `r3` 면 `bg-transparent-pressed`(`::before`). focus-visible은 같은 자리에 `outline 2px stroke-focus-ring`(안쪽).
- 열기 opacity 0→1 + scale 0.95→1 `duration-d3` `easing-enter`, 닫기 opacity·scale 0.95 `duration-d2` `easing-exit`, 기준점 = Trigger 쪽 모서리.

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Closed | — | `hidden` |
| Open | Trigger 클릭·Enter·Space·↓ (↑는 마지막 Item) | 첫 Item에 포커스 |
| Highlighted | 화살표·hover | 강조 면 |
| Pressed | `:active` | Item 내용 `scale-s97` |
| Selected | 클릭·Enter | 행동 실행, 닫힘, 포커스 Trigger로 |

## Behavior & Accessibility

WAI-ARIA APG **Menu Button** 패턴.

- Item은 `tabindex="-1"`로 두고 **roving focus**(화살표로 실제 포커스 이동).
- 바깥 클릭·Esc·Tab으로 닫힌다. Tab은 닫고 Trigger 다음 요소로.
- 파괴적 행동(삭제)은 Item에서 바로 실행하지 않고 [Alert Dialog](alert-dialog.md)로 확인한다.

| 키 | 동작 |
| --- | --- |
| Enter · Space · ↓ | (Trigger) 열고 첫 Item |
| ↑ | (Trigger) 열고 마지막 Item |
| ↓ / ↑ | 다음/이전 Item (끝에서 처음으로 순환, disabled 건너뜀) |
| Home / End | 처음/마지막 Item |
| Enter · Space | 실행 |
| Esc | 닫고 Trigger로 |
| 문자 | 그 글자로 시작하는 Item |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | Content 대신 Bottom Sheet에 같은 목록을 띄운다(Item 높이 그대로, 시트 좌우 여백 16px) |
| < 1280px | `responsive` = `medium` |
| ≥ 1280px | `responsive` = `small` |

## Do / Don't

- **Do** 파괴적 Item은 마지막 묶음에 따로 둔다.
- **Don't** 메뉴 안에 하위 메뉴를 두지 않는다(v1 범위 밖).
