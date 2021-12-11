const express = require("express");
const app = express();
app.use(express.json())


const weather_forcast_controller = require("./controllers/weather.controller");


app.use("/weather_forecast",weather_forcast_controller);




module.exports=app;