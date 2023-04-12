<<<<<<< HEAD
const mongoose = require('mongoose');
const { Schema } = mongoose;

const referenceSchema = new Schema({
    email : String,
    name : String,
    title : String,
    affliliation : String,
    referenceemail : String,
    referencephone : String,
    relationship : String,
    description : String,
});


=======
const mongoose = require('mongoose');
const { Schema } = mongoose;

const referenceSchema = new Schema({
    email : String,
    name : String,
    title : String,
    affliliation : String,
    referenceemail : String,
    referencephone : String,
    relationship : String,
    description : String,
});


>>>>>>> 7eadd5e0af5333d270874eee2c4cf9aa9d1f6292
module.exports = mongoose.model("reference", referenceSchema);