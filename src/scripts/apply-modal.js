// Apply Modal: injects an overlay + modal with the provided content and handles open/close.
(function () {
  const MODAL_ID = 'apply-modal';
  const OVERLAY_ID = 'apply-modal-overlay';

  function buildModalHtml() {
    // Inject a close attribute to the close button for reliable selection
    return `
      <div id="${OVERLAY_ID}" class="apply-modal-overlay" aria-hidden="true"></div>
      <div id="${MODAL_ID}" class="apply-modal-container" role="dialog" aria-modal="true" aria-label="Application Modal">
        <div class="apply-modal-inner pointer-events-auto w-full max-w-md mx-4 transition-all duration-300 ease-out opacity-100 scale-100 translate-y-0">
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
