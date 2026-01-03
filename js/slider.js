// =========================================
// 1. NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================================
// 2. MOBILE BURGER MENU
// =========================================
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li a');

if (burger) {
    burger.addEventListener('click', () => {
        // Ouvre/Ferme le menu
        nav.classList.toggle('nav-active');
        // Animation de l'icone burger
        burger.classList.toggle('toggle');
    });
}

// Fermer le menu mobile quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// =========================================
// 3. HERO SLIDER LOGIC
// =========================================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideInterval = 5000; // 5 secondes
let slideTimer;

function showSlide(index) {
    if (slides.length === 0) return;

    // Reset classes actives
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Activer la nouvelle slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Reset Animation on Text (Astuce pour rejouer l'animation CSS)
    const content = slides[index].querySelector('.hero-content');
    if (content) {
        const clone = content.cloneNode(true);
        content.parentNode.replaceChild(clone, content);
    }
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Démarrer l'auto-play s'il y a des slides
if (slides.length > 0) {
    slideTimer = setInterval(nextSlide, slideInterval);
}

// Navigation Manuelle (clic sur les points)
function manualSlide(index) {
    clearInterval(slideTimer); // Arrête le timer temporairement
    currentSlide = index;
    showSlide(currentSlide);
    slideTimer = setInterval(nextSlide, slideInterval); // Relance le timer
}

// =========================================
// 4. SMOOTH SCROLL (Navigation Fluide)
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// =========================================
// 5. CONTACT FORM ANIMATION
// =========================================
const contactForm = document.querySelector('.glass-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Récupère le bouton submit
        const btn = this.querySelector('.btn-submit');
        
        // Change le texte pour indiquer le chargement
        btn.innerHTML = 'Envoi en cours...';
        btn.style.opacity = '0.7';
        btn.style.cursor = 'wait';
        
        // Note: Le formulaire sera ensuite envoyé à FormSubmit normalement
    });
}

// =========================================
// 6. PARALLAX EFFECT (Portrait Contact)
// =========================================
const portrait = document.querySelector('.portrait-img');
const contactSection = document.querySelector('.contact-section');

// Active l'effet seulement sur PC (écrans larges)
if (portrait && contactSection && window.innerWidth > 900) {
    contactSection.addEventListener('mousemove', (e) => {
        // Calcul du mouvement inverse de la souris
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        // Applique le mouvement léger à l'image
        portrait.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}
//------------------------------------------
// =========================================
// 7. LOGIQUE SECTION À PROPOS (Premium)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // A. Gestion du Flip (Retournement des cartes)
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });

    // B. Scroll Reveal (Apparition au défilement)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const timelineWrapper = document.querySelector('.timeline-premium-wrapper');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajoute la classe qui lance l'animation CSS
                entry.target.classList.add('visible');

                // Si c'est la timeline, on lance aussi l'anim de la vague SVG
                if (entry.target.classList.contains('timeline-premium-wrapper')) {
                    entry.target.classList.add('visible'); 
                }

                // On arrête d'observer pour ne pas rejouer l'animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Déclenche quand 15% de l'élément est visible
        rootMargin: "0px"
    });

    // Observer les éléments simples
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Observer le wrapper timeline pour la vague
    if (timelineWrapper) {
        revealObserver.observe(timelineWrapper);
    }
});

// =========================================
// SKILLS SECTION 3D TILT EFFECT
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    const holoCards = document.querySelectorAll('.holo-card');

    if (holoCards.length > 0) {
        holoCards.forEach(card => {
            
            // Mouse Move: Apply 3D Rotate
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // X position within element
                const y = e.clientY - rect.top;  // Y position within element
                
                // Calculate rotation based on cursor position
                // Center of card is (0,0)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
                const rotateY = ((x - centerX) / centerX) * 10;

                // Apply transform
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                
                // Move Glow Effect
                const glow = card.querySelector('.holo-glow');
                if(glow) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(41, 107, 255, 0.4), transparent 70%)`;
                }
            });

            // Mouse Leave: Reset
            card.addEventListener('mouseleave', () => {
                // Reset transform but keep floating animation (handled by CSS class re-engaging naturally)
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                
                const glow = card.querySelector('.holo-glow');
                if(glow) {
                    glow.style.background = `radial-gradient(circle at 50% 0%, rgba(41, 107, 255, 0.2), transparent 70%)`;
                }
            });
        });
    }

    // Scroll Reveal for Skills
    const skillRevealElements = document.querySelectorAll('.skills-category-container');
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillRevealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        skillObserver.observe(el);
    });
});
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FLIP CARDS LOGIC
    const xpCards = document.querySelectorAll('.xp-card-wrapper');
    xpCards.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            wrapper.querySelector('.xp-card').classList.toggle('flipped');
        });
    });

    // 2. PARALLAX TILT EFFECT (3D Hover)
    const xpPanels = document.querySelectorAll('.xp-front');
    xpPanels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcul rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        panel.addEventListener('mouseleave', () => {
            panel.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // 3. SCROLL REVEAL & WAVE ANIMATION
    const xpSection = document.getElementById('experiences-roadmap');
    const xpRevealElements = document.querySelectorAll('.xp-section .scroll-reveal');

    const xpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.id === 'experiences-roadmap') {
                    // Lance l'animation de la ligne SVG
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if(xpSection) xpObserver.observe(xpSection);
    xpRevealElements.forEach(el => xpObserver.observe(el));

    // 4. PARTICLES (Optional dynamic background)
    // Fonction simple pour ajouter des particules si le GPU le permet
    if (window.innerWidth > 900) {
        createXpParticles();
    }
});

function createXpParticles() {
    const container = document.querySelector('.xp-section');
    if(!container) return;

    for(let i=0; i<20; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.width = Math.random() * 4 + 'px';
        p.style.height = p.style.width;
        p.style.background = Math.random() > 0.5 ? '#5A2DFF' : '#296BFF';
        p.style.borderRadius = '50%';
        p.style.opacity = Math.random() * 0.5;
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animation = `floatHolo ${5 + Math.random() * 10}s infinite`;
        container.appendChild(p);
    }
}