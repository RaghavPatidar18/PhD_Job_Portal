const mongoose = require('mongoose');
const { Schema } = mongoose;

const otherDetailSchema = new Schema({
    email : String,
});


module.exports = mongoose.model("otherDetail", otherDetailSchema);