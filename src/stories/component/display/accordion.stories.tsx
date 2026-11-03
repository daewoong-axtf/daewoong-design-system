import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  { q: '환불은 어떻게 하나요?', a: '이용일 하루 전까지 내역 화면에서 취소하면 전액 환불됩니다.' },
  { q: '비밀번호를 잊었어요.', a: '로그인 화면의 "비밀번호 찾기"에서 다시 설정할 수 있습니다.' },
  { q: '알림을 끄고 싶어요.', a: '설정 > 알림에서 항목별로 끌 수 있습니다.' },
]

const meta = {
  title: 'Component/Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '제목을 눌러 내용을 펼치고 접는다. 명세는 `design/components/accordion.md`.',
      },
    },
  },
  args: { type: 'multiple', className: 'max-w-lg' },
  render: (args) => (
    <Accordion {...args}>
      {faqs.map((f, i) => (
        <AccordionItem key={f.q} value={`item-${i}`}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: faqs[0].q })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(within(canvasElement).getByText(faqs[0].a)).toBeVisible()
  },
}

export const Single: Story = { args: { type: 'single', collapsible: true } }
