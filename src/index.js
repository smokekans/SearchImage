import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import { fetchCountries } from './fetchCountries';

// import debounce from 'lodash.debounce';


// const DEBOUNCE_DELAY = 300;

// const searchInput = document.querySelector('#search-box');
// const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('.country-info');

// searchInput.addEventListener('input', debounce(onSearh, DEBOUNCE_DELAY));

// function onSearh() {
//     const countryName = searchInput.value.trim();

//     if (!countryName) {
//         countryList.innerHTML = '';
//         countryInfo.innerHTML = '';
//         return;
//     }

//     fetchCountries(countryName)
//     .then(countries => {
//         if (countries.length > 10) {
//         Notify.info('Too many matches found. Please enter a more specific name.');
//         countryList.innerHTML = '';
//         countryInfo.innerHTML = '';
//     } else if (countries.length <= 10 && countries.length >= 2) {
//         const listMarkup = countries.map(country => listCountry(country));
//         countryList.innerHTML = listMarkup.join('');
//         countryInfo.innerHTML = '';
//     } else {
//         const countryMarkup = countries.map(country => countryCard(country));
//         countryList.innerHTML = '';
//         countryInfo.innerHTML = countryMarkup.join('');
//     }})
//     .catch(error => {
//         Notify.failure('Oops, there is no country with that name');
//         countryList.innerHTML = '';
//         countryInfo.innerHTML = '';
//         return error;
//     });
// }

// function listCountry({ flags, name }) {
//     return `<li class='country-preview'>
//         <img class='country-flag' src=${flags.svg} alt='flag'/>
//         <span class='country-name'>${name.official}</span>
//     </li>`;
// }

// function countryCard({ flags, name, capital, population, languages }) {
//     return `<div class='country-card'>
//     <p class='country-card__name'>
//         <img
//             class='country-flag'
//             src=${flags.svg}
//             alt='flag'
//             width='50'
//         />
//         <span class='country-name'><b>${name.official}</b></span>
//         <p><b>Capital:</b> ${capital}</p>
//         <p><b>Population:</b> ${population}</p>
//         <p><b>Languages:</b> ${Object.values(languages)}
//     </p>
//     </div>`;
// }