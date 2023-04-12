const express = require("express");
const cors = require("cors");
const session = require("express-session");
const Reference = require("../../model/referenceSchema");

const route = express.Router();
route.use(cors());
route.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

route.post("/references/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reference = new Reference({
      email: id,
      name: req.body.name,
      title : req.body.title,
      affliliation: req.body.affliliation,
      referenceemail: req.body.referenceemail,
      referencephone: req.body.referencephone,
      relationship: req.body.relationship ,
      description: req.body.description ,
    });
    const savedReference = await reference.save();
    res.json(savedReference);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding reference");
  }
});

// Get all experiences
route.get("/references/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reference = await Reference.find({ email: id });
    res.json(reference);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting reference");
  }
});

// Get a single experience by ID
route.get("/references/:id", async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (reference) {
      res.json(reference);
    } else {
      res.status(404).send("Reference not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting Reference");
  }
});

// Update an experience by ID
route.put("/references/:id", async (req, res) => {
  try {
    const reference = await Reference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (reference) {
      res.json(reference);
    } else {
      res.status(404).send("Reference not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating reference");
  }
});

// Delete an experience by ID
route.delete("/references/:id", async (req, res) => {
  try {
    const reference = await Reference.findByIdAndDelete(req.params.id);
    if (reference) {
      res.json(reference);
    } else {
      res.status(404).send("Reference not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting reference");
  }
});

module.exports = route;
