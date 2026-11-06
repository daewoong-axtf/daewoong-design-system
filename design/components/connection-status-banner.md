# Connection Status Banner

> 클래스 `.dw-connection-banner` · 레퍼런스 [catalog.html#connection-status-banner](../catalog.html#connection-status-banner)

## 개요

서버에 닿지 못하는 상황을 화면 맨 위에서 한 번에 알리고, 복구되면 알린 뒤 스스로 닫는다. 브라우저의 `online`·`offline` 이벤트에 반응한다. 트리거와 원칙은 [interaction.md 15장](../guides/interaction.md#15-전역-연결-상태)을 따른다.
**쓰지 말 것** — 한 번의 요청 실패(Toast), 폼 저장 실패([Callout](callout.md)), 페이지를 그릴 수 없는 오류([Error View](error-view.md)). 앱 전체에 하나만 둔다.

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-connection-banner` | ✓ | 라이브 영역. 늘 DOM에 두고 `data-status`를 가진다 |
| Panel | `.dw-connection-banner__panel` | ✓ | 보이고 숨는 면. 평소 `hidden` |
| Icon | `.dw-connection-banner__icon` | ✓ | 원형 바탕. 상태별 `<svg data-icon>` 4개 중 하나만 보인다 |
| Title | `.dw-connection-banner__title` | ✓ | 한 문장. 평소 비어 있다 |
| Retry | `.dw-connection-banner__retry` | | [Button](button.md) `neutral-weak` `small`. `online`에서 숨긴다 |
| Close | `.dw-connection-banner__close` | | 닫기 아이콘 버튼 |

`<body>`의 첫 자식으로 둔다.

```html
<div class="dw-connection-banner" data-dw="connection-status-banner" data-status="online"
     data-check-url="/health" role="status" aria-live="polite">
  <div class="dw-connection-banner__panel" hidden>
    <span class="dw-connection-banner__icon" aria-hidden="true">
      <svg data-icon="offline"><use href="#i-wifi-off"/></svg>
      <svg data-icon="reconnecting"><use href="#i-loader-circle"/></svg>
      <svg data-icon="unstable"><use href="#i-triangle-alert"/></svg>
      <svg data-icon="online"><use href="#i-check"/></svg>
    </span>
    <p class="dw-connection-banner__title"></p>
    <button class="dw-button dw-button--neutral-weak dw-button--small dw-connection-banner__retry" type="button" hidden>
      <svg class="dw-button__icon" aria-hidden="true"><use href="#i-refresh-cw"/></svg><span>다시 시도</span>
      <span class="dw-button__spinner" aria-hidden="true"></span>
    </button>
    <button class="dw-connection-banner__close" type="button" aria-label="연결 안내 닫기">
      <svg aria-hidden="true"><use href="#i-x"/></svg>
    </button>
  </div>
</div>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| status | `offline` · `reconnecting` · `unstable` · `online` | `online` | Root `data-status`. 스크립트가 바꾼다 |
| check-url | URL · 없음 | 없음 | Root `data-check-url`. 가벼운 상태 확인 주소 |
| text-<status> | 문자열 | 아래 표 | Root `data-text-offline` 등. 환경별 문구를 넣는다 |

| status | 쓰는 때 | 기본 문구 | Retry |
| --- | --- | --- | --- |
| `offline` | 네트워크 단절, 서버 도달 실패 | 서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요. | ✓ |
| `reconnecting` | 복구 확인 중 | 다시 연결하는 중이에요 | ✓ loading |
| `unstable` | 앱이 지연·간헐 실패를 판단했을 때 | 연결이 불안정해요. 일부 내용이 늦게 보일 수 있어요. | ✓ |
| `online` | 복구됨 | 다시 연결됐어요 | 숨김 |

환경별 문구는 [ux-writing.md 10장](../guides/ux-writing.md#10-연결-상태-문구)을 따른다.

## Specification

### 크기

| 부위 | < 640px | ≥ 640px |
| --- | --- | --- |
| Panel padding | 12px 16px (`x3` `x4`) | 12px 24px (`x3` `x6`) |
| Panel gap | 12px `x3` | 16px `x4` |
| Icon 바탕 | 36px `x9`, `radius-full` | 같음 |
| Icon | 20px `x5` | 같음 |
| Title | t4 14/19 medium | 같음 |
| Close | 32px `x8`, 아이콘 16px `x4`, `r2` | 같음 |

Root는 `position: sticky; top: 0; z-index: z-notice`다. 상단 내비게이션(`z-raised`)보다 위, 모달(`z-modal`)보다 아래다. Panel 위쪽 padding에 `safe-area-inset-top`을 더한다.

### 색

Panel은 상태와 무관하게 `bg-layer-default` + 아래 테두리 `stroke-neutral-muted` 1px + `shadow-s1`, Title은 `fg-neutral`이다. 상태는 Icon만으로 구분하지 않고 Title 문구로도 전한다.

| status | Icon 바탕 | Icon fg | 아이콘 |
| --- | --- | --- | --- |
| `offline` | `bg-critical-weak` | `fg-critical` | `wifi-off` |
| `reconnecting` | `bg-neutral-weak` | `fg-neutral-subtle` | `loader-circle` (회전) |
| `unstable` | `bg-warning-weak` | `fg-warning` | `triangle-alert` |
| `online` | `bg-positive-weak` | `fg-positive` | `check` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| 등장 | 상태 변화 | Panel `hidden` 해제, 위에서 8px 내려오며 나타남 | `duration-d4` `easing-enter` |
| 퇴장 | 복구 3초 뒤, Close | Panel `data-closing`, 위로 8px 올라가며 사라진 뒤 `hidden` | `duration-d4` `easing-exit` |
| Close hover | 마우스 | `bg-transparent-pressed` | `duration-color-transition` |
| Close pressed | 누름 | `scale-s95`, `bg-transparent-pressed` | `duration-pressed-scale` |
| Close focus-visible | 키보드 | `stroke-focus-ring` 2px 바깥선 | — |
| 모션 줄이기 | `prefers-reduced-motion: reduce` | 이동 없이 투명도만, 스피너는 3초에 한 바퀴 | — |

## Behavior & Accessibility

### 흐름

| 입력 | 결과 |
| --- | --- |
| 첫 로드에서 `navigator.onLine === false` | `offline` |
| `window`의 `offline` 이벤트 | `offline` |
| `window`의 `online` 이벤트, Retry 클릭 | `reconnecting` → 확인 → `online` 또는 `offline` |
| `online` 도달 | 3초 뒤 자동으로 닫힘 |
| Close | 닫힘. 상태는 유지되므로 복구되면 다시 알린다 |
| `online` 상태에서 `online` 이벤트 | 무시 |

- **확인**: `online` 이벤트는 네트워크가 돌아왔다는 뜻일 뿐 서버 도달을 보장하지 않는다. `data-check-url`이 있으면 `HEAD`(`cache: no-store`, 제한 5초)로 응답을 받아야 `online`이다. 상태 코드는 따지지 않는다. 응답이 왔으면 도달한 것이다. 없으면 `navigator.onLine`만 본다.
- **겹침**: 확인 중 새 이벤트가 오면 앞선 확인 결과는 버린다. Retry는 `reconnecting` 동안 다시 눌러도 무시한다.
- **앱에서 알리기**: 요청 실패·타임아웃은 브라우저 이벤트가 없으므로 앱이 `document.dispatchEvent(new CustomEvent('dw:connection-status', { detail: { status: 'offline' } }))`로 알린다. `unstable`도 같은 방법으로 넣는다. 인증 실패와 일반 4xx·5xx로는 부르지 않는다.
- **앱이 듣기**: 상태가 바뀔 때마다 Root에서 `dw:connection-change`(`detail.status`, bubbles)가 발생한다. `online`을 받으면 화면 데이터를 다시 불러온다.

### 접근성

- Root가 `role="status" aria-live="polite"`다. 라이브 영역이 먼저 DOM에 있어야 읽히므로 Root는 숨기지 않고 Panel만 숨긴다. Title은 Panel을 연 뒤에 채운다.
- Icon은 장식(`aria-hidden`)이다.
- Retry는 `reconnecting` 동안 `disabled`가 아니라 `data-loading aria-busy="true"`다. 포커스를 잃지 않는다.
- 포커스가 배너 안에 있는데 Retry가 숨거나 배너가 닫히면 포커스를 배너 다음 요소로 옮긴다.
- 모달이 열리면 배너도 `inert`가 된다. 끊김은 모달 뒤에서 보이고 복구는 모달을 닫은 뒤 조작할 수 있다.

| 키 | 동작 |
| --- | --- |
| Tab | Retry → Close |
| Enter · Space | 버튼 실행 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 640px | 가로 패딩 16px. Title 줄바꿈 |
| ≥ 640px | 가로 패딩 24px, 간격 16px |

## Do / Don't

- **Do** 환경별 문구는 컴포넌트를 나누지 않고 `data-text-*`로 넣는다.
- **Do** 복구되면 자동으로 닫고 화면 데이터를 다시 불러온다.
- **Don't** 화면 전체를 막는 오버레이로 쓰지 않는다.
- **Don't** 인증 실패와 일반 서버 오류에 띄우지 않는다.
