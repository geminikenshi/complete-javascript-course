'use strict';

const max = 20;
const min = 1;
let secretNumber = Math.ceil(Math.random() * 20);
let score = 20;
let highScore = 0;

const messageElement = document.querySelector('.message');
const numberElement = document.querySelector('.number');
const scoreElement = document.querySelector('.score');
const guessElement = document.querySelector('.guess');
const bodyElement = document.querySelector('body');

console.log('secret number:' + secretNumber);

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    messageElement.textContent = '⛔️ No number!';
  } else if (guess < min || guess > max) {
    messageElement.textContent = '⚠️ Number out of bound!';
  } else if (guess === secretNumber) {
    // Correct number
    messageElement.textContent = '🎉 Correct number!';
    numberElement.textContent = secretNumber;

    bodyElement.style.backgroundColor = '#60b347';
    numberElement.style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess > secretNumber) {
    checkScore('📈 Number too high!');
  } else if (guess < secretNumber) {
    checkScore('📉 Number too low!');
  }
});

function checkScore(message) {
  if (score > 1) {
    messageElement.textContent = message;
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    messageElement.textContent = '🫤 You lost!';
    document.querySelector('.score').textContent = 0;
  }
}

document.querySelector('.again').addEventListener('click', function () {
  // reset score
  score = 20;
  scoreElement.textContent = score;

  // regenerate secret number
  secretNumber = Math.ceil(Math.random() * 20);
  console.log('secret number:' + secretNumber);

  // reset message
  messageElement.textContent = 'Start guessing...';

  // reset input form
  guessElement.value = '';

  // reset style
  bodyElement.style.backgroundColor = '#222';
  numberElement.textContent = '?';
  numberElement.style.width = '15rem';
});
