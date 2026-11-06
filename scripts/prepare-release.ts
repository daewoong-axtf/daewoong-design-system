// 릴리즈 직전에 버전이 들어가는 파일을 고친다. semantic-release가 호출한다
//   package.json          version, designSystem.ref
//   design/catalog.html   업데이트 기록
//   node scripts/prepare-release.ts <새 버전> <이전 버전>
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const HISTORY = /(<h2 id="page-history-title">업데이트 기록<\/h2>\s*<ol>\n)/

export function bumpPackage(source: string, version: string): string {
  const pkg = JSON.parse(source) as { version: string; designSystem: { ref: string } }
  pkg.version = version
  pkg.designSystem.ref = `v${version}`
  return `${JSON.stringify(pkg, null, 2)}\n`
}

/** feat·fix·perf 커밋의 제목만 남긴다 */
export function summarize(subjects: string[]): string {
  const lines = subjects.flatMap((subject) => subject.match(/^(?:feat|fix|perf)(?:\(.+?\))?!?: (.+)$/)?.[1] ?? [])
  return lines.map((line) => (/[.!?]$/.test(line) ? line : `${line}.`)).join(' ')
}

const escapeHtml = (text: string): string =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

export function addHistory(html: string, version: string, date: string, summary: string): string {
  if (!HISTORY.test(html)) throw new Error('catalog.html에서 업데이트 기록을 찾지 못했다')
  const entry = `        <li>
          <p class="page-history__version"><strong>v${version}</strong><time datetime="${date}">${date}</time></p>
          <p>${escapeHtml(summary)}</p>
        </li>
`
  return html.replace(HISTORY, (open) => open + entry)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [version, previous] = process.argv.slice(2)
  if (!version || !previous) throw new Error('사용법: prepare-release.ts <새 버전> <이전 버전>')
  const log = execFileSync('git', ['log', `v${previous}..HEAD`, '--format=%s'], { cwd: ROOT, encoding: 'utf8' })
  const pkgPath = join(ROOT, 'package.json')
  const catalogPath = join(ROOT, 'design/catalog.html')
  writeFileSync(pkgPath, bumpPackage(readFileSync(pkgPath, 'utf8'), version))
  writeFileSync(
    catalogPath,
    addHistory(
      readFileSync(catalogPath, 'utf8'),
      version,
      new Date().toISOString().slice(0, 10),
      summarize(log.split('\n')),
    ),
  )
}
