const express = require("express");
const router = express.Router();
const OtherDetail = require("../../model/otherDetailSchema");
const { v4: uuidv4 } = require("uuid");

// Fetch all resumes for a user
router.get("/resumes/:id", async (req, res) => {
    const {id} = req.params ;
    try {
    const data = await OtherDetail.findOne({ email: id});
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(data.resume);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Delete a resume for a user
router.delete("/resumes/:user/:id", async (req, res) => {
  try {
    const user = await OtherDetail.findOne({ email: req.params.user });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const newResumes = user.resume.filter((resume1) => {
      return resume1.id !== req.params.id;
    });
    user.resume = newResumes;
    await user.save();
    res.send(user.resume);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Upload a resume for a user
router.post("/resumes/:user", async (req, res) => {
  try {
    const userdata = await OtherDetail.findOne({ email: req.params.user });
    if (!userdata) {
      return res.status(404).send("User not found");
    }
    const newresume = {
      id: uuidv4(),
      name: req.body.name,
      data: req.body.data,
    };
    userdata.resume.push(newresume);
    await user.save();
    res.send(user.resume);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
