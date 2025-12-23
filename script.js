document.addEventListener('DOMContentLoaded', () => {
    // Unified Reveal Animation Logic
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Hero Parallax Effect
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });

    // Filter Logic for Catalog
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const menuCloseBtn = document.getElementById('menu-close');
    const navLinksList = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const navItems = document.querySelectorAll('.nav-links a');

    const toggleMenu = () => {
        navLinksList.classList.toggle('show');
        navOverlay.classList.toggle('show');
        // Prevent scrolling when menu is open
        document.body.style.overflow = navLinksList.classList.contains('show') ? 'hidden' : '';
    };

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', toggleMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinksList.classList.contains('show')) {
                toggleMenu();
            }
        });
    });

    // Smooth reveal for header on scroll
    let lastScroll = 0;
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
        } else {
            header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
        lastScroll = currentScroll;
    });
});
