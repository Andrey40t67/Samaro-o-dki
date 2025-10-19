const header = document.querySelector('.site-header');
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const backToTop = document.getElementById('backToTop');
const animatedElements = document.querySelectorAll('[data-animate]');
const parallaxSections = document.querySelectorAll('[data-parallax-speed]');

const toggleNav = () => {
    nav.classList.toggle('open');
    const expanded = nav.classList.contains('open');
    navToggle.setAttribute('aria-expanded', expanded);
    document.body.style.overflow = expanded ? 'hidden' : '';
};

navToggle.addEventListener('click', toggleNav);

nav.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
            toggleNav();
        }
    })
);

const handleScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);

    if (window.scrollY > window.innerHeight * 0.5) {
        backToTop.classList.add('visible');
        backToTop.setAttribute('aria-hidden', 'false');
    } else {
        backToTop.classList.remove('visible');
        backToTop.setAttribute('aria-hidden', 'true');
    }

    parallaxSections.forEach((section) => {
        const speed = parseFloat(section.dataset.parallaxSpeed || '0.2');
        const offset = window.scrollY * speed;
        section.style.backgroundPosition = `center ${-offset}px`;
    });
};

window.addEventListener('scroll', handleScroll);
handleScroll();

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
    }
);

animatedElements.forEach((element) => observer.observe(element));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    parallaxSections.forEach((section) => {
        section.style.backgroundAttachment = 'scroll';
    });
}
