// Sticky nav background
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const toggle = nav.querySelector('.nav-toggle');
const setMenu = open => {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('.nav-menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// YouTube: load the player only when clicked
document.querySelectorAll('.yt').forEach(btn => {
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.id}?autoplay=1&rel=0`;
    iframe.title = 'The Royal High Jinx video';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    btn.classList.add('playing');
    btn.appendChild(iframe);
  }, { once: true });
});

// Songkick widget: load when the shows section is near
const loadSongkick = () => {
  const s = document.createElement('script');
  s.src = 'https://widget.songkick.com/9054494/widget.js';
  s.async = true;
  document.body.appendChild(s);
};
const shows = document.getElementById('shows');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    if (entries.some(e => e.isIntersecting)) { loadSongkick(); obs.disconnect(); }
  }, { rootMargin: '600px' });
  io.observe(shows);
} else {
  loadSongkick();
}

// Fade sections in as they scroll into view
const revealTargets = document.querySelectorAll('.section-head, .release-grid, .music-grid, .bio, .member, .workshop-grid, .quote, .press-grid, .contact-grid, .video-grid');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(el => el.classList.add('reveal'));
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
  }, { threshold: .12 });
  revealTargets.forEach(el => ro.observe(el));
}

document.getElementById('year').textContent = new Date().getFullYear();
