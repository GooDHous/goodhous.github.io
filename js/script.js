new Snow ({			
        showSnowBalls: false,
        icon:'<div style="border-radius:50%; display:flex; width:16px; height:16px; background-color:white;"> <img src="https://ywteam.ru/img/sf.ico" height="16px" width"16px"" alt="">',
		showSnowBallsIsMobile: false,
		showSnowflakes: true,
		countSnowflake: 40,
		snowBallsLength: 50,
		snowBallIterations: 1000,
		snowBallupNum: 2,
		snowBallIterationsInterval: 10,
		clearSnowBalls: 20000,
});

function copyCommand() {
    const command = "irm get.ywteam.ru | iex";
    navigator.clipboard.writeText(command).then(() => {
        alert("Команда скопирована в буфер обмена!");
    });
}

function copyUninstallCommand() {
    const command = "irm get.ywteam.ru/uninstall | iex";
    navigator.clipboard.writeText(command).then(() => {
        alert("Команда скопирована в буфер обмена!");
    });
}

function redirect(url) {
    window.open(url, '_blank');
}

window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function copyEmail() {
    const email = "conduct@ywteam.org";
    navigator.clipboard.writeText(email).then(() => {
        alert("Email скопирован в буфер обмена!");
    });
}
        

