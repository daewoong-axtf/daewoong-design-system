import type { ComponentType, ReactNode } from 'react'

import { DsText } from './ds-text'

/**
 * 문서 페이지 레이아웃 조각 — 구분선 + [제목 | 내용] 2단.
 * 좁은 화면에서는 제목이 위로 올라가 1단이 된다.
 */
const CONTENT_WIDTH = 1248

/** Storybook 문서 테마(.sbdocs-*)가 h1·h2·p에 얹는 margin·밑줄을 이 컨테이너 안에서만 끈다 */
const RESET = `
.ds-doc :is(h1, h2, h3, h4, p, ul, ol, li) {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
}
.ds-doc table { margin: 0 !important; width: 100%; }
.ds-doc :is(tr, th, td) { border: 0 !important; background: transparent !important; }
.ds-doc td { border-top: 1px solid var(--dw-stroke-neutral-muted) !important; }
.ds-doc th { background: var(--dw-bg-neutral-weak) !important; }
.ds-doc-section { display: flex; flex-wrap: wrap; gap: var(--dw-spacing-x6) var(--dw-spacing-x12); padding: var(--dw-spacing-x14) 0 var(--dw-spacing-x16); }
.ds-doc-section > :first-child { width: 240px; flex-shrink: 0; }
.ds-doc-section > :last-child { flex: 1 1 480px; min-width: 0; display: flex; flex-direction: column; gap: var(--dw-spacing-x5); }
`

const docRoot = {
  background: 'var(--dw-bg-layer-default)',
  fontFamily: 'var(--dw-font-sans)',
} as const

export function DocPage({ children }: { children: ReactNode }) {
  return (
    <div className="ds-doc" style={{ ...docRoot, maxWidth: CONTENT_WIDTH }}>
      <style>{RESET}</style>
      {children}
    </div>
  )
}

export function DocMasthead({ eyebrow, title, meta }: { eyebrow: string; title: string; meta: [string, string][] }) {
  return (
    <header style={{ paddingBottom: 'var(--dw-spacing-x14)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x4)' }}>
        <DsText style="label-sm" color="fg-brand">
          {eyebrow}
        </DsText>
        <DsText style="display" as="h1">
          {title}
        </DsText>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dw-spacing-x4) var(--dw-spacing-x12)', paddingTop: 'var(--dw-spacing-x4)' }}>
          {meta.map(([label, value]) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x1_5)' }}>
              <DsText style="caption" color="fg-neutral-subtle">
                {label}
              </DsText>
              <DsText style="label-md">{value}</DsText>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 4, background: 'var(--dw-fg-neutral)', marginTop: 'var(--dw-spacing-x14)' }} />
    </header>
  )
}

export function DocSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <div style={{ height: 1, background: 'var(--dw-stroke-neutral-muted)' }} />
      <div className="ds-doc-section">
        <DsText style="heading-lg" as="h2">
          {title}
        </DsText>
        <div>{children}</div>
      </div>
    </section>
  )
}

export function DocPara({ children }: { children: ReactNode }) {
  return (
    <DsText style="body-lg" color="fg-neutral-muted">
      {children}
    </DsText>
  )
}

export function DocBullet({ lead, children }: { lead: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--dw-spacing-x3_5)', alignItems: 'flex-start' }}>
      <span
        aria-hidden
        style={{ width: 6, height: 6, borderRadius: 'var(--dw-radius-full)', background: 'var(--dw-bg-brand-solid)', marginTop: 8, flexShrink: 0 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x1)', minWidth: 0 }}>
        <DsText style="label-lg">{lead}</DsText>
        <DsText style="body-lg" color="fg-neutral-muted">
          {children}
        </DsText>
      </div>
    </div>
  )
}

export function DocGroup({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x2)' }}>
      <DsText style="label-lg">{label}</DsText>
      {lines.map((line) => (
        <DsText key={line} style="body-md" color="fg-neutral-muted">
          {line}
        </DsText>
      ))}
    </div>
  )
}

/** 표 — 첫 행이 머리글, 첫 열이 이름이다. 좁은 화면에서는 가로로 스크롤된다. */
export function DocTable({ rows }: { rows: ReactNode[][] }) {
  const [head, ...body] = rows
  const cell = { padding: 'var(--dw-spacing-x3) var(--dw-spacing-x4)', textAlign: 'left', verticalAlign: 'top' } as const
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--dw-stroke-neutral-muted)', borderRadius: 'var(--dw-radius-r3)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--dw-font-sans)' }}>
        <thead>
          <tr>
            {head.map((h, c) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: 표는 순서가 곧 의미다
              <th key={c} style={cell}>
                <DsText style="label-sm" color="fg-neutral-muted">
                  {h}
                </DsText>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, r) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 표는 순서가 곧 의미다
            <tr key={r}>
              {row.map((v, c) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: 표는 순서가 곧 의미다
                <td key={c} style={cell}>
                  <DsText style={c === 0 ? 'label-md' : 'body-md'} color={c === 0 ? 'fg-neutral' : 'fg-neutral-muted'}>
                    {v}
                  </DsText>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** 업데이트 목록 — 버전 번호 없이 날짜만, 최신 항목이 위 */
export function DocUpdates({ title, entries }: { title: string; entries: { date: string; lines: string[] }[] }) {
  return (
    <div className="ds-doc" style={{ ...docRoot, maxWidth: 608 }}>
      <style>{RESET}</style>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x6)', paddingBottom: 'var(--dw-spacing-x12)' }}>
        <DsText style="display" as="h1">
          {title}
        </DsText>
        <div style={{ height: 4, background: 'var(--dw-fg-neutral)' }} />
      </header>
      {entries.map((entry) => (
        <section key={entry.date}>
          <div style={{ height: 1, background: 'var(--dw-stroke-neutral-muted)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x4)', padding: 'var(--dw-spacing-x10) 0 var(--dw-spacing-x12)' }}>
            <DsText style="heading-lg" as="h2">
              {entry.date}
            </DsText>
            {entry.lines.map((line) => (
              <DsText key={line} style="body-lg" color="fg-neutral-muted">
                {line}
              </DsText>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export function DocIconGrid({ groups }: { groups: { label: string; icons: [string, ComponentType<{ size?: number }>][] }[] }) {
  return (
    <>
      {groups.map((group) => (
        <div key={group.label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x3)' }}>
          <DsText style="label-lg">
            {group.label} ({group.icons.length})
          </DsText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 'var(--dw-spacing-x3)' }}>
            {group.icons.map(([name, Icon]) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--dw-spacing-x2_5)',
                  padding: 'var(--dw-spacing-x4) var(--dw-spacing-x2)',
                  background: 'var(--dw-bg-layer-floating)',
                  border: '1px solid var(--dw-stroke-neutral-muted)',
                  borderRadius: 'var(--dw-radius-r2)',
                  color: 'var(--dw-fg-neutral)',
                }}
              >
                <Icon size={24} />
                <DsText style="caption" color="fg-neutral-subtle" css={{ textAlign: 'center', overflowWrap: 'anywhere' }}>
                  {name}
                </DsText>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
