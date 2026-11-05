# Filter Sheet

> 클래스 `.dw-filter-sheet` · 레퍼런스 [storybook.html#filter-sheet](../storybook.html#filter-sheet)

## 개요

여러 조회 조건을 모아 한 번에 조회하는 시트다. 768px 미만은 [Bottom Sheet](bottom-sheet.md), 그 이상은 [Side Sheet](side-sheet.md)처럼 열린다. 규칙은 [interaction.md 11.1](../guides/interaction.md#111-조건-시트)을 따른다.
**쓰지 말 것** — 조건이 3개 이하인 화면(필터 줄), 바꾸는 즉시 조회하는 Chip·Select, 저장할 데이터를 입력하는 폼(Dialog·Side Sheet).

## Anatomy

Bottom Sheet의 구조와 클래스를 그대로 쓰고 아래만 더한다. 트리거는 [Filter Button](filter-button.md), 시트 밖 조건 표시는 [Filter Tags](filter-tags.md)다.

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-filter-sheet` | ✓ | `.dw-bottom-sheet`에 더한다. `data-dw="bottom-sheet"` 유지, `id` 필수 |
| Title | `.dw-bottom-sheet__title` | ✓ | 기본 문구 `조회 조건`. `tabindex="-1"`과 `data-dw-autofocus`로 처음 포커스를 받는다 |
| Reset | `.dw-filter-sheet__reset` | | Button `ghost` · `small`, `rotate-ccw` + `초기화`. Content의 직계 자식 |
| Form | `.dw-filter-sheet__form` | ✓ | Body와 Footer를 감싼다. `display: contents` |
| Fields | `.dw-filter-sheet__fields` | ✓ | Body 안에서 [Field](field.md)를 세로로 쌓는다 |
| Apply | `.dw-bottom-sheet__footer` 안 `<button type="submit">` | ✓ | Button `brand-solid` · `large`, 문구 `조회` |

```html
<button type="button" class="dw-button dw-button--neutral-outline dw-button--medium dw-button--icon-only dw-filter-button"
        id="order-filter-open" aria-label="조회 조건" aria-haspopup="dialog" data-dw-open="order-filter">
  <svg class="dw-button__icon" aria-hidden="true"><use href="#i-list-filter"/></svg>
  <span class="dw-filter-button__count" data-count="0" aria-hidden="true" hidden></span>
</button>

<div class="dw-bottom-sheet dw-filter-sheet" data-dw="bottom-sheet" id="order-filter" hidden>
  <div class="dw-bottom-sheet__backdrop" data-dw-close data-state="open"></div>
  <div class="dw-bottom-sheet__content" role="dialog" aria-modal="true" aria-labelledby="order-filter-title" data-state="open">
    <div class="dw-bottom-sheet__handle" aria-hidden="true"></div>
    <div class="dw-bottom-sheet__header">
      <h2 class="dw-bottom-sheet__title" id="order-filter-title" tabindex="-1" data-dw-autofocus>조회 조건</h2>
      <p class="dw-bottom-sheet__description">주문 상태와 배송 방법으로 좁혀요.</p>
    </div>
    <button type="button" class="dw-button dw-button--ghost dw-button--small dw-filter-sheet__reset">…rotate-ccw… 초기화</button>
    <form class="dw-filter-sheet__form">
      <div class="dw-bottom-sheet__body">
        <div class="dw-filter-sheet__fields">…Field…</div>
      </div>
      <div class="dw-bottom-sheet__footer">
        <button type="submit" class="dw-button dw-button--brand-solid dw-button--large">조회</button>
      </div>
    </form>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| title | 문자열 | `조회 조건` | Title |
| description | 문자열 | 없음 | `.dw-bottom-sheet__description`, 어떤 조건을 고르는지 한 문장 |
| reset | boolean | true | Reset 유무 |

## Specification

Backdrop·Content·Handle·Header·Footer의 값과 열고 닫는 모션은 [Bottom Sheet](bottom-sheet.md)를 따른다. 다른 값만 적는다.

| 항목 | 값 |
| --- | --- |
| Title | 오른쪽 padding 96px (`x16` + `x8`), Reset과 겹치지 않게 |
| Reset | Content 기준 top 24px `x6`, right 12px `x3` |
| Fields | 세로 배치, gap 16px `x4`, 위아래 padding 2px `x0_5`(포커스 테두리가 잘리지 않게) |

768px 이상이고 높이가 500px을 넘으면 같은 마크업이 오른쪽 패널이 된다.

| 항목 | 값 |
| --- | --- |
| Content | 오른쪽에 붙어 화면 높이를 채움, 너비 480px(Side Sheet `small`), 최대 너비 100%, radius 0 |
| 열기·닫기 | `translateX(100%) ↔ 0`, `duration-d6`, 나머지는 Bottom Sheet와 같다 |
| Handle | 없음 |
| Title · Description · Body · Footer | 좌우 padding 24px `x6` |
| Reset | right 20px `x5` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Closed | — | `hidden` | |
| Open | Filter Button | 적용된 값으로 입력을 채워 연다. 처음 포커스는 Title | 열기 모션 |
| Editing | 필드 입력 | 입력값만 바뀐다. 목록·Filter Button·Filter Tags는 그대로 | |
| Reset | `초기화` | 시트의 입력값만 비운다. 조회하지 않고 닫지 않는다 | |
| Applied | `조회` · 입력에서 Enter | 입력값을 확정해 조회, 시트를 닫고 포커스를 Filter Button으로 돌린다 | 닫기 모션 |
| Dismissed | Backdrop · Esc · 끌어 내리기 | 입력 중인 값을 버린다. 적용된 조건은 그대로 | 닫기 모션 |

## Behavior & Accessibility

[Bottom Sheet](bottom-sheet.md)의 포커스 가두기·복귀·inert·스크롤 잠금을 그대로 쓴다. 레퍼런스는 `openModal`·`closeModal`을 쓴다. 다른 점:

- 입력은 Enter나 `조회`로만 확정한다. 필드를 바꾸는 동안 조회하지 않는다.
- 저장할 데이터가 아니므로 입력이 있어도 닫을 때 확인을 거치지 않는다([interaction.md 6장](../guides/interaction.md#6-모달-닫힘)의 예외).
- `조회` 버튼은 항상 활성이다. 값이 하나도 없어도 누를 수 있고, 그러면 조건 없이 조회한다.
- `초기화`도 항상 활성이다. 적용된 조건이 없어도 입력 중인 값이 있을 수 있다.
- 확정한 값은 URL 쿼리에 남기고 페이지를 1로 되돌린다([interaction.md 11장](../guides/interaction.md#11-목록-검색필터)).
- 넓은 화면에서는 Header를 끌어도 닫히지 않는다.
- 레퍼런스는 조건이 바뀌면 시트 Root에서 `dw-filter-apply` 이벤트(`detail.values`)를 낸다. 화면은 이 이벤트로 조회한다.

| 키 | 동작 |
| --- | --- |
| Tab / Shift+Tab | 시트 안 순환 |
| Enter | 입력 필드에서 조회 |
| Esc | 입력을 버리고 닫기 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 768px | Bottom Sheet 형태 |
| ≥ 768px · 높이 > 500px | 오른쪽 Side Sheet 형태 |
| 높이 ≤ 500px 가로 화면 | 너비와 상관없이 Bottom Sheet 형태 |

## Do / Don't

- **Do** 필드를 세로로 쌓고 자주 쓰는 조건부터 놓는다.
- **Do** 시트에서 건 조건을 [Filter Button](filter-button.md)의 숫자와 [Filter Tags](filter-tags.md)로 시트 밖에 남긴다.
- **Don't** `초기화`를 누른 순간 조회하지 않는다. 조회는 `조회`로만 한다.
- **Don't** 같은 필드를 필터 줄과 시트에 동시에 두지 않는다. 같은 id·라벨이 두 벌 생긴다.
