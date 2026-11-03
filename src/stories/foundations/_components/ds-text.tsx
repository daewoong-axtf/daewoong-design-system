import type { CSSProperties, ElementType, ReactNode } from 'react'

const scale = (t: string, weight: 'regular' | 'medium' | 'bold'): CSSProperties => ({
  fontSize: `var(--dw-font-${t}-size)`,
  lineHeight: `var(--dw-font-${t}-line-height)`,
  fontWeight: `var(--dw-font-weight-${weight})` as CSSProperties['fontWeight'],
})

/**
 * 텍스트 스타일 12종 — design/design.md §3.3과 같은 이름·같은 값이다.
 * 값은 tokens.css의 --dw-font-* 변수를 그대로 쓴다.
 */
export const TEXT_STYLES = {
  display: scale('t12', 'bold'),
  'heading-xl': scale('t9', 'bold'),
  'heading-lg': scale('t7', 'bold'),
  'heading-md': scale('t6', 'bold'),
  'heading-sm': scale('t5', 'bold'),
  'body-lg': scale('t5', 'regular'),
  'body-md': scale('t4', 'regular'),
  'body-sm': scale('t3', 'regular'),
  'label-lg': scale('t5', 'medium'),
  'label-md': scale('t4', 'medium'),
  'label-sm': scale('t3', 'medium'),
  caption: scale('t2', 'regular'),
} as const satisfies Record<string, CSSProperties>

export type TextStyleName = keyof typeof TEXT_STYLES

/** 색은 fg 역할 토큰만 받는다 */
export type TextColorToken =
  | 'fg-neutral'
  | 'fg-neutral-muted'
  | 'fg-neutral-subtle'
  | 'fg-placeholder'
  | 'fg-brand'
  | 'fg-critical'
  | 'fg-positive'

interface DsTextProps {
  style: TextStyleName
  color?: TextColorToken
  as?: ElementType
  css?: CSSProperties
  children: ReactNode
}

export function DsText({ style, color = 'fg-neutral', as: Tag = 'p', css, children }: DsTextProps) {
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: 'var(--dw-font-sans)',
        color: `var(--dw-${color})`,
        ...TEXT_STYLES[style],
        ...css,
      }}
    >
      {children}
    </Tag>
  )
}
