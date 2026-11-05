import type * as React from "react"

import { cn } from "@/lib/utils"

/** 사람 목록은 `명`, 그 외는 `개`. `건`은 쓰지 않는다 */
type ListCountUnit = "명" | "개"

interface ListFooterProps extends React.ComponentProps<"div"> {
  /** 조회 결과 총 건수. 아직 모르면(로딩·오류) null이고 `-`로 보인다 */
  total: number | null
  unit?: ListCountUnit
  /** 가운데에 둘 Pagination */
  children?: React.ReactNode
}

/**
 * 표·목록 아래 줄. 왼쪽에 총 건수, 가운데에 Pagination을 둔다.
 * 명세는 design/components/list-footer.md
 */
function ListFooter({ total, unit = "개", children, className, ...props }: ListFooterProps) {
  return (
    <div
      data-slot="list-footer"
      className={cn(
        "flex min-w-0 flex-col items-center gap-2 sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
        className
      )}
      {...props}
    >
      <p aria-live="polite" className="self-start text-sm sm:self-auto">
        총 <span className="font-bold tabular-nums">{total ?? "-"}</span>
        {unit}
      </p>
      {children}
    </div>
  )
}

export { ListFooter }
export type { ListCountUnit, ListFooterProps }
