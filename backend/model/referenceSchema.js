const mongoose = require('mongoose');
const { Schema } = mongoose;

const referenceSchema = new Schema({
    email : String,
    name : String,
    workProfile : String,
    relation : String,
    relationEmail : String,
    relationPhone : String, 
    additional : String,
});


module.exports = mongoose.model("reference", referenceSchema);