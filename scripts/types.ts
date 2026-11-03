// design/tokens.json 구조
export type TokenMap = Record<string, string>

export interface ModeMap {
  light: TokenMap
  dark: TokenMap
}

export interface Tokens {
  $description: string
  $version: string
  palette: ModeMap
  role: ModeMap
  spacing: TokenMap
  radius: TokenMap
  shadow: ModeMap
  typography: {
    fontFamily: { sans: string }
    fontWeight: TokenMap
    scale: Record<string, { fontSize: string; lineHeight: string }>
  }
  motion: {
    duration: TokenMap
    easing: TokenMap
    scale: { default: TokenMap; reducedMotion: TokenMap }
  }
}
