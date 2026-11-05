import type * as React from 'react'

import { cn } from '@/lib/utils'

interface ErrorViewProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  /** HTTP 상태 코드 (예: 403·404·500). 서버 응답이 아닌 화면 렌더 오류는 비운다 */
  code?: number
  title: string
  description?: string
  /** 상단 아이콘. 크기는 48px로 맞춘다 */
  icon?: React.ReactNode
  /** 하단 액션 버튼 묶음 */
  actions?: React.ReactNode
  /** contained는 앱 셸 안 본문용이다 */
  layout?: 'fullscreen' | 'contained'
}

/**
 * 페이지 전체를 보여 줄 수 없을 때 쓰는 오류 화면 (403·404·500·렌더 오류 공용).
 * 명세: design/components/error-view.md
 */
function ErrorView({
  code,
  title,
  description,
  icon,
  actions,
  layout = 'fullscreen',
  className,
  ...props
}: ErrorViewProps) {
  return (
    <div
      data-slot='error-view'
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 px-6 py-12 text-center',
        layout === 'fullscreen' ? 'min-h-dvh' : 'min-h-80',
        className,
      )}
      {...props}
    >
      {icon && (
        <div className='grid place-items-center text-(--dw-fg-neutral-subtle) [&>svg]:size-12' aria-hidden='true'>
          {icon}
        </div>
      )}
      {code !== undefined && (
        <p className='text-[length:var(--dw-font-t13-size)] leading-[var(--dw-font-t13-line-height)] font-bold text-(--dw-fg-neutral-subtle) tabular-nums sm:text-[length:var(--dw-font-t14-size)] sm:leading-[var(--dw-font-t14-line-height)]'>
          {code}
        </p>
      )}
      <div className='flex flex-col items-center gap-1.5'>
        <h1
          tabIndex={-1}
          className='text-[length:var(--dw-font-t7-size)] leading-[var(--dw-font-t7-line-height)] font-bold text-(--dw-fg-neutral) outline-none sm:text-[length:var(--dw-font-t9-size)] sm:leading-[var(--dw-font-t9-line-height)]'
        >
          {title}
        </h1>
        {description && (
          <p className='max-w-md text-[length:var(--dw-font-t4-size)] leading-[var(--dw-font-t4-line-height)] text-(--dw-fg-neutral-subtle) sm:text-[length:var(--dw-font-t5-size)] sm:leading-[var(--dw-font-t5-line-height)]'>
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className='mt-2 flex flex-wrap items-center justify-center gap-2'>
          {actions}
        </div>
      )}
    </div>
  )
}

export { ErrorView }
