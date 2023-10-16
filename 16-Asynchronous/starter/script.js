'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// New API path: https://countries-api-836d.onrender.com/countries/

const apiRoot = 'https://countries-api-836d.onrender.com/countries';

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `${apiRoot}/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
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

    countriesContainer.insertAdjacentHTML('afterbegin', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('gb');
getCountryData('sk');
getCountryData('greece');
