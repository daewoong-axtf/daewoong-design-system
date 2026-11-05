import { ChevronDownIcon } from "lucide-react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** 한 영역만 접고 편다. 명세는 design/components/collapsible.md */
function Collapsible({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" className={cn("min-w-0", className)} {...props} />
}

/** 기본 모양과 Chevron을 함께 그린다. `asChild`면 자식 요소에 동작만 넘긴다 */
function CollapsibleTrigger({
  className,
  children,
  asChild,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  if (asChild) {
    return (
      <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" asChild className={className} {...props}>
        {children}
      </CollapsiblePrimitive.CollapsibleTrigger>
    )
  }
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-lg p-2 text-left text-sm font-medium transition-colors outline-none enabled:hover:bg-(--dw-bg-transparent-pressed) focus-visible:ring-[3px] focus-visible:ring-ring/50 enabled:active:scale-98 disabled:cursor-not-allowed disabled:text-(--dw-fg-disabled) motion-reduce:transition-none [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        className="size-4 shrink-0 text-(--dw-fg-neutral-subtle) transition-[rotate,transform] duration-(--dw-duration-d4) motion-reduce:transition-none"
      />
    </CollapsiblePrimitive.CollapsibleTrigger>
  )
}

function CollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className="overflow-hidden text-sm text-(--dw-fg-neutral-muted) data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down motion-reduce:animate-none"
      {...props}
    >
      <div className={cn("p-2", className)}>{children}</div>
    </CollapsiblePrimitive.CollapsibleContent>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
