import type * as React from "react"

import { cn } from "@/lib/utils"

interface ChoiceCardProps extends Omit<React.ComponentProps<"label">, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
}

/**
 * (DW 커스텀) 설명이 필요한 보기를 카드로 고른다. children에 RadioGroupItem이나 Checkbox를 넣는다.
 * 명세는 design/components/choice-card.md
 */
function ChoiceCard({ title, description, className, children, ...props }: ChoiceCardProps) {
  return (
    <label
      data-slot="choice-card"
      className={cn(
        "relative grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)] items-start gap-3 rounded-xl p-4 shadow-[inset_0_0_0_1px_var(--dw-stroke-neutral-weak)]",
        "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-[var(--dw-stroke-focus-ring)]",
        "has-data-[state=checked]:shadow-[inset_0_0_0_2px_var(--dw-stroke-brand-solid)]",
        "has-aria-invalid:shadow-[inset_0_0_0_2px_var(--dw-stroke-critical-solid)]",
        "has-disabled:cursor-not-allowed has-disabled:bg-[var(--dw-bg-disabled)] has-disabled:shadow-[inset_0_0_0_1px_var(--dw-stroke-neutral-weak)]",
        className
      )}
      {...props}
    >
      {children}
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-base font-bold text-[var(--dw-fg-neutral)]">{title}</span>
        {description ? <span className="text-sm text-[var(--dw-fg-neutral-subtle)]">{description}</span> : null}
      </span>
    </label>
  )
}

export { ChoiceCard }
