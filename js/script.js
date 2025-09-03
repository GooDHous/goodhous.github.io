new Snow ({			
        showSnowBalls: false,
        icon:'<div style="border-radius:50%; display:flex; width:16px; height:16px; background-color:white;"> <img src="img/sf.ico" height="16px" width"16px"" alt="">',
		showSnowBallsIsMobile: false,
		showSnowflakes: true,
		countSnowflake: 40,
		snowBallsLength: 50,
		snowBallIterations: 1000,
		snowBallupNum: 2,
		snowBallIterationsInterval: 10,
		clearSnowBalls: 20000,
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});