import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const meta = {
  title: 'Component/Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '한 줄 텍스트 입력이다. 명세는 `design/components/text-input.md`. 라벨은 Field로 붙인다.',
      },
    },
  },
  args: { placeholder: '이름', 'aria-label': '이름', className: 'w-72' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: '이름' })
    await userEvent.type(input, '홍길동')
    await expect(input).toHaveValue('홍길동')
  },
}

export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: '잘못된 값' } }

export const Disabled: Story = { args: { disabled: true, defaultValue: '수정할 수 없음' } }

export const ReadOnly: Story = { args: { readOnly: true, defaultValue: '읽기 전용' } }

export const File: Story = { args: { type: 'file', 'aria-label': '첨부 파일' } }

/** 같은 크기의 Input과 Button은 높이가 같다 */
export const SizesMatchButton: Story = {
  render: () => (
    <div className='grid w-72 gap-3'>
      {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} className='flex items-center gap-2'>
          <Input inputSize={size} aria-label={`${size} 입력`} />
          <Button size={size}>{size}</Button>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    const heights = { xs: 32, sm: 36, default: 40, lg: 52 }
    for (const [size, height] of Object.entries(heights)) {
      expect(canvas.getByRole('textbox', { name: `${size} 입력` }).getBoundingClientRect().height).toBe(height)
      expect(canvas.getByRole('button', { name: size }).getBoundingClientRect().height).toBe(height)
    }
  },
}
