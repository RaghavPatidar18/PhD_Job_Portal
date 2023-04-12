<<<<<<< HEAD
const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
    email : String,
    profile : String, 
    organization : String,
    startdate : Date,
    enddate : Date,
    description : String,
    location : String,
});


=======
const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
    email : String,
    profile : String, 
    organization : String,
    startdate : Date,
    enddate : Date,
    description : String,
    location : String,
});


>>>>>>> 7eadd5e0af5333d270874eee2c4cf9aa9d1f6292
module.exports = mongoose.model("experience", experienceSchema);