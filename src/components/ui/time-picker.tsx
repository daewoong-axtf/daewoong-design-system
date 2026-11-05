import type * as React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type TimePickerProps = Omit<React.ComponentProps<typeof Input>, 'type'>

/**
 * 시간을 고르는 입력. (대웅 커스텀 — 네이티브 input[type=time] 기반)
 * OS 기본 시간 피커를 쓰므로 모바일에서 겹침이 없고 접근성·터치 호환이 좋다.
 * 범위가 필요하면 두 개를 '~'로 묶어 쓴다. 명세는 `design/components/time-picker.md`.
 */
function TimePicker({ className, ...props }: TimePickerProps) {
  return <Input type='time' data-slot='time-picker' className={cn('tabular-nums', className)} {...props} />
}

export { TimePicker }
