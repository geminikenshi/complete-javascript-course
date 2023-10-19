'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// New API path: https://countries-api-836d.onrender.com/countries/

const apiRoot = 'https://countries-api-836d.onrender.com/countries';

const renderCountry = function (data, classname = '') {
  const html = `
    <article class="country ${classname}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}M</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `${apiRoot}/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     renderCountry(data);
//   });
// };

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `${apiRoot}/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country
    renderCountry(data);

    // render neighbor
    const neighbour = data.borders?.[0];
  });
};

// getCountryData('sk');
// getCountryData('greece');

const getCountryData = function (country) {
  fetch(`${apiRoot}/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      return fetch(`${apiRoot}/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

// getCountryData('cyprus');

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// console.log('Test end');

// const lotterPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('You WIN');
//   } else {
//     reject('You lost your money');
//   }
// });

// lotterPromise.then(res => console.log(res)).catch(err => console.error(err));

// navigator.geolocation.getCurrentPosition(
//   location => console.log(location),
//   err => console.error(err)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

// implement with chaining and consuming promise
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       //   lat = pos.coords.latitude;
//       //   lng = pos.coords.longitude;
//       const { latitude: lat, longitude: lng } = pos.coords; // destructure object
//       return fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`${apiRoot}/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]));
// };

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(`${apiRoot}/name/${dataGeo.country}`);
    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
  }
};

// whereAmI(25.0672353, 121.4495892);
btn.addEventListener('click', whereAmI);
