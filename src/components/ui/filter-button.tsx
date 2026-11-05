import { ListFilterIcon } from "lucide-react"
import type * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "children" | "variant" | "size" | "asChild"> {
  /** 시트에서 건 조건 수. 0보다 크면 숫자로 보인다 */
  activeCount: number
}

/**
 * 조회 조건을 여는 라벨 없는 아이콘 버튼. 명세는 design/components/filter-button.md
 * 조건 수는 접근 가능한 이름에도 넣는다.
 */
function FilterButton({ activeCount, className, ...props }: FilterButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      data-slot="filter-button"
      aria-label={activeCount > 0 ? `조회 조건 — ${activeCount}개 적용됨` : "조회 조건"}
      className={cn(
        // 36px 버튼의 터치 히트 영역을 44px로 넓힌다
        "relative shrink-0 pointer-coarse:before:absolute pointer-coarse:before:-inset-1 pointer-coarse:before:content-['']",
        className
      )}
      {...props}
    >
      <ListFilterIcon />
      {activeCount > 0 && (
        // 숫자는 이름에 이미 있어 글자 노드로 두지 않는다. 보이는 글자가 이름의 낱말과 달라지면 axe 위반이다
        <span
          aria-hidden
          data-count={activeCount}
          className="pointer-events-none absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-(--dw-bg-brand-solid) px-1 text-(length:--dw-font-t1-size) leading-(--dw-font-t1-line-height) font-bold text-(--dw-fg-on-brand-solid) tabular-nums after:content-[attr(data-count)]"
        />
      )}
    </Button>
  )
}

export { FilterButton }
export type { FilterButtonProps }
