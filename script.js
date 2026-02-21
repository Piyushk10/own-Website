// Disable right click
document.addEventListener("contextmenu", e => e.preventDefault());

// Disable keyboard shortcuts
document.addEventListener("keydown", e => {
  if (
    e.ctrlKey &&
    ["s", "u", "p", "c", "i"].includes(e.key.toLowerCase())
  ) {
    e.preventDefault();
  }
});

// Disable image drag & open
document.querySelectorAll("img").forEach(img => {
  img.setAttribute("draggable", "false");
  img.addEventListener("click", e => e.preventDefault());
});
// ===== Safari Compatible Smart Scroll =====

document.addEventListener("DOMContentLoaded", function () {

  const links = document.querySelectorAll("nav a");

  links.forEach(link => {

    link.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      const start = window.scrollY;
      const end = target.getBoundingClientRect().top + window.scrollY - 10;
      const distance = Math.abs(end - start);

      const duration = distance < 800 ? 800 : 300;

      animateScroll(start, end, duration);
    });

  });

  function animateScroll(start, end, duration) {

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);

      const ease = easeInOutCubic(percent);

      window.scrollTo(0, start + (end - start) * ease);

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

});