'use strict';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textArea = document.querySelector('textarea');
const btn = document.querySelector('button');
btn.addEventListener('click', function () {
  // Get the text from element first
  const text = textArea.value;

  // Seperate each line
  const lines = text.toLowerCase().split('\n');
  console.log(lines);
  // split string by '_'
  lines.forEach((line, index) => {
    const words = line.replace(/\s+/g, '').split('_');
    const camelCase = [];
    words.forEach((word, index) => {
      if (index === 0) {
        camelCase.push(word);
        return;
      }
      camelCase.push(word[0].toUpperCase() + word.slice(1));
    });

    console.log(camelCase.join('').padEnd(20, ' ') + '😗'.repeat(index + 1));
  });
});
