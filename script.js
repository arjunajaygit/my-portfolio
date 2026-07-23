/* =============================================
   PORTFOLIO INTERACTION & 3D CANVAS MATRIX ANIMATION
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
    
    // 0. LIGHT / DARK THEME TOGGLE & PERSISTENCE
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const savedTheme = localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            if (nextTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            
            localStorage.setItem('portfolio-theme', nextTheme);
        });
    }
    
    // 1. CUSTOM CURSOR & BACKGROUND CURSOR SPOTLIGHT
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const spotlight = document.getElementById('bg-spotlight');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (dot) {
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }

        if (spotlight) {
            spotlight.style.setProperty('--spot-x', `${mouseX}px`);
            spotlight.style.setProperty('--spot-y', `${mouseY}px`);
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

    // 2. DYNAMIC MORPHING MATRIX DECODER TITLE ROTATOR
    const roleTextMain = document.getElementById('role-text-main');
    const rolesList = [
        "SOFTWARE ENGINEER",
        "FULL-STACK DEVELOPER",
        "DEVSECOPS AUTOMATION",
        "AGENTIC AI SYSTEMS"
    ];
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/~+";
    let roleIndex = 0;

    function scrambleText(targetText, callback) {
        if (!roleTextMain) return;
        let iteration = 0;
        const maxIterations = targetText.length * 2;
        
        const interval = setInterval(() => {
            roleTextMain.innerText = targetText
                .split("")
                .map((char, index) => {
                    if (char === " ") return " ";
                    if (index < iteration / 2) {
                        return targetText[index];
                    }
                    return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                })
                .join("");

            if (iteration >= maxIterations) {
                clearInterval(interval);
                roleTextMain.innerText = targetText;
                if (callback) callback();
            }
            iteration += 1;
        }, 30);
    }

    function rotateRoleTitle() {
        if (!roleTextMain) return;

        // Slide Out current
        roleTextMain.classList.add('swap-out');

        setTimeout(() => {
            roleIndex = (roleIndex + 1) % rolesList.length;
            const nextRole = rolesList[roleIndex];

            roleTextMain.classList.remove('swap-out');
            roleTextMain.classList.add('swap-in', 'decoding');

            // Trigger Scramble Decoding
            scrambleText(nextRole, () => {
                roleTextMain.classList.remove('swap-in', 'decoding');
            });
        }, 350);
    }

    // Rotate title every 3.5 seconds
    setInterval(rotateRoleTitle, 3500);

    // 3. SCROLL PROGRESS BAR & PARALLAX HERO SCROLL EFFECT
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

    // 4. COMMAND PALETTE MODAL CONTROLS (CMD + K) & REAL-TIME SEARCH FILTER
    const cmdTrigger = document.getElementById('cmd-trigger');
    const cmdModal = document.getElementById('cmd-modal');
    const cmdInput = document.getElementById('cmd-search-input');
    const cmdOptionsList = document.getElementById('cmd-options-list');
    const cmdEmptyState = document.getElementById('cmd-empty-state');
    let selectedCmdIndex = 0;

    function getVisibleCmdOptions() {
        if (!cmdOptionsList) return [];
        return Array.from(cmdOptionsList.querySelectorAll('.cmd-option-item:not(.hidden)'));
    }

    function updateSelectedCmdHighlight() {
        const visibleOptions = getVisibleCmdOptions();
        visibleOptions.forEach((opt, idx) => {
            if (idx === selectedCmdIndex) {
                opt.classList.add('selected');
                opt.scrollIntoView({ block: 'nearest' });
            } else {
                opt.classList.remove('selected');
            }
        });
    }

    function filterCmdOptions(query) {
        if (!cmdOptionsList) return;
        const q = query.toLowerCase().trim();
        const allItems = cmdOptionsList.querySelectorAll('.cmd-option-item');
        let visibleCount = 0;

        allItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const keywords = item.getAttribute('data-keywords') || '';
            if (q === '' || text.includes(q) || keywords.includes(q)) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        if (cmdEmptyState) {
            if (visibleCount === 0) {
                cmdEmptyState.classList.add('visible');
            } else {
                cmdEmptyState.classList.remove('visible');
            }
        }

        selectedCmdIndex = 0;
        updateSelectedCmdHighlight();
    }

    if (cmdTrigger && cmdModal) {
        cmdTrigger.addEventListener('click', () => {
            cmdModal.classList.add('open');
            if (cmdInput) {
                cmdInput.value = '';
                filterCmdOptions('');
                cmdInput.focus();
            }
        });

        cmdModal.addEventListener('click', (e) => {
            if (e.target === cmdModal) closeCmdModal();
        });
    }

    if (cmdInput) {
        cmdInput.addEventListener('input', (e) => {
            filterCmdOptions(e.target.value);
        });

        cmdInput.addEventListener('keydown', (e) => {
            const visibleOptions = getVisibleCmdOptions();

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (visibleOptions.length > 0) {
                    selectedCmdIndex = (selectedCmdIndex + 1) % visibleOptions.length;
                    updateSelectedCmdHighlight();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (visibleOptions.length > 0) {
                    selectedCmdIndex = (selectedCmdIndex - 1 + visibleOptions.length) % visibleOptions.length;
                    updateSelectedCmdHighlight();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (visibleOptions.length > 0 && visibleOptions[selectedCmdIndex]) {
                    const targetItem = visibleOptions[selectedCmdIndex];
                    closeCmdModal();
                    targetItem.click();
                    if (targetItem.getAttribute('href')) {
                        window.open(targetItem.getAttribute('href'), targetItem.getAttribute('target') || '_self');
                    }
                }
            }
        });
    }

    window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (cmdModal) {
                const isOpen = cmdModal.classList.contains('open');
                if (isOpen) {
                    closeCmdModal();
                } else {
                    cmdModal.classList.add('open');
                    if (cmdInput) {
                        cmdInput.value = '';
                        filterCmdOptions('');
                        cmdInput.focus();
                    }
                }
            }
        }
        if (e.key === 'Escape') closeCmdModal();
    });

    // 5. CONTACT FORM DIRECT EMAIL DISPATCH (rjun.ajay@gmail.com)
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

    // 6. INTERSECTION OBSERVER FOR MULTI-TYPE SCROLL REVEALS
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

    // 7. FULLSCREEN INTERACTIVE 3D CONSTELLATION & DIGITAL WAVE CANVAS
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let binaryStreams = [];

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.radius = Math.random() * 1.6 + 1;
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
                ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
                ctx.fill();
            }
        }

        class BinaryBit {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.text = Math.random() > 0.5 ? '1' : '0';
                this.speed = Math.random() * 0.35 + 0.15;
                this.opacity = Math.random() * 0.18 + 0.05;
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
                ctx.font = '10.5px "JetBrains Mono", monospace';
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fillText(this.text, this.x, this.y);
            }
        }

        for (let i = 0; i < 55; i++) particles.push(new Particle());
        for (let i = 0; i < 35; i++) binaryStreams.push(new BinaryBit());

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

                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.14 * (1 - dist / 140)})`;
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
