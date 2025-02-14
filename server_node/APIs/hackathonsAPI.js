const exp = require("express");
const hackathonApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");

require("dotenv").config();

hackathonApp.use(exp.json());

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: API endpoints related to events
 */

/**
 * @swagger
 * /Events/get-past-events:
 *   get:
 *     summary: Get past events
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Past events retrieved successfully
 *       '500':
 *         description: Internal Server Error
 */
hackathonApp.get(
  "/get-past-hackathons",
  expressAsyncHandler(async (request, response) => {
    let hackathonCollectionObject = await getDBObj("hackathonCollectionObject");
    let hackathons = await hackathonCollectionObject
      .find({
        isPast: 1,
      })
      .toArray();
      hackathons.reverse();
    response.send({ message: "Hackathons list", payload: hackathons });
  })
);

/**
 * @swagger
 * /Events/get-upcoming-events:
 *   get:
 *     summary: Get upcoming events
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Upcoming events retrieved successfully
 *       '500':
 *         description: Internal Server Error
 */
hackathonApp.get(
  "/get-upcoming-hackathons",
  expressAsyncHandler(async (request, response) => {
    let hackathonCollectionObject = await getDBObj("hackathonCollectionObject");
    let hackathons = await hackathonCollectionObject
      .find({
        isPast: 0,
      })
      .toArray();
      hackathons.reverse();
    response.send({ message: "Hackathons list", payload: hackathons });
  })
);

/**
 * @swagger
 * /Events/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties for the new event here
 *     responses:
 *       '200':
 *         description: New event created successfully
 *       '500':
 *         description: Internal Server Error
 */
hackathonApp.post(
  "/create",
  expressAsyncHandler(async (request, response) => {
    let hackathonCollectionObject = await getDBObj("hackathonCollectionObject");
    let newhackathonObj = request.body;

    await hackathonCollectionObject.insertOne({
      isPast: 0,
      ...newhackathonObj,
    });
    response.send({ message: "New hackathon created" });
  })
);

module.exports = hackathonApp;
