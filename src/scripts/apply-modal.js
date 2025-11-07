// Apply Modal: injects an overlay + modal with the provided content and handles open/close.
(function () {
  const MODAL_ID = 'apply-modal';
  const OVERLAY_ID = 'apply-modal-overlay';

  function buildModalHtml() {
    // Inject a close attribute to the close button for reliable selection
    return `
      <div id="${OVERLAY_ID}" class="apply-modal-overlay" aria-hidden="true" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:10000;"></div>
      <div id="${MODAL_ID}" class="apply-modal-container" role="dialog" aria-modal="true" aria-label="Application Modal" style="position:fixed;inset:0;display:flex;align-items:flex-start;justify-content:center;padding-top:6vh;z-index:10001;">
        <div class="apply-modal-inner pointer-events-auto w-full max-w-md mx-4 transition-all duration-300 ease-out opacity-100 scale-100" style="transform:none;margin-top:0;">
          <div class="apply-modal-topbar">
            <button data-apply-close class="apply-modal-close">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-5 w-5 text-gray-300"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <div class="apply-modal-card rounded-2xl p-8">
            <div class="mb-6">
              <div class="apply-modal-chip inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4">
                <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"></div>
                <span class="text-xs font-medium text-gray-400 uppercase tracking-wider">Application</span>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">Apply For Your Growth Plan</h2>
              <p class="text-glass-secondary text-sm">Get a custom breakdown of how we'd scale your business</p>
            </div>
            <form class="space-y-4" onsubmit="return false;">
              <div>
                <label for="apply_name" class="block text-sm font-medium text-glass-secondary mb-2">Full Name</label>
                <input type="text" id="apply_name" name="name" required placeholder="John Smith" class="apply-input w-full px-4 py-3 rounded-lg transition-all duration-200">
              </div>
              <div>
                <label for="apply_phone" class="block text-sm font-medium text-glass-secondary mb-2">Phone Number</label>
                <input type="tel" id="apply_phone" name="phone" required placeholder="+1 (555) 000-0000" class="apply-input w-full px-4 py-3 rounded-lg transition-all duration-200">
              </div>
              <div>
                <label for="apply_instagram" class="block text-sm font-medium text-glass-secondary mb-2">Instagram Account</label>
                <input type="text" id="apply_instagram" name="instagram" required placeholder="yourusername" class="apply-input w-full px-4 py-3 rounded-lg transition-all duration-200">
              </div>
              <div class="pt-4">
                <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full glass-button-primary px-6 py-3 text-base font-semibold" type="submit">Apply</button>
              </div>
            </form>
            <p class="text-xs text-glass-secondary text-center mt-4">By submitting, you agree to be contacted</p>
          </div>
        </div>
      </div>
    `;
  }

  function openModal() {
    if (document.getElementById(MODAL_ID)) return; // Already open
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'apply-modal-wrapper');
    wrapper.innerHTML = buildModalHtml();

    document.body.appendChild(wrapper);
    document.body.classList.add('modal-open');

    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
      overlay.addEventListener('click', closeModal);
    }

    const closeBtn = wrapper.querySelector('[data-apply-close]');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    // ESC key closes
    document.addEventListener('keydown', escHandler);

    // Form submit handling
    const form = wrapper.querySelector('form');
    if (form && !form.__applySubmitBound) {
      form.addEventListener('submit', async function (ev) {
        ev.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        const name = (form.querySelector('#apply_name') || {}).value || '';
        const phone = (form.querySelector('#apply_phone') || {}).value || '';
        const instagram = (form.querySelector('#apply_instagram') || {}).value || '';

        // Basic validation
        if (!name || !phone || !instagram) {
          alert('Please fill in all fields.');
          if (submitBtn) submitBtn.disabled = false;
          return;
        }

        // Show simple loading state
        const originalText = submitBtn ? submitBtn.textContent : null;
        if (submitBtn) submitBtn.textContent = 'Sending...';

        try {
          // Attempt to POST to the server endpoint; if it doesn't exist this will fail gracefully
          const res = await fetch('/api/submit-application', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name.trim(), phone: phone.trim(), instagram: instagram.trim() })
          });

          if (!res.ok) {
            // If server returns non-2xx, still show a friendly message and keep modal open
            console.warn('Application submission failed', res.status);
            alert('Submission failed. Please try again or contact us directly.');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = originalText;
            }
            return;
          }

          // Success flow: show confirmation and close modal after short delay
          if (form.parentElement) {
            const card = form.closest('.apply-modal-card');
            if (card) {
              card.innerHTML = '<div class="text-center p-8"><h3 class="text-lg font-bold mb-2">Thanks — application received</h3><p class="text-sm text-glass-secondary mb-4">We will contact you shortly.</p></div>';
            }
          }

          setTimeout(closeModal, 1400);
        } catch (err) {
          console.error('Submit error', err);
          alert('An error occurred while submitting. Please try again.');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }
      });
      form.__applySubmitBound = true;
    }
  }

  function closeModal() {
    const wrapper = document.getElementById('apply-modal-wrapper');
    if (wrapper) wrapper.remove();
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', escHandler);
  }

  function escHandler(e) {
    if (e.key === 'Escape') closeModal();
  }

  function init() {
    // Click handlers for any element with data-apply-trigger
    const attach = () => {
      document.querySelectorAll('[data-apply-trigger]').forEach((el) => {
        if (!el.__applyBound) {
          el.addEventListener('click', (ev) => {
            ev.preventDefault();
            openModal();
          });
          el.__applyBound = true;
        }
      });
    };

    attach();
    // In case of dynamic content updates, re-attach on mutations
    const mo = new MutationObserver(() => attach());
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  // No runtime CSS injection; styles live in src/styles/custom.css

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
