const API_KEY = 'gKpMe2e6NnoIUiLAP4woRZCvn_EXkJkvJw0rHNUsI5E';

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