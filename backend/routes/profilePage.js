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

route.post("/resume-upload", upload.single("resume"), async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const PDFParserModule = await import("pdf2json");
    const PDFParser = PDFParserModule.default;
    const parser = new PDFParser();
    parser.on("pdfParser_dataReady", (pdfData) => {
      console.log(pdfData);
      res.status(200).json(pdfData);
    });
    parser.parseBuffer(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading and parsing resume");
  }
});

module.exports = route;
