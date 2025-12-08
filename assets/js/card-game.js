(function () {
    console.log('Card game script loading...');
    
    // DOM Elements
    const cardEl = document.getElementById('card');
    const cardFrontImg = document.getElementById('cardFrontImg');
    const cardWrapper = document.getElementById('cardWrapper');

    // Card deck configuration
    const SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];
    const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    
    // Track if card is flipped
    let isFlipped = false;
    let isAnimating = false;

    // Generate a random card
    function generateRandomCard() {
        const suit = SUITS[Math.floor(Math.random() * SUITS.length)];
        const rank = RANKS[Math.floor(Math.random() * RANKS.length)];
        
        // Card name for image path
        const cardName = `${rank}_of_${suit}`;
        const displayName = `${rank === 'ace' ? 'A' : rank === 'jack' ? 'J' : rank === 'queen' ? 'Q' : rank === 'king' ? 'K' : rank} of ${suit}`;
        
        return {
            suit,
            rank,
            cardName,
            displayName,
            imagePath: `assets/img/cards/${cardName}.png`
        };
    }

    // Show a new random card
    function showNewCard() {
        const card = generateRandomCard();
        cardFrontImg.src = card.imagePath;
        cardFrontImg.alt = `Card: ${card.displayName}`;
        console.log('New card:', card.displayName);
        return card;
    }

    // Flip the card with animation
    function flipCard() {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // If we're flipping from back to front, get a new card
        if (!isFlipped) {
            showNewCard();
        }
        
        // Toggle flip state
        isFlipped = !isFlipped;
        cardEl.classList.toggle('is-flipped');
        
        // Reset animation flag after animation completes
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Event Listeners
    cardWrapper.addEventListener('click', flipCard);

    // Keyboard support (space/enter to flip)
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            flipCard();
        }
    });

    // Touch support for mobile
    cardWrapper.addEventListener('touchend', (e) => {
        e.preventDefault();
        flipCard();
    });

    // Initialize - start with a random card
    showNewCard();
    console.log('Card game initialized');
})();