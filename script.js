// ===========================
// MODERN PORTFOLIO JAVASCRIPT
// Interactive Features & Smooth Animations
// ===========================

// ============================================
// 1. DARK MODE TOGGLE
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

// Listen for theme toggle
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// ============================================
// 2. SMOOTH SCROLLING & ACTIVE NAV LINK
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

// Update active nav link on scroll
const updateActiveNavLink = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNavLink);

// Smooth scroll on nav link click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// 3. BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// 4. CONTACT FORM HANDLING - EMAIL.JS INTEGRATION
// ============================================

// Initialize Email.js
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your Email.js public key

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const phone = document.getElementById('contact-phone').value;
        const subject = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Prepare email parameters
        const templateParams = {
            to_email: 'mukkerapriyamani@gmail.com',
            from_name: name,
            from_email: email,
            phone: phone || 'Not provided',
            subject: subject,
            message: message,
            reply_to: email
        };
        
        // Send email using Email.js
        emailjs.send('SERVICE_ID', 'TEMPLATE_ID', templateParams)
            .then((response) => {
                console.log('Email sent successfully:', response);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                showNotification('Message sent successfully! 🎉 I\'ll get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                showNotification('Error sending message. Please try again or contact directly.', 'error');
            });
    });
}

// ============================================
// 5. NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// 6. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getAnimationForElement(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.project-card, .skill-category, .stat').forEach(el => {
    observer.observe(el);
});

function getAnimationForElement(element) {
    if (element.classList.contains('project-card')) {
        return 'fadeInUp 0.8s ease-out forwards';
    }
    if (element.classList.contains('skill-category')) {
        return 'scaleIn 0.6s ease-out forwards';
    }
    if (element.classList.contains('stat')) {
        return 'fadeInUp 0.8s ease-out forwards';
    }
    return 'fadeIn 0.6s ease-out forwards';
}

// ============================================
// 7. HAMBURGER MENU (MOBILE)
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.flexDirection = 'column';
        navMenu.style.background = 'rgba(255, 255, 255, 0.95)';
        navMenu.style.padding = '20px';
        navMenu.style.zIndex = '999';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ============================================
// 8. PARALLAX EFFECT (Subtle)
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${window.scrollY * 0.5}px`;
    }
});

// ============================================
// 9. SCROLL PROGRESS INDICATOR
// ============================================
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Optional: Create a progress bar (uncomment to use)
    // const progressBar = document.getElementById('scroll-progress');
    // if (progressBar) {
    //     progressBar.style.width = scrollPercent + '%';
    // }
}

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// 10. LAZY LOADING IMAGES (Optional)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// 11. KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
    }
});

// ============================================
// 12. PRELOAD CRITICAL RESOURCES
// ============================================
window.addEventListener('load', () => {
    // Remove loading states if any
    console.log('Portfolio loaded successfully');
});

// ============================================
// 13. UTILITY: Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 14. UTILITY: Throttle Function
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// 15. SMOOTH ANCHOR LINKS WITH OFFSET
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            const offset = 70; // Navbar height
            const top = element.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 16. TRACK ANALYTICS (Optional - Uncomment to use)
// ============================================
/*
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // Send to analytics service
}

// Track section views
sections.forEach(section => {
    observer.observe(section);
});
*/

// ============================================
// 17. PAGE VISIBILITY (Auto-pause animations)
// ============================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations or stop background tasks
        console.log('Page hidden');
    } else {
        // Resume animations
        console.log('Page visible');
    }
});

// ============================================
// 18. PRINT STYLES (Optimize for printing)
// ============================================
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ============================================
// 19. ENHANCED HOVER ANIMATIONS
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'fadeInUp 0.8s ease-out';
        }, 10);
    });
});

// Add hover glow to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.5)';
        item.style.transform = 'scale(1.1)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.boxShadow = 'none';
        item.style.transform = 'scale(1)';
    });
});

// ============================================
// 20. PROGRESS BAR ANIMATION ON SCROLL
// ============================================
const animateProgressBars = () => {
    document.querySelectorAll('.progress').forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            bar.style.animation = 'slideIn 1s ease-out forwards';
        }
    });
};

window.addEventListener('scroll', throttle(animateProgressBars, 100));

// ============================================
// 21. CARD TILT EFFECT (Parallax)
// ============================================
document.querySelectorAll('.project-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPercent = (x / rect.width) * 20 - 10;
        const yPercent = (y / rect.height) * 20 - 10;
        
        card.style.transform = `perspective(1000px) rotateX(${yPercent}deg) rotateY(${xPercent}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ============================================
// 22. STAGGERED ANIMATION FOR LISTS
// ============================================
const staggerAnimation = (elements) => {
    elements.forEach((el, index) => {
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`;
    });
};

document.querySelectorAll('.skill-category').forEach((category, index) => {
    const items = category.querySelectorAll('.skill-item');
    staggerAnimation(items);
});

// ============================================
// 23. SCROLL PROGRESS LINE
// ============================================
const createScrollProgress = () => {
    const progressLine = document.createElement('div');
    progressLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #6366f1, #ec4899);
        z-index: 999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressLine);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressLine.style.width = scrollPercent + '%';
    });
};

createScrollProgress();

// ============================================
// 24. COPY TO CLIPBOARD EFFECT
// ============================================
document.querySelectorAll('.contact-details a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href.startsWith('mailto:') || link.href.startsWith('http')) {
            // Allow default behavior
        }
    });
});

// ============================================
// 25. SMOOTH NUMBER COUNTER
// ============================================
const countUp = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// ============================================
// 26. PARALLAX MOUSE MOVEMENT
// ============================================
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const x = (window.innerWidth - e.clientX) / 50;
        const y = (window.innerHeight - e.clientY) / 50;
        hero.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// ============================================
// 27. BLUR TRANSITION ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrollPercent < 0.3) {
        heroContent.style.opacity = 1 - scrollPercent * 3;
        heroContent.style.filter = `blur(${scrollPercent * 5}px)`;
    }
});

// ============================================
// 28. ELEMENTS REVEAL ON SCROLL
// ============================================
const revealElements = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealElements.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.entry, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    revealElements.observe(el);
});

// ============================================
// 29. FORM FIELD FOCUS ANIMATIONS
// ============================================
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.style.transform = 'scale(1.02)';
        field.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
    });
    field.addEventListener('blur', () => {
        field.style.transform = 'scale(1)';
        field.style.boxShadow = 'none';
    });
});

// ============================================
// 30. RANDOM EMOJI ROTATION
// ============================================
document.querySelectorAll('.skill-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'spin 0.6s ease-in-out';
    });
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
    console.log('Portfolio interactive features loaded!');
    
    // Log all available animations
    console.log('✨ Animations loaded: Profile Glow, Image Zoom, Project Shake, Button Pulse, Text Gradient Shift');
    console.log('🎯 Interactive features: Hover Effects, Progress Animation, Card Tilt, Parallax, Scroll Reveal');
});
