document.addEventListener('DOMContentLoaded', () => {
    // 1. CUSTOM CURSOR
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    function renderCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }

        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Cursor hover expansion
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .bento-card, .timeline-card, .profile-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 2. SCROLL REVEAL ANIMATION
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 3. STAT COUNTERS ANIMATION
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-count'), 10);
                const suffix = target.getAttribute('data-suffix') || '';
                let current = 0;
                const duration = 1500;
                const stepTime = Math.abs(Math.floor(duration / endVal));

                const timer = setInterval(() => {
                    current += 1;
                    target.textContent = current + suffix;
                    if (current >= endVal) {
                        target.textContent = endVal + suffix;
                        clearInterval(timer);
                    }
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

    // 4. TERMINAL TYPING ANIMATION
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const textToType = "cat about_arjun.yml";
        let index = 0;

        function type() {
            if (index < textToType.length) {
                typingElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(type, 80);
            }
        }
        setTimeout(type, 500);
    }

    // 5. CANVAS NODE NETWORK (HERO BACKGROUND)
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        });

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.5 + 1
        }));

        function drawCanvas() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(drawCanvas);
        }
        drawCanvas();
    }

    // 6. CONTACT FORM SUBMISSION
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const msg = document.getElementById('form-message').value;

            const mailtoUrl = `mailto:rjun.ajay@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)}`;
            window.location.href = mailtoUrl;
        });
    }

    // 7. ACTIVE NAV LINK HIGHLIGHTING
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});
