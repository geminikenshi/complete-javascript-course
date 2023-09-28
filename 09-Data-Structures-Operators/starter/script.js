'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const { menu = [], starterMenu: starters = [] } = restaurant;

for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// challenge #1

// // destructure the players field
// const [players1, players2] = game.players;
// const [gk, ...fieldPlayers] = players1;
// const allplayers = [...players1, ...players2];
// const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// // destructure object
// const {
//   odds: { team1, x: draw, team2 },
// } = game;

// function printGoals(...names) {
//   names.forEach(function (element) {
//     console.log(element);
//   });
//   console.log('number of goals that were scored: ' + names.length);
// }

// // use logical operator

// // if use ||, short circuit will happen
// team1 < team2 && console.log('Team1 is more likely to win');
// team1 > team2 && console.log('Team2 is more likely to win');

// Challenge #2
// // 1.
// game.scored.forEach((element, index) => {
//   console.log(`Goal ${index + 1}:${element}`);
// });

// // 2.
// const oddsValue = Object.values(game.odds);
// let oddsTotal = 0;
// for (let odd of oddsValue) {
//   oddsTotal += odd;
// }
// console.log(oddsTotal / oddsValue.length);

// // 3.
// const oddsKeyValue = Object.entries(game.odds);
// for (const [key, value] of oddsKeyValue) {
//   if (key == 'x') {
//     console.log(`Odd of draw: ${value}`);
//   } else {
//     console.log(`Odd of victory ${game[key]}: ${value}`);
//   }
// }

// Challenge #3
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// // 1.
// const events = new Set(gameEvents.values());
// console.log(events);

// // 2.
// gameEvents.delete(64);
// console.log(gameEvents);

// // 3.
// console.log(
//   `An event happened, on average, every ${90 / gameEvents.size} minutes`
// );

// // 4.
// const eventList = gameEvents.entries();

// for (const [key, value] of eventList) {
//   const half = key < 45 ? '[FIRST HALF]' : '[SECOND HALF]';
//   console.log(`${half} ${key}: ${value}`);
// }

// Challenge #4
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
    // remove all spaces using regex
    const words = line.replace(/\s+/g, '').split('_');
    const camelCase = [];
    words.forEach((word, index) => {
      if (index === 0) {
        // the first word stay the same it is
        camelCase.push(word);
        return;
      }
      camelCase.push(word[0].toUpperCase() + word.slice(1));
    });

    // use padding to create fixed length string
    console.log(camelCase.join('').padEnd(20, ' ') + '😗'.repeat(index + 1));
  });
});
