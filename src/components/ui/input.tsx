import * as React from "react"
import { cn } from "@/lib/utils"

// (DW 커스텀) 높이를 Button과 맞춘다. 네이티브 size 속성과 겹치지 않게 inputSize로 받는다
const INPUT_SIZE = { xs: "h-8", sm: "h-9", default: "h-10", lg: "h-13" }

function Input({
  className,
  type,
  inputSize = "default",
  ...props
}: React.ComponentProps<"input"> & { inputSize?: keyof typeof INPUT_SIZE }) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={inputSize}
      className={cn(
        INPUT_SIZE[inputSize],
        "w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
