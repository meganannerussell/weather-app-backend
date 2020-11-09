const request = require("request");

const forecast = (address) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7796b8671198c9dd364737db17bb441b&query=" +
    encodeURIComponent(address);

  const promise = new Promise((resolve, reject) => {
    request({ url, json: true }, (error, response) => {
      if (error) {
        reject("Could not connect", undefined);
      } else if (response.body.error) {
        reject({error: "Could not find location, try again"} );
      } else {
        resolve({
          temperature: ` It is currently ${response.body.current.temperature} degrees celsius and ${response.body.current.weather_descriptions}`,
        });
      }
    });
  });
  return promise;
};

module.exports = forecast;
