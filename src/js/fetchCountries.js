const BASE_URL = 'https://restcountries.eu';
function fetchCountries(countryName) {
    return fetch(`${BASE_URL}/rest/v2/name/${countryName}`).then(responce => {
        console.log(responce);
        if (responce.ok) { return responce.json() }
    });
};

export default { fetchCountries };