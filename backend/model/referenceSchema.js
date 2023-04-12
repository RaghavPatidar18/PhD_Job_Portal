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


module.exports = mongoose.model("reference", referenceSchema);