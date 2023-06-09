const express = require("express");
const app = express();
const { connect } = require("mongoose");
const mongoose = require("mongoose");
const { urlencoded, json } = require("body-parser");
const models = require("./job.model");
const bodyParser = require("body-parser");
var cors = require("cors");
const nodemailer = require("nodemailer");
const session = require("express-session");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
const authenticate = require("./middleware/authenticate");
const auth = require("./middleware/auth");
const cron = require("node-cron");
const Personal = require("./model/personalSchema");
const Academic = require("./model/academicSchema");
const Publication = require("./model/publicationSchema");
const Reference = require("./model/referenceSchema");
const UserExperience=require("./model/experienceSchema");
const POR = require("./model/porSchema");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.use(cors()); // Use this after the variable declaration
app.use(cookiParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/", require(__dirname + "/routes/UserProfile/resumeParser.js"));
app.use("/", require(__dirname + "/routes/UserProfile/personalDetails.js"));
app.use("/", require(__dirname + "/routes/UserProfile/academicDetails.js"));
app.use("/", require(__dirname + "/routes/UserProfile/experienceDetails.js"));
app.use("/", require(__dirname + "/routes/UserProfile/referenceDetails.js"));
app.use("/", require(__dirname + "/routes/UserProfile/publicationDetails.js"));
app.use("/", require(__dirname + "/routes/UserProfile/porDetails.js"));

const keysecret = "secret";

// databse

mongoose.connect("mongodb://127.0.0.1:27017/db", {
  useNewUrlParser: true,
});

const Job = models.Job;
const User = models.User;
const UserInstitute = models.UserInstitute;
const Comment = models.Comment;
const CommentNew = models.CommentNew;
const Experience = models.Experience;

let personalSchemaobj=Personal.schema.obj;
let academicSchemaobj=Academic.schema.obj;
let experienceSchemaobj=UserExperience.schema.obj;
let porSchemaobj=POR.schema.obj;
let publicationSchemaobj=Publication.schema.obj;
let referenceSchemaobj=Reference.schema.obj;

delete academicSchemaobj.email;
delete experienceSchemaobj.email;
delete porSchemaobj.email;
delete publicationSchemaobj.email;
delete referenceSchemaobj.email;


const applicationSchema = new mongoose.Schema({
  student_id: String,
  job_id: String,
  status: String,
  student_details: {
    personal: personalSchemaobj,
    academic: academicSchemaobj,
    experience: experienceSchemaobj,
    publication: publicationSchemaobj,
    por: porSchemaobj,
    reference: referenceSchemaobj
  },
});
const Application = mongoose.model("application", applicationSchema);
// Getting collections from database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/job-post", (req, res) => {
  //console.log(req.body);
  const { job, id } = req.body;
  console.log(job);
  var obj = {};
  obj = job;
  obj.institute_id = id;
  const postJob = new Job(obj);
  postJob.save((err) => {
    if (err) {
      res.status(500).send({ status: 500, err });
    } else {
      res.status(201).send({ status: 200 });
    }
  });
});

app.get("/", (req, res) => {
  var email = "";
  var userType = "";
  Job.find({}, (err, jobs) => {
    if (err) {
      res.status(500).send({ status: 500, err });
    } else {
      res.status(200).send({
        status: 200,
        jobDetails: jobs,
      });
    }
  });
});

app.get("/job-details/:id/:student_id", async (req, res) => {
  ////console.log(req.userID);
  //console.log("jsgiuf");

  try {
    const { id, student_id } = req.params;
    //console.log(id);
    //console.log(student_id);

    var applied = false;
    ////console.log(id);
    const application = await Application.findOne({
      job_id: id,
      student_id: student_id,
    });
    if (application) {
      //console.log("sbugfiw");
      applied = true;
    } else {
      //console.log("sbfoie");
      applied = false;
    }

    const job = await Job.findOne({ _id: id });
    if (job) {
      //console.log("here at job detaisl");
      //console.log(job);
      res.status(200).json({
        status: 200,
        job: job,
        applied: applied,
      });
    }
  } catch (err) {
    res.status(500).json({ status: 500, err });
  }
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "r.patidar181001.2@gmail.com",
    pass: "lftnzmpgnyibshxl",
  },
});

