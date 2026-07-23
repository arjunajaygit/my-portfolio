/* =============================================
   PORTFOLIO INTERACTION & CS CANVAS ANIMATION
   ============================================= */

// Global function to switch IDE Tabs
function switchIdeTab(tabName) {
    const gutter = document.getElementById('ide-gutter');
    const content = document.getElementById('ide-content');
    const tabs = document.querySelectorAll('.ide-tab');

    tabs.forEach(t => t.classList.remove('active'));

    if (tabName === 'profile') {
        if (tabs[0]) tabs[0].classList.add('active');
        if (gutter) gutter.innerHTML = '1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9';
        if (content) {
            content.innerHTML = `
                <span class="code-key">name:</span> <span class="code-str">"Arjun A"</span><br>
                <span class="code-key">title:</span> <span class="code-str">"Software Engineer"</span><br>
                <span class="code-key">education:</span><br>
                &nbsp;&nbsp;- <span class="code-str">"B.Tech Information Technology @ CUSAT (CGPA: 8.95/10)"</span><br>
                &nbsp;&nbsp;- <span class="code-str">"BS Data Science & Applications @ IIT Madras"</span><br>
                <span class="code-key">focus:</span> <span class="code-arr">["Full-Stack Web & Mobile", "DevSecOps Automation", "Multi-Agent AI"]</span><br>
                <span class="code-key">location:</span> <span class="code-str">"Kochi, Kerala, India"</span><br>
                <span class="code-key">email:</span> <span class="code-str">"rjun.ajay@gmail.com"</span>
            `;
        }
    } else if (tabName === 'stack') {
        if (tabs[1]) tabs[1].classList.add('active');
        if (gutter) gutter.innerHTML = '1<br>2<br>3<br>4<br>5<br>6<br>7';
        if (content) {
            content.innerHTML = `
                <span class="code-key">export const</span> <span class="code-str">developerStack</span> = {<br>
                &nbsp;&nbsp;<span class="code-key">languages:</span> [<span class="code-str">"C++"</span>, <span class="code-str">"TypeScript"</span>, <span class="code-str">"Python"</span>, <span class="code-str">"Dart"</span>, <span class="code-str">"SQL"</span>],<br>
                &nbsp;&nbsp;<span class="code-key">frameworks:</span> [<span class="code-str">"Next.js"</span>, <span class="code-str">"Flutter"</span>, <span class="code-str">"FastAPI"</span>, <span class="code-str">"LangGraph"</span>],<br>
                &nbsp;&nbsp;<span class="code-key">databases:</span> [<span class="code-str">"PostgreSQL"</span>, <span class="code-str">"MongoDB"</span>, <span class="code-str">"ChromaDB"</span>],<br>
                &nbsp;&nbsp;<span class="code-key">tooling:</span> [<span class="code-str">"Docker"</span>, <span class="code-str">"Firebase"</span>, <span class="code-str">"Prisma"</span>, <span class="code-str">"Semgrep"</span>]<br>
                };
            `;
        }
    } else if (tabName === 'education') {
        if (tabs[2]) tabs[2].classList.add('active');
        if (gutter) gutter.innerHTML = '1<br>2<br>3<br>4<br>5<br>6<br>7<br>8';
        if (content) {
            content.innerHTML = `
                {<br>
                &nbsp;&nbsp;<span class="code-key">"btech"</span>: {<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-key">"degree"</span>: <span class="code-str">"B.Tech Information Technology"</span>,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-key">"institution"</span>: <span class="code-str">"Cochin University of Science and Technology (CUSAT)"</span>,<br>
                &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-key">"cgpa"</span>: <span class="code-str">"8.95 / 10"</span><br>
                &nbsp;&nbsp;},<br>
                &nbsp;&nbsp;<span class="code-key">"bs"</span>: { <span class="code-key">"degree"</span>: <span class="code-str">"BS Data Science"</span>, <span class="code-key">"institution"</span>: <span class="code-str">"IIT Madras"</span> }<br>
                }
            `;
        }
    }
}

// Global Command Modal controls
function closeCmdModal() {
    const modal = document.getElementById('cmd-modal');
    if (modal) modal.classList.remove('open');
}

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
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .bento-card, .timeline-card, .tech-group, .ide-container, .stat-card');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 2. SCROLL PROGRESS BAR & PARALLAX HERO SCROLL EFFECT
    const progressBar = document.getElementById('scroll-progress');
    const heroParallax = document.getElementById('hero-parallax-target');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        // Parallax hero movement
        if (heroParallax && window.scrollY < 800) {
            heroParallax.style.transform = `translateY(${window.scrollY * 0.2}px)`;
            heroParallax.style.opacity = `${1 - (window.scrollY / 750)}`;
        }
    });

    // 3. COMMAND PALETTE MODAL CONTROLS (CMD + K)
    const cmdTrigger = document.getElementById('cmd-trigger');
    const cmdModal = document.getElementById('cmd-modal');
    const cmdInput = document.getElementById('cmd-search-input');

    if (cmdTrigger && cmdModal) {
        cmdTrigger.addEventListener('click', () => {
            cmdModal.classList.add('open');
            if (cmdInput) cmdInput.focus();
        });

        cmdModal.addEventListener('click', (e) => {
            if (e.target === cmdModal) closeCmdModal();
        });
    }

    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (cmdModal) {
                cmdModal.classList.toggle('open');
                if (cmdModal.classList.contains('open') && cmdInput) {
                    cmdInput.focus();
                }
            }
        }
        if (e.key === 'Escape') closeCmdModal();
    });

    // 4. CONTACT FORM DIRECT EMAIL DISPATCH (rjun.ajay@gmail.com)
    const contactForm = document.getElementById('contact-form');
    const statusMsg = document.getElementById('contact-status-msg');
    const submitBtn = document.getElementById('contact-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.querySelector('span').innerText = 'Sending...';
            }

            try {
                const response = await fetch('https://formsubmit.co/ajax/rjun.ajay@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message,
                        _subject: `New Portfolio Message from ${name} (${email})`
                    })
                });

                if (response.ok) {
                    if (statusMsg) {
                        statusMsg.className = 'contact-status-msg success';
                        statusMsg.innerText = '✓ Message sent successfully to rjun.ajay@gmail.com! Arjun will get back to you shortly.';
                    }
                    contactForm.reset();
                } else {
                    throw new Error('Server response error');
                }
            } catch (err) {
                // Fallback to mailto protocol directly
                const mailtoUrl = `mailto:rjun.ajay@gmail.com?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
                window.location.href = mailtoUrl;

                if (statusMsg) {
                    statusMsg.className = 'contact-status-msg success';
                    statusMsg.innerText = '✓ Opening your email client to send to rjun.ajay@gmail.com...';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span').innerText = 'Send Message';
                }
            }
        });
    }

    // 5. INTERSECTION OBSERVER FOR MULTI-TYPE SCROLL REVEALS
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale').forEach(el => revealObserver.observe(el));

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 220;
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

    // 6. CS BACKGROUND PARTICLES & BINARY STREAM CANVAS
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

            binaryStreams.forEach(bit => {
                bit.update();
                bit.draw();
            });

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
