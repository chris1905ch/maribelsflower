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

    // Dynamic Catalog Logic
    const grid = document.querySelector('.arrangements-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    const createProductCard = (product, index) => {
        const delay = (index % 3) * 0.1;
        return `
            <div class="card reveal reveal-up" data-category="${product.category}" style="transition-delay: ${delay}s">
                <div class="card-img" data-product-id="${product.id}">
                    <img src="${product.image}"
                        alt="${product.alt}" loading="lazy"
                        decoding="async">
                </div>
                <div class="card-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="price">${product.price}</span>
                    <a href="https://wa.me/50372788297?text=Hola,%20me%20interesa%20ordenar%20el%20arreglo%20${encodeURIComponent(product.name)}"
                        class="btn-order">Ordenar por WhatsApp</a>
                </div>
            </div>
        `;
    };

    const initFilters = () => {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                const cards = document.querySelectorAll('.card');

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
    };

    const loadProducts = async () => {
        try {
            // Updated to fetch from our new Airtable API
            const response = await fetch('/api/get-products');
            const products = await response.json();

            if (grid) {
                grid.innerHTML = products.map((p, i) => createProductCard(p, i)).join('');

                // Re-initialize reveals for new cards
                startRevealAnimations();
                // Re-initialize filters and lightbox logic for new content
                initFilters();
                initLightbox();
            }
        } catch (error) {
            console.error('Error loading products:', error);
            if (grid) grid.innerHTML = '<p class="error">Error al cargar el catálogo. Por favor intenta más tarde.</p>';
        }
    };

    loadProducts();

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
        const isValentine = document.body.classList.contains('theme-valentine');
        const interval = isValentine ? 400 : 1000; // More hearts in Valentine mode
        setInterval(createHeart, interval);
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

    const initLightbox = () => {
        const cardImages = document.querySelectorAll('.card-img img');
        cardImages.forEach(img => {
            img.parentElement.onclick = () => {
                lightbox.style.display = 'block';
                lightboxImg.src = img.src;
                const cardInfo = img.closest('.card').querySelector('.card-info h3');
                captionText.innerHTML = cardInfo ? cardInfo.innerText : img.alt;
                document.body.style.overflow = 'hidden';
            };
        });
    };

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

    // FAQ Accordion Toggle
    const initAccordion = () => {
        const accordionHeaders = document.querySelectorAll('.faq-accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const content = item.querySelector('.faq-accordion-content');
                const isActive = item.classList.contains('active');
                
                // Close other items
                document.querySelectorAll('.faq-accordion-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-accordion-content').style.maxHeight = null;
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    };
    initAccordion();

    // WhatsApp Tooltip Auto-show
    const initWhatsAppTooltip = () => {
        const waContainer = document.querySelector('.whatsapp-container');
        if (waContainer) {
            // Show tooltip after 4 seconds
            setTimeout(() => {
                waContainer.classList.add('show-tooltip');
                // Hide it after 6 seconds of visibility
                setTimeout(() => {
                    waContainer.classList.remove('show-tooltip');
                }, 6000);
            }, 4000);
        }
    };
    initWhatsAppTooltip();

    // Scroll Progress Bar Logic
    const initScrollProgress = () => {
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }
    };
    initScrollProgress();

    // Flower Care Cards Toggle (Mobile tap compatibility)
    const initCareCards = () => {
        const careCards = document.querySelectorAll('.care-card');
        careCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') return;
                card.classList.toggle('flipped');
            });
        });
    };
    initCareCards();

    // Testimonials Slider Logic
    const initTestimonialsSlider = () => {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const container = document.querySelector('.testimonials-slider-container');
        
        if (!slides.length) return;
        
        let currentSlide = 0;
        let slideInterval;
        
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
        };
        
        const nextSlide = () => {
            showSlide(currentSlide + 1);
        };
        
        const prevSlide = () => {
            showSlide(currentSlide - 1);
        };
        
        const startAutoPlay = () => {
            slideInterval = setInterval(nextSlide, 6000);
        };
        
        const stopAutoPlay = () => {
            clearInterval(slideInterval);
        };
        
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'), 10);
                showSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });
        
        if (container) {
            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
        }
        
        startAutoPlay();
    };
    initTestimonialsSlider();

    // Word Rotator Logic
    const initWordRotator = () => {
        const words = document.querySelectorAll('.word-rotator .word');
        const rotator = document.querySelector('.word-rotator');
        if (!words.length || !rotator) return;
        
        const adjustWidth = (element) => {
            rotator.style.width = (element.offsetWidth + 10) + 'px';
        };
        
        adjustWidth(words[0]);
        setTimeout(() => adjustWidth(words[0]), 500);
        
        let index = 0;
        setInterval(() => {
            const current = words[index];
            current.classList.remove('active');
            current.classList.add('exit');
            
            index = (index + 1) % words.length;
            
            const next = words[index];
            next.classList.remove('exit');
            next.classList.add('active');
            
            adjustWidth(next);
            
            setTimeout(() => {
                current.classList.remove('exit');
            }, 500);
        }, 3000);
    };
    initWordRotator();

    // Magnetic Button Effect
    const initMagneticButton = () => {
        const button = document.querySelector('.btn-primary');
        if (!button) return;
        
        if (window.matchMedia('(hover: hover)').matches) {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
                button.style.transition = 'transform 0.1s ease-out';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0) scale(1)';
                button.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            });
        }
    };
    initMagneticButton();
});
