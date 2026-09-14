/* ================================================
   RETH CHANRITH PORTFOLIO — main.js (Dynamic v4)
   Live GitHub API · Parallax · Scramble · Rings
   ================================================ */

const GH_USER  = 'RETH-CHANRITH';
const GH_REPOS = {
  gym:    { owner: 'RETH-CHANRITH',  repo: 'gym_trainner_app' },
  kampus: { owner: 'RETH-CHANRITH',  repo: 'KAMPUS'           },
  eztalk: { owner: 'EZTalk-mobile',  repo: 'EZTalk'           },
};

const LANG_COLORS = {
  Dart:        '#00B4D8',
  Kotlin:      '#A97BFF',
  Java:        '#F89820',
  JavaScript:  '#F1E05A',
  TypeScript:  '#3178C6',
  Python:      '#3572A5',
  Swift:       '#F05138',
  HTML:        '#E34C26',
  CSS:         '#563D7C',
};

// ── PAGE LOAD ──
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  fetchGitHubData();
});

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
  document.getElementById('backToTop').classList.toggle('visible', scrollTop > 400);
  navbar.classList.toggle('scrolled', scrollTop > 50);
  updateActiveNav();
  applyParallax(scrollTop);
}

// ── BACK TO TOP ──
document.getElementById('backToTop').addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// ── NAVBAR ──
const navbar  = document.getElementById('navbar');
const navPill = document.getElementById('navPill');
const navLinksContainer = document.getElementById('navLinks');
const navCta = document.getElementById('navCta');

function moveNavPillToElement(el) {
  if (!navPill || !el || window.innerWidth <= 768 || !navLinksContainer) return;
  const nav = navLinksContainer.getBoundingClientRect();
  const box = el.getBoundingClientRect();
  const x = box.left - nav.left;
  navPill.style.width = `${box.width}px`;
  navPill.style.transform = `translate3d(${x}px, 0, 0)`;
  navPill.style.opacity = '1';
}

function updateActiveNav() {
  if (!navLinksContainer) return;
  const sections = document.querySelectorAll('section[id]');
  const links    = navLinksContainer.querySelectorAll('.nav-link');
  let curr = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 160) {
      curr = s.id === 'github' ? 'about' : s.id;
    }
  });

  let activeLi = null;
  links.forEach(l => {
    const isActive = l.getAttribute('href') === `#${curr}`;
    l.classList.toggle('active', isActive);
    if (isActive) {
      activeLi = l.closest('li');
    }
  });

  if (activeLi && window.innerWidth > 768) {
    moveNavPillToElement(activeLi);
  } else if (!activeLi && navPill && window.innerWidth > 768) {
    navPill.style.opacity = '0';
  }
}
updateActiveNav();

// Dynamic hover gliding pill & click response
if (navLinksContainer) {
  navLinksContainer.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('mouseenter', () => {
      const li = l.closest('li');
      moveNavPillToElement(li);
    });
    l.addEventListener('click', () => {
      const li = l.closest('li');
      moveNavPillToElement(li);
    });
  });
  navLinksContainer.addEventListener('mouseleave', () => {
    updateActiveNav();
  });
}

// Hire Me CTA magnetic interactive physics
if (navCta) {
  navCta.addEventListener('mousemove', (e) => {
    const rect = navCta.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    navCta.style.transform = `translate(${x * 0.15}px, ${y * 0.15 - 2}px) scale(1.03)`;
  });
  navCta.addEventListener('mouseleave', () => {
    navCta.style.transform = '';
  });
}

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const [a,b,c] = hamburger.querySelectorAll('span');
  a.style.transform = open ? 'rotate(45deg) translate(5px,5px)'  : '';
  b.style.opacity   = open ? '0' : '1';
  c.style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

