import type * as React from 'react'

import { cn } from '@/lib/utils'

// (DW 커스텀) shadcn에 없는 레이아웃. 값은 design/tokens.json의 grid를 따른다
// Tailwind가 찾을 수 있게 클래스 이름을 문자열 그대로 적는다
const baseSpan = { 1: 'col-span-1', 2: 'col-span-2' } as const
const mdSpan = { 1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4' } as const
const lgSpan = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
  7: 'lg:col-span-7',
  8: 'lg:col-span-8',
  9: 'lg:col-span-9',
  10: 'lg:col-span-10',
  11: 'lg:col-span-11',
  12: 'lg:col-span-12',
} as const

function Container({ className, width = 'content', ...props }: React.ComponentProps<'div'> & { width?: 'content' | 'wide' }) {
  return (
    <div
      data-slot="container"
      className={cn(
        'mx-auto box-content px-4 md:px-6 lg:px-8',
        width === 'wide' ? 'max-w-[var(--dw-grid-max-width-wide)]' : 'max-w-[var(--dw-grid-max-width-content)]',
        className,
      )}
      {...props}
    />
  )
}

function Grid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="grid"
      className={cn(
        'grid gap-[var(--dw-grid-gap)] grid-cols-[repeat(var(--dw-grid-columns-mobile),minmax(0,1fr))] md:grid-cols-[repeat(var(--dw-grid-columns-tablet),minmax(0,1fr))] lg:grid-cols-[repeat(var(--dw-grid-columns-desktop),minmax(0,1fr))]',
        className,
      )}
      {...props}
    />
  )
}

interface GridItemProps extends React.ComponentProps<'div'> {
  base?: keyof typeof baseSpan
  md?: keyof typeof mdSpan
  lg?: keyof typeof lgSpan
}

function GridItem({ base, md, lg, className, ...props }: GridItemProps) {
  return (
    <div
      data-slot="grid-item"
      className={cn(
        'min-w-0',
        base ? baseSpan[base] : 'col-span-full',
        md ? mdSpan[md] : 'md:col-span-full',
        lg ? lgSpan[lg] : 'lg:col-span-full',
        className,
      )}
      {...props}
    />
  )
}

export { Container, Grid, GridItem }
