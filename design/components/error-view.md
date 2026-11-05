# Error View

> 클래스 `.dw-error-view` · 레퍼런스 [storybook.html#error-view](../storybook.html#error-view)

## 개요

페이지 전체를 보여 줄 수 없을 때(404, 500, 권한 없음, 렌더 오류) 화면을 채워 이유와 다음 행동을 알린다.
**쓰지 말 것** — 페이지 일부의 오류·빈 결과([Empty State](empty-state.md)), 폼 저장 실패([Callout](callout.md)), 서버 도달 불가([Connection Status Banner](connection-status-banner.md)).

**Empty State와의 구분**

| 묻는 것 | Error View | [Empty State](empty-state.md) |
| --- | --- | --- |
| 범위 | 페이지 전체. 그릴 화면이 없다 | 표·카드 같은 영역 하나. 화면의 나머지는 살아 있다 |
| 원인 | 경로·권한·서버 문제 | 데이터가 없거나 그 영역의 조회 실패 |
| 제목 | `<h1>` 페이지 제목 | `<p>` 영역 안내 |
| 상태 코드 | 보일 수 있다 | 보이지 않는다 |
| 높이 | 화면 높이를 채운다 | 내용만큼 |

목록 조회 하나가 실패하면 Empty State `critical`, 페이지를 이루는 데이터 자체를 못 그리면 Error View다.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-error-view` | ✓ | 셸 없이 단독이면 `<main>`, 셸 안이면 `<div>` |
| Icon | `.dw-error-view__icon` | | 장식 아이콘 |
| Code | `.dw-error-view__code` | | HTTP 상태 코드. 렌더 오류처럼 서버 응답이 아니면 뺀다 |
| Text | `.dw-error-view__text` | ✓ | Title과 Description 묶음 |
| Title | `.dw-error-view__title` | ✓ | `<h1 tabindex="-1">` |
| Description | `.dw-error-view__description` | | 왜·어떻게 |
| Actions | `.dw-error-view__actions` | | 버튼 1개(+ 보조 1개) |

```html
<main class="dw-error-view">
  <span class="dw-error-view__icon" aria-hidden="true">
    <svg aria-hidden="true"><use href="#i-search-x"/></svg>
  </span>
  <p class="dw-error-view__code">404</p>
  <div class="dw-error-view__text">
    <h1 class="dw-error-view__title" tabindex="-1">페이지를 찾을 수 없어요</h1>
    <p class="dw-error-view__description">주소가 바뀌었거나 삭제된 페이지예요. 주소를 확인해주세요.</p>
  </div>
  <div class="dw-error-view__actions">
    <a class="dw-button dw-button--brand-solid dw-button--medium" href="/">홈으로 이동</a>
  </div>
</main>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| layout | `fullscreen` · `contained` | `fullscreen` | `.dw-error-view--contained` (셸 안 본문) |
| code | 숫자 · 없음 | 없음 | `.dw-error-view__code` 유무 |

## Specification

### 크기

| 항목 | < 640px | ≥ 640px |
| --- | --- | --- |
| Root min-height (`fullscreen`) | `100dvh` | 같음 |
| Root min-height (`contained`) | 320px | 같음 |
| Root padding | 48px 24px (`x12` `x6`) | 같음 |
| Root 안 간격 | 16px `x4` | 같음 |
| Icon | 48px `x12` | 같음 |
| Code | t13 40/52 bold | t14 48/60 bold |
| Title | t7 20/27 bold | t9 24/32 bold |
| Title → Description | 6px `x1_5` | 같음 |
| Description | t4 14/19 regular, 최대 448px | t5 16/22 regular, 최대 448px |
| Actions 위 여백 | 8px `x2` 추가 | 같음 |
| Actions 버튼 | Button `medium`, 사이 8px `x2` | 같음 |

Root는 `display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center`이다. Code는 `font-variant-numeric: tabular-nums`다.

### 색

| 부위 | fg |
| --- | --- |
| Icon·Code·Description | `fg-neutral-subtle` |
| Title | `fg-neutral` |

오류 화면이라도 critical 색을 쓰지 않는다. 사용자 잘못이 아니고, 화면 전체가 빨갛게 보이면 불안만 키운다.

### 상황별 구성

문구는 [ux-writing.md 5장](../guides/ux-writing.md#5-오류-메시지) 기준으로 무엇이·왜 + 해결책을 쓴다.

| 상황 | 아이콘 | Title | Description | Actions |
| --- | --- | --- | --- | --- |
| 404 | `search-x` | 페이지를 찾을 수 없어요 | 주소가 바뀌었거나 삭제된 페이지예요. 주소를 확인해주세요. | 홈으로 이동 |
| 403 | `shield-x` | 이 페이지를 볼 권한이 없어요 | 권한이 필요하면 관리자에게 요청해주세요. | 홈으로 이동 |
| 500 | `triangle-alert` | 페이지를 불러오지 못했어요 | 일시적인 문제예요. 잠시 후 다시 시도해주세요. | 다시 시도 · 홈으로 이동 |
| 렌더 오류 | `triangle-alert` | 페이지를 표시하지 못했어요 | 새로고침해도 같다면 관리자에게 알려주세요. | 다시 시도 · 홈으로 이동 |

## States

정적 요소다. Actions의 상태는 [Button](button.md)을 따른다.

## Behavior & Accessibility

- 제목은 페이지의 `<h1>`이다. 문서 `<title>`도 같은 뜻으로 바꾼다.
- 클라이언트 라우팅으로 오류 화면이 뜨면 포커스를 Title로 옮긴다(`tabindex="-1"`). 첫 로드에서는 옮기지 않는다.
- Title은 프로그램 포커스만 받으므로 포커스 링을 그리지 않는다.
- Icon은 장식(`aria-hidden`)이다. Code는 그대로 읽힌다.
- 서버 렌더 오류 화면은 스크립트 없이 보여야 하므로 Actions의 이동은 `<a href>`로 둔다.
- 응답 상태 코드는 화면 표기와 맞춘다. 404 화면을 200으로 내보내지 않는다.

| 키 | 동작 |
| --- | --- |
| Tab | Actions로 이동 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 640px | 작은 글자 크기. Actions 버튼이 넘치면 줄바꿈 |
| ≥ 640px | Code·Title·Description 한 단계 확대 |

## Do / Don't

- **Do** 다음에 갈 곳을 버튼으로 준다. 막다른 화면을 만들지 않는다.
- **Do** 권한 없음은 어디에 요청할지 쓴다.
- **Don't** 서버 오류 메시지·스택을 그대로 보여 주지 않는다.
- **Don't** 페이지 일부의 실패에 전체 화면을 쓰지 않는다.
