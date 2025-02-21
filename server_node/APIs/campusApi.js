const exp = require("express");
const cors = require("cors")
const campusApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const { ObjectId } = require('mongodb');

require("dotenv").config();

campusApp.use(exp.json());
campusApp.use(cors());

campusApp.post(
    "/teams",
    expressAsyncHandler(async (req, res) => {
      const { data } = req.body;
      let campusCollection = await getDBObj("campusCollectionObject");
      if (!data || !Array.isArray(data)) {
        res.status(400);
        throw new Error("Invalid data format");
      }
      await campusCollection.insertMany(data);
  
      res.status(200).json({ message: "Data inserted successfully" });
    })
  );

  campusApp.get("/teams", expressAsyncHandler(async (req, res) => {
    let campusCollection = await getDBObj("campusCollectionObject");
    try {
      const documents = await campusCollection.find().toArray();
      res.send({ status: "Data fetched successfully", data: documents });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ status: "Error", message: error.message });
    }
  }));




module.exports = campusApp;