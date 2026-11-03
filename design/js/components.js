// 생성 파일 — components.ts를 고치고 pnpm build:catalog
;(() => {
/*
 * DW Design System — 레퍼런스 동작 (TypeScript 원본, 의존성 없음)
 * 브라우저가 읽는 components.js는 이 파일에서 타입만 지워 생성한다 — pnpm build:catalog
 * 각 컴포넌트 명세의 "Behavior & Accessibility"를 그대로 구현한 예시다.
 * 다른 언어·프레임워크로 옮길 때 동작 기준으로 삼는다.
 *
 * 훅: data-dw="<name>" (컴포넌트 루트), data-dw-open="<id>" (열기 트리거), data-dw-close (닫기)
 */

  const FOCUSABLE =
    'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'

  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches
  const focusables = (root) => [...root.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement)

  // 애니메이션이 끝나면 resolve (모션 줄이기·애니메이션 없음이면 즉시)
  const afterAnimation = (el) =>
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
  const stack = []

  function setInert(on) {
    // 맨 위 모달만 조작 가능, 나머지(아래 깔린 모달 포함)는 inert
    const top = stack.at(-1)?.root
    for (const el of document.body.children) {
      if (on && el !== top) el.setAttribute('inert', '')
      else el.removeAttribute('inert')
    }
  }

  function openModal(root, trigger = null) {
    if (!root.hidden) return
    const panel = root.querySelector('[role="dialog"], [role="alertdialog"]')
    if (!panel) return
    const parts = root.querySelectorAll('[data-state]')
    document.body.append(root) // 최상위로 옮겨 inert 처리 대상에서 분리
    root.hidden = false
    for (const p of parts) p.dataset.state = 'open'
    stack.push({ root, trigger })
    setInert(true)
    lockScroll()
    const first = panel.querySelector('[data-dw-autofocus]') ?? focusables(panel).find((el) => !el.matches('[data-dw-close].dw-dialog__close, .dw-button--critical-solid'))
    ;(first ?? panel).focus()
    updateScrollShadow(root)
  }

  async function closeModal(root) {
    const i = stack.findIndex((m) => m.root === root)
    if (i === -1) return
    const [{ trigger }] = stack.splice(i, 1)
    const parts = root.querySelectorAll('[data-state]')
    for (const p of parts) p.dataset.state = 'closed'
    await Promise.all([...parts].map(afterAnimation))
    root.hidden = true
    setInert(false)
    if (stack.length) setInert(true)
    unlockScroll()
    trigger?.focus()
  }

  function updateScrollShadow(root) {
    for (const body of root.querySelectorAll('.dw-dialog__body, .dw-sheet__body')) {
      const overflow = body.scrollHeight - body.scrollTop - body.clientHeight > 1
      body.toggleAttribute('data-scrolled', body.scrollTop > 0)
      body.toggleAttribute('data-overflow', overflow)
      if (body.scrollHeight > body.clientHeight) body.tabIndex = 0
      else body.removeAttribute('tabindex')
    }
  }

  const target = (e) => (e.target instanceof Element ? e.target : document.body)

  document.addEventListener('click', (e) => {
    const opener = target(e).closest('[data-dw-open]')
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
    const root = target(e).closest('[data-dw="dialog"], [data-dw="sheet"]')
    if (root) updateScrollShadow(root)
  }, true)

  /* ── Text Input: 루트 클릭 시 포커스, 지우기 버튼 ── */
  document.addEventListener('click', (e) => {
    const root = target(e).closest('.dw-text-input')
    if (!root) return
    const value = root.querySelector('.dw-text-input__value')
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
    const value = target(e).closest('.dw-text-input__value')
    if (!value) return
    const root = value.closest('.dw-text-input')
    for (const btn of root?.querySelectorAll('[data-dw-clear]') ?? []) btn.hidden = value.value === ''
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
    let firstInvalid = null
    for (const field of form.querySelectorAll('.dw-field')) {
      const value = field.querySelector('.dw-text-input__value, input, textarea, select')
      if (!value) continue
      const ok = value.checkValidity()
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

  window.dw = { openModal, closeModal }
})()
