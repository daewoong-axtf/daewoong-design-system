import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleXIcon,
  EllipsisIcon,
  EyeIcon,
  EyeOffIcon,
  InfoIcon,
  LoaderCircleIcon,
  type LucideIcon,
  MenuIcon,
  MinusIcon,
  PlusIcon,
  SearchIcon,
  TriangleAlertIcon,
  UploadIcon,
  UserIcon,
  XIcon,
} from 'lucide-react'

/**
 * design/icons/에 SVG로 들어 있는 lucide 아이콘 22종.
 * 아이콘을 새로 넣거나 빼면 design/icons/와 이 목록을 함께 고친다.
 */
export const ICON_GROUPS: { label: string; icons: [string, LucideIcon][] }[] = [
  {
    label: '이동 · 방향',
    icons: [
      ['ChevronDownIcon', ChevronDownIcon],
      ['ChevronUpIcon', ChevronUpIcon],
      ['ChevronLeftIcon', ChevronLeftIcon],
      ['ChevronRightIcon', ChevronRightIcon],
      ['MenuIcon', MenuIcon],
    ],
  },
  {
    label: '상태 · 알림',
    icons: [
      ['InfoIcon', InfoIcon],
      ['CircleAlertIcon', CircleAlertIcon],
      ['TriangleAlertIcon', TriangleAlertIcon],
      ['CircleCheckIcon', CircleCheckIcon],
      ['CircleXIcon', CircleXIcon],
      ['CheckIcon', CheckIcon],
      ['LoaderCircleIcon', LoaderCircleIcon],
    ],
  },
  {
    label: '액션',
    icons: [
      ['PlusIcon', PlusIcon],
      ['MinusIcon', MinusIcon],
      ['XIcon', XIcon],
      ['SearchIcon', SearchIcon],
      ['UploadIcon', UploadIcon],
      ['EllipsisIcon', EllipsisIcon],
    ],
  },
  {
    label: '표시 · 기타',
    icons: [
      ['EyeIcon', EyeIcon],
      ['EyeOffIcon', EyeOffIcon],
      ['CalendarIcon', CalendarIcon],
      ['UserIcon', UserIcon],
    ],
  },
]

export const ICON_TOTAL = ICON_GROUPS.reduce((n, g) => n + g.icons.length, 0)
