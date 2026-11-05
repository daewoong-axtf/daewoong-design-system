# Grid

> 클래스 `.dw-grid` · 레퍼런스 [storybook.html#grid](../storybook.html#grid)

## 개요

화면을 세로 칸으로 나눠 영역을 배치한다. 페이지 레이아웃, 필터 + 본문, 카드 묶음에 쓴다.
**쓰지 말 것** — 버튼 줄처럼 내용 크기대로 늘어놓는 자리(flex), 표 형식 데이터(Table).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Container | `.dw-container` | | 화면 좌우 여백과 최대 너비 |
| Root | `.dw-grid` | ✓ | 칸을 나누는 틀 |
| Item | `.dw-grid__item` | ✓ | 칸을 차지하는 영역 |

```html
<div class="dw-container">
  <div class="dw-grid">
    <div class="dw-grid__item dw-grid__item--lg-3">필터</div>
    <div class="dw-grid__item dw-grid__item--lg-9">본문</div>
  </div>
</div>
```

```tsx
<Container>
  <Grid>
    <GridItem lg={3}>필터</GridItem>
    <GridItem lg={9}>본문</GridItem>
  </Grid>
</Container>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| Container 너비 | `content` · `wide` | `content` | `.dw-container--wide` · React `width="wide"` |
| 모바일 칸 | 1~2 | 한 줄 전체 | `.dw-grid__item--base-N` · React `base={N}` |
| 태블릿 칸 | 1~4 | 한 줄 전체 | `.dw-grid__item--md-N` · React `md={N}` |
| 데스크톱 칸 | 1~12 | 한 줄 전체 | `.dw-grid__item--lg-N` · React `lg={N}` |

## Specification

| 항목 | 값 |
| --- | --- |
| 칸 수 | 모바일 2 `grid-columns-mobile` · 태블릿 4 `grid-columns-tablet` · 데스크톱 12 `grid-columns-desktop` |
| 칸 사이 간격 | 20px `grid-gap` |
| 좌우 여백 | 모바일 16px `x4` · 태블릿 24px `x6` · 데스크톱 32px `x8` |
| 최대 너비 | 1040px `grid-max-width-content` · wide 1280px `grid-max-width-wide`. 여백을 뺀 콘텐츠 너비 |

## States

상태가 없다.

## Behavior & Accessibility

- 칸 배치만 맡고 역할(role)을 붙이지 않는다. 의미가 필요하면 `<main>`, `<aside>`, `<section>`을 쓴다.
- 읽는 순서는 마크업 순서다. 화면에서 보이는 순서와 같게 둔다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| `md` 미만 | 2칸. `base`가 없으면 한 줄 전체 |
| `md`부터 | 4칸. `md`가 없으면 한 줄 전체. `base`는 적용하지 않는다 |
| `lg`부터 | 12칸. `lg`가 없으면 한 줄 전체. `base`·`md`는 적용하지 않는다 |

## Do / Don't

- **Do** 필터 + 본문은 데스크톱에서 나누고 모바일에서는 한 줄씩 쌓는다.
- **Do** 카드 묶음은 `base`·`md`·`lg`를 함께 적어 화면마다 칸을 정한다.
- **Don't** 한 줄의 칸 합이 전체 칸 수를 넘게 묶지 않는다. 넘치면 다음 줄로 내려간다.
- **Don't** `.dw-grid` 안에 칸 수를 바꾸는 `grid-template-columns`를 덧쓰지 않는다.
