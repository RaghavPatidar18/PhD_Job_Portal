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

const route = express.Router();
route.use(cors());
route.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

route.post("/resume-upload/:id", upload.single("resume"), async (req, res) => {
  try {
    const {id} = req.params;
    const buffer = req.file.buffer;
    const PDFParserModule = await import("pdf2json");
    const PDFParser = PDFParserModule.default;
    const parser = new PDFParser();
    parser.on("pdfParser_dataReady", async (pdfData) => {
      const text = pdfData.Pages[0].Texts.map((t) => t.R[0].T).join("\n");
      // console.log(text);
      let class10Marks = null;
      let class12Marks = null;
      let class10Start = null;
      let class12Start = null;
      let class10Board = null;
      let class12Board = null;
      const class10regex = /Secondary[\s\n]*CentralBoardofSecondaryEducation[\s\n]*(\d{1,3})%/i;
      const class12regex = /SeniorSecondary[\s\n]*CentralBoardofSecondaryEducation[\s\n]*(\d{1,2}.(\d)*)%/i;
      const class10startregex = /Secondary[\s\n]*CentralBoardofSecondaryEducation[\s\n]*(\d{1,2})%\d\d\n(\d{4})/i;
      const class12startregex = /SeniorSecondary[\s\n]*CentralBoardofSecondaryEducation[\s\n]*(\d{1,2}.(\d)*)%\d\d\n(\d{4})/i;
      const class10boardregex = /Secondary\n(([A-Z]*[a-z]*)*)\n/i;
      const class12boardregex = /SeniorSecondary\n(([A-Z]*[a-z]*)*)\n/i;
      const matchclass10board = text.match(class10boardregex);
      if(matchclass10board){
        class10Board = matchclass10board[1];
      }
      const matchclass12board = text.match(class12boardregex);
      if(matchclass12board){
        class12Board = matchclass12board[1];
      }
      const matchClass10start = text.match(class10startregex);
      if(matchClass10start){
        class10Start = matchClass10start[2];
      }

      const matchClass12start = text.match(class12startregex);
      if(matchClass10start){
        class12Start = matchClass12start[3];
      }
      const matchClass10 = text.match(class10regex);
      if (matchClass10) {
        class10Marks = matchClass10[1];
      }
      // console.log(text);
      const matchClass12 = text.match(class12regex);
      if (matchClass12) {
        class12Marks = matchClass12[1];
      }

      let class10End = Number(class10Start) + 1; 
      let class12End = Number(class12Start) + 1; 
      class10Board= class10Board.replace(/(([A-Z]|([o][f])))/g, ' $1').trim();
      class12Board= class12Board.replace(/(([A-Z]|([o][f])))/g, ' $1').trim();
      console.log("CLASS 10 details : ");
      console.log("   Board : " + class10Board);
      console.log("   Percentage :" + class10Marks);
      console.log("   Start Year : " + class10Start);
      console.log("   End Year : " + class10End + "\n");

      console.log("CLASS 12 details : ");
      console.log("   Board : " + class12Board);
      console.log("   Percentage :" + class12Marks);
      console.log("   Start Year : " + class12Start);
      console.log("   End Year : " + class12End);
      const filter = {email : id};
      const update = {
        board10 : class10Board,
        percentageformat10 :'100',
        percentage10 :class10Marks,
        year10 : class10End,
        remarks10 :'NA',

        board12 :class12Board,
        percentageformat12 :'100',
        percentage12 :class12Marks,
        year12 : class12End ,
        remarks12 :'NA',
      }
      await Academic.findOneAndUpdate(filter, update);
      res.status(200).json(pdfData);
    });
    parser.parseBuffer(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading and parsing resume");
  }
});

module.exports = route;
