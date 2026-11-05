import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { expect, userEvent, within } from 'storybook/test'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/sonner'
import { Textarea } from '@/components/ui/textarea'

const schema = z.object({
  name: z.string().min(2, '받는 분 이름을 2자 이상 입력하세요'),
  tel: z.string().regex(/^[0-9-]{9,13}$/, '연락처를 숫자와 하이픈으로 입력하세요'),
  memo: z.string().max(100, '메모를 100자 이내로 입력하세요'),
})

function DeliveryForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', tel: '', memo: '' },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => toast.success('배송 정보를 저장했어요'))} noValidate className="grid w-full max-w-sm gap-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>받는 분</FormLabel>
              <FormControl>
                <Input autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>연락처</FormLabel>
              <FormControl>
                <Input type="tel" autoComplete="tel" {...field} />
              </FormControl>
              <FormDescription>숫자와 하이픈만 입력하세요</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>배송 메모</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">저장</Button>
        <Toaster />
      </form>
    </Form>
  )
}

const meta = {
  title: 'Component/Inputs/Form',
  component: DeliveryForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '필드를 쌓고 제출 때 검증하는 폼 구성이다. 명세는 `design/components/form.md`. React에서는 react-hook-form + zod로 같은 동작을 만든다. 첫 오류는 제출할 때 보이고, 그 뒤로는 입력할 때마다 다시 검증한다(`useForm` 기본값).',
      },
    },
  },
} satisfies Meta<typeof DeliveryForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tel = canvas.getByLabelText('연락처')
    const description = canvas.getByText('숫자와 하이픈만 입력하세요')
    await expect(tel).toHaveAttribute('aria-describedby', description.id)
    await expect(canvas.getByLabelText('배송 메모')).not.toHaveAttribute('aria-describedby')
  },
}

export const ValidationError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const save = canvas.getByRole('button', { name: '저장' })
    await expect(save).toBeEnabled()
    await userEvent.click(save)

    const name = canvas.getByLabelText('받는 분')
    const error = await canvas.findByText('받는 분 이름을 2자 이상 입력하세요')
    await expect(name).toHaveFocus()
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await expect(name).toHaveAttribute('aria-describedby', error.id)

    const telError = await canvas.findByText('연락처를 숫자와 하이픈으로 입력하세요')
    await expect(canvas.getByLabelText('연락처')).toHaveAttribute('aria-describedby', telError.id)
    await expect(canvas.getByText('숫자와 하이픈만 입력하세요')).not.toBeVisible()

    await userEvent.type(name, '김대')
    await expect(canvas.queryByText('받는 분 이름을 2자 이상 입력하세요')).not.toBeInTheDocument()
    await expect(name).toHaveAttribute('aria-invalid', 'false')
  },
}

export const SubmitSuccess: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.type(canvas.getByLabelText('받는 분'), '김대웅')
    await userEvent.type(canvas.getByLabelText('연락처'), '02-000-0000')
    await userEvent.click(canvas.getByRole('button', { name: '저장' }))
    await expect(await within(document.body).findByText('배송 정보를 저장했어요')).toBeInTheDocument()
  },
}
