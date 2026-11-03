import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoldIcon, ItalicIcon, ListIcon, MapIcon, UnderlineIcon } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'

import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta = {
  title: 'Component/Actions/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '켜고 끄는 버튼이다. 필터 칩은 `design/components/chip.md`, 보기 전환은 `design/components/segmented-control.md`에 대응한다.',
      },
    },
  },
  args: { children: '최신순', 'aria-label': '최신순' },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole('button', { name: '최신순' })
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  },
}

export const Outline: Story = { args: { variant: 'outline' } }

export const Disabled: Story = { args: { disabled: true } }

/** 여러 개를 동시에 고르는 칩 묶음이다. */
export const ChipGroup: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline" spacing={2} aria-label="서식">
      <ToggleGroupItem value="bold" aria-label="굵게">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="기울임">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="밑줄">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** 하나만 고르는 보기 전환이다(Segmented Control). */
export const Segmented: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="list" aria-label="보기 방식">
      <ToggleGroupItem value="list" aria-label="목록">
        <ListIcon /> 목록
      </ToggleGroupItem>
      <ToggleGroupItem value="map" aria-label="지도">
        <MapIcon /> 지도
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const map = canvas.getByRole('radio', { name: '지도' })
    await userEvent.click(map)
    await expect(map).toHaveAttribute('aria-checked', 'true')
    await expect(canvas.getByRole('radio', { name: '목록' })).toHaveAttribute('aria-checked', 'false')
  },
}
