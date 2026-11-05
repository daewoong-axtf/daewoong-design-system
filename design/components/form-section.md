# Form Section

> 클래스 `.dw-form-section` · 레퍼런스 [storybook.html#form-section](../storybook.html#form-section)

## 개요

긴 폼을 의미 단위로 묶는다. 제목·설명은 카드 위에 두고 [Field](field.md)는 카드 안에 놓는다.
**쓰지 말 것** — 필드가 서너 개뿐인 폼, [Dialog](dialog.md) 안(구획이 필요할 만큼 길면 별도 화면으로 뺀다), 입력이 없는 정보 묶음([Card](card.md)).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-form-section` | ✓ | `<section aria-labelledby>` |
| Header | `.dw-form-section__header` | ✓ | 제목 묶음과 Aside를 양끝에 놓는다 |
| Heading | `.dw-form-section__heading` | ✓ | Title + Description |
| Title | `.dw-form-section__title` | ✓ | 제목 요소. 문서 구조에 맞는 수준(`h2`~`h4`) |
| Indicator | `.dw-field__indicator--dot` | | 필수 구획 표시. Field의 점을 재사용 |
| Description | `.dw-form-section__description` | | 한 문장 설명 |
| Aside | `.dw-form-section__aside` | | 건수·짧은 보조 행동 |
| Body | `.dw-card.dw-form-section__body` | ✓ | [Card](card.md) 표면. Field를 담는다 |

```html
<section class="dw-form-section" aria-labelledby="sec-basic">
  <div class="dw-form-section__header">
    <div class="dw-form-section__heading">
      <h2 class="dw-form-section__title" id="sec-basic">기본 정보</h2>
      <p class="dw-form-section__description">주문서에 표시되는 정보예요.</p>
    </div>
    <div class="dw-form-section__aside">총 0건</div>
  </div>
  <div class="dw-card dw-form-section__body">
    <!-- .dw-field … -->
  </div>
</section>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| title | 텍스트 | — | Title. `id`를 Root의 `aria-labelledby`에 연결 |
| description | 텍스트 | 없음 | Description 유무 |
| aside | 내용 | 없음 | Aside 유무 |
| required | boolean | false | Title 안에 `<span class="dw-field__indicator dw-field__indicator--dot"><span class="dw-visually-hidden">필수</span></span>` |
| heading level | `h2` · `h3` · `h4` | `h2` | 제목 요소. 스타일은 수준과 무관하다 |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | 세로 배치, gap 12px `x3` |
| Header | flex, 줄바꿈 허용, 아래 정렬, `space-between`, gap 4px `x1`(줄) · 8px `x2`(칸) |
| Heading | 세로 배치, gap 2px `x0_5`, 최소 폭 200px까지 줄어든다 |
| Title | t6 18/24 bold, `fg-neutral`, `word-break: keep-all` |
| Description | t4 14/19 regular, `fg-neutral-muted`, `word-break: keep-all` |
| Aside | t4 14/19, `fg-neutral-subtle`, 줄어들지 않는다 |
| Body | [Card](card.md) 기본 표면·모서리. padding 20px `x5`(640px 미만 16px `x4`), 필드 간격 20px `x5` |
| Section 사이 | [Form](form.md) Root gap 32px `x8` |

### 색

| 부위 | 값 |
| --- | --- |
| Body 표면 | `bg-layer-default`, 테두리 `stroke-neutral-muted`, `shadow-s1` |
| Indicator | `fg-critical` |

## States

| 상태 | 트리거 | 변화 | 전환 |
| --- | --- | --- | --- |
| Default | — | 정적 영역. 자체 상호작용이 없다 | — |
| Invalid | 안쪽 필드 오류 | Section은 변하지 않는다. 오류는 Field가 표시한다 | — |

## Behavior & Accessibility

- `<section>`에 `aria-labelledby`를 주어 구획이 이름 있는 영역으로 읽히게 한다.
- 필수 점은 숨김 글자 "필수"를 함께 둔다. 색 점만 두지 않는다.
- Aside에 버튼을 두면 탭 순서는 카드 안 필드보다 앞이다. 입력 흐름을 끊는 행동은 두지 않는다.

| 키 | 동작 |
| --- | --- |
| Tab | 안쪽 컨트롤을 차례로 지난다. Section은 포커스를 받지 않는다 |

## Responsive

| 너비 | 변화 |
| --- | --- |
| < 640px | Body padding 16px `x4` |
| 좁은 폭 | Aside가 들어갈 자리가 없으면 Heading 아래 줄로 내려간다 |

## Do / Don't

- **Do** 제목은 명사로 짧게 쓴다("기본 정보").
- **Do** 한 폼에서는 구획의 형식을 맞춘다.
- **Don't** Section 안에 Section을 넣지 않는다.
- **Don't** 필수 필드가 있다고 모두 표시하지 않는다. 구획 전체가 필수일 때만 쓴다.
