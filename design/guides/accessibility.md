# 접근성 가이드

> WCAG 2.1 AA를 기준으로 색 대비·포커스·키보드·스크린리더·터치·모션 규칙을 정한다.
>
> 기본안이다. 서비스 성격에 맞게 고쳐 쓴다.

ARIA 속성과 CSS 표기는 웹 기준이다. 웹이 아닌 환경은 같은 뜻의 플랫폼 접근성 속성(접근 가능한 이름·상태·설명)으로 옮긴다. 환경별 구현은 [design.md 14장](../design.md#14-환경별-적용)을 따른다.

## 1. 색상 대비

| 대상 | 최소 대비 |
| --- | --- |
| 본문 텍스트 | 4.5:1 |
| 큰 텍스트 (`t9` 24px 이상, bold는 `t7` 20px 이상) | 3:1 |
| UI 요소·의미 있는 그래픽 | 3:1 |

배경 위 글자는 [design.md 2.3](../design.md#23-역할-토큰)의 짝 규칙으로만 고른다.

아래 값은 `tokens.json`을 sRGB로 변환해 잰 것이다. 토큰을 바꾸면 다시 잰다.

| 글자 / 배경 | 라이트 | 다크 | 기준 |
| --- | --- | --- | --- |
| `fg-neutral` / `bg-layer-default` | 17.06 | 16.29 | 본문 가능 |
| `fg-neutral-muted` / `bg-layer-default` | 6.63 | 13.33 | 본문 가능 |
| `fg-brand` / `bg-layer-default` | 5.15 | 7.15 | 본문 가능 |
| `fg-on-brand-solid` / `bg-brand-solid` | 8.38 | 8.38 | 본문 가능 |
| `fg-critical-contrast` / `bg-critical-weak` | 8.03 | 9.84 | 본문 가능 |
| `fg-warning-contrast` / `bg-warning-weak` | 9.59 | 9.85 | 본문 가능 |
| `fg-on-positive-solid` / `bg-positive-solid` | 5.72 | 5.40 | 본문 가능 |
| `fg-on-informative-solid` / `bg-informative-solid` | 5.92 | 5.45 | 본문 가능 |
| `fg-on-critical-solid` / `bg-critical-solid` | 5.69 | 5.58 | 본문 가능 |
| `fg-critical` / `bg-layer-default` | 5.69 | 6.53 | 본문 가능 |
| `fg-neutral-subtle` / `bg-layer-default` | 5.28 | 8.52 | 본문 가능 |

- 표의 짝은 모두 4.5:1을 넘는다. `tests/contrast.test.ts`가 역할 토큰 조합을 검사한다.
- `fg-disabled`는 비활성 요소 전용이다. 비활성 요소는 WCAG 대비 기준의 예외이므로 일반 본문에 쓰지 않는다.
- `fg-placeholder`는 대비가 낮다. placeholder에 꼭 필요한 정보를 담지 않는다.
- `bg-warning-solid` 위에는 항상 `fg-on-warning-solid`를 쓴다. 흰 글자를 올리지 않는다.
- `bg-brand-solid` 위에 흰 글자를 올리지 않는다(2.5:1).

## 2. 포커스

- 모든 상호작용 요소에 [design.md 11장](../design.md#11-포커스)의 포커스 표시를 적용한다: `outline: 2px solid`(`stroke-focus-ring`), `outline-offset: 2px`.
- `:focus-visible`만 쓴다. 마우스 클릭 뒤에는 남지 않는다.
- 입력 필드는 outline 대신 테두리를 2px `stroke-neutral-contrast`로 바꾼다([Text Input](../components/text-input.md)).
- 포커스 순서는 시각 순서와 같다.

```css
button:focus-visible {
  outline: 2px solid var(--dw-stroke-focus-ring);
  outline-offset: 2px;
}
```

## 3. 키보드

모든 기능은 마우스 없이 조작할 수 있어야 한다.

| 키 | 동작 |
| --- | --- |
| `Tab` / `Shift+Tab` | 요소 이동 |
| `Enter` / `Space` | 활성화 |
| `Esc` | 모달·시트·팝오버 닫기 |
| 화살표 | [Radio](../components/radio.md) 그룹·[Tabs](../components/tabs.md) 안 이동, [Dropdown Menu](../components/dropdown-menu.md) 항목 이동 |

- 모달이 열리면 포커스를 안에 가두고, 닫히면 연 트리거로 되돌린다([Dialog](../components/dialog.md)).
- 파괴적 행동 버튼에 처음 포커스를 주지 않는다. [Alert Dialog](../components/alert-dialog.md)의 처음 포커스는 취소 버튼이다.

## 4. 스크린리더

- 아이콘 단독 버튼에는 접근 가능한 이름(`aria-label`)을 붙인다. 아이콘 SVG는 `aria-hidden="true"`([Button](../components/button.md)).
- 이미지에는 대체 텍스트를 넣는다. 장식 이미지는 `alt=""`.
- 입력에는 `<label>`을 연결한다. placeholder로 대체하지 않는다. 라벨을 숨겨야 하면 시각적으로만 숨긴다([Field](../components/field.md)).
- 필수 필드는 컨트롤에 `required` 또는 `aria-required="true"`를 준다.
- 나중에 나타나는 상태 변화는 role로 읽게 한다.
  - [Toast](../components/toast.md): `role="status"`, critical은 `role="alert"`. 포커스를 옮기지 않는다.
  - [Callout](../components/callout.md): 나중에 나타날 때만 `role="status"`, critical은 `role="alert"`. 처음부터 있는 안내에는 role을 주지 않는다.
  - 검색·필터 결과가 비면 결과 영역의 [Empty State](../components/empty-state.md)에 `role="status"`.
- 로딩 영역에는 `aria-busy="true"`를 두고 로드가 끝나면 지운다([Skeleton](../components/skeleton.md)).
- **폼 제출 검증 실패**: 제출 버튼을 비활성화하지 않는다. 첫 오류 필드로 포커스를 옮기고, 컨트롤에 `aria-invalid="true"`를 주고, 오류 문구를 `aria-describedby`로 연결한다. 오류 문구에 `role="alert"`를 붙이지 않는다 — 포커스가 옮겨 가면 라벨과 오류를 함께 읽는다. `aria-describedby`에는 지금 보이는 설명 또는 오류의 `id`만 넣는다. 동작은 [interaction.md 8장](interaction.md#8-폼-제출-검증)을 따른다.
- **모달의 이름과 설명**: 제목은 필수이고 `aria-labelledby`로 연결한다. 설명 문장이 있으면 `aria-describedby`로 연결한다. Alert Dialog는 결과 설명을 Description으로 둔다. 설명 문구도 UX 문구이므로 [ux-writing.md](ux-writing.md)를 따른다.

## 5. 터치 타깃

- 탭 영역은 최소 44×44px이다. 보이는 크기가 작으면 투명 히트 영역을 넓힌다.
- 인접한 타깃 사이는 최소 8px(`x2`)을 둔다.
- 작은 아이콘도 히트 영역은 44×44px을 확보한다.

## 6. 색맹·저시력

색만으로 의미를 전하지 않는다(WCAG 1.4.1).

| 대상 | 표현 |
| --- | --- |
| 주문·문서 상태 | 색 + 텍스트 라벨("확정", "취소") — [Badge](../components/badge.md) |
| 경고·성공·오류 | 색 + 아이콘 또는 문구 — [Callout](../components/callout.md), [Toast](../components/toast.md) |
| 입력 오류 | 테두리 색 + 아이콘 + 문구 — [Field](../components/field.md) |
| 링크 | 색 + 밑줄 |
| 달력의 휴일 | 색 + 요일 텍스트 |
| 분류 태그 | 색 + 분류 이름 |

달력 블록처럼 작은 면에 아이콘·선으로 상태를 표시할 때는 모양과 범례를 함께 두고, 같은 내용을 접근 가능한 이름에도 넣는다(예: `팀 회의 (반복) (취소)`). 아이콘은 `aria-hidden="true"`로 둔다.

## 7. 모션

`prefers-reduced-motion: reduce`를 존중한다. 이동·확대 애니메이션을 끄고 투명도 전환만 남긴다([design.md 8장](../design.md#8-모션)).

| 대상 | 동작 |
| --- | --- |
| 누름 축소 | `scale-s95` · `s97` · `s98`이 1이 된다(토큰이 처리) |
| 모달 | scale 없이 opacity만 |
| [Skeleton](../components/skeleton.md) | 띠를 숨기고 정지된 회색 블록으로 둔다 |
| [Progress Circle](../components/progress-circle.md) | 회전은 3s로 느리게 유지하고 1/4 호로 고정한다 |

스피너처럼 진행을 알리는 움직임은 멈추지 않고 단순화한다. 장식용 자동 재생·무한 반복은 멈춘다.

## 8. 체크리스트

- [ ] 텍스트 대비가 AA를 충족하고 짝 규칙을 지킨다
- [ ] 모든 상호작용 요소에 포커스 표시가 보인다
- [ ] 키보드만으로 전체 흐름을 조작할 수 있다
- [ ] 아이콘 버튼에 접근 가능한 이름이 있다
- [ ] 입력에 라벨이 연결돼 있다
- [ ] 제출 실패 시 첫 오류 필드로 포커스가 가고 `aria-invalid`·`aria-describedby`가 붙는다
- [ ] 모달에 제목이 연결돼 있고, 설명이 있으면 `aria-describedby`로 연결돼 있다
- [ ] 색 기반 정보에 텍스트나 아이콘이 함께 있다
- [ ] 터치 타깃이 44×44px 이상이다
- [ ] `prefers-reduced-motion`에 대응한다
