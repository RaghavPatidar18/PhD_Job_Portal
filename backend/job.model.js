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
  institute_email: {type: String}
});

const userSchema = new mongoose.Schema({
  name : String ,
  email: { type: String, unique: true },
  password: String,
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