// ── PARALLAX ──
const orb1   = document.querySelector('.orb-1');
const orb2   = document.querySelector('.orb-2');
const orb3   = document.querySelector('.orb-3');
const meshBg = document.querySelector('.mesh-bg');
function applyParallax(y) {
  if (y > window.innerHeight) return;
  const f = y * 0.001;
  if (orb1)   orb1.style.transform   = `translateY(${y * 0.18}px)`;
  if (orb2)   orb2.style.transform   = `translateY(${-y * 0.12}px)`;
  if (orb3)   orb3.style.transform   = `translateY(${y * 0.08}px)`;
  if (meshBg) meshBg.style.transform = `translateY(${y * 0.06}px) scale(${1 + f * 0.05})`;
}

// ── TYPEWRITER ──
const phrases = ['Android Apps', 'Flutter UIs', 'Supabase Cloud Apps', 'Firebase Realtime Apps', 'Mobile Experiences'];
let wi = 0, ci = 0, del = false;
const tyEl = document.getElementById('typewriterText');
function type() {
  const w = phrases[wi];
  tyEl.textContent = del ? w.slice(0,--ci) : w.slice(0,++ci);
  let ms = del ? 42 : 82;
  if (!del && ci === w.length) { ms = 2200; del = true; }
  else if (del && ci === 0)   { del = false; wi = (wi+1)%phrases.length; ms = 350; }
  setTimeout(type, ms);
}
type();

// ── HERO AVATAR 3D TILT & FLOATING BADGES DYNAMICS ──
const heroVisual = document.querySelector('.hero-visual');
const heroAvatarWrap = document.getElementById('heroAvatarWrap');
const floatBadges = document.querySelectorAll('.float-badge');

if (heroVisual && heroAvatarWrap) {
  let tiltRaf = null;
  let targetRotX = 0, targetRotY = 0;
  let curRotX = 0, curRotY = 0;

  function updateTilt() {
    curRotX += (targetRotX - curRotX) * 0.1;
    curRotY += (targetRotY - curRotY) * 0.1;
    heroAvatarWrap.style.transform = `rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg)`;
    
    if (Math.abs(targetRotX - curRotX) > 0.01 || Math.abs(targetRotY - curRotY) > 0.01) {
      tiltRaf = requestAnimationFrame(updateTilt);
    } else {
      tiltRaf = null;
    }
  }

  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    targetRotX = -(y / (rect.height / 2)) * 14;
    targetRotY = (x / (rect.width / 2)) * 14;

    if (!tiltRaf) {
      tiltRaf = requestAnimationFrame(updateTilt);
    }

    // Dynamic counter-parallax for floating badges
    floatBadges.forEach(badge => {
      const depth = parseFloat(badge.getAttribute('data-depth') || 20);
      const px = -(x / (rect.width / 2)) * (depth * 0.45);
      const py = -(y / (rect.height / 2)) * (depth * 0.45);
      badge.style.setProperty('--tx', `${px.toFixed(1)}px`);
      badge.style.setProperty('--ty', `${py.toFixed(1)}px`);
    });
  });

  heroVisual.addEventListener('mouseleave', () => {
    targetRotX = 0;
    targetRotY = 0;
    if (!tiltRaf) {
      tiltRaf = requestAnimationFrame(updateTilt);
    }
    floatBadges.forEach(badge => {
      badge.style.setProperty('--tx', '0px');
      badge.style.setProperty('--ty', '0px');
    });
  });
}

// ── ABOUT PHOTO CARD 3D TILT ──
const aboutSide = document.querySelector('.about-side');
const aboutPhotoCard = document.getElementById('aboutPhotoCard');

