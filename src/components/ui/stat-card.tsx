import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import type * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type StatCardTone = "positive" | "critical" | "neutral"

interface StatCardProps extends React.ComponentProps<typeof Card> {
  /** 지표 이름 */
  label: string
  /** 지표 값 (이미 형식을 맞춘 문자열) */
  value: string
  /** 보조 설명 (비교 기준·기간 등) */
  hint?: string
  /** 비교 대상 대비 증감률(%) */
  delta?: number
  /** 증감의 좋고 나쁨. 기본은 부호를 따른다. 줄수록 좋은 지표는 직접 정한다 */
  deltaTone?: StatCardTone
  /** Label 앞 아이콘 */
  icon?: React.ReactNode
}

const TONE_CLASS: Record<StatCardTone, string> = {
  positive: "text-(--dw-fg-positive)",
  critical: "text-(--dw-fg-critical)",
  neutral: "text-(--dw-fg-neutral-subtle)",
}

function directionOf(delta: number) {
  if (delta > 0) return { Icon: TrendingUpIcon, text: "증가", tone: "positive" as const, sign: "+" }
  if (delta < 0) return { Icon: TrendingDownIcon, text: "감소", tone: "critical" as const, sign: "" }
  return { Icon: MinusIcon, text: "변동 없음", tone: "neutral" as const, sign: "" }
}

function StatCardDelta({ delta, tone }: { delta: number; tone?: StatCardTone }) {
  const { Icon, text, tone: signTone, sign } = directionOf(delta)
  return (
    <span className={cn("flex items-center gap-0.5 font-medium tabular-nums", TONE_CLASS[tone ?? signTone])}>
      <Icon aria-hidden className="size-4 shrink-0" />
      <span className="sr-only">{text}</span>
      {sign}
      {delta}%
    </span>
  )
}

/** 대시보드 지표 한 칸. 명세는 design/components/stat-card.md */
function StatCard({ label, value, hint, delta, deltaTone, icon, className, ...props }: StatCardProps) {
  return (
    <Card data-slot="stat-card" className={cn("gap-0", className)} {...props}>
      <CardContent className="flex flex-col gap-1">
        <p className="flex items-center gap-1.5 text-sm text-(--dw-fg-neutral-subtle) [&_svg]:size-4 [&_svg]:shrink-0">
          {icon}
          {label}
        </p>
        <p className="text-2xl font-bold wrap-anywhere tabular-nums">{value}</p>
        {(delta !== undefined || hint) && (
          <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
            {delta !== undefined && <StatCardDelta delta={delta} tone={deltaTone} />}
            {hint && <span className="text-(--dw-fg-neutral-subtle)">{hint}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export { StatCard }
export type { StatCardProps, StatCardTone }
