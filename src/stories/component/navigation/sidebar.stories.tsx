import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarIcon, HouseIcon, InboxIcon, SettingsIcon, UsersIcon } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const groups = [
  {
    label: '운영',
    items: [
      { title: '홈', icon: HouseIcon, current: true },
      { title: '일정', icon: CalendarIcon },
      { title: '문의함', icon: InboxIcon },
    ],
  },
  {
    label: '관리',
    items: [
      { title: '회원', icon: UsersIcon },
      { title: '설정', icon: SettingsIcon },
    ],
  },
]

function AppShell() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="px-4 py-3 text-sm font-bold group-data-[collapsible=icon]:hidden">대웅 서비스</SidebarHeader>
        <SidebarContent>
          {groups.map((g) => (
            <SidebarGroup key={g.label}>
              <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {g.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.current} tooltip={item.title}>
                        <a href="#" aria-current={item.current ? 'page' : undefined}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <h1 className="text-base font-bold">홈</h1>
        </header>
        <main className="p-4 text-sm text-muted-foreground">본문 영역</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

const meta = {
  title: 'Component/Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '주요 메뉴를 왼쪽 세로 막대로 보여준다. 명세는 `design/components/side-navigation.md`. 데스크톱에서는 접어서 아이콘만 남기고(⌘/Ctrl+B), 768px 미만에서는 햄버거 버튼으로 여는 서랍이 된다. 상단 막대는 `design/components/top-navigation.md`.',
      },
    },
  },
  render: () => <AppShell />,
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop' } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('link', { name: '홈' })).toHaveAttribute('aria-current', 'page')
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle Sidebar' }))
    await expect(canvasElement.querySelector('[data-state="collapsed"]')).not.toBeNull()
  },
}

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile' } },
}
