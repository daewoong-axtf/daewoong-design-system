import { DsText } from './ds-text'
import { PALETTE_FAMILIES, paletteSteps, roles } from './tokens'

const chip = {
  width: 28,
  height: 28,
  borderRadius: 'var(--dw-radius-r1_5)',
  border: '1px solid var(--dw-stroke-neutral-subtle)',
  flexShrink: 0,
} as const

const BRAND_COLORS = [
  { rank: 'Primary', role: 'brand', use: '화면의 대표 행동' },
  { rank: 'Secondary', role: 'brand-secondary', use: '두 번째 행동, 공지, 차트' },
  { rank: 'Tertiary', role: 'brand-tertiary', use: '탐색, 새 기능, 차트' },
] as const

/** 브랜드 3색과 위에 얹는 글자색 */
export function BrandColors() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--dw-spacing-x2)' }}>
      {BRAND_COLORS.map(({ rank, role, use }) => (
        <div
          key={role}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--dw-spacing-x1)',
            padding: 'var(--dw-spacing-x4)',
            borderRadius: 'var(--dw-radius-r3)',
            background: `var(--dw-bg-${role}-solid)`,
            color: `var(--dw-fg-on-${role}-solid)`,
            fontFamily: 'var(--dw-font-sans)',
          }}
        >
          <strong>{rank}</strong>
          <code style={{ color: 'inherit', background: 'none' }}>bg-{role}-solid</code>
          <span>{use}</span>
        </div>
      ))}
    </div>
  )
}

/** 계열별 단계 스와치 — 색은 var(--dw-*)라 툴바 테마를 따른다 */
export function PaletteGrid() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x6)' }}>
      {PALETTE_FAMILIES.map((family) => (
        <div key={family} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x2)' }}>
          <DsText style="label-md">{family}</DsText>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: 'var(--dw-spacing-x1)' }}>
            {paletteSteps(family).map((s) => (
              <div key={s.name} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dw-spacing-x1)' }}>
                <div
                  style={{
                    height: 56,
                    borderRadius: 'var(--dw-radius-r2)',
                    border: '1px solid var(--dw-stroke-neutral-subtle)',
                    // 반투명 계열은 체크무늬 위에 올려 투명도가 보이게 한다
                    background: `linear-gradient(var(--dw-${s.name}), var(--dw-${s.name})), repeating-conic-gradient(var(--dw-gray-300) 0 25%, var(--dw-gray-00) 0 50%) 0 0 / 12px 12px`,
                  }}
                />
                <DsText style="label-sm">{s.step}</DsText>
                <DsText style="caption" color="fg-neutral-subtle" css={{ fontSize: 'var(--dw-font-t1-size)', overflowWrap: 'anywhere' }}>
                  {s.light}
                </DsText>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/** 역할 토큰 표 — 라이트·다크가 어느 팔레트 단계를 가리키는지 함께 보인다 */
export function RoleTable({ layer }: { layer: 'bg' | 'fg' | 'stroke' }) {
  const cell = { padding: 'var(--dw-spacing-x2_5) var(--dw-spacing-x3)', textAlign: 'left', verticalAlign: 'middle' } as const
  return (
    <div style={{ overflowX: 'auto', border: '1px solid var(--dw-stroke-neutral-muted)', borderRadius: 'var(--dw-radius-r3)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--dw-font-sans)' }}>
        <thead style={{ background: 'var(--dw-bg-neutral-weak)' }}>
          <tr>
            {['', '토큰', '라이트', '다크'].map((h) => (
              <th key={h} style={cell}>
                <DsText style="label-sm" color="fg-neutral-muted">
                  {h}
                </DsText>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {roles(layer).map((r) => (
            <tr key={r.name} style={{ borderTop: '1px solid var(--dw-stroke-neutral-muted)' }}>
              <td style={{ ...cell, width: 44 }}>
                {layer === 'bg' ? (
                  <div style={{ ...chip, background: `var(--dw-${r.name})` }} />
                ) : layer === 'fg' ? (
                  <div style={{ ...chip, display: 'grid', placeItems: 'center', color: `var(--dw-${r.name})`, fontWeight: 700 }}>가</div>
                ) : (
                  <div style={{ ...chip, border: `2px solid var(--dw-${r.name})` }} />
                )}
              </td>
              <td style={cell}>
                <code>--dw-{r.name}</code>
              </td>
              <td style={cell}>
                <DsText style="body-sm" color="fg-neutral-muted">
                  {r.light}
                </DsText>
              </td>
              <td style={cell}>
                <DsText style="body-sm" color="fg-neutral-muted">
                  {r.dark}
                </DsText>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
