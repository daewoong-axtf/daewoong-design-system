# design/ — Daewoong Design System 정본

언어·프레임워크와 무관하게 UI를 구현할 때 쓰는 폴더다. 사람과 AI 에이전트 모두 이 파일부터 읽는다.

## 사용 방법

- **프로젝트 초반에 가져가 셋팅한다.** 이 폴더의 내용을 프로젝트에 복사해 시작점으로 쓴다. 패키지로 설치하는 방식이 아니다. 환경별 연결 방법은 [`design.md` 14장](design.md#14-환경별-적용)에 있다.
- **필요한 컴포넌트는 프로젝트에서 자유롭게 확장한다.** 여기에 없는 컴포넌트가 필요하면 이 시스템을 기반으로 프로젝트 안에서 만들어 쓴다. 승인을 받거나 이 저장소에 먼저 추가할 필요는 없다.
- **확장할 때도 기반은 지킨다.** 색·간격·모서리·글자는 토큰을 쓰고, 상태·키보드·반응형·다크 모드는 아래 체크리스트를 따른다.

## 읽는 순서

1. [`design.md`](design.md) — 토큰을 언제 어디에 쓰는지. 프로젝트에 붙이는 방법은 [14장](design.md#14-환경별-적용)
2. [`tokens.json`](tokens.json) — 값의 정본
3. `components/<name>.md` — 구현할 컴포넌트 명세 ([템플릿](components/_template.md))
4. [`storybook.html`](storybook.html) — 동작하는 예시. 마크업은 여기서 복사한다
5. 필요할 때 [`guides/`](guides/) — [접근성](guides/accessibility.md), [상호작용](guides/interaction.md), [UX 문구](guides/ux-writing.md), [콘텐츠·다국어](guides/content-i18n.md), [UX 가이드라인](guides/ux-guideline.md)

## 정본 우선순위

`tokens.json` > `components/<name>.md` > `design.md` > `storybook.html`

충돌하면 앞쪽이 맞다. 뒤쪽을 고친다. `design.md`의 규칙은 컴포넌트 명세가 따로 정하지 않은 자리에 쓴다.

## 파일

| 파일 | 내용 | 수정 |
| --- | --- | --- |
| `tokens.json` | 색·간격·모서리·글자·모션·쌓임 순서·브레이크포인트 토큰 | 직접 |
| `tokens.css` | `--dw-*` CSS 변수 | 생성 — `pnpm build:tokens` |
| `shadcn.css` | shadcn 변수를 토큰에 연결 (Next.js·React) | 직접 |
| `components.css` | 서버 템플릿 웹용 `dw-*` 클래스 | 직접 |
| `js/components.ts` | 컴포넌트 동작 원본 | 직접 |
| `js/components.js` | 브라우저가 읽는 동작 파일 | 생성 — `pnpm build:catalog` |
| `icons/` | 아이콘 SVG·`sprite.svg`·`icons.json` | 생성 — `pnpm build:icons` |
| `brand/` | 회사 로고(CI) SVG·PNG·원본 AI | 수정 금지. 교체할 때 통째로 바꾼다 |
| `fonts/` | Pretendard 공식 동적 서브셋·라이선스 | 수정 금지. 버전을 올릴 때 통째로 교체 |
| `storybook.html` | 토큰과 컴포넌트를 한 페이지에서 보는 카탈로그. 마크업 레퍼런스 | 절은 직접, 아이콘·메뉴 구역은 생성 — `pnpm build:catalog` |
| `catalog.css` · `js/catalog.js` | 카탈로그 페이지 틀. 제품에 쓰지 않는다 | 직접 |

## 금지사항

- 색·간격·모서리·글자를 토큰 없이 쓰지 않는다. 스케일 밖 수치를 만들지 않는다.
- 유채색 팔레트(`orange`·`blue`·`green`·`yellow`·`red`·`purple`)를 직접 쓰지 않는다. 역할 토큰으로 부른다.
- 생성 파일을 손으로 고치지 않는다.
- 이미 있는 컴포넌트의 클래스 이름과 마크업 구조를 바꾸지 않는다. `storybook.html`에서 복사한다. 새 컴포넌트는 프로젝트의 이름으로 만들고 `dw-` 접두사를 쓰지 않는다.
- [`design.md` 12장](design.md#12-하지-말-것)의 항목을 어기지 않는다.

## 구현 체크리스트

- [ ] 명세의 모든 variant·size를 구현했다
- [ ] States 표의 hover·pressed·focus-visible·disabled·loading을 구현했다
- [ ] 키보드로 전부 조작할 수 있고 포커스가 보인다
- [ ] `375 · 768 · 1024px`에서 깨지지 않고, 터치 타깃이 44×44px 이상이다
- [ ] 라이트·다크 양쪽에서 확인했다
- [ ] `prefers-reduced-motion`에서 이동 애니메이션이 줄어든다
- [ ] 상태를 색 하나로만 알리지 않는다

## 브랜드 색 교체

[`design.md` 4장](design.md#4-브랜드-교체)의 절차로 `tokens.json`의 `orange-*`만 바꾸고 `pnpm build:tokens`를 돌린다. 그다음 `bg-brand-solid`와 `fg-on-brand-solid`, 흰 바탕의 `fg-brand` 대비가 4.5:1 이상인지 다시 확인한다.
