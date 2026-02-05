/* ========================================
   SHARED REFERENCES
   ======================================== */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const NAV_HEIGHT = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
) || 64;

/* ========================================
   1. SMOOTH SCROLL
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id     = this.getAttribute('href');
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        const targetY = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top:      targetY - NAV_HEIGHT,
            behavior: 'smooth'
        });
    });
});

/* ========================================
   2. NAVBAR – active link + shadow
   ======================================== */
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 40
        ? '0 2px 16px rgba(0,0,0,0.35)'
        : 'none';

    let current = 'home';
    sections.forEach(sec => {
        if (window.scrollY + NAV_HEIGHT + 60 >= sec.offsetTop) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', href === current);
    });
});

/* ========================================
   3. HAMBURGER – mobile menu
   ======================================== */
const hamburger = document.getElementById('hamburger');
const navList   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
    hamburger.classList.toggle('open');
});

navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('open');
        hamburger.classList.remove('open');
    });
});

/* ========================================
   4. SKILL BARS – animate on scroll
   ======================================== */
const skillFills = document.querySelectorAll('.skill-bar-fill');

function animateSkills() {
    skillFills.forEach(bar => {
        if (bar.getBoundingClientRect().top < window.innerHeight - 40) {
            bar.style.width = bar.dataset.width + '%';
        }
    });
}

animateSkills();
window.addEventListener('scroll', animateSkills);

/* ========================================
   5. CONTACT FORM – YOUR CORRECT EMAIL!
   ======================================== */
const contactForm = document.getElementById('contactForm');
const formMsg     = document.getElementById('formMsg');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    formMsg.textContent = 'Sending…';
    formMsg.className   = '';

    const formData = new FormData(contactForm);
    
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // ✅ YOUR CORRECT EMAIL: iamdarkcoder00415@gmail.com
        const response = await fetch('https://formsubmit.co/ajax/iamdarkcoder00415@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            formMsg.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formMsg.className   = 'success';
            contactForm.reset();
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        formMsg.textContent = '✗ Could not send message. Please email me directly at iamdarkcoder00415@gmail.com';
        formMsg.className   = 'error';
    }
});

/* ========================================
   6. SCROLL-REVEAL
   ======================================== */
const revealElements = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ========================================
   7. BACK-TO-TOP BUTTON
   ======================================== */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});