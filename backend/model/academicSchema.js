const mongoose = require('mongoose');
const { Schema } = mongoose;

const academicSchema = new Schema({
    email : String, 
    degree_10th : String,
    board_10th : String,
    percentage_cgpa_format_10th : String,
    percentage_cgpa_value_10th : String,
    year_of_passing_10th : String,
    remarks_10th : String,
    marksheet_10th_url:  String,

    degree_12th : String,
    board_12th : String,
    percentage_cgpa_format_12th : String,
    percentage_cgpa_value_12th : String,
    year_of_passing_12th :  String,
    remarks_12th : String,
    marksheet_12th_url : String,
    
    degree_btech : String,
    college_btech : String,
    branch_btech : String,
    percentage_cgpa_format_btech : String,
    percentage_cgpa_value_btech : String,
    year_of_passing_btech :  String,
    remarks_btech : String,
    marksheet_btech_url : String,

    degree_mtech : String,
    college_mtech : String,
    branch_mtech : String,
    percentage_cgpa_format_mtech : String,
    percentage_cgpa_value_mtech : String,
    year_of_passing_mtech :  String,
    remarks_mtech : String,
    marksheet_mtech_url : String,

    other_remarks : String,
});


module.exports = mongoose.model("academic", academicSchema);