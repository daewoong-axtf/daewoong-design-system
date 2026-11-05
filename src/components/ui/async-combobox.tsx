'use client'

import { LoaderCircleIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'

/** 입력이 멎고 요청을 보내기까지(ms). 한글은 자모마다 입력이 바뀌어 더 짧으면 치는 중에도 요청이 나간다 */
const DEFAULT_DEBOUNCE_MS = 400
/** 응답이 이보다 빠르면 '검색 중'을 건너뛴다 — 짧게 번쩍이는 스피너가 곧 깜빡임이다 */
const LOADING_DELAY_MS = 200
const DEFAULT_MIN_LENGTH = 2

export interface AsyncComboboxOption {
  value: string
  label: string
  description?: string
}

export interface AsyncComboboxMessages {
  /** 입력 전 안내. 기본 "N자 이상 입력해주세요" */
  idle?: string
  loading?: string
  empty?: string
  error?: string
  retry?: string
}

interface CommonProps {
  /** 검색 함수. signal로 취소되며, 취소된 요청의 응답은 쓰지 않는다 */
  onSearch: (query: string, signal: AbortSignal) => Promise<AsyncComboboxOption[]>
  /** 요청을 보내는 최소 글자 수(앞뒤 공백 제외) */
  minLength?: number
  debounceMs?: number
  placeholder?: string
  /** 결과에서 뺄 값(이미 다른 곳에서 고른 항목 등) */
  exclude?: readonly string[]
  /** 고를 수 없는 사유. null이면 고를 수 있다 */
  disabledReason?: (option: AsyncComboboxOption) => string | null
  messages?: AsyncComboboxMessages
  /** 결과 목록의 접근 가능한 이름 */
  listLabel?: string
  /** 지우기 버튼의 접근 가능한 이름 */
  clearLabel?: string
  disabled?: boolean
  id?: string
  className?: string
  'aria-invalid'?: boolean
  'aria-labelledby'?: string
}

interface SingleProps {
  mode?: 'single'
  value: AsyncComboboxOption | null
  onValueChange: (value: AsyncComboboxOption | null) => void
}

interface MultipleProps {
  mode: 'multiple'
  value: AsyncComboboxOption[]
  onValueChange: (value: AsyncComboboxOption[]) => void
}

export type AsyncComboboxProps = CommonProps & (SingleProps | MultipleProps)

type SearchStatus = 'idle' | 'results' | 'loading' | 'empty' | 'error'

const itemLabel = (item: AsyncComboboxOption) => item.label
const itemValue = (item: AsyncComboboxOption) => item.value
const isSameItem = (a: AsyncComboboxOption, b: AsyncComboboxOption) => a.value === b.value

/** debounce·취소·'검색 중' 지연을 맡는다. 값 선택과 무관하게 친 글자만 받는다 */
function useAsyncSearch(onSearch: CommonProps['onSearch'], minLength: number, debounceMs: number) {
  const [query, setQuery] = React.useState('')
  const [items, setItems] = React.useState<AsyncComboboxOption[]>([])
  const [status, setStatus] = React.useState<SearchStatus>('idle')
  const [busy, setBusy] = React.useState(false)
  const [attempt, setAttempt] = React.useState(0)

  // 호출부가 매 렌더 새 함수를 넘겨도 타이머가 다시 시작되지 않게 ref로 둔다
  const searchRef = React.useRef(onSearch)
  searchRef.current = onSearch
  const retriedRef = React.useRef(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: attempt는 다시 시도를 일으키는 값이다
  React.useEffect(() => {
    const keyword = query.trim()
    if (keyword.length < minLength) {
      setItems([])
      setStatus('idle')
      setBusy(false)
      return
    }
    const controller = new AbortController()
    const { signal } = controller
    let loadingTimer: ReturnType<typeof setTimeout> | undefined
    const delay = retriedRef.current ? 0 : debounceMs
    retriedRef.current = false

    // 대기하는 동안 직전 결과·안내를 그대로 둔다 — 입력마다 바꾸면 그것이 깜빡임이다
    const timer = setTimeout(async () => {
      setBusy(true)
      loadingTimer = setTimeout(() => setStatus('loading'), LOADING_DELAY_MS)
      try {
        const found = await searchRef.current(keyword, signal)
        if (signal.aborted) return
        setItems(found)
        setStatus(found.length ? 'results' : 'empty')
      } catch {
        if (signal.aborted) return
        setItems([])
        setStatus('error')
      } finally {
        clearTimeout(loadingTimer)
        if (!signal.aborted) setBusy(false)
      }
    }, delay)

    return () => {
      clearTimeout(timer)
      clearTimeout(loadingTimer)
      controller.abort()
    }
  }, [query, minLength, debounceMs, attempt])

  const retry = React.useCallback(() => {
    retriedRef.current = true
    setAttempt((n) => n + 1)
  }, [])

  return { query, setQuery, items, status, busy, retry }
}

function ItemRow({ option, reason }: { option: AsyncComboboxOption; reason: string | null }) {
  return (
    <ComboboxItem value={option} disabled={!!reason} className='justify-between'>
      {/* 자식 글자가 포인터 대상이 되면 누르고 떼는 동작이 글자 선택으로 해석돼 click이 오지 않는다 */}
      <span className='pointer-events-none flex min-w-0 flex-col'>
        <span>{option.label}</span>
        {option.description && <span className='truncate text-muted-foreground text-xs'>{option.description}</span>}
      </span>
      {reason && <span className='pointer-events-none mr-6 shrink-0 rounded bg-muted px-2 py-0.5 text-muted-foreground text-xs'>{reason}</span>}
    </ComboboxItem>
  )
}

/** 팝업 안 안내 줄 — 입력 전·검색 중·결과 없음·오류. 결과가 있으면 그리지 않는다 */
function StatusPanel({ status, texts, retry }: { status: SearchStatus; texts: Required<AsyncComboboxMessages>; retry: () => void }) {
  if (status === 'results') return null
  return (
    <div data-slot='combobox-status' className='flex flex-col items-center gap-2 px-3 py-2 text-center text-muted-foreground text-sm'>
      <span className='flex items-center gap-2'>
        {status === 'loading' && <LoaderCircleIcon aria-hidden className='size-4 animate-spin motion-reduce:animate-[spin_3s_linear_infinite]' />}
        {texts[status]}
      </span>
      {status === 'error' && (
        <Button
          type='button'
          variant='secondary'
          size='sm'
          // 입력이 포커스를 잃으면 팝업이 닫힌다
          onMouseDown={(event) => event.preventDefault()}
          onClick={retry}
        >
          {texts.retry}
        </Button>
      )}
    </div>
  )
}

/** 팝업이 닫혀 있어도 읽히도록 바깥에 둔다 */
function LiveStatus({ text }: { text: string }) {
  return (
    <span role='status' aria-live='polite' className='sr-only'>
      {text}
    </span>
  )
}

function useTexts(minLength: number, messages?: AsyncComboboxMessages): Required<AsyncComboboxMessages> {
  return {
    idle: messages?.idle ?? `${minLength}자 이상 입력해주세요`,
    loading: messages?.loading ?? '검색 중…',
    empty: messages?.empty ?? '검색 결과가 없어요',
    error: messages?.error ?? '검색하지 못했어요. 다시 시도해주세요.',
    retry: messages?.retry ?? '다시 시도',
  }
}

function SingleAsyncCombobox(props: CommonProps & SingleProps) {
  const { onSearch, minLength = DEFAULT_MIN_LENGTH, debounceMs = DEFAULT_DEBOUNCE_MS, exclude, disabledReason, value, onValueChange } = props
  const { setQuery, items, status, busy, retry } = useAsyncSearch(onSearch, minLength, debounceMs)
  const texts = useTexts(minLength, props.messages)
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState(value?.label ?? '')

  // 값이 바깥에서 바뀌면 입력 문구도 맞춘다. 고른 문구는 검색어가 아니다
  const valueKey = value?.value ?? null
  const label = value?.label ?? ''
  // biome-ignore lint/correctness/useExhaustiveDependencies: 값이 바뀔 때만 문구를 맞춘다
  React.useEffect(() => {
    setText(label)
    setQuery('')
  }, [valueKey])

  const shown = React.useMemo(() => (exclude ? items.filter((item) => !exclude.includes(item.value)) : items), [items, exclude])

  return (
    <>
      <Combobox
        items={shown}
        value={value}
        onValueChange={(next: AsyncComboboxOption | null) => onValueChange(next ?? null)}
        itemToStringLabel={itemLabel}
        itemToStringValue={itemValue}
        isItemEqualToValue={isSameItem}
        filter={null}
        autoHighlight
        inputValue={text}
        onInputValueChange={(next: string) => setText(next)}
        open={open}
        onOpenChange={(next: boolean) => {
          setOpen(next)
          if (next) return
          // 닫으면 입력은 확정된 값으로 돌아간다. 다 지웠다면 값도 비운다
          if (value && !text.trim()) onValueChange(null)
          else setText(label)
          setQuery('')
        }}
      >
        <ComboboxInput
          id={props.id}
          placeholder={props.placeholder ?? `${minLength}자 이상 입력`}
          autoComplete='off'
          disabled={props.disabled}
          showClear={!!value}
          clearLabel={props.clearLabel}
          aria-invalid={props['aria-invalid']}
          aria-labelledby={props['aria-labelledby']}
          className={props.className}
          // 조합 중에도 매번 오는 네이티브 input으로 검색어를 든다 — Base UI는 조합이 끝나야 알린다
          onInput={(event: React.FormEvent<HTMLInputElement>) => {
            setQuery(event.currentTarget.value)
            setText(event.currentTarget.value)
            setOpen(true)
          }}
        />
        <ComboboxContent>
          <StatusPanel status={status} texts={texts} retry={retry} />
          <ComboboxList aria-busy={busy} aria-label={props.listLabel ?? '검색 결과'}>
            {(option: AsyncComboboxOption) => <ItemRow key={option.value} option={option} reason={disabledReason?.(option) ?? null} />}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <LiveStatus text={status === 'results' ? `검색 결과 ${shown.length}개` : status === 'idle' ? '' : texts[status]} />
    </>
  )
}

function MultipleAsyncCombobox(props: CommonProps & MultipleProps) {
  const { onSearch, minLength = DEFAULT_MIN_LENGTH, debounceMs = DEFAULT_DEBOUNCE_MS, exclude, disabledReason, value, onValueChange } = props
  const { setQuery, items, status, busy, retry } = useAsyncSearch(onSearch, minLength, debounceMs)
  const texts = useTexts(minLength, props.messages)
  const anchor = useComboboxAnchor()
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState('')

  const shown = React.useMemo(() => (exclude ? items.filter((item) => !exclude.includes(item.value)) : items), [items, exclude])

  return (
    <>
      <Combobox
        multiple
        autoHighlight
        items={shown}
        value={value}
        onValueChange={(next: AsyncComboboxOption[]) => {
          onValueChange(next)
          setText('')
          setQuery('')
        }}
        itemToStringLabel={itemLabel}
        itemToStringValue={itemValue}
        isItemEqualToValue={isSameItem}
        filter={null}
        inputValue={text}
        onInputValueChange={(next: string) => setText(next)}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxChips ref={anchor} className={props.className}>
          <ComboboxValue>
            {value.map((option) => (
              <ComboboxChip key={option.value} aria-label={option.label} removeLabel={`${option.label} 빼기`}>
                {option.label}
              </ComboboxChip>
            ))}
          </ComboboxValue>
          <ComboboxChipsInput
            id={props.id}
            placeholder={value.length ? undefined : (props.placeholder ?? `${minLength}자 이상 입력`)}
            autoComplete='off'
            disabled={props.disabled}
            aria-invalid={props['aria-invalid']}
            aria-labelledby={props['aria-labelledby']}
            onInput={(event: React.FormEvent<HTMLInputElement>) => {
              setQuery(event.currentTarget.value)
              setText(event.currentTarget.value)
              setOpen(true)
            }}
          />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <StatusPanel status={status} texts={texts} retry={retry} />
          <ComboboxList aria-busy={busy} aria-label={props.listLabel ?? '검색 결과'}>
            {(option: AsyncComboboxOption) => <ItemRow key={option.value} option={option} reason={disabledReason?.(option) ?? null} />}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <LiveStatus text={status === 'results' ? `검색 결과 ${shown.length}개` : status === 'idle' ? '' : texts[status]} />
    </>
  )
}

/**
 * 입력할 때마다 서버에서 찾는 Combobox. (대웅 커스텀 — Base UI Combobox 조합)
 *
 * 필터·목록 검색과 달리 선택 입력의 자동완성이라 "검색은 명시 실행" 규칙의 예외다.
 * 동작은 `design/components/combobox.md`의 async 절을 따른다.
 */
export function AsyncCombobox(props: AsyncComboboxProps) {
  if (props.mode === 'multiple') return <MultipleAsyncCombobox {...props} />
  return <SingleAsyncCombobox {...props} />
}
