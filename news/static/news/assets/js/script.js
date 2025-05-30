document.addEventListener('DOMContentLoaded', () => {
    // Инициализация GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Анимация появления навбара
    const tl = gsap.timeline();
    tl.to('.navbar', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    })
        .to('.navbar-brand', {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.6")
        .to('.nav-link', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.2)"
        }, "-=0.4")
        .to('.auth-btn', {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.3");

    // Эффект при скролле
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        onEnter: () => {
            gsap.to('.navbar', {
                backgroundColor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                duration: 0.5
            });
        },
        onLeaveBack: () => {
            gsap.to('.navbar', {
                backgroundColor: "rgba(255,255,255,1)",
                backdropFilter: "blur(0px)",
                duration: 0.5
            });
        }
    });

    // Кастомная логика для dropdown
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            const menu = dropdown.querySelector('.dropdown-menu');
            const isOpen = dropdown.classList.contains('show');

            // Закрываем все другие dropdown
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('show');
                    gsap.to(item.querySelector('.dropdown-menu'), {
                        opacity: 0,
                        y: -10,
                        onComplete: () => item.querySelector('.dropdown-menu').style.display = 'none'
                    });
                }
            });

            // Переключаем текущий dropdown
            if (!isOpen) {
                dropdown.classList.add('show');
                menu.style.display = 'block';
                gsap.fromTo(menu,
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.3 }
                );
            } else {
                gsap.to(menu, {
                    opacity: 0,
                    y: -10,
                    duration: 0.2,
                    onComplete: () => {
                        dropdown.classList.remove('show');
                        menu.style.display = 'none';
                    }
                });
            }
        });
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown').forEach(item => {
                const menu = item.querySelector('.dropdown-menu');
                if (item.classList.contains('show')) {
                    gsap.to(menu, {
                        opacity: 0,
                        y: -10,
                        duration: 0.2,
                        onComplete: () => {
                            item.classList.remove('show');
                            menu.style.display = 'none';
                        }
                    });
                }
            });
        }
    });
    gsap.from('.hero-text h1', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out"
    });

    gsap.from('.hero-text p', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.6,
        ease: "power2.out"
    });

    gsap.from('.hero-btn', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
        onComplete: function () {
            // Фиксим баг с исчезновением кнопки
            document.querySelector('.hero-btn').style.display = 'inline-block';
            document.querySelector('.hero-btn').style.opacity = '1';
        }
    });

    gsap.from('.blue-circle', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "elastic.out(1, 0.5)"
    });

    gsap.from('.blue-overlay', {
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out"
    });
});

document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const dropdown = this.closest('.dropdown');
        const menu = dropdown.querySelector('.dropdown-menu');

        // Закрываем все другие dropdown
        document.querySelectorAll('.dropdown').forEach(item => {
            if (item !== dropdown) {
                item.classList.remove('show');
            }
        });

        // Переключаем текущий dropdown
        dropdown.classList.toggle('show');
    });
});



// Идеальное управление dropdown
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const dropdown = this.closest('.dropdown');
        const menu = dropdown.querySelector('.dropdown-menu');
        const isOpen = dropdown.classList.contains('show');

        // Закрываем все dropdown
        document.querySelectorAll('.dropdown').forEach(item => {
            item.classList.remove('show');
            item.querySelector('.dropdown-menu').style.opacity = '0';
        });

        // Открываем текущий если был закрыт
        if (!isOpen) {
            dropdown.classList.add('show');
            gsap.to(menu, {
                opacity: 1,
                y: 0,
                duration: 0
            });
        }
    });
});

// Закрытие при клике в любом месте
document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(item => {
            const menu = item.querySelector('.dropdown-menu');
            if (item.classList.contains('show')) {
                gsap.to(menu, {
                    opacity: 0,
                    y: 10,
                    duration: 0.2,
                    onComplete: () => item.classList.remove('show')
                });
            }
        });
    }
});

document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Подключаем ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Сначала скрываем элементы перед анимацией
    gsap.set('.investment-card', { opacity: 0, y: 50 });
    gsap.set('.investment-tag', { opacity: 0, x: -20 });
    gsap.set('.view-all-btn', { opacity: 0, y: 30 });

    // Анимация карточек
    gsap.utils.toArray('.investment-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            },
            duration: 0.8,
            y: 0,
            opacity: 1,
            ease: "back.out(1.2)",
            delay: index * 0.1
        });
    });

    // Анимация тегов
    gsap.utils.toArray('.investment-tag').forEach(tag => {
        gsap.to(tag, {
            scrollTrigger: {
                trigger: tag.closest('.investment-card'),
                start: "top 70%",
                toggleActions: "play none none none",
                once: true
            },
            duration: 0.5,
            x: 0,
            opacity: 1,
            ease: "power2.out"
        });
    });

    // Анимация кнопки после всех карточек
    const lastCard = document.querySelector('.investment-card:last-child');

    gsap.to('.view-all-btn', {
        scrollTrigger: {
            trigger: lastCard,
            start: "bottom 70%",
            toggleActions: "play none none none",
            once: true
        },
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "elastic.out(1, 0.5)",
        delay: 0.3 // Небольшая задержка после последней карточки
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Анимация для ВСЕХ прогресс-баров
    gsap.utils.toArray('.progress-bar').forEach(bar => {
        const targetWidth = bar.getAttribute('data-percent') + '%';

        // Анимация заполнения
        gsap.fromTo(bar,
            { width: '0%', opacity: 0 },
            {
                width: targetWidth,
                opacity: 1,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: bar.closest('.investment-card'),
                    start: 'top 80%',
                    once: true
                }
            }
        );

        // Эффекты при наведении
        bar.addEventListener('mouseenter', () => {
            gsap.to(bar, {
                scaleY: 1.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        bar.addEventListener('mouseleave', () => {
            gsap.to(bar, {
                scaleY: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
});

// Анимация при скролле
document.addEventListener('DOMContentLoaded', function () {
    const section = document.getElementById('investment-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(section);

    // Инициализация анимаций для дочерних элементов
    const animatedElements = document.querySelectorAll('.investment-description-7m, .investment-chart-7m, .circArc');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
    });

    const childObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        childObserver.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Инициализация GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Анимация появления секции
    gsap.to("#capitalSection", {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#capitalSection",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Анимация текста
    gsap.to(".capital-heading span", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".capital-heading",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.to(".capital-description span", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.6,
        scrollTrigger: {
            trigger: ".capital-description",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Анимация кнопки
    gsap.to(".capital-button", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1,
        scrollTrigger: {
            trigger: ".capital-button",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Анимация изображений
    gsap.to(".MainImg1", {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
            trigger: ".MainImg1",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.to(".SecImg", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".SecImg",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Парящая анимация для второстепенного изображения
    gsap.to(".SecImg", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Инициализация GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Анимация появления футера
    gsap.to(".footer-top", {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    gsap.to(".footer-bottom", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Анимация элементов брендинга
    gsap.to(".footer-branding p", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".footer-branding",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    // Анимация ссылок
    gsap.to(".footer-links", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.7,
        scrollTrigger: {
            trigger: ".footer-links",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    // Анимация отдельных пунктов меню
    gsap.to(".footer-links ul li", {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 1,
        scrollTrigger: {
            trigger: ".footer-links",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    // Анимация кнопки скролла
    gsap.to(".scroll-up", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1.2,
        scrollTrigger: {
            trigger: ".scroll-up",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    // Анимация формы подписки
    gsap.to(".newsletter label", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.5,
        scrollTrigger: {
            trigger: ".newsletter",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    gsap.to(".input-wrapper", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.7,
        scrollTrigger: {
            trigger: ".input-wrapper",
            start: "top 90%",
            toggleActions: "play none none none"
        }
    });

    // Анимация социальных иконок
    gsap.to(".social-icons a", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0, // Убираем stagger для одновременного появления
        delay: 0.9,
        scrollTrigger: {
            trigger: ".social-icons",
            start: "top 90%",
            toggleActions: "play none none none",
            onEnter: () => {
                document.querySelector('.social-icons').classList.add('animated');
            }
        }
    });

    // Парящая анимация для кнопки скролла
    gsap.to(".scroll-up .circle", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        threshold: 0.1
    };

    const animateIn = (el, delay = 0) => {
        el.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseFloat(el.dataset.delay || 0);
                animateIn(el, delay);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".footer-top, .footer-branding p, .footer-links, .footer-links ul li, .scroll-up, .footer-bottom, .newsletter label, .input-wrapper, .social-icons a")
        .forEach((el, index) => {
            el.dataset.delay = (index * 0.1).toFixed(1);
            observer.observe(el);
        });
});

// Investment Cards Flip Logic
document.addEventListener('DOMContentLoaded', function() {
    // Mobile card click handler
    function handleCardClick(e) {
        // Don't flip if clicking on a link
        if (e.target.closest('a')) return;
        
        // Close other open cards
        document.querySelectorAll('.investment-card').forEach(card => {
            if (card !== this && card.classList.contains('active')) {
                card.classList.remove('active');
            }
        });
        
        // Toggle current card
        this.classList.toggle('active');
    }

    // Setup cards based on screen size
    function setupCards() {
        const isMobile = window.innerWidth <= 768;
        
        document.querySelectorAll('.investment-card').forEach(card => {
            // Remove previous handlers
            card.removeEventListener('click', handleCardClick);
            
            // Add handler only for mobile
            if (isMobile) {
                card.addEventListener('click', handleCardClick);
            }
        });
    }

    // Initial setup
    setupCards();
    
    // Update on resize
    window.addEventListener('resize', setupCards);
});