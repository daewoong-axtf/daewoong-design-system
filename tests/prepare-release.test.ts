import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { addHistory, bumpPackage, summarize } from '../scripts/prepare-release.ts'

test('버전과 설치 프롬프트가 받는 ref를 함께 올린다', () => {
  const out = JSON.parse(bumpPackage('{"version":"1.0.0","designSystem":{"ref":"v1.0.0"}}', '1.1.0'))
  assert.equal(out.version, '1.1.0')
  assert.equal(out.designSystem.ref, 'v1.1.0')
})

test('업데이트 기록에는 사용자가 볼 변경만 남긴다', () => {
  const out = summarize(['feat: 칩 추가', 'docs: 문서 수정', 'fix(button): 간격 수정.', 'chore: 정리', ''])
  assert.equal(out, '칩 추가. 간격 수정.')
})

test('새 기록을 업데이트 기록 맨 위에 넣는다', () => {
  const html = readFileSync(new URL('../design/catalog.html', import.meta.url), 'utf8')
  const out = addHistory(html, '1.1.0', '2026-12-01', '<Chip> 추가.')
  assert.ok(out.indexOf('v1.1.0') < out.indexOf('<strong>v1.0.0</strong>'))
  assert.ok(out.includes('&lt;Chip&gt; 추가.'))
})