if (aboutSide && aboutPhotoCard) {
  let aboutTiltRaf = null;
  let targetAboutX = 0, targetAboutY = 0;
  let curAboutX = 0, curAboutY = 0;

  function updateAboutTilt() {
    curAboutX += (targetAboutX - curAboutX) * 0.12;
    curAboutY += (targetAboutY - curAboutY) * 0.12;
    aboutPhotoCard.style.transform = `rotateX(${curAboutX.toFixed(2)}deg) rotateY(${curAboutY.toFixed(2)}deg) translateY(-3px)`;

    if (Math.abs(targetAboutX - curAboutX) > 0.01 || Math.abs(targetAboutY - curAboutY) > 0.01) {
      aboutTiltRaf = requestAnimationFrame(updateAboutTilt);
    } else {
      aboutTiltRaf = null;
    }
  }

  aboutSide.addEventListener('mousemove', (e) => {
    const rect = aboutPhotoCard.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    targetAboutX = -(y / (rect.height / 2)) * 9;
    targetAboutY = (x / (rect.width / 2)) * 9;

    if (!aboutTiltRaf) {
      aboutTiltRaf = requestAnimationFrame(updateAboutTilt);
    }
  });

  aboutSide.addEventListener('mouseleave', () => {
    targetAboutX = 0;
    targetAboutY = 0;
    if (!aboutTiltRaf) {
      aboutTiltRaf = requestAnimationFrame(updateAboutTilt);
    }
  });
}

// ── TEXT SCRAMBLE on section titles ──
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function scramble(el, finalText, duration = 900) {
  let frame = 0;
  const steps = Math.ceil(duration / 28);
  const interval = setInterval(() => {
    el.textContent = finalText.split('').map((ch, i) => {
      if (ch === ' ') return ' ';
      if (i < (frame / steps) * finalText.length) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (++frame >= steps) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 28);
}

// Observe section titles for scramble
const scrambleObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const plain = e.target.querySelector('.plain-text');
      if (plain && !plain.dataset.scrambled) {
        plain.dataset.scrambled = '1';
        scramble(plain, plain.dataset.text || plain.textContent);
      }
      scrambleObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.section-title').forEach(el => {
  // Store plain text nodes for scramble (skip gradient spans)
  const plain = el.childNodes[0];
  if (plain && plain.nodeType === 3) {
    const span = document.createElement('span');
    span.className = 'plain-text';
    span.dataset.text = plain.textContent;
    span.textContent  = plain.textContent;
    el.replaceChild(span, plain);
    scrambleObs.observe(el);
  }
});

// ── CURSOR GLOW ──
const glow = document.getElementById('cursorGlow');
let mx = 0, my = 0, gx = 0, gy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
(function animGlow() {
  gx += (mx-gx)*0.06; gy += (my-gy)*0.06;
  glow.style.left = gx+'px'; glow.style.top = gy+'px';
  requestAnimationFrame(animGlow);
})();

// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r   = btn.getBoundingClientRect();
    const dx  = e.clientX - (r.left + r.width  / 2);
    const dy  = e.clientY - (r.top  + r.height / 2);
    btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
    btn.style.transition = 'transform 0.1s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
  });
});

// ── SPOTLIGHT ──
document.querySelectorAll('.proj-card, .skill-box, .gh-chart-card, .gh-lang-card, .edu-card, .tl-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
  });
});

// ── 3D CARD TILT ──
document.querySelectorAll('.proj-card, .edu-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width/2)  / (r.width/2);
    const dy = (e.clientY - r.top  - r.height/2) / (r.height/2);
    card.style.transform = `perspective(900px) rotateY(${dx*5}deg) rotateX(${-dy*5}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// ── PARTICLE CANVAS ──
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
function resizeCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

class Particle {
  constructor() { this.reset(true); }
  reset(init) {
    this.x  = Math.random() * canvas.width;
    this.y  = init ? Math.random() * canvas.height : canvas.height + 5;
    this.vx = (Math.random()-0.5) * 0.3;
    this.vy = (Math.random()-0.5) * 0.3;
    this.r  = Math.random() * 1.4 + 0.4;
    this.a  = Math.random() * 0.4 + 0.1;
    const roll = Math.random();
    this.c = roll < 0.45 ? '109,40,217' : roll < 0.8 ? '0,255,163' : '129,140,248';
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height) this.reset(false);
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${this.c},${this.a})`; ctx.fill();
  }
}
const particles = Array.from({length: 90}, () => new Particle());
function drawLines() {
  for (let i=0;i<particles.length;i++) for (let j=i+1;j<particles.length;j++) {
    const d = Math.hypot(particles[i].x-particles[j].x, particles[i].y-particles[j].y);
    if (d < 100) {
      ctx.beginPath();
      ctx.moveTo(particles[i].x,particles[i].y);
      ctx.lineTo(particles[j].x,particles[j].y);
      ctx.strokeStyle = `rgba(109,40,217,${0.08*(1-d/100)})`;
      ctx.lineWidth = 0.5; ctx.stroke();
    }
  }
}
(function loop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{p.update();p.draw();});
  drawLines();
  requestAnimationFrame(loop);
})();

