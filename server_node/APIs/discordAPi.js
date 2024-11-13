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
      let communityCollectionObject = await getDBObj("communityCollectionObject");
      let communityMembers = await communityCollectionObject.find().toArray();
      response.send({ message: "Events list", payload: communityMembers });
    })
  );


module.exports = discordApp;
  