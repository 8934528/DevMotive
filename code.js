document.addEventListener('DOMContentLoaded', () => {
    console.log('DevMotive: small habits, big growth. keep going!');
    
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
    
    // floating animation to diagram nodes
    const nodes = document.querySelectorAll('.diagram-node');
    nodes.forEach((node, index) => {
        node.style.animation = `float ${3 + (index % 5) * 0.2}s ease-in-out infinite`;
    });

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
        programmingModal.addEventListener('shown.bs.modal', function () {
            const modalBody = this.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }
            
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

    // loading animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .card {
            animation: fadeInUp 0.5s ease forwards;
            opacity: 0;
        }
        
        .row > .col:nth-child(1) .card { animation-delay: 0.1s; }
        .row > .col:nth-child(2) .card { animation-delay: 0.15s; }
        .row > .col:nth-child(3) .card { animation-delay: 0.2s; }
        .row > .col:nth-child(4) .card { animation-delay: 0.25s; }
        .row > .col:nth-child(5) .card { animation-delay: 0.3s; }
        .row > .col:nth-child(6) .card { animation-delay: 0.35s; }
        .row > .col:nth-child(7) .card { animation-delay: 0.4s; }
        .row > .col:nth-child(8) .card { animation-delay: 0.45s; }
        .row > .col:nth-child(9) .card { animation-delay: 0.5s; }
        .row > .col:nth-child(10) .card { animation-delay: 0.55s; }
        .row > .col:nth-child(11) .card { animation-delay: 0.6s; }
        .row > .col:nth-child(12) .card { animation-delay: 0.65s; }
    `;
    document.head.appendChild(style);
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
