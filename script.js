const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 900);
});

// Intersection Observer for reveal animations
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
});

animatedElements.forEach(el => observer.observe(el));

// Parallax effect
const parallaxSections = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    parallaxSections.forEach(section => {
        const speed = parseFloat(section.dataset.speed) || 0.2;
        section.style.transform = `translateY(${scrollTop * speed * -0.2}px)`;
    });
});

// Magnetic tilt effect
const tiltElements = document.querySelectorAll('[data-tilt]');
const maxTilt = 12;

tiltElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const handleMove = (event) => {
        const bounds = el.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        const rotateX = ((y - centerY) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * -maxTilt;
        el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };

    const reset = () => {
        el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', reset);
});

// Active navigation link on scroll
const navLinks = document.querySelectorAll('.header__nav a');
const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

const setActiveLink = () => {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach((section, index) => {
        if (!section) return;
        const { offsetTop, offsetHeight } = section;
        const inSection = scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight;
        navLinks[index].classList.toggle('active', inSection);
    });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Back to top visibility
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scroll for anchor links
const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            event.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Prevent default submit for demo subscription form
const subscribeForm = document.querySelector('.footer__form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        subscribeForm.classList.add('success');
        subscribeForm.innerHTML = '<span class="footer__success">Спасибо! Мы свяжемся с вами в ближайшее время.</span>';
    });
}
