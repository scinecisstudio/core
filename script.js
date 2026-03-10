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
const galleryPagers = document.querySelectorAll('.gallery-grid-pager');
const activeAnimations = new WeakMap();

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

const easeInOutCubic = (t) => {
  if (t < 0.5) {
    return 4 * t * t * t;
  }
  return 1 - Math.pow(-2 * t + 2, 3) / 2;
};

const animateScrollTo = (scroller, targetLeft, durationMs) => {
  const previousAnimation = activeAnimations.get(scroller);
  if (previousAnimation) {
    window.cancelAnimationFrame(previousAnimation);
  }

  const startLeft = scroller.scrollLeft;
  const maxLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  const finalLeft = Math.max(0, Math.min(targetLeft, maxLeft));
  const delta = finalLeft - startLeft;
  if (Math.abs(delta) < 1) {
    scroller.scrollLeft = finalLeft;
    return;
  }

  const startTime = performance.now();
  const step = (now) => {
    const progress = Math.min(1, (now - startTime) / durationMs);
    const eased = easeInOutCubic(progress);
    scroller.scrollLeft = startLeft + delta * eased;

    if (progress < 1) {
      const id = window.requestAnimationFrame(step);
      activeAnimations.set(scroller, id);
    } else {
      activeAnimations.delete(scroller);
      updatePagerIndicators(scroller);
    }
  };

  const id = window.requestAnimationFrame(step);
  activeAnimations.set(scroller, id);
};

galleryPagers.forEach((scroller) => {
  if (!scroller.id) {
    return;
  }

  const indicatorWrap = document.querySelector(`.gallery-pager-indicators[data-for="${scroller.id}"]`);
  if (!indicatorWrap) {
    return;
  }

  const slides = scroller.querySelectorAll('.gallery-card');
  const slideList = Array.from(slides);
  const dots = Array.from(slides, (_, idx) => {
    const dot = document.createElement('span');
    dot.className = 'gallery-pager-indicator';
    if (idx === 0) {
      dot.classList.add('is-active');
    }
    return dot;
  });

  indicatorWrap.replaceChildren(...dots);
  if (slideList.length > 1) {
    const initialSlide = slideList[1];
    const initialLeft = initialSlide.offsetLeft - (scroller.clientWidth - initialSlide.clientWidth) / 2;
    scroller.scrollLeft = initialLeft;
  }
  scroller.addEventListener('scroll', () => updatePagerIndicators(scroller), { passive: true });
  window.addEventListener('resize', () => updatePagerIndicators(scroller));
  updatePagerIndicators(scroller);

  if (slideList.length > 1) {
    let autoScrollTimer = null;
    let userPaused = false;

    const scrollToIndex = (index) => {
      const targetSlide = slideList[index];
      const targetLeft = targetSlide.offsetLeft - (scroller.clientWidth - targetSlide.clientWidth) / 2;
      animateScrollTo(scroller, targetLeft, 900);
    };

    const tick = () => {
      if (userPaused) {
        return;
      }
      const currentIndex = getActiveSlideIndex(scroller, slideList);
      const nextIndex = (currentIndex + 1) % slideList.length;
      scrollToIndex(nextIndex);
    };

    const startAutoScroll = () => {
      if (autoScrollTimer !== null) {
        return;
      }
      autoScrollTimer = window.setInterval(tick, 3000);
    };

    const stopAutoScroll = () => {
      if (autoScrollTimer === null) {
        return;
      }
      window.clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    };

    scroller.addEventListener('mouseenter', () => {
      userPaused = true;
      stopAutoScroll();
    });
    scroller.addEventListener('mouseleave', () => {
      userPaused = false;
      startAutoScroll();
    });
    scroller.addEventListener('touchstart', () => {
      userPaused = true;
      stopAutoScroll();
    }, { passive: true });
    scroller.addEventListener('touchend', () => {
      userPaused = false;
      startAutoScroll();
    }, { passive: true });

    startAutoScroll();
  }
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

    animateScrollTo(scroller, targetLeft, 700);
  });
});
