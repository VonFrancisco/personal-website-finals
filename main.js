// ===== SHARED FUNCTIONALITY =====

// Scroll progress bar
function initScrollProgress() {
  const progressBar = document.createElement('div')
  progressBar.className = 'scroll-progress'
  document.body.appendChild(progressBar)

  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = (window.scrollY / scrollHeight) * 100
    progressBar.style.width = scrolled + '%'
  })
}

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

// Micro-interaction: Button tilt toward cursor
function initButtonTilt() {
  const buttons = document.querySelectorAll('.link-btn, .btn-primary, .btn')
  buttons.forEach(btn => {
    btn.classList.add('btn-tilt')
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const tiltX = (y / rect.height) * 10
      const tiltY = -(x / rect.width) * 10
      btn.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
    })
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    })
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
  let animationId

  // Reduce particles on mobile
  const particleCount = window.innerWidth < 768 ? 40 : 120

  for (let i = 0; i < particleCount; i++) {
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
    animationId = requestAnimationFrame(draw)
  }

  // Pause animations when tab not active
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId)
    } else {
      draw()
    }
  })

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
  initScrollProgress()
  initCursorGlow()
  initButtonTilt()
  initParticles()
  initScrollReveal()
  initHeroParallax()
  initKonamiCode()
})

// Easter egg: Konami code for glitch mode
function initKonamiCode() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  let konamiIndex = 0

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++
      if (konamiIndex === konamiCode.length) {
        activateGlitchMode()
        konamiIndex = 0
      }
    } else {
      konamiIndex = 0
    }
  })
}

function activateGlitchMode() {
  document.body.classList.toggle('glitch-mode')
  const h1 = document.querySelector('h1')
  if (h1) {
    h1.textContent = h1.textContent === 'VON CRISTAN' ? '⚡G4LT_UR3⚡' : 'VON CRISTAN'
  }
  
  // Show glitch notification
  const notification = document.createElement('div')
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 40px;
    background: rgba(0, 240, 255, 0.1);
    border: 2px solid #00f0ff;
    border-radius: 8px;
    color: #00f0ff;
    font-weight: bold;
    font-size: 18px;
    z-index: 5000;
    animation: glitchPulse 0.6s ease-out;
    text-shadow: 0 0 10px #ff00ff;
  `
  notification.textContent = 'GLITCH MODE ACTIVATED ⚡'
  document.body.appendChild(notification)
  setTimeout(() => notification.remove(), 2000)
}
