const mongoose = require('mongoose');
const { Schema } = mongoose;

const publicationSchema = new Schema({
    email : String,
    title : String,
    authorList : String,
    journal : String,
    summary : String, 
    startYear : String, 
    endYear : String,  
});


module.exports = mongoose.model("publication", publicationSchema);