const exp = require("express");
const adminApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

adminApp.use(exp.json());

adminApp.post(
  "/create-hackathon",
  expressAsyncHandler(async (request, response) => {
    try {
      const hackathoncollection = await getDBObj("HackathonCollectionObject");
      const hackathondataobj = request.body;
      const result = await hackathoncollection.insertOne(hackathondataobj);

      if (result.acknowledged) {
        response.status(201).json({
          message: "Hackathon created successfully",
          id: result.insertedId,
        });
      } else {
        response.status(500).json({ message: "Failed to create hackathon" });
      }
    } catch (err) {
      response.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }),
);

adminApp.put(
  "/update-hackathon/:hackathonid",
  expressAsyncHandler(async (request, response) => {
    try {
      const hackathoncollection = await getDBObj("HackathonCollectionObject");
      const updateddata = request.body;
      const { hackathonid } = request.params;
      const result = await hackathoncollection.updateOne(
        { _id: new ObjectId(hackathonid) },
        { $set: updateddata },
      );

      if (result.matchedCount) {
        response.status(200).json({ message: "Updated successfully" });
      } else {
        response.status(404).json({ message: "Hackathon not found" });
      }
    } catch (err) {
      response.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }),
);

module.exports = adminApp;
