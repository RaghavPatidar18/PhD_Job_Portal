const mongoose = require('mongoose');
const { Schema } = mongoose;

const experienceSchema = new Schema({
    email : String,
    companyName : String,
    jobProfile : String,
    location : String,
    startYear : String, 
    endYear : String, 
});


module.exports = mongoose.model("experience", experienceSchema);