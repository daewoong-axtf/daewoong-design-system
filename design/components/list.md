# List

> 클래스 `.dw-list` · 레퍼런스 [catalog.html#list](../catalog.html#list)

## 개요

세로로 쌓인 행 목록이다. 설정 항목, 메뉴 목록, 단순 데이터 목록에 쓴다. 각 행은 앞(아이콘·아바타·체크), 본문(제목·설명), 뒤(값·화살표·스위치)로 구성된다.
**쓰지 말 것** — 여러 속성을 비교하는 데이터(Table).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Header | `.dw-list-header` | | 목록 위 소제목 |
| Root | `.dw-list` | ✓ | `<ul>` |
| Item | `.dw-list__item` | ✓ | `<li>` |
| Content | `.dw-list__content` | ✓ | 눌리는 행이면 `<a>`·`<button>`, 아니면 `<div>` |
| Prefix | `.dw-list__prefix` | | 아이콘 22px·Avatar·Checkbox |
| Title | `.dw-list__title` | ✓ | |
| Detail | `.dw-list__detail` | | 보조 설명 |
| Suffix | `.dw-list__suffix` | | 값 텍스트·`chevron-right`·Switch |

```html
<h3 class="dw-list-header">계정</h3>
<ul class="dw-list">
  <li class="dw-list__item">
    <a class="dw-list__content" href="/profile">
      <span class="dw-list__prefix">…user…</span>
      <span class="dw-list__body">
        <span class="dw-list__title">프로필</span>
        <span class="dw-list__detail">이름·연락처</span>
      </span>
      <span class="dw-list__suffix">…chevron-right…</span>
    </a>
  </li>
</ul>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| interactive | boolean | false | Content가 `<a>`·`<button>` |
| highlighted | boolean | false | `.dw-list__content--highlighted` |
| disabled | boolean | false | `aria-disabled="true"` |
| header variant | `weak` · `strong` | `weak` | `.dw-list-header--strong` |
| divider | boolean | false | `.dw-list--divided` |

## Specification

| 항목 | 값 |
| --- | --- |
| Content | 너비 100%, padding 12px 16px (`x3`, 좌우 gutter 16px), `display: flex; align-items: center` |
| Prefix | 오른쪽 12px `x3`, 아이콘 22px `fg-neutral` |
| Body | 세로, gap 2px `x0_5`, `flex: 1`, 오른쪽 10px `x2_5` |
| Title | t5 16/22 regular, `fg-neutral` |
| Detail | t3 13/18 regular, `fg-neutral-subtle` |
| Suffix | 가로 gap 4px `x1`, 글자 t5 16/22 regular `fg-neutral-subtle`, 아이콘 `fg-neutral-subtle` |
| hover·pressed (interactive) | 뒤 면이 좌우 6px 들어온 radius 10px `r2_5` 로 `bg-transparent-pressed` (`::before`) |
| highlighted | 뒤 면 `bg-brand-weak`, hover `bg-brand-weak-pressed` |
| disabled | Title·Detail·아이콘 `fg-disabled` |
| focus-visible | Content 안쪽 `outline 2px stroke-focus-ring`(offset −2px) |
| divided | 각 Item 사이 1px `stroke-neutral-subtle`, 좌우 16px 들여서 |
| Header | padding 8px 16px (`x2` gutter), t4 14/19 · weak: medium `fg-neutral-subtle` · strong: bold `fg-neutral`. 오른쪽에 링크·버튼을 둘 수 있다(`justify-content: space-between`, gap 10px) |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | interactive + 정밀 포인터 | 뒤 면 | `background-color`·`inset-inline`·`border-radius` `duration-color-transition` |
| Pressed | `:active` | 같은 면(터치) | |
| Focus-visible | 키보드 | 안쪽 링 | |
| Disabled | `aria-disabled` | 위 색, 눌러도 동작 없음 | |

## Behavior & Accessibility

- `<ul>`/`<li>` 구조. 행 전체가 하나의 링크·버튼이다(안에 다른 상호작용 요소를 겹치지 않는다).
- Suffix에 Switch·Checkbox가 있는 행은 Content를 `<label>`로 만들어 행 전체가 토글되게 한다.
- `chevron-right`는 장식(`aria-hidden`). 값 텍스트는 읽힌다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음. 데스크톱 넓은 화면에서는 목록 최대 폭 640px 권장 |

## Do / Don't

- **Do** Title은 한 줄, Detail은 두 줄까지.
- **Don't** 한 목록에서 행마다 Prefix 유무를 섞지 않는다.
