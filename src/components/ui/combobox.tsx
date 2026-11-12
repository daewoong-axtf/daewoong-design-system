'use client'

import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Combobox = ComboboxPrimitive.Root

const ADDON_BUTTON_CLASS =
  "flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 pointer-coarse:relative pointer-coarse:after:absolute pointer-coarse:after:top-1/2 pointer-coarse:after:left-1/2 pointer-coarse:after:size-11 pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2 [&_svg]:size-4"

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot='combobox-value' {...props} />
}

function ComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger data-slot='combobox-trigger' className={cn(ADDON_BUTTON_CLASS, className)} {...props}>
      {children}
      <ChevronDownIcon data-slot='combobox-trigger-icon' className='pointer-events-none size-4' />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear data-slot='combobox-clear' className={cn(ADDON_BUTTON_CLASS, className)} {...props}>
      <XIcon className='pointer-events-none' />
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  clearLabel,
  triggerLabel = '목록 열기',
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
  /** 지우기 버튼의 접근 가능한 이름 — 아이콘만 있어 이름이 없으면 읽히지 않는다 */
  clearLabel?: string
  /** 펼침 버튼의 접근 가능한 이름 */
  triggerLabel?: string
}) {
  return (
    <div
      data-slot='combobox-control'
      className={cn(
        'flex h-10 w-full min-w-0 items-center gap-1 rounded-md border border-input bg-transparent pr-1.5 transition-[color,box-shadow] has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 dark:bg-input/30 dark:has-aria-invalid:ring-destructive/40',
        className,
      )}
    >
      <ComboboxPrimitive.Input
        data-slot='combobox-input'
        disabled={disabled}
        className='h-full min-w-0 flex-1 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm'
        {...props}
      />
      {showClear && <ComboboxClear disabled={disabled} aria-label={clearLabel} />}
      {showTrigger && <ComboboxTrigger disabled={disabled} aria-label={triggerLabel} />}
      {children}
    </div>
  )
}

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<ComboboxPrimitive.Positioner.Props, 'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'>) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        // 모달 Dialog(Radix)는 열릴 때 body에 pointer-events:none을 건다. 팝업은 Portal로 body에
        // 붙으므로 이 잠금에 걸리면 마우스 선택이 막혀 키보드로만 고를 수 있게 된다. 그래서 복원한다.
        // z는 모달보다 위여야 한다(z-dropdown > z-modal). 같은 값이면 포털이 붙는 순서로
        // 승자가 갈려 팝업이 다이얼로그 아래로 깔리는 일이 생긴다.
        className='pointer-events-auto isolate z-(--dw-z-dropdown)'
      >
        <ComboboxPrimitive.Popup
          data-slot='combobox-content'
          data-chips={!!anchor}
          className={cn(
            'group/combobox-content data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 relative max-h-96 w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-open:animate-in',
            className,
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

function ComboboxList({ className, ref, ...props }: ComboboxPrimitive.List.Props) {
  // 모달 Dialog(Radix)는 react-remove-scroll로 document에 non-passive 리스너를 걸고 잠금 영역 밖의
  // 스크롤을 preventDefault 한다. 팝업은 Portal로 body에 붙으므로 여기 걸려 스크롤이 죽는다.
  // wheel과 touchmove의 전파를 끊어 document까지 올라가지 않게 한다. 네이티브 스크롤은 그대로다.
  const attachScrollGuard = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
      if (!node) return
      const stopScroll = (event: Event) => event.stopPropagation()
      node.addEventListener('wheel', stopScroll, { passive: true })
      node.addEventListener('touchmove', stopScroll, { passive: true })
      return () => {
        node.removeEventListener('wheel', stopScroll)
        node.removeEventListener('touchmove', stopScroll)
      }
    },
    [ref],
  )

  // 최대 높이에 바닥값 12rem을 둔다. 남은 공간에만 맞추면 아래가 좁을 때 목록이 그만큼 줄어
  // 넘치지 않고, 넘치지 않으니 위로 뒤집히지도 않아 몇 px로 열린다. 바닥값보다 좁으면 위로 편다
  return (
    <ComboboxPrimitive.List
      data-slot='combobox-list'
      className={cn(
        'max-h-[max(--spacing(48),min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9))))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0',
        className,
      )}
      {...props}
      ref={attachScrollGuard}
    />
  )
}

function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot='combobox-item'
      className={cn(
        "relative flex min-h-11 w-full cursor-pointer select-none items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden md:min-h-9 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        data-slot='combobox-item-indicator'
        render={<span className='pointer-events-none absolute right-2 flex size-4 items-center justify-center' />}
      >
        <CheckIcon className='pointer-events-none pointer-coarse:size-5 size-4' />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot='combobox-group' className={cn(className)} {...props} />
}

function ComboboxLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot='combobox-label'
      className={cn('pointer-coarse:px-3 px-2 pointer-coarse:py-2 py-1.5 pointer-coarse:text-sm text-muted-foreground text-xs', className)}
      {...props}
    />
  )
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return <ComboboxPrimitive.Collection data-slot='combobox-collection' {...props} />
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot='combobox-empty'
      className={cn('hidden w-full justify-center py-2 text-center text-muted-foreground text-sm group-data-empty/combobox-content:flex', className)}
      {...props}
    />
  )
}

function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props) {
  return <ComboboxPrimitive.Separator data-slot='combobox-separator' className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
}

function ComboboxChips({ className, ...props }: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> & ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot='combobox-chips'
      className={cn(
        'flex min-h-10 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-data-[slot=combobox-chip]:px-1.5 has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 dark:bg-input/30 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40',
        className,
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  removeLabel,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
  /** 빼기 버튼의 접근 가능한 이름 */
  removeLabel?: string
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot='combobox-chip'
      className={cn(
        'flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 whitespace-nowrap rounded-sm bg-muted px-1.5 font-medium text-foreground text-xs has-disabled:cursor-not-allowed has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant='ghost' size='icon-xs' />}
          className='-ml-1 opacity-50 hover:opacity-100'
          data-slot='combobox-chip-remove'
          aria-label={removeLabel}
        >
          <XIcon className='pointer-events-none' />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  )
}

function ComboboxChipsInput({ className, children, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot='combobox-chip-input'
      className={cn('min-w-16 flex-1 bg-transparent outline-none placeholder:text-muted-foreground', className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
