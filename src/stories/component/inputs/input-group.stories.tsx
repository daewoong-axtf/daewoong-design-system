import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleAlertIcon, CircleCheckIcon, CopyIcon } from 'lucide-react'
import { expect, fn, userEvent, within } from 'storybook/test'

import { Field, FieldError, FieldLabel, FieldSuccess } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputAction,
  InputActionButton,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'

const meta = {
  title: 'Component/Inputs/Input Group',
  component: InputGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '한 테두리 안에 입력과 버튼·글자를 묶는다. 명세는 `design/components/input-group.md`. 단위나 아이콘만 붙일 때는 Input을 그대로 쓴다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

const handleCopy = fn()

export const WithButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput aria-label="공유 주소" defaultValue="example.com/docs/1024" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={handleCopy}>
          <CopyIcon aria-hidden="true" />
          복사
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: '복사' }))
    await expect(handleCopy).toHaveBeenCalled()
    await userEvent.click(canvas.getByText('https://'))
    await expect(canvas.getByLabelText('공유 주소')).toHaveFocus()
  },
}

export const Stacked: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea aria-label="문서 의견" placeholder="의견을 입력하세요" />
      <InputGroupAddon align="block-end" className="justify-between">
        <InputGroupText>0/200</InputGroupText>
        <InputGroupButton variant="default">등록</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText('0/200'))
    await expect(canvas.getByLabelText('문서 의견')).toHaveFocus()
  },
}

export const Invalid: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput aria-label="쿠폰 번호" aria-invalid defaultValue="WRONG" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="secondary">적용</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <InputGroup data-disabled="true">
      <InputGroupInput aria-label="쿠폰 번호" disabled defaultValue="COUPON-2026" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="secondary" disabled>
          적용
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

/** 값을 확인하거나 다음 단계로 가는 행동은 입력 옆에 붙인다 */
export const AttachedButton: Story = {
  render: () => {
    const onCheck = fn()
    return (
      <Field className="w-80">
        <FieldLabel htmlFor="ig-id">아이디</FieldLabel>
        <InputAction>
          <Input id="ig-id" />
          <InputActionButton onClick={onCheck}>중복 확인</InputActionButton>
        </InputAction>
      </Field>
    )
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: '중복 확인' })).toBeEnabled()
  },
}

/** 오류와 성공은 아이콘과 메시지를 함께 보인다 */
export const StatusIcons: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Field data-invalid>
        <FieldLabel htmlFor="ig-bad">아이디</FieldLabel>
        <InputGroup>
          <InputGroupInput id="ig-bad" aria-invalid defaultValue="dw 2026" />
          <InputGroupAddon align="inline-end">
            <CircleAlertIcon aria-hidden="true" className="text-[var(--dw-fg-critical)]" />
          </InputGroupAddon>
        </InputGroup>
        <FieldError>띄어쓰기 없이 입력하세요</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="ig-ok">아이디</FieldLabel>
        <InputGroup>
          <InputGroupInput id="ig-ok" defaultValue="dw-2026" />
          <InputGroupAddon align="inline-end">
            <CircleCheckIcon aria-hidden="true" className="text-[var(--dw-fg-positive)]" />
          </InputGroupAddon>
        </InputGroup>
        <FieldSuccess>사용할 수 있는 아이디예요</FieldSuccess>
      </Field>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('status')).toHaveTextContent('사용할 수 있는 아이디예요')
    await expect(canvas.getByRole('alert')).toHaveTextContent('띄어쓰기 없이 입력하세요')
  },
}
