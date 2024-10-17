const exp = require("express");
const genAiApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const { Parser } = require("json2csv");

require("dotenv").config();

genAiApp.use(exp.json());

genAiApp.post("/add-data", expressAsyncHandler(async (request, response) => {
    
    const genAIdata=request.body.data;
    let genAiCollectionObject = await getDBObj("genAiCollectionObject");
    try{
        const result = await genAiCollectionObject.insertMany(genAIdata);
        response.json({ status: "Sent successfully", insertedCount: result.insertedCount });
      } catch (error) {
        console.error("Error storing data:", error);
        response.status(500).json({ status: "Not sent", error: error.message });
      }
    }));
    
genAiApp.get("/get-data", expressAsyncHandler(async (request, response) => {
    let genAiCollectionObject = await getDBObj("genAiCollectionObject");
    try {
        const documents = await genAiCollectionObject.find().toArray();
        
        response.json({ status: "Data fetched successfully", data: documents });
    } catch (error) {
        console.error("Error fetching data:", error);
        response.status(500).json({ status: "Error fetching data", error: error.message });
    }
}));

genAiApp.put("/update-data", expressAsyncHandler(async (request, response) => {
    const updatedDataArray = request.body.data;

    let genAiCollectionObject = await getDBObj("genAiCollectionObject");
    try {
        const bulkOperations = updatedDataArray.map((doc) => {
            if (!doc["User Email"]) {
                return null;  // Skip this document
            }


            return {
                updateOne: {
                    filter: { "User Email": doc["User Email"] },  // Filter by email, which is unique
                    update: { $set: { ...doc } },  // Update the whole document using $set
                    upsert: false,  // Don't insert a new document if the email doesn't exist
                }
            };
        }).filter(Boolean);  // Remove any null operations from missing email docs

        if (bulkOperations.length === 0) {
            return response.status(400).json({ status: "No valid updates", error: "No documents with valid email found" });
        }

        const result = await genAiCollectionObject.bulkWrite(bulkOperations);
        response.json({ status: "Update successful", modifiedCount: result.modifiedCount });
    } catch (error) {
        console.error("Error updating data:", error);
        response.status(500).json({ status: "Error updating data", error: error.message });
    }
}));




module.exports=genAiApp;