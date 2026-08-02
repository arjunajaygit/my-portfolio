/* =============================================
   PORTFOLIO INTERACTION & 3D CANVAS MATRIX ANIMATION
   Phase 1 Performance-Optimized Version
   ============================================= */

// Global function to switch IDE Tabs with ARIA accessibility
function switchIdeTab(tabName) {
    const gutter = document.getElementById('ide-gutter');
    const content = document.getElementById('ide-content');
    const tabs = document.querySelectorAll('.ide-tab');

    tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });

    if (tabName === 'profile') {
        if (tabs[0]) {
            tabs[0].classList.add('active');
            tabs[0].setAttribute('aria-selected', 'true');
        }
        if (content) content.setAttribute('aria-labelledby', 'tab-profile');
        if (gutter) gutter.innerHTML = '1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9';
        if (content) {
            content.innerHTML = `
                <span class="code-key">name:</span> <span class="code-str">"Arjun A"</span><br>
                <span class="code-key">title:</span> <span class="code-str">"Software Engineer"</span><br>
                <span class="code-key">education:</span><br>
                &nbsp;&nbsp;- <span class="code-str">"B.Tech Information Technology @ CUSAT (CGPA: 8.95/10)"</span><br>
                &nbsp;&nbsp;- <span class="code-str">"BS Data Science & Applications @ IIT Madras"</span><br>
                <span class="code-key">focus:</span> <span class="code-arr">["Full-Stack Web & Mobile", "DevSecOps", "Multi-Agent AI"]</span><br>
                <span class="code-key">location:</span> <span class="code-str">"Kochi, Kerala, India"</span><br>
                <span class="code-key">email:</span> <span class="code-str">"rjun.ajay@gmail.com"</span>
            `;
        }
    } else if (tabName === 'stack') {
        if (tabs[1]) {
            tabs[1].classList.add('active');
            tabs[1].setAttribute('aria-selected', 'true');
        }
        if (content) content.setAttribute('aria-labelledby', 'tab-stack');
        if (gutter) gutter.innerHTML = '1<br>2<br>3<br>4<br>5<br>6<br>7';
        if (content) {
            content.innerHTML = `
                <span class="code-key">export const</span> <span class="code-str">developerStack</span> = {<br>
                &nbsp;&nbsp;<span class="code-key">languages:</span> [<span class="code-str">"Python"</span>, <span class="code-str">"C/C++"</span>, <span class="code-str">"JavaScript"</span>, <span class="code-str">"SQL"</span>],<br>
                &nbsp;&nbsp;<span class="code-key">frameworksTools:</span> [<span class="code-str">"React"</span>, <span class="code-str">"Node.js"</span>, <span class="code-str">"Express.js"</span>, <span class="code-str">"Flutter"</span>, <span class="code-str">"FastAPI"</span>, <span class="code-str">"Git/GitHub"</span>, <span class="code-str">"Docker"</span>, <span class="code-str">"Firebase"</span>],<br>
                &nbsp;&nbsp;<span class="code-key">databases:</span> [<span class="code-str">"PostgreSQL"</span>, <span class="code-str">"MySQL"</span>, <span class="code-str">"MongoDB"</span>],<br>
                &nbsp;&nbsp;<span class="code-key">coreConcepts:</span> [<span class="code-str">"DSA"</span>, <span class="code-str">"OOP"</span>, <span class="code-str">"DBMS"</span>, <span class="code-str">"Operating Systems"</span>, <span class="code-str">"Computer Networks"</span>]<br>
                };
            `;
        }
    } else if (tabName === 'education') {
        if (tabs[2]) {
            tabs[2].classList.add('active');
            tabs[2].setAttribute('aria-selected', 'true');
        }
        if (content) content.setAttribute('aria-labelledby', 'tab-education');
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

// Force browser to scroll to top (initial hero screen) on page refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Global Command Modal controls
function closeCmdModal() {
    const modal = document.getElementById('cmd-modal');
    if (modal) modal.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {

    // Always land on initial screen (top of page) on load/refresh
    window.scrollTo(0, 0);
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }

    // =========================================
    // GLOBAL STATE — Centralized animation control
    // =========================================
    const isMobileOrTouch = window.matchMedia('(max-width: 768px), (hover: none), (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isTabVisible = !document.hidden;

    // Pause ALL animations when tab is hidden
    document.addEventListener('visibilitychange', () => {
        isTabVisible = !document.hidden;
    });

    // =========================================
    // 1. CUSTOM CURSOR & BACKGROUND CURSOR SPOTLIGHT (Desktop only)
    // =========================================
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const spotlight = document.getElementById('bg-spotlight');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    function renderCursorRing() {
        if (isMobileOrTouch || !isTabVisible) return;
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;

        ringX += dx * 0.15;
        ringY += dy * 0.15;

        if (ring) {
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            requestAnimationFrame(renderCursorRing);
        }
    }
    if (!isMobileOrTouch) {
        renderCursorRing();
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!isMobileOrTouch && dot) {
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        }

        if (spotlight) {
            spotlight.style.setProperty('--spot-x', `${mouseX}px`);
            spotlight.style.setProperty('--spot-y', `${mouseY}px`);
        }

        if (!isMobileOrTouch) {
            requestAnimationFrame(renderCursorRing);
        }
    }, { passive: true });

    // Hover elements (Desktop only)
    if (!isMobileOrTouch) {
        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .bento-card, .timeline-card, .tech-group, .ide-container, .stat-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // =========================================
    // 2. DYNAMIC MORPHING MATRIX DECODER TITLE ROTATOR
    //    - Uses setTimeout chain instead of setInterval (prevents overlap)
    //    - Pauses when hero is offscreen or tab is hidden
    //    - Disabled entirely for prefers-reduced-motion
    // =========================================
    const roleTextMain = document.getElementById('role-text-main');
    const rolesList = [
        "SOFTWARE ENGINEER",
        "FULL-STACK DEVELOPER",
        "DEVSECOPS",
        "AGENTIC AI SYSTEMS"
    ];
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/~+";
    let roleIndex = 0;
    let isHeroVisible = true;
    let activeScrambleInterval = null;

    function scrambleText(targetText, callback) {
        if (!roleTextMain) return;
        let iteration = 0;
        const maxIterations = targetText.length * 2;

        // Clear any previous scramble interval to prevent overlap
        if (activeScrambleInterval) clearInterval(activeScrambleInterval);

        activeScrambleInterval = setInterval(() => {
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
                clearInterval(activeScrambleInterval);
                activeScrambleInterval = null;
                roleTextMain.innerText = targetText;
                if (callback) callback();
            }
            iteration += 1;
        }, 30);
    }

    function rotateRoleTitle() {
        if (!roleTextMain) return;

        roleTextMain.classList.add('swap-out');

        setTimeout(() => {
            roleIndex = (roleIndex + 1) % rolesList.length;
            const nextRole = rolesList[roleIndex];

            roleTextMain.classList.remove('swap-out');
            roleTextMain.classList.add('swap-in', 'decoding');

            scrambleText(nextRole, () => {
                roleTextMain.classList.remove('swap-in', 'decoding');
            });
        }, 350);
    }

    // Schedule role rotation via setTimeout chain (not setInterval — avoids overlap)
    function scheduleRoleRotation() {
        setTimeout(() => {
            // Only rotate if hero is visible AND tab is visible AND motion is allowed
            if (isHeroVisible && isTabVisible && !prefersReducedMotion) {
                rotateRoleTitle();
            }
            scheduleRoleRotation(); // re-schedule regardless, but rotation will no-op when hidden
        }, 3500);
    }

    if (!prefersReducedMotion) {
        scheduleRoleRotation();
    }

    // Observe hero visibility for the role rotator
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            isHeroVisible = entries[0].isIntersecting;
        }, { threshold: 0.1 });
        heroObserver.observe(heroSection);
    }

    // =========================================
    // 3. SCROLL PROGRESS BAR & PARALLAX HERO SCROLL EFFECT
    //    - Progress bar uses transform:scaleX (compositor-only, no layout reflow)
    //    - Parallax uses compositor-only transform + opacity
    //    - Both scroll listeners are { passive: true }
    // =========================================
    const progressBar = document.getElementById('scroll-progress');
    const heroParallax = document.getElementById('hero-parallax-target');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const progress = window.scrollY / totalHeight;

        if (progressBar) {
            progressBar.style.transform = `scaleX(${progress})`;
        }

        // Parallax hero movement (compositor-only)
        if (heroParallax && window.scrollY < 800 && !prefersReducedMotion) {
            const ty = window.scrollY * 0.2;
            const op = Math.max(0, 1 - (window.scrollY / 750));
            heroParallax.style.transform = `translateY(${ty}px)`;
            heroParallax.style.opacity = op;
        }
    }, { passive: true });

    // =========================================
    // 4. COMMAND PALETTE MODAL CONTROLS (CMD + K) & REAL-TIME SEARCH FILTER
    // =========================================
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

    // =========================================
    // 5. CONTACT FORM DIRECT EMAIL DISPATCH
    // =========================================
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

    // =========================================
    // 6. INTERSECTION OBSERVER FOR MULTI-TYPE SCROLL REVEALS
    // =========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale').forEach(el => revealObserver.observe(el));

    // =========================================
    // Active Navigation Highlight on Scroll (throttled via rAF)
    // =========================================
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    let sectionOffsets = [];
    function calculateSectionOffsets() {
        sectionOffsets = Array.from(sections).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop - 180
        }));
    }

    calculateSectionOffsets();
    window.addEventListener('resize', calculateSectionOffsets);

    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                let current = '';
                const scrollY = window.scrollY;

                sectionOffsets.forEach(section => {
                    if (scrollY >= section.top) {
                        current = section.id;
                    }
                });

                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${current}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    // =========================================
    // 7. FULLSCREEN INTERACTIVE 3D CONSTELLATION & DIGITAL WAVE CANVAS
    //    Performance optimizations:
    //    - Pauses when canvas is offscreen (IntersectionObserver)
    //    - Pauses when tab is hidden (visibilitychange via isTabVisible)
    //    - Caps to ~30fps on mobile via timestamp throttling
    //    - Disabled entirely for prefers-reduced-motion
    //    - Uses squared distance comparison to avoid Math.sqrt when possible
    // =========================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let binaryStreams = [];
        let isCanvasVisible = true;
        let canvasAnimId = null;
        let lastFrameTime = 0;

        // 30fps on mobile, uncapped (60fps) on desktop
        const frameDuration = isMobileOrTouch ? 33 : 0;

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

        const numParticles = isMobileOrTouch ? 20 : 55;
        const numBits = isMobileOrTouch ? 15 : 35;

        for (let i = 0; i < numParticles; i++) particles.push(new Particle());
        for (let i = 0; i < numBits; i++) binaryStreams.push(new BinaryBit());

        function animateCanvas(timestamp) {
            // Don't render if hidden
            if (!isCanvasVisible || !isTabVisible) {
                canvasAnimId = null;
                return;
            }

            // Frame rate cap (mobile: ~30fps)
            if (frameDuration > 0 && timestamp - lastFrameTime < frameDuration) {
                canvasAnimId = requestAnimationFrame(animateCanvas);
                return;
            }
            lastFrameTime = timestamp;

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
                    const distSq = dx * dx + dy * dy;

                    // 19600 = 140². Skip Math.sqrt when clearly out of range.
                    if (distSq < 19600) {
                        const dist = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.14 * (1 - dist / 140)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            });

            canvasAnimId = requestAnimationFrame(animateCanvas);
        }

        // Start/stop canvas based on visibility
        function startCanvas() {
            if (!canvasAnimId) {
                canvasAnimId = requestAnimationFrame(animateCanvas);
            }
        }

        function stopCanvas() {
            if (canvasAnimId) {
                cancelAnimationFrame(canvasAnimId);
                canvasAnimId = null;
            }
        }

        // Observe canvas visibility
        const canvasObserver = new IntersectionObserver((entries) => {
            isCanvasVisible = entries[0].isIntersecting;
            if (isCanvasVisible && isTabVisible) {
                startCanvas();
            } else {
                stopCanvas();
            }
        }, { threshold: 0 });
        canvasObserver.observe(canvas);

        // Also respond to tab visibility changes
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && isCanvasVisible) {
                startCanvas();
            } else {
                stopCanvas();
            }
        });

        // Initial start
        startCanvas();
    }

    // =========================================
    // 8. THREE.JS OBSIDIAN TERMINAL CYAN HERO PARTICLE SCENE
    //    - Direction A (Obsidian Terminal): Hero-only 3D interaction
    //    - Cyan particle field (#38bdf8) reacting to mouse & touch
    //    - Pauses when hero is offscreen via IntersectionObserver
    //    - Pixel ratio capped to Math.min(window.devicePixelRatio, 2)
    //    - Debounced resize handler
    //    - Respects prefers-reduced-motion
    // =========================================
    function initHero3DScene() {
        const heroCanvas = document.getElementById('hero-3d-canvas');
        if (!heroCanvas || typeof THREE === 'undefined') return;

        const container = heroCanvas.parentElement;
        if (!container) return;

        let width = container.clientWidth || window.innerWidth;
        let height = container.clientHeight || 500;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({
            canvas: heroCanvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create Cyan Particle System (#38bdf8)
        const particleCount = isMobileOrTouch ? 35 : 85;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 25;
            const z = (Math.random() - 0.5) * 15;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Particle material with Cyan accent (#38bdf8)
        const material = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: isMobileOrTouch ? 0.35 : 0.45,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);

        // Pointer tracking
        let mouseX = 0, mouseY = 0;
        let targetMouseX = 0, targetMouseY = 0;

        function onPointerMove(e) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            targetMouseX = (clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = -(clientY / window.innerHeight - 0.5) * 2;
        }

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });

        // Responsive Resize with debounce
        let resizeTimer;
        function onResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newWidth = container.clientWidth || window.innerWidth;
                const newHeight = container.clientHeight || 500;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            }, 100);
        }

        window.addEventListener('resize', onResize);

        // Animation Loop & Performance Controls
        let animId = null;
        let isHero3DVisible = true;

        function animate3D() {
            if (!isHero3DVisible || !isTabVisible) {
                animId = null;
                return;
            }

            if (prefersReducedMotion) {
                renderer.render(scene, camera);
                animId = null;
                return;
            }

            // Smooth mouse interpolation
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            particleSystem.rotation.y = mouseX * 0.2;
            particleSystem.rotation.x = -mouseY * 0.2;

            const posArr = geometry.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                posArr[i3] += velocities[i3];
                posArr[i3 + 1] += velocities[i3 + 1];

                // Boundary bounce
                if (Math.abs(posArr[i3] - originalPositions[i3]) > 3) velocities[i3] *= -1;
                if (Math.abs(posArr[i3 + 1] - originalPositions[i3 + 1]) > 3) velocities[i3 + 1] *= -1;
            }
            geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
            animId = requestAnimationFrame(animate3D);
        }

        function start3D() {
            if (!animId) animId = requestAnimationFrame(animate3D);
        }

        function stop3D() {
            if (animId) {
                cancelAnimationFrame(animId);
                animId = null;
            }
        }

        // IntersectionObserver pause/resume when hero is offscreen
        const heroSection = document.getElementById('home');
        if (heroSection) {
            const heroObserver = new IntersectionObserver((entries) => {
                isHero3DVisible = entries[0].isIntersecting;
                if (isHero3DVisible && isTabVisible) {
                    start3D();
                } else {
                    stop3D();
                }
            }, { threshold: 0.05 });
            heroObserver.observe(heroSection);
        }

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && isHero3DVisible) {
                start3D();
            } else {
                stop3D();
            }
        });

        start3D();
    }

    if (document.readyState === 'complete') {
        initHero3DScene();
    } else {
        window.addEventListener('load', initHero3DScene);
    }
});
