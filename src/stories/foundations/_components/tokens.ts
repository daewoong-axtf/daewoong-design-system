import tokens from '../../../../design/tokens.json'

/**
 * 문서 페이지가 보여주는 값은 전부 design/tokens.json에서 읽는다.
 * 표에 값을 손으로 옮겨 적지 않으므로 토큰을 바꾸면 문서도 같이 바뀐다.
 */
export { tokens }

type Palette = Record<string, string>
const light = tokens.palette.light as Palette
const dark = tokens.palette.dark as Palette

/** 팔레트 계열 순서 — design.md §2.2 */
export const PALETTE_FAMILIES = [
  'gray',
  'gray-alpha',
  'orange',
  'charcoal',
  'blue',
  'green',
  'yellow',
  'red',
  'purple',
  'static-black-alpha',
  'static-white-alpha',
] as const

export function paletteSteps(family: string) {
  return Object.keys(light)
    .filter((name) => name.slice(0, name.lastIndexOf('-')) === family)
    .map((name) => ({ name, step: name.slice(family.length + 1), light: light[name], dark: dark[name] }))
}

type Role = Record<string, string>
const roleLight = tokens.role.light as Role
const roleDark = tokens.role.dark as Role

/** `{palette.gray-900}` → `gray-900` */
const ref = (v: string) => v.replace(/^\{palette\.(.+)\}$/, '$1')

export function roles(layer: 'bg' | 'fg' | 'stroke') {
  return Object.keys(roleLight)
    .filter((name) => name.startsWith(`${layer}-`))
    .map((name) => ({ name, light: ref(roleLight[name]), dark: ref(roleDark[name]) }))
}

/** `{spacing.x4}` 같은 참조를 풀어 실제 값으로 */
export function resolve(v: string): string {
  const m = v.match(/^\{(.+)\}$/)
  if (!m) return v
  const value = m[1].split('.').reduce<unknown>((o, k) => (o as Record<string, unknown>)?.[k], tokens)
  return typeof value === 'string' ? resolve(value) : v
}
