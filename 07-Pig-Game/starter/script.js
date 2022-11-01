'use strict';

const currentScoreElement1 = document.querySelector('#current--0');
const currentScoreElement2 = document.querySelector('#current--1');
const totalScoreElement1 = document.querySelector('#score--0');
const totalScoreElement2 = document.querySelector('#score--1');
const playersElement = document.querySelectorAll('.player');
const diceElement = document.querySelector('.dice');

// Event Listeners
document.querySelector('.btn--roll').addEventListener('click', () => {
  game.rollDice();
});
document.querySelector('.btn--hold').addEventListener('click', () => {
  game.hold();
});
document.querySelector('.btn--new').addEventListener('click', () => {
  game.reset();
});

function Player(currentScoreElement, totalScoreElement, playerElement) {
  return {
    totalScore: 0,
    currentScore: 0,
    updateCurrentSocreElement: function () {
      currentScoreElement.textContent = this.currentScore;
    },
    updateTotalScoreElement: function () {
      totalScoreElement.textContent = this.totalScore;
    },
    updateElements: function () {
      this.updateCurrentSocreElement();
      this.updateTotalScoreElement();
    },
    win: function () {
      dice.hide();
      playerElement.classList.add('player--winner');
    },
  };
}

const player1 = Player(
  currentScoreElement1,
  totalScoreElement1,
  playersElement[0]
);
const player2 = Player(
  currentScoreElement2,
  totalScoreElement2,
  playersElement[1]
);

const dice = {
  number: 1,
  hidden: false,
  roll: function () {
    this.number = Math.floor(Math.random() * 6) + 1;
    diceElement.src = `dice-${this.number}.png`;
    return this.number;
  },
  hide: function () {
    this.hidden = true;
    diceElement.style.display = 'none';
  },
  unhide: function () {
    this.hidden = false;
    diceElement.style.display = 'block';
  },
};

const game = {
  currentPlayer: player1,
  isOver: false,
  changePlayer: function () {
    this.currentPlayer = this.currentPlayer === player1 ? player2 : player1;
    playersElement.forEach(e => e.classList.toggle('player--active'));
  },
  hold: function () {
    if (this.isOver) return;
    this.currentPlayer.totalScore += this.currentPlayer.currentScore;
    this.currentPlayer.currentScore = 0;
    this.currentPlayer.updateCurrentSocreElement();
    this.currentPlayer.updateTotalScoreElement();
    if (this.currentPlayer.totalScore >= 50) {
      this.isOver = true;
      this.currentPlayer.win();
      return;
    }
    this.changePlayer();
  },
  rollDice: function () {
    if (this.isOver) return;
    this.currentPlayer.currentScore += dice.roll();
    if (dice.number === 1) {
      this.currentPlayer.currentScore = 0;
      this.hold();
    }
    dice.hidden && dice.unhide();
    this.currentPlayer.updateCurrentSocreElement();
  },
  reset: function () {
    player1.totalScore =
      player1.currentScore =
      player2.totalScore =
      player2.currentScore =
        0;
    this.currentPlayer === player2 && this.changePlayer();
    dice.hidden = true;
    player1.updateElements();
    player2.updateElements();
    dice.hide();
    playersElement.forEach(e => e.classList.remove('player--winner'));
    this.isOver = false;
  },
};

game.reset();
