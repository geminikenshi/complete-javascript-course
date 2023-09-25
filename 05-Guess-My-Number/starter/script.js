'use strict';

const max = 20;
const min = 1;
const secretNumber = Math.ceil(Math.random() * 20);
document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';
  } else if (guess < min || guess > max) {
    document.querySelector('.message').textContent = '⚠️ Number out of bound!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Correct number!';
  } else if (guess > secretNumber) {
    document.querySelector('.message').textContent = '📈 Number too high!';
  } else if (guess < secretNumber) {
    document.querySelector('.message').textContent = '📉 Number too low!';
  }
});
