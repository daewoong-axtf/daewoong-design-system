# Callout (Alert)

> 클래스 `.dw-callout` · 레퍼런스 [component.html#callout](../component.html#callout)

## 개요

화면 안에 고정으로 놓이는 안내 상자다. 페이지나 섹션 전체에 해당하는 정보·주의·오류를 알린다. 사용자가 닫지 않는 한 남는다.
**쓰지 말 것** — 행동 직후의 일시적 결과(Toast), 진행을 막고 결정을 요구하는 경고(Alert Dialog), 특정 입력값 오류(Field 오류 문구).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-callout` | ✓ | `<div>`. 전체가 눌리는 경우 `<a>`·`<button>` |
| Icon | `.dw-callout__icon` | | 앞 아이콘 16px |
| Content | `.dw-callout__content` | ✓ | 제목·설명·링크가 **한 문단으로 이어진다** |
| Title | `.dw-callout__title` | | 굵게, 뒤에 공백 2칸 |
| Description | `.dw-callout__description` | ✓ | |
| Link | `.dw-callout__link` | | 밑줄 텍스트 링크 |
| Close | `.dw-callout__close` | | `x` 아이콘 버튼 |

```html
<div class="dw-callout dw-callout--warning" role="status">
  <svg class="dw-callout__icon" aria-hidden="true">…triangle-alert…</svg>
  <p class="dw-callout__content">
    <strong class="dw-callout__title">점검 안내</strong>
    <span class="dw-callout__description">11월 5일 02:00–04:00에는 접속할 수 없습니다.</span>
    <a class="dw-callout__link" href="#">자세히</a>
  </p>
  <button type="button" class="dw-callout__close" aria-label="안내 닫기">…x…</button>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| tone | `neutral` · `informative` · `positive` · `warning` · `critical` | `neutral` | `.dw-callout--<tone>` |
| interactive | boolean | false | Root가 `<a>`·`<button>`이면 hover·pressed 적용 |
| dismissible | boolean | false | Close 버튼 유무 |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | `display: flex; align-items: center`, 너비 100%, min-height 50px, padding 14px `x3_5`, gap 12px `x3`, radius 10px `r2_5` |
| Icon | 16px `x4`, `flex-shrink: 0` |
| Content | `margin-right: auto`, 줄높이 19px. Title t4 14/19 **bold** · Description t4 regular · Link t4 regular, `underline`, `text-underline-offset: 2px` |
| 부위 사이 | Title 뒤·Description 뒤(마지막이 아니면)에 공백 2칸(`::after { content: "  "; white-space: pre }`) |
| Close | 16px 아이콘, 히트 영역 40×40px `x10`(아이콘 둘레로 음수 margin -12px), radius 8px `r2`, hover `bg-transparent-pressed` |

| tone | bg | 글자·아이콘 | 눌리는 Root hover |
| --- | --- | --- | --- |
| `neutral` | `bg-neutral-weak` | `fg-neutral` | `bg-neutral-weak-pressed` |
| `informative` | `bg-informative-weak` | `fg-informative-contrast` | `bg-informative-weak-pressed` |
| `positive` | `bg-positive-weak` | `fg-positive-contrast` | `bg-positive-weak-pressed` |
| `warning` | `bg-warning-weak` | `fg-warning-contrast` | `bg-warning-weak-pressed` |
| `critical` | `bg-critical-weak` | `fg-critical-contrast` | `bg-critical-weak-pressed` |

기본 아이콘: neutral `info` · informative `info` · positive `circle-check` · warning `triangle-alert` · critical `circle-alert`.

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Hover | 눌리는 Root·Close에 정밀 포인터 | 위 hover 색 | `background-color` `duration-color-transition` |
| Pressed | `:active` | Root(눌리는 경우)·Close `scale-s97` | `duration-pressed-scale` |
| Focus-visible | 키보드 | Root·Link·Close `outline 2px stroke-focus-ring`, offset 2px | |
| Dismissed | Close 클릭 | Root 제거 | 즉시 (모션 없음) |

## Behavior & Accessibility

- 처음부터 있는 안내는 role 없이 일반 콘텐츠로 둔다. **나중에 나타나는** 안내만 `role="status"`(정보) 또는 `role="alert"`(critical)로 읽게 한다.
- 색만으로 의미를 전하지 않는다 — 아이콘이나 Title을 함께 둔다.
- Close에는 `aria-label="○○ 닫기"`. 닫은 뒤 포커스는 Callout 다음 요소로.
- 닫은 상태를 기억할지(다시 표시 안 함)는 화면이 정한다.

| 키 | 동작 |
| --- | --- |
| Tab | Link → Close 순 |
| Enter | Link 이동 / Root(눌리는 경우) 실행 |
| Enter · Space | Close |

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음. 폭은 부모를 채우고 텍스트는 줄바꿈 |

## Do / Don't

- **Do** 한두 문장으로 쓰고 다음 행동은 Link로 연결한다.
- **Don't** 한 화면에 Callout을 여러 개 쌓지 않는다 — 가장 중요한 하나만.
