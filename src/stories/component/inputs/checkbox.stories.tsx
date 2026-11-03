import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'

const meta = {
  title: 'Component/Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '여러 보기 중 0개 이상을 고른다. 명세는 `design/components/checkbox.md`.',
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Field orientation="horizontal">
      <Checkbox id="agree" {...args} />
      <FieldLabel htmlFor="agree">약관에 동의합니다</FieldLabel>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox', { name: '약관에 동의합니다' })
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await userEvent.keyboard(' ')
    await expect(checkbox).not.toBeChecked()
  },
}

export const Indeterminate: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Checkbox id="all" checked="indeterminate" />
      <FieldLabel htmlFor="all">전체 선택</FieldLabel>
    </Field>
  ),
}

export const Disabled: Story = {
  render: () => (
    <FieldGroup className="gap-3">
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="d1" disabled />
        <FieldLabel htmlFor="d1">꺼짐</FieldLabel>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="d2" disabled defaultChecked />
        <FieldLabel htmlFor="d2">켜짐</FieldLabel>
      </Field>
    </FieldGroup>
  ),
}

export const Group: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend variant="label">알림 받기</FieldLegend>
      <FieldGroup className="gap-3">
        {['이메일', '문자', '앱 푸시'].map((label, i) => (
          <Field key={label} orientation="horizontal">
            <Checkbox id={`n-${i}`} defaultChecked={i === 0} />
            <FieldLabel htmlFor={`n-${i}`}>{label}</FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  ),
}
