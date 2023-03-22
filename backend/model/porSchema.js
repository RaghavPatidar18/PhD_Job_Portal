const mongoose = require('mongoose');
const { Schema } = mongoose;

const porSchema = new Schema({
    email : String,
    organization : String,
    type : String,
    position : String,
    responsibility : String,
    startYear : String, 
    endYear : String,
});


module.exports = mongoose.model("por", porSchema);