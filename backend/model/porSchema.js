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


module.exports = mongoose.model("por", porSchema);