import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { PasswordInput } from '@/components/ui/password-input'

const meta = {
  title: 'Component/Inputs/Password Input',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text Input에 표시·숨김 토글을 붙인 비밀번호 입력이다. 명세는 `design/components/password-input.md`.',
      },
    },
  },
  args: { 'aria-label': '비밀번호', autoComplete: 'current-password' },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('비밀번호')
    const toggle = canvas.getByRole('button', { name: '비밀번호 표시' })
    await userEvent.type(input, 'secret')
    await expect(input).toHaveAttribute('type', 'password')
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(toggle)
    await expect(input).toHaveAttribute('type', 'text')
    await expect(input).toHaveValue('secret')
    await expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await userEvent.click(toggle)
    await expect(input).toHaveAttribute('type', 'password')
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'password' },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: '비밀번호 표시' })).toBeDisabled()
  },
}
