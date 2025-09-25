// BTS SIO - Interactions et animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Gestion des cartes d'options
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Retirer la classe active de toutes les cartes
            optionCards.forEach(c => c.classList.remove('active'));
            
            // Ajouter la classe active à la carte cliquée
            this.classList.add('active');
            
            // Animation de feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
        
        // Effet de survol pour les cartes
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
    
    // Animation des statistiques au scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                animateNumbers(statNumbers);
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Animation des éléments program au scroll
    const programObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                programObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const programItems = document.querySelectorAll('.program-item');
    programItems.forEach((item, index) => {
        // Délai progressif pour l'animation
        item.style.animationDelay = `${index * 0.1}s`;
        programObserver.observe(item);
    });
    
    // Animation des tags métiers
    const careerTags = document.querySelectorAll('.career-tag');
    careerTags.forEach((tag, index) => {
        tag.addEventListener('mouseenter', function() {
            // Effet de vague sur les tags adjacents
            careerTags.forEach((otherTag, otherIndex) => {
                const distance = Math.abs(index - otherIndex);
                if (distance <= 2 && distance > 0) {
                    otherTag.style.transform = `scale(${1 + (0.1 / distance)})`;
                    setTimeout(() => {
                        otherTag.style.transform = '';
                    }, 300);
                }
            });
        });
    });
    
    // Effet de parallaxe léger pour la hero section
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Animation des icônes au survol
    const optionIcons = document.querySelectorAll('.option-icon');
    optionIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.6s ease';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Ajout de l'animation bounce en CSS via JavaScript
    if (!document.querySelector('#bounce-keyframes')) {
        const style = document.createElement('style');
        style.id = 'bounce-keyframes';
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 60%, 100% {
                    transform: translateY(0) scale(1);
                }
                40% {
                    transform: translateY(-10px) scale(1.05);
                }
                80% {
                    transform: translateY(-5px) scale(1.02);
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// Fonction pour animer les nombres
function animateNumbers(elements) {
    elements.forEach(element => {
        const finalNumber = element.textContent;
        
        // Si c'est un nombre pur
        if (!isNaN(finalNumber)) {
            const startNumber = 0;
            const increment = finalNumber / 30; // 30 étapes
            let currentNumber = startNumber;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                element.textContent = Math.floor(currentNumber);
                
                if (currentNumber >= finalNumber) {
                    element.textContent = finalNumber;
                    clearInterval(timer);
                }
            }, 50);
        } else {
            // Pour "BAC+2", on fait juste apparaître avec un délai
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s ease';
                element.style.opacity = '1';
            }, 500);
        }
    });
}

// Fonction utilitaire pour débounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimisation du scroll avec debounce
const debouncedScrollHandler = debounce(() => {
    // Logique de scroll ici si nécessaire
}, 16); // 60fps

window.addEventListener('scroll', debouncedScrollHandler);