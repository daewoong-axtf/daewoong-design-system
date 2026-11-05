'use client'

import { Progress as ProgressPrimitive } from 'radix-ui'
import type * as React from 'react'

import { cn } from '@/lib/utils'

interface ProgressProps
  extends Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, 'value' | 'max'> {
  /** 0–100. 비우면 진행률을 모르는 indeterminate다 */
  value?: number | null
  size?: 'medium' | 'small'
  tone?: 'brand' | 'neutral'
}

/** 작업의 진행을 가로 막대로 보여 준다. 명세: design/components/progress.md */
function Progress({
  className,
  value,
  size = 'medium',
  tone = 'brand',
  ...props
}: ProgressProps) {
  const clamped =
    value === undefined || value === null
      ? null
      : Math.min(100, Math.max(0, value))
  const range =
    tone === 'neutral' ? 'bg-(--dw-gray-500)' : 'bg-(--dw-bg-brand-solid)'

  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      value={clamped}
      className={cn(
        'relative w-full overflow-hidden rounded-full',
        size === 'small' ? 'h-1' : 'h-2',
        tone === 'neutral' ? 'bg-(--dw-bg-neutral-weak)' : 'bg-(--dw-bg-brand-weak)',
        className,
      )}
      {...props}
    >
      {clamped === null ? (
        // 멈춘 40% 막대는 40% 진행처럼 보이므로 모션 줄이기에서는 전체 막대를 깜빡인다
        <ProgressPrimitive.Indicator
          data-slot='progress-indicator'
          className={cn(
            'h-full w-2/5 rounded-full [transform:translateX(250%)] animate-in slide-in-from-left-full repeat-infinite duration-1500 ease-(--dw-easing-easing)',
            'motion-reduce:w-full motion-reduce:[transform:none] motion-reduce:animate-pulse',
            range,
          )}
        />
      ) : (
        <ProgressPrimitive.Indicator
          data-slot='progress-indicator'
          className={cn(
            'h-full w-full rounded-full transition-transform duration-300 ease-(--dw-easing-enter) motion-reduce:transition-none',
            range,
          )}
          style={{ transform: `translateX(${clamped - 100}%)` }}
        />
      )}
    </ProgressPrimitive.Root>
  )
}

export { Progress }
