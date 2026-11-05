import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Container, Grid, GridItem } from '@/components/ui/grid'

const meta = {
  title: 'Component/Display/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '화면을 세로 칸으로 나눠 영역을 배치한다. 명세는 `design/components/grid.md`.',
      },
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const Cell = ({ children }: { children: string }) => (
  <div className="flex min-h-16 items-center justify-center rounded-md bg-[var(--dw-bg-brand-solid)] text-[var(--dw-fg-on-brand-solid)]">{children}</div>
)

export const Layout: Story = {
  render: () => (
    <Container>
      <Grid data-testid="grid">
        <GridItem lg={3}>
          <Cell>필터</Cell>
        </GridItem>
        <GridItem lg={9}>
          <Cell>본문</Cell>
        </GridItem>
        {['카드 1', '카드 2', '카드 3', '카드 4'].map((name) => (
          <GridItem key={name} base={1} md={2} lg={3}>
            <Cell>{name}</Cell>
          </GridItem>
        ))}
      </Grid>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const grid = within(canvasElement).getByTestId('grid')
    const style = getComputedStyle(grid)
    await expect(style.columnGap).toBe('20px')
    await expect([2, 4, 12]).toContain(style.gridTemplateColumns.split(' ').length)
  },
}

export const Mobile: Story = {
  ...Layout,
  globals: { viewport: { value: 'mobile1', isRotated: false } },
}
