// TODO
// feat: custom player names (CHANGE THIS TO SETTINGS MENU BUTTON; can be changed anytime)
// set up server
// feat: finish custom player names
// feat: add game title to page?
// fix: reset win points to 100
// feat: add readme file to git
// deploy app

'use strict';

// Nav Elements
const howToPlayNav = document.querySelector('.nav--how-to-play');
const restartNav = document.querySelector('.nav--restart');
const settingsNav = document.querySelector('.nav--settings');

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
const playerNameForm = document.querySelector('.form--player-names');
const nameInput1 = document.getElementById('name--input1');
const nameInput2 = document.getElementById('name--input2');

let activePlayer, currentScore, finalScores, playing;

startGame();

function startGame() {
  activePlayer = 1;
  currentScore = 0;
  finalScores = [0, 0];
  playing = true;

  dice.classList.add('hidden');
  btnNew.classList.add('hidden');
  btnRoll.classList.remove('btn--inactive');
  btnHold.classList.remove('btn--inactive');

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

// Change Player Names
// TODO

// Show Modal
function showModal(modalName) {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');

  if (modalName === 'settings') {
    modalTitle.textContent = `Game Settings`;
    playerNameForm.classList.remove('hidden');
  }

  if (modalName === 'howToPlay') {
    modalTitle.textContent = `How To Play`;
    howToPlay.classList.remove('hidden');
  }
}

// Hide Modal
function hideModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  howToPlay.classList.add('hidden');
  playerNameForm.classList.add('hidden');
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

      // show new game button
      btnNew.classList.remove('hidden');

      // apply inactive style to roll & hide btns
      btnRoll.classList.add('btn--inactive');
      btnHold.classList.add('btn--inactive');

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

// New game
btnNew.addEventListener('click', startGame);

// How to Play Modal
howToPlayNav.addEventListener('click', function () {
  showModal('howToPlay');
});

// Settings Modal
settingsNav.addEventListener('click', function () {
  showModal('settings');
});

// Close Modals
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
