const mongoose = require("mongoose");

const wetherSchema = mongoose.Schema({
    city_name:{type:String,require:true},
    max_temprature:{type:Number,require:true},
    min_temprature:{type:Number,require:true},
    chance_of_rain:{type:Number,require:true},
    humidity:{type:Number,require:true}
},{
    versionKey:false,
    timestamps:true,
})


module.exports = mongoose.model("weather_forcast",wetherSchema);