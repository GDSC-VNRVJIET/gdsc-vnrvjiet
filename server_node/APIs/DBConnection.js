/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: Error message here
 *   parameters:
 *     collectionName:
 *       name: collection
 *       in: path
 *       required: true
 *       description: The name of the collection
 *       schema:
 *         type: string
 */

const mclient = require("mongodb").MongoClient;

// Cache the connection across invocations. On Vercel the function instance is
// reused between requests (warm start), so opening a new connection each call
// leaks sockets and can exhaust the Atlas connection pool. We cache the connect
// promise and reset it if the connection fails so the next call can retry.
let clientPromise = null;

function getClient() {
  if (!clientPromise) {
    clientPromise = mclient.connect(process.env.dbUrl).catch((err) => {
      clientPromise = null; // allow a retry on the next call
      throw err;
    });
  }
  return clientPromise;
}

async function getDBObj(collection) {
  const client = await getClient();
  let dbObj = client.db("gdsc");
  // console.log("db connected")
  let CollectionObject = dbObj.collection(collection);
  return CollectionObject;
}

// async function createSequenceCollection() {
//   const client = await mclient.connect(process.env.dbUrl);
//   const db = client.db("gdsc");
//   await db.createCollection("sequenceCollection");
//   await db.collection("sequenceCollection").insertMany([
//     { _id: "teamIdSequence", sequence_value: 1 },
//     { _id: "userIdSequence", sequence_value: 1 },
//     // { _id: "userIdSequence", sequence_value: 1 },
//   ]);
//   console.log("Sequence collection created successfully.");
// }

module.exports = getDBObj;
