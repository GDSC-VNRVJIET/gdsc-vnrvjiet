const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt=require("jsonwebtoken");
const getDBObj = require("./DBConnection");

require("dotenv").config();

userApp.use(exp.json());

userApp.get(
  "/getusers",
  expressAsyncHandler(async (request, response) => {
    let userCollectionObject = getDBObj("userCollectionObject");
    let users = await userCollectionObject.find().toArray();
    response.send({ message: "Users list", payload: users });
  })
);

userApp.post(
  "/login",
  expressAsyncHandler(async (request, response) => {
    let userCollectionObject = getDBObj("userCollectionObject");
    let userCredObj=request.body
    let userOfDB=await userCollectionObject.findOne({email:userCredObj.email});
    if(userOfDB==null){
      response.send({message:"Invalid user"})
    }
    else{
      let status=await bcryptjs.compare(userCredObj.password,userOfDB.password);
      if(status==false){
        response.send({message:"Invalid password"})
      }
      else{
        let token=jwt.sign({email:userOfDB.email},process.env.PVT_KEY,{expiresIn:6000000})
        response.send({message:"success",payload:token,userObj:userOfDB})
      }
    }
  })
);

userApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    let userCollectionObject = request.app.get("userCollectionObject");
    let newUserObj = request.body;
    let userOfDB = await userCollectionObject.findOne({
      email: newUserObj.email,
    });
    if (userOfDB !== null) {
      response.send({
        message: "Email has already Exist. Please try to login",
      });
    }
    else {
      let hashedPassword = await bcryptjs.hash(newUserObj.password, 6);
      newUserObj.password = hashedPassword;
      await userCollectionObject.insertOne(newUserObj);
      response.send({ message: "New User created" });
    }
  })
);

module.exports = userApp;
