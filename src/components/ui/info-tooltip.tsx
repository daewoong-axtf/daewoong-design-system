"use client"

import { InfoIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface InfoTooltipProps {
  /** 무엇에 대한 안내인지. 트리거는 "{label} 안내"로 읽힌다 */
  label: string
  /** 안내 문장. 항목 하나에 한 문장 */
  items: readonly string[]
  className?: string
}

/**
 * 라벨 옆 안내 아이콘이다. Tooltip과 달리 눌러서 열므로 터치·키보드에서도 같게 동작한다.
 * 닫기는 다시 누르기·바깥 누르기·Esc. 명세는 design/components/info-tooltip.md.
 */
function InfoTooltip({ label, items, className }: InfoTooltipProps) {
  const name = `${label} 안내`

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={name}
          className={cn(
            "relative inline-flex size-6 -m-1 shrink-0 cursor-pointer items-center justify-center rounded-full align-middle text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-expanded:text-foreground",
            "pointer-coarse:after:absolute pointer-coarse:after:-inset-2.5",
            className
          )}
        >
          <InfoIcon className="size-4" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        aria-label={name}
        className="w-auto max-w-[min(17.5rem,calc(100vw-1rem))] rounded-2xl px-4 py-3 text-sm"
      >
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="relative break-keep pl-3.5 before:absolute before:top-[0.5em] before:left-0 before:size-1.5 before:rounded-full before:bg-muted-foreground before:content-['']"
            >
              {item}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

export { InfoTooltip }
