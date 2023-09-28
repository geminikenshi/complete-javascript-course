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

console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(26, 'Willian Johnson');

book.call(eurowings, 26, 'Willian Johnson');
console.log(eurowings);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 343, 'Sherry Liang');
console.log(swiss);

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
