const express = require("express");
const cors = require('cors')

const geocode = require("./utils/Geocode");
const forecast = require("./utils/Forecast");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors())

app.get("/", async (req, res) => {
  res.send("hello world!");
});

// app.get("/weather", async (req, res) => {
//   if (!req.query.address) {
//     return res.send({
//       error: "You must provide an address",
//     });
//   }

//   // geocode data is lattitude, longitude, location
//   try {
//     const geocodeData = await geocode(req.query.address);
//     //   res.send({
//     //     test: geocodeData,
//     //   });
//     const forecastData = await forecast(
//       geocodeData.lattitude,
//       geocodeData.longitude
//     );
//     res.send({
//       forecast: forecastData,
//       location: geocodeData.location,
//       address: req.query.address,
//     });
//   } catch (e) {
//       res.send({
//           error: e
//       })
//     // console.log(e);
//   }
// });

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  // geocode data is lattitude, longitude, location
  try {
    // const geocodeData = await geocode(req.query.address);
    //   res.send({
    //     test: geocodeData,
    //   });
    const forecastData = await forecast(
      // geocodeData.lattitude,
      // geocodeData.longitude
      req.query.address
    );
    res.send({
      forecast: forecastData,
      // location: geocodeData.location,
      // address: req.query.address,
    });
  } catch (e) {
    res.send({
      error: e,
    });
    // console.log(e);
  }
});

app.listen(port, () => {
  console.log("Server is up on port port." + port);
});
