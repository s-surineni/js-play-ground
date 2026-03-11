// Home page JavaScript for navigation
window.navigateToConcept = function(concept) {
    console.log('Navigating to concept:', concept);
    window.location.href = `./pages/${concept}.html`;
};

// Add some interactivity to the cards
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up cards...');
    const cards = document.querySelectorAll('.concept-card');
    console.log('Found cards:', cards.length);
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    console.log('🚀 JavaScript Learning Playground - Home Page loaded!');
    console.log('💡 Click on any concept card to start learning!');
});
