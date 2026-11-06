'use client'

import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, XIcon } from 'lucide-react'
import * as React from 'react'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface DatePickerProps {
  id?: string
  /** yyyy-MM-dd. 비었으면 '' */
  value: string
  /** yyyy-MM-dd, 비우면 '' — RHF `field.onChange`를 그대로 넘길 수 있다 */
  onChange: (value: string) => void
  /** 고를 수 있는 첫날(yyyy-MM-dd) — 네이티브 `min`과 같다 */
  min?: string
  /** 고를 수 있는 마지막 날(yyyy-MM-dd) — 네이티브 `max`와 같다 */
  max?: string
  placeholder?: string
  /** 값을 비울 수 있게 X 버튼을 둔다(검색 필터처럼 '전체'로 되돌릴 때) */
  clearable?: boolean
  disabled?: boolean
  name?: string
  onBlur?: () => void
  ref?: React.Ref<HTMLButtonElement>
  'aria-invalid'?: boolean
  /** 래퍼에 적용된다 — 너비는 여기서 정한다 */
  className?: string
}

/** Input·SelectTrigger와 같은 상자라 같은 폼 줄에서 높이·테두리가 맞는다 */
const TRIGGER_CLASS =
  'flex h-10 w-full min-w-0 cursor-pointer items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-left text-base tabular-nums outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40'

/**
 * 날짜 선택 — 공용 달력(`Calendar`) 팝오버. (대웅 커스텀 — shadcn Date Picker 패턴)
 *
 * 네이티브 `input[type=date]`는 브라우저·OS마다 달력 모양·표기가 달라 같은 달력으로 통일한다.
 * 화면 표기는 "2026년 5월 20일 (수)", 값은 yyyy-MM-dd다. 명세는 `design/components/date-picker.md`.
 */
export function DatePicker({
  id,
  value,
  onChange,
  min,
  max,
  placeholder = '날짜 선택',
  clearable = false,
  disabled,
  name,
  onBlur,
  ref,
  'aria-invalid': ariaInvalid,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const selected = value ? parseISO(value) : undefined
  const minDate = min ? parseISO(min) : undefined
  const maxDate = max ? parseISO(max) : undefined
  const showClear = clearable && !!value && !disabled

  return (
    <div className={cn('relative w-full', className)}>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) onBlur?.()
        }}
      >
        <PopoverTrigger asChild>
          <button
            id={id}
            ref={ref}
            name={name}
            type='button'
            disabled={disabled}
            aria-invalid={ariaInvalid}
            data-slot='date-picker'
            className={cn(
              TRIGGER_CLASS,
              showClear && 'pr-9',
              !value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon
              aria-hidden
              className='size-4 shrink-0 text-muted-foreground'
            />
            <span className='truncate'>
              {selected
                ? format(selected, 'yyyy년 M월 d일 (EEE)', { locale: ko })
                : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent align='start' aria-label='날짜 선택' className='w-auto p-2'>
          <Calendar
            mode='single'
            autoFocus
            selected={selected}
            // 고른 날 → 고를 수 있는 첫날 → 오늘 순으로 그 달을 연다
            defaultMonth={selected ?? minDate}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : []),
            ]}
            onSelect={(day) => {
              // 같은 날을 다시 누르면 react-day-picker가 undefined를 준다 — 값은 유지한다
              if (day) onChange(format(day, 'yyyy-MM-dd'))
              setOpen(false)
            }}
            className='p-1'
          />
        </PopoverContent>
      </Popover>
      {showClear && (
        <button
          type='button'
          aria-label='날짜 지우기'
          onClick={() => onChange('')}
          className='absolute top-1/2 right-1 flex size-7 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'
        >
          <XIcon aria-hidden className='size-4' />
        </button>
      )}
    </div>
  )
}
