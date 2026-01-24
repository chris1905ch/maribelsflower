document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.getElementById('preloader');
    const body = document.body;

    const startRevealAnimations = () => {
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
    };

    if (preloader) {
        // Wait 3 seconds (3000ms) as requested by user
        setTimeout(() => {
            preloader.classList.add('slide-up');
            body.classList.remove('loading');

            // Start reveal animations as preloader fades
            startRevealAnimations();

            // Remove from DOM after transition completes (1.2s transition in CSS)
            setTimeout(() => {
                preloader.remove();
            }, 1200);
        }, 3000);
    } else {
        // If no preloader, start animations immediately
        startRevealAnimations();
    }

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

    // Valentine's Floating Hearts
    const createHeart = () => {
        if (document.hidden) return; // Don't create hearts if tab is inactive

        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    };

    // Only start hearts after preloader is gone or if no preloader
    const startHearts = () => {
        setInterval(createHeart, 800);
    };

    if (preloader) {
        // Preloader Hearts - subtle and elegant
        const createPreloaderHeart = () => {
            if (!document.getElementById('preloader')) return;

            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';

            // Focus hearts around the logo area
            const randomX = Math.random() * 60 - 30; // -30 to 30px offset
            heart.style.left = `calc(50% + ${randomX}px)`;
            heart.style.bottom = '40%'; // Start near the logo/text
            heart.style.fontSize = (Math.random() * 5 + 10) + 'px';
            heart.style.opacity = Math.random() * 0.3 + 0.1;

            preloader.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000);
        };

        const preloaderHeartInterval = setInterval(createPreloaderHeart, 600);

        // Wait for preloader to finish (3000ms + 1200ms transition)
        setTimeout(() => {
            clearInterval(preloaderHeartInterval);
            startHearts();
        }, 4200);
    } else {
        startHearts();
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Get all card images
    const cardImages = document.querySelectorAll('.card-img img');

    cardImages.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            // Use the arrangement title as caption
            const cardInfo = img.closest('.card').querySelector('.card-info h3');
            captionText.innerHTML = cardInfo ? cardInfo.innerText : img.alt;

            // Disable scroll
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
});
