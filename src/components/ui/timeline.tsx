import type * as React from "react"

import { cn } from "@/lib/utils"

/** 시간순으로 일어나는 일을 세로로 보여 준다. 명세는 design/components/timeline.md */
function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn("grid grid-cols-[minmax(3rem,max-content)_0.875rem_minmax(0,1fr)] gap-x-3", className)}
      {...props}
    />
  )
}

interface TimelineItemProps extends Omit<React.ComponentProps<"li">, "title"> {
  /** 시간 문구 */
  time: string
  title: React.ReactNode
  description?: React.ReactNode
  /** 진행 중인 항목. 점과 제목을 강조하고 `aria-current`로 알린다 */
  active?: boolean
}

function TimelineItem({ time, title, description, active, className, ...props }: TimelineItemProps) {
  return (
    <li
      data-slot="timeline-item"
      aria-current={active ? "true" : undefined}
      className={cn("group/timeline col-span-full grid grid-cols-subgrid", className)}
      {...props}
    >
      <div className="pt-0.5 text-right text-xs whitespace-nowrap text-(--dw-fg-neutral-subtle) tabular-nums">{time}</div>
      <div aria-hidden className="flex flex-col items-center">
        <span
          className={cn(
            "mt-1 mb-0.5 size-2.5 shrink-0 rounded-full",
            active
              ? "bg-(--dw-bg-brand-solid) shadow-[0_0_0_2px_var(--dw-bg-brand-weak)]"
              : "bg-(--dw-stroke-neutral-weak)"
          )}
        />
        <span className="w-px flex-1 bg-(--dw-stroke-neutral-muted) group-last/timeline:hidden" />
      </div>
      <div className="min-w-0 pb-5 group-last/timeline:pb-0">
        <div className={cn("text-sm", active ? "font-bold" : "font-medium")}>{title}</div>
        {description && <div className="text-sm text-(--dw-fg-neutral-subtle)">{description}</div>}
      </div>
    </li>
  )
}

export { Timeline, TimelineItem }
export type { TimelineItemProps }