// Send email with OTP to the user's email address
app.post("/api/sendOtp", async (req, res) => {
  const email = req.body.email;
  const userType = req.body.userType;

  console.log(userType);

  if (userType == "student") {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("i m hetyfiuwbri");
      console.log(user);
      return res
        .status(200)
        .send({ status: 400, message: "User already exists" });
    }
  } else {
    // Check if the user already exists
    const user = await UserInstitute.findOne({ email });
    if (user) {
      return res
        .status(200)
        .send({ status: 400, message: "User already exists" });
    }
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  req.session.otp = otp;
  // Save the OTP to the user's record in the database
  const mailOptions = {
    from: "r.patidar181001.2@gmail.com",
    to: email,
    subject: "OTP for login",
    text: `Your OTP is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      //console.log(error);
      return res.status(200).send({
        status: 500,
        message: "Failed to send OTP",
      });
    } else {
      //console.log("OTP sent: " + info.response);
      return res.status(200).send({
        status: 200,
        message: "OTP sent",
      });
    }
  });
});

// Verify OTP and create new user
app.post("/api/verifyOtp", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const otpEntered = req.body.otp;
  const password = req.body.password;
  const otp = req.session.otp;
  const userType = req.body.userType;

  const hashedPassword = bcrypt.hashSync(password, 1);
  req.session.hashedPassword = hashedPassword;

  //console.log(req.body);
  //console.log("aa gya");

  //console.log(req.body.userType);

  if (otp == otpEntered) {
    if (req.body.userType == "student") {
      //console.log("student hu vai");
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const personals = new Personal({
        email: email,
        name: name,
        fathername: "-",
        dob: "-",
        age: "-",
        category: "-",
        disablity: "-",
        married: "-",
        nationality: "-",
        gender: "-",
        category: "General",
        // Communication Details
        communication_address: "-",
        communication_city: "-",
        communication_state: "-",
        communication_pincode: "-",

        permanent_address: "-",
        permanent_city: "-",
        permanent_state: "-",
        permanent_pincode: "-",
        communication_country: "-",
        permanent_country: "-",
        mobile: "-",
        altmobile: "-",
      });
      const academics = new Academic({
        email: email,
        board10: '-',
        percentageformat10: '-',
        percentage10: '-',
        year10: '-',
        remarks10: '-',
        marksheet10: '-',

        board12: '-',
        percentageformat12: '-',
        percentage12: '-',
        year12: '-',
        remarks12: '-',
        marksheet12: '-',

        collegebtech: '-',
        branchbtech: '-',
        percentageformatbtech: '-',
        percentagebtech: '-',
        yearbtech: '-',
        remarksbtech: '-',
        marksheetbtechurl: '-',

        collegemtech: '-',
        branchmtech: '-',
        percentageformatmtech: '-',
        percentagemtech: '-',
        yearmtech: '-',
        remarksmtech: '-',
        marksheetmtech: '-',

        isphdcompleted: '-',
        phdremarks: '-',
      });
      await academics.save();
      await personals.save();
      await user.save();

      const d=Date.now();
      let date_time=new Date(d);
      let date=date_time.getDate();
      let month=date_time.getMonth();
      let year=date_time.getYear();
      let today=year+"-"+month+"-"+date;
      const experience=new UserExperience({
        email : email,
        profile : "-",
        organization : "-",
        startdate : today,
        enddate : today,
        description : "-",
        location : "-",
      });
      experience.save();

      const publication=new Publication({
        email : email,
        title : '-',
        authorlist : [
            {
                author : '-',
                author_id : '-',
            }
        ],
        abstract : '-',
        journal : '-',
        volume : '-',
        pages : '-',
        publisher : '-',
        doi : '-',
        url : '-',
      });
      publication.save();


      const por=new POR({
        email : email,
        title : '-',
        organization : '-',
        location : '-',
        startdate : today,
        enddate : today,
        description : '-',
      });
      por.save();


      const reference=new Reference({
        email : email,
        name : '-',
        title : '-',
        affliliation : '-',
        referenceemail : '-',
        referencephone : '-',
        relationship : '-',
        description : '-',
      });
      reference.save();



    } else {
      const userInstitute = new UserInstitute({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await userInstitute.save();
    }

    //console.log("bn gya");
    return res.status(200).send({
      status: 200,
      success: true,
      message: "OTP verified successfully",
    });
  } else
    return res.status(200).send({
      status: 400,
      success: false,
      message: "Invalid OTP",
    });
});

app.post("/api/login", async (req, res) => {
  //console.log("idhr aa gya");
  const { email, password, userType } = req.body;
  // //console.log(userType);
  if (userType === "student") {
    const userstudent = await User.findOne({
      email: email,
    });
    // //console.log("login m aa gya");
    //   //console.log(res.data);
    if (!userstudent)
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    const isPasswordValid = bcrypt.compareSync(password, userstudent.password);

    if (!isPasswordValid)
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    else {
      // token generate

      const token = await userstudent.generateAuthToken();

      //console.log(userstudent);

      // cookiegenerate

      res.cookie("usercookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });

      const result = {
        userstudent,
        token,
      };
      // res.status(201).json({status:201,result})

      // //console.log("Logged in huehue");

      res.status(201).json({ status: 201, result });
      // return res.status(200).send({
      //   success: true,
      //   message: "Logged in successfully",
      //   result : result
      // });
    }
  } else {
    const userInstitute = await UserInstitute.findOne({
      email,
    });

    // //console.log("login m aa gya : institute");
    // //console.log(userInstitute);
    //   //console.log(res.data);
    if (!userInstitute)
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    const isPasswordValid = bcrypt.compareSync(
      password,
      userInstitute.password
    );

    if (!isPasswordValid)
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    else {
      // token generate

      const token = await userInstitute.generateAuthToken();

      // //console.log(userInstitute);

      // cookiegenerate

      res.cookie("usercookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });

      const result = {
        userInstitute,
        token,
      };
      // res.status(201).json({status:201,result})

      // //console.log("Logged in huehue");

      res.status(201).json({ status: 201, result });
      // return res.status(200).send({
      //   success: true,
      //   message: "Logged in successfully",
      //   result : result
      // });
    }
  }
});


passport.use(
  new GoogleStrategy(
    {
      clientID: '82066739900-rqo1gjofhmv4lqarkt82sr30nm8383pb.apps.googleusercontent.com', // Replace with your Google client ID
      clientSecret: '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', // Replace with your Google client secret
      callbackURL: '/auth/google/callback', // Replace with your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      // Use the profile information to create or authenticate a user in your application
      // You can access the user's information from the profile object
      const { id, displayName, emails } = profile;
      // Example: You can save the user's information in your database and call done() to complete the authentication process
      // Replace this with your actual logic for creating or authenticating a user
      const user = await User.findOne({ googleId: id });
      if (user) {
        return done(null, user);
      } else {
        const newUser = new User({
          googleId: id,
          displayName: displayName,
          email: emails[0].value,
        });
        await newUser.save();
        return done(null, newUser);
      }
    }
  )
);


// Initialize Passport
app.use(passport.initialize());

// Route for starting the Google authentication process
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for handling the Google authentication callback
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Redirect to the appropriate page after successful authentication
  res.redirect('/dashboard'); // Replace with your appropriate redirect URL
});




// user valid
app.get("/validuser", authenticate, async (req, res) => {
  //console.log("done");
  try {
    let ValidUserOne = await User.findOne({ _id: req.userId });
    if (!ValidUserOne) {
      ValidUserOne = await UserInstitute.findOne({ _id: req.userId });
      if (ValidUserOne) {
        res
          .status(201)
          .json({ status: 201, ValidUserOne, userType: "institute" });
      }
    } else {
      res.status(201).json({ status: 201, ValidUserOne, userType: "student" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// send email Link For reset Password
app.post("/api/sendpasswordlink", async (req, res) => {
  //console.log(req.body)

  const { email, userType } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    if (userType == "student") {
      const userfind = await User.findOne({ email: email });

      // token generate for reset password
      const token = jwt.sign({ _id: userfind._id }, keysecret, {
        expiresIn: "120s",
      });

      const setusertoken = await User.findByIdAndUpdate(
        { _id: userfind._id },
        { verifytoken: token },
        { new: true }
      );
      if (setusertoken) {
        const mailOptions = {
          from: "r.patidar181001.2@gmail.com",
          to: email,
          subject: "Sending Email For password Reset",
          text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}/${userType}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            //console.log("error",error);
            res.status(401).json({ status: 401, message: "email not send" });
          } else {
            //console.log("Email sent",info.response);
            res
              .status(201)
              .json({ status: 201, message: "Email sent Succsfully" });
          }
        });
      }
    } else {
      const userfind = await UserInstitute.findOne({ email: email });

      // token generate for reset password
      const token = jwt.sign({ _id: userfind._id }, keysecret, {
        expiresIn: "120s",
      });

      const setusertoken = await UserInstitute.findByIdAndUpdate(
        { _id: userfind._id },
        { verifytoken: token },
        { new: true }
      );
      if (setusertoken) {
        const mailOptions = {
          from: "r.patidar181001.2@gmail.com",
          to: email,
          subject: "Sending Email For password Reset",
          text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}/${userType}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            //console.log("error",error);
            res.status(401).json({ status: 401, message: "email not send" });
          } else {
            //console.log("Email sent",info.response);
            res
              .status(201)
              .json({ status: 201, message: "Email sent Succsfully" });
          }
        });
      }
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
});

// verify user for forgot password time
app.get("/forgotpassword/:id/:token/:usertype", async (req, res) => {
  const { id, token, usertype } = req.params;

  //console.log(usertype);
  //console.log("link ke baad ka get pe hu");

  try {
    if (usertype == "student") {
      //console.log("student hu omk ?");

      const validuser = await User.findOne({ _id: id, verifytoken: token });

      const verifyToken = jwt.verify(token, keysecret);

      //console.log(verifyToken)

      if (validuser && verifyToken._id) {
        res.status(201).json({ status: 201, validuser });
      } else {
        res.status(401).json({ status: 401, message: "user not exist" });
      }
    } else {
      const validuser = await UserInstitute.findOne({
        _id: id,
        verifytoken: token,
      });

      const verifyToken = jwt.verify(token, keysecret);

      //console.log(verifyToken)

      if (validuser && verifyToken._id) {
        res.status(201).json({ status: 201, validuser });
      } else {
        res.status(401).json({ status: 401, message: "user not exist" });
      }
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// change password

app.post("/api/:id/:token/:usertype", async (req, res) => {
  const { id, token, usertype } = req.params;

  const { password } = req.body;

  try {
    if (usertype == "student") {
      //console.log("student after password reset");
      const validuser = await User.findOne({ _id: id, verifytoken: token });

      const verifyToken = jwt.verify(token, keysecret);

      if (validuser && verifyToken._id) {
        const newpassword = await bcrypt.hash(password, 1);

        const setnewuserpass = await User.findByIdAndUpdate(
          { _id: id },
          { password: newpassword }
        );

        setnewuserpass.save();
        res.status(201).json({ status: 201, setnewuserpass });
      } else {
        res.status(401).json({ status: 401, message: "user not exist" });
      }
    } else {
      const validuser = await UserInstitute.findOne({
        _id: id,
        verifytoken: token,
      });

      const verifyToken = jwt.verify(token, keysecret);

      if (validuser && verifyToken._id) {
        const newpassword = await bcrypt.hash(password, 1);

        const setnewuserpass = await UserInstitute.findByIdAndUpdate(
          { _id: id },
          { password: newpassword }
        );

        setnewuserpass.save();
        res.status(201).json({ status: 201, setnewuserpass });
      } else {
        res.status(401).json({ status: 401, message: "user not exist" });
      }
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

app.get("/logout", authenticate, async (req, res) => {
  //console.log("sjbfouwbgro");
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    //console.log("logout me aa rha");

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    //console.log("save ho rha");
    ////console.log(rootUser);

    res.status(201).json({ status: 201 });
  } catch (error) {
    // res.status(401).json({status:401,error})
  }
});

app.post("/apply", async (req, res) => {
  //console.log("here at apply");
  const id = req.body.id;
  const student_id = req.body.student_id;

  const newApplication = new Application({
    student_id: student_id,
    job_id: id,
    status: "Pending",
  });
  const success = await newApplication.save();
  if (success) {
    res.status(200).send({ status: 200 });
  } else {
    res.status(500).send({ status: 500 });
  }
});

app.get("/jobStatus/:id", async (req, res) => {
  const { id } = req.params;
  ////console.log("here at job status");
  try {
    const student_applications = await Application.find({ student_id: id });
    //console.log(student_applications);
    Promise.all(
      student_applications.map(async (application) => {
        const job = await Job.findOne({ _id: application.job_id });
        let obj = {};
        obj.job_id = await job._id;
        obj.title = await job.title;
        obj.college = await job.college;
        obj.location=await job.location;
        obj.salary=await job.salary;
        obj.application_status = await application.status;
        return obj;
      })
    ).then((applicationArray) => {
      res.status(200).send({ status: 200, applicationArray });
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({ status: 500, err });
  }
});

app.get("/jobPostings/:id", async (req, res) => {
  ////console.log("here at job postings");
  try {
    const { id } = req.params;
    const jobs = await Job.find({ institute_id: id });
    Promise.all(
      jobs.map(async (job) => {
        let obj = {};
        obj.title = await job.title;
        obj._id = await job._id;
        obj.createdAt= await job.createdAt;
        return obj;
      })
    ).then((jobArray) => {
      res.status(200).send({ status: 200, jobArray });
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({ status: 500, err });
  }
});

app.get("/jobApplicants/:id", async (req, res) => {
  ////console.log("here at job applicants");
  try {
    //console.log("yolo");
    const { id } = req.params;
    //console.log(id);
    const applications = await Application.find({ job_id: id });
    //console.log(applications);
    Promise.all(
      applications.map(async (application) => {
        const student = await User.findOne({ _id: application.student_id });
        //const job=await Job.findOne({_id:id});
        let obj = {};
        if (student) {
          obj.application_id = await application._id;
          obj.student_name = await application.student_details.personal.name;
          obj.student_email=await application.student_details.personal.email;
          obj.student_id = await student._id;
          obj.status = await application.status;
        }
        return obj;
      })
    ).then((applicantArray) => {
      res.status(200).send({ status: 200, applicantArray });
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({ status: 500, error });
  }
});

app.post("/jobApplicantStatusChange", async (req, res) => {
  try {
    const { application_id, newStatus } = req.body;
    //console.log("here at status change");
    //console.log(application_id);
    //console.log(newStatus);
    const application = await Application.updateOne(
      { _id: application_id },
      { $set: { status: newStatus } }
    );
    res.send("success");
  } catch (err) {
    //console.log(err);
    res.send(err);
  }
});

// getting self email ID

app.get("/api/me", auth, async (req, res) => {
  const { _id } = req.user;

  try {
    let user = await User.findById(_id);
    if (!user) {
      user = await UserInstitute.findById(_id);
      // return res.status(404).json({ error: 'User not found' });
    }
    res.json({ email: user.email });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// getting self name

app.get("/api/mename", auth, async (req, res) => {
  const { _id } = req.user;
console.log("inside mename");
  try {
    let user = await User.findById(_id);
    if (!user) {
      user = await UserInstitute.findById(_id);
      // return res.status(404).json({ error: 'User not found' });
    }
    console.log(user.name);
    res.json({ name : user.name });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;
  //console.log(email);
  User.findOneAndUpdate(
    { email },
    { subscribedToJobAlerts: true },
    { upsert: true, new: true },
    (error, user) => {
      if (error) res.status(400).send(error);
      else res.status(200).send(user);
    }
  );
});

// for subscribtion and email notification

const lastCheckTime = new Date();

function sendJobNotification(job) {
  User.find({ subscribedToJobAlerts: true }).exec((error, users) => {
    if (error) console.error(error);
    else {
      const emailAddresses = users.map((user) => user.email);
      const mailOptions = {
        from: "noreply@example.com",
        to: emailAddresses,
        subject: `New job posted: ${job.title}`,
        text: `A new job has been posted in ${job.location}.`,
        html: `<p>A new job has been posted in ${job.location}.</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          //console.error(error);
        } else {
          //console.log('Email sent: ' + info.response);
        }
      });
    }
  });
}

