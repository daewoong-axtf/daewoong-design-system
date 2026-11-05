import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { type AsyncComboboxOption, AsyncCombobox } from '@/components/ui/async-combobox'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

const CITIES = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종', '제주']

const MEMBERS: AsyncComboboxOption[] = [
  { value: 'm1', label: '김하늘', description: '영업팀' },
  { value: 'm2', label: '김하은', description: '재무팀' },
  { value: 'm3', label: '김하윤', description: '물류팀' },
  { value: 'm4', label: '박서준', description: '개발팀' },
]

const meta = {
  title: 'Component/Inputs/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '글자를 쳐서 목록을 좁혀 고른다. 입력마다 서버에서 찾는 비동기 변형은 `AsyncCombobox`다. 명세는 `design/components/combobox.md`.',
      },
    },
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

function BasicDemo() {
  return (
    <div className='grid w-72 gap-2'>
      <Label htmlFor='city'>도시</Label>
      <Combobox items={CITIES}>
        <ComboboxInput id='city' placeholder='도시 검색' autoComplete='off' />
        <ComboboxContent>
          <ComboboxEmpty>검색 결과가 없어요</ComboboxEmpty>
          <ComboboxList aria-label='도시'>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

/** 글자로 좁혀 고른다 */
export const Default: Story = {
  render: () => <BasicDemo />,
  play: async ({ canvasElement }) => {
    const body = within(document.body)
    const input = within(canvasElement).getByLabelText('도시')
    await userEvent.type(input, '대')
    await userEvent.click(await body.findByRole('option', { name: '대전' }))
    await expect(input).toHaveValue('대전')
  },
}

export const NoResult: Story = {
  render: () => <BasicDemo />,
  play: async ({ canvasElement }) => {
    await userEvent.type(within(canvasElement).getByLabelText('도시'), '뉴욕')
    await expect(await within(document.body).findByText('검색 결과가 없어요')).toBeInTheDocument()
  },
}

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>배송지 바꾸기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>배송지 바꾸기</DialogTitle>
          <DialogDescription>받을 도시를 고르세요.</DialogDescription>
        </DialogHeader>
        <BasicDemo />
      </DialogContent>
    </Dialog>
  )
}

/** 모달 안 — 목록은 Portal이고 모달보다 위라 잘리지 않고 마우스로 고를 수 있다 */
export const InDialog: Story = {
  render: () => <DialogDemo />,
  play: async ({ canvasElement }) => {
    const body = within(document.body)
    await userEvent.click(within(canvasElement).getByRole('button', { name: '배송지 바꾸기' }))
    const input = await body.findByLabelText('도시')
    await userEvent.type(input, '제')
    await userEvent.click(await body.findByRole('option', { name: '제주' }))
    await expect(input).toHaveValue('제주')
  },
}

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('취소', 'AbortError'))
    })
  })

/** 네트워크 없이 서버를 흉내 낸다 */
async function searchMembers(query: string, signal: AbortSignal) {
  await wait(50, signal)
  return MEMBERS.filter((member) => member.label.includes(query))
}

function AsyncDemo({
  onSearch = searchMembers,
  debounceMs = 50,
}: {
  onSearch?: (query: string, signal: AbortSignal) => Promise<AsyncComboboxOption[]>
  debounceMs?: number
}) {
  const [value, setValue] = useState<AsyncComboboxOption | null>(null)
  return (
    <div className='grid w-72 gap-2'>
      <Label htmlFor='owner'>담당 회원</Label>
      <AsyncCombobox
        id='owner'
        value={value}
        onValueChange={setValue}
        onSearch={onSearch}
        debounceMs={debounceMs}
        clearLabel='담당 회원 지우기'
        placeholder='이름 입력 (2자 이상)'
      />
      <output data-testid='picked'>{value?.value ?? ''}</output>
    </div>
  )
}

/** 입력마다 서버에서 찾는다. 두 글자 전에는 안내가 보이고, 응답이 빠르면 '검색 중'을 건너뛴다 */
export const AsyncSearch: Story = {
  render: () => <AsyncDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const input = canvas.getByLabelText('담당 회원')
    await userEvent.type(input, '김')
    await expect(await body.findByText('2자 이상 입력해주세요')).toBeInTheDocument()
    await userEvent.type(input, '하')
    await expect(await body.findAllByRole('option')).toHaveLength(3)
    await expect(body.queryByText('검색 중…')).not.toBeInTheDocument()
    await expect(canvasElement).toHaveTextContent('검색 결과 3개')
    await userEvent.click(body.getByRole('option', { name: /김하은/ }))
    await expect(canvas.getByTestId('picked')).toHaveTextContent('m2')
    await expect(input).toHaveValue('김하은')
  },
}

