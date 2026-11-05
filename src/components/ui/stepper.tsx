import { CheckIcon } from 'lucide-react'
import type * as React from 'react'

import { cn } from '@/lib/utils'

interface StepperProps extends Omit<React.ComponentProps<'ol'>, 'children'> {
  /** 단계 라벨 목록 */
  steps: string[]
  /** 현재 단계의 0부터 시작하는 번호. 단계 수와 같으면 모두 완료로 보인다 */
  current: number
}

/** 흐름의 전체 단계와 지금 위치를 보여 준다. 명세: design/components/stepper.md */
function Stepper({ steps, current, className, ...props }: StepperProps) {
  return (
    <ol
      data-slot='stepper'
      className={cn('relative flex w-full items-center sm:w-fit sm:max-w-full', className)}
      {...props}
    >
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        const last = i === steps.length - 1
        return (
          <li
            key={label}
            aria-current={active ? 'step' : undefined}
            className={cn(
              'flex min-w-0 items-center sm:flex-none',
              last ? 'flex-[0_1_auto]' : active ? 'flex-[1_1_auto]' : 'flex-1',
            )}
          >
            <span
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-medium',
                done && 'border-(--dw-bg-brand-solid) bg-(--dw-bg-brand-solid) text-(--dw-fg-on-brand-solid)',
                active && 'border-(--dw-stroke-brand-solid) text-(--dw-fg-brand)',
                !done && !active && 'border-(--dw-stroke-neutral-weak) text-(--dw-fg-neutral-subtle)',
              )}
            >
              {done ? (
                <CheckIcon className='size-4' aria-hidden='true' />
              ) : (
                <span aria-hidden='true'>{i + 1}</span>
              )}
            </span>
            <span
              className={cn(
                'ml-2 min-w-0 truncate text-sm sm:static sm:m-0 sm:ml-2 sm:size-auto sm:shrink-0 sm:[clip:auto]',
                active
                  ? 'font-medium text-(--dw-fg-neutral)'
                  : 'absolute -m-px size-px [clip:rect(0_0_0_0)] text-(--dw-fg-neutral-subtle)',
              )}
            >
              {label}
              {done && <span className='sr-only'> 완료</span>}
            </span>
            {!last && (
              <span
                aria-hidden='true'
                className={cn(
                  'mx-2 h-px min-w-2 flex-1 sm:mx-3 sm:w-8 sm:flex-none',
                  done ? 'bg-(--dw-bg-brand-solid)' : 'bg-(--dw-stroke-neutral-weak)',
                )}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export { Stepper }
