const nav = document.querySelector('.nav');
const toTop = document.getElementById('toTop');
const revealables = document.querySelectorAll('[data-reveal]');
const parallaxSections = document.querySelectorAll('[data-parallax]');
const tiltItems = document.querySelectorAll('[data-tilt]');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    if (scrolled > 80) {
        nav?.classList.add('nav--scrolled');
    } else {
        nav?.classList.remove('nav--scrolled');
    }

    if (scrolled > 600) {
        toTop?.classList.add('to-top--visible');
    } else {
        toTop?.classList.remove('to-top--visible');
    }

    parallaxSections.forEach(section => {
        const speed = parseFloat(section.dataset.speed || '0.3');
        const offset = (scrolled + window.innerHeight - section.offsetTop) * speed;
        section.style.setProperty('--parallax-scroll', `${offset}px`);
    });
});

toTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

revealables.forEach(el => observer.observe(el));

const carouselTrack = document.querySelector('.carousel__track');

if (carouselTrack) {
    carouselTrack.addEventListener('mouseenter', () => {
        carouselTrack.style.animationPlayState = 'paused';
    });

    carouselTrack.addEventListener('mouseleave', () => {
        carouselTrack.style.animationPlayState = 'running';
    });
}

const mosaic = document.querySelector('.mosaic');
if (mosaic) {
    mosaic.addEventListener('mousemove', (event) => {
        const rect = mosaic.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mosaic.style.setProperty('--mouse-x', `${x}px`);
        mosaic.style.setProperty('--mouse-y', `${y}px`);
    });
}

tiltItems.forEach(item => {
    item.addEventListener('mousemove', (event) => {
        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'rotateX(0) rotateY(0)';
    });
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
    const gradientElements = document.querySelectorAll('.mosaic__item, .collection-card, .press-card');
    gradientElements.forEach(el => {
        const hue = Math.floor(Math.random() * 360);
        el.style.setProperty('--dynamic-hue', hue);
    });

    window.dispatchEvent(new Event('scroll'));
});
