const revealElements = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((el) => el.classList.add('show'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 70, 280)}ms`;
    observer.observe(el);
  });
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#site-nav');

if (navToggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.classList.contains('open')) {
      return;
    }

    if (!(event.target instanceof Element)) {
      return;
    }

    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });
}

const pagerButtons = document.querySelectorAll('.gallery-pager-btn');
const tabletPagers = document.querySelectorAll('.gallery-grid-tablet');

const getActiveSlideIndex = (scroller, slides) => {
  const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  slides.forEach((slide, index) => {
    const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
    const distance = Math.abs(slideCenter - viewportCenter);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
};

const updatePagerIndicators = (scroller) => {
  const indicatorWrap = document.querySelector(`.gallery-pager-indicators[data-for="${scroller.id}"]`);
  if (!indicatorWrap) {
    return;
  }

  const slides = scroller.querySelectorAll('.gallery-card');
  if (!slides.length) {
    return;
  }

  const index = getActiveSlideIndex(scroller, Array.from(slides));
  const indicators = indicatorWrap.querySelectorAll('.gallery-pager-indicator');

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('is-active', i === index);
  });
};

tabletPagers.forEach((scroller) => {
  if (!scroller.id) {
    return;
  }

  const indicatorWrap = document.querySelector(`.gallery-pager-indicators[data-for="${scroller.id}"]`);
  if (!indicatorWrap) {
    return;
  }

  const slides = scroller.querySelectorAll('.gallery-card');
  const dots = Array.from(slides, (_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'gallery-pager-indicator';
    if (idx === 0) {
      dot.classList.add('is-active');
    }
    return dot;
  });

  indicatorWrap.replaceChildren(...dots);
  if (slides.length > 1) {
    const initialSlide = slides[1];
    const initialLeft = initialSlide.offsetLeft - (scroller.clientWidth - initialSlide.clientWidth) / 2;
    scroller.scrollLeft = initialLeft;
  }
  scroller.addEventListener('scroll', () => updatePagerIndicators(scroller), { passive: true });
  window.addEventListener('resize', () => updatePagerIndicators(scroller));
  updatePagerIndicators(scroller);
});

pagerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const direction = Number(button.getAttribute('data-dir') || '0');

    if (!targetId || !direction) {
      return;
    }

    const scroller = document.getElementById(targetId);
    if (!scroller) {
      return;
    }

    const slides = Array.from(scroller.querySelectorAll('.gallery-card'));
    if (!slides.length) {
      return;
    }

    const currentIndex = getActiveSlideIndex(scroller, slides);
    const targetIndex = Math.max(0, Math.min(slides.length - 1, currentIndex + direction));
    const targetSlide = slides[targetIndex];
    const targetLeft = targetSlide.offsetLeft - (scroller.clientWidth - targetSlide.clientWidth) / 2;

    scroller.scrollTo({ left: targetLeft, behavior: 'smooth' });
    window.setTimeout(() => updatePagerIndicators(scroller), 280);
  });
});
