// Timeline Component
// Handles timeline animations and interactions

class Timeline {
  constructor() {
    this.items = document.querySelectorAll('.timeline-item');
    this.dots = document.querySelectorAll('.timeline-dot');
    this.cards = document.querySelectorAll('.deliverable-card');
    
    this.init();
  }

  init() {
    this.makeVisible();
    this.setupObserver();
  }

  makeVisible() {
    // Make all timeline elements visible on load
    this.items.forEach(item => item.classList.add('timeline-item-visible'));
    this.dots.forEach(dot => dot.classList.add('timeline-dot-visible'));
    this.cards.forEach(card => card.classList.add('deliverable-card-visible'));
  }

  setupObserver() {
    // Optional: Add Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      this.items.forEach(item => observer.observe(item));
    }
  }

  static init() {
    return new Timeline();
  }
}

export default Timeline;
