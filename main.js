// ===== SHARED FUNCTIONALITY =====

// Loader
function hideLoader() {
  const loader = document.getElementById('loader')
  if (loader) {
    loader.style.opacity = '0'
    setTimeout(() => loader.remove(), 500)
  }
}
window.addEventListener('load', hideLoader)

// Page transitions
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault()
    document.body.classList.add('fade-out')
    setTimeout(() => window.location.href = this.href, 300)
  })
})

// Mobile nav toggle
function toggleMenu() {
  const links = document.querySelector('.nav-links')
  if (links) links.classList.toggle('show')
}
window.toggleMenu = toggleMenu

// Cursor glow
function initCursorGlow() {
  const cursor = document.getElementById('cursorGlow')
  if (!cursor) return
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px'
    cursor.style.top = e.clientY + 'px'
    cursor.style.opacity = 1
  })
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0
  })
}

// Particles (floating in random directions)
function initParticles() {
  const canvas = document.getElementById('particles')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let w = canvas.width = window.innerWidth
  let h = canvas.height = window.innerHeight
  const particles = []

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6
    })
  }

  function draw() {
    ctx.clearRect(0, 0, w, h)
    particles.forEach(p => {
      ctx.fillStyle = 'rgba(0,240,255,0.75)'
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = w
      if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h
      if (p.y > h) p.y = 0
    })
    requestAnimationFrame(draw)
  }

  let resizeTimer
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }, 140)
  })

  draw()
}

// Scroll reveal observer
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active')
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
}

// Hero parallax
function initHeroParallax() {
  const parallaxEl = document.querySelector('.hero .parallax')
  if (!parallaxEl) return
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = (e.clientX - cx) / cx
    const dy = (e.clientY - cy) / cy
    parallaxEl.style.transform = `translate(${dx * 6}px, ${dy * 4}px)`
  })
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow()
  initParticles()
  initScrollReveal()
  initHeroParallax()
})
