// 카탈로그 페이지 동작 — 테마 전환, 메뉴 검색, 좁은 화면 메뉴, 현재 위치 표시
;(() => {
  const root = document.documentElement
  const header = document.querySelector('.page-header')
  const nav = document.getElementById('page-nav')

  // 카탈로그의 폼 예시는 실제로 전송하지 않는다
  document.addEventListener('dw:form-valid', (e) => e.preventDefault())

  /* ── 테마 ── */
  const theme = document.getElementById('theme')
  const isDark = () => root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches)
  const syncTheme = () => {
    const label = isDark() ? '라이트 모드로 전환' : '다크 모드로 전환'
    theme.setAttribute('aria-label', label)
    theme.title = label
    theme.querySelector('use').setAttribute('href', isDark() ? '#i-sun' : '#i-moon')
  }
  theme.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark'
    syncTheme()
  })
  syncTheme()

  /* ── 메뉴 검색: 이름과 data-q(한글·영문 별칭)에서 찾는다 ── */
  const search = document.getElementById('page-search')
  const empty = document.getElementById('page-nav-empty')
  const allLinks = [...nav.querySelectorAll('a')]
  const labels = [...nav.querySelectorAll('.page-nav__title, .page-nav__group')]
  const haystack = (a) => `${a.textContent} ${a.dataset.q ?? ''}`.toLowerCase()
  const visible = () => allLinks.filter((a) => !a.hidden)

  function applySearch() {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean)
    for (const a of allLinks) {
      a.hidden = !words.every((w) => haystack(a).includes(w))
      a.removeAttribute('data-first')
    }
    // 뒤따르는 항목이 모두 숨으면 묶음 제목도 숨긴다 (Components 제목은 다음 묶음까지 본다)
    for (const label of labels) {
      const rank = label.matches('.page-nav__title') ? 2 : 1
      let hasItem = false
      for (let el = label.nextElementSibling; el; el = el.nextElementSibling) {
        if (el.matches('.page-nav__title')) break
        if (rank === 1 && el.matches('.page-nav__group')) break
        if (el.matches('a') && !el.hidden) hasItem = true
      }
      label.hidden = !hasItem
    }
    empty.hidden = visible().length > 0
    if (words.length) visible()[0]?.toggleAttribute('data-first', true)
  }

  search.addEventListener('input', applySearch)
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      visible()[0]?.click()
    }
    if (e.key === 'Escape' && search.value) {
      e.stopPropagation()
      search.value = ''
      search.dispatchEvent(new Event('input', { bubbles: true }))
    }
  })

  /* ── 좁은 화면: 메뉴 버튼으로 목록을 열고, 고르면 닫는다 ── */
  const menu = document.getElementById('menu')
  const toggleMenu = (open) => {
    header.toggleAttribute('data-open', open)
    menu.setAttribute('aria-expanded', String(open))
  }
  menu.addEventListener('click', () => toggleMenu(!header.hasAttribute('data-open')))
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) toggleMenu(false)
  })

  /* ── 넓은 화면: 사이드바를 접고 펼친다. 상태는 이 브라우저에만 남긴다 ── */
  const sidebar = document.getElementById('sidebar-toggle')
  const setSidebar = (open) => {
    if (open) delete root.dataset.sidebar
    else root.dataset.sidebar = 'closed'
    const label = open ? '사이드바 접기' : '사이드바 펼치기'
    sidebar.setAttribute('aria-label', label)
    sidebar.title = label
    sidebar.setAttribute('aria-expanded', String(open))
    sidebar.querySelector('use').setAttribute('href', open ? '#i-chevron-left' : '#i-chevron-right')
  }
  sidebar.addEventListener('click', () => {
    const open = root.dataset.sidebar === 'closed'
    setSidebar(open)
    try { localStorage.setItem('dw-sidebar', open ? 'open' : 'closed') } catch {}
  })
  try { if (localStorage.getItem('dw-sidebar') === 'closed') setSidebar(false) } catch {}

  /* ── 지금 보고 있는 절을 사이드바에 표시한다 ── */
  const links = new Map(allLinks.map((a) => [a.hash.slice(1), a]))
  const spy = new IntersectionObserver((entries) => {
    const current = entries.find((e) => e.isIntersecting)
    const link = current && links.get(current.target.id)
    if (!link) return
    for (const a of links.values()) a.removeAttribute('aria-current')
    link.setAttribute('aria-current', 'true')
    link.scrollIntoView({ block: 'nearest' })
  }, { rootMargin: '-20% 0px -75% 0px' })
  for (const section of document.querySelectorAll('main > section[id]')) spy.observe(section)
})()
