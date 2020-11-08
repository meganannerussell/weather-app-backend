const request = require("request");

const forecast = (address) => {
  console.log("yo");
  const url =
    "http://api.weatherstack.com/current?access_key=7796b8671198c9dd364737db17bb441b&query=" +
    encodeURIComponent(address);

  console.log(url);

  const promise = new Promise((resolve, reject) => {
    request({ url, json: true }, (error, response) => {
      if (error) {
        reject("Could not connect", undefined);
      } else if (response.body.error) {
        reject("Could not find location", undefined);
      } else {
        resolve({
          temperature: ` It is currently ${response.body.current.temperature} degrees out but it feels like ${response.body.current.weather_descriptions}`,
        });
      }
    });
  });
  return promise;
};

module.exports = forecast;
