
const express = require("express");

const redis = require("../config/redis");

const router = express.Router();

const WeatherForcast = require("../models/weather.model");

router.get("",(req,res)=>{

    redis.get("weather_forecast",async function(err,forecasts){

         console.log("forcast",forecasts);
if(err) console.log(err)

if(forecasts)return res.status(200).send({catched:JSON.parse(forecasts)})


const weather_forecast = await WeatherForcast.find().lean().exec();


redis.set("weather_forecast",JSON.stringify(weather_forecast))

return res.status(200).send({dbforecast:weather_forecast});
    })
    
})

router.post("",async function(req,res){
    const weather_forecast = await WeatherForcast.create(req.body)
    
    
    
    const weather_forecasts = await WeatherForcast.find().lean().exec();

    redis.set("weather_forecast",JSON.stringify(weather_forecasts));
    return res.status(201).send(weather_forecast);
})


router.get("/:id",(req,res)=>{
    redis.get(`weather_forecast.${req.params.id}`,  async function(err,forecast){


    if(err) console.log(err);

    if(forecast) return res.status(200).send({catched_forecast:JSON.parse(forecast)})

    const weather_forecast = await WeatherForcast.findById(req.params.id).lean().exec()

    redis.set(`weather_forecast.${req.params.id}`,JSON.stringify(weather_forecast));

    return res.status(200).send({dbforecast:weather_forecast})

})
})

router.patch("/:id",async(req,res)=>{
    const weather_forecast = await WeatherForcast.findByIdAndUpdate(req.params.id,req.body,{new:true});

     redis.set(`weather_forecasts.${req.params.id}`,JSON.stringify(weather_forecast));

     const weather_forecasts = await WeatherForcast.find().lean().exec();

     redis.set("weather_forecast",JSON.stringify(weather_forecasts))

     return res.status(201).send(weather_forecast);

})

router.delete("/:id",async(req,res)=>{
    const weather_forecast  = await WeatherForcast.findByIdAndDelete(req.params.id);
    redis.del(`weather_forecast.${req.params.id}`);
    const weather_forecasts = await  WeatherForcast.find().lean().exec();

    redis.set("weather_forecasts",JSON.stringify(weather_forecasts));
    return res.status(200).send(weather_forecast);
})
module.exports = router;