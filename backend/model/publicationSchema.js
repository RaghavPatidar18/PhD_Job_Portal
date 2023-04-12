<<<<<<< HEAD
const mongoose = require('mongoose');
const { Schema } = mongoose;

const publicationSchema = new Schema({
    email : String,
    title : String,
    authorlist : [
        {
            author : String,
            author_id : String,
        }
    ],
    abstract : String,
    journal : String,
    volume : String,
    pages : String, 
    publisher : String,
    doi : String, 
    url : String, 
});


=======
const mongoose = require('mongoose');
const { Schema } = mongoose;

const publicationSchema = new Schema({
    email : String,
    title : String,
    authorlist : [
        {
            author : String,
            author_id : String,
        }
    ],
    abstract : String,
    journal : String,
    volume : String,
    pages : String, 
    publisher : String,
    doi : String, 
    url : String, 
});


>>>>>>> 7eadd5e0af5333d270874eee2c4cf9aa9d1f6292
module.exports = mongoose.model("publication", publicationSchema);