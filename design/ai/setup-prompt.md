이 프로젝트의 기본 디자인 시스템으로 Daewoong Design System을 설정해줘. 파일 가져오기, 프로젝트 연결, AI 프로젝트 규칙 등록까지 끝내서 이후에는 "디자인 시스템 써"라고만 요청해도 쓸 수 있게 해줘.

저장소: {{REPOSITORY}}
가져올 위치(ref): {{REF}}

1. 먼저 프로젝트의 언어, 프레임워크, 스타일 방식, 패키지 관리자, 기존 AI 지침 파일, 수정 중인 파일을 확인해줘. 프로젝트 안에 `docs/design-system.md`가 이미 있으면 다시 가져오지 말고 거기 적힌 버전을 재사용해줘.

2. 저장소를 임시 폴더로 받아줘.
   git clone --depth 1 --branch {{REF}} {{REPOSITORY}}.git <임시 폴더>
   받은 뒤 `git rev-parse HEAD`로 커밋 값을 적어 둬. 저장소를 받지 못하면 내용을 추측하거나 설치했다고 말하지 말고, 받지 못한 이유를 사용자에게 알려줘.

3. 받은 `design/README.md`, `design/llms.txt`, `design/design.md` 14장을 읽어줘. `design/` 전체는 참고 문서로 `docs/design-reference/`에 복사해줘. 이 폴더는 사용자에게 공개되는 경로에 두지 않는다. 그다음 아래에서 프로젝트에 맞는 경로 하나를 골라줘. 화면 실행에 쓰는 파일은 `fonts/`, `tokens.css`, `components.css`, `js/components.js`, `icons/`다.
   - 서버가 HTML을 만드는 웹(Django, Flask, Spring, Ktor 등): 실행 파일을 정적 파일 경로 아래 `design/`에 복사하고 `fonts/pretendard.css`, `tokens.css`, `components.css`, `js/components.js`를 공통 템플릿에 연결한다. 경로는 프레임워크의 정적 파일 방식을 따른다. 마크업은 `catalog.html`에서 복사한다.
   - React·Next.js: Tailwind CSS v4와 shadcn/ui를 쓴다. 없으면 각 공식 설치 방법으로 설치한다. 단, 이미 다른 UI 라이브러리(MUI, Chakra, Ant Design, styled-components 등)를 쓰고 있으면 설치하기 전에 사용자에게 물어보고, 쓰지 않기로 하면 아래 Vue·Svelte 경로를 따른다. 실행 파일 중 `fonts/`, `icons/`, `tokens.css`, `shadcn.css`를 소스 경로(예: `src/design/`)에 복사하고 14.1절의 순서로 전역 CSS에서 불러온다.
   - Vue·Svelte 등 그 밖의 프론트엔드 프레임워크: 실행 파일 중 `js/components.js`를 뺀 나머지를 번들러가 처리하는 소스 경로(예: `src/design/`)에 복사하고 `fonts/pretendard.css`, `tokens.css`, `components.css`를 전역으로 불러온다. 동작은 그 프레임워크로 구현한다. Tailwind를 권장한다. 이미 쓰고 있으면 화면 배치에 그대로 쓰고, 없으면 설치할지 사용자에게 물어본다.
   - 웹이 아닌 환경(Flutter, Android, iOS, 데스크탑, PDF 등): 참고 문서만 두고, 14.3절대로 `tokens.json`을 그 플랫폼의 색·치수 정의로 옮긴다.

   웹이면 전역 스타일의 페이지 바탕을 `--dw-bg-layer-default`, 글자색을 `--dw-fg-neutral`, 글꼴을 `--dw-font-sans`로, 줄바꿈을 `word-break: keep-all`과 `overflow-wrap: break-word`로 지정해줘. 한글이 음절 중간이 아니라 단어 단위로 줄을 바꾼다. 디자인 시스템은 `body`를 스타일하지 않아서 이 지정이 없으면 다크 모드에서 바탕이 바뀌지 않는다.

4. 아래 원칙을 지켜줘.
   - React·Next.js의 Tailwind·shadcn과 사용자가 승인한 Tailwind 말고는 디자인 시스템을 적용하려고 라이브러리를 새로 설치하지 않는다. 프레임워크를 바꾸거나 주요 의존성을 올리지 않는다.
   - 프로젝트에 같은 경로의 다른 파일이 있으면 덮어쓰지 말고 다른 경로를 쓰거나 사용자에게 물어본다. 관련 없는 파일과 CSS는 유지한다.
   - 화면은 반응형이 기본이다. `375 · 768 · 1024px`에서 깨지지 않게 만든다.
   - 색·간격·모서리·글자는 토큰으로 부른다. 라이트·다크 모드를 모두 유지하고, 기본은 시스템 설정을 따른다.
   - 있는 컴포넌트를 다시 만들지 않는다. 없는 컴포넌트는 토큰으로 프로젝트에서 만든다. 키보드 포커스와 접근성을 유지한다.
   - 기존 화면은 이번 설정에서 다시 디자인하지 않는다. 연결 확인에 필요한 만큼만 바꾸고, 나머지는 사용자가 요청할 때 적용한다.
   - 복사한 문서에 나오는 `pnpm build:*` 명령은 디자인 시스템 저장소 전용이다. 프로젝트에 추가하지 않는다.

5. 이 AI가 실제로 읽는 프로젝트 규칙 파일 하나에 아래 규칙을 병합해줘. 기존 내용은 유지하고, 이미 있는 규칙 파일을 이 AI가 읽지 못할 때만 이 AI가 읽는 파일 하나를 추가해 기존 파일을 참조하게 해줘.
   "사용자가 '디자인 시스템 써', 'Daewoong Design System 써', 'use the design system'이라고 하면 Daewoong Design System을 적용한다. docs/design-system.md를 읽고, docs/design-reference/README.md부터 따른다. 설치된 토큰과 컴포넌트를 재사용하고 프레임워크를 유지한다. 디자인 시스템을 자동으로 업데이트하지 않고 프로젝트의 수정 내용을 덮어쓰지 않는다."

6. `docs/design-system.md`에 저장소 주소, ref, 커밋 값, 고른 경로, 실행 파일을 복사한 위치, 연결한 파일을 기록해줘.

7. 프로젝트에서 쓸 수 있는 타입·빌드·테스트 검사를 실행하고, 화면이 있으면 라이트·다크 모드에서 확인해줘. 임시 폴더는 지워줘. 끝나면 고른 경로, 바꾼 파일, 규칙을 저장한 위치, 검증 결과, 남은 제한을 알려줘. 검증이 실패했으면 완료했다고 말하지 마.

접근 권한, 호환성, 기존 내용 삭제처럼 사용자가 정해야 하는 일만 질문해줘.
