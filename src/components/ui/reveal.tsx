'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

interface RevealProps extends React.ComponentProps<'div'> {
  /** 순차 등장 지연(ms). 같은 줄의 합을 240ms 안에 둔다 */
  delay?: number
  /** 첫 노출 뒤 고정한다. false면 벗어날 때 다시 숨겨 되풀이한다 */
  once?: boolean
}

/**
 * 화면 아래에 있던 내용이 스크롤로 들어올 때 떠오르며 나타나게 한다.
 * 첫 렌더는 보이는 상태라 스크립트가 없어도 내용이 보이고, 마운트 뒤 뷰포트 아래 요소만 숨긴다.
 * 명세: design/components/reveal.md
 */
function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  style,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (
      !el ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const below = el.getBoundingClientRect().top >= window.innerHeight
    if (!below && once) return
    if (below) setHidden(true)

    // threshold·음수 rootMargin을 주면 아주 긴 요소와 페이지 끝의 낮은 요소가 영영 숨는다
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setHidden(false)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setHidden(true)
        }
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      data-slot='reveal'
      data-reveal={hidden ? 'hidden' : undefined}
      style={delay ? { transitionDelay: `${delay}ms`, ...style } : style}
      className={cn(
        // 숨길 때는 전환 없이 바로, 나타날 때만 움직인다
        hidden
          ? 'translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
          : 'transition-[opacity,translate] duration-300 ease-(--dw-easing-enter) motion-reduce:transition-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Reveal }