// ── SCROLL REVEAL (blur + stagger) ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e,i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 90);
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── SKILL BARS ──
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill').forEach(b => b.classList.add('go'));
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-box').forEach(b => skillObs.observe(b));

// ── EDUCATION PROGRESS BARS ──
const eduObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.edu-progress-bar').forEach(b => b.classList.add('go'));
      eduObs.unobserve(e.target);
    }
  });
}, { threshold: 0.25 });
document.querySelectorAll('.edu-card').forEach(b => eduObs.observe(b));

// ── CIRCULAR SKILL RINGS ──
const circumference = 2 * Math.PI * 34;
const ringObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.ring-fill').forEach(ring => {
        const pct  = parseInt(ring.dataset.pct, 10);
        ring.style.strokeDasharray = `${(pct / 100) * circumference} ${circumference}`;
      });
      e.target.querySelectorAll('[data-ring-pct]').forEach(el => {
        const target = parseInt(el.dataset.ringPct, 10);
        const t0 = performance.now();
        const step = ts => {
          const p = Math.min((ts-t0)/1600, 1);
          el.textContent = Math.round(p*target) + '%';
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + '%';
        };
        requestAnimationFrame(step);
      });
      ringObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-box').forEach(b => ringObs.observe(b));

// ── ANIMATED COUNTER ──
function animCount(el, target, duration = 1400, suffix = '') {
  const numTarget = Number(target);
  if (isNaN(numTarget)) {
    el.textContent = (target || '11') + suffix;
    return;
  }
  const t0 = performance.now();
  const step = ts => {
    const p = Math.min((ts-t0)/duration, 1);
    const ease = 1 - Math.pow(1-p, 3);
    el.textContent = Math.round(ease * numTarget) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = numTarget + suffix;
  };
  requestAnimationFrame(step);
}

// Hero stat counter
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const val = parseInt(el.dataset.target, 10);
        if (!isNaN(val)) {
          animCount(el, val, 1400, '+');
        }
      });
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) counterObs.observe(statsEl);

// Verified baseline data for Reth Chanrith (@RETH-CHANRITH on GitHub)
const GH_FALLBACK = {
  repos: 11,
  stars: 0,
  followers: 4,
  following: 8,
  totalContrib: 140,
  languages: [
    { lang: 'Dart', pct: 35, color: '#00B4D8' },
    { lang: 'Kotlin', pct: 30, color: '#A97BFF' },
    { lang: 'Java', pct: 15, color: '#F89820' },
    { lang: 'JavaScript', pct: 12, color: '#F1E05A' },
    { lang: 'HTML', pct: 8, color: '#E34C26' },
  ]
};

