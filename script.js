document.addEventListener('DOMContentLoaded', () => {

    const resetScrollPosition = () => {
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;

        root.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        root.scrollTop = 0;
        document.body.scrollTop = 0;
        root.style.scrollBehavior = previousScrollBehavior;
    };

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    const hasValidHashTarget =
        window.location.hash && document.querySelector(window.location.hash);

    if (!hasValidHashTarget) {
        resetScrollPosition();

        window.addEventListener('load', () => {
            requestAnimationFrame(resetScrollPosition);
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // (Reservation form removed)

});
