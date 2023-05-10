const express = require("express");
const router = express.Router();
const OtherDetail = require("../../model/otherDetailSchema");

// Fetch all resumes for a user
router.get("/find-resumes/:id", async (req, res) => {
  const { id } = req.params;

  const data = await OtherDetail.findOne({ email: id });
  if (!data) {
    res.json({ status: 200, resume: data });
  } else {
    res.json({ status: 200, resume : data });
  }
});

// Delete a resume for a user
router.post("/delete-resumes/:id/", async (req, res) => {
    const {id} = req.params ;
    try{
      const filter={
          email : id,
      }
      const update = {
          resume_url : '#',
      }
      await OtherDetail.findOneAndUpdate(filter, update);
      res.status(200).send({status : 200, StatusMessage : 'ok'});
    }catch(error){
      console.error(error);
      res.status(500).send('Error uploading resume.');
    }
});

// Upload a resume for a user
router.post("/add-resumes/:id", async (req, res) => {
    const {id} = req.params ;
  const {data} = req.body ;
  console.log(data);
  try{
    const filter={
        email : id,
    }
    const update = {
        resume_url : data,
    }
    await OtherDetail.findOneAndUpdate(filter, update);
    res.status(200).send({status : 200, StatusMessage : 'ok'});
  }catch(error){
    console.error(error);
    res.status(500).send('Error uploading resume.');
  }
});

module.exports = router;
