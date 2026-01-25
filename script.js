document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.getElementById('preloader');
    const body = document.body;

    const startRevealAnimations = () => {
        const revealElements = document.querySelectorAll('.reveal');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
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

    // If no preloader (unlikely), start animations
    if (!preloader || preloader.style.display === 'none') {
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

    // Creative Blooming Preloader Logic
    const preloaderText = document.querySelector('.preloader-text');

    if (preloaderText) {
        // Split text into letters
        const text = preloaderText.textContent;
        preloaderText.textContent = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${2.5 + (i * 0.05)}s`;
            preloaderText.appendChild(span);
        });

        // Trigger staggered appearance
        setTimeout(() => {
            preloaderText.querySelectorAll('span').forEach(span => span.classList.add('active'));
        }, 100);
    }

    // Falling Petal Particles
    const createPetal = () => {
        if (!preloader || preloader.classList.contains('finish')) return;

        const petal = document.createElement('div');
        petal.classList.add('petal');

        // Random petal variety (different pinks/reds)
        const colors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#ffb3c1'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Random shape (rounded rectangle as petal)
        petal.style.width = `${Math.random() * 10 + 10}px`;
        petal.style.height = `${Math.random() * 15 + 10}px`;
        petal.style.backgroundColor = color;
        petal.style.borderRadius = '50% 0 50% 50%';

        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animation = `petal-fall ${Math.random() * 3 + 4}s linear forwards`;

        preloader.appendChild(petal);
        setTimeout(() => petal.remove(), 7000);
    };

    const petalInterval = setInterval(createPetal, 300);

    // Coordinate the reveal
    window.addEventListener('load', () => {
        // Ensure minimum 4.5 seconds for the full blooming sequence
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('finish');
                clearInterval(petalInterval);

                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.classList.remove('loading');
                    startHearts();
                    startRevealAnimations(); // Trigger reveals after preloader is gone

                    setTimeout(() => preloader.remove(), 500);
                }, 1500);
            }
        }, 4500);
    });

    // Fallback if window load is too slow/fast
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('finish')) {
            preloader.classList.add('finish');
            clearInterval(petalInterval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.remove('loading');
                startHearts();
            }, 1500);
        }
    }, 8000); // Max 8 seconds preloader

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
