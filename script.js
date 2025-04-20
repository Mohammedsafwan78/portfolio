// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navContent = document.querySelector('.nav-content');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .education-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add animation class styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyles);

// Project Modal Functions
function openProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function copyCode(codeId) {
    const code = document.getElementById(codeId);
    const text = code.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const button = event.target.closest('button');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            button.innerHTML = originalText;
        }, 2000);
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Timeline animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-container');
    
    function checkScroll() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});

// Navigation Arrow and Section Indicators
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTop = document.getElementById('scrollToTop');
    const sectionDots = document.querySelectorAll('.section-nav-dot');
    const sections = document.querySelectorAll('section');
    let trails = [];

    // Show/hide scroll to top button and create trail effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }

        // Update active section dot
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.id;
            }
        });

        sectionDots.forEach(dot => {
            if (dot.dataset.section === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });

    // Scroll to top with trail effect
    scrollToTop.addEventListener('click', () => {
        createTrail(scrollToTop);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Section navigation
    sectionDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const section = document.getElementById(dot.dataset.section);
            if (section) {
                createTrail(dot);
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Create trail effect
    function createTrail(element) {
        // Clear old trails
        trails.forEach(trail => trail.remove());
        trails = [];

        // Create new trails
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = 'trail';
            document.body.appendChild(trail);
            trails.push(trail);

            // Animate trail
            const rect = element.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            trail.style.left = startX + 'px';
            trail.style.top = startY + 'px';
            trail.style.opacity = '1';

            // Random trail animation
            const angle = (Math.random() * Math.PI * 2);
            const distance = Math.random() * 100 + 50;
            const duration = Math.random() * 0.5 + 0.5;

            trail.style.transition = `all ${duration}s ease-out`;
            setTimeout(() => {
                trail.style.transform = `translate(
                    ${Math.cos(angle) * distance}px,
                    ${Math.sin(angle) * distance}px
                )`;
                trail.style.opacity = '0';
            }, 50);

            // Remove trail after animation
            setTimeout(() => {
                trail.remove();
                trails = trails.filter(t => t !== trail);
            }, duration * 1000 + 100);
        }
    }
}); 