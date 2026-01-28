/**
 * E-Business Learning Hub - Main JavaScript
 * ==========================================
 * Enhanced with scroll animations and interactive features.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Intersection Observer for Scroll Animations
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('open');
            
            if (isOpen) {
                mobileMenu.classList.remove('open');
                mobileMenu.style.maxHeight = '0';
                menuIconOpen?.classList.remove('hidden');
                menuIconClose?.classList.add('hidden');
            } else {
                mobileMenu.classList.add('open');
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
                menuIconOpen?.classList.add('hidden');
                menuIconClose?.classList.remove('hidden');
            }
            
            // Update aria-expanded for accessibility
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                mobileMenu.style.maxHeight = '0';
                menuIconOpen?.classList.remove('hidden');
                menuIconClose?.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for sticky navbar
                const navbarHeight = 60;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================
    // Active Navigation Link Highlight
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }
    
    // ==========================================
    // Progress Bar
    // ==========================================
    const progressBar = document.getElementById('progress-bar');
    
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }
    
    // ==========================================
    // Back to Top Button
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');
    
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    }
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ==========================================
    // Throttled Scroll Handler
    // ==========================================
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightNavLink();
                handleNavbarScroll();
                updateProgressBar();
                handleBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Run on page load
    highlightNavLink();
    handleNavbarScroll();
    updateProgressBar();
    handleBackToTop();
    
    // ==========================================
    // Keyboard Navigation Support
    // ==========================================
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            mobileMenu.style.maxHeight = '0';
            menuIconOpen?.classList.remove('hidden');
            menuIconClose?.classList.add('hidden');
            mobileMenuBtn?.setAttribute('aria-expanded', 'false');
        }
    });
    
    // ==========================================
    // Card Interaction Enhancements
    // ==========================================
    const interactiveCards = document.querySelectorAll('.model-card, .case-study-card, .component-card, .benefit-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('model-card') ? 'translateX(8px)' : 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ==========================================
    // Lazy Loading Images (if any added later)
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ==========================================
    // Console Welcome Message
    // ==========================================
    console.log('%c🎓 E-Business Learning Hub', 'font-size: 20px; font-weight: bold; color: #4f46e5;');
    console.log('%cWebsite pembelajaran E-Bisnis untuk mahasiswa', 'font-size: 12px; color: #6b7280;');
    console.log('%cDibuat dengan ❤️ untuk keperluan akademik', 'font-size: 10px; color: #9ca3af;');
    
});
