const mongoose = require('mongoose');
const { Schema } = mongoose;

const publicationSchema = new Schema({
    email : String,
    title : String,
    authorlist : String,
    abstract : String,
    journal : String,
    volume : String,
    pages : String, 
    publisher : String,
    doi : String, 
    url : String, 
});


module.exports = mongoose.model("publication", publicationSchema);