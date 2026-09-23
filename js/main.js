/* ==========================================================================
   MUHAMMAD ARSALAN — EDITORIAL PORTFOLIO SCRIPTS
   Inspired by Wish Digitals Interactive Mechanics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. PRELOADER COUNTER
    ========================================= */
    const preloader = document.querySelector('.wd-preloader');
    const preloaderCount = document.querySelector('.wd-preloader-count');
    const preloaderLine = document.querySelector('.wd-preloader-line span');

    if (preloader && preloaderCount) {
        let count = 0;
        const interval = setInterval(() => {
            count += Math.floor(Math.random() * 4) + 2;
            if (count > 100) count = 100;

            const formatted = count < 10 ? `0${count}` : `${count}`;
            preloaderCount.textContent = formatted;
            if (preloaderLine) preloaderLine.style.width = `${count}%`;

            if (count === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('is-loaded');
                }, 400);
            }
        }, 30);
    }

    /* =========================================
       2. CUSTOM DUAL CURSOR
    ========================================= */
    const cursorDot = document.querySelector('.wd-cursor-dot');
    const cursorRing = document.querySelector('.wd-cursor-ring');
    const cursorText = cursorRing ? cursorRing.querySelector('span') : null;

    if (cursorDot && cursorRing && window.innerWidth > 992) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth follower loop for ring
        function renderCursor() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Hover detection
        const hoverTargets = document.querySelectorAll('a, button, [data-tilt], .wd-work-card, .wd-unit-panel');
        hoverTargets.forEach((target) => {
            target.addEventListener('mouseenter', () => {
                cursorRing.classList.add('is-hover');
                const label = target.getAttribute('data-cursor') || (target.classList.contains('wd-work-card') ? 'VIEW' : '↗');
                if (cursorText) cursorText.textContent = label;
            });
            target.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('is-hover');
                if (cursorText) cursorText.textContent = 'VIEW';
            });
        });
    }

    /* =========================================
       3. 3D TILT EFFECT FOR CARDS
    ========================================= */
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 992) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    /* =========================================
       4. HEADER SCROLL STATE
    ========================================= */
    const header = document.querySelector('.wd-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        });
    }

    /* =========================================
       5. MOBILE MENU TOGGLE
    ========================================= */
    const menuToggle = document.querySelector('.wd-menu-toggle');
    const mobileMenu = document.querySelector('.wd-mobile-menu');
    const mobileLinks = document.querySelectorAll('.wd-mobile-links a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            const isActive = mobileMenu.classList.contains('is-active');
            menuToggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    /* =========================================
       6. FAQ ACCORDION
    ========================================= */
    const accordionItems = document.querySelectorAll('.wd-accordion-item');
    accordionItems.forEach((item) => {
        const btn = item.querySelector('.wd-accordion-header');
        const content = item.querySelector('.wd-accordion-content');

        if (btn && content) {
            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');

                // Close all others
                accordionItems.forEach((other) => {
                    other.classList.remove('is-open');
                    const otherContent = other.querySelector('.wd-accordion-content');
                    if (otherContent) otherContent.style.maxHeight = null;
                });

                if (!isOpen) {
                    item.classList.add('is-open');
                    content.style.maxHeight = `${content.scrollHeight}px`;
                }
            });
        }
    });

    /* =========================================
       7. PROJECT BRIEF POPUP MODAL
    ========================================= */
    const popup = document.getElementById('projectPopup');
    const openButtons = document.querySelectorAll('.js-open-popup');
    const closeButtons = document.querySelectorAll('.js-close-popup');
    const projectTypeSelect = document.querySelector('.js-project-select');

    if (popup) {
        openButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const targetService = btn.getAttribute('data-service');
                if (targetService && projectTypeSelect) {
                    // Preselect if matched
                    Array.from(projectTypeSelect.options).forEach((opt) => {
                        if (opt.text.toLowerCase().includes(targetService.toLowerCase())) {
                            opt.selected = true;
                        }
                    });
                }
                popup.classList.add('is-active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                popup.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('is-active')) {
                popup.classList.remove('is-active');
                document.body.style.overflow = '';
            }
        });
    }

    /* =========================================
       8. CONTACT FORM SUBMISSION
    ========================================= */
    const briefForm = document.querySelector('.wd-form');
    if (briefForm) {
        briefForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = briefForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Sending Brief...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you, Arsalan has received your brief! You will get a response within 24 hours.');
                briefForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                if (popup) popup.classList.remove('is-active');
                document.body.style.overflow = '';
            }, 1000);
        });
    }

    /* =========================================
       9. NUMERICAL COUNTER ANIMATION
    ========================================= */
    const counters = document.querySelectorAll('.counter');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                let current = 0;
                const step = Math.ceil(target / 40);

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = current;
                    }
                }, 35);

                countObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((counter) => countObserver.observe(counter));

});
