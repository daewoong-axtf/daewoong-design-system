import { XIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

interface FilterTagItem<K extends string = string> {
  key: K
  /** 조건 이름 */
  label: string
  /** 표시할 값 */
  value: string
}

interface FilterTagsProps<K extends string> extends Omit<React.ComponentProps<"ul">, "children"> {
  /** 적용된 조건만 넘긴다. 비어 있으면 줄 자체를 그리지 않는다 */
  items: FilterTagItem<K>[]
  /** 누른 조건. 그 조건만 해제한다 */
  onRemove: (key: K) => void
  /** 마지막 태그를 지운 뒤 포커스를 받을 요소 (보통 Filter Button) */
  focusAfterEmptyRef?: React.RefObject<HTMLElement | null>
}

/**
 * 시트에서 건 조건을 지우기 아이콘이 있는 Chip으로 보이는 줄.
 * 명세는 design/components/filter-tags.md
 */
function FilterTags<K extends string>({
  items,
  onRemove,
  focusAfterEmptyRef,
  className,
  "aria-label": ariaLabel = "적용된 조회 조건",
  ...props
}: FilterTagsProps<K>) {
  const listRef = React.useRef<HTMLUListElement>(null)

  function handleRemove(key: K, event: React.MouseEvent<HTMLButtonElement>) {
    const item = event.currentTarget.closest("li")
    const neighbor = item?.nextElementSibling ?? item?.previousElementSibling
    const index = neighbor ? [...(listRef.current?.children ?? [])].indexOf(neighbor) : -1
    const shift = item?.nextElementSibling ? -1 : 0
    onRemove(key)
    // 지운 태그가 사라진 뒤에 옮긴다. 포커스가 문서 맨 앞으로 튀지 않게 한다
    requestAnimationFrame(() => {
      const next = listRef.current?.children[index + shift]?.querySelector("button")
      ;(next ?? focusAfterEmptyRef?.current)?.focus()
    })
  }

  if (items.length === 0) return null

  return (
    <ul
      ref={listRef}
      data-slot="filter-tags"
      aria-label={ariaLabel}
      className={cn("flex min-w-0 flex-wrap items-center gap-x-2 gap-y-3", className)}
      {...props}
    >
      {items.map((item) => {
        const text = `${item.label}: ${item.value}`
        return (
          <li key={item.key} className="max-w-full min-w-0">
            <button
              type="button"
              aria-label={`${text} 조건 지우기`}
              onClick={(event) => handleRemove(item.key, event)}
              className="relative inline-flex h-8 max-w-full min-w-11 cursor-pointer items-center justify-center gap-1 rounded-full bg-(--dw-bg-transparent) px-3 pr-2 text-sm font-medium whitespace-nowrap shadow-[inset_0_0_0_1px_var(--dw-stroke-neutral-muted)] transition-colors outline-none hover:bg-(--dw-bg-transparent-pressed) focus-visible:ring-[3px] focus-visible:ring-ring/50 pointer-coarse:before:absolute pointer-coarse:before:inset-x-0 pointer-coarse:before:-inset-y-1.5 pointer-coarse:before:content-['']"
            >
              <span className="min-w-0 truncate">{text}</span>
              <XIcon aria-hidden className="size-3.5 shrink-0" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export { FilterTags }
export type { FilterTagItem, FilterTagsProps }
