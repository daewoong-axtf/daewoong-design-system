# AGENTS.md

이 저장소에서 UI를 구현하거나 디자인 시스템을 수정하는 에이전트는 **[design/README.md](design/README.md)를 먼저 읽는다.**
읽는 순서, 정본 우선순위(`tokens.json` > `components/<name>.md` > `component.html`), 금지사항이 거기 있다.

- `design/tokens.css`는 생성 파일이다. 직접 고치지 말고 `design/tokens.json`을 고친 뒤 `pnpm build:tokens`.
- 변경 후 `pnpm test`(가드 테스트)가 통과해야 한다.
