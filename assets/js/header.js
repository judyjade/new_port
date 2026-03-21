document.addEventListener('DOMContentLoaded', function () {
    // Elementos de controle do menu
    const menuToggle = document.getElementById('menuToggle');
    const menuAberto = document.querySelector('.menu-aberto');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const body = document.body;
    const header = document.querySelector('.header');
    const backToTop = document.getElementById('backToTop');
    const whatsappButton = document.getElementById('whatsappButton');

    /**
     * Lógica do Menu Mobile
     */
    function toggleMenu(isOpen) {
        if (isOpen) {
            menuAberto.classList.add('active');
            body.style.overflow = 'hidden';
        } else {
            menuAberto.classList.remove('active');
            body.style.overflow = 'auto';
        }
    }

    menuToggle.addEventListener('change', function () {
        toggleMenu(this.checked);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            menuToggle.checked = false;
            toggleMenu(false);
        });
    });

    /**
     * Lógica de Slides (Portfólio)
     */
    const slideContainers = document.querySelectorAll('.slide-container');

    slideContainers.forEach(container => {
        const slides = container.querySelectorAll('.slide img');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(img => img.classList.remove('active'));
            
            if (index >= slides.length) currentSlide = 0;
            else if (index < 0) currentSlide = slides.length - 1;
            else currentSlide = index;

            slides[currentSlide].classList.add('active');
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        }

        // Auto-play opcional
        // setInterval(() => showSlide(currentSlide + 1), 5000);
    });

    /**
     * Lógica de Scroll
     */
    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            header.style.padding = '1rem 5%';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.padding = '1.5rem 5%';
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        }

        if (scrollTop > 300) {
            if (backToTop) {
                backToTop.style.display = 'flex';
                setTimeout(() => { backToTop.style.opacity = '1'; }, 10);
            }
            if (whatsappButton) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.display = 'flex';
            }
        } else {
            if (backToTop) {
                backToTop.style.opacity = '0';
                setTimeout(() => { backToTop.style.display = 'none'; }, 500);
            }
        }
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true, offset: 100 });
    }
});
