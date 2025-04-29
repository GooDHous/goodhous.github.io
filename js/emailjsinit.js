(function() {
    emailjs.init({
      publicKey: "Q1eo0aZ7v8jPpk-9U",
    });
})();
window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('service_scc', 'template_g6hqj79', this)
        emailjs.sendForm('service_scc', 'TMP', this)
            .then(() => {
                console.log('SUCCESS!');
                redirect("https://discord.gg/2DvVhaNARJ")

            }, (error) => {
                console.log('FAILED...', error);
            });
    });
}