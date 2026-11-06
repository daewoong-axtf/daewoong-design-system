'use client'

import { Select as SelectPrimitive } from '@base-ui/react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface MultiSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
  className?: string
  'aria-invalid'?: boolean
}

/**
 * (DW 커스텀) Radix Select는 다중 선택이 없어 Base UI로 만든다. 명세는 design/components/select.md
 */
function MultiSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  name,
  id,
  disabled,
  required,
  className,
  'aria-invalid': ariaInvalid,
}: MultiSelectProps) {
  const labelOf = (selected: string) => options.find((option) => option.value === selected)?.label ?? selected

  return (
    <SelectPrimitive.Root<string, true>
      multiple
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      name={name}
      disabled={disabled}
      required={required}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-invalid={ariaInvalid}
        data-slot="multi-select-trigger"
        className={cn(
          'flex min-h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-left text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        <SelectPrimitive.Value>
          {(selected: string[]) =>
            selected.length ? (
              <span className="flex min-w-0 flex-wrap gap-1">
                {selected.map((item) => (
                  <span
                    key={item}
                    data-slot="multi-select-chip"
                    className="h-7 max-w-full truncate rounded-md bg-[var(--dw-bg-neutral-weak-alpha)] px-2 text-[13px]/7 font-medium"
                  >
                    {labelOf(item)}
                  </span>
                ))}
              </span>
            ) : (
              <span className="text-[var(--dw-fg-neutral-subtle)]">{placeholder}</span>
            )
          }
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon className="shrink-0 text-muted-foreground">
          <ChevronDownIcon className="size-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner alignItemWithTrigger={false} sideOffset={4} className="z-(--dw-z-dropdown) w-(--anchor-width)">
          <SelectPrimitive.Popup
            data-slot="multi-select-content"
            className="max-h-(--available-height) overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none"
          >
            <SelectPrimitive.List>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  data-slot="multi-select-item"
                  className="relative flex cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2 flex size-3.5 items-center justify-center">
                    <CheckIcon className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export { MultiSelect }
export type { MultiSelectOption }
