const mongoose = require('mongoose');
const { Schema } = mongoose;

const academicSchema = new Schema({
    email : String,
    board10 : String,
    percentageformat10 : String,
    percentage10 : String,
    year10 : String,
    remarks10 : String,
    marksheet10:  String,

    board12 : String,
    percentageformat12 : String,
    percentage12 : String,
    year12 :  String,
    remarks12 : String,
    marksheet12 : String,

    collegebtech : String,
    branchbtech : String,
    percentageformatbtech : String,
    percentagebtech : String,
    yearbtech :  String,
    remarksbtech : String,
    marksheetbtechurl : String,

    collegemtech : String,
    branchmtech : String,
    percentageformatmtech : String,
    percentagemtech : String,
    yearmtech :  String,
    remarksmtech : String,
    marksheetmtechurl : String,

    isphdcompleted : String,
    phdremarks : String,
});


module.exports = mongoose.model("academic", academicSchema);
