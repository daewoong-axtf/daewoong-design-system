import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const meta = {
  title: 'Component/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '같은 화면 안에서 콘텐츠 영역을 전환한다. 명세는 `design/components/tabs.md`(밑줄형). 명세에 가까운 모양은 `TabsList variant="line"`.',
      },
    },
  },
  args: { defaultValue: 'active' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList variant="line">
        <TabsTrigger value="active">진행 중</TabsTrigger>
        <TabsTrigger value="done">완료</TabsTrigger>
        <TabsTrigger value="canceled">취소</TabsTrigger>
      </TabsList>
      <TabsContent value="active">진행 중인 항목 3건</TabsContent>
      <TabsContent value="done">완료한 항목 12건</TabsContent>
      <TabsContent value="canceled">취소한 항목 1건</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: '진행 중' }))
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('tab', { name: '완료' })).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('완료한 항목 12건')
  },
}

export const Pill: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="active">진행 중</TabsTrigger>
        <TabsTrigger value="done">완료</TabsTrigger>
      </TabsList>
      <TabsContent value="active">진행 중인 항목 3건</TabsContent>
      <TabsContent value="done">완료한 항목 12건</TabsContent>
    </Tabs>
  ),
}