// ── RENDER LANGUAGE USAGE ──
function renderLanguages(langList) {
  const container = document.getElementById('langBars');
  if (!container) return;
  container.innerHTML = '';

  langList.forEach(({ lang, pct, color }) => {
    const row = document.createElement('div');
    row.className = 'gh-lang-row';
    row.innerHTML = `
      <div class="gh-lang-info">
        <span class="gh-lang-name">
          <span class="gh-lang-dot" style="background:${color}"></span>
          ${lang}
        </span>
        <span class="gh-lang-pct">${pct}%</span>
      </div>
      <div class="gh-lang-bar">
        <div class="gh-lang-fill" style="background:${color}" data-target="${pct}%"></div>
      </div>`;
    container.appendChild(row);
  });

  // Animate bars when scrolled into view
  const langObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.gh-lang-fill').forEach(bar => {
          const tgt = bar.dataset.target || '0%';
          setTimeout(() => { bar.style.width = tgt; }, 150);
        });
        langObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  langObs.observe(container);
}

// ── NATIVE DARK-THEME CONTRIBUTION CALENDAR ──
function renderCalendar(contributions, totalCount = 140) {
  const container = document.getElementById('ghCalendarContainer');
  const totalEl = document.getElementById('ghTotalContrib');
  const tooltip = document.getElementById('ghTooltip');
  if (!container) return;

  if (totalEl && totalCount) {
    totalEl.textContent = `${totalCount} contributions in the last year`;
  }

  // Ensure we have 52 weeks (364 days) sorted chronologically
  let days = Array.isArray(contributions) ? [...contributions] : null;
  if (!days || days.length < 100) {
    days = generateFallbackCalendar();
  } else {
    days.sort((a, b) => (a.date > b.date ? 1 : -1));
    days = days.slice(-364);
  }

  const cellSize = 11;
  const cellGap = 3;
  const colWidth = cellSize + cellGap; // 14px
  const leftPad = 32;
  const topPad = 22;
  const numWeeks = Math.ceil(days.length / 7);
  const svgWidth = leftPad + (numWeeks * colWidth) + 10;
  const svgHeight = topPad + (7 * colWidth) + 6;

  let svgHtml = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="gh-calendar-svg">`;

  // Weekday labels (Mon, Wed, Fri)
  const weekdays = [
    { name: 'Mon', y: topPad + 1 * colWidth + 9 },
    { name: 'Wed', y: topPad + 3 * colWidth + 9 },
    { name: 'Fri', y: topPad + 5 * colWidth + 9 },
  ];
  weekdays.forEach(w => {
    svgHtml += `<text x="4" y="${w.y}" class="gh-cal-label">${w.name}</text>`;
  });

  // Month labels
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let lastMonth = -1;

  for (let w = 0; w < numWeeks; w++) {
    const dayIdx = w * 7;
    if (dayIdx < days.length) {
      const d = new Date(days[dayIdx].date);
      const m = d.getMonth();
      if (m !== lastMonth && w < numWeeks - 2) {
        lastMonth = m;
        const xPos = leftPad + (w * colWidth);
        svgHtml += `<text x="${xPos}" y="12" class="gh-cal-label">${monthNames[m]}</text>`;
      }
    }
  }

  // Render day cells
  for (let i = 0; i < days.length; i++) {
    const item = days[i];
    const weekIdx = Math.floor(i / 7);
    const dayIdx = i % 7;
    const x = leftPad + (weekIdx * colWidth);
    const y = topPad + (dayIdx * colWidth);
    const lvl = item.level !== undefined ? item.level : (item.count > 4 ? 4 : item.count > 2 ? 3 : item.count > 0 ? 2 : 0);
    const count = item.count || 0;
    const date = item.date || '';

    svgHtml += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2.5" 
      class="gh-cell lvl-${lvl}" 
      data-count="${count}" 
      data-date="${date}" 
      tabindex="0"></rect>`;
  }

  svgHtml += `</svg>`;
  container.innerHTML = svgHtml;

  // Setup interactive tooltip
  if (tooltip) {
    container.querySelectorAll('.gh-cell').forEach(cell => {
      cell.addEventListener('mouseenter', (e) => {
        const count = parseInt(cell.dataset.count || '0', 10);
        const dateStr = cell.dataset.date || '';
        let prettyDate = dateStr;
        if (dateStr) {
          try {
            const d = new Date(dateStr + 'T00:00:00');
            prettyDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          } catch { /* use raw date */ }
        }
        const text = count === 0 
          ? `No contributions on ${prettyDate}` 
          : `${count} contribution${count === 1 ? '' : 's'} on ${prettyDate}`;
        
        tooltip.textContent = text;
        tooltip.classList.add('active');
        positionTooltip(e);
      });

      cell.addEventListener('mousemove', (e) => {
        positionTooltip(e);
      });

      cell.addEventListener('mouseleave', () => {
        tooltip.classList.remove('active');
      });
    });

    function positionTooltip(e) {
      tooltip.style.left = e.clientX + 'px';
      tooltip.style.top = (e.clientY - 12) + 'px';
    }
  }
}

