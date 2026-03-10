document.addEventListener('DOMContentLoaded', () => {

    // --- AI System Loader ---
    const loader = document.getElementById('ai-loader');
    const loaderProgress = document.getElementById('loader-progress');
    const loaderPercentage = document.getElementById('loader-percentage');

    // Background Particles
    const particlesContainer = document.getElementById('loader-particles');
    // Increased particle count specifically for main integration
    for (let i = 0; i < 150; i++) {
        const particle = document.createElement('div');
        particle.classList.add('loader-particle');

        // Random positioning
        particle.style.left = `${Math.random() * 100}vw`;

        // Random animation duration between 2s and 6s (faster for intensity)
        const duration = Math.random() * 4 + 2;
        particle.style.animationDuration = `${duration}s`;

        // Random delay to stagger particle spawn
        particle.style.animationDelay = `${Math.random() * 5}s`;

        // Random opacity variation
        particle.style.opacity = Math.random() * 0.8 + 0.2;

        particlesContainer.appendChild(particle);
    }

    // Typed.js Implementation for the Loader
    new Typed('#loader-typed-text', {
        strings: [
            "Initializing AI system...",
            "Loading neural networks...",
            "Preparing projects...",
            "Optimizing portfolio interface...",
            "Welcome to Teja Sai Satti's portfolio"
        ],
        typeSpeed: 40,
        backSpeed: 20,
        backDelay: 400,
        onComplete: (self) => {
            self.cursor.remove();
        }
    });

    // Simulate Loading Progress
    let progress = 0;
    const loadingDuration = 5500; // Matches the approx typed sequence length
    const intervalTime = 50;
    const increment = 100 / (loadingDuration / intervalTime);

    const progressInterval = setInterval(() => {
        progress += increment;

        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);

            // Trigger Fade Out
            setTimeout(() => {
                if (loader) {
                    loader.classList.add('hidden');

                    // Remove loading state from body after fade out
                    setTimeout(() => {
                        document.body.classList.remove('loading-state');
                        loader.style.display = 'none';
                    }, 800); // 0.8s matches CSS transition
                }
            }, 600); // slight delay after 100%
        }

        // Update UI
        if (loaderProgress) loaderProgress.style.width = `${progress}%`;
        if (loaderPercentage) loaderPercentage.innerText = `${Math.floor(progress)}%`;

    }, intervalTime);

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slightly delayed follow for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect for interactive elements and Contextual Cursors
    const interactables = document.querySelectorAll('a, button, .project-card, .cert-card, .skill-tag, .social-icon');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');

            // Contextual Logic
            if (el.classList.contains('project-card')) {
                document.body.classList.add('cursor-view');
            } else if (el.classList.contains('social-icon') || el.innerHTML.includes('fa-github')) {
                document.body.classList.add('cursor-glow');
            } else if (el.tagName.toLowerCase() === 'a' || el.classList.contains('nav-link')) {
                document.body.classList.add('cursor-expand');
            }
        });

        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover', 'cursor-view', 'cursor-glow', 'cursor-expand');

            // Reset magnetic transform
            if (el.classList.contains('btn') || el.classList.contains('project-card')) {
                el.style.transform = 'translate(0px, 0px)';
            }
        });

        // Apply magnetic effect to buttons and project cards
        if (el.classList.contains('btn') || el.classList.contains('project-card')) {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                // Adjust pull strength: stronger for buttons, subtle for cards
                const strength = el.classList.contains('btn') ? 0.3 : 0.05;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
        }
    });

    // --- Cursor Trail Glow ---
    let lastTrailTime = 0;
    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        // Throttle trail dot creation to roughly every 30ms
        if (now - lastTrailTime > 30) {
            const trailDot = document.createElement('div');
            trailDot.classList.add('cursor-trail-dot');
            trailDot.style.left = `${e.clientX}px`;
            trailDot.style.top = `${e.clientY}px`;
            document.body.appendChild(trailDot);

            // Clean up dot after animation completes
            setTimeout(() => {
                trailDot.remove();
            }, 600);

            lastTrailTime = now;
        }
    });

    // --- Navbar Scroll & Toggle ---
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Typing Animation (Typed.js) ---
    if (document.getElementById('typed-output')) {
        new Typed('#typed-output', {
            strings: [
                "AI & ML Engineer",
                "Machine Learning Developer",
                "GenAI Enthusiast",
                "AI Research Explorer",
                "Software Engineer",
                "Application Developer"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // --- Animated Statistics (Counters) ---
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (isNaN(target)) return;

                    let count = 0;
                    const increment = target / 40; // speed of count

                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            stat.innerText = Math.ceil(count);
                            setTimeout(updateCount, 40);
                        } else {
                            stat.innerText = target;
                        }
                    };
                    updateCount();
                });
                hasAnimatedStats = true;
            }
        });
    }, { threshold: 0.5 });

    const heroStatsContainer = document.querySelector('.hero-stats');
    if (heroStatsContainer) statsObserver.observe(heroStatsContainer);

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Parallax Elements ---
    const parallaxElements = document.querySelectorAll('.parallax-element');
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        parallaxElements.forEach((el, index) => {
            const speed = 0.05 * (index + 1);
            // Limit transform values to prevent bugs
            if (scrollY < window.innerHeight * 2) {
                el.style.transform = `translateY(${scrollY * speed}px)`;
            }
        });
    });

    // --- 3D Tilt Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; // Remove transition for smooth immediate tracking
        });
    });


    // --- Three.js Background & Particles ---
    import('three').then(THREE => {
        // Scene setup
        const canvas = document.querySelector('canvas.webgl');
        const scene = new THREE.Scene();

        // Objects (Particles)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;

        const posArray = new Float32Array(particlesCount * 3);
        const colorsArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            // Spread particles across a wide area (X, Y) and deep into the background (Z)
            posArray[i] = (Math.random() - 0.5) * 50; // X
            posArray[i + 1] = (Math.random() - 0.5) * 50; // Y
            posArray[i + 2] = (Math.random() - 0.5) * 50; // Z

            // Mixing neon colors
            const colorType = Math.random();
            if (colorType > 0.6) {
                // Cyan (Accent 1)
                colorsArray[i] = 0.0;
                colorsArray[i + 1] = 0.95;
                colorsArray[i + 2] = 0.99;
            } else if (colorType > 0.3) {
                // Pink / Purple (Accent 3/4)
                colorsArray[i] = 0.8;
                colorsArray[i + 1] = 0.07;
                colorsArray[i + 2] = 0.99;
            } else {
                // Blue (Accent 2)
                colorsArray[i] = 0.3;
                colorsArray[i + 1] = 0.6;
                colorsArray[i + 2] = 0.99;
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

        // Material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        window.addEventListener('resize', () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });

        // Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 5;
        scene.add(camera);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true // Make background transparent to see CSS
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // --- Mouse Intersection / Gravity & Repulsion ---
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        });

        // Particle Burst on Click
        window.addEventListener('click', () => {
            // Explosive scale burst
            gsap.to(particlesMesh.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
                duration: 0.4,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
            // Brightness flash
            gsap.to(particlesMaterial, {
                opacity: 1,
                size: 0.08,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        });

        // Easter Egg: Double Click Hero
        let aiModeActive = false;
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.addEventListener('dblclick', () => {
                aiModeActive = !aiModeActive;
                if (aiModeActive) {
                    gsap.to(particlesMaterial, { size: 0.15, opacity: 1, duration: 1 });
                    gsap.to('body', { backgroundColor: '#0f0518', duration: 1 }); // Shift to deep purple
                    document.getElementById('neural-status-text').innerText = "OVERDRIVE";
                    document.getElementById('neural-status-text').style.color = "var(--accent-4)";
                } else {
                    gsap.to(particlesMaterial, { size: 0.05, opacity: 0.8, duration: 1 });
                    gsap.to('body', { backgroundColor: 'var(--bg-main)', duration: 1 });
                    document.getElementById('neural-status-text').innerText = "ACTIVE";
                    document.getElementById('neural-status-text').style.color = "var(--accent-1)";
                }
            });
        }

        // Camera Scroll Animations with GSAP (Section Transitions)
        gsap.registerPlugin(ScrollTrigger);

        // General depth
        gsap.to(camera.position, {
            z: -10, // Dive deeper when scrolling down
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });

        // Swirl around in About Me
        gsap.to(particlesMesh.rotation, {
            y: Math.PI,
            x: Math.PI * 0.5,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#about",
                start: "top center",
                end: "bottom center",
                scrub: 2
            }
        });

        // Shift formatting in Skills
        gsap.to(particlesMesh.scale, {
            x: 0.6,
            y: 0.6,
            z: 2, // Stretch out like fibers
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: "#skills",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        // Animate loop
        const clock = new THREE.Clock();

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            // Continuous subtle rotation
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;

            // AI Pulse Effect (Sine wave breathing)
            if (!aiModeActive) {
                particlesMaterial.size = 0.05 + Math.sin(elapsedTime * 2) * 0.01;
                particlesMaterial.opacity = 0.6 + Math.sin(elapsedTime * 1.5) * 0.2;
            }

            // Mouse gravity effect (Bend rotation towards cursor heavily)
            targetX = mouseX * 0.002;
            targetY = mouseY * 0.002;

            particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
            particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

            // Render
            renderer.render(scene, camera);
            window.requestAnimationFrame(tick);
        };

        tick();

    }).catch(err => {
        console.error("Failed to load Three.js dynamically", err);
    });

    // Smooth scrolling for internal anchor links only
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only intercept internal hash links, let external links go through normally
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==========================================
    // UI Sound Synthesizer (Web Audio API)
    // ==========================================
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Resume context on first user interaction (browser policy requirement)
    document.addEventListener('click', () => {
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }, { once: true });

    function playSound(type) {
        if (audioCtx.state === 'suspended') return;

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'hover') {
            // Soft digital tick
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, now);
            oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.05);

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

            oscillator.start(now);
            oscillator.stop(now + 0.05);

        } else if (type === 'click') {
            // Tiny pulse sound
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(400, now);
            oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.1);

            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            oscillator.start(now);
            oscillator.stop(now + 0.1);
        }
    }

    // Attach sounds to all interactables (links, buttons, cards)
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover'));
        el.addEventListener('click', () => playSound('click'));
    });

    // ==========================================
    // Neural Network Status Update Logic
    // ==========================================
    const statusText = document.getElementById('neural-status-text');
    let isProcessing = false;
    let statusTimeout;

    if (statusText) {
        window.addEventListener('mousemove', () => {
            if (!isProcessing) {
                isProcessing = true;
                statusText.innerText = "Processing signals...";
                statusText.style.color = "var(--accent-3)";
            }

            clearTimeout(statusTimeout);

            statusTimeout = setTimeout(() => {
                isProcessing = false;
                statusText.innerText = "ACTIVE";
                statusText.style.color = "var(--accent-1)";
            }, 500); // Revert to active after 500ms of no mouse movement
        });
    }

    // ==========================================
    // EmailJS Contact Form Setup
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const timeDisplay = document.getElementById('time-display');
    const timeHidden  = document.getElementById('time');

    // Helper: format a Date into a readable string
    function getFormattedTime() {
        const now = new Date();
        return now.toLocaleString('en-IN', {
            weekday:  'short',
            year:     'numeric',
            month:    'long',
            day:      'numeric',
            hour:     '2-digit',
            minute:   '2-digit',
            second:   '2-digit',
            hour12:   true
        });
    }

    // Live clock — updates the display field every second
    if (timeDisplay) {
        timeDisplay.value = getFormattedTime();
        setInterval(() => {
            timeDisplay.value = getFormattedTime();
        }, 1000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            const formStatus = document.getElementById('form-status');

            // Show loader state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;

            // EmailJS sendForm Function

            // Stamp the exact send time into the hidden field
            // This populates the {{time}} variable in your EmailJS template
            if (timeHidden) timeHidden.value = getFormattedTime();

            emailjs.sendForm('service_4fetp5p', 'template_zfbzoal', this)
                .then(() => {
                    // Success state
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline-block';
                    btnLoader.style.display = 'none';

                    formStatus.className = 'form-status success';
                    formStatus.innerText = 'Message sent successfully! I will get back to you soon.';
                    contactForm.reset();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.className = 'form-status';
                        formStatus.style.display = 'none';
                    }, 5000);
                }, (error) => {
                    // Error state
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline-block';
                    btnLoader.style.display = 'none';

                    formStatus.className = 'form-status error';
                    formStatus.innerText = 'Oops! Something went wrong. Please try again later.';
                    console.error('EmailJS Error:', error);
                });
        });
    }

});
