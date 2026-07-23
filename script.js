/* =============================================
   PORTFOLIO INTERACTION & CS CANVAS ANIMATION
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CUSTOM CURSOR
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (dot) {
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }
    });

    function renderCursorRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        if (ring) {
            ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        }
        requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Hover elements
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .bento-card, .timeline-card, .tech-group, .ide-container');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 2. SCROLL REVEAL OBSERVER
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
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

    // 3. CS BACKGROUND PARTICLES & BINARY STREAM CANVAS
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let binaryStreams = [];

        function resizeCanvas() {
            const heroSection = document.getElementById('home');
            width = canvas.width = heroSection ? heroSection.clientWidth : window.innerWidth;
            height = canvas.height = heroSection ? heroSection.clientHeight : window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Node Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
                ctx.fill();
            }
        }

        // Binary Bit Stream Class
        class BinaryBit {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.text = Math.random() > 0.5 ? '1' : '0';
                this.speed = Math.random() * 0.3 + 0.1;
                this.opacity = Math.random() * 0.15 + 0.05;
            }

            update() {
                this.y -= this.speed;
                if (this.y < 0) {
                    this.y = height;
                    this.x = Math.random() * width;
                    this.text = Math.random() > 0.5 ? '1' : '0';
                }
            }

            draw() {
                ctx.font = '10px "JetBrains Mono", monospace';
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        for (let i = 0; i < 40; i++) particles.push(new Particle());
        for (let i = 0; i < 25; i++) binaryStreams.push(new BinaryBit());

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            // Draw binary background stream
            binaryStreams.forEach(bit => {
                bit.update();
                bit.draw();
            });

            // Draw particles & graph edges
            particles.forEach((p, index) => {
                p.update();
                p.draw();

                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 * (1 - dist / 130)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }
});
