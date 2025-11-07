// src/scripts/stats-animate.js
// Canonical animation script for `.stat-number` elements
(function () {
    'use strict';

    // small debug to confirm the script was loaded
    try {
        console.log('[stats-animate] loaded');
    } catch (e) {
        // ignore if console isn't available
    }

    function formatNumber(value, el) {
        var format = el.getAttribute('data-format') || '';
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        var n = Number(value) || 0;
        if (format === 'short') {
            if (n >= 1000000) return prefix + (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M' + suffix;
            if (n >= 1000) return prefix + (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K' + suffix;
        }
        return prefix + Math.round(n).toLocaleString() + suffix;
    }

    function animateCount(el, start, end, duration) {
        var startTime = performance.now();
        function tick(now) {
            var elapsed = now - startTime;
            var t = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
            var current = start + (end - start) * eased;
            el.textContent = formatNumber(current, el);
            if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    // Start animation helper (reads data-* attrs and schedules the animation)
    function startAnimationForElement(el) {
        if (!el || el.dataset.animated === 'true') return;
        var end = Number(el.getAttribute('data-value')) || 0;
        var duration = Math.max(0, Number(el.getAttribute('data-duration')) || 1000);
        var delay = Math.max(0, Number(el.getAttribute('data-delay')) || 0);
        if (end === 0) {
            el.dataset.animated = 'true';
            return;
        }
        setTimeout(function () {
            animateCount(el, 0, end, duration);
            el.dataset.animated = 'true';
        }, delay);
    }

    function init() {
        var els = document.querySelectorAll('.stat-number');
        if (!els || els.length === 0) return;

        var supportsIO = 'IntersectionObserver' in window;
        var observer = null;
        if (supportsIO) {
            observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    var target = entry.target;
                    startAnimationForElement(target);
                    observer.unobserve(target);
                });
            }, { threshold: 0.2 });
        }

        els.forEach(function (el) {
            // initialize to 0 formatted
            el.textContent = formatNumber(0, el);

            // if already animated, skip
            if (el.dataset.animated === 'true') return;

            if (supportsIO) {
                observer.observe(el);
            } else {
                // fallback for older browsers: run immediately
                startAnimationForElement(el);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
