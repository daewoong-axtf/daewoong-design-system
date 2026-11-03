import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * 누를 수 있는 것이 지금 어떤 상태인지 알리는 표시층이다. DW는 상태 색을 계산하지 않고
 * `-pressed`·`-selected` 토큰 짝으로 두며, 누를 때 크기를 살짝 줄인다(`scale-s95`·`s97`·`s98`).
 * 포커스는 모든 요소가 같은 `stroke-focus-ring` 2px outline이다.
 */
const meta = {
  title: 'Element/Decorate/Interaction',
  tags: ['autodocs'],
  parameters: { layout: 'padded', controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const CSS = `
.dw-layer { height: 40px; padding: 0 var(--dw-spacing-x4); border: 0; border-radius: var(--dw-radius-r2); font-weight: 700; font-size: var(--dw-font-t4-size); cursor: pointer;
  transition: background-color var(--dw-duration-color-transition) var(--dw-easing-easing), transform var(--dw-duration-pressed-scale) var(--dw-easing-pressed-scale); }
.dw-layer:focus-visible { outline: 2px solid var(--dw-stroke-focus-ring); outline-offset: 2px; }
.dw-layer:active { transform: scale(var(--dw-scale-s95)); }
.dw-layer--brand { background: var(--dw-bg-brand-solid); color: var(--dw-fg-on-brand-solid); }
.dw-layer--weak { background: var(--dw-bg-neutral-weak); color: var(--dw-fg-neutral); }
.dw-layer--ghost { background: var(--dw-bg-transparent); color: var(--dw-fg-neutral); }
@media (hover: hover) and (pointer: fine) {
  .dw-layer--brand:hover { background: var(--dw-bg-brand-solid-pressed); }
  .dw-layer--weak:hover { background: var(--dw-bg-neutral-weak-pressed); }
  .dw-layer--ghost:hover { background: var(--dw-bg-transparent-pressed); }
}
.dw-layer--brand:active { background: var(--dw-bg-brand-solid-pressed); }
.dw-layer--weak:active { background: var(--dw-bg-neutral-weak-pressed); }
.dw-layer--ghost:active { background: var(--dw-bg-transparent-pressed); }
.dw-layer:disabled { background: var(--dw-bg-disabled); color: var(--dw-fg-disabled); cursor: not-allowed; transform: none; }
.dw-layer--ghost:disabled { background: var(--dw-bg-transparent); }
`

/** 마우스를 올리거나 눌러 보고, Tab으로 옮겨 포커스를 확인한다 */
export const 상태: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <style>{CSS}</style>
      {(['brand', 'weak', 'ghost'] as const).map((v) => (
        <div key={v} className="flex flex-wrap items-center gap-3">
          <code className="w-16 text-xs">{v}</code>
          <button type="button" className={`dw-layer dw-layer--${v}`}>
            기본
          </button>
          <button type="button" className={`dw-layer dw-layer--${v}`} disabled>
            비활성
          </button>
        </div>
      ))}
    </div>
  ),
}

/** 투명 면의 선택 상태 — 리스트 행, 사이드 내비게이션 항목 */
export const 선택: Story = {
  render: () => (
    <ul className="flex w-64 flex-col gap-1" aria-label="선택 예시">
      {['홈', '일정', '설정'].map((label, i) => (
        <li
          key={label}
          aria-current={i === 0 ? 'page' : undefined}
          className="rounded-md px-3 py-2 text-sm"
          style={{
            background: i === 0 ? 'var(--dw-bg-transparent-selected)' : 'var(--dw-bg-transparent)',
            fontWeight: i === 0 ? 700 : 400,
          }}
        >
          {label}
        </li>
      ))}
    </ul>
  ),
}
