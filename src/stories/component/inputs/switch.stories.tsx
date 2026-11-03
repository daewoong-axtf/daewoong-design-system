import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Field, FieldLabel } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'

const meta = {
  title: 'Component/Inputs/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '설정 하나를 즉시 켜고 끈다. 저장 버튼 없이 바로 반영된다. 명세는 `design/components/switch.md`.',
      },
    },
  },
  render: (args) => (
    <Field orientation="horizontal" className="w-64 justify-between">
      <FieldLabel htmlFor="push">푸시 알림</FieldLabel>
      <Switch id="push" {...args} />
    </Field>
  ),
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole('switch', { name: '푸시 알림' })
    await expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).toBeChecked()
  },
}

export const Checked: Story = { args: { defaultChecked: true } }

export const Small: Story = { args: { size: 'sm' } }

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } }
