import type { Meta, StoryObj } from '@storybook/react-vite'
import { Share2Icon } from 'lucide-react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const meta = {
  title: 'Component/Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '마우스 올림·포커스 때 짧은 보충 설명을 띄운다. 명세는 `design/components/tooltip.md`.',
      },
    },
  },
  render: (args) => (
    <TooltipProvider delayDuration={300}>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="공유">
            <Share2Icon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>링크를 복사해 공유합니다</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.tab()
    await expect(within(canvasElement).getByRole('button', { name: '공유' })).toHaveFocus()
    const body = within(document.body)
    await expect(await body.findByRole('tooltip')).toHaveTextContent('링크를 복사해 공유합니다')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('tooltip')).not.toBeInTheDocument())
  },
}

export const Open: Story = { args: { defaultOpen: true } }
