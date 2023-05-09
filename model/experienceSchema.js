const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
    email : String,
    profile : String,
    organization : String,
    startdate : String,
    enddate : String,
    description : String,
    location : String,
});


module.exports = mongoose.model("experience", experienceSchema);