function StaleDemo() {
  const seen = useRef<string[]>([])
  return (
    <>
      <AsyncDemo
        debounceMs={10}
        onSearch={async (query, signal) => {
          seen.current.push(query)
          // 첫 요청이 나중 요청보다 늦게 돌아온다. 취소를 무시하는 서버를 흉내 낸다
          await new Promise((resolve) => setTimeout(resolve, query === '김하' ? 300 : 20))
          void signal
          return query === '김하' ? MEMBERS.slice(0, 3) : MEMBERS.slice(3)
        }}
      />
    </>
  )
}

/** 늦게 온 이전 응답은 버린다 */
export const AsyncStaleResponse: Story = {
  render: () => <StaleDemo />,
  play: async ({ canvasElement }) => {
    const body = within(document.body)
    const input = within(canvasElement).getByLabelText('담당 회원')
    await userEvent.type(input, '김하')
    await new Promise((resolve) => setTimeout(resolve, 40))
    await userEvent.clear(input)
    await userEvent.type(input, '박서')
    await expect(await body.findByRole('option', { name: /박서준/ })).toBeInTheDocument()
    await new Promise((resolve) => setTimeout(resolve, 350))
    await expect(body.getAllByRole('option')).toHaveLength(1)
  },
}

function SlowDemo() {
  return (
    <AsyncDemo
      debounceMs={10}
      onSearch={async (query, signal) => {
        await wait(600, signal)
        return MEMBERS.filter((member) => member.label.includes(query))
      }}
    />
  )
}

/** 응답이 200ms를 넘으면 '검색 중'이 보이고 목록은 aria-busy다 */
export const AsyncLoading: Story = {
  render: () => <SlowDemo />,
  play: async ({ canvasElement }) => {
    const body = within(document.body)
    await userEvent.type(within(canvasElement).getByLabelText('담당 회원'), '김하')
    await expect((await body.findAllByText('검색 중…')).length).toBeGreaterThan(0)
    await expect(body.getByRole('listbox', { hidden: true })).toHaveAttribute('aria-busy', 'true')
    await expect(await body.findAllByRole('option', {}, { timeout: 2000 })).toHaveLength(3)
    await expect(body.queryByText('검색 중…')).not.toBeInTheDocument()
  },
}

function FailingDemo() {
  const calls = useRef(0)
  return (
    <AsyncDemo
      debounceMs={10}
      onSearch={async (query) => {
        calls.current += 1
        if (calls.current === 1) throw new Error('서버 오류')
        return MEMBERS.filter((member) => member.label.includes(query))
      }}
    />
  )
}

/** 실패하면 오류와 다시 시도를 보인다 */
export const AsyncError: Story = {
  render: () => <FailingDemo />,
  play: async ({ canvasElement }) => {
    const body = within(document.body)
    await userEvent.type(within(canvasElement).getByLabelText('담당 회원'), '김하')
    await userEvent.click(await body.findByRole('button', { name: '다시 시도' }))
    await expect(await body.findAllByRole('option')).toHaveLength(3)
  },
}

function MultipleDemo() {
  const [value, setValue] = useState<AsyncComboboxOption[]>([MEMBERS[3]])
  return (
    <div className='grid w-80 gap-2'>
      <Label htmlFor='attendees'>참석 회원</Label>
      <AsyncCombobox id='attendees' mode='multiple' value={value} onValueChange={setValue} onSearch={searchMembers} debounceMs={50} placeholder='이름 입력 (2자 이상)' />
      <output data-testid='picked'>{value.map((v) => v.value).join(',')}</output>
    </div>
  )
}

/** 다중 선택 — 고른 항목은 칩으로 남고, 결과가 바뀌어도 사라지지 않는다 */
export const AsyncMultiple: Story = {
  render: () => <MultipleDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    const input = canvas.getByLabelText('참석 회원')
    await userEvent.type(input, '김하')
    await userEvent.click(await body.findByRole('option', { name: /김하늘/ }))
    await waitFor(() => expect(canvas.getByTestId('picked')).toHaveTextContent('m4,m1'))
    await expect(input).toHaveValue('')
    await userEvent.click(canvas.getByRole('button', { name: '박서준 빼기' }))
    await waitFor(() => expect(canvas.getByTestId('picked')).toHaveTextContent('m1'))
  },
}
