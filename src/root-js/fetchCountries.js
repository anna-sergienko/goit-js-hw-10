import { Notify } from "notiflix";
import getRefs from "./refs";

const BASIC_URL = "https://restcountries.com/v3.1";
const refs = getRefs();

function fetchCountries(countryName) {
    return fetch(`${BASIC_URL}/name/${countryName}`)
        .then((response) => {
            if (!response.ok) {
                Notify.failure("Oops, there is no country with that name");
                refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = '';
                throw new Error(response.status);
            }
            return response.json();
    })
}
export default { fetchCountries };
