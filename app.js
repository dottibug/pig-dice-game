// TODO
// add a new game button after winner
// feat: custom player names
// feat: add readme file to git
// feat: add game title to page?
// deploy app

'use strict';

// Nav Elements
const howToPlayNav = document.querySelector('.nav--how-to-play');
const restartNav = document.querySelector('.nav--restart');

// Player Elements
const players = document.querySelectorAll('.player');
const player1 = document.querySelector('.player--1');
const player2 = document.querySelector('.player--2');

const playerName1 = document.querySelector('#name--1');
const playerName2 = document.querySelector('#name--2');

const score1 = document.getElementById('score--1');
const score2 = document.getElementById('score--2');

const current1 = document.getElementById('current--1');
const current2 = document.getElementById('current--2');

// Button Elements
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Dice
const dice = document.querySelector('.dice');

// Modal Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const modalTitle = document.querySelector('.modal-title');
const modalContent = document.querySelector('.modal-content');
const howToPlay = document.querySelector('.how-to-play');

// Player Name Input Elements
const nameInput1 = document.querySelector('#name--input1');
const nameInput2 = document.querySelector('#name--input2');

let activePlayer, currentScore, finalScores, playing;

startGame();

function startGame() {
  // display player name modal
  // get player name inputs (default player 1 and player 2 if none given)
  // change textcontent of player name

  activePlayer = 1;
  currentScore = 0;
  finalScores = [0, 0];
  playing = true;

  dice.classList.add('hidden');

  // scores to 0
  score1.textContent = 0;
  score2.textContent = 0;

  // current scores to 0
  current1.textContent = 0;
  current2.textContent = 0;

  // remove winning style
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');

  // set active style to player 1
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
}

// Switch Player
function switchPlayer(active) {
  activePlayer = active === 1 ? 2 : 1;

  for (const player of players) {
    player.classList.toggle('player--active');
  }
}

// Update Player Score
function updatePlayerScore(activePlayer) {
  document.getElementById(`score--${activePlayer}`).textContent =
    finalScores[activePlayer - 1];
}

// Set Current Score to 0
function currentScoreZero(activePlayer) {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}

// Show Modal
function showModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// Hide Modal
function hideModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

// Rolling Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    let roll = Math.trunc(Math.random() * 6) + 1;

    // display dice
    dice.classList.remove('hidden');
    dice.src = `images/dice-${roll}.png`;

    // add roll to score
    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // reset player's current score
      currentScoreZero(activePlayer);

      switchPlayer(activePlayer);
    }
  }
});

// Hold dice
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player's final score
    finalScores[activePlayer - 1] += currentScore;

    if (finalScores[activePlayer - 1] >= 20) {
      // win condition met
      playing = false;

      // hide dice
      dice.classList.add('hidden');

      updatePlayerScore(activePlayer);

      // add player--winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--winner');
    } else {
      updatePlayerScore(activePlayer);
      currentScoreZero(activePlayer);
      switchPlayer(activePlayer);
    }
  }
});

// Restart game
restartNav.addEventListener('click', startGame);

// Instructions modal
howToPlayNav.addEventListener('click', function () {
  modalTitle.textContent = `How To Play`;
  showModal();
});

btnCloseModal.addEventListener('click', function () {
  hideModal();
});

overlay.addEventListener('click', function () {
  hideModal();
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideModal();
  }
});
