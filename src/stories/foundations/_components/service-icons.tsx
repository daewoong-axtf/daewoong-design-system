import { icons, type LucideIcon } from 'lucide-react'

import manifest from '../../../../design/icons/icons.json'

/**
 * design/icons/icons.json(생성 파일)에 든 lucide 아이콘 목록.
 * 아이콘을 넣거나 빼려면 scripts/build-icons.ts의 GROUPS를 고치고 pnpm build:icons.
 */
export const ICON_GROUPS: { label: string; icons: [string, LucideIcon][] }[] = manifest.groups.map((g) => ({
  label: g.label,
  icons: g.icons.map((i) => {
    const Icon = icons[i.react.replace(/Icon$/, '') as keyof typeof icons]
    if (!Icon) throw new Error(`lucide-react에 ${i.react}가 없다`)
    return [i.react, Icon]
  }),
}))

export const ICON_TOTAL = ICON_GROUPS.reduce((n, g) => n + g.icons.length, 0)
