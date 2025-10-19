const body = document.body;
const modalTriggers = document.querySelectorAll('[data-modal]');
const modals = document.querySelectorAll('.modal');

modalTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const modalId = trigger.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    openModal(modal);
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target.dataset.close !== undefined || event.target.classList.contains('modal__close')) {
      closeModal(modal);
    }
  });
});

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
}

// Intersection animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.section, .collection-card, .highlight-card, .review-card, .partner-card, .manifesto__grid article, .timeline__item').forEach((element) => {
  element.classList.add('will-animate');
  observer.observe(element);
});

// Parallax effect for backgrounds
const parallaxSections = document.querySelectorAll('.parallax');

window.addEventListener('scroll', () => {
  const offset = window.pageYOffset;
  parallaxSections.forEach((section) => {
    const bg = section.querySelector('.parallax__bg');
    if (bg) {
      bg.style.transform = `translateY(${offset * -0.15}px) scale(1.1)`;
    }
  });
});

// Smooth scroll reveal
window.addEventListener('load', () => {
  document.querySelectorAll('.will-animate').forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.04}s`;
  });
});

// Form submit demo
const form = document.querySelector('.contact__form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Отправлено';
    form.reset();
    setTimeout(() => {
      button.disabled = false;
      button.textContent = 'Отправить';
    }, 3000);
  });
}
