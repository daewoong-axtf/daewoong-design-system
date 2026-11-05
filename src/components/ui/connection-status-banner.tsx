'use client'

import {
  CheckIcon,
  LoaderCircleIcon,
  RefreshCwIcon,
  TriangleAlertIcon,
  WifiOffIcon,
  XIcon,
} from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ConnectionBannerStatus = 'offline' | 'reconnecting' | 'unstable' | 'online'

const STATUS_STYLES: Record<
  ConnectionBannerStatus,
  { Icon: React.ComponentType<{ className?: string }>; icon: string; title: string }
> = {
  offline: {
    Icon: WifiOffIcon,
    icon: 'bg-(--dw-bg-critical-weak) text-(--dw-fg-critical)',
    title: '서버에 연결할 수 없어요. 잠시 후 다시 시도해주세요.',
  },
  reconnecting: {
    Icon: LoaderCircleIcon,
    icon: 'bg-(--dw-bg-neutral-weak) text-(--dw-fg-neutral-subtle)',
    title: '다시 연결하는 중이에요',
  },
  unstable: {
    Icon: TriangleAlertIcon,
    icon: 'bg-(--dw-bg-warning-weak) text-(--dw-fg-warning)',
    title: '연결이 불안정해요. 일부 내용이 늦게 보일 수 있어요.',
  },
  online: {
    Icon: CheckIcon,
    icon: 'bg-(--dw-bg-positive-weak) text-(--dw-fg-positive)',
    title: '다시 연결됐어요',
  },
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
const RECOVER_MS = 3000
const CHECK_MS = 5000

interface ConnectionStatusBannerProps {
  open: boolean
  status: ConnectionBannerStatus
  /** 환경별 문구를 넣는다. 비우면 상태별 기본 문구다 */
  title?: string
  /** 있으면 '다시 시도' 버튼을 보인다. online에서는 숨긴다 */
  onRetry?: () => void
  /** 있으면 닫기 버튼을 보인다 */
  onDismiss?: () => void
}

/**
 * 서버에 닿지 못하는 상황을 화면 맨 위에서 알리는 배너.
 * 라이브 영역은 먼저 DOM에 있어야 읽히므로 바깥 요소는 늘 렌더하고 안쪽 면만 여닫는다.
 * 명세: design/components/connection-status-banner.md
 */
function ConnectionStatusBanner({
  open,
  status,
  title,
  onRetry,
  onDismiss,
}: ConnectionStatusBannerProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const hadFocus = React.useRef(false)
  const [rendered, setRendered] = React.useState(open)
  if (open && !rendered) setRendered(true)

  const { Icon, icon, title: defaultTitle } = STATUS_STYLES[status]
  const showRetry = Boolean(onRetry) && status !== 'online'

  // 포커스가 있던 버튼이 사라져 body로 떨어지면 배너 다음 요소로 옮긴다
  React.useEffect(() => {
    const root = rootRef.current
    if (!root || !hadFocus.current || document.activeElement !== document.body) return
    hadFocus.current = false
    const next = [...document.querySelectorAll<HTMLElement>(FOCUSABLE)].find(
      (el) => root.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING,
    )
    next?.focus({ preventScroll: true })
  }, [showRetry, rendered])

  return (
    <div
      ref={rootRef}
      data-slot='connection-status-banner'
      data-status={status}
      role='status'
      aria-live='polite'
      className='sticky top-0 z-(--dw-z-notice) w-full'
      onFocus={() => {
        hadFocus.current = true
      }}
      onBlur={(e) => {
        if (e.relatedTarget) hadFocus.current = false
      }}
    >
      {(open || rendered) && (
        <div
          onAnimationEnd={() => {
            if (!open) setRendered(false)
          }}
          className={cn(
            'flex items-center gap-3 border-b border-(--dw-stroke-neutral-muted) bg-(--dw-bg-layer-default) px-4 py-3 shadow-(--dw-shadow-s1) sm:gap-4 sm:px-6',
            open
              ? 'animate-in fade-in slide-in-from-top-2 duration-200 ease-(--dw-easing-enter) motion-reduce:slide-in-from-top-0'
              : 'animate-out fade-out slide-out-to-top-2 fill-mode-forwards duration-200 ease-(--dw-easing-exit) motion-reduce:slide-out-to-top-0',
          )}
        >
          <span
            className={cn('flex size-9 shrink-0 items-center justify-center rounded-full', icon)}
            aria-hidden='true'
          >
            <Icon
              className={cn(
                'size-5',
                status === 'reconnecting' && 'animate-spin motion-reduce:[animation-duration:3s]',
              )}
            />
          </span>
          <p className='min-w-0 flex-1 text-sm font-medium text-(--dw-fg-neutral)'>
            {title ?? defaultTitle}
          </p>
          {showRetry && (
            <Button
              type='button'
              variant='secondary'
              size='sm'
              onClick={onRetry}
              aria-busy={status === 'reconnecting' || undefined}
              className='shrink-0'
            >
              <RefreshCwIcon aria-hidden='true' />
              다시 시도
            </Button>
          )}
          {onDismiss && (
            <Button
              type='button'
              variant='ghost'
              size='icon-sm'
              onClick={onDismiss}
              aria-label='연결 안내 닫기'
              className='-mx-1 shrink-0 text-(--dw-fg-neutral-subtle)'
            >
              <XIcon aria-hidden='true' />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

interface UseConnectionStatusOptions {
  /** 가벼운 상태 확인 주소. 있으면 응답을 받아야 복구로 본다 */
  checkUrl?: string
}

/**
 * 브라우저의 online·offline 이벤트로 배너 상태를 관리한다.
 * online 이벤트는 네트워크가 돌아왔다는 뜻일 뿐이라 checkUrl이 있으면 서버까지 닿는지 확인한다.
 */
function useConnectionStatus({ checkUrl }: UseConnectionStatusOptions = {}) {
  const [status, setStatus] = React.useState<ConnectionBannerStatus>('online')
  const [open, setOpen] = React.useState(false)
  const statusRef = React.useRef(status)
  const run = React.useRef(0)

  const show = React.useCallback((next: ConnectionBannerStatus) => {
    statusRef.current = next
    setStatus(next)
    setOpen(true)
  }, [])

  const report = React.useCallback(
    (next: ConnectionBannerStatus) => {
      run.current += 1
      show(next)
    },
    [show],
  )

  const retry = React.useCallback(async () => {
    if (statusRef.current === 'online' || statusRef.current === 'reconnecting') return
    run.current += 1
    const id = run.current
    show('reconnecting')
    let reachable = navigator.onLine
    if (reachable && checkUrl) {
      reachable = await fetch(checkUrl, {
        method: 'HEAD',
        cache: 'no-store',
        signal: AbortSignal.timeout(CHECK_MS),
      }).then(
        () => true,
        () => false,
      )
    }
    if (id === run.current) show(reachable ? 'online' : 'offline')
  }, [checkUrl, show])

  React.useEffect(() => {
    const handleOffline = () => report('offline')
    if (!navigator.onLine) handleOffline()
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', retry)
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', retry)
    }
  }, [report, retry])

  React.useEffect(() => {
    if (status !== 'online' || !open) return
    const timer = setTimeout(() => setOpen(false), RECOVER_MS)
    return () => clearTimeout(timer)
  }, [status, open])

  const dismiss = React.useCallback(() => setOpen(false), [])

  return { open, status, retry, dismiss, report }
}

export { ConnectionStatusBanner, useConnectionStatus }
export type { ConnectionBannerStatus, ConnectionStatusBannerProps }
