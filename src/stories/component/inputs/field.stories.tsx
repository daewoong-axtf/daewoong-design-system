import type { Meta, StoryObj } from '@storybook/react-vite'
import { type FormEvent, useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const meta = {
  title: 'Component/Inputs/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '입력 컨트롤에 라벨·설명·오류를 붙이는 틀이다. 명세는 `design/components/field.md`. 제출 버튼은 항상 활성이고, 검증에 실패하면 첫 오류 필드로 포커스가 간다.',
      },
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="f-email">이메일</FieldLabel>
      <Input id="f-email" type="email" placeholder="name@example.com" />
      <FieldDescription>알림을 받을 주소를 입력하세요.</FieldDescription>
    </Field>
  ),
}

export const Invalid: Story = {
  render: () => (
    <Field className="max-w-sm" data-invalid>
      <FieldLabel htmlFor="f-name">이름</FieldLabel>
      <Input id="f-name" aria-invalid aria-describedby="f-name-error" />
      <FieldError id="f-name-error">이름을 입력하세요.</FieldError>
    </Field>
  ),
}

export const Textareas: Story = {
  render: () => (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="f-memo">메모</FieldLabel>
      <Textarea id="f-memo" placeholder="내용을 입력하세요" />
    </Field>
  ),
}

function ValidatedForm() {
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('name') as HTMLInputElement
    if (!input.value.trim()) {
      setError('이름을 입력하세요.')
      input.focus()
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="max-w-sm">
      <FieldSet>
        <FieldLegend>회원 정보</FieldLegend>
        <FieldGroup>
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor="v-name">이름</FieldLabel>
            <Input
              id="v-name"
              name="name"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'v-name-error' : undefined}
              onChange={() => setError('')}
            />
            {error && <FieldError id="v-name-error">{error}</FieldError>}
          </Field>
          <Button type="submit">저장</Button>
          {submitted && <p role="status">저장했습니다</p>}
        </FieldGroup>
      </FieldSet>
    </form>
  )
}

/** 빈 값으로 제출하면 첫 오류 필드로 포커스가 가고 아래에 안내가 붙는다. */
export const SubmitValidation: Story = {
  render: () => <ValidatedForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const submit = canvas.getByRole('button', { name: '저장' })
    await expect(submit).toBeEnabled()
    await userEvent.click(submit)
    const input = canvas.getByLabelText('이름')
    await expect(input).toHaveFocus()
    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(canvas.getByText('이름을 입력하세요.')).toBeVisible()
    await userEvent.type(input, '홍길동')
    await userEvent.click(submit)
    await expect(canvas.getByRole('status')).toHaveTextContent('저장했습니다')
  },
}
