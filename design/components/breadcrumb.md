# Breadcrumb

> 클래스 `.dw-breadcrumb` · 레퍼런스 [component.html#breadcrumb](../component.html#breadcrumb) · DW 구성(원본 recipe 없음)

## 개요

현재 페이지의 위치를 상위 단계부터 보여주고 상위로 바로 이동하게 한다(관리 화면 `설정 > 사용자 > 상세`).
**쓰지 말 것** — 단계가 1개뿐일 때, 진행 단계 표시(스텝퍼, v1 범위 밖).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-breadcrumb` | ✓ | `<nav aria-label="현재 위치">` |
| List | `.dw-breadcrumb__list` | ✓ | `<ol>` |
| Item | `.dw-breadcrumb__item` | ✓ | `<li>` |
| Link | `.dw-breadcrumb__link` | ✓ | 상위 단계 `<a>` |
| Current | `.dw-breadcrumb__current` | ✓ | 마지막 단계 `<span aria-current="page">` |
| Separator | `.dw-breadcrumb__separator` | ✓ | `chevron-right` 12px, `aria-hidden` |
| Ellipsis | `.dw-breadcrumb__ellipsis` | | 접힌 중간 단계 버튼(`ellipsis`) |

```html
<nav class="dw-breadcrumb" aria-label="현재 위치">
  <ol class="dw-breadcrumb__list">
    <li class="dw-breadcrumb__item"><a class="dw-breadcrumb__link" href="/settings">설정</a>
      <svg class="dw-breadcrumb__separator" aria-hidden="true">…chevron-right…</svg></li>
    <li class="dw-breadcrumb__item"><span class="dw-breadcrumb__current" aria-current="page">사용자</span></li>
  </ol>
</nav>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| items | 2개 이상 | — | Item |
| collapse | boolean | 5단계 이상이면 true | 첫 단계·마지막 2단계만 보이고 사이는 Ellipsis |

## Specification

| 항목 | 값 |
| --- | --- |
| List | 가로, `flex-wrap: wrap`, `align-items: center`, gap 4px `x1` |
| Item | `inline-flex; align-items: center`, gap 4px |
| Link | t4 14/19 regular, `fg-neutral-subtle`, 밑줄 없음. hover `fg-neutral` + 밑줄(`text-underline-offset: 2px`) |
| Current | t4 14/19 **medium**, `fg-neutral`, 한 줄 말줄임(최대 240px) |
| Separator | 12px `chevron-right`, `fg-placeholder` |
| Ellipsis | 24×24px 버튼, radius 4px `r1`, 아이콘 16px `fg-neutral-subtle`, hover bg `bg-transparent-pressed`. 누르면 접힌 단계를 [Dropdown Menu](dropdown-menu.md)로 |
| focus-visible | Link·Ellipsis에 `outline 2px stroke-focus-ring`, offset 2px, radius 4px |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | 정밀 포인터 | Link 색·밑줄 | `color` `duration-color-transition` |
| Focus-visible | 키보드 | 포커스 링 | |

## Behavior & Accessibility

- `<nav aria-label>` + `<ol>`. 마지막 단계는 링크가 아니며 `aria-current="page"`.
- Separator는 장식이라 `aria-hidden="true"`(스크린리더는 목록 순서로 계층을 안다).

| 키 | 동작 |
| --- | --- |
| Tab | 각 Link·Ellipsis |
| Enter | 이동 / 접힌 단계 열기 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | 바로 위 단계 하나만 `chevron-left` + 이름("‹ 사용자")으로 보여준다 |
| ≥ 768px | 전체 경로 |

## Do / Don't

- **Do** 단계 이름은 해당 페이지 제목과 같게.
- **Don't** 페이지 제목(h1) 대신 Breadcrumb만 두지 않는다.
