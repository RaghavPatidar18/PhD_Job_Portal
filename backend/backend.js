const express = require('express');
const app = express();
const { connect } = require('mongoose');
const mongoose = require("mongoose");
const { urlencoded, json } = require('body-parser');
const models = require('./job.model');
const bodyParser = require("body-parser");
var cors = require('cors');
const nodemailer = require("nodemailer");
const session = require("express-session");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
const authenticate = require("../middleware/authenticate");
const auth = require("../middleware/auth");
const cron = require('node-cron');

app.use(cors()) ;// Use this after the variable declaration
app.use(cookiParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));

const keysecret = "secret";


// databse


mongoose.connect("mongodb://127.0.0.1:27017/new_jobs", {
  useNewUrlParser: true
});



const Job = models.Job;
const User = models.User;
const UserInstitute = models.UserInstitute;


const applicationSchema = new mongoose.Schema({
  student_id: String,
  job_id: String,
  status: String
});
const Application = mongoose.model("application", applicationSchema);
// Getting collections from database
const Academic = require("./model/academicSchema");
const Experience = require("./model/experienceSchema");
const OtherDetail = require("./model/personalSchema");
const Personal = require("./model/personalSchema");
const Por = require("./model/porSchema");
const Publication = require("./model/publicationSchema");
const Reference = require("./model/referenceSchema");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/job-post', (req, res) => {
    console.log(req.body);
    const {job,id}=req.body;
    var obj={};
    obj=job;
    obj.institute_id=id;
  const postJob = new Job(obj);
  postJob.save((err) => {
    if (err) {
      res.status(500).send({status:500,err});
    } else {
      res.status(201).send({status:200});
    }
  });
});

app.get('/', (req, res) => {
  var email="";
  var userType="";
  Job.find({}, (err, jobs) => {
    if (err) {
      res.status(500).send({status:500,err});
    } else {
      res.status(200).send({
        status:200,
        jobDetails: jobs,
      });
    }
  });
});

