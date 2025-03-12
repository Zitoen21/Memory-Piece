const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // Eerste keer klikken
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // Tweede keer klikken
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
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
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() { // Functie om de kaarten te shuffelen
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos; 
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

const music = document.getElementById("bg-music");
const muteButton = document.getElementById("mute-music");

music.muted = true;

muteButton.addEventListener("click", function() {
    if (music.muted) {
        music.muted = false;
        music.play();
        muteButton.textContent = "🔊"; // Zet het icoon op geluid aan
    } else {
        music.muted = true;
        muteButton.textContent = "🔇"; // Zet het icoon op geluid uit
    }
});

let playerScore = 0; // Start op 0
const playerScoreEl = document.getElementById('player-score'); // HTML element ophalen

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        updateScore(); // Verhoog de score bij een match
    } else {
        unflipCards();
    }
}

function updateScore() {
    playerScore++; // Verhoog de score met 1
    playerScoreEl.textContent = playerScore; // Update de score in HTML
}
