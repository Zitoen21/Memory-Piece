const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let currentPlayer = 1; // Player 1 start
let scores = { 1: 0, 2: 0 }; // Beide spelers starten met 0 punten

// Selecteer de score elementen in HTML
const player1ScoreEl = document.getElementById('player-1-score');
const player2ScoreEl = document.getElementById('player-2-score');
const currentPlayerEl = document.getElementById('current-player');

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        updateScore();
    } else {
        unflipCards();
        switchTurn(); // Wissel beurt als er geen match is
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// ✅ **Update score en geef de speler een extra beurt bij een match**
function updateScore() {
    scores[currentPlayer] += 1;
    
    // ✅ Score bijwerken op het scherm
    if (currentPlayer === 1) {
        player1ScoreEl.textContent = scores[1];
    } else {
        player2ScoreEl.textContent = scores[2];
    }
}

// ✅ **Beurt wisselen bij een fout**
function switchTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerEl.textContent = `Player ${currentPlayer}`;
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// ✅ **Kaarten shuffelen bij het starten van het spel**
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
