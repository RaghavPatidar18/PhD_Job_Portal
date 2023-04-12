const express = require("express");
const cors = require("cors");
const session = require("express-session");
const Por = require("../../model/porSchema");

const route = express.Router();
route.use(cors());
route.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

route.post("/por/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const por = new Por({
      email: id,
      title : req.body.title, 
      organization : req.body.organization,
      location : req.body.location,
      startdate : req.body.startdate,
      enddate : req.body.enddate,
      description : req.body.description,
    });
    const savedPor = await por.save();
    res.json(savedPor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding por");
  }
});

// Get all experiences
route.get("/por/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const por = await Por.find({ email: id });
    res.json(por);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting por");
  }
});

// Get a single experience by ID
route.get("/por/:id", async (req, res) => {
  try {
    const por = await Por.findById(req.params.id);
    if (por) {
      res.json(por);
    } else {
      res.status(404).send("Por not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting por's");
  }
});

// Update an experience by ID
route.put("/por/:id", async (req, res) => {
  try {
    const por = await Por.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (por) {
      res.json(por);
    } else {
      res.status(404).send("Por not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating por");
  }
});

// Delete an experience by ID
route.delete("/por/:id", async (req, res) => {
  try {
    const por = await Por.findByIdAndDelete(req.params.id);
    if (por) {
      res.json(por);
    } else {
      res.status(404).send("Por not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting por");
  }
});

module.exports = route;
