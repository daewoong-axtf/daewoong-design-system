import { ChevronLeftIcon } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

interface PageHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: string
  description?: string
  /** 주요 버튼. 모바일에서는 화면 아래 고정 바로 내려간다 */
  actions?: React.ReactNode
  /** 뒤로가기 주소. 있으면 제목 위에 링크가 생긴다 */
  backHref?: string
  backLabel?: string
  /** 모바일에서 제목·설명을 화면에서 뺀다. 상단 내비게이션이 같은 이름을 보여 줄 때 켠다 */
  hideTitleOnMobile?: boolean
}

/**
 * 페이지 맨 위의 제목·설명·주요 행동. 명세는 design/components/page-header.md
 * 기본은 모바일 배치이고, 768px 이상이면서 높이가 500px을 넘을 때 데스크톱 배치가 된다.
 */
function PageHeader({
  title,
  description,
  actions,
  backHref,
  backLabel = "뒤로",
  hideTitleOnMobile = false,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn(
        "flex min-w-0 flex-col gap-3 [@media(min-width:768px)_and_(min-height:501px)]:flex-row [@media(min-width:768px)_and_(min-height:501px)]:items-start [@media(min-width:768px)_and_(min-height:501px)]:justify-between [@media(min-width:768px)_and_(min-height:501px)]:gap-4",
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col gap-1">
        {backHref && (
          <a
            href={backHref}
            className="relative -ml-1 flex w-fit items-center gap-1 rounded-sm text-sm text-(--dw-fg-neutral-subtle) transition-colors outline-none before:absolute before:inset-x-0 before:-inset-y-3 before:content-[''] hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 active:text-foreground"
          >
            <ChevronLeftIcon aria-hidden className="size-4 shrink-0" />
            {backLabel}
          </a>
        )}
        <h1
          className={cn(
            "text-2xl font-bold wrap-anywhere text-foreground",
            hideTitleOnMobile &&
              "max-[767px]:sr-only [@media(max-height:500px)_and_(orientation:landscape)]:sr-only"
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "text-sm text-(--dw-fg-neutral-subtle)",
              hideTitleOnMobile &&
                "max-[767px]:hidden [@media(max-height:500px)_and_(orientation:landscape)]:hidden"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div
          data-slot="page-header-actions"
          className="fixed inset-x-0 bottom-0 z-(--dw-z-raised) flex gap-2 bg-background px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[inset_0_1px_0_var(--dw-stroke-neutral-muted)] *:min-w-0 *:flex-1 [@media(min-width:768px)_and_(min-height:501px)]:static [@media(min-width:768px)_and_(min-height:501px)]:shrink-0 [@media(min-width:768px)_and_(min-height:501px)]:items-center [@media(min-width:768px)_and_(min-height:501px)]:bg-transparent [@media(min-width:768px)_and_(min-height:501px)]:p-0 [@media(min-width:768px)_and_(min-height:501px)]:shadow-none [@media(min-width:768px)_and_(min-height:501px)]:*:flex-none"
        >
          {actions}
        </div>
      )}
    </div>
  )
}

export { PageHeader }
export type { PageHeaderProps }
