const express = require("express");
const router = express.Router();
const OtherDetail = require("../../model/otherDetailSchema");

// Fetch all resumes for a user
router.get("/fetch-resume/:id", async (req, res) => {
  const { id } = req.params;
  const data = await OtherDetail.findOne({ email: id });
  if (!data) {
    res.json({ status: 200, others : data });
  } else {
    res.json({ status: 501, others : data });
  }
});



// Upload a resume for a user
router.post("/upload-resume/:id", async (req, res) => {
    const {id} = req.params ;
  const {resume} = req.body ;
  console.log(resume);
  try{
    const filter={
        email : id,
    }
    const update = {
        resume_url : resume,
    }
    await OtherDetail.findOneAndUpdate(filter, update);
    res.status(200).send({status : 200, StatusMessage : 'ok'});
  }catch(error){
    console.error(error);
    res.status(500).send('Error uploading resume.');
  }
});

module.exports = router;
