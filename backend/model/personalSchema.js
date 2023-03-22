const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalSchema = new Schema({
    email : String,
    name : String,
    age : Number,
    gender : String,
    category : String,
    permanentAddress : String,
    currentAddress : String,
});


module.exports = mongoose.model("personal", personalSchema);