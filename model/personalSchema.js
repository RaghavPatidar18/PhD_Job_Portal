const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalSchema = new Schema({
    email : String,
    // Personal Details
    name : String,
    fathername : String,
    age : String,
    profile_image_url : String,
    dob : String,
    category : String,
    disability : String, 
    married : String,
    nationality : String,
    gender : String,
    // Communication Details
    communication_address : String,
    communication_city : String,
    communication_state : String,
    communication_pincode : String,
    communication_country : String,

    permanent_address : String,
    permanent_city : String,
    permanent_state : String,
    permanent_pincode : String,
    permanent_country : String,

    mobile : String,
    altmobile : String,
});


module.exports = mongoose.model("personal", personalSchema);
