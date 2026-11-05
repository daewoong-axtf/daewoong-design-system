"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

/**
 * 표시·숨김 토글이 달린 비밀번호 입력이다. 나머지 props(ref 포함)는 Input에 그대로 넘긴다.
 * 명세는 design/components/password-input.md.
 */
function PasswordInput({ className, disabled, ...props }: Omit<React.ComponentProps<typeof Input>, "type">) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        disabled={disabled}
        className={cn("pr-10 [&::-ms-reveal]:hidden", className)}
        {...props}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => setVisible((value) => !value)}
        aria-label="비밀번호 표시"
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center rounded-r-md text-muted-foreground outline-none transition-colors after:absolute after:-inset-1 hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {visible ? <EyeOffIcon className="size-4" aria-hidden="true" /> : <EyeIcon className="size-4" aria-hidden="true" />}
      </button>
    </div>
  )
}

export { PasswordInput }
