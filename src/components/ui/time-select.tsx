import { ChevronDownIcon } from 'lucide-react'
import type * as React from 'react'

import { cn } from '@/lib/utils'

type TimeSelectProps = Omit<React.ComponentProps<'select'>, 'children'> & {
  /** 고를 수 있는 슬롯(HH:mm). 간격·범위는 화면이 정한다 */
  slots: readonly string[]
}

/**
 * 정해진 시간 슬롯에서만 고르는 시간 선택. (대웅 커스텀 — 네이티브 select 기반)
 *
 * 슬롯 밖의 값이 이미 저장돼 있으면 그 값을 목록 맨 앞에 함께 보여 조회·수정 시 값이 사라지지 않게 한다.
 * 값이 비어 있을 때만 비활성 '--:--'를 보이고, 값이 채워지면 걷어내 다시 비우는 길을 없앤다.
 * 명세는 `design/components/time-select.md`.
 */
function TimeSelect({ value, slots, className, ...props }: TimeSelectProps) {
  const offSlot = typeof value === 'string' && value !== '' && !slots.includes(value) ? value : null
  const showPlaceholder = typeof value === 'string' ? value === '' : value == null

  return (
    <span className={cn('relative block w-full min-w-0', className)}>
      <select
        data-slot='time-select'
        value={value ?? ''}
        className="h-10 w-full cursor-pointer appearance-none rounded-md border border-input bg-transparent py-1 pr-9 pl-3 text-base tabular-nums outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40 [&_option]:bg-popover [&_option]:text-popover-foreground"
        {...props}
      >
        {showPlaceholder && (
          <option value='' disabled>
            --:--
          </option>
        )}
        {offSlot && <option value={offSlot}>{offSlot}</option>}
        {slots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <ChevronDownIcon aria-hidden className='pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground' />
    </span>
  )
}

export { TimeSelect }
