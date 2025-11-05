// Main Application Entry Point
// Initializes all components and modules

import VideoPlayer from './components/VideoPlayer.js';
import Timeline from './components/Timeline.js';
import ScrollHandler from './components/ScrollHandler.js';
import { ready } from './utils/dom.js';

class App {
  constructor() {
    this.components = {};
    this.init();
  }

  init() {
    ready(() => {
      this.initComponents();
      this.setupEventListeners();
      console.log('🚀 App initialized successfully');
    });
  }

  initComponents() {
    // Initialize Video Players
    this.components.videoPlayer = VideoPlayer.initAll();
    
    // Initialize Timeline
    this.components.timeline = Timeline.init();
    
    // Initialize Scroll Handler
    this.components.scrollHandler = ScrollHandler.init();
  }

  setupEventListeners() {
    // Apply button clicks
    const applyButtons = document.querySelectorAll('[data-action="apply"]');
    applyButtons.forEach(button => {
      button.addEventListener('click', () => this.handleApplyClick());
    });

    // Form submissions
    const forms = document.querySelectorAll('form[data-form]');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    });
  }

  handleApplyClick() {
    // Scroll to application form or open modal
    const formSection = document.querySelector('#application-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      // Show loading state
      const submitButton = form.querySelector('[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;

      // Submit form (implement your API call here)
      await this.submitForm(data);

      // Show success message
      this.showNotification('Application submitted successfully!', 'success');
      form.reset();

      submitButton.textContent = originalText;
      submitButton.disabled = false;
    } catch (error) {
      console.error('Form submission error:', error);
      this.showNotification('Failed to submit application. Please try again.', 'error');
    }
  }

  async submitForm(data) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form data:', data);
        resolve();
      }, 1000);
    });
  }

  showNotification(message, type = 'info') {
    // Simple notification implementation
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize app
const app = new App();

export default app;
