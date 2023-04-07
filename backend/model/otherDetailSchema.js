const mongoose = require('mongoose');
const { Schema } = mongoose;

const otherDetailSchema = new Schema({
    email : String,
    resumeurl : String,
    coverletterurl : String,
});


module.exports = mongoose.model("otherDetail", otherDetailSchema);