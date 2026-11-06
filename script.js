// ---------- Typing effect ----------
const roles = ['BCA (AI/ML) student', 'IOT Club technical coordinator', 'future cloud engineer'];
const typed = document.getElementById('typed');
let ri = 0, ci = 0, del = false;
function type() {
  const word = roles[ri];
  typed.textContent = word.slice(0, ci);
  if (!del && ci < word.length) ci++;
  else if (!del) { del = true; return setTimeout(type, 1500); }
  else if (ci > 0) ci--;
  else { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 40 : 80);
}
type();

// ---------- Theme toggle ----------
const root = document.documentElement, themeBtn = document.getElementById('themeBtn');
function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.innerHTML = t === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
try { setTheme(localStorage.getItem('theme') || 'light'); } catch (e) { setTheme('light'); }
themeBtn.addEventListener('click', () => {
  const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(t);
  try { localStorage.setItem('theme', t); } catch (e) {}
});

// ---------- Mobile menu ----------
const menu = document.querySelector('.nav nav');
document.getElementById('burger').addEventListener('click', () => menu.classList.toggle('open'));
menu.addEventListener('click', e => { if (e.target.tagName === 'A') menu.classList.remove('open'); });

// ---------- Scroll: progress bar, nav state, active link ----------
const nav = document.getElementById('nav'), bar = document.getElementById('progress');
const links = [...document.querySelectorAll('#menu a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
function onScroll() {
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (scrollY / h * 100) + '%';
  nav.classList.toggle('scrolled', scrollY > 20);
  let cur = 0;
  sections.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === cur));
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- Reveal on scroll + score rings ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    en.target.querySelectorAll('.ring').forEach(animateRing);
    io.unobserve(en.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  io.observe(el);
});
function animateRing(r) {
  const target = +r.dataset.val, label = r.querySelector('span');
  let v = 0;
  const step = () => {
    v = Math.min(target, v + 2);
    r.style.setProperty('--p', v);
    label.textContent = v + '%';
    if (v < target) requestAnimationFrame(step);
  };
  step();
}

// ---------- Skills filter ----------
const tabs = document.querySelectorAll('#tabs button');
const cards = document.querySelectorAll('.skill-card');
tabs.forEach(b => b.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('on'));
  b.classList.add('on');
  cards.forEach(c => c.classList.toggle('dim', b.dataset.f !== 'all' && c.dataset.c !== b.dataset.f));
}));

// ---------- Copy email ----------
const toast = document.getElementById('toast');
document.getElementById('copyBtn').addEventListener('click', () => {
  const done = () => { toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); };
  if (navigator.clipboard) navigator.clipboard.writeText('gg3104634@gmail.com').then(done);
  else done();
});

// ---------- Footer year ----------
document.getElementById('yr').textContent = new Date().getFullYear();
