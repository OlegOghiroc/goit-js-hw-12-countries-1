import './sass/main.scss';
import countryMarkup from './markup/countries_markup.hbs';
import countryMarkupList from './markup/counrties_list_markup.hbs';
import { debounce } from "lodash";
import API from './js/fetchCountries';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const refs = {
    CardContainer: document.querySelector('.js-card-container'),
    formInput: document.querySelector('.form-input-js'),
}

refs.formInput.addEventListener('input', debounce(onInputSearch, 1000));

function onInputSearch(e) {
    refs.CardContainer.innerHTML = '';
    const inputValue = e.target.value.trim();
    if (inputValue === '') {
        return;
    }
    API.fetchCountries(inputValue).then(renderCountriesMarkup).catch(error => {
        console.log(error)
    });
}



function renderCountriesMarkup(country) {
    refs.CardContainer.innerHTML = '';
    if (country === undefined) {
        error({
          text: 'Hi, please enter a valid name!',
        });
        return;
    } else if (country.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more spesific query!',
        });
        console.log('більше 10 нотіфікашка')
        return
    } else if (country.length > 1 & country.length < 10) {
        const countriesCard = countryMarkupList(country);
        refs.CardContainer.innerHTML = countriesCard;
        console.log('рендеримо тільки список')
        return
    }
    const countryCard = countryMarkup(country);
    refs.CardContainer.innerHTML = countryCard;
}