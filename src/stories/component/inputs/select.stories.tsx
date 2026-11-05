import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Field, FieldLabel } from '@/components/ui/field'
import { MultiSelect } from '@/components/ui/multi-select'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const meta = {
  title: 'Component/Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '여러 보기 중 하나를 드롭다운으로 고른다. 명세는 `design/components/select.md`.',
      },
    },
  },
  render: (args) => (
    <Field className="w-64">
      <FieldLabel htmlFor="city">도시</FieldLabel>
      <Select {...args}>
        <SelectTrigger id="city">
          <SelectValue placeholder="도시 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>수도권</SelectLabel>
            <SelectItem value="seoul">서울</SelectItem>
            <SelectItem value="incheon">인천</SelectItem>
            <SelectItem value="gyeonggi">경기</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>그 외</SelectLabel>
            <SelectItem value="busan">부산</SelectItem>
            <SelectItem value="daegu">대구</SelectItem>
            <SelectItem value="jeju" disabled>
              제주(준비 중)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  ),
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('combobox', { name: '도시' })
    await userEvent.click(trigger)
    const body = within(document.body)
    await userEvent.click(await body.findByRole('option', { name: '부산' }))
    await expect(trigger).toHaveTextContent('부산')
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}

export const WithValue: Story = { args: { defaultValue: 'seoul' } }

export const Disabled: Story = { args: { disabled: true } }

const REGIONS = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'jeju', label: '제주(준비 중)', disabled: true },
]

/** 목록은 열린 채로 있고, 고른 값은 칩으로 쌓인다 */
export const Multiple: Story = {
  render: () => (
    <Field className="w-64">
      <FieldLabel htmlFor="regions">지역</FieldLabel>
      <MultiSelect id="regions" options={REGIONS} defaultValue={['seoul']} placeholder="지역 선택" name="regions" />
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(document.body)
    await userEvent.click(canvas.getByRole('combobox', { name: /지역/ }))
    await userEvent.click(await body.findByRole('option', { name: '부산' }))
    await expect(body.getByRole('option', { name: '부산' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.click(body.getByRole('option', { name: '서울' }))
    await expect(body.getByRole('option', { name: '서울' })).toHaveAttribute('aria-selected', 'false')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('listbox')).not.toBeInTheDocument())
    await expect(canvas.getByRole('combobox', { name: /지역/ })).toHaveTextContent('부산')
    await expect(canvas.getByRole('combobox', { name: /지역/ })).not.toHaveTextContent('서울')
  },
}

export const MultipleEmpty: Story = {
  render: () => (
    <Field className="w-64">
      <FieldLabel htmlFor="regions-empty">지역</FieldLabel>
      <MultiSelect id="regions-empty" options={REGIONS} placeholder="지역 선택" />
    </Field>
  ),
}
