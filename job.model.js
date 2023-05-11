const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
const keysecret = "secret";


const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  contactEmail: { type: String, required: true },
  college: { type: String, required: true },
  qualifications: { type: [String], required: true },
  responsibilities: { type: [String], required: true },
  link: { type: String },
  institute_id: {type: String},
  createdAt: { type: Date, default: Date.now },
  lastDate: {type: String},
  lastUpdateDate: {type:String},
  deleted: {type: Boolean,default:false},
  fields: {
    personal: {
      email : Boolean,
      // Personal Details
      name : Boolean,
      fathername : Boolean,
      age : Boolean,
      profile_image_url : Boolean,
      dob : Boolean,
      category : Boolean,
      disability : Boolean,
      married : Boolean,
      nationality : Boolean,
      gender : Boolean,
      // Communication Details
      communication_address : Boolean,
      communication_city : Boolean,
      communication_state : Boolean,
      communication_pincode : Boolean,
      communication_country : Boolean,

      permanent_address : Boolean,
      permanent_city : Boolean,
      permanent_state : Boolean,
      permanent_pincode : Boolean,
      permanent_country : Boolean,

      mobile : Boolean,
      altmobile : Boolean,
    },
    experience: {
      profile : Boolean,
      organization : Boolean,
      startdate : Boolean,
      enddate : Boolean,
      description : Boolean,
      location : Boolean,
    },
    academic: {
      board10 : Boolean,
      percentageformat10 : Boolean,
      percentage10 : Boolean,
      year10 : Boolean,
      remarks10 : Boolean,
      marksheet10:  Boolean,

      board12 : Boolean,
      percentageformat12 : Boolean,
      percentage12 : Boolean,
      year12 :  Boolean,
      remarks12 : Boolean,
      marksheet12 : Boolean,

      collegebtech : Boolean,
      branchbtech : Boolean,
      percentageformatbtech : Boolean,
      percentagebtech : Boolean,
      yearbtech :  Boolean,
      remarksbtech : Boolean,
      marksheetbtechurl : Boolean,

      collegemtech : Boolean,
      branchmtech : Boolean,
      percentageformatmtech : Boolean,
      percentagemtech : Boolean,
      yearmtech :  Boolean,
      remarksmtech : Boolean,
      marksheetmtechurl : Boolean,

      isphdcompleted : Boolean,
      phdremarks : Boolean,
    },
    publication: {
      title : Boolean,
      authorlist : Boolean,
      abstract : Boolean,
      journal : Boolean,
      volume : Boolean,
      pages : Boolean,
      publisher : Boolean,
      doi : Boolean,
      url : Boolean,
    },
    por: {
      title : Boolean,
      organization : Boolean,
      location : Boolean,
      startdate : Boolean,
      enddate : Boolean,
      description : Boolean,
    },
    reference: {
      name : Boolean,
      title : Boolean,
      affliliation : Boolean,
      referenceemail : Boolean,
      referencephone : Boolean,
      relationship : Boolean,
      description : Boolean,
    }
  }
});

const userSchema = new mongoose.Schema({
  name : String ,
  email: { type: String, unique: true },
  password: String,
  subscribedToJobAlerts: { type: Boolean, default: false },
  tokens: [
    {
        token: {
            type: String,
            required: true,
        }
    }
],
verifytoken:{
    type: String,
},
});

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, default: 'admin@123' },
  password: { type: String, default: '1' },
  tokens: [
    {
        token: {
            type: String,
            required: true,
        }
    }
],
verifytoken:{
    type: String,
}
});

//  db.admins.insertOne({email: "admin@123", password: "1"})  // command to add admins

// const experienceSchema = new mongoose.Schema({
//   name : String ,
//   email: { type: String, unique: true },
//   college : string,
//   description : string,
// });

// const commentSchemaNew = new mongoose.Schema({
//   experience: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Experience',
//     required: true,
//   },
//   comment: {
//     type: String,
//     required: true,
//   },
// }, {
//   timestamps: true,
// });

const commentSchemaNew = new mongoose.Schema({
  experience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: String, // assuming user's email is stored as string
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobPosting: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
}, { timestamps: true });



const experiencesSchema = new mongoose.Schema({

  email : String,

  name : String,

  companyName: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});


const registerInstituteSchema = new mongoose.Schema({

  usersname : String,
  email: { type: String, unique: true },
  companyName: String,
  location : String,
  year : String,
  phone : String
});


// token generate
userSchema.methods.generateAuthToken = async function () {

  console.log("andar hu");

  try {
      let token23 = jwt.sign({ _id: this._id }, keysecret, {
          expiresIn: "1d"
      });

      this.tokens = this.tokens.concat({ token: token23 });
      await this.save();
      return token23;
  } catch (error) {
    throw error;
  }
}

adminSchema.methods.generateAuthToken = async function () {

  console.log("andar hu");

  try {
      let token23 = jwt.sign({ _id: this._id }, keysecret, {
          expiresIn: "1d"
      });

      this.tokens = this.tokens.concat({ token: token23 });
      await this.save();
      return token23;
  } catch (error) {
    throw error;
  }
}

// db.userinstitutes.deleteOne({email : "r.patidar181001@gmail.com"})
// db.registerinstitutes.deleteOne({email : "r.patidar181001@gmail.com"})

module.exports = {
  Job: mongoose.model('Job', jobSchema),
  User: mongoose.model('User', userSchema),
  UserInstitute: mongoose.model('UserInstitute', userSchema),
  Alumni: mongoose.model('Alumni', userSchema),
  Comment: mongoose.model('Comment',commentSchema),
  CommentNew: mongoose.model('CommentNew',commentSchemaNew),
  Experience: mongoose.model('UserExperience',experiencesSchema),
  RegisterInstitute: mongoose.model('RegisterInstitute', registerInstituteSchema),
  Admin: mongoose.model('Admin',adminSchema)
};
