# Daewoong Design System

대웅 서비스들이 공통으로 쓰는 디자인 시스템이다. 패키지로 배포하지 않는다 — 각 서비스는 아래 전달물을 보고
**자기 언어·프레임워크로 구현**하거나, React라면 Storybook의 소스를 복사해 쓴다.

## 전달물

| 전달물 | 대상 | 내용 |
| --- | --- | --- |
| Figma 링크 | 디자이너·기획자 | 컴포넌트·토큰 라이브러리 _(준비 중)_ |
| Storybook 링크 | 개발자 | 동작하는 React 컴포넌트 카탈로그 _(준비 중)_ |
| [`design/`](design/) | 개발자·AI 에이전트 | 언어 무관 정본 — 토큰, 컴포넌트 명세, 순수 HTML/CSS 레퍼런스, 가이드 |

프로젝트에 붙이는 방법(Next.js·React는 shadcn + `tokens.css` + `shadcn.css`, 서버 템플릿 웹은 `tokens.css` + `components.css`)은 [`design/design.md` 14장](design/design.md#14-환경별-적용)에 있다.

## 정본 우선순위

`design/tokens.json` > `design/components/<name>.md` > `design/storybook.html`

`tokens.css`는 `tokens.json`에서 생성된다(`pnpm build:tokens`). 충돌하면 `tokens.json`이 이긴다.

## 개발

```bash
pnpm build:tokens   # tokens.json → tokens.css
pnpm build:icons    # lucide-react → design/icons/ (*.svg · sprite.svg · icons.json)
pnpm test               # 토큰·가드 테스트
```

## 라이선스

사내 전용. 아이콘은 Lucide(ISC) — [design/icons/LICENSE.md](design/icons/LICENSE.md).

## Storybook

```bash
pnpm storybook          # http://localhost:6006
pnpm test:storybook     # 스토리 play 테스트 + a11y (Chromium)
pnpm shadcn add <name>  # shadcn 원본 컴포넌트 추가 (사내 프록시면 NODE_OPTIONS=--use-system-ca)
```

`src/components/ui/`는 shadcn 원본 그대로다. 색·모서리·그림자는 `src/styles/globals.css`에서 shadcn 변수를 `design/tokens.css`의 `--dw-*` 토큰에 연결해 바꾼다 — 컴포넌트 소스를 고치지 않는다. 정본은 여전히 `design/`이다.
