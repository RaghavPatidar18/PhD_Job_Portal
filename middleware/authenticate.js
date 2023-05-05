const jwt = require("jsonwebtoken");
const models = require('../job.model');
const keysecret = "secret";

const User = models.User;
const UserInstitute = models.UserInstitute;
const Admin = models.Admin;

// check for institute

const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;

        //console.log("authentication m aa rha");
        // //console.log(token);
        
        const verifytoken = jwt.verify(token,keysecret);

        //console.log(verifytoken);
        
        // first check for student then institute if no id is matched then throw error

        let rootUser = await User.findOne({_id:verifytoken._id});
        //console.log(rootUser);
    
        if(!rootUser) {
            //console.log("institution ka authentication");
            rootUser = await UserInstitute.findOne({_id:verifytoken._id});
            //console.log(rootUser);
        }

        if(!rootUser) {
            //console.log("institution ka authentication");
            rootUser = await Admin.findOne({_id:verifytoken._id});
            //console.log(rootUser);
        }

        // //console.log(rootUser);
        
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}


module.exports = authenticate