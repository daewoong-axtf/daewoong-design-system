# Avatar

> 클래스 `.dw-avatar` · 레퍼런스 [storybook.html#avatar](../storybook.html#avatar)

## 개요

사람(또는 조직)을 나타내는 원형 이미지다. 이미지가 없거나 실패하면 이니셜 또는 기본 사람 아이콘을 보여준다.
**쓰지 말 것** — 상품·콘텐츠 썸네일(일반 이미지).

## Anatomy

| 부위 | 클래스 | 필수 | 설명 |
| --- | --- | --- | --- |
| Root | `.dw-avatar` | ✓ | 원형 틀, 위에 얇은 테두리(`::after`) |
| Image | `.dw-avatar__image` | | `<img alt>` |
| Fallback | `.dw-avatar__fallback` | ✓ | 이미지가 없거나 실패할 때 |

```html
<span class="dw-avatar dw-avatar--40">
  <img class="dw-avatar__image" src="…" alt="홍길동">
  <span class="dw-avatar__fallback" aria-hidden="true">홍</span>
</span>
```

## Properties

| 속성 | 값 | 기본값 | 표현 |
| --- | --- | --- | --- |
| size | `20` · `24` · `36` · `42` · `48` · `56` · `64` · `80` · `96` | `42` | `.dw-avatar--<size>` |
| fallback | 이니셜(1–2자) · 아이콘 | 아이콘 | Fallback 내용 |

## Specification

| 항목 | 값 |
| --- | --- |
| Root | 지름 = size, `radius-full`, `inline-flex` 가운데, `vertical-align: top` |
| 테두리 | `::after` `inset 0 0 0 1px stroke-neutral-subtle` (이미지 위에 겹침) |
| Image | 꽉 채움 `object-fit: cover`, 원형으로 잘림 |
| Fallback | bg `bg-neutral-weak`. 이니셜: 글자 `fg-neutral-subtle` bold, 크기 = size × 0.4 (줄높이 1). 아이콘: `user` 크기 size × 0.6, `fg-neutral-subtle` |

## States

| 상태 | 트리거 | 변화 |
| --- | --- | --- |
| Loading | 이미지 요청 중 | Fallback 보임 |
| Loaded | `load` | Image 보임, Fallback 숨김 |
| Error | `error` 또는 src 없음 | Image 숨김, Fallback 유지 |

## Behavior & Accessibility

- Image `alt`는 사람 이름. 옆에 이름 텍스트가 이미 있으면 `alt=""`(장식).
- Fallback은 `aria-hidden="true"` — 이름은 Image alt 또는 주변 텍스트가 전한다.
- 아바타를 눌러 프로필로 가면 감싸는 `<a>`에 이름을 준다.

## Responsive

| 너비 | 변화 |
| --- | --- |
| 전체 | 없음 |

## Do / Don't

- **Do** 목록 행은 42, 상세 헤더는 64–80.
- **Don't** 원이 아닌 모양으로 자르지 않는다.
