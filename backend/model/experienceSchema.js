const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
    email : String,
    profile : String, 
    organization : String,
    start_date : Date,
    end_date : Date,
    description : String,
    location : String,
});


module.exports = mongoose.model("experience", experienceSchema);