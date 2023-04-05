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
  fields: {
    personal: {
      name: {type: Boolean, default:false},
      email:{type: Boolean, default:false},
      age: {type: Boolean, default:false},
      gender: {type: Boolean, default:false},
      category:{type: Boolean, default:false},
      permanentAddress:{type: Boolean, default:false},
      currentAddress:{type: Boolean, default:false}
    },
    experience: {
      companyName: {type: Boolean, default:false},
      jobProfile: {type: Boolean, default:false},
      location: {type: Boolean, default:false},
      startYear: {type: Boolean, default:false},
      endYear: {type: Boolean, default:false}
    },
    education: {
      degreeName: {type: Boolean, default:false},
      degreeStudy: {type: Boolean, default:false},
      gradingScale: {type: Boolean, default:false},
      grade: {type: Boolean, default:false},
      startYear: {type: Boolean, default:false},
      endYear: {type: Boolean, default:false}
    },
    publications: {
      title: {type: Boolean, default:false},
      authorList: {type: Boolean, default:false},
      journal: {type: Boolean, default:false},
      summary: {type: Boolean, default:false},
      startYear: {type: Boolean, default:false},
      endYear: {type: Boolean, default:false}
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
}
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

module.exports = {
  Job: mongoose.model('Job', jobSchema),
  User: mongoose.model('User', userSchema),
  UserInstitute: mongoose.model('UserInstitute', userSchema)
};
