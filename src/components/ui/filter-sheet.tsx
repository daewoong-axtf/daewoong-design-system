import { RotateCcwIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FilterButton } from "@/components/ui/filter-button"

// 가로로 눕힌 휴대폰은 너비가 넓어도 모바일이다 (design.md 9장)
const WIDE_QUERY = "(min-width: 768px) and (min-height: 501px)"

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function useWideLayout() {
  return React.useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => false
  )
}

interface FilterSheetProps {
  /** 지금 걸려 있는 조건 수. 트리거에 숫자로 보인다 */
  activeCount: number
  /** 어떤 조건을 고르는 시트인지 한 문장 */
  description?: string
  /** 시트 안 입력 필드. 입력값은 호출부가 들고 있는다 */
  children: React.ReactNode
  /** `조회` 또는 Enter. 입력값을 확정해 조회한다. false를 돌려주면 시트를 닫지 않는다 */
  onApply: () => boolean | void
  /** `초기화`. 입력값만 비운다. 조회하지 않는다. 없으면 버튼도 없다 */
  onReset?: () => void
  /** 조회 없이 닫혔을 때. 입력값을 적용된 값으로 되돌린다 */
  onDismiss?: () => void
  title?: string
  /** 트리거 버튼에 붙일 클래스 */
  className?: string
}

/**
 * 여러 조건을 모아 한 번에 조회하는 시트. 명세는 design/components/filter-sheet.md
 * 768px 미만은 아래에서, 그 이상은 오른쪽에서 열린다.
 * 규칙은 design/guides/interaction.md 11.1을 따른다.
 */
function FilterSheet({
  activeCount,
  description,
  children,
  onApply,
  onReset,
  onDismiss,
  title = "조회 조건",
  className,
}: FilterSheetProps) {
  const [open, setOpen] = React.useState(false)
  const wide = useWideLayout()

  function handleOpenChange(next: boolean) {
    if (!next) onDismiss?.()
    setOpen(next)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.stopPropagation()
    if (onApply() !== false) setOpen(false)
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} direction={wide ? "right" : "bottom"}>
      <DrawerTrigger asChild>
        <FilterButton activeCount={activeCount} aria-haspopup="dialog" className={className} />
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-120">
        <form noValidate onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <DrawerHeader className="shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 text-left">
                <DrawerTitle>{title}</DrawerTitle>
                {description ? (
                  <DrawerDescription>{description}</DrawerDescription>
                ) : (
                  <DrawerDescription className="sr-only">{title}을 고른 뒤 조회해요.</DrawerDescription>
                )}
              </div>
              {onReset && (
                <Button type="button" variant="ghost" size="sm" className="-mt-1 shrink-0" onClick={onReset}>
                  <RotateCcwIcon />
                  초기화
                </Button>
              )}
            </div>
          </DrawerHeader>
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-0.5">{children}</div>
          <DrawerFooter className="shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button type="submit" size="lg">
              조회
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

export { FilterSheet }
export type { FilterSheetProps }
