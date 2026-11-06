# List Footer

> 클래스 `.dw-list-footer` · 레퍼런스 [catalog.html#list-footer](../catalog.html#list-footer)

## 개요

표·목록 바로 아래에 총 건수와 [Pagination](pagination.md)을 두는 줄이다. 배치는 [ux-guideline.md 5.4](../guides/ux-guideline.md#54-표-아래-줄)를 따른다.
**쓰지 말 것** — 편집형 표([ux-guideline.md 5.5](../guides/ux-guideline.md#55-예외--편집형-표)), 계속 이어 보는 모바일 피드.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-list-footer` | ✓ | |
| Count | `.dw-list-footer__count` | ✓ | `<p>`, `총 N개` |
| Total | `.dw-list-footer__total` | ✓ | 건수 숫자 |
| Pagination | `.dw-pagination` | | 전체 페이지가 2 이상일 때 |

```html
<div class="dw-list-footer">
  <p class="dw-list-footer__count" aria-live="polite">총 <span class="dw-list-footer__total">248</span>개</p>
  <nav class="dw-pagination" aria-label="주문 목록 페이지">…</nav>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| total | 숫자 · 없음 | 없음 | Total 글자, 없으면 `-` |
| unit | `개` · `명` | `개` | 사람 목록이면 `명` |
| children | Pagination | 없음 | Count 다음 칸 |

## Specification

| 항목 | 값 |
| --- | --- |
| Root (< 640px) | 세로 배치, 가운데 정렬, gap 8px `x2` |
| Root (≥ 640px) | 3칸 그리드 `1fr auto 1fr`, 세로 가운데 정렬, gap 8px `x2` |
| Count | t4 14/19 regular, `fg-neutral`, 왼쪽 정렬 |
| Total | bold, `tabular-nums` |
| Pagination | 가운데 칸. 값은 [Pagination](pagination.md)을 따른다 |

세 번째 칸은 비워 두어 Pagination이 Root의 가운데에 놓이게 한다.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Loaded | 조회 끝 | Total에 건수 | |
| Unknown | 로딩 · 오류 | Total `-` | |
| Single page | 전체 페이지 1 이하 | Pagination을 두지 않는다 | |

## Behavior & Accessibility

- Count에 `aria-live="polite"`를 두어 검색·필터로 건수가 바뀌면 읽히게 한다. 글자가 같으면 읽지 않는다.
- Pagination의 `aria-label`로 어느 목록의 페이지인지 알린다.
- 이 영역에는 건수 말고 자체 동작이 없다. 페이지 이동은 [Pagination](pagination.md)을 따른다.

| 키 | 동작 |
| --- | --- |
| Tab | Pagination 안 링크 순서대로 이동 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 640px | Count가 위 왼쪽, Pagination이 아래 가운데 |
| ≥ 640px | 한 줄. Count 왼쪽, Pagination 가운데 |

## Do / Don't

- **Do** 필터가 걸린 뒤의 건수를 보인다.
- **Don't** 단위에 `건`을 쓰지 않는다.
- **Don't** 세 번째 칸에 버튼을 넣지 않는다. 행동은 제목 줄에 둔다.
