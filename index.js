const express = require("express");
const cors = require('cors')

const forecast = require("./utils/Forecast");

const app = express();
const port = process.env.PORT || 5000;
app.use(cors())

app.get("/", async (req, res) => {
  res.send("hello world!");
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  try {
  
    const forecastData = await forecast(
      req.query.address
    );
    res.send({
      forecast: forecastData,

    });
  } catch (e) {
    res.send({
      forecast: e,
    });
  }
});

app.listen(port, () => {
  console.log("Server is up on port port." + port);
});
