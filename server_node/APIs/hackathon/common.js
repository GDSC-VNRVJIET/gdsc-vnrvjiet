const exp = require("express");
const app = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

app.use(exp.json());

app.get(
  "/get-hackathons",
  expressAsyncHandler(async (request, response) => {
    try {
      const hackathoncollection = await getDBObj("HackathonCollectionObject");
      const hackathons = await hackathoncollection.find().toArray();

      response.status(200).json({
        hackathons,
        count: hackathons.length,
      });
    } catch (err) {
      response.status(500).json({
        message: "Failed to fetch hackathons",
        error: err.message,
      });
    }
  }),
);
