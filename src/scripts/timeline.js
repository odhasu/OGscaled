// Timeline visibility script
document.addEventListener('DOMContentLoaded', function () {
  try {
    // Make timeline items, dots, and deliverable cards visible
    document.querySelectorAll('.timeline-item').forEach(function (el) {
      el.classList.add('timeline-item-visible');
    });
    
    document.querySelectorAll('.timeline-dot').forEach(function (el) {
      el.classList.add('timeline-dot-visible');
    });
    
    document.querySelectorAll('.deliverable-card').forEach(function (el) {
      el.classList.add('deliverable-card-visible');
    });

    // Remove the "Real Stories, Real Results" section
    var realStoriesHeading = Array.from(document.querySelectorAll('h3'))
      .find(function (el) {
        return el.textContent && el.textContent.trim().toLowerCase() === 'real stories, real results';
      });
      
    if (realStoriesHeading) {
      var container = realStoriesHeading.closest('.mb-20');
      if (container) {
        container.remove();
      }
    }
  } catch (e) {
    // Fail silently to avoid breaking the page
    console.warn('Timeline visibility script error:', e);
  }
});
