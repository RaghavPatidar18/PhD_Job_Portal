const express = require("express");
const cors = require("cors");
const session = require("express-session");
const Academic = require("../../model/academicSchema");

const route = express.Router();
route.use(cors());
route.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

route.get("/academic/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Academic.find({ email: id });
    if (data) {
      res.json({ status: 200, academics: data });
    } else {
      res.json({ status: 200, academics: data });
    }
  } catch (error) {
    console.log("Here" + error);
    res.status(500).send({ status: 500, err: error });
  }
});

route.post("/academic", async (req, res) => {
  try {
    const { formValues, user , isedit1, isedit2, isedit3, isedit4} = req.body;
    const filter = { email: user };
    console.log(formValues);
    var update ;
    if(isedit1){
      update={
        collegemtech :formValues.collegemtech,
        branchmtech :formValues.branchmtech,
        percentageformatmtech :formValues.percentageformatmtech,
        percentagemtech :formValues.percentagemtech,
        yearmtech : formValues.yearmtech ,
        remarksmtech :formValues.remarksmtech,
      }
    }
    if(isedit2){
      update={
        collegebtech :formValues.collegebtech,
        branchbtech :formValues.branchbtech,
        percentageformatbtech :formValues.percentageformatbtech,
        percentagebtech :formValues.percentagebtech,
        yearbtech : formValues.yearbtech ,
        remarksbtech :formValues.remarksbtech,
      }
    }
    if(isedit3){
      update={
        board12 :formValues.board12,
        percentageformat12 :formValues.percentageformat12,
        percentage12 :formValues.percentage12,
        year12 : formValues.year12 ,
        remarks12 :formValues.remarks12,
      }
    }
    if(isedit4){
      update={
        board10 :formValues.board10,
        percentageformat10 :formValues.percentageformat10,
        percentage10 :formValues.percentage10,
        year10 :formValues.year10,
        remarks10 :formValues.remarks10,
      }
    }
  
    await Academic.findOneAndUpdate(filter, update);
    res.status(201).send({status : 200});
  } catch (err) {
    console.log(err);
    res.status(500).send({status : 500, err})
  }
});

module.exports = route;
