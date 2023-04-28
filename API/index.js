// create application
const express = require("express");
const app = express();
// create MongoDB connection
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//indicate yhe router 
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, 
                {useNewUrlParser: true, 
                useUnifiedTopology: true,
        
            })
            .then(()=> console.log("DB Connection Success"))
            .catch((err)=>console.log(err));
app.use(express.json());//requsset could use json file
//use route
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
//if you have a request, take to the end point, the end point load to the route

// run our application
//8800 port
app.listen(8800, ()=> {
    console.log("Backend server is runing");
})