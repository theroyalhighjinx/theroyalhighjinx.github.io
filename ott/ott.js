// Over The Top hub: streaming countdown + link switchover on release day.
// Fill these in as they go live; empty = button stays hidden or falls back to the artist page.
const LINKS = {
  presave: '',   // Show.co Spotify pre-save campaign URL (CD Baby > Tools > Show.co)
  spotify: '',   // https://open.spotify.com/album/...
  apple: '',     // https://music.apple.com/au/album/...
  youtube: '',   // https://music.youtube.com/playlist?list=...
  amazon: '',    // https://music.amazon.com/albums/...
  tidal: '',     // https://tidal.com/album/...
  deezer: ''     // https://www.deezer.com/album/...
};
const RELEASE = new Date('2026-11-13T00:00:00+11:00');

document.querySelectorAll('[data-link]').forEach(a => {
  const url = LINKS[a.dataset.link];
  if (url) { a.href = url; a.hidden = false; }
});

const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, '0');
const tick = () => {
  const ms = RELEASE - Date.now();
  if (ms <= 0) {
    document.querySelectorAll('[data-phase]').forEach(el => { el.hidden = el.dataset.phase !== 'live'; });
    return false;
  }
  const s = Math.floor(ms / 1000);
  $('cd-d').textContent = Math.floor(s / 86400);
  $('cd-h').textContent = pad(Math.floor(s / 3600) % 24);
  $('cd-m').textContent = pad(Math.floor(s / 60) % 60);
  $('cd-s').textContent = pad(s % 60);
  return true;
};
if (tick()) { const t = setInterval(() => { if (!tick()) clearInterval(t); }, 1000); }

$('share').addEventListener('click', async e => {
  const data = { title: 'Over The Top · The Royal High Jinx', text: 'The new Royal High Jinx album, Over The Top 🎻', url: 'https://theroyalhighjinx.com/ott/' };
  try {
    if (navigator.share) await navigator.share(data);
    else { await navigator.clipboard.writeText(data.url); e.target.textContent = 'Link copied!'; }
  } catch (_) {}
});
