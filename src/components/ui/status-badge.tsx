import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const statusBadgeVariants = cva(
  'inline-flex min-h-6 w-fit max-w-full items-center gap-1.5 overflow-hidden rounded-[var(--dw-radius-r1_5)] px-2 py-0.5 text-[length:var(--dw-font-t2-size)] leading-[var(--dw-font-t2-line-height)] font-medium',
  {
    variants: {
      tone: {
        neutral: 'bg-(--dw-bg-neutral-weak) text-(--dw-fg-neutral-muted)',
        brand: 'bg-(--dw-bg-brand-weak) text-(--dw-fg-brand-contrast)',
        informative: 'bg-(--dw-bg-informative-weak) text-(--dw-fg-informative-contrast)',
        positive: 'bg-(--dw-bg-positive-weak) text-(--dw-fg-positive-contrast)',
        warning: 'bg-(--dw-bg-warning-weak) text-(--dw-fg-warning-contrast)',
        critical: 'bg-(--dw-bg-critical-weak) text-(--dw-fg-critical-contrast)',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
)

interface StatusBadgeProps
  extends React.ComponentProps<'span'>,
    VariantProps<typeof statusBadgeVariants> {
  /** 상태처럼 바뀌는 값은 점을 두고, 역할처럼 고정된 값은 뺀다 */
  dot?: boolean
}

/** 대상의 현재 상태나 역할을 보여 주는 라벨. 명세: design/components/status-badge.md */
function StatusBadge({
  className,
  tone,
  dot = true,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      data-slot='status-badge'
      className={cn(statusBadgeVariants({ tone }), className)}
      {...props}
    >
      {dot && (
        <span className='size-1.5 shrink-0 rounded-full bg-current' aria-hidden='true' />
      )}
      <span className='min-w-0 truncate'>{children}</span>
    </span>
  )
}

export { StatusBadge, statusBadgeVariants }
