// AI가 읽는 문서를 만든다
//   design/ai/setup-prompt.md + package.json designSystem → catalog.html의 복사 프롬프트 (build-catalog.ts)
//   design/llms.txt       읽을 문서 목록
//   design/llms-full.txt  정본 문서를 한 파일로 합친 것
//   README.md             <!--AI_PROMPT--> 구역의 복사 프롬프트
//   node scripts/build-llms.ts [--check]
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DESIGN = join(ROOT, 'design')
const read = (path: string): string => readFileSync(join(DESIGN, path), 'utf8')

const specs = (): string[] =>
  readdirSync(join(DESIGN, 'components')).filter((f) => f.endsWith('.md') && !f.startsWith('_')).sort().map((f) => `components/${f}`)
const guides = (): string[] => readdirSync(join(DESIGN, 'guides')).filter((f) => f.endsWith('.md')).sort().map((f) => `guides/${f}`)

const title = (path: string): string => /^#\s+(.+)$/m.exec(read(path))?.[1] ?? path

export function setupPrompt(): string {
  const { repository, ref } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).designSystem as { repository: string; ref: string }
  return read('ai/setup-prompt.md').replaceAll('{{REPOSITORY}}', repository).replaceAll('{{REF}}', ref).trim()
}

export function buildIndex(): string {
  const list = (paths: string[]) => paths.map((p) => `- [${title(p)}](${p})`).join('\n')
  return `# Daewoong Design System

> 여러 언어와 프레임워크에서 같은 화면 규칙을 쓰기 위한 디자인 시스템이다. 정본은 토큰과 컴포넌트 명세이고, Tailwind와 shadcn은 프로젝트가 이미 쓸 때만 연결한다.

충돌하면 tokens.json > components/<name>.md > design.md > catalog.html 순서로 앞쪽이 맞다.

## 시작

- [읽는 순서와 금지사항](README.md)
- [토큰 쓰임과 환경별 적용](design.md)
- [프로젝트 설정 프롬프트](ai/setup-prompt.md)
- [전체 문서를 한 파일로 합친 판](llms-full.txt)

## 값

- [토큰 정본](tokens.json)
- [CSS 변수](tokens.css)
- [서버 템플릿 웹용 클래스](components.css)
- [마크업 예시](catalog.html)

## 컴포넌트

${list(specs())}

## 가이드

${list(guides())}
`
}

export function buildFull(): string {
  const files = ['README.md', 'design.md', ...specs(), ...guides(), 'tokens.json']
  const body = files.map((f) => `<!-- file: ${f} -->\n\n${read(f).trim()}`).join('\n\n')
  return `<!-- 생성 파일 — pnpm build:llms -->\n\n${body}\n`
}

export function buildReadme(): string {
  const prompt = `<!--AI_PROMPT-->\n<details>\n<summary>설정 프롬프트 펼치기</summary>\n\n\`\`\`text\n${setupPrompt()}\n\`\`\`\n\n</details>\n<!--/AI_PROMPT-->`
  return readFileSync(join(ROOT, 'README.md'), 'utf8').replace(/<!--AI_PROMPT-->[\s\S]*<!--\/AI_PROMPT-->/, () => prompt)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const [path, out] of [[join(DESIGN, 'llms.txt'), buildIndex()], [join(DESIGN, 'llms-full.txt'), buildFull()], [join(ROOT, 'README.md'), buildReadme()]] as const) {
    if (process.argv.includes('--check')) {
      if (out !== readFileSync(path, 'utf8')) {
        console.error(`${path} 가 최신이 아니다 — pnpm build:llms`)
        process.exitCode = 1
      }
    } else {
      writeFileSync(path, out)
      console.log(`→ ${path}`)
    }
  }
}
