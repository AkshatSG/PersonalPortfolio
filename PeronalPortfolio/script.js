// Page switching
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

function showPage(name) {
  pages.forEach(p => {
    p.classList.remove('active', 'visible');
  });
  navLinks.forEach(a => a.classList.remove('active'));

  const page = document.getElementById(`page-${name}`);
  const link = document.querySelector(`.nav-link[data-page="${name}"]`);

  if (page) {
    page.classList.add('active');
    // Slight delay so display:block has rendered before opacity transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => page.classList.add('visible'));
    });
  }
  if (link) link.classList.add('active');
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    showPage(page);
    history.replaceState(null, '', `#${page}`);
  });
});

// Restore page from hash on load
const hash = location.hash.replace('#', '');
if (hash && document.getElementById(`page-${hash}`)) {
  showPage(hash);
} else {
  // Trigger initial visible transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const first = document.querySelector('.page.active');
      if (first) first.classList.add('visible');
    });
  });
}

// Live clock — Berkeley / San Francisco (PT)
function updateClock() {
  const now = new Date();
  const opts = {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const parts = new Intl.DateTimeFormat('en-US', opts).formatToParts(now);
  const h = parts.find(p => p.type === 'hour').value;
  const m = parts.find(p => p.type === 'minute').value;
  const s = parts.find(p => p.type === 'second').value;

  const clockEl = document.getElementById('clock');
  if (clockEl) {
    clockEl.innerHTML = `${h}:${m}:${s}<span class="clock-tz">San Francisco, CA</span>`;
  }
}

updateClock();
setInterval(updateClock, 1000);
