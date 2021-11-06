import './css/styles.css';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  let searchOutput = e.target.value;
  fetchCountries(searchOutput)
    .then(renderCountryList)
    .catch(error => {
      console.log(error);
    });
}
function renderCountryList(countries) {
  countries.map(country => {
    list.insertAdjacentHTML('beforeend', `<li>${country.name.official}</li>`);
  });
}
function fetchCountries(name) {
  const filters = 'fields=name,capital,population,flags,languages';
  return fetch(`https://restcountries.com/v3.1/name/${name}?${filters}`).then(response => {
    return response.json();
  });
}
