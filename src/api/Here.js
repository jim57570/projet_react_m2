const API_KEY = 'gKpMe2e6NnoIUiLAP4woRZCvn_EXkJkvJw0rHNUsI5E';

//TODO: add lang=fr ?

//Permet de retrouver les coordonnees geographiques a partir d une adresse postale
export const geocoding = async (query) => {
    try {
        const response = await fetch('https://geocode.search.hereapi.com/v1/geocode?apiKey=' + API_KEY + '&q=' + query,
        {method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }});
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw(error);
    }
};

//Permet de retrouver une adresse postale a partir de coordonnees geographiques
export const reverseGeocode = async (latitude, longitude) => {
    try {
        const response = await fetch('https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=' + API_KEY + '&at=' + latitude + ',' + longitude,
        {method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }});
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw(error);
    }
};

//TODO: rajouter coordonnees carte ?
//Permet de completer une adresse postale a partir d un debut de saisie
export const autoComplete= async (query) => {
    try {
        const response = await fetch('https://autocomplete.search.hereapi.com/v1/autocomplete?apiKey=' + API_KEY + '&q=' + query + '&limit=' + 5,
        {method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }});
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw(error);
    }
};

//TODO: rajouter coordonnees carte ?
//Autcompletion pour recherche ville
export const cityAutoComplete= async (query) => {
    try {
        const response = await fetch('https://autocomplete.search.hereapi.com/v1/autocomplete?types=city&apiKey=' + API_KEY + '&q=' + query + '&limit=' + 5,
        {method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }});
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw(error);
    }
};

//TODO: rajouter coordonnees carte ?
//Permet de chercher des activites autour d un point
export const browse = async (idCategorie, lat, lon) => {
    try {
        const response = await fetch('https://browse.search.hereapi.com/v1/browse?apiKey=' + API_KEY + "&at=" + lat + ',' + lon + "&categories=" + idCategorie + "&limit=20",
        {method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }});
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw(error);
    }
};