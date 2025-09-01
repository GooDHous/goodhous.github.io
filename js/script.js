new Snow ({			
        showSnowBalls: false,
        icon:'<div style="border-radius:50%; display:flex; width:16px; height:16px; background-color:white;"> <img src="img/sf.ico" height="16px" width"16px"" alt="">',
		showSnowBallsIsMobile: false,
		showSnowflakes: true,
		countSnowflake: 200,
		snowBallsLength: 50,
		snowBallIterations: 1000,
		snowBallupNum: 2,
		snowBallIterationsInterval: 10,
		clearSnowBalls: 20000,
});


window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
            
    // Анимация индикатора загрузки
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.pageYOffset / scrollableHeight) * 100;
    document.querySelector('.loading-bar').style.width = scrollPercent + '%';
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при прокрутке
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

// Наблюдаем за карточками
document.querySelectorAll('.app-card, .protocol-card').forEach(card => {
    observer.observe(card);
});