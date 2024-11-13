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
        const { email } = request.query;
    if (email === '123@gmail.com') {
      let communityCollectionObject = await getDBObj("communityCollectionObject");
      let communityMembers = await communityCollectionObject.find().toArray();
      response.status(200).send({ message: "users list", payload: communityMembers });
    } else {
      response.status(403).send({ message: "Invalid access" });
    }
    })
  );


module.exports = discordApp;
  