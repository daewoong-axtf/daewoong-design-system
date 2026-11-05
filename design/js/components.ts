/*
 * 대웅 Design System — 레퍼런스 동작 (TypeScript 원본, 의존성 없음)
 * 브라우저가 읽는 components.js는 이 파일에서 타입만 지워 생성한다 — pnpm build:catalog
 * 각 컴포넌트 명세의 "Behavior & Accessibility"를 그대로 구현한 예시다.
 * 다른 언어·프레임워크로 옮길 때 동작 기준으로 삼는다.
 *
 * 훅: data-dw="<name>" (컴포넌트 루트), data-dw-open="<id>" (열기 트리거), data-dw-close (닫기)
 */
interface ModalEntry {
  root: HTMLElement
  trigger: HTMLElement | null
}

declare global {
  interface Window {
    dw: { openModal: typeof openModal; closeModal: typeof closeModal; showToast: typeof showToast }
  }
}

  const FOCUSABLE =
    'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'

  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
  const focusables = (root: Element): HTMLElement[] => [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement)

  // 애니메이션이 끝나면 resolve (모션 줄이기·애니메이션 없음이면 즉시)
  const afterAnimation = (el: Element): Promise<void> =>
    new Promise((resolve) => {
      if (reducedMotion() || getComputedStyle(el).animationName === 'none') return resolve()
      el.addEventListener('animationend', () => resolve(), { once: true })
    })

  /* ── 스크롤 잠금 (여러 모달이 겹쳐도 마지막이 닫힐 때 풀림) ── */
  let lockCount = 0
  const lockScroll = () => {
    if (lockCount++ > 0) return
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.dataset.dwScrollLock = ''
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
  }
  const unlockScroll = () => {
    if (--lockCount > 0) return
    delete document.documentElement.dataset.dwScrollLock
    document.body.style.paddingRight = ''
  }

  /* ── 모달 공통 (Dialog · Alert Dialog · Sheet) ── */
  const stack: ModalEntry[] = []

  function setInert(on: boolean): void {
    // 맨 위 모달만 조작 가능, 나머지(아래 깔린 모달 포함)는 inert
    const top = stack.at(-1)?.root
    for (const el of document.body.children) {
      if (on && el !== top && !el.matches('.dw-toast-region')) el.setAttribute('inert', '')
      else el.removeAttribute('inert')
    }
  }

  function openModal(root: HTMLElement, trigger: HTMLElement | null = null): void {
    if (!root.hidden) return
    const panel = root.querySelector<HTMLElement>('[role="dialog"], [role="alertdialog"]')
    if (!panel) return
    const parts = root.querySelectorAll<HTMLElement>('[data-state]:not(.dw-progress-circle)')
    document.body.append(root) // 최상위로 옮겨 inert 처리 대상에서 분리
    root.hidden = false
    for (const p of parts) p.dataset.state = 'open'
    stack.push({ root, trigger })
    setInert(true)
    lockScroll()
    const first = panel.querySelector<HTMLElement>('[data-dw-autofocus]') ?? focusables(panel).find((el) => !el.matches('[data-dw-close].dw-dialog__close, .dw-button--critical-solid'))
    ;(first ?? panel).focus()
    updateScrollShadow(root)
  }

  async function closeModal(root: HTMLElement): Promise<void> {
    const i = stack.findIndex((m) => m.root === root)
    if (i === -1) return
    const [{ trigger }] = stack.splice(i, 1)
    const parts = root.querySelectorAll<HTMLElement>('[data-state]:not(.dw-progress-circle)')
    for (const p of parts) p.dataset.state = 'closed'
    await Promise.all([...parts].map(afterAnimation))
    root.hidden = true
    setInert(false)
    if (stack.length) setInert(true)
    unlockScroll()
    trigger?.focus()
  }

  function updateScrollShadow(root: Element): void {
    for (const body of root.querySelectorAll<HTMLElement>('.dw-dialog__body, .dw-side-sheet__body, .dw-bottom-sheet__body, .dw-popover__body')) {
      const overflow = body.scrollHeight - body.scrollTop - body.clientHeight > 1
      body.toggleAttribute('data-scrolled', body.scrollTop > 0)
      body.toggleAttribute('data-overflow', overflow)
      if (body.scrollHeight > body.clientHeight) body.tabIndex = 0
      else body.removeAttribute('tabindex')
    }
  }

  const target = (e: Event): Element => (e.target instanceof Element ? e.target : document.body)

  document.addEventListener('click', (e) => {
    const opener = target(e).closest<HTMLElement>('[data-dw-open]')
    if (opener) {
      const root = document.getElementById(opener.dataset.dwOpen ?? '')
      if (root) openModal(root, opener)
      return
    }
    const top = stack.at(-1)
    if (!top) return
    if (target(e).closest('[data-dw-close]')) return void closeModal(top.root)
    // 바깥(positioner 빈 곳·backdrop) 클릭
    const panel = top.root.querySelector('[role="dialog"], [role="alertdialog"]')
    if (panel && !panel.contains(target(e)) && top.root.dataset.dismissible !== 'false') closeModal(top.root)
  })

  document.addEventListener('keydown', (e) => {
    const top = stack.at(-1)
    if (!top) return
    if (e.key === 'Escape' && top.root.dataset.dismissible !== 'false') {
      e.preventDefault()
      closeModal(top.root)
    }
    if (e.key === 'Tab') {
      const panel = top.root.querySelector('[role="dialog"], [role="alertdialog"]')
      if (!panel) return
      const list = focusables(panel)
      if (!list.length) return e.preventDefault()
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  })

  document.addEventListener('scroll', (e) => {
    const root = target(e).closest('[data-dw="dialog"], [data-dw="side-sheet"], [data-dw="bottom-sheet"], .dw-popover')
    if (root) updateScrollShadow(root)
  }, true)

  /* ── Text Input: 루트 클릭 시 포커스, 지우기 버튼 ── */
  document.addEventListener('click', (e) => {
    const root = target(e).closest('.dw-text-input')
    if (!root) return
    const value = root.querySelector<HTMLInputElement | HTMLTextAreaElement>('.dw-text-input__value')
    if (!value) return
    const clear = target(e).closest('[data-dw-clear]')
    if (clear) {
      value.value = ''
      value.dispatchEvent(new Event('input', { bubbles: true }))
      value.focus()
      return
    }
    if (!target(e).closest('button, a, input, textarea')) value.focus()
  })

  /* ── Field: 글자 수, 지우기 버튼 노출 ── */
  document.addEventListener('input', (e) => {
    const value = target(e).closest<HTMLInputElement | HTMLTextAreaElement>('.dw-text-input__value')
    if (!value) return
    const root = value.closest('.dw-text-input')
    for (const btn of root?.querySelectorAll<HTMLElement>('[data-dw-clear]') ?? []) btn.hidden = value.value === ''
    const field = value.closest('.dw-field')
    const count = field?.querySelector('.dw-field__count b')
    if (count) {
      count.textContent = String(value.value.length)
      count.parentElement?.toggleAttribute('data-empty', value.value.length === 0)
    }
    // 이미 오류였던 필드는 입력마다 다시 검증한다
    if (field?.hasAttribute('data-invalid') && value.checkValidity()) {
      field.removeAttribute('data-invalid')
      value.removeAttribute('aria-invalid')
      value.setAttribute('aria-describedby', field.querySelector('.dw-field__description')?.id ?? '')
    }
  })

  /* ── 폼 제출 검증: 첫 오류 필드로 포커스 ── */
  document.addEventListener('submit', (e) => {
    const form = target(e)
    if (!form.matches('[data-dw-validate]')) return
    e.preventDefault()
    let firstInvalid: HTMLElement | null = null
    for (const field of form.querySelectorAll('.dw-field')) {
      const value = field.querySelector<HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('.dw-select__trigger, .dw-text-input__value, input, textarea, select')
      if (!value) continue
      const ok = value.matches('.dw-select__trigger') ? selectValid(value) : value.checkValidity()
      field.toggleAttribute('data-invalid', !ok)
      if (ok) {
        value.removeAttribute('aria-invalid')
        value.setAttribute('aria-describedby', field.querySelector('.dw-field__description')?.id ?? '')
      } else {
        value.setAttribute('aria-invalid', 'true')
        value.setAttribute('aria-describedby', field.querySelector('.dw-field__error')?.id ?? '')
        firstInvalid ??= value
      }
    }
    firstInvalid?.focus()
  })

  /* ── Checkbox: indeterminate 초기값, 전체 선택 ── */
  // data-dw-indeterminate: 서버가 그릴 수 없는 indeterminate 속성을 초기화한다
  // data-dw-check-all="<name>": 같은 name 체크박스 묶음의 전체 선택 상자
  const checkAllBoxes = (name: string): HTMLInputElement[] =>
    [...document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:not(:disabled):not([data-dw-check-all])')].filter((box) => box.name === name)

  function checkAllSync(all: HTMLInputElement): void {
    const boxes = checkAllBoxes(all.dataset.dwCheckAll ?? '')
    const on = boxes.filter((box) => box.checked).length
    all.checked = boxes.length > 0 && on === boxes.length
    all.indeterminate = on > 0 && on < boxes.length
  }

  document.addEventListener('change', (e) => {
    const box = target(e).closest<HTMLInputElement>('input[type="checkbox"]')
    if (!box) return
    if (box.dataset.dwCheckAll !== undefined) {
      for (const child of checkAllBoxes(box.dataset.dwCheckAll)) child.checked = box.checked
      return checkAllSync(box)
    }
    for (const all of document.querySelectorAll<HTMLInputElement>('[data-dw-check-all]')) {
      if (all.dataset.dwCheckAll === box.name) checkAllSync(all)
    }
  })

  /* ── Slider: --value 채움, 단위 있는 값 읽어 주기, 값 표시 ── */
  // data-dw-unit="%": aria-valuetext와 <output for="<slider id>">에 단위를 붙인다
  function sliderSync(slider: HTMLInputElement): void {
    const min = Number(slider.min || 0)
    const max = Number(slider.max || 100)
    slider.style.setProperty('--value', String(((Number(slider.value) - min) / (max - min || 1)) * 100))
    const unit = slider.dataset.dwUnit
    const text = `${slider.value}${unit ?? ''}`
    if (unit !== undefined) slider.setAttribute('aria-valuetext', text)
    if (!slider.id) return
    for (const output of document.querySelectorAll('output')) {
      if (output.htmlFor.contains(slider.id)) output.textContent = text
    }
  }

  document.addEventListener('input', (e) => {
    const slider = target(e).closest<HTMLInputElement>('.dw-slider')
    if (slider) sliderSync(slider)
  })

  /* ── Segmented Control: --count·--index 갱신 ── */
  function segmentedSync(root: HTMLElement): void {
    const radios = [...root.querySelectorAll<HTMLInputElement>('input[type="radio"]')]
    root.style.setProperty('--count', String(radios.length))
    root.style.setProperty('--index', String(Math.max(0, radios.findIndex((radio) => radio.checked))))
  }

  document.addEventListener('change', (e) => {
    const root = target(e).closest<HTMLElement>('.dw-segmented')
    if (root) segmentedSync(root)
  })

  /* ── 서버가 그린 폼 상태 동기화: 첫 로드, 뒤로 가기·새로고침 복원, 폼 초기화 ── */
  function formsSync(scope: ParentNode = document): void {
    for (const slider of scope.querySelectorAll<HTMLInputElement>('.dw-slider')) sliderSync(slider)
    for (const root of scope.querySelectorAll<HTMLElement>('.dw-segmented')) segmentedSync(root)
    for (const all of scope.querySelectorAll<HTMLInputElement>('[data-dw-check-all]')) checkAllSync(all)
  }

  function formsInit(): void {
    for (const box of document.querySelectorAll<HTMLInputElement>('[data-dw-indeterminate]')) box.indeterminate = true
    formsSync()
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', formsInit, { once: true })
  else formsInit()
  window.addEventListener('pageshow', () => formsSync())
  document.addEventListener('reset', (e) => {
    const form = target(e)
    setTimeout(() => {
      formsSync(form) // 브라우저가 값을 되돌린 뒤에 읽는다
      for (const root of form.querySelectorAll<HTMLElement>('.dw-select')) selectReset(root)
    })
  })

  /* ── Select: Select-Only Combobox (포커스는 Trigger에 머문다) ── */
  const SELECT_EDGE = 12 // Trigger 간격 4px + 화면 끝 여백 8px
  const SELECT_TYPE_RESET = 500 // 글자 입력을 한 검색어로 잇는 시간(ms)
  const SELECT_CLIPPED = '.dw-dialog__body, .dw-side-sheet__body, .dw-bottom-sheet__body, .dw-popover__body'
  const SELECT_INITIALS = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
  let selectActive: HTMLElement | null = null
  let selectTyped = ''
  let selectTypedAt = 0

  const selectParts = (root: Element) => ({
    trigger: root.querySelector('.dw-select__trigger') as HTMLButtonElement,
    content: root.querySelector('.dw-select__content') as HTMLElement,
  })
  const selectItems = (root: Element) => [...root.querySelectorAll<HTMLElement>('.dw-select__item')]
  const selectEnabled = (root: Element) => selectItems(root).filter((item) => item.getAttribute('aria-disabled') !== 'true')
  const selectHighlighted = (root: Element) => root.querySelector<HTMLElement>('.dw-select__item[data-highlighted]')
  const selectLabel = (item: Element) => item.querySelector('.dw-select__item-label')?.textContent?.trim() ?? ''
  // 완성형 한글의 초성 — 자음 하나만 쳐도 찾게 한다
  const selectInitial = (text: string): string => {
    const code = text.charCodeAt(0) - 0xac00
    return code >= 0 && code < 11172 ? SELECT_INITIALS[Math.floor(code / 588)] : ''
  }

  function selectHighlight(root: HTMLElement, item: HTMLElement | null, scroll = true): void {
    const { trigger, content } = selectParts(root)
    selectHighlighted(root)?.removeAttribute('data-highlighted')
    if (!item) return trigger.removeAttribute('aria-activedescendant')
    item.toggleAttribute('data-highlighted', true)
    item.id ||= `${content.id}-${selectItems(root).indexOf(item)}`
    trigger.setAttribute('aria-activedescendant', item.id)
    if (scroll) item.scrollIntoView({ block: 'nearest' })
  }

  function selectPlace(root: HTMLElement): void {
    const { trigger, content } = selectParts(root)
    const box = trigger.getBoundingClientRect()
    const below = window.innerHeight - box.bottom - SELECT_EDGE
    const above = box.top - SELECT_EDGE
    content.style.removeProperty('--dw-select-available')
    const up = content.offsetHeight > below && above > below
    if (up) content.dataset.side = 'top'
    else delete content.dataset.side
    content.style.setProperty('--dw-select-available', `${up ? above : below}px`)
    // 스크롤 영역(모달 본문 등) 안에서는 잘리지 않게 화면 기준으로 띄운다
    if (!root.closest(SELECT_CLIPPED)) return
    const gap = 'var(--dw-spacing-x1)'
    Object.assign(content.style, {
      position: 'fixed',
      left: `${box.left}px`,
      right: 'auto',
      width: `${box.width}px`,
      top: up ? 'auto' : `calc(${box.bottom}px + ${gap})`,
      bottom: up ? `calc(${window.innerHeight - box.top}px + ${gap})` : 'auto',
    })
  }

  // 필수 Select는 값이 있어야 한다 — hidden input은 브라우저가 검증하지 않는다
  function selectValid(trigger: Element): boolean {
    if (trigger.getAttribute('aria-required') !== 'true') return true
    return !!trigger.closest('.dw-select')?.querySelector<HTMLInputElement>('input[type="hidden"]')?.value
  }

  // hidden input은 폼 reset으로 되돌아오지 않아 처음 값을 기억했다가 돌려놓는다
  function selectReset(root: HTMLElement): void {
    const input = root.querySelector<HTMLInputElement>('input[type="hidden"]')
    const first = input?.dataset.dwDefault
    if (!input || first === undefined) return
    const item = selectItems(root).find((i) => (i.dataset.value ?? selectLabel(i)) === first)
    if (item) return selectChoose(root, item)
    input.value = first
    for (const other of selectItems(root)) other.setAttribute('aria-selected', 'false')
    const value = root.querySelector<HTMLElement>('.dw-select__value')
    if (value) {
      value.textContent = value.dataset.dwPlaceholder ?? ''
      value.toggleAttribute('data-placeholder', true)
    }
  }

  function selectOpen(root: HTMLElement): void {
    const { trigger, content } = selectParts(root)
    if (trigger.matches(':disabled, [aria-readonly="true"]')) return
    if (selectActive && selectActive !== root) selectClose(selectActive)
    selectActive = root
    content.removeAttribute('data-closing')
    content.hidden = false
    trigger.setAttribute('aria-expanded', 'true')
    selectPlace(root)
    const selected = root.querySelector<HTMLElement>('.dw-select__item[aria-selected="true"]:not([aria-disabled="true"])')
    selectHighlight(root, selected ?? selectEnabled(root)[0] ?? null)
    trigger.focus()
  }

  async function selectClose(root: HTMLElement): Promise<void> {
    const { trigger, content } = selectParts(root)
    if (selectActive === root) selectActive = null
    trigger.setAttribute('aria-expanded', 'false')
    selectHighlight(root, null)
    content.toggleAttribute('data-closing', true)
    await afterAnimation(content)
    if (!content.hasAttribute('data-closing')) return // 닫히는 사이 다시 열렸다
    content.removeAttribute('data-closing')
    content.hidden = true
  }

  function selectChoose(root: HTMLElement, item: HTMLElement): void {
    const { trigger } = selectParts(root)
    const label = selectLabel(item)
    for (const other of selectItems(root)) other.setAttribute('aria-selected', String(other === item))
    const value = root.querySelector<HTMLElement>('.dw-select__value')
    const input = root.querySelector<HTMLInputElement>('input[type="hidden"]')
    if (input) input.dataset.dwDefault ??= input.value
    if (value) {
      if (value.hasAttribute('data-placeholder')) value.dataset.dwPlaceholder ??= value.textContent ?? ''
      value.textContent = label
      value.removeAttribute('data-placeholder')
    }
    const next = item.dataset.value ?? label
    if (input && input.value !== next) {
      input.value = next
      input.dispatchEvent(new Event('change', { bubbles: true }))
    }
    // 이미 오류였던 필드는 고르는 순간 해제한다 (Text Input과 같다)
    const field = root.closest('.dw-field')
    if (field?.hasAttribute('data-invalid')) {
      field.removeAttribute('data-invalid')
      trigger.removeAttribute('aria-invalid')
      trigger.setAttribute('aria-describedby', field.querySelector('.dw-field__description')?.id ?? '')
    }
  }

  function selectType(root: HTMLElement, key: string): void {
    const now = Date.now()
    if (now - selectTypedAt > SELECT_TYPE_RESET) selectTyped = ''
    selectTypedAt = now
    selectTyped += key.toLowerCase()
    const items = selectEnabled(root)
    // 한 글자면 현재 다음부터 찾아 같은 글자를 반복해 누르면 돌아가게 한다
    const from = selectTyped.length === 1 ? items.indexOf(selectHighlighted(root) as HTMLElement) + 1 : 0
    const match = [...items.slice(from), ...items.slice(0, from)].find((item) => {
      const label = selectLabel(item).toLowerCase()
      return label.startsWith(selectTyped) || (selectTyped.length === 1 && selectInitial(label) === selectTyped)
    })
    if (match) selectHighlight(root, match)
  }

  document.addEventListener('click', (e) => {
    const el = target(e)
    const root = el.closest<HTMLElement>('[data-dw="select"]')
    if (selectActive && selectActive !== root) selectClose(selectActive)
    if (!root) return
    if (el.closest('.dw-select__trigger')) {
      if (root === selectActive) selectClose(root)
      else selectOpen(root)
      return
    }
    const item = el.closest<HTMLElement>('.dw-select__item')
    if (!item || item.getAttribute('aria-disabled') === 'true') return
    selectChoose(root, item)
    selectClose(root)
  })

  // 항목을 눌러도 포커스가 Trigger를 떠나지 않게 한다
  document.addEventListener('mousedown', (e) => {
    if (target(e).closest('.dw-select__content')) e.preventDefault()
  })

  document.addEventListener('pointermove', (e) => {
    const item = target(e).closest<HTMLElement>('.dw-select__item')
    if (!item || !selectActive?.contains(item) || item.hasAttribute('data-highlighted')) return
    if (item.getAttribute('aria-disabled') !== 'true') selectHighlight(selectActive, item, false)
  })

  // capture: 열린 Select의 Esc가 모달까지 닫지 않게 먼저 받는다
  document.addEventListener('keydown', (e) => {
    const root = target(e).closest('.dw-select__trigger')?.closest<HTMLElement>('[data-dw="select"]')
    if (!root) return
    const printable = e.key.length === 1 && e.key !== ' ' && !e.ctrlKey && !e.metaKey && !e.altKey

    if (root !== selectActive) {
      if (!printable && !['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) return
      e.preventDefault()
      selectOpen(root)
      if (printable && root === selectActive) selectType(root, e.key)
      return
    }

    const items = selectEnabled(root)
    const current = selectHighlighted(root)
    const at = current ? items.indexOf(current) : -1
    if (e.key === 'Tab') return void selectClose(root) // 기본 동작으로 다음 요소에 간다
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      return void selectClose(root)
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (current) selectChoose(root, current)
      return void selectClose(root)
    }
    const moves: Record<string, HTMLElement | undefined> = {
      ArrowDown: items[Math.min(at + 1, items.length - 1)],
      ArrowUp: items[Math.max(at - 1, 0)],
      Home: items[0],
      End: items.at(-1),
    }
    const next = moves[e.key]
    if (next) {
      e.preventDefault()
      selectHighlight(root, next)
    } else if (printable) {
      e.preventDefault()
      selectType(root, e.key)
    }
  }, true)

  /* ── Alert Dialog: 바깥을 눌러도 닫히지 않고, Esc는 취소 버튼을 누른 것과 같다 ── */
  const topAlertDialog = (): HTMLElement | null => {
    const root = stack.at(-1)?.root
    return root?.matches('[data-dw="alert-dialog"]') ? root : null
  }

  // 위쪽 모달 공통 리스너보다 먼저 받아야 해서 캡처 단계에서 끊는다
  document.addEventListener('click', (e) => {
    const root = topAlertDialog()
    if (root && !root.querySelector('[role="alertdialog"]')?.contains(target(e))) e.stopPropagation()
  }, true)

  function cancelAlertDialog(root: HTMLElement): void {
    const footer = root.querySelector('.dw-alert-dialog__footer')
    // 취소 버튼(data-dw-close), 없으면 Footer의 첫 버튼 — 1버튼 확인은 그 버튼 실행
    const button = footer?.querySelector<HTMLElement>('[data-dw-close]') ?? footer?.querySelector<HTMLElement>('button')
    button?.click()
  }

  /* ── Bottom Sheet: Handle·Header를 끌어 내려 닫기 ── */
  interface SheetDrag {
    root: HTMLElement
    content: HTMLElement
    backdrop: HTMLElement | null
    pointerId: number
    startY: number
    lastY: number
    lastTime: number
    speed: number
  }

  const SHEET_CLOSE_RATIO = 0.25 // 높이의 25% 이상 끌면 닫는다
  const SHEET_FLICK_SPEED = 0.5 // px/ms, 이보다 빠르게 튕기면 닫는다
  let sheetDrag: SheetDrag | null = null

  document.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || !target(e).closest('.dw-bottom-sheet__handle, .dw-bottom-sheet__header')) return
    if (target(e).closest('button, a, input, select, textarea')) return
    const content = target(e).closest<HTMLElement>('.dw-bottom-sheet__content')
    const root = content?.closest<HTMLElement>('.dw-bottom-sheet')
    if (!content || !root) return
    // Body가 스크롤된 상태면 끌기보다 스크롤이 우선이다
    if ((content.querySelector('.dw-bottom-sheet__body')?.scrollTop ?? 0) > 0) return
    content.setPointerCapture(e.pointerId)
    root.dataset.dragging = ''
    sheetDrag = {
      root,
      content,
      backdrop: root.querySelector('.dw-bottom-sheet__backdrop'),
      pointerId: e.pointerId,
      startY: e.clientY,
      lastY: e.clientY,
      lastTime: e.timeStamp,
      speed: 0,
    }
  })

  document.addEventListener('pointermove', (e) => {
    if (e.pointerId !== sheetDrag?.pointerId) return
    const { content, backdrop, startY, lastY, lastTime } = sheetDrag
    const moved = Math.max(0, e.clientY - startY) // 위로는 안 올라간다
    sheetDrag.speed = (e.clientY - lastY) / Math.max(1, e.timeStamp - lastTime)
    sheetDrag.lastY = e.clientY
    sheetDrag.lastTime = e.timeStamp
    content.style.transform = `translateY(${moved}px)`
    if (backdrop) backdrop.style.opacity = String(1 - moved / content.offsetHeight)
  })

  async function endSheetDrag(e: PointerEvent): Promise<void> {
    if (e.pointerId !== sheetDrag?.pointerId) return
    const { root, content, backdrop, startY, speed } = sheetDrag
    sheetDrag = null
    delete root.dataset.dragging
    const moved = Math.max(0, e.clientY - startY)
    const shouldClose = e.type === 'pointerup' && (moved >= content.offsetHeight * SHEET_CLOSE_RATIO || speed > SHEET_FLICK_SPEED)
    if (shouldClose) await closeModal(root)
    content.style.transform = ''
    backdrop?.style.removeProperty('opacity')
  }

  document.addEventListener('pointerup', endSheetDrag)
  document.addEventListener('pointercancel', endSheetDrag)

  /* ── 팝업 위치 지정·숨기기 (Popover · Dropdown Menu · Tooltip 공용) ── */
  const FLOATING_MARGIN = 8
  const OPPOSITE: Record<string, string> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }

  // placement는 'top' 또는 'bottom-start'처럼 쓴다. 자리가 모자라면 뒤집고 화면 안으로 민다.
  // 실제 자리는 data-placed, 남은 높이는 --dw-floating-available, Trigger 가운데는 --dw-floating-anchor로 남긴다.
  function placeFloating(el: HTMLElement, anchor: HTMLElement, placement: string, gap: number): void {
    el.style.removeProperty('--dw-floating-available')
    const a = anchor.getBoundingClientRect()
    const w = el.offsetWidth
    const h = el.offsetHeight
    const viewW = document.documentElement.clientWidth
    const viewH = window.innerHeight
    const room: Record<string, number> = {
      top: a.top - gap - FLOATING_MARGIN,
      bottom: viewH - a.bottom - gap - FLOATING_MARGIN,
      left: a.left - gap - FLOATING_MARGIN,
      right: viewW - a.right - gap - FLOATING_MARGIN,
    }
    let [side, align] = placement.split('-')
    const vertical = side === 'top' || side === 'bottom'
    if ((vertical ? h : w) > room[side] && room[OPPOSITE[side]] > room[side]) side = OPPOSITE[side]
    if (align === 'start' && a.left + w > viewW - FLOATING_MARGIN && a.right - w >= FLOATING_MARGIN) align = 'end'
    else if (align === 'end' && a.right - w < FLOATING_MARGIN && a.left + w <= viewW - FLOATING_MARGIN) align = 'start'

    const height = vertical ? Math.min(h, room[side]) : h
    let x: number
    let y: number
    if (vertical) {
      x = align === 'start' ? a.left : align === 'end' ? a.right - w : a.left + (a.width - w) / 2
      y = side === 'top' ? a.top - gap - height : a.bottom + gap
    } else {
      x = side === 'left' ? a.left - gap - w : a.right + gap
      y = a.top + (a.height - h) / 2
    }
    x = Math.max(FLOATING_MARGIN, Math.min(x, viewW - w - FLOATING_MARGIN))
    y = Math.max(FLOATING_MARGIN, Math.min(y, viewH - height - FLOATING_MARGIN))

    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.dataset.placed = align ? `${side}-${align}` : side
    if (vertical) el.style.setProperty('--dw-floating-available', `${room[side]}px`)
    el.style.setProperty('--dw-floating-anchor', vertical ? `${a.left + a.width / 2 - x}px` : `${a.top + a.height / 2 - y}px`)
  }

  // data-state를 남기지 않는다 — 모달 안의 팝업에 남아 있으면 closeModal이 끝나지 않는 애니메이션을 기다린다
  function hideFloating(el: HTMLElement): void {
    el.hidden = true
    delete el.dataset.state
  }

  function hideFloatingAfterAnimation(el: HTMLElement): void {
    afterAnimation(el).then(() => {
      if (el.dataset.state === 'closed') hideFloating(el)
    })
  }

  /* ── Popover · Dropdown Menu 공통: 한 번에 하나만 열린다 ── */
  interface OpenPopup {
    el: HTMLElement
    trigger: HTMLElement
  }

  let popup: OpenPopup | null = null
  const POPUP_GAP = 4
  const POPUP_TRIGGER = '[data-dw-popover], [data-dw-menu]'
  const isNarrow = () => matchMedia('(max-width: 767px)').matches
  const popupOf = (trigger: HTMLElement) => document.getElementById(trigger.dataset.dwPopover ?? trigger.dataset.dwMenu ?? '')
  const menuItems = (menu: Element): HTMLElement[] =>
    [...menu.querySelectorAll<HTMLElement>('.dw-menu__item')].filter((item) => !item.matches(':disabled, [aria-disabled="true"]'))

  function focusPopup(el: HTMLElement, last: boolean): void {
    const items = el.matches('.dw-menu') ? menuItems(el) : null
    const first = items ? (last ? items.at(-1) : items[0]) : el.querySelector<HTMLElement>('[data-dw-autofocus]') ?? focusables(el)[0]
    ;(first ?? el).focus({ preventScroll: true })
  }

  function closePopup(returnFocus: boolean): void {
    if (!popup) return
    const { el, trigger } = popup
    popup = null
    trigger.setAttribute('aria-expanded', 'false')
    el.dataset.state = 'closed'
    hideFloatingAfterAnimation(el)
    if (returnFocus) trigger.focus({ preventScroll: true })
  }

  // 768px 미만: 팝업을 Bottom Sheet 안으로 옮겨 열고, 시트가 닫히면 제자리로 돌려놓는다
  function openInSheet(el: HTMLElement, trigger: HTMLElement, last: boolean): void {
    const sheet = document.createElement('div')
    sheet.className = 'dw-bottom-sheet'
    sheet.dataset.dw = 'bottom-sheet'
    sheet.hidden = true
    sheet.innerHTML = '<div class="dw-bottom-sheet__backdrop" data-dw-close data-state="closed"></div>'
      + '<div class="dw-bottom-sheet__content" role="dialog" aria-modal="true" tabindex="-1" data-state="closed">'
      + '<div class="dw-bottom-sheet__handle" aria-hidden="true"></div></div>'
    const content = sheet.querySelector<HTMLElement>('.dw-bottom-sheet__content')
    if (!content) return
    for (const name of ['aria-label', 'aria-labelledby']) {
      const value = el.getAttribute(name)
      if (value) content.setAttribute(name, value)
    }

    const place = document.createComment('')
    const role = el.getAttribute('role')
    const width = el.style.width
    const items = el.querySelectorAll<HTMLElement>('.dw-menu__item')
    el.replaceWith(place)
    if (role === 'dialog') el.removeAttribute('role') // Content가 대화상자 역할을 맡는다
    el.style.width = ''
    delete el.dataset.state
    el.hidden = false
    for (const item of items) item.tabIndex = 0 // 시트 안에서는 Tab으로도 돈다
    content.append(el)
    trigger.setAttribute('aria-expanded', 'true')

    const observer = new MutationObserver(() => {
      if (!sheet.hidden) return
      observer.disconnect()
      for (const item of items) item.tabIndex = -1
      if (role) el.setAttribute('role', role)
      el.style.width = width
      el.hidden = true
      place.replaceWith(el)
      sheet.remove()
      trigger.setAttribute('aria-expanded', 'false')
    })
    observer.observe(sheet, { attributes: true, attributeFilter: ['hidden'] })

    openModal(sheet, trigger)
    if (last) focusPopup(el, true)
  }

  function openPopup(el: HTMLElement, trigger: HTMLElement, last = false): void {
    closePopup(false)
    if (isNarrow()) return openInSheet(el, trigger, last)
    popup = { el, trigger }
    el.hidden = false
    el.dataset.state = 'open'
    trigger.setAttribute('aria-expanded', 'true')
    placeFloating(el, trigger, el.dataset.placement ?? 'bottom-start', POPUP_GAP)
    updateScrollShadow(el)
    focusPopup(el, last)
  }

  // Tab으로 벗어날 때: 닫고 Trigger 다음 요소로 (popup 자신은 건너뛴다)
  function focusAfterTrigger(el: HTMLElement, trigger: HTMLElement): void {
    const scope = stack.at(-1)?.root ?? document.body
    const list = focusables(scope).filter((item) => item.tabIndex >= 0 && !el.contains(item))
    ;(list[list.indexOf(trigger) + 1] ?? trigger).focus()
  }

  // data-dw-close: 모달 안에 뜬 팝업이어도 팝업만 닫는다 (모달 공통 리스너보다 먼저 받는다)
  document.addEventListener('click', (e) => {
    if (!popup?.el.contains(target(e)) || !target(e).closest('[data-dw-close]')) return
    e.stopPropagation()
    closePopup(true)
  }, true)

  document.addEventListener('click', (e) => {
    const trigger = target(e).closest<HTMLElement>(POPUP_TRIGGER)
    if (trigger) {
      const el = popupOf(trigger)
      if (!el) return
      if (popup?.el === el) closePopup(true)
      else openPopup(el, trigger)
      return
    }
    // 메뉴 항목 실행: 닫고 Trigger로. 항목이 모달을 열었다면 그 모달의 복귀 대상을 Trigger로 넘긴다
    const item = target(e).closest<HTMLElement>('.dw-menu__item')
    const menu = item?.closest<HTMLElement>('.dw-menu')
    if (item && menu && !item.matches('[aria-disabled="true"]')) {
      const opened = stack.find((m) => m.trigger === item)
      const inSheet = stack.find((m) => m.root.contains(menu) && m.root.matches('.dw-bottom-sheet'))
      if (opened) opened.trigger = popup?.trigger ?? inSheet?.trigger ?? null
      if (inSheet) closeModal(inSheet.root)
      else if (popup?.el === menu) closePopup(!opened)
      return
    }
    // 바깥 클릭: 다른 곳에 포커스가 갔으면 빼앗지 않는다
    if (popup && !popup.el.contains(target(e))) {
      const active = document.activeElement
      closePopup(!active || active === document.body || popup.el.contains(active))
    }
  })

  document.addEventListener('keydown', (e) => {
    const trigger = target(e).closest<HTMLElement>('[data-dw-menu]')
    if (trigger && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      const el = popupOf(trigger)
      if (!el) return
      e.preventDefault()
      openPopup(el, trigger, e.key === 'ArrowUp')
      return
    }
    const menu = target(e).closest('.dw-menu')
    if (!menu || e.ctrlKey || e.metaKey || e.altKey) return
    const items = menuItems(menu)
    if (!items.length) return
    const current = items.indexOf(document.activeElement as HTMLElement)
    let next: HTMLElement | undefined
    if (e.key === 'ArrowDown') next = items[(current + 1) % items.length]
    else if (e.key === 'ArrowUp') next = items[(current - 1 + items.length) % items.length]
    else if (e.key === 'Home') next = items[0]
    else if (e.key === 'End') next = items.at(-1)
    else if (e.key.length === 1 && e.key !== ' ') {
      // 문자: 현재 다음 항목부터 그 글자로 시작하는 항목을 찾는다
      const key = e.key.toLowerCase()
      const order = [...items.slice(current + 1), ...items.slice(0, current + 1)]
      next = order.find((item) => item.querySelector('.dw-menu__item-label')?.textContent?.trim().toLowerCase().startsWith(key))
    }
    if (!next) return
    e.preventDefault()
    next.focus()
  })

  // Tab이 끝을 지나면 닫는다. 모달 트랩보다 먼저 받는다
  function tabOutOfPopup(e: KeyboardEvent): void {
    if (!popup || !popup.el.contains(document.activeElement)) return
    const { el, trigger } = popup
    const list = el.matches('.dw-menu') ? [] : focusables(el)
    const leaving = e.shiftKey
      ? !list.length || document.activeElement === list[0] || document.activeElement === el
      : !list.length || document.activeElement === list.at(-1)
    if (!leaving) return
    e.preventDefault()
    e.stopPropagation()
    closePopup(false)
    if (e.shiftKey) trigger.focus()
    else focusAfterTrigger(el, trigger)
  }

  // Trigger를 따라 움직이고, Trigger가 화면 밖으로 나가면 닫는다
  function followTriggers(e: Event): void {
    if (popup && !popup.el.contains(target(e))) {
      const { el, trigger } = popup
      const a = trigger.getBoundingClientRect()
      const outside = a.bottom < 0 || a.top > window.innerHeight || a.right < 0 || a.left > document.documentElement.clientWidth
      if (outside) closePopup(el.contains(document.activeElement))
      else placeFloating(el, trigger, el.dataset.placement ?? 'bottom-start', POPUP_GAP)
    }
    if (tip) placeFloating(tip.el, tip.trigger, tip.el.dataset.placement ?? 'top', TOOLTIP_GAP)
  }

  document.addEventListener('scroll', followTriggers, true)
  window.addEventListener('resize', followTriggers)

  /* ── Tooltip: hover 300ms·키보드 포커스 즉시, 옆 Trigger로는 대기 없이 교체 ── */
  const TOOLTIP_GAP = 12 // Trigger와 4px + 꼬리 8px
  const TOOLTIP_OPEN_DELAY = 300
  const TOOLTIP_CLOSE_DELAY = 100
  const TOOLTIP_TRIGGER = '[data-dw-tooltip]'
  let tip: OpenPopup | null = null
  let tipOpenTimer = 0
  let tipCloseTimer = 0
  const canHover = () => matchMedia('(hover: hover) and (pointer: fine)').matches

  function hideTooltip(instant = false): void {
    clearTimeout(tipOpenTimer)
    clearTimeout(tipCloseTimer)
    if (!tip) return
    const { el } = tip
    tip = null
    if (instant) return hideFloating(el)
    el.dataset.state = 'closed'
    hideFloatingAfterAnimation(el)
  }

  function showTooltip(trigger: HTMLElement, instant: boolean): void {
    clearTimeout(tipOpenTimer)
    clearTimeout(tipCloseTimer)
    const el = document.getElementById(trigger.dataset.dwTooltip ?? '')
    if (!el || tip?.el === el) return
    hideTooltip(true)
    tip = { el, trigger }
    el.hidden = false
    el.toggleAttribute('data-instant', instant)
    el.dataset.state = 'open'
    placeFloating(el, trigger, el.dataset.placement ?? 'top', TOOLTIP_GAP)
  }

  document.addEventListener('pointerover', (e) => {
    if (e.pointerType === 'touch' || !canHover()) return
    // 포인터가 Trigger에서 Content로 옮겨 가도 닫지 않는다
    if (tip && target(e).closest('.dw-tooltip') === tip.el) return clearTimeout(tipCloseTimer)
    const trigger = target(e).closest<HTMLElement>(TOOLTIP_TRIGGER)
    if (!trigger) return
    clearTimeout(tipCloseTimer)
    if (tip?.trigger === trigger) return
    if (tip) showTooltip(trigger, true)
    else {
      clearTimeout(tipOpenTimer)
      tipOpenTimer = window.setTimeout(() => showTooltip(trigger, false), TOOLTIP_OPEN_DELAY)
    }
  })

  document.addEventListener('pointerout', (e) => {
    const from = target(e).closest(`${TOOLTIP_TRIGGER}, .dw-tooltip`)
    if (!from) return
    if (e.relatedTarget instanceof Element && from.contains(e.relatedTarget)) return
    clearTimeout(tipOpenTimer)
    if (tip && !tip.trigger.matches(':focus-visible')) tipCloseTimer = window.setTimeout(hideTooltip, TOOLTIP_CLOSE_DELAY)
  })

  document.addEventListener('focusin', (e) => {
    const trigger = target(e).closest<HTMLElement>(TOOLTIP_TRIGGER)
    if (trigger?.matches(':focus-visible')) showTooltip(trigger, tip !== null)
  })

  document.addEventListener('focusout', (e) => {
    if (tip && target(e).closest(TOOLTIP_TRIGGER) === tip.trigger) hideTooltip()
  })

  /* ── Toast: 한 번에 하나, hover·포커스 동안 타이머 정지 ── */
  interface ToastOptions {
    message: string
    variant?: 'default' | 'positive' | 'critical'
    action?: string
    duration?: number
    onAction?: () => void
  }

  interface OpenToast {
    el: HTMLElement
    remaining: number
    startedAt: number
    timer: number
    returnTo: HTMLElement | null
    onAction?: () => void
  }

  const TOAST_ICONS: Record<string, string> = { positive: 'circle-check', critical: 'circle-alert' }
  let toast: OpenToast | null = null

  function closeToast(immediate = false): void {
    if (!toast) return
    const { el, timer, returnTo } = toast
    toast = null
    clearTimeout(timer)
    if (el.contains(document.activeElement)) returnTo?.focus()
    if (immediate) return el.remove()
    el.dataset.state = 'closed'
    afterAnimation(el).then(() => el.remove())
  }

  function trackToast(el: HTMLElement, duration: number, onAction?: () => void): void {
    const returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null
    toast = { el, remaining: duration, startedAt: Date.now(), timer: 0, returnTo, onAction }
    toast.timer = window.setTimeout(() => closeToast(), duration)
    syncToastTimer()
  }

  function syncToastTimer(): void {
    if (!toast) return
    const hold = toast.el.matches(':hover') || toast.el.contains(document.activeElement)
    if (hold && toast.timer) {
      clearTimeout(toast.timer)
      toast.timer = 0
      toast.remaining -= Date.now() - toast.startedAt
    } else if (!hold && !toast.timer) {
      toast.startedAt = Date.now()
      toast.timer = window.setTimeout(() => closeToast(), toast.remaining)
    }
  }

  function showToast({ message, variant = 'default', action, duration, onAction }: ToastOptions): void {
    closeToast(true)
    let region = document.querySelector('.dw-toast-region')
    if (!region) {
      region = document.createElement('div')
      region.className = 'dw-toast-region'
      region.setAttribute('role', 'region')
      region.setAttribute('aria-label', '알림')
      document.body.append(region)
    }
    region.replaceChildren() // 닫히는 중인 이전 Toast도 바로 뺀다

    const el = document.createElement('div')
    el.className = `dw-toast dw-toast--${variant}`
    el.setAttribute('role', variant === 'critical' ? 'alert' : 'status')
    el.dataset.state = 'open'
    const icon = TOAST_ICONS[variant]
    el.innerHTML = `${icon ? `<svg class="dw-toast__icon" aria-hidden="true"><use href="#i-${icon}"/></svg>` : ''}<div class="dw-toast__content"><p class="dw-toast__message"></p></div>`
    const content = el.querySelector('.dw-toast__content')
    const text = el.querySelector('.dw-toast__message')
    if (text) text.textContent = message
    if (action) {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'dw-toast__action'
      button.textContent = action
      content?.append(button)
    }
    region.append(el)
    trackToast(el, duration ?? (action ? 6000 : 4000), onAction)
  }

  document.addEventListener('click', (e) => {
    const opener = target(e).closest<HTMLElement>('[data-dw-toast]')
    if (opener) {
      const { dwToast, toastVariant, toastAction, toastDuration } = opener.dataset
      showToast({
        message: dwToast ?? '',
        variant: toastVariant as ToastOptions['variant'],
        action: toastAction,
        duration: toastDuration ? Number(toastDuration) : undefined,
      })
      return
    }
    if (toast && target(e).closest('.dw-toast__action') && toast.el.contains(target(e))) {
      toast.onAction?.()
      closeToast()
    }
  })

  for (const type of ['pointerover', 'pointerout', 'focusin', 'focusout']) document.addEventListener(type, syncToastTimer)

  // 서버가 그려 둔 Toast(플래시 메시지)도 같은 타이머로 닫는다
  function initServerToast(): void {
    const el = document.querySelector<HTMLElement>('.dw-toast-region .dw-toast')
    if (!el || toast) return
    const fallback = el.querySelector('.dw-toast__action') ? 6000 : 4000
    trackToast(el, Number(el.dataset.duration) || fallback)
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initServerToast)
  else initServerToast()

  /* ── Esc·Tab: 맨 위 것부터 닫도록 모달 공통 리스너보다 먼저 받는다 ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') return tabOutOfPopup(e)
    if (e.key !== 'Escape' || e.isComposing) return
    const handled = () => {
      e.preventDefault()
      e.stopPropagation()
    }
    const alert = topAlertDialog()
    if (tip) {
      hideTooltip()
      handled()
    } else if (popup) {
      closePopup(true)
      handled()
    } else if (toast?.el.contains(document.activeElement)) {
      closeToast()
      handled()
    } else if (alert) {
      cancelAlertDialog(alert)
      handled()
    }
  }, true)

  /* ── 공통: 접고 펴는 패널 (Accordion · Side Navigation 하위 메뉴) ── */
  // height·opacity 전환 뒤 닫힌 패널은 hidden으로 Tab 순서에서 뺀다. 모션 줄이기면 투명도만 바꾼다
  function setDisclosurePanel(panel: HTMLElement, open: boolean): void {
    const fromHeight = panel.hidden ? 0 : panel.getBoundingClientRect().height
    const fromOpacity = panel.hidden ? 0 : Number(getComputedStyle(panel).opacity)
    for (const animation of panel.getAnimations()) animation.cancel()
    panel.hidden = false
    const style = getComputedStyle(panel)
    const opacity = [fromOpacity, open ? 1 : 0]
    const height = [`${fromHeight}px`, `${open ? panel.scrollHeight : 0}px`]
    const animation = panel.animate(reducedMotion() ? { opacity } : { height, opacity }, {
      duration: parseFloat(style.getPropertyValue('--dw-duration-d4')),
      easing: style.getPropertyValue('--dw-easing-easing').trim(),
    })
    animation.finished.then(() => { panel.hidden = !open }, () => {})
  }

  /* ── Tabs: 자동 활성화, roving tabindex, Indicator 위치 ── */
  function placeTabsIndicator(list: Element): void {
    const tab = list.querySelector<HTMLElement>('.dw-tabs__trigger[aria-selected="true"]')
    const indicator = list.querySelector<HTMLElement>('.dw-tabs__indicator')
    if (!tab || !indicator) return
    indicator.style.setProperty('--dw-tabs-indicator-left', `${tab.offsetLeft}px`)
    indicator.style.setProperty('--dw-tabs-indicator-width', `${tab.offsetWidth}px`)
  }

  function selectTab(tab: HTMLElement): void {
    const list = tab.closest('.dw-tabs__list')
    if (!list) return
    for (const other of list.querySelectorAll<HTMLElement>('.dw-tabs__trigger')) {
      const selected = other === tab
      other.setAttribute('aria-selected', String(selected))
      other.tabIndex = selected ? 0 : -1
      const panel = document.getElementById(other.getAttribute('aria-controls') ?? '')
      if (panel) panel.hidden = !selected
    }
    placeTabsIndicator(list)
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' })
  }

  document.addEventListener('click', (e) => {
    const tab = target(e).closest<HTMLButtonElement>('.dw-tabs__trigger')
    if (tab && !tab.disabled) selectTab(tab)
  })

  document.addEventListener('keydown', (e) => {
    const tab = target(e).closest<HTMLElement>('.dw-tabs__trigger')
    if (!tab || e.altKey || e.ctrlKey || e.metaKey) return
    const tabs = [...(tab.closest('.dw-tabs__list')?.querySelectorAll<HTMLButtonElement>('.dw-tabs__trigger:not(:disabled)') ?? [])]
    const i = tabs.indexOf(tab as HTMLButtonElement)
    const moves: Record<string, HTMLButtonElement | undefined> = {
      ArrowRight: tabs[(i + 1) % tabs.length],
      ArrowLeft: tabs[(i - 1 + tabs.length) % tabs.length],
      Home: tabs[0],
      End: tabs.at(-1),
    }
    const next = moves[e.key]
    if (!next) return
    e.preventDefault()
    selectTab(next)
    next.focus({ preventScroll: true })
  })

  const tabsObserver = new ResizeObserver((entries) => {
    for (const entry of entries) placeTabsIndicator(entry.target)
  })

  /* ── Pagination: 보이는 숫자 계산, 640 미만 5칸, 버튼형 페이지 전환 ── */
  // data-dw="pagination" data-page data-total [data-siblings] [data-href="?page={page}"] [data-focus="<id>"]
  // data-href가 있으면 링크, 없으면 버튼으로 그리고 전환 때 dw:pagechange를 보낸다
  const paginationNarrow = matchMedia('(max-width: 639px)')

  function paginationRange(page: number, total: number, siblings: number): Array<number | null> {
    const slots = 5 + siblings * 2
    const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i)
    if (total <= slots) return range(1, total)
    if (page - siblings <= 3) return [...range(1, slots - 2), null, total]
    if (page + siblings >= total - 2) return [1, null, ...range(total - slots + 3, total)]
    return [1, null, ...range(page - siblings, page + siblings), null, total]
  }

  function renderPagination(root: HTMLElement): void {
    const list = root.querySelector('.dw-pagination__list')
    if (!list) return
    const total = Number(root.dataset.total)
    const page = Math.min(Math.max(Number(root.dataset.page) || 1, 1), total)
    const siblings = paginationNarrow.matches ? 0 : Number(root.dataset.siblings ?? 1)
    const hadFocus = root.contains(document.activeElement)
    root.hidden = total <= 1

    const cell = (className: string, n: number, disabled = false): HTMLElement => {
      const el = document.createElement(root.dataset.href ? 'a' : 'button')
      el.className = className
      if (el instanceof HTMLButtonElement) {
        el.type = 'button'
        el.dataset.page = String(n)
      } else if (!disabled) {
        el.setAttribute('href', (root.dataset.href ?? '').replace('{page}', String(n)))
      }
      if (disabled) el.setAttribute('aria-disabled', 'true')
      return el
    }
    const nav = (n: number, label: string, icon: string, disabled: boolean): HTMLElement => {
      const el = cell('dw-pagination__nav', n, disabled)
      el.setAttribute('aria-label', label)
      el.innerHTML = `<svg aria-hidden="true"><use href="#i-${icon}"/></svg>`
      return el
    }
    const number = (n: number | null): HTMLElement => {
      if (n === null) {
        const gap = document.createElement('span')
        gap.className = 'dw-pagination__ellipsis'
        gap.setAttribute('aria-hidden', 'true')
        gap.textContent = '…'
        return gap
      }
      const el = cell('dw-pagination__page', n)
      el.textContent = String(n)
      el.setAttribute('aria-label', `${n}페이지`)
      if (n === page) el.setAttribute('aria-current', 'page')
      return el
    }
    const cells = [
      nav(page - 1, '이전 페이지', 'chevron-left', page === 1),
      ...paginationRange(page, total, siblings).map(number),
      nav(page + 1, '다음 페이지', 'chevron-right', page === total),
    ]
    list.replaceChildren(...cells.map((el) => {
      const li = document.createElement('li')
      li.append(el)
      return li
    }))
    if (hadFocus) root.querySelector<HTMLElement>('[aria-current="page"]')?.focus()
  }

  document.addEventListener('click', (e) => {
    const button = target(e).closest<HTMLButtonElement>('[data-dw="pagination"] button[data-page]')
    const root = button?.closest<HTMLElement>('[data-dw="pagination"]')
    if (!button || !root || button.getAttribute('aria-disabled') === 'true') return
    root.dataset.page = button.dataset.page
    renderPagination(root)
    root.dispatchEvent(new CustomEvent('dw:pagechange', { bubbles: true, detail: { page: Number(root.dataset.page) } }))
    // 페이지를 바꾸면 목록 맨 위로 — 포커스는 목록 제목(또는 표)으로
    const heading = document.getElementById(root.dataset.focus ?? '')
    heading?.focus({ preventScroll: true })
    heading?.scrollIntoView({ block: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' })
  })

  paginationNarrow.addEventListener('change', () => {
    for (const root of document.querySelectorAll<HTMLElement>('[data-dw="pagination"]')) renderPagination(root)
  })

  /* ── Top Navigation: 가운데 제목 여백, 스크롤 선 ── */
  function placeTopbarTitle(bar: Element): void {
    const box = bar.getBoundingClientRect()
    const left = bar.querySelector(':scope > .dw-topbar__left')?.getBoundingClientRect().right ?? box.left
    const right = bar.querySelector(':scope > .dw-topbar__right')?.getBoundingClientRect().left ?? box.right
    const edge = parseFloat(getComputedStyle(bar).paddingLeft)
    ;(bar as HTMLElement).style.setProperty('--dw-topbar-title-inset', `${Math.max(left - box.left, box.right - right, edge)}px`)
  }

  function topbarScroller(bar: Element): Element {
    for (let el = bar.parentElement; el && el !== document.body; el = el.parentElement) {
      if (/auto|scroll/.test(getComputedStyle(el).overflowY)) return el
    }
    return document.documentElement
  }

  const topbarObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const bar = entry.target.closest('.dw-topbar')
      if (bar) placeTopbarTitle(bar)
    }
  })

  document.addEventListener('scroll', (e) => {
    const scroller = e.target instanceof Element ? e.target : document.documentElement
    if (scroller.matches('.dw-sidenav__content')) scroller.toggleAttribute('data-scrolled', scroller.scrollTop > 0)
    for (const bar of document.querySelectorAll('.dw-topbar')) {
      if (topbarScroller(bar) === scroller) bar.toggleAttribute('data-scrolled', scroller.scrollTop > 0)
    }
  }, true)

  /* ── Side Navigation: 접기/펼치기, 하위 메뉴, 접힘 Tooltip, 서랍 ── */
  // data-dw="sidenav"를 붙인 메뉴만 접힘 상태를 기억하고 너비별 기본값(1280 미만 접힘)을 따른다
  const SIDENAV_STORAGE_KEY = 'dw-sidenav-state'
  const sidenavTooltips = new WeakMap<Element, string>()
  let sidenavTooltipCount = 0

  const readSidenavState = (): string | null => {
    try {
      return localStorage.getItem(SIDENAV_STORAGE_KEY)
    } catch {
      return null
    }
  }

  const saveSidenavState = (state: string): void => {
    try {
      localStorage.setItem(SIDENAV_STORAGE_KEY, state)
    } catch {
      // 저장소가 막혀 있으면 이번 화면에서만 유지한다
    }
  }

  // 접혔을 때만 data-dw-tooltip을 달아 Tooltip 동작이 라벨을 오른쪽에 띄우게 한다
  function syncSidenavTooltips(nav: Element, collapsed: boolean): void {
    for (const item of nav.querySelectorAll<HTMLElement>('.dw-sidenav__item:not(.dw-sidenav__panel *)')) {
      if (!collapsed) {
        item.removeAttribute('data-dw-tooltip')
        continue
      }
      let id = sidenavTooltips.get(item)
      if (!id) {
        id = `sidenav-tooltip-${++sidenavTooltipCount}`
        sidenavTooltips.set(item, id)
        const tooltip = document.createElement('div')
        tooltip.className = 'dw-tooltip'
        tooltip.id = id
        tooltip.setAttribute('role', 'tooltip')
        tooltip.dataset.placement = 'right'
        tooltip.hidden = true
        tooltip.innerHTML = '<p class="dw-tooltip__description"></p><svg class="dw-tooltip__arrow" viewBox="0 0 12 8" aria-hidden="true"><path d="M0 0h12L6 8z"/></svg>'
        const description = tooltip.querySelector('p')
        if (description) description.textContent = item.querySelector('.dw-sidenav__item-label')?.textContent ?? ''
        document.body.append(tooltip)
      }
      item.dataset.dwTooltip = id
    }
  }

  function setSidenavState(nav: HTMLElement, state: string): void {
    const collapsed = state === 'collapsed'
    nav.dataset.state = state
    const trigger = nav.querySelector(':scope > .dw-sidenav__trigger')
    trigger?.setAttribute('aria-expanded', String(!collapsed))
    trigger?.setAttribute('aria-label', collapsed ? '메뉴 펼치기' : '메뉴 접기')
    syncSidenavTooltips(nav, collapsed)
  }

  document.addEventListener('click', (e) => {
    const nav = target(e).closest<HTMLElement>('.dw-sidenav')
    if (!nav) return
    if (target(e).closest('.dw-sidenav__trigger')) {
      const state = nav.dataset.state === 'collapsed' ? 'expanded' : 'collapsed'
      setSidenavState(nav, state)
      if (nav.dataset.dw === 'sidenav') saveSidenavState(state)
      return
    }
    const parent = target(e).closest('.dw-sidenav__item--parent')
    if (parent) {
      // 접힘에서 누르면 하위 메뉴를 보여 줄 자리가 없으니 먼저 펼친다
      const collapsed = nav.dataset.state === 'collapsed'
      if (collapsed) setSidenavState(nav, 'expanded')
      const open = collapsed || parent.getAttribute('aria-expanded') !== 'true'
      parent.setAttribute('aria-expanded', String(open))
      const panel = document.getElementById(parent.getAttribute('aria-controls') ?? '')
      if (panel) setDisclosurePanel(panel, open)
      return
    }
    // 서랍에서 링크를 누르면 닫는다
    const drawer = target(e).closest('a.dw-sidenav__item') && nav.closest<HTMLElement>('[data-dw="side-sheet"]')
    if (drawer) closeModal(drawer)
  })

  /* ── Accordion: 펼치기/접기, data-single이면 하나만 ── */
  function setAccordionItem(trigger: Element, open: boolean): void {
    trigger.setAttribute('aria-expanded', String(open))
    const panel = document.getElementById(trigger.getAttribute('aria-controls') ?? '')
    if (panel) setDisclosurePanel(panel, open)
  }

  document.addEventListener('click', (e) => {
    const trigger = target(e).closest<HTMLButtonElement>('.dw-accordion__trigger')
    if (!trigger || trigger.disabled) return
    const open = trigger.getAttribute('aria-expanded') !== 'true'
    const root = trigger.closest('[data-dw="accordion"]')
    if (open && root?.hasAttribute('data-single')) {
      for (const other of root.querySelectorAll('.dw-accordion__trigger[aria-expanded="true"]')) setAccordionItem(other, false)
    }
    setAccordionItem(trigger, open)
  })

  /* ── 초기화: Tabs Indicator · Pagination · Top Navigation · Side Navigation ── */
  function initNavigation(): void {
    for (const list of document.querySelectorAll<HTMLElement>('.dw-tabs__list')) {
      placeTabsIndicator(list)
      tabsObserver.observe(list)
      requestAnimationFrame(() => { list.dataset.ready = '' })
    }
    // 웹폰트가 늦게 오면 탭 폭이 바뀐다
    document.fonts.ready.then(() => {
      for (const list of document.querySelectorAll('.dw-tabs__list')) placeTabsIndicator(list)
    })
    for (const root of document.querySelectorAll<HTMLElement>('[data-dw="pagination"]')) renderPagination(root)
    for (const bar of document.querySelectorAll('.dw-topbar')) {
      placeTopbarTitle(bar)
      for (const el of bar.querySelectorAll(':scope > .dw-topbar__left, :scope > .dw-topbar__right')) topbarObserver.observe(el)
      topbarObserver.observe(bar)
      bar.toggleAttribute('data-scrolled', topbarScroller(bar).scrollTop > 0)
    }
    for (const nav of document.querySelectorAll<HTMLElement>('.dw-sidenav[data-state]')) {
      const fallback = innerWidth < 1280 ? 'collapsed' : 'expanded'
      setSidenavState(nav, nav.dataset.dw === 'sidenav' ? readSidenavState() ?? fallback : nav.dataset.state ?? fallback)
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initNavigation, { once: true })
  else initNavigation()

  /* ── Avatar: 이미지 실패 시 Fallback 유지 ── */
  const syncAvatar = (e: Event) => {
    const img = target(e)
    if (img.matches('.dw-avatar__image')) img.toggleAttribute('data-error', e.type === 'error')
  }
  document.addEventListener('load', syncAvatar, true)
  document.addEventListener('error', syncAvatar, true)
  // 이 스크립트가 돌기 전에 이미 실패한 이미지
  for (const img of document.querySelectorAll<HTMLImageElement>('.dw-avatar__image')) {
    if (img.complete && img.naturalWidth === 0) img.toggleAttribute('data-error', true)
  }

  /* ── Chip: 토글(aria-pressed), 하나만 고르는 묶음(radiogroup) ── */
  function selectChip(chip: HTMLElement): void {
    for (const c of chip.closest('[role="radiogroup"]')?.querySelectorAll<HTMLElement>('.dw-chip[role="radio"]') ?? []) {
      c.setAttribute('aria-checked', String(c === chip))
      c.tabIndex = c === chip ? 0 : -1
    }
  }

  document.addEventListener('click', (e) => {
    const chip = target(e).closest<HTMLElement>('.dw-chip:not(:disabled)')
    if (!chip) return
    if (chip.getAttribute('role') === 'radio') selectChip(chip)
    else if (chip.hasAttribute('aria-pressed')) chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'))
  })

  document.addEventListener('keydown', (e) => {
    const chip = target(e).closest<HTMLElement>('.dw-chip[role="radio"]')
    if (!chip) return
    const step = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0
    if (!step) return
    e.preventDefault()
    const chips = [...(chip.closest('[role="radiogroup"]')?.querySelectorAll<HTMLElement>('.dw-chip[role="radio"]:not(:disabled)') ?? [])]
    const next = chips[(chips.indexOf(chip) + step + chips.length) % chips.length]
    selectChip(next)
    next.focus()
  })

  /* ── List: aria-disabled 행은 눌러도 동작 없음 ── */
  document.addEventListener('click', (e) => {
    if (target(e).closest('.dw-list__content[aria-disabled="true"]')) e.preventDefault()
  })

  /* ── Table: 정렬 표시, 행 클릭 = 주 링크 클릭, 첫 열 고정 그림자 ── */
  const SORT_ORDER = ['none', 'ascending', 'descending']

  document.addEventListener('click', (e) => {
    const th = target(e).closest('.dw-table__sort')?.closest('th')
    if (th) {
      const next = SORT_ORDER[(SORT_ORDER.indexOf(th.getAttribute('aria-sort') ?? 'none') + 1) % SORT_ORDER.length]
      for (const other of th.closest('tr')?.querySelectorAll('th[aria-sort]') ?? []) other.setAttribute('aria-sort', 'none')
      th.setAttribute('aria-sort', next)
      return
    }
    const row = target(e).closest('.dw-table__row--interactive')
    if (!row || target(e).closest('a, button, input, select, textarea, label') || getSelection()?.toString()) return
    row.querySelector<HTMLElement>('a[href], button:not([disabled])')?.click()
  })

  document.addEventListener('scroll', (e) => {
    const wrap = target(e)
    if (wrap.matches('.dw-table-wrap')) wrap.toggleAttribute('data-scrolled', wrap.scrollLeft > 0)
  }, true)

  /* ── Callout: 닫기, 포커스는 다음 요소로 ── */
  document.addEventListener('click', (e) => {
    const root = target(e).closest('.dw-callout__close')?.closest('.dw-callout')
    if (!root) return
    const others = focusables(root.closest('[role="dialog"], [role="alertdialog"]') ?? document.body).filter((el) => !root.contains(el))
    const next = others.find((el) => root.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) ?? others.at(-1)
    root.remove()
    next?.focus({ preventScroll: e.detail > 0 }) // 마우스로 닫을 때는 화면이 튀지 않게
  })

  window.dw = { openModal, closeModal, showToast }

export {}
