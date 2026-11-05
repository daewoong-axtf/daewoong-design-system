import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Field, FieldLabel } from '@/components/ui/field'
import { FormSection } from '@/components/ui/form-section'
import { Input } from '@/components/ui/input'

const meta = {
  title: 'Component/Display/Form Section',
  component: FormSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '긴 폼을 의미 단위로 나누는 카드다. 명세는 `design/components/form-section.md`.',
      },
    },
  },
  args: { title: '기본 정보' },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormSection>

export default meta
type Story = StoryObj<typeof meta>

const fields = (
  <Field>
    <FieldLabel htmlFor="fs-name">회원 이름</FieldLabel>
    <Input id="fs-name" autoComplete="name" />
  </Field>
)

export const Default: Story = {
  args: { children: fields },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('region', { name: '기본 정보' })).toBeInTheDocument()
  },
}

export const Required: Story = {
  args: { required: true, children: fields },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('heading', { name: /필수/ })).toBeInTheDocument()
  },
}

export const WithDescriptionAndAside: Story = {
  args: {
    title: '첨부 문서',
    description: '담당자 확인이 필요한 문서를 등록해요.',
    aside: '총 0건',
    children: <p className="text-muted-foreground text-sm">등록한 문서가 없어요.</p>,
  },
}

export const Mobile: Story = {
  args: { description: '주문서에 표시되는 정보예요.', aside: '총 1건', children: fields },
  globals: { viewport: { value: 'mobile' } },
}
