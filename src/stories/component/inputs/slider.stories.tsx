import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Slider } from '@/components/ui/slider'

const meta = {
  title: 'Component/Inputs/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '연속된 범위에서 값을 끌어서 고른다. 명세는 `design/components/slider.md`.',
      },
    },
  },
  args: { defaultValue: [40], max: 100, step: 1, className: 'w-72', 'aria-label': '음량' },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const thumb = within(canvasElement).getByRole('slider')
    thumb.focus()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    await expect(thumb).toHaveAttribute('aria-valuenow', '42')
    await userEvent.keyboard('{End}')
    await expect(thumb).toHaveAttribute('aria-valuenow', '100')
  },
}

export const Range: Story = { args: { defaultValue: [20, 80] } }

export const Disabled: Story = { args: { disabled: true } }
