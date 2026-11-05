import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface FormSectionProps extends React.ComponentProps<"section"> {
  title: string
  description?: string
  /** 제목 오른쪽 보조 영역(건수·행동 등) */
  aside?: React.ReactNode
  /** 필수 섹션이면 제목 옆에 점을 표시한다 */
  required?: boolean
  /** 제목 요소 수준. 문서 구조에 맞춘다 */
  headingLevel?: 2 | 3 | 4
}

/**
 * 폼을 의미 단위로 묶는 섹션 카드다. 제목·설명은 카드 위에 두고 입력 필드를 children으로 놓는다.
 * 명세는 design/components/form-section.md.
 */
function FormSection({
  title,
  description,
  aside,
  required,
  headingLevel = 2,
  className,
  children,
  ...props
}: FormSectionProps) {
  const titleId = React.useId()
  const Heading = `h${headingLevel}` as const

  return (
    <section data-slot="form-section" aria-labelledby={titleId} className={cn("flex min-w-0 flex-col gap-3", className)} {...props}>
      <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
        <div className="flex min-w-0 flex-[1_1_200px] flex-col gap-0.5">
          <Heading id={titleId} className="break-keep font-bold text-lg">
            {title}
            {required && (
              <span className="mt-1 ml-1 inline-block size-1.5 rounded-full bg-destructive align-top">
                <span className="sr-only">필수</span>
              </span>
            )}
          </Heading>
          {description && <p className="break-keep text-muted-foreground text-sm">{description}</p>}
        </div>
        {aside && <div className="shrink-0 text-muted-foreground text-sm">{aside}</div>}
      </div>
      <Card className="gap-0 py-4 sm:py-5">
        <CardContent className="flex flex-col gap-5 px-4 sm:px-5">{children}</CardContent>
      </Card>
    </section>
  )
}

export { FormSection }
