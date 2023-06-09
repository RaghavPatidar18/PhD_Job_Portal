const express = require("express");
const cors = require("cors");
const session = require("express-session");
const Personal = require("../../model/personalSchema");

const route = express.Router();
route.use(cors());
route.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

route.get("/personal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Personal.find({ email: id });
    if (data) {
      res.json({ status: 200, personals: data });
    } else {
      res.json({ status: 200, personals: data });
    }
  } catch (error) {
    console.log("Here" + error);
    res.status(500).send({ status: 500, err: error });
  }
});

route.post("/personal", async (req, res) => {
  try {
    const { formValues, user } = req.body;
    const filter = { email: user };
    console.log(formValues);
    const update = {
      name: formValues.name,
      fathername: formValues.fathername,
      age: formValues.age,
      dob: formValues.dob,
      disablity: formValues.disability,
      married: formValues.married,
      nationality: formValues.nationality,
      gender: formValues.gender,
      category: formValues.category,
      // Communication Details
      communication_address: formValues.communication_address,
      communication_city: formValues.communication_city,
      communication_state: formValues.communication_state,
      communication_pincode: formValues.communication_pincode,
      communication_country: formValues.communication_country,

      permanent_address: formValues.permanent_address,
      permanent_city: formValues.permanent_city,
      permanent_state: formValues.permanent_state,
      permanent_pincode: formValues.permanent_pincode,
      permanent_country: formValues.permanent_country,

      mobile: formValues.mobile,
      altmobile: formValues.altmobile,
    };
    await Personal.findOneAndUpdate(filter, update);
    res.status(201).send({status : 200});
  } catch (err) {
    console.log(err);
    res.status(500).send({status : 500, err})
  }
});

module.exports = route;