app.get('/job-details/:id/:student_id', async(req,res) => {
  //console.log(req.userID);
  console.log("jsgiuf");

  try{
    const {id,student_id}=req.params;
    console.log(id);
    console.log(student_id);

    var applied=false;
    //console.log(id);
    const application=await Application.findOne({job_id:id, student_id:student_id});
    if(application){
      console.log("sbugfiw");
      applied=true;
    }else{
      console.log("sbfoie");
      applied=false;
    }

    const job=await Job.findOne({_id:id});
    if(job){
      console.log("here at job detaisl");
      console.log(job);
      res.status(200).json({
        status:200,
        job:job,
        applied: applied
      });
    }
  }catch(err){
    res.status(500).json({status:500,err});
  }

})


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

  if(userType=="student")
  {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("i m hetyfiuwbri");
      return res.status(200).send({status:400, message: "User already exists" });
    }
  }
  else
  {
    // Check if the user already exists
    const user = await UserInstitute.findOne({ email });
    if (user) {
      return res.status(200).send({status:400, message: "User already exists" });
    }
  }


  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  req.session.otp = otp;
  // Save the OTP to the user's record in the database
  const mailOptions = {
    from: "r.patidar181001.2@gmail.com",
    to: email,
    subject: "OTP for login",
    text: `Your OTP is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(200).send({
        status:500,
        message: "Failed to send OTP"
      });
    } else {
      console.log("OTP sent: " + info.response);
      return res.status(200).send({
        status:200,
        message: "OTP sent"
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

  console.log(req.body);
  console.log("aa gya");

  console.log(req.body.userType);

  if(otp==otpEntered)
    {
      if(req.body.userType=="student"){

        console.log("student hu vai");
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword
        });
        await user.save();
        const personal = new Personal({
          email: email,
          name: name,
          age: null,
          gender: "",
          category: "",
          permanentAddress: "",
          currentAddress: "",
        });
        await personal.save();
      }
      else
      {
        const userInstitute = new UserInstitute({
          name: name,
          email: email,
          password: hashedPassword
        });
        await userInstitute.save();
      }

      console.log("bn gya");
      return res.status(200).send({
        status:200,
        success: true,
        message: "OTP verified successfully"
      });
    }
    else return res.status(200).send({
      status:400,
      success: false,
      message: "Invalid OTP"
    });
});

app.post("/api/login", async (req, res) => {

  console.log("idhr aa gya");
  const {
    email,
    password,
    userType
  } = req.body;
  // console.log(userType);
  if(userType==="student")
  {
    const userstudent = await User.findOne({
      email : email
    });
    // console.log("login m aa gya");
  //   console.log(res.data);
    if (!userstudent) return res.status(400).send({
      success: false,
      message: "Invalid Email or Password"
    });
    const isPasswordValid = bcrypt.compareSync(password, userstudent.password);

    if (!isPasswordValid) return res.status(400).send({
      success: false,
      message: "Invalid Email or Password"
    });
    else
    {

      // token generate

      const token = await userstudent.generateAuthToken();

      console.log(userstudent);


      // cookiegenerate

      res.cookie("usercookie",token,{
        expires:new Date(Date.now()+9000000),
        httpOnly:true
    });

    const result = {
      userstudent,
        token
    }
    // res.status(201).json({status:201,result})


      // console.log("Logged in huehue");

      res.status(201).json({status:201,result})
      // return res.status(200).send({
      //   success: true,
      //   message: "Logged in successfully",
      //   result : result
      // });
    }
  }
  else
  {
    const userInstitute = await UserInstitute.findOne({
      email
    });

    // console.log("login m aa gya : institute");
    // console.log(userInstitute);
  //   console.log(res.data);
    if (!userInstitute) return res.status(400).send({
      success: false,
      message: "Invalid Email or Password"
    });
    const isPasswordValid = bcrypt.compareSync(password, userInstitute.password);

    if (!isPasswordValid) return res.status(400).send({
      success: false,
      message: "Invalid Email or Password"
    });
    else
    {
      // token generate

      const token = await userInstitute.generateAuthToken();

      // console.log(userInstitute);


      // cookiegenerate

      res.cookie("usercookie",token,{
        expires:new Date(Date.now()+9000000),
        httpOnly:true
    });

    const result = {
      userInstitute,
        token
    }
    // res.status(201).json({status:201,result})


      // console.log("Logged in huehue");

      res.status(201).json({status:201,result})
      // return res.status(200).send({
      //   success: true,
      //   message: "Logged in successfully",
      //   result : result
      // });
    }
  }

});

// user valid
app.get("/validuser",authenticate,async(req,res)=>{
  console.log("done");
    try {

    let ValidUserOne = await User.findOne({_id:req.userId});
    if(!ValidUserOne)
    {
      ValidUserOne = await UserInstitute.findOne({_id:req.userId});
      if(ValidUserOne){
        res.status(201).json({status:201,ValidUserOne,userType:"institute"});
      }
    }else{
      res.status(201).json({status:201,ValidUserOne,userType:"student"});
    }

  } catch (error) {
      res.status(401).json({status:401,error});
  }
});


// send email Link For reset Password
app.post("/api/sendpasswordlink",async(req,res)=>{
  console.log(req.body)

  const {email , userType } = req.body;

  if(!email){
      res.status(401).json({status:401,message:"Enter Your Email"})
  }

  try {

    if(userType=="student")
    {
      const userfind = await User.findOne({email:email});

      // token generate for reset password
      const token = jwt.sign({_id:userfind._id},keysecret,{
          expiresIn:"120s"
      });

      const setusertoken = await User.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
      if(setusertoken){
        const mailOptions = {
            from:"r.patidar181001.2@gmail.com",
            to:email,
            subject:"Sending Email For password Reset",
            text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}/${userType}`
        }

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("error",error);
                res.status(401).json({status:401,message:"email not send"})
            }else{
                console.log("Email sent",info.response);
                res.status(201).json({status:201,message:"Email sent Succsfully"})
            }
        })

    }
    }
    else
    {

      const userfind = await UserInstitute.findOne({email:email});

      // token generate for reset password
      const token = jwt.sign({_id:userfind._id},keysecret,{
          expiresIn:"120s"
      });

      const setusertoken = await UserInstitute.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
      if(setusertoken){
        const mailOptions = {
            from:"r.patidar181001.2@gmail.com",
            to:email,
            subject:"Sending Email For password Reset",
            text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}/${userType}`
        }

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("error",error);
                res.status(401).json({status:401,message:"email not send"})
            }else{
                console.log("Email sent",info.response);
                res.status(201).json({status:201,message:"Email sent Succsfully"})
            }
        })

    }
    }


  } catch (error) {
      res.status(401).json({status:401,message:"invalid user"})
  }

});


// verify user for forgot password time
app.get("/forgotpassword/:id/:token/:usertype",async(req,res)=>{
  const {id,token,usertype} = req.params;

  console.log(usertype);
  console.log("link ke baad ka get pe hu");


  try {

    if(usertype=="student")
    {

      console.log("student hu omk ?");

      const validuser = await User.findOne({_id:id,verifytoken:token});

      const verifyToken = jwt.verify(token,keysecret);

      console.log(verifyToken)

      if(validuser && verifyToken._id){
          res.status(201).json({status:201,validuser})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }
    }
    else
    {
      const validuser = await UserInstitute.findOne({_id:id,verifytoken:token});

      const verifyToken = jwt.verify(token,keysecret);

      console.log(verifyToken)

      if(validuser && verifyToken._id){
          res.status(201).json({status:201,validuser})
      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

    }

  } catch (error) {
      res.status(401).json({status:401,error})
  }
});


// change password

app.post("/api/:id/:token/:usertype",async(req,res)=>{
  const {id,token,usertype} = req.params;

  const {password} = req.body;

  try {
    if(usertype=="student")
    {
      console.log("student after password reset");
      const validuser = await User.findOne({_id:id,verifytoken:token});

      const verifyToken = jwt.verify(token,keysecret);

      if(validuser && verifyToken._id){
          const newpassword = await bcrypt.hash(password,1);

          const setnewuserpass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

    }
    else
    {
      const validuser = await UserInstitute.findOne({_id:id,verifytoken:token});

      const verifyToken = jwt.verify(token,keysecret);

      if(validuser && verifyToken._id){
          const newpassword = await bcrypt.hash(password,1);

          const setnewuserpass = await UserInstitute.findByIdAndUpdate({_id:id},{password:newpassword});

          setnewuserpass.save();
          res.status(201).json({status:201,setnewuserpass})

      }else{
          res.status(401).json({status:401,message:"user not exist"})
      }

    }
  } catch (error) {
      res.status(401).json({status:401,error})
  }
})


app.get("/logout",authenticate,async(req,res)=>{
  console.log("sjbfouwbgro");
  try {
      req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
          return curelem.token !== req.token
      });

      console.log("logout me aa rha");

      res.clearCookie("usercookie",{path:"/"});


      req.rootUser.save();

      console.log("save ho rha");
      //console.log(rootUser);


      res.status(201).json({status:201})

  } catch (error) {
      // res.status(401).json({status:401,error})
  }
})


app.post("/apply", async(req,res) => {
  console.log("here at apply");
  const id=req.body.id;
  const student_id=req.body.student_id;

  const newApplication=new Application({
    student_id: student_id,
    job_id:id,
    status: "Pending"
  });
  const success=await newApplication.save();
  if(success){
    res.status(200).send({status:200});
  }else{
    res.status(500).send({status:500});
  }
})


app.get("/jobStatus/:id", async(req,res) => {
  const {id}=req.params;
  //console.log("here at job status");
  try{

    const student_applications=await Application.find({student_id:id});
    console.log(student_applications);
    Promise.all(student_applications.map(async(application) => {
      const job=await Job.findOne({_id:application.job_id});
      let obj={};
      obj.job_id=await job._id;
      obj.title=await job.title;
      obj.college=await job.college;
      obj.application_status=await application.status;
      return obj;
    })).then(applicationArray => {
      res.status(200).send({status:200,applicationArray});
    })
  }catch(error){
    console.log(error);
    res.status(500).send({status:500,err});
  }
})




app.get("/jobPostings/:id", async(req,res) => {
  //console.log("here at job postings");
  try{
    const {id}=req.params;
    const jobs=await Job.find({institute_id:id});
    Promise.all(jobs.map(async(job) => {
      let obj={};
      obj.title=await job.title;
      obj._id=await job._id;
      return obj;
    })).then(jobArray => {
      res.status(200).send({status:200,jobArray});
    })
  }catch(error){
    console.log(error);
    res.status(500).send({status:500,err});
  }
})

app.get("/jobApplicants/:id", async(req,res) => {
  //console.log("here at job applicants");
  try{
    console.log("yolo");
    const {id}=req.params;
    console.log(id);
    const applications=await Application.find({job_id:id});
    console.log(applications);
    Promise.all(applications.map(async(application) => {
      const student=await User.findOne({_id: application.student_id});
      let obj={};
      if(student){
        obj.application_id=await application._id;
        obj.student_name=await student.name;
        obj.student_id=await student._id;
        obj.status=await application.status;
      }
      return obj;
    })).then(applicantArray => {
      res.status(200).send({status:200,applicantArray});
    })
  }catch(error){
    console.log(error);
    res.status(500).send({status:500,error});
  }
})

app.post("/jobApplicantStatusChange", async(req,res)=> {
  try{
    const {application_id,newStatus}=req.body;
    console.log("here at status change");
    console.log(application_id);
    console.log(newStatus);
    const application=await Application.updateOne({_id:application_id}, {$set:{status:newStatus}});
    res.send("success");
  }catch(err){
    console.log(err);
    res.send(err);
  }
})

app.post("/personal/:email/:userType", async(req, res) => {
  //var email = "";
  console.log("here at personal post");
  var {email,userType}=req.params;


  // }
  const filter = { email: email };
  const update = {
    age: req.body.age,
    gender: req.body.gender,
    permanentAddress: req.body.permanentAddress,
    currentAddress: req.body.currentAddress,
    category : req.body.category,
  };
  await Personal.findOneAndUpdate(filter, update);

});

app.get("/personal/:email/:userType", (req, res) => {
  // var email = "";
  // var userType = "";
  var {email,userType}=req.params;
  console.log('Idhar aaya');

  if (email == null) {
    return res.status(400).send({
      name: "Default",
        age: null,
        gender: "",
        category: "",
        permanentAddress: "",
        currentAddress: "",
    })
  }

  Personal.findOne({ email : email }, (err, personals) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('Idhar aaya2');
      //console.log("Name : "+ personals.name);
      return res.status(201).send({
        personals
      });
    }
  });
});

app.get("/academic", (req, res) => {
  var email = "";
  var userType = "";
  console.log('Idhar aaya');
  console.log("Yha pe h" + session.email);
  if (session.email == null) {
    return res.status(400).send({
      name: "Default",
        age: null,
        gender: "",
        category: "",
        permanentAddress: "",
        currentAddress: "",
    })
  }
  email = session.email ;
  Personal.find({ email : email }, (err, personals) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('Idhar aaya2');
      console.log("Name : "+ personals[0].name);
      return res.status(201).send({
        name: personals[0].name,
        age: personals[0].age,
        gender: personals[0].gender,
        category: personals[0].category,
        permanentAddress: personals[0].permanentAddress,
        currentAddress: personals[0].currentAddress,
      });
    }
  });
});


// getting self email ID

app.get('/api/me', auth, async (req, res) => {
  const { _id } = req.user;

  try {
    let user = await User.findById(_id);
    if (!user) {
      user = await UserInstitute.findById(_id);
      // return res.status(404).json({ error: 'User not found' });
    }
    res.json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  console.log(email);
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
  User.find({ subscribedToJobAlerts: true })
    .exec((error, users) => {
      if (error) console.error(error);
      else {
        const emailAddresses = users.map(user => user.email);
        const mailOptions = {
          from: 'noreply@example.com',
          to: emailAddresses,
          subject: `New job posted: ${job.title}`,
          text: `A new job has been posted in ${job.location}.`,
          html: `<p>A new job has been posted in ${job.location}.</p>`
        };

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.error(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

      }
    });
}

let emailSent = false;

function checkForNewJobs() {
  if (emailSent) return; // stop checking if email has already been sent

  Job.find({ createdAt: { $gt: lastCheckTime } })
    .sort({ createdAt: 'desc' })
    .exec((error, jobs) => {
      if (error) console.error(error);
      else {
        if (jobs.length > 0) {
          var i = 0;
          for(i=0;i<jobs.length;i++)
          {
            sendJobNotification(jobs[i]);
          }
          emailSent = true; // set emailSent flag to true
        }
      }
    });

  lastCheckTime = new Date(); // update lastCheckTime to current time
}

cron.schedule('* * * * *', checkForNewJobs); // run every minute




app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
