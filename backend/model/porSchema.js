const mongoose = require('mongoose');
const { Schema } = mongoose;

const porSchema = new Schema({
    email : String,
    title : String, 
    organization : String,
    location : String,
    start_date : Date,
    end_date : Date,
    description : String,
});


module.exports = mongoose.model("por", porSchema);