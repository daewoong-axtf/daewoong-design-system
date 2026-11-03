import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Textarea } from '@/components/ui/textarea'

const meta = {
  title: 'Component/Inputs/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '여러 줄 텍스트 입력이다. 명세는 `design/components/text-input.md`의 multiline.',
      },
    },
  },
  args: { placeholder: '내용을 입력하세요', 'aria-label': '내용', className: 'w-80' },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const textarea = within(canvasElement).getByRole('textbox', { name: '내용' })
    await userEvent.type(textarea, '첫 줄{enter}둘째 줄')
    await expect(textarea).toHaveValue('첫 줄\n둘째 줄')
  },
}

export const Invalid: Story = { args: { 'aria-invalid': true } }

export const Disabled: Story = { args: { disabled: true } }
