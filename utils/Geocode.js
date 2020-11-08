const request = require("request");

const geocode = (address) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWVnYW5hbm5lcnVzc2VsbCIsImEiOiJja2VqbmJvM3QwdzBnMnpvNjNldGN2Y3JzIn0.OjvEmVG1j81uAqyBZt9qnQ";

  console.log(url);


  const promise = new Promise((resolve, reject) => {
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        reject("Unable to connect");
      } else if (body.features.length === 0) {
        reject("unable to find location");
      } else {
        resolve({
          lattitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      }
    });
  });

  return promise;

};


module.exports = geocode;