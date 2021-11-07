import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const TOO_MUCH_COUNTRIES = 'Too many matches found. Please enter a more specific name.';
const NO_SUCH_COUNTRY = 'Oops, there is no country with that name';
const searchInput = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
searchInput.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
function onInput(e) {
  let searchOutput = e.target.value.trim();
  if (searchOutput) {
    fetchCountries(searchOutput).then(renderCountryList).catch(onFetchError);
  } else {
    clearPage();
  }
}
function renderCountryList(countries) {
  let quantity = countries.length;
  if (quantity > 10) {
    clearPage();
    Notiflix.Notify.info(TOO_MUCH_COUNTRIES);
  } else if (quantity > 1 && quantity < 11) {
    clearPage();
    countries.map(({ name, flags }) => {
      const listItem = `<li class ="country-list__item"><img class = "flag" src="${flags.svg}" alt="flag" width="60" height="30"></img>${name.official}</li>`;
      list.insertAdjacentHTML('beforeend', listItem);
    });
  } else if ((quantity = 1)) {
    clearPage();
    countries.map(({ name, capital, population, flags, languages }) => {
      let langs = [];
      Object.values(languages).forEach(language => {
        langs.push(language);
      });
      const country = `<h2 class = "title"><img class = "flag" src="${flags.svg}" alt="flag" width="60" height="30"></img>${name.official}</h2>
      <h3>Capital : <span class = "text">${capital}</span></h3>
      <h3>Population : <span class = "text">${population}</span></h3>
      <h3>Languages : <span class = "text">${langs}</span></h3>`;
      info.insertAdjacentHTML('beforeend', country);
    });
  }
}
function onFetchError() {
  Notiflix.Notify.failure(NO_SUCH_COUNTRY);
}
function clearPage() {
  list.innerHTML = '';
  info.innerHTML = '';
}
