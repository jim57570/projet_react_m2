const API_KEY = 'b1064a5e89465acbe490905a4990779b';
const url = 'http://api.positionstack.com/v1';

//TODO: gerer erreurs

export const forward = async (query) => {
    try {
      const response = await fetch(url + '/forward?access_key=' + API_KEY + '&query=' + query,
      {method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }});
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      throw(error);
    }
};

export const reverse = async (latitude, longitude) => {
    try {
      const response = await fetch(url + '/reverse?access_key=' + API_KEY + '&query=' + latitude + ',' + longitude,
      {method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }});
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      throw(error);
    }
};