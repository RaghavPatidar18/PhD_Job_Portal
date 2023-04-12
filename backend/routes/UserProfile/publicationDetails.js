const express = require("express");
const cors = require("cors");
const session = require("express-session");
const Publication = require("../../model/publicationSchema");

const route = express.Router();
route.use(cors());
route.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

route.post("/publications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const publication = new Publication({
      email : id,
    title : req.body.title,
    authorlist : req.body.authorList,
    abstract : req.body.abstract ,
    journal : req.body.journal ,
    volume : req.body.volume ,
    pages : req.body.pages , 
    publisher : req.body.publisher ,
    doi : req.body.doi , 
    url : req.body.url , 
    });
    const savedPublication = await publication.save();
    res.json(savedPublication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding publication");
  }
});

// Get all experiences
route.get("/publications/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const publication = await Publication.find({ email: id });
    res.json(publication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting publication");
  }
});

// Get a single experience by ID
route.get("/publications/:id", async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (publication) {
      res.json(publication);
    } else {
      res.status(404).send("Publication not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error getting publications");
  }
});

// Update an experience by ID
route.put("/publications/:id", async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (publication) {
      res.json(publication);
    } else {
      res.status(404).send("Publication not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating publication");
  }
});

// Delete an experience by ID
route.delete("/publications/:id", async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id);
    if (publication) {
      res.json(publication);
    } else {
      res.status(404).send("Publication not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting publication");
  }
});

module.exports = route;
