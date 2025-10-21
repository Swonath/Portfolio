// Système de filtrage des réalisations
document.addEventListener('DOMContentLoaded', function() {
    
    // Récupération des éléments
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.container-card');
    
    // Fonction pour appliquer le filtre
    function applyFilter(category) {
        // Parcours toutes les cartes
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'tous') {
                // Si "Tous", toutes les cartes sont en avant
                card.classList.add('highlighted');
                card.classList.remove('dimmed');
            } else if (cardCategory === category) {
                // Si la catégorie correspond, mise en avant
                card.classList.add('highlighted');
                card.classList.remove('dimmed');
            } else {
                // Sinon, flouter la carte
                card.classList.remove('highlighted');
                card.classList.add('dimmed');
            }
        });
        
        // Mise à jour du bouton actif
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Écouteur d'événements sur les boutons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            applyFilter(filter);
            
            // Mise à jour de l'URL sans recharger la page
            const newUrl = filter === 'tous' 
                ? 'réalisations.html' 
                : `réalisations.html?filtre=${filter}`;
            window.history.pushState({}, '', newUrl);
        });
    });
    
    // Vérifier si un filtre est présent dans l'URL au chargement
    const urlParams = new URLSearchParams(window.location.search);
    const filtreUrl = urlParams.get('filtre');
    
    if (filtreUrl && ['ecole', 'stage', 'personnel'].includes(filtreUrl)) {
        applyFilter(filtreUrl);
    }
    
});