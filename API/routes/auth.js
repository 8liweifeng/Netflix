//create our register and ligin 
const router = require("express").Router();    // indicate this is a router
const User = require("../models/User"); //take care of users
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//Register
//if you create something , please use post
//if  you update, use put
//if you fetch some data,use get
//for delete, use delete

// const UserSchema = new mongoose.Schema({
//     username:{type:String, required:true, unique:true},
//     email:{type:String, required:true, unique:true},
//     password:{type:String, required:true},
//     profilePic:{type:String, default:""},
//     isAdmin: {type:Boolean, default:false}
// }, {timestamps:true});
router.post("/register", async (req,res)=>{ 
   //create a user
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ).toString(),
    });
   
    //use postman to sent the data
        //save the new data to momgoDB
        
       try { 
        const user = await newUser.save();
        res.status(201).json(user); //201,  500 simaler to 404
    } catch (err) {
        res.status(500).json(err);
    }
    
});
/////////////ulr-- local host 8800  
//----req=requst to url, after request, get a res(response)


//Login

router.post("/login", async (req,res)=> {
    try{
        const user = await User.findOne({email:req.body.email});
        !user && res.status(401).json("Wrong password or username!");
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("Wrong password or username!");
        const accessToken = jwt.sign(//make you rlogin more sacure
            { id: user._id, isAdmin: user.isAdmin }, //some informaton given to jwt
            process.env.SECRET_KEY, // this infoemation will be hidden again
            { expiresIn: "30d" }
          );
        const {password, ...info} = user._doc;

        res.status(200).json({...info, accessToken});   
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;