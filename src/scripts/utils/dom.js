// DOM Utility Functions
// Helper functions for DOM manipulation

export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

export const addClass = (element, className) => {
  if (element) element.classList.add(className);
};

export const removeClass = (element, className) => {
  if (element) element.classList.remove(className);
};

export const toggleClass = (element, className) => {
  if (element) element.classList.toggle(className);
};

export const hasClass = (element, className) => {
  return element ? element.classList.contains(className) : false;
};

export const attr = (element, attribute, value = null) => {
  if (!element) return null;
  if (value === null) {
    return element.getAttribute(attribute);
  }
  element.setAttribute(attribute, value);
  return element;
};

export const removeAttr = (element, attribute) => {
  if (element) element.removeAttribute(attribute);
};

export const on = (element, event, handler, options = {}) => {
  if (element) element.addEventListener(event, handler, options);
};

export const off = (element, event, handler) => {
  if (element) element.removeEventListener(event, handler);
};

export const delegate = (selector, event, handler) => {
  document.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  });
};

export const ready = (callback) => {
  if (document.readyState !== 'loading') {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
};

export const createElement = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag);
  
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'class') {
      element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else {
      element.setAttribute(key, value);
    }
  });

  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
};
