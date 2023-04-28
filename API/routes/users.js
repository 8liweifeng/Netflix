const router = require("express").Router(); 
const User =require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken")

//update
router.put("/:id", verify, async (req,res)=>{
    if (req.user.id === req.params.id || req.user.isAdmin){
        if (req.body.password) { // if there is a password, new pass is below
            req.body.password = CryptoJS.AES.encrypt(
              req.body.password,
              process.env.SECRET_KEY
            ).toString();
          }//change the password
        
          //change other information of the users
          try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                  $set: req.body,
                },
                { new: true }//the user data could be shownin postman
              );
              res.status(200).json(updatedUser);
          }catch(err){
            res.status(500).json(err)
          } 
    } else {
        res.status(403).json("You can only update your own account!")
    }
});



//delete
router.delete("/:id", verify, async (req,res)=>{
  if (req.user.id === req.params.id || req.user.isAdmin){
      
      
        //change other information of the users
        try {
          await User.findByIdDelete(
              req.params.id
            );
            res.status(200).json("User has been deleted...");
        }catch(err){
          res.status(500).json(err)
        } 
  } else {
      res.status(403).json("You can only delete your own account!")
  }
});



//get // youneed not to verify, cos everyone could reach pr search information
router.get("/find/:id",async (req,res)=>{
 
        //change other information of the users
        try {
          const user = await User.findById(
              req.params.id
            );   // the content in json is the return content
            const {password, ...info} = user._doc;
            res.status(200).json(info);
        }catch(err){
          res.status(500).json(err)
        } 
 
});

//get all get("/?new=true",..) get all new users
router.get("/", verify, async (req,res)=>{
  const query = req.query.new;
  if (req.user.isAdmin){
      
        try {
            const users = query? await User.find().sort({_id:-1}).limit(10):
              await User.find();
            res.status(200).json(users);
        }catch(err){
          res.status(500).json(err)
        } 
  } else {
      res.status(403).json("You are not allowed to see all users")
  }
});

//get stats
router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        }, // this pe\roject will summary using month
      },
      {
        $group: { //get all users in the month
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router