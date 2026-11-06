# Daewoong Design System

대웅 서비스들이 공통으로 쓰는 디자인 시스템이다. 패키지로 배포하지 않는다 — 각 서비스는 아래 전달물을 보고
**자기 언어·프레임워크로 구현**하거나, React라면 Storybook의 소스를 복사해 쓴다.

[카탈로그](design/storybook.html) · [AI로 설치하기](#ai로-설치하기) · [AI용 문서](design/llms.txt)

## 카탈로그

토큰과 컴포넌트를 한 페이지에서 보는 [`design/storybook.html`](design/storybook.html)이다. GitHub에서는 소스로 보이므로 저장소를 받은 뒤 브라우저로 연다.

## AI로 설치하기

프롬프트를 AI에게 주면 프로젝트 환경을 확인해 디자인 시스템을 연결하고 프로젝트 규칙까지 저장한다. 서버 템플릿 웹, 프론트엔드 프레임워크, 웹이 아닌 환경을 모두 지원한다. Tailwind와 shadcn은 프로젝트가 이미 쓸 때만 연결한다.

### 설치

AI 도구에서 프로젝트를 열고 아래 프롬프트를 복사해 붙여 넣는다. AI에게는 프로젝트 파일을 고칠 권한과 저장소를 받을 수 있는 네트워크가 필요하다.

<!--AI_PROMPT-->
<details>
<summary>설정 프롬프트 펼치기</summary>

```text
이 프로젝트의 기본 디자인 시스템으로 Daewoong Design System을 설정해줘. 파일 가져오기, 프로젝트 연결, AI 프로젝트 규칙 등록까지 끝내서 이후에는 "디자인 시스템 써"라고만 요청해도 쓸 수 있게 해줘.

저장소: https://github.com/daewoong-axtf/dw-design-system
가져올 위치(ref): main

1. 먼저 프로젝트의 언어, 프레임워크, 스타일 방식, 패키지 관리자, 기존 AI 지침 파일, 수정 중인 파일을 확인해줘. 프로젝트 안에 `docs/design-system.md`가 이미 있으면 다시 가져오지 말고 거기 적힌 버전을 재사용해줘.

2. 저장소를 임시 폴더로 받아줘.
   git clone --depth 1 --branch main https://github.com/daewoong-axtf/dw-design-system.git <임시 폴더>
   받은 뒤 `git rev-parse HEAD`로 커밋 값을 적어 둬. 저장소에 접근할 수 없으면 내용을 추측하거나 설치했다고 말하지 말고, 사용자에게 저장소 접근 권한을 요청해줘.

3. 받은 `design/README.md`, `design/llms.txt`, `design/design.md` 14장을 읽어줘. `design/` 전체는 참고 문서로 `docs/design-reference/`에 복사해줘. 이 폴더는 사용자에게 공개되는 경로에 두지 않는다. 그다음 아래에서 프로젝트에 맞는 경로 하나를 골라줘. 화면 실행에 쓰는 파일은 `fonts/`, `tokens.css`, `components.css`, `js/components.js`, `icons/`다.
   - 서버가 HTML을 만드는 웹(Django, Flask, Spring, Ktor 등): 실행 파일을 정적 파일 경로 아래 `design/`에 복사하고 `fonts/pretendard.css`, `tokens.css`, `components.css`, `js/components.js`를 공통 템플릿에 연결한다. 경로는 프레임워크의 정적 파일 방식을 따른다. 마크업은 `storybook.html`에서 복사한다.
   - React·Vue·Svelte 등 프론트엔드 프레임워크: 실행 파일 중 `js/components.js`를 뺀 나머지를 번들러가 처리하는 소스 경로(예: `src/design/`)에 복사하고 `fonts/pretendard.css`, `tokens.css`, `components.css`를 전역으로 불러온다. 동작은 그 프레임워크로 구현한다. 프로젝트가 이미 Tailwind와 shadcn을 쓰면 14.1절대로 `shadcn.css`까지 연결한다.
   - 웹이 아닌 환경(Flutter, Android, iOS, 데스크탑, PDF 등): 참고 문서만 두고, 14.3절대로 `tokens.json`을 그 플랫폼의 색·치수 정의로 옮긴다.

   웹이면 전역 스타일의 페이지 바탕을 `--dw-bg-layer-default`, 글자색을 `--dw-fg-neutral`, 글꼴을 `--dw-font-sans`로 지정해줘. 디자인 시스템은 `body`를 스타일하지 않아서 이 지정이 없으면 다크 모드에서 바탕이 바뀌지 않는다.

4. 아래 원칙을 지켜줘.
   - 디자인 시스템을 적용하려고 Tailwind나 shadcn을 새로 설치하지 않는다. 프레임워크를 바꾸거나 주요 의존성을 올리지 않는다.
   - 프로젝트에 같은 경로의 다른 파일이 있으면 덮어쓰지 말고 다른 경로를 쓰거나 사용자에게 물어본다. 관련 없는 파일과 CSS는 유지한다.
   - 색·간격·모서리·글자는 토큰으로 부른다. 라이트·다크 모드를 모두 유지하고, 기본은 시스템 설정을 따른다.
   - 있는 컴포넌트를 다시 만들지 않는다. 없는 컴포넌트는 토큰으로 프로젝트에서 만든다. 키보드 포커스와 접근성을 유지한다.
   - 기존 화면은 이번 설정에서 다시 디자인하지 않는다. 연결 확인에 필요한 만큼만 바꾸고, 나머지는 사용자가 요청할 때 적용한다.
   - 복사한 문서에 나오는 `pnpm build:*` 명령은 디자인 시스템 저장소 전용이다. 프로젝트에 추가하지 않는다.

5. 이 AI가 실제로 읽는 프로젝트 규칙 파일 하나에 아래 규칙을 병합해줘. 기존 내용은 유지하고, 이미 있는 규칙 파일을 이 AI가 읽지 못할 때만 이 AI가 읽는 파일 하나를 추가해 기존 파일을 참조하게 해줘.
   "사용자가 '디자인 시스템 써', 'Daewoong Design System 써', 'use the design system'이라고 하면 Daewoong Design System을 적용한다. docs/design-system.md를 읽고, docs/design-reference/README.md부터 따른다. 설치된 토큰과 컴포넌트를 재사용하고 프레임워크를 유지한다. 디자인 시스템을 자동으로 업데이트하지 않고 프로젝트의 수정 내용을 덮어쓰지 않는다."

6. `docs/design-system.md`에 저장소 주소, ref, 커밋 값, 고른 경로, 실행 파일을 복사한 위치, 연결한 파일을 기록해줘.

7. 프로젝트에서 쓸 수 있는 타입·빌드·테스트 검사를 실행하고, 화면이 있으면 라이트·다크 모드에서 확인해줘. 임시 폴더는 지워줘. 끝나면 고른 경로, 바꾼 파일, 규칙을 저장한 위치, 검증 결과, 남은 제한을 알려줘. 검증이 실패했으면 완료했다고 말하지 마.

접근 권한, 호환성, 기존 내용 삭제처럼 사용자가 정해야 하는 일만 질문해줘.
```

</details>
<!--/AI_PROMPT-->

### 설치한 뒤

프로젝트 규칙이 저장되므로 이후에는 이렇게 요청한다.

```text
디자인 시스템 써서 설정 화면 만들어줘
```

### AI용 문서

- [문서 목록](design/llms.txt) — AI가 읽을 문서의 색인
- [전체 문서](design/llms-full.txt) — 정본 문서를 한 파일로 합친 판
- [설정 프롬프트 원본](design/ai/setup-prompt.md)

### 버전

설치한 저장소·ref·커밋은 프로젝트의 `docs/design-system.md`에 남는다. 이미 설치한 프로젝트는 자동으로 바뀌지 않는다. 올릴 때는 [업데이트 기록](design/storybook.html)을 확인하고, 프로젝트에서 고친 파일을 덮어쓰지 않는지 비교한다.

## 전달물

| 전달물 | 대상 | 내용 |
| --- | --- | --- |
| Figma 링크 | 디자이너·기획자 | 컴포넌트·토큰 라이브러리 _(준비 중)_ |
| Storybook 링크 | 개발자 | 동작하는 React 컴포넌트 카탈로그 _(준비 중)_ |
| [`design/`](design/) | 개발자·AI 에이전트 | 언어 무관 정본 — 토큰, 컴포넌트 명세, 순수 HTML/CSS 레퍼런스, 가이드 |
| [`design/ai/setup-prompt.md`](design/ai/setup-prompt.md) · [`design/llms.txt`](design/llms.txt) | 현업·AI 에이전트 | 복사해서 쓰는 설정 프롬프트와 AI용 문서 |

프로젝트에 붙이는 방법(Tailwind·shadcn을 쓰는 React는 `tokens.css` + `shadcn.css`, 그 밖의 웹은 `tokens.css` + `components.css`, 웹이 아닌 곳은 `tokens.json`)은 [`design/design.md` 14장](design/design.md#14-환경별-적용)에 있다.

## 정본 우선순위

`design/tokens.json` > `design/components/<name>.md` > `design/storybook.html`

`tokens.css`는 `tokens.json`에서 생성된다(`pnpm build:tokens`). 충돌하면 `tokens.json`이 이긴다.

## 개발

```bash
pnpm build:tokens   # tokens.json → tokens.css
pnpm build:icons    # lucide-react → design/icons/ (*.svg · sprite.svg · icons.json)
pnpm build:llms     # AI용 문서 → design/llms.txt · llms-full.txt, README 프롬프트
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
