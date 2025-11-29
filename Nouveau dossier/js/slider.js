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