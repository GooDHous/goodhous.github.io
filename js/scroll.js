function throttle(func, delay) {
    let timeout = null;
    return function() {
        if (!timeout) {
            timeout = setTimeout(() => {
                func.apply(this, arguments);
                timeout = null;
            }, delay);
        }
    };
}

function handleScroll() {
    const backToTop = document.querySelector('.back-to-top');
    const loadingBar = document.querySelector('.loading-bar');
    
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min((window.pageYOffset / scrollableHeight) * 100, 100);
    loadingBar.style.width = scrollPercent + '%';
}

document.body.addEventListener('click', function(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', throttle(handleScroll, 100));
    
    document.querySelectorAll('.app-card, .protocol-card').forEach(card => {
        observer.observe(card);
    });
});