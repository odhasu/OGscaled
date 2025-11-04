document.addEventListener('DOMContentLoaded', () => {
  const applyBtn = document.getElementById('applyBtn');
  const applyTop = document.getElementById('applyTop');
  const applyPrimary = document.getElementById('applyPrimary');
  const modal = document.getElementById('applyModal');
  const closeBtn = document.getElementById('closeModal');
  const form = document.getElementById('applyForm');
  const msg = document.getElementById('formMessage');
  const header = document.getElementById('siteHeader');

  function openModal() { modal.classList.remove('hidden'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; setTimeout(() => document.querySelector('.modal-inner input')?.focus(), 120); }
  function closeModal() { modal.classList.add('hidden'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

  [applyBtn, applyTop, applyPrimary].forEach(el => { if (!el) return; el.addEventListener('click', (e) => { e.preventDefault(); openModal(); }); });

  closeBtn?.addEventListener('click', () => closeModal());
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Smooth scroll with header offset for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#apply') return; // handled by modal
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const offset = header ? header.getBoundingClientRect().height : 0;
      const top = window.scrollY + el.getBoundingClientRect().top - offset - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Form validation & submit (wired to server /api/apply)
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form) return;
    const fullName = form.elements['fullName'];
    const email = form.elements['email'];
    const phone = form.elements['phone'];

    msg.textContent = '';

    if (!fullName.value.trim() || fullName.value.trim().length < 2) { msg.textContent = 'Please enter your full name.'; fullName.focus(); return; }
    if (!email.checkValidity()) { msg.textContent = 'Please enter a valid email.'; email.focus(); return; }
    const phoneVal = phone.value.trim();
    const phoneRx = /^\+?[0-9\s\-()]{7,}$/;
    if (!phoneRx.test(phoneVal)) { msg.textContent = 'Please enter a valid phone number.'; phone.focus(); return; }

    // Submit to API
    try {
      msg.style.color = 'var(--muted)';
      msg.textContent = 'Sending application...';
      const payload = { fullName: fullName.value.trim(), email: email.value.trim(), phone: phoneVal };
      const res = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const err = await res.json().catch(() => ({ error: 'unknown' })); msg.style.color = 'salmon'; msg.textContent = 'Submission failed: ' + (err.error || res.statusText); return; }
      const data = await res.json();
      // show response
      if (data.license) {
        msg.style.color = 'lightgreen';
        msg.innerHTML = `Application submitted. License created: <strong>${data.license.key}</strong>`;
      } else {
        msg.style.color = 'lightgreen';
        msg.textContent = 'Application submitted — we will reach out soon.';
      }
      form.reset();
      setTimeout(() => closeModal(), 1200);
    } catch (err) {
      msg.style.color = 'salmon';
      msg.textContent = 'Failed to submit — server unreachable';
      console.error(err);
    }
  });

  // --- Video luminance watcher: sample hero video and update CSS variable --hero-luma (0..1)
  (function setupHeroLuma() {
    const vid = document.getElementById('heroVideo');
    if (!vid) return;
    const canvas = document.createElement('canvas');
    const w = 64, h = 36;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    let timer = null;

    function sampleOnce() {
      try {
        ctx.drawImage(vid, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        let sum = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          // Rec. 709 luminance
          const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          sum += l; count++;
        }
        const avg = count ? (sum / count) : 0;
        // Normalize and dampen a bit for smoothness
        const clamped = Math.min(1, Math.max(0, avg));
        // apply exponential smoothing to avoid abrupt flicker
        prev = (prev * 0.85) + (clamped * 0.15);
        document.documentElement.style.setProperty('--hero-luma', prev.toFixed(3));
      } catch (e) {
        // reading pixels may fail if cross-origin; silently ignore
        // stop timer
        stop();
      }
    }

    let prev = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hero-luma')) || 0.35;
    function start() { if (timer) return; timer = setInterval(() => { if (!vid.paused && vid.readyState >= 2) sampleOnce(); }, 250); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    vid.addEventListener('play', start);
    vid.addEventListener('pause', stop);
    vid.addEventListener('ended', stop);
    // start immediately if already playing
    if (!vid.paused && vid.readyState >= 2) start();
    // also sample once on loadmetadata
    vid.addEventListener('loadeddata', () => sampleOnce());
  })();

  // scroll reveal: observe elements with .animate-on-scroll and add .in when visible
  (function setupScrollReveal() {
    try {
      const els = Array.from(document.querySelectorAll('.animate-on-scroll'));
      if (!els.length) return;
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      els.forEach(el => io.observe(el));
    } catch (e) { /* noop */ }
  })();

});
