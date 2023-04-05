const mongoose = require('mongoose');
const { Schema } = mongoose;

const referenceSchema = new Schema({
    email : String,
    name : String,
    title : String,
    affliliation : String,
    reference_email : String,
    reference_phone : String,
    relationship : String,
    description : String,
});


module.exports = mongoose.model("reference", referenceSchema);