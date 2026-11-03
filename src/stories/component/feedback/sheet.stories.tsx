import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const meta = {
  title: 'Component/Feedback/Sheet',
  component: SheetContent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '화면 옆에서 미끄러져 들어오는 모달 패널이다(Side Sheet). 명세는 `design/components/side-sheet.md`. 모바일 내비게이션 서랍은 `side="left"`.',
      },
    },
  },
  args: { side: 'right' },
  argTypes: { side: { control: 'inline-radio', options: ['right', 'left', 'top', 'bottom'] } },
  render: ({ side }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">상세 보기</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>회원 상세</SheetTitle>
          <SheetDescription>정보를 수정하고 저장하세요.</SheetDescription>
        </SheetHeader>
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel htmlFor="s-name">이름</FieldLabel>
            <Input id="s-name" defaultValue="홍길동" />
          </Field>
        </FieldGroup>
        <SheetFooter>
          <Button>저장</Button>
          <SheetClose asChild>
            <Button variant="outline">닫기</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof SheetContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: '상세 보기' })
    await userEvent.click(trigger)
    const body = within(document.body)
    await expect(await body.findByRole('dialog', { name: '회원 상세' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}

export const Left: Story = { args: { side: 'left' } }
