document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 400);
        });
    }

    // Mobile Navigation
    const navToggler = document.querySelector('.nav-toggler');
    const nav = document.querySelector('.nav');
    
    if (navToggler && nav) {
        navToggler.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        // Close nav when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggler.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Scroll-Based Navbar Effects
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        const scrollThreshold = 100;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Don't hide navbar if mobile menu is open
            if (nav && nav.classList.contains('active')) return;
            
            // At very top of page
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            // Add scrolled class when past threshold
            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Client counter animation
    const clientCount = document.getElementById('client-count');
    if (clientCount) {
        const targetCount = 500;
        const duration = 2000;
        const step = targetCount / (duration / 16);
        
        let currentCount = 0;
        const counter = setInterval(() => {
            currentCount += step;
            if (currentCount >= targetCount) {
                clearInterval(counter);
                currentCount = targetCount;
            }
            clientCount.textContent = Math.floor(currentCount);
        }, 16);
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.querySelector('#name');
            const email = this.querySelector('#email');
            const phone = this.querySelector('#phone');
            const service = this.querySelector('#service');
            const message = this.querySelector('#message');
            
            let isValid = true;
            
            // Reset error states
            [name, email, phone, service, message].forEach(field => {
                field.classList.remove('error');
            });
            
            // Validate fields
            if (!name.value.trim()) {
                name.classList.add('error');
                isValid = false;
            }
            
            if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
                email.classList.add('error');
                isValid = false;
            }
            
            if (!phone.value.trim()) {
                phone.classList.add('error');
                isValid = false;
            }
            
            if (!service.value) {
                service.classList.add('error');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                message.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data to your server
                // For demonstration, we'll just show a success message
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                // Scroll to first error
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});