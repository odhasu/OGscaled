// Scroll Handler Component
// Manages scroll-based animations and effects

class ScrollHandler {
  constructor() {
    this.header = document.querySelector('header');
    this.lastScroll = 0;
    this.ticking = false;
    
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
  }

  handleScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.updateHeader();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateHeader() {
    const currentScroll = window.pageYOffset;
    
    if (this.header) {
      if (currentScroll > 100) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }

      // Hide/show header on scroll direction
      if (currentScroll > this.lastScroll && currentScroll > 200) {
        this.header.classList.add('hidden');
      } else {
        this.header.classList.remove('hidden');
      }
    }

    this.lastScroll = currentScroll;
  }

  static init() {
    return new ScrollHandler();
  }
}

export default ScrollHandler;
