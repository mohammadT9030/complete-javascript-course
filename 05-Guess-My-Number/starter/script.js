'use strict';

const checkBtn = document.querySelector('.btn.check');
const input = document.querySelector('.guess');
const message = document.querySelector('.message');
const hiddenNumber = document.querySelector('.number');
const againBtn = document.querySelector('.btn.again');
const body = document.querySelector('body');
const score = document.querySelector('span.score');
const highScore = document.querySelector('span.highscore');
let theNumber = Math.floor(1 + Math.random() * 19);

checkBtn.addEventListener('click', () => {
  if (Number(input.value) === theNumber) {
    message.textContent = 'Correct number!';
    hiddenNumber.textContent = theNumber;
    body.style.backgroundColor = '#60b347';
    if (Number(score.textContent) > Number(highScore.textContent)) {
      highScore.textContent = Number(score.textContent);
    }
  } else if (input.value < theNumber) {
    message.textContent = 'Too low!';
    score.textContent = Number(score.textContent) - 1;
  } else {
    message.textContent = 'Too high!';
    score.textContent = Number(score.textContent) - 1;
  }
});

againBtn.addEventListener('click', () => {
  input.value = '';
  hiddenNumber.textContent = '?';
  body.style.backgroundColor = '#222';
  score.textContent = 20;
  theNumber = Math.floor(1 + Math.random() * 20);
});
