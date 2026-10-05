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
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('dust-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = Math.random() * 15 + 10 + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
        }
    }
    createDust();

    const bgGrid = document.getElementById('bgGrid');
    document.addEventListener('mousemove', (e) => {
        if (!bgGrid || window.innerWidth < 1024) return;
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        bgGrid.style.transform = 'translate(' + (mouseX * -15) + 'px, ' + (mouseY * -15) + 'px)';
    });

    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        if (window.scrollY > 400) scrollTop.classList.add('visible');
        else scrollTop.classList.remove('visible');
    });

    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-cinematic').forEach(el => observer.observe(el));

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
            setTimeout(() => { fill.style.width = target; }, 50);
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

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
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

    // TOAST LOGIC ONLY (Does NOT block download)
    const toast = document.getElementById('toast');
    const proBtn = document.getElementById('proBtn');
    if (proBtn && toast) {
        proBtn.addEventListener('click', () => {
            toast.classList.add('show');
            setTimeout(() => { toast.classList.remove('show'); }, 4000);
        });
    }

    setTimeout(() => {
        document.querySelectorAll('#home .reveal-cinematic').forEach(el => el.classList.add('active'));
        triggerTabAnimation('tab-junk');
    }, 100);
});
