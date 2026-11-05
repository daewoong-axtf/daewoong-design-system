import type * as React from "react"

import { cn } from "@/lib/utils"

const LAYOUT = {
  stacked: "flex-col [&>*]:w-full",
  split: "flex-row [&>*]:min-w-0 [&>*]:flex-1 [&>*:last-child]:flex-[2]",
  compact: "flex-row justify-end",
}

interface ActionAreaProps extends React.ComponentProps<"div"> {
  layout?: keyof typeof LAYOUT
  sticky?: boolean
  divided?: boolean
  caption?: React.ReactNode
}

/**
 * (DW 커스텀) 화면의 마지막 행동을 아래쪽에 모은다. 명세는 design/components/action-area.md
 */
function ActionArea({ layout = "stacked", sticky, divided, caption, className, children, ...props }: ActionAreaProps) {
  return (
    <div
      data-slot="action-area"
      className={cn(
        "flex w-full flex-col gap-2 bg-[var(--dw-bg-layer-default)] px-4 py-3",
        sticky && "sticky bottom-0 z-[var(--dw-z-raised)] pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]",
        divided && "shadow-[inset_0_1px_0_0_var(--dw-stroke-neutral-weak)]",
        className
      )}
      {...props}
    >
      {caption ? (
        <p className={cn("text-[13px]/[18px] text-[var(--dw-fg-neutral-subtle)]", layout === "compact" ? "text-right" : "text-center")}>
          {caption}
        </p>
      ) : null}
      <div className={cn("flex gap-2", LAYOUT[layout])}>{children}</div>
    </div>
  )
}

export { ActionArea }
