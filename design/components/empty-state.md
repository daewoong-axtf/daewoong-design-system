# Empty State

> 클래스 `.dw-empty` · 레퍼런스 [component.html#empty-state](../component.html#empty-state) · DW 구성(원본 recipe 없음)

## 개요

보여줄 데이터가 없을 때(처음 사용, 검색 결과 없음, 오류) 그 자리를 채우고 다음 행동을 안내한다.
**쓰지 말 것** — 로딩 중(Skeleton), 페이지 전체 오류(별도 오류 화면).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-empty` | ✓ | 가운데 정렬 세로 묶음 |
| Icon | `.dw-empty__icon` | | 원형 바탕 위 아이콘 |
| Title | `.dw-empty__title` | ✓ | 무엇이 없는지 |
| Description | `.dw-empty__description` | | 왜·어떻게 |
| Action | `.dw-empty__action` | | 버튼 1개(+ 보조 1개) |

```html
<div class="dw-empty">
  <span class="dw-empty__icon" aria-hidden="true">…search…</span>
  <p class="dw-empty__title">검색 결과가 없어요</p>
  <p class="dw-empty__description">다른 검색어를 입력해 보세요.</p>
  <div class="dw-empty__action"><button class="dw-button dw-button--neutral-weak">검색어 지우기</button></div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `medium` · `small` | `medium` | `.dw-empty--small` (표 셀·카드 안) |
| tone | `neutral` · `critical` | `neutral` | `.dw-empty--critical` (불러오기 실패) |

## Specification

| 항목 | medium | small |
| --- | --- | --- |
| Root padding 위아래 | 48px `x12` | 24px `x6` |
| Icon 바탕 | 56px 원 `bg-neutral-weak`, 아이콘 28px `fg-neutral-subtle` | 아이콘만 24px `fg-neutral-subtle` |
| Icon → Title | 16px `x4` | 8px `x2` |
| Title | t6 18/24 bold `fg-neutral` | t5 16/22 bold `fg-neutral` |
| Title → Description | 4px `x1` | 4px |
| Description | t4 14/19 regular `fg-neutral-subtle`, 최대 320px | t4 같음 |
| → Action | 20px `x5` | 12px `x3` |
| Action 버튼 | Button `medium` | Button `small` |

critical tone: Icon 바탕 `bg-critical-weak`, 아이콘 `circle-alert` `fg-critical`, Action은 "다시 시도".

Root는 `display: flex; flex-direction: column; align-items: center; text-align: center`.

## States

정적 요소다. Action의 상태는 [Button](button.md)을 따른다.

## Behavior & Accessibility

- 검색·필터 결과가 비었을 때는 결과 영역에 `role="status"`로 두어 "결과 없음"이 읽히게 한다.
- 아이콘은 장식(`aria-hidden`).

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음. 부모 영역 가운데 |

## Do / Don't

- **Do** 다음에 할 수 있는 행동을 버튼으로 준다.
- **Don't** "데이터가 없습니다"처럼 시스템 말투로 쓰지 않는다.
