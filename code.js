document.addEventListener('DOMContentLoaded', () => {
    console.log('DevMotive: small habits, big growth. keep going!');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Bootstrap tooltips and popovers
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // popovers with mobile-friendly options
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl, {
            trigger: 'click focus',
            placement: 'top',
            html: false,
            animation: true
        });
    });

    // Close popovers when clicking outside on mobile
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            popoverList.forEach(popover => {
                if (popover && popover._element && !popover._element.contains(e.target) && !document.querySelector('.popover')?.contains(e.target)) {
                    popover.hide();
                }
            });
        }
    });

    // Special card click
    const specialCard = document.querySelector('.special-card');
    if (specialCard) {
        specialCard.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Floating animation to diagram nodes
    const nodes = document.querySelectorAll('.diagram-node');
    if (!prefersReducedMotion) {
        nodes.forEach((node, index) => {
            node.style.animation = `float ${3 + (index % 5) * 0.2}s ease-in-out infinite`;
        });
    }

    // Reveal cards as they enter viewport
    const cardColumns = document.querySelectorAll('#cardsContainer > .col');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

        cardColumns.forEach(col => revealObserver.observe(col));
    } else {
        cardColumns.forEach(col => col.classList.add('revealed'));
    }

    // Lightweight card tilt interaction for desktop
    if (!prefersReducedMotion) {
        const interactiveCards = document.querySelectorAll('.paper-card');
        interactiveCards.forEach(card => {
            card.addEventListener('mousemove', (event) => {
                if (window.innerWidth <= 991) return;
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                const rotateX = ((y / rect.height) - 0.5) * -4;
                const rotateY = ((x / rect.width) - 0.5) * 4;
                card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // Background image changer
    const backgroundImages = [
        'url("assets/b.jpg")',
        'url("assets/c.jpg")'
    ];
    
    let currentIndex = 0;
    const body = document.body;
    
    // Set background
    if (backgroundImages.length > 0) {
        body.style.backgroundImage = backgroundImages[currentIndex];
        console.log(`Initial background set to: ${backgroundImages[currentIndex]}`);
    }
    
    // Change background every 5 seconds
    if (backgroundImages.length > 1) {
        setInterval(() => {
            body.style.transition = 'background-image 1.5s ease-in-out';
            currentIndex = (currentIndex + 1) % backgroundImages.length;
            body.style.backgroundImage = backgroundImages[currentIndex];
            console.log(`Background changed to: ${backgroundImages[currentIndex]}`);
        }, 5000);
    }

    // Mobile menu collapse handling
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        const navLinks = mobileNav.querySelectorAll('.mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = bootstrap.Collapse.getInstance(mobileNav);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            });
        });

        // Close menu when scrolling on mobile
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 991) {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    if (mobileNav.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(mobileNav);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                }, 200);
            }
        });
    }

    // modal for mobile
    const programmingModal = document.getElementById('programmingPathModal');
    if (programmingModal) {
        const modalBody = programmingModal.querySelector('.modal-body');
        const modalQuickChips = programmingModal.querySelectorAll('.modal-chip');
        const modalSections = programmingModal.querySelectorAll('.diagram-level[id]');

        const setActiveChip = (id) => {
            modalQuickChips.forEach(chip => {
                chip.classList.toggle('active', chip.dataset.target === `#${id}`);
            });
        };

        modalQuickChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const section = programmingModal.querySelector(chip.dataset.target);
                if (!section || !modalBody) return;
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveChip(section.id);
            });
        });

        if ('IntersectionObserver' in window && modalBody) {
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveChip(entry.target.id);
                    }
                });
            }, { root: modalBody, threshold: 0.45 });

            modalSections.forEach(section => sectionObserver.observe(section));
        }

        programmingModal.addEventListener('shown.bs.modal', function () {
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
            setActiveChip('levelFoundations');
            
            // popover placement on mobile
            if (window.innerWidth <= 576) {
                popoverList.forEach(popover => {
                    if (popover && popover._element && popover._element.classList.contains('show')) {
                        popover.update();
                    }
                });
            }
        });
    }

    // Smooth scroll for cards on mobile
    const cards = document.querySelectorAll('.card:not(.special-card)');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !e.target.closest('[data-bs-toggle="modal"]')) {
                this.style.backgroundColor = 'rgba(255,255,255,0.9)';
                setTimeout(() => {
                    this.style.backgroundColor = '';
                }, 200);
            }
        });
    });

    // orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            popoverList.forEach(popover => {
                if (popover && popover._element && popover._element.classList.contains('show')) {
                    popover.update();
                }
            });
        }, 200);
    });

});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
