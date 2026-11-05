import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--dw-bg-neutral-solid)",
          "--normal-text": "var(--dw-fg-on-neutral-solid)",
          "--normal-border": "var(--dw-bg-neutral-solid)",
          "--success-bg": "var(--dw-bg-positive-solid)",
          "--success-text": "var(--dw-fg-on-positive-solid)",
          "--success-border": "var(--dw-bg-positive-solid)",
          "--warning-bg": "var(--dw-bg-warning-solid)",
          "--warning-text": "var(--dw-fg-on-warning-solid)",
          "--warning-border": "var(--dw-bg-warning-solid)",
          "--error-bg": "var(--dw-bg-critical-solid)",
          "--error-text": "var(--dw-fg-on-critical-solid)",
          "--error-border": "var(--dw-bg-critical-solid)",
          "--info-bg": "var(--dw-bg-informative-solid)",
          "--info-text": "var(--dw-fg-on-informative-solid)",
          "--info-border": "var(--dw-bg-informative-solid)",
          "--border-radius": "var(--radius)",
          zIndex: "var(--dw-z-toast)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
