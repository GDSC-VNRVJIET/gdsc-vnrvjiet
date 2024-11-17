const exp = require("express");
const cors = require("cors")
const discordApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const { ObjectId } = require('mongodb');
require("dotenv").config();

discordApp.use(exp.json());
discordApp.use(cors());

discordApp.get(
    "/users",
    expressAsyncHandler(async (request, response) => {
        const { email,secretKey } = request.query;
    if (secretKey === "FBKNa5P4uqvRPULB") {
      let communityCollectionObject = await getDBObj("communityCollectionObject");
      let communityMember = await communityCollectionObject.findOne({email});
      if (communityMember) {
        response.status(200).send({ message: "User details", payload: communityMember });
      } else {
        response.status(404).send({ message: "User not found" });
      }
    } else {
      response.status(403).send({ message: "Invalid access" });
    }
    })
  );

  discordApp.post(
    "/register",
    expressAsyncHandler(async (request, response) => {
      const communityCollectionObject = await getDBObj("communityCollectionObject");
  
      let newRegister = request.body;
      newRegister.rollNumber= newRegister.rollNumber.toUpperCase();
      const otp = Math.floor(100000 + Math.random() * 900000);
      newRegister.otp = otp;
      await communityCollectionObject.insertOne(newRegister);
      response.send({ message: "Registration successful" });
    })
  );

  discordApp.post(
    "/check-register",
    expressAsyncHandler(async (request, response) => {
      let communityCollectionObject = await getDBObj("communityCollectionObject");
      let {rollNumber} = request.body;
      let userData = await communityCollectionObject
        .find({ rollNumber: rollNumber})
        .toArray();
      if (userData.length !== 0) {
        response.send({status:false})
      }
      response.send({ status: true });
    })
  );


module.exports = discordApp;
  
