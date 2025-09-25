// Navigation mobile - Menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    // Créer les éléments du menu mobile s'ils n'existent pas
    createMobileNavigation();
    
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            // Toggle des classes
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
            
            // Empêcher le scroll quand le menu est ouvert
            if (mobileNav.classList.contains('open')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        const mobileNavItems = mobileNav.querySelectorAll('.nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            });
        });
        
        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            }
        });
    }
});

// Fonction pour créer la navigation mobile
function createMobileNavigation() {
    // Vérifier si les éléments existent déjà
    if (document.querySelector('.hamburger') || document.querySelector('.mobile-nav')) {
        return;
    }
    
    const header = document.querySelector('header');
    const nav = document.querySelector('.nav');
    
    if (!header || !nav) return;
    
    // Créer le bouton hamburger
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // Créer le menu mobile
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Copier les liens de navigation
    const navItems = nav.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const mobileItem = item.cloneNode(true);
        mobileNav.appendChild(mobileItem);
    });
    
    // Ajouter les éléments au DOM
    header.appendChild(hamburger);
    document.body.appendChild(mobileNav);
}

// Gestion du resize pour s'assurer que le menu se ferme quand on passe en desktop
window.addEventListener('resize', function() {
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            hamburger.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
});