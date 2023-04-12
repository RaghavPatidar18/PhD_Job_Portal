<<<<<<< HEAD
const mongoose = require('mongoose');
const { Schema } = mongoose;

const otherDetailSchema = new Schema({
    email : String,
    resumeurl : String,
    coverletterurl : String,
});


=======
const mongoose = require('mongoose');
const { Schema } = mongoose;

const otherDetailSchema = new Schema({
    email : String,
    resumeurl : String,
    coverletterurl : String,
});


>>>>>>> 7eadd5e0af5333d270874eee2c4cf9aa9d1f6292
module.exports = mongoose.model("otherDetail", otherDetailSchema);