let emailSent = false;

function checkForNewJobs() {
  if (emailSent) return; // stop checking if email has already been sent

  Job.find({ createdAt: { $gt: lastCheckTime } })
    .sort({ createdAt: "desc" })
    .exec((error, jobs) => {
      if (error) console.error(error);
      else {
        if (jobs.length > 0) {
          var i = 0;
          for (i = 0; i < jobs.length; i++) {
            sendJobNotification(jobs[i]);
          }
          emailSent = true; // set emailSent flag to true
        }
      }
    });

  lastCheckTime = new Date(); // update lastCheckTime to current time
}

cron.schedule("* * * * *", checkForNewJobs); // run every minute

app.get("/application-form/:job_id/:user_id", async (req, res) => {
  console.log("right herefyviubriu");
  const { job_id, user_id } = req.params;
  const job = await Job.findOne({ _id: job_id });
  console.log(job);
  const user = await User.findOne({ _id: user_id });
  console.log(user);
  if (job && user) {
    const academic = await Academic.findOne({ email: user.email });
    const experience = await UserExperience.findOne({ email: user.email });
    const personal = await Personal.findOne({ email: user.email });
    const publication = await Publication.findOne({ email: user.email });
    const por = await POR.findOne({ email: user.email });
    const reference = await Reference.findOne({ email: user.email });

    let obj = {};
    if (academic && experience && personal && publication) {
      console.log("brgi");
      obj.personal = personal;
      obj.academic = academic;
      obj.experience = experience;
      obj.publication = publication;
      obj.por=por;
      obj.reference=reference;
      obj.jobFields = job.fields;
      console.log(obj);
      res.json({ status: 200, dataObject: obj });
    } else {
      res.json({ status: 500 });
    }
  } else {
    res.json({ status: 500 });
  }
});

app.post("/application-form/:job_id/:user_id", async (req, res) => {
  console.log("posting at application form");
  const { job_id, user_id } = req.params;
  const { jobFields } = req.body;
  const obj = {};
  obj.personal = jobFields.personal;
  obj.academic = jobFields.academic;
  obj.experience = jobFields.experience;
  obj.publication = jobFields.publication;
  obj.por = jobFields.por;
  obj.reference = jobFields.reference;

  console.log("the created obj is");
  console.log(obj);

  const new_application = new Application({
    student_id: user_id,
    job_id: job_id,
    status: "Pending",
    student_details: obj,
  });
  const saved = await new_application.save();
  if (saved) {
    console.log("done");
    res.send({ status: 200 });
  } else {
    res.send({ status: 500 });
  }
});

app.get("/applicant-details/:id", async (req, res) => {
  console.log(Application.schema.obj);
  const { id } = req.params;
  const application = await Application.findOne({ _id: id });
  if (application) {
    const job_id = application.job_id;
    const job = await Job.findOne({ _id: job_id });
    if (job) {
      console.log(application.student_details);
      let obj = {};
      obj.fields = job.fields;
      obj.student_details = application.student_details;
      obj.institute_id = job.institute_id;
      res.send({ status: 200, details: obj });
    } else {
      res.send({ status: 500 });
    }
  } else {
    res.send({ status: 500 });
  }
});


// POST /api/comments
app.post('/api/comments', async (req, res) => {

  console.log("inside backend after submit");

  const { text, user, jobPosting } = req.body;
  // console.log(text);
  // console.log(user);
  // console.log(jobPosting);
  const comment = new Comment({ text, user, jobPosting });
  // console.log("1");

  try {
    const savedComment = await comment.save();
    // console.log("2");
    res.json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/comments?jobPostingId=<jobPostingId>
app.get('/api/getcomments', async (req, res) => {
  const { jobPostingId } = req.query;
  console.log("3");
  try {
    const comments = await Comment.find({ jobPosting: jobPostingId }).populate('user');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get me ID

app.get('/api/meid', auth, async (req, res) => {
  const { _id } = req.user;

  res.json({ _id });

  // try {
  //   let user = await User.findById(_id);
  //   if (!user) {
  //     user = await UserInstitute.findById(_id);
  //     // return res.status(404).json({ error: 'User not found' });
  //   }
  //   res.json({ email: user.email });
  // } catch (error) {
  //   //console.error(error);
  //   res.status(500).json({ error: 'Server error' });
  // }
});

// Get all experiences
app.get('/api/getexperiences', async (req, res) => {
  const experiences = await Experience.find().populate('comments');
  res.json(experiences);
});

// Create a new experience
app.post('/api/createExperiences', async (req, res) => {
  const experience = new Experience(req.body);
  await experience.save();
  res.json(experience);
});

// Add a comment to an experience
// app.post("/api/addcomments/:id", async (req, res) => {
//   console.log("inside api");
//   console.log(req.body);
//   const experience = await Experience.findById(req.params.id);
//   const commentnew = new CommentNew({
//     experience: experience._id,
//     comment: req.body.comment,
//   });
//   await commentnew.save();
//   experience.comments.push(commentnew);
//   await experience.save();

//   console.log("all done");

//   res.json(commentnew);
// });

// Add a comment to an experience
app.post("/api/addcomments/:id", async (req, res) => {
  // console.log("inside api");
  // console.log(req.body);
  const experience = await Experience.findById(req.params.id);
  const commentnew = new CommentNew({
    experience: experience._id,
    comment: req.body.comment,
    user: req.body.email, // assuming user's email is sent in the request body
  });
  await commentnew.save();
  experience.comments.push(commentnew);
  await experience.save();

  console.log("all done");

  res.json({
    comment: commentnew.comment,
    user: commentnew.user,
    createdAt: commentnew.createdAt,
  });
});


// Update an experience
app.put('/api/experiences/:id', async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(experience);
});

// get comments
// app.get('/api/experiences', async (req, res) => {
//   try {
//     console.log("inside get comment api");
//     const experience = await Experience.findById(req.params.id);
//     if (!experience) {
//       return res.status(404).json({ message: 'Experience not found' });
//     }
//     const comments = experience.comments;
//     res.json(comments);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Get all comments for an experience
app.get('/api/getcomments/:id', async (req, res) => {
  try {
    const comments = await CommentNew.find({ experience: req.params.id })
      .populate('experience', 'companyName')
      .select('comment user createdAt');
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});





app.get("/custom-form-fields",(req,res)=> {
  const academicKeys=Object.keys(academicSchemaobj)
  const experienceKeys= Object.keys(experienceSchemaobj)
  const porKeys=Object.keys(porSchemaobj)
  const publicationKeys=Object.keys(publicationSchemaobj)
  const referenceKeys=Object.keys(referenceSchemaobj)
  const personalKeys=Object.keys(personalSchemaobj)
  console.log(personalKeys);
  const obj={};
  obj.academicKeys=academicKeys;
  obj.experienceKeys=experienceKeys;
  obj.porKeys=porKeys;
  obj.publicationKeys=publicationKeys;
  obj.referenceKeys=referenceKeys;
  obj.personalKeys=personalKeys;


  const personalData={};
  personalKeys.map( k => {
    personalData[k]=false;
  });
  personalData["name"]=true;

  const academicData={};
  academicKeys.map( k => {
    academicData[k]=false;
  });

  const experienceData={};
  experienceKeys.map( k => {
    experienceData[k]=false;
  });

  const porData={};
  porKeys.map( k => {
    porData[k]=false;
  });

  const referenceData={};
  referenceKeys.map( k => {
    referenceData[k]=false;
  });

  const publicationData={};
  publicationKeys.map( k => {
    publicationData[k]=false;
  });





  res.send({status:200,obj:obj,personalData,academicData,experienceData,porData,referenceData,publicationData});

})

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
