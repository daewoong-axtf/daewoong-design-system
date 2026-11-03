import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'

const meta = {
  title: 'Component/Feedback/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '버튼 옆에 붙어 뜨는 비모달 패널이다. 명세는 `design/components/popover.md`. 모바일(768px 미만)에서는 Drawer로 같은 내용을 연다.',
      },
    },
  },
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">필터</Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72">
        <PopoverHeader>
          <PopoverTitle>필터</PopoverTitle>
          <PopoverDescription>조건을 입력한 뒤 적용하세요.</PopoverDescription>
        </PopoverHeader>
        <FieldGroup className="mt-4">
          <Field>
            <FieldLabel htmlFor="p-keyword">검색어</FieldLabel>
            <Input id="p-keyword" />
          </Field>
          <Button>적용</Button>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: '필터' })
    await userEvent.click(trigger)
    const body = within(document.body)
    await expect(await body.findByRole('dialog')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}
