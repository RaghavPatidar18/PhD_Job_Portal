<<<<<<< HEAD
const mongoose = require('mongoose');
const { Schema } = mongoose;

const porSchema = new Schema({
    email : String,
    title : String, 
    organization : String,
    location : String,
    startdate : Date,
    enddate : Date,
    description : String,
});


=======
const mongoose = require('mongoose');
const { Schema } = mongoose;

const porSchema = new Schema({
    email : String,
    title : String, 
    organization : String,
    location : String,
    startdate : Date,
    enddate : Date,
    description : String,
});


>>>>>>> 7eadd5e0af5333d270874eee2c4cf9aa9d1f6292
module.exports = mongoose.model("por", porSchema);