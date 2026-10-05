document.addEventListener('DOMContentLoaded', () => {

    const mouseGlow = document.getElementById('mouseGlow');
    
    document.addEventListener('mousemove', (e) => {
        if (!mouseGlow) return;
        requestAnimationFrame(() => {
            mouseGlow.style.opacity = '1';
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top = e.clientY + 'px';
        });
    });

    document.addEventListener('mouseleave', () => {
        if (mouseGlow) mouseGlow.style.opacity = '0';
    });

    const particlesContainer = document.getElementById('particles-container');
    function createDust() {
        if (!particlesContainer) return;
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.classList.add('dust-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = Math.random() * 15 + 15 + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particlesContainer.appendChild(particle);
        }
    }
    createDust();

    const bgGrid = document.getElementById('bgGrid');
    document.addEventListener('mousemove', (e) => {
        if (!bgGrid || window.innerWidth < 1024) return;
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        bgGrid.style.transform = 'translate(' + (mouseX * -20) + 'px, ' + (mouseY * -20) + 'px)';
    });

    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-cinematic').forEach(el => observer.observe(el));

    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 1024) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.setProperty('--rotate-x', rotateX + 'deg');
            card.style.setProperty('--rotate-y', rotateY + 'deg');
            card.style.setProperty('--glare-x', x + 'px');
            card.style.setProperty('--glare-y', y + 'px');
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotate-x', '0deg');
            card.style.setProperty('--rotate-y', '0deg');
            card.style.setProperty('--glare-x', '50%');
            card.style.setProperty('--glare-y', '50%');
            card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s linear';
        });
    });

    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            btn.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.1s linear';
        });
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function triggerTabAnimation(tabId) {
        const activePanel = document.getElementById(tabId);
        if (!activePanel) return;

        activePanel.classList.add('active');
        const fill = activePanel.querySelector('.progress-fill');
        if (fill) {
            const target = fill.getAttribute('data-width') || '100%';
            fill.style.width = '0%';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    fill.style.width = target;
                });
            });
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            triggerTabAnimation(targetTab);
        });
    });

    const featureWindows = document.querySelectorAll('.feature-tilt');
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 1024) return;
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        featureWindows.forEach(win => {
            win.style.transform = 'translate(' + (mouseX * -20) + 'px, ' + (mouseY * -20) + 'px)';
        });
    });

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    const toast = document.getElementById('toast');
    const proBtn = document.getElementById('proBtn');

    if (proBtn && toast) {
        proBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                window.location.href = 'https://github.com/r00thaha/Zuptomizer/releases/download/optimizer/Zuptomizer.exe';
            }, 600);
        });
    }

    setTimeout(() => {
        document.querySelectorAll('#home .reveal-cinematic').forEach(el => el.classList.add('active'));
        triggerTabAnimation('tab-junk');
    }, 100);
});