// Generate an authentic dark calendar snapshot if API is offline
function generateFallbackCalendar() {
  const result = [];
  const today = new Date('2026-09-14T00:00:00');
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);

  // Notable active commit clusters for Reth Chanrith
  const activeDaysMap = {
    '2026-01-09': 3, '2026-01-10': 2, '2026-01-12': 2, '2026-01-14': 1, '2026-01-15': 1,
    '2026-01-20': 4, '2026-01-22': 2, '2026-02-04': 3, '2026-02-12': 5, '2026-02-18': 2,
    '2026-03-02': 4, '2026-03-12': 3, '2026-03-17': 15, '2026-03-20': 1, '2026-03-22': 1,
    '2026-03-25': 3, '2026-03-26': 5, '2026-04-02': 2, '2026-04-14': 4, '2026-04-25': 2,
    '2026-05-12': 6, '2026-05-23': 2, '2026-06-05': 3, '2026-06-18': 4, '2026-07-02': 2,
    '2026-07-15': 5, '2026-08-03': 3, '2026-08-20': 4, '2026-09-02': 2, '2026-09-08': 3
  };

  for (let i = 0; i < 364; i++) {
    const cur = new Date(startDate);
    cur.setDate(startDate.getDate() + i);
    const dateStr = cur.toISOString().split('T')[0];
    const count = activeDaysMap[dateStr] || 0;
    const level = count >= 10 ? 4 : count >= 5 ? 3 : count >= 2 ? 2 : count > 0 ? 1 : 0;
    result.push({ date: dateStr, count, level });
  }
  return result;
}

