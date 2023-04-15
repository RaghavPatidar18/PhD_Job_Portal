const express = require("express");
const cors = require("cors");
const session = require("express-session");
const Experience = require("../../model/experienceSchema");

const route = express.Router();
route.use(cors());
route.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

route.post("/experiences/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const experience = new Experience({
      email: id,
      profile: req.body.profile,
      organization: req.body.organization,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      description: req.body.description,
      location: req.body.location,
    });
    const savedExperience = await experience.save();
    res.json(savedExperience);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding experience");
  }
});

// Get all experiences
route.get("/experiences/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const experiences = await Experience.find({ email: id });
    res.json(experiences);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting experiences");
  }
});

// Get a single experience by ID
route.get("/experiences/:id", async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      res.json(experience);
    } else {
      res.status(404).send("Experience not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting experience");
  }
});

// Update an experience by ID
route.put("/experiences/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (experience) {
      res.json(experience);
    } else {
      res.status(404).send("Experience not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating experience");
  }
});

// Delete an experience by ID
route.delete("/experiences/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (experience) {
      res.json(experience);
    } else {
      res.status(404).send("Experience not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting experience");
  }
});

module.exports = route;
