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
    if (secretKey === process.env.SECRET_KEY) {
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


module.exports = discordApp;
  