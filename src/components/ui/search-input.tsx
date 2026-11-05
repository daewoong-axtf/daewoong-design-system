"use client"

import * as React from "react"
import { CircleXIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

interface SearchInputProps extends Omit<React.ComponentProps<typeof Input>, "onChange" | "value" | "type"> {
  value: string
  /** 입력값이 바뀔 때 호출한다(지우기 포함) */
  onValueChange: (value: string) => void
  /**
   * 지우기를 누르면 추가로 호출한다. 목록 검색에서는 여기서 전체 조회로 되돌리고 페이지를 1로 돌린다.
   * 주지 않으면 입력값만 비운다.
   */
  onClear?: () => void
}

/**
 * 돋보기와 지우기 버튼이 달린 검색 입력이다. 타이핑으로 조회하지 않는다 — form으로 감싸 Enter·검색 버튼으로 실행한다.
 * 명세는 design/components/search-input.md.
 */
function SearchInput({ value, onValueChange, onClear, className, ...props }: SearchInputProps) {
  function handleClear(e: React.MouseEvent<HTMLButtonElement>) {
    onValueChange("")
    onClear?.()
    e.currentTarget.parentElement?.querySelector("input")?.focus()
  }

  return (
    <div className="relative w-full">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input
        type="search"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn("pl-9 [&::-webkit-search-cancel-button]:hidden", value && "pr-9", className)}
        {...props}
      />
      {value && (
        <button
          type="button"
          aria-label="입력 지우기"
          onClick={handleClear}
          className="absolute top-1/2 right-2 flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors after:absolute after:-inset-3 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <CircleXIcon className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export { SearchInput }
