# Side Navigation

> 클래스 `.dw-sidenav` · 레퍼런스 [storybook.html#side-navigation](../storybook.html#side-navigation)

## 개요

서비스의 주요 메뉴를 화면 왼쪽 세로 막대로 보여준다(관리 화면·웹 서비스). 접어서 아이콘만 남길 수 있고, 모바일에서는 서랍(off-canvas)이 된다.
**쓰지 말 것** — 메뉴가 3개 이하인 단순 서비스(Top Navigation 또는 Tabs).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-sidenav` | ✓ | `<nav aria-label="주 메뉴">`, `data-state="expanded"·"collapsed"` |
| Header | `.dw-sidenav__header` | | 로고·서비스 이름 |
| Collapse trigger | `.dw-sidenav__trigger` | | 접기/펼치기 버튼 |
| Content | `.dw-sidenav__content` | ✓ | 스크롤 영역 |
| Group | `.dw-sidenav__group` | | 메뉴 묶음 |
| Group label | `.dw-sidenav__group-label` | | |
| Item | `.dw-sidenav__item` | ✓ | `<a>`, 현재 페이지 `aria-current="page"` |
| Item icon | `.dw-sidenav__item-icon` | ✓ | 20px |
| Item label | `.dw-sidenav__item-label` | ✓ | |
| Sub toggle | `.dw-sidenav__item--parent` | | 하위 메뉴를 가진 Item(`<button aria-expanded>`) + `chevron-up` |
| Sub panel | `.dw-sidenav__panel` | | 하위 Item 목록 |
| Footer | `.dw-sidenav__footer` | | 계정·설정 |

```html
<nav class="dw-sidenav" aria-label="주 메뉴" data-state="expanded">
  <div class="dw-sidenav__header">…로고…</div>
  <button type="button" class="dw-sidenav__trigger" aria-label="메뉴 접기" aria-expanded="true">…</button>
  <div class="dw-sidenav__content">
    <div class="dw-sidenav__group" role="group" aria-labelledby="g1">
      <p class="dw-sidenav__group-label" id="g1">운영</p>
      <a class="dw-sidenav__item" href="/schedule" aria-current="page">
        <svg class="dw-sidenav__item-icon" aria-hidden="true">…calendar…</svg>
        <span class="dw-sidenav__item-label">일정</span>
      </a>
    </div>
  </div>
</nav>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| state | `expanded` · `collapsed` | `expanded` | Root `data-state` |
| current | Item 하나 | — | `aria-current="page"` |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | 너비 **240px**(접힘 **56px**), 높이 100%, bg `gray-100`, 오른쪽 선 `inset -1px 0 0 0 stroke-neutral-muted`, 세로 배치 |
| Header | padding 8px, min-height 64px |
| Trigger | 40×40px, padding 10px, radius 8px `r2`, 아이콘 18px `fg-neutral-subtle`, 위치 top 12px · right 12px(접힘 시 right 8px), hover `bg-transparent-pressed` |
| Content | padding 8px 8px 24px, 묶음 사이 gap 8px, `overflow-y: auto`(얇은 스크롤바), 아래 24px 페이드. 스크롤되면 위 1px `stroke-neutral-muted` |
| Group label | padding 6px, t4 14/19 bold `fg-neutral-muted`, 한 줄 말줄임. 접힘 시 숨김(opacity 0, 높이 접힘) |
| Item | 높이 44px, 좌우 padding 8px(접힘 10px), gap 12px, radius 10px `r2_5`, 너비 100% |
| Item icon | 20px, 기본 `fg-placeholder`(gray-600), 현재 `fg-neutral`, disabled `fg-disabled` |
| Item label | padding 6px, t4 14/19 medium, 기본 `fg-neutral-muted`, 현재 `fg-neutral`, 한 줄 말줄임. 접힘 시 opacity 0 |
| Item hover | `bg-transparent-pressed` |
| Item current | bg `bg-transparent-selected`, hover `bg-transparent-selected-pressed` |
| Sub toggle chevron | 16px `fg-neutral-subtle`, 닫힘에서 180° |
| Sub panel | 하위 Item은 아이콘 자리만큼 들여 씀(왼쪽 padding 40px), 펼침 `height`·`opacity` `duration-d4` `easing-easing` |
| Footer | padding 8px, 비면 숨김 |
| 접기/펼치기 | Root `width` `duration-d4` `easing-easing`, 라벨 opacity `duration-d2` |

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Expanded / Collapsed | Trigger | 위 폭·라벨 전환. 접힘 상태는 사용자별로 기억(local 저장) |
| Hover | Item + 정밀 포인터 | hover 면 |
| Current | 현재 경로 | current 면·색 |
| Focus-visible | 키보드 | Item 안쪽 `outline 2px stroke-focus-ring`(offset −2px, radius 10px) |

## Behavior & Accessibility

- `<nav aria-label="주 메뉴">` 안의 링크 목록. 현재 페이지 링크에 `aria-current="page"`.
- 접힌 상태에서 라벨은 시각적으로만 숨긴다(스크린리더는 계속 읽음). 접힌 Item에 hover·포커스 시 [Tooltip](tooltip.md)으로 라벨 표시(오른쪽).
- 하위 메뉴 토글은 `<button aria-expanded aria-controls>`. 현재 페이지가 하위에 있으면 처음부터 펼친다.

| 키 | 동작 |
| --- | --- |
| Tab | Item 순서대로 |
| Enter | 이동 / 하위 메뉴 토글 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 1024px | 화면에서 빠지고 [Side Sheet](side-sheet.md)(`left`, 폭 280px 또는 80%)로 연다 — Top Navigation의 `menu` 버튼. 링크를 누르면 서랍이 닫힌다. Collapse trigger 없음 |
| 1024–1279px | 기본 접힘(56px) |
| ≥ 1280px | 기본 펼침(240px) |

## Do / Don't

- **Do** 메뉴 이름은 화면 제목과 같게.
- **Don't** 하위 메뉴를 2단계보다 깊게 두지 않는다.
