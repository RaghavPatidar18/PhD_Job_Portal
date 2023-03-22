const mongoose = require('mongoose');
const { Schema } = mongoose;

const academicSchema = new Schema({
    email : String, 
    degreeName : String,
    degreeStudy : String,
    gradingScale : String,
    grade : String,
    startYear : String,
    endYear: String,
});


module.exports = mongoose.model("academic", academicSchema);