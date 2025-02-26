document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contact-form');
    const messageContainer = document.querySelector('.form-message');

    // Alternar el menú de hamburguesa
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Evita el comportamiento predeterminado
            const targetId = this.getAttribute('href'); // Obtiene el ID de la sección
            const targetSection = document.querySelector(targetId); // Selecciona la sección

            // Desplazamiento suave
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Cierra el menú en dispositivos móviles
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Manejar el envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Evita que el formulario se envíe

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:3000/enviar-formulario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (result.success) {
                    messageContainer.textContent = 'Gracias por contactarnos. Nos pondremos en contacto contigo pronto.';
                    messageContainer.style.color = 'green';
                    contactForm.reset(); // Limpia el formulario
                } else {
                    messageContainer.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
                    messageContainer.style.color = 'red';
                }
            } catch (error) {
                console.error('Error:', error);
                messageContainer.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
                messageContainer.style.color = 'red';
            }
        });
    }
});