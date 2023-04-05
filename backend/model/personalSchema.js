const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalSchema = new Schema({
    email : String,
    // Personal Details
    full_name : String,
    fathers_name : String,
    profile_image_url : String,
    date_of_birth : String,
    aadhar_card_number : String,
    category : String,
    category_certificate_url : String,
    is_pwd : String,
    marital_status : String,
    nationality : String,
    gender : String,

    // Communication Details
    communication_address : String,
    communication_city : String,
    communication_state : String,
    communication_pincode : String,

    permanent_address : String,
    permanent_city : String,
    permanent_state : String,
    permanent_pincode : String,

    mobile_number : String,
    alternate_mobile_number : String,
});


module.exports = mongoose.model("personal", personalSchema);