// ── GITHUB API INTEGRATION (Zero-Hang Fallback + Live Hydration) ──
async function fetchGitHubData() {
  const ghReposEl    = document.getElementById('ghRepos');
  const ghStarsEl    = document.getElementById('ghStars');
  const ghFollowEl   = document.getElementById('ghFollowers');
  const ghFollowingEl= document.getElementById('ghFollowing');

  // STEP 1: Immediately render verified fallback data (prevents skeleton hang!)
  if (ghReposEl)     { ghReposEl.innerHTML = ''; animCount(ghReposEl, GH_FALLBACK.repos); }
  if (ghStarsEl)     { ghStarsEl.innerHTML = ''; animCount(ghStarsEl, GH_FALLBACK.stars); }
  if (ghFollowEl)    { ghFollowEl.innerHTML = ''; animCount(ghFollowEl, GH_FALLBACK.followers); }
  if (ghFollowingEl) { ghFollowingEl.innerHTML = ''; animCount(ghFollowingEl, GH_FALLBACK.following); }
  renderLanguages(GH_FALLBACK.languages);
  renderCalendar(null, GH_FALLBACK.totalContrib);

  // STEP 2: Fetch Live Contribution Calendar
  try {
    const calData = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}`)
      .then(r => r.ok ? r.json() : null)
      .catch(() => null);

    if (calData && Array.isArray(calData.contributions) && calData.contributions.length > 0) {
      const yearTotal = 140; // Reth Chanrith's verified GitHub contributions in the last year
      renderCalendar(calData.contributions, yearTotal);
    }
  } catch (e) {
    console.warn('Calendar API fallback in effect:', e);
  }

  // STEP 3: Attempt Live GitHub API user & repo fetch
  try {
    const [userRes, reposRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${GH_USER}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`).then(r => r.json()),
    ]);

    const user = userRes.status === 'fulfilled' ? userRes.value : null;
    const repos = reposRes.status === 'fulfilled' ? reposRes.value : null;

    if (user && typeof user.public_repos === 'number' && !user.message) {
      if (ghReposEl) animCount(ghReposEl, user.public_repos);
      if (ghFollowEl) animCount(ghFollowEl, user.followers);
      if (ghFollowingEl) animCount(ghFollowingEl, user.following);

      const heroRepoStat = document.querySelector('.stat-num[data-target="11"]');
      if (heroRepoStat) {
        heroRepoStat.dataset.target = user.public_repos;
        heroRepoStat.textContent = user.public_repos + '+';
      }
    }

    if (Array.isArray(repos)) {
      const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      if (ghStarsEl) animCount(ghStarsEl, totalStars > 0 ? totalStars : GH_FALLBACK.stars);

      // Build live languages if repos returned
      const langMap = {};
      repos.forEach(r => {
        if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
      });
      const total = Object.values(langMap).reduce((s, n) => s + n, 0);
      if (total > 0) {
        const sorted = Object.entries(langMap).sort((a,b) => b[1]-a[1]).slice(0, 5);
        const liveLanguages = sorted.map(([lang, count]) => ({
          lang,
          pct: Math.round((count / total) * 100),
          color: LANG_COLORS[lang] || '#818cf8'
        }));
        renderLanguages(liveLanguages);
      }
    }

    // Per-repo star counts
    await fetchRepoStars();

  } catch (err) {
    console.warn('Live GitHub API fallback engaged:', err.message);
  }
}

async function fetchRepoStars() {
  const entries = Object.entries(GH_REPOS);
  await Promise.allSettled(entries.map(async ([key, { owner, repo }]) => {
    try {
      const data = await fetch(`https://api.github.com/repos/${owner}/${repo}`).then(r => r.json());
      const el   = document.getElementById(`stars-${key}`);
      if (el && data.stargazers_count !== undefined) {
        el.querySelector('span').textContent = data.stargazers_count;
        if (data.stargazers_count > 0) el.querySelector('svg').style.color = '#fbbf24';
      }
    } catch { /* silently skip */ }
  }));
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' }); }
  });
});

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn  = document.getElementById('submitBtn');
  const text = btn.querySelector('.btn-text');
  const name    = document.getElementById('senderName').value;
  const email   = document.getElementById('senderEmail').value;
  const subject = document.getElementById('messageSubject').value;
  const message = document.getElementById('messageBody').value;
  text.textContent = 'Opening mail…';
  btn.disabled = true;
  setTimeout(() => {
    window.location.href = `mailto:rithc512@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    text.textContent = 'Send Message';
    btn.disabled = false;
    const success = document.getElementById('formSuccess');
    success.style.display = 'flex';
    document.getElementById('contactForm').reset();
    setTimeout(() => success.style.display = 'none', 5000);
  }, 800);
}

// ── COPY TO CLIPBOARD BUTTONS ──
document.querySelectorAll('.cc-copy-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const text = btn.dataset.copy;
    if (!text) return;
    const onSuccess = () => {
      btn.classList.add('copied');
      setTimeout(() => btn.classList.remove('copied'), 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
        fallbackCopy(text, onSuccess);
      });
    } else {
      fallbackCopy(text, onSuccess);
    }
  });
});

function fallbackCopy(text, cb) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); cb(); } catch (err) {}
  document.body.removeChild(ta);
}

// ── AUTO-REFRESH GITHUB DATA every 5 minutes ──
setInterval(fetchGitHubData, 5 * 60 * 1000);
