document.addEventListener('DOMContentLoaded', () => {
    console.log('DevMotive: small habits, big growth. keep going!');
    
    // Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    const specialCard = document.querySelector('.special-card');
    if (specialCard) {
        specialCard.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    const nodes = document.querySelectorAll('.diagram-node');
    nodes.forEach((node, index) => {
        node.style.animation = `float ${3 + index * 0.2}s ease-in-out infinite`;
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
        100% { transform: translateY(0px); }
    }
`;
document.head.appendChild(style);
