const mongoose = require('mongoose');
const { Schema } = mongoose;

const otherDetailSchema = new Schema({
    email : String,
    resume_url : String,
    cover_letter_url : String,
});


module.exports = mongoose.model("otherDetail", otherDetailSchema);