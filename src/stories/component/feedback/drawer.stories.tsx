import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

const meta = {
  title: 'Component/Feedback/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  globals: { viewport: { value: 'mobile' } },
  parameters: {
    docs: {
      description: {
        component:
          '화면 아래에서 올라오는 모달 패널이다(Bottom Sheet). 명세는 `design/components/bottom-sheet.md`. 모바일에서 Dialog·Popover·메뉴 대신 쓴다. 손잡이를 끌어 내려 닫을 수 있다.',
      },
    },
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">정렬</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-[480px]">
          <DrawerHeader>
            <DrawerTitle>정렬</DrawerTitle>
            <DrawerDescription>목록을 어떤 순서로 볼지 고르세요.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>적용</Button>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  ),
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: '정렬' }))
    await expect(await within(document.body).findByRole('dialog', { name: '정렬' })).toBeInTheDocument()
  },
}
