'use client'

import { useState } from 'react'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

interface SearchableSelectProps {
  /** 고를 수 있는 값 — 보이는 문구와 값이 같다 */
  options: readonly string[]
  /** 고른 값. 빈 문자열이면 '전체'(조건 없음) */
  value: string
  onValueChange: (value: string) => void
  /** 필드 이름 — 지우기 버튼 이름("거래처 지우기")에 쓴다 */
  label: string
  id?: string
  /** 값이 없을 때 보이는 문구 */
  placeholder?: string
  className?: string
}

/**
 * (대웅 커스텀) 선택지를 글자로 좁혀 고르는 셀렉트 — Combobox 합성.
 *
 * 선택지가 많은 드롭다운에서 쓴다. 입력한 글자가 들어간 선택지만 남기고(부분일치, 한글 조합 중에도)
 * 맞는 부분을 강조한다. 목록에서 골라야 값이 바뀐다. 비우면 '전체'다. 선택지에 없는 값(URL로
 * 들어온 값)도 그대로 보인다. 명세는 `design/components/searchable-select.md`.
 */
export function SearchableSelect({
  options,
  value,
  onValueChange,
  label,
  id,
  placeholder = '전체',
  className,
}: SearchableSelectProps) {
  const items =
    value && !options.includes(value) ? [...options, value] : options

  // 한글 IME: Base UI 기본 필터는 조합이 끝난 글자로만 거른다. 조합 중에도 매번 오는 네이티브
  // input 이벤트로 검색어를 직접 들고 거른다. 열 때·고른 뒤에는 칸에 검색어가 아니라 고른 값이
  // 있으므로 거르지 않는다(null)
  const [query, setQuery] = useState<string | null>(null)
  const keyword = query?.trim() ?? ''
  const shown = keyword
    ? items.filter((item) => item.toLowerCase().includes(keyword.toLowerCase()))
    : items

  return (
    <Combobox
      items={shown}
      filter={null}
      value={value || null}
      onValueChange={(next: string | null) => {
        setQuery(null)
        onValueChange(next ?? '')
      }}
      onOpenChange={(open) => {
        if (!open) setQuery(null)
      }}
    >
      <ComboboxInput
        id={id}
        placeholder={placeholder}
        autoComplete='off'
        showClear={!!value}
        clearLabel={`${label} 지우기`}
        className={className}
        onInput={(event) => setQuery(event.currentTarget.value)}
      />
      <ComboboxContent>
        <ComboboxEmpty>검색 결과가 없어요</ComboboxEmpty>
        <ComboboxList aria-label={label}>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              <Highlighted text={item} keyword={keyword} />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

/** 검색어와 맞는 첫 부분을 강조한다 */
function Highlighted({ text, keyword }: { text: string; keyword: string }) {
  const at = keyword ? text.toLowerCase().indexOf(keyword.toLowerCase()) : -1
  if (at < 0) return text
  return (
    <span>
      {text.slice(0, at)}
      <mark className='rounded-xs bg-(--dw-bg-brand-weak) text-inherit'>
        {text.slice(at, at + keyword.length)}
      </mark>
      {text.slice(at + keyword.length)}
    </span>
  )
}
