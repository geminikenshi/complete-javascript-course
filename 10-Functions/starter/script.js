'use strict';

const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHi = greet('Hi');

// greeterHi('James');
// greeterHi('Kenshi');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(283, 'Kenshi Kuo');
lufthansa.book(891, 'James Bond');

// console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(26, 'Willian Johnson');

book.call(eurowings, 26, 'Willian Johnson');
// console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 343, 'Sherry Liang');
// console.log(swiss);

// Bind method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(254, 'Luis Spencer');

const bookEW23 = book.bind(eurowings, 23);

bookEW23('Luis Spencer');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;

const addVAT = addTax.bind(null, 0.23);
// addVAT = value + value * 0.23

const addVat2 = function (value) {
  return addTax(0.23, value);
};

// Challenge #1
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  // Method registerNewAnswer
  registerNewAnswer() {
    console.log(this.question);
    for (const opt of this.options) console.log(opt);
    const ans = prompt('(Write option number)');
    const num = Number(ans);
    if (Number.isNaN(num)) {
      console.log('Error: input must be a number');
    } else if (num < 0 || num >= this.options.length) {
      console.log('Error: input out of range');
    } else {
      this.answers[num]++;
      this.displayResults(this.outputFormat);
    }
  },
  // Method displayResults
  displayResults(type) {
    if (type === 'string') {
      let output = '';
      this.answers.forEach((value, index) => {
        if (index == 0) {
          output = output.concat(value);
        } else {
          output = output.concat(', ', value);
        }
      });
      console.log(`Poll results are ${output}`);

      // This is the much better one-liner by Jonas
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else {
      console.log(this.answers);
    }
  },
  // Output format
  outputFormat: 'string',
};

// Add event listener and bind the this reference to poll object
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const test1 = {
  answers: [5, 2, 3],
};

const test2 = {
  answers: [1, 5, 3, 9, 6, 1],
};
poll.displayResults.call(test1);
poll.displayResults.call(test2);
