const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const { json } = require("body-parser");
const { Router } = require("express");
const JWT_SECRET = "randomsecret";
const jwt = require("jsonwebtoken");
const ResumeParser = require("resume-parser");
const Academic = require('../../model/academicSchema')
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { createWorker } = require("tesseract.js");
const Personal = require('../../model/personalSchema');


const route = express.Router();
route.use(cors());
route.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

route.get("/personal/:id", async(req, res)=>{
    try{
        const {id} = req.params ;
        const data = await Personal.find({email : id});
        if(data){
            res.json({status : 200, personals : data});
        }else{
            res.json({status : 200, personals : data});
        }
    }catch(error){
        console.log("Here" + error);
        res.status(500).send({status : 500, err : error});
    } 
})
module.exports = route;
