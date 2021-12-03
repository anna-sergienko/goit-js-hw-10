import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from "./root-js/fetchCountries";
import getRefs from './root-js/refs';
// import fetchCountries from "./root-js/fetchCountries";
import countryCard from "./templates/country-card.hbs";
import countryList from "./templates/country-list.hbs";
import { debounce } from 'lodash';



const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.searchInput.addEventListener("input", debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(evt) {
    evt.preventDefault();

    const inputCountryName = evt.path[0].value.trim();
    console.log(inputCountryName);

    API.fetchCountries(inputCountryName)
        .then(makeCountryCard)
        .catch(error => console.log(error));

}

function makeCountryCard(country) {
    const listMarkup = countryList(country);
    const cardMarkup = countryCard(country);

    if (country.length > 1 && country.length < 10) {
        refs.countryInfo.innerHTML = "";
        refs.countryList.innerHTML = listMarkup;
    };
    if (country.length === 1) {
        refs.countryInfo.innerHTML = cardMarkup;
        refs.countryList.innerHTML = "";
    };

    if (country.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    };
}
