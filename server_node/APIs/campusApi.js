const exp = require("express");
const cors = require("cors");
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

campusApp.get("/team/:teamId", expressAsyncHandler(async (req, res) => {
    const { teamId } = req.params;
    let campusCollection = await getDBObj("campusCollectionObject");
    
    try {
        const team = await campusCollection.findOne({ teamID: parseInt(teamId) });
        
        if (!team) {
            res.status(404);
            throw new Error("Team not found");
        }

        res.status(200).json({
            status: "Success",
            data: team
        });
    } catch (error) {
        console.error("Error fetching team details:", error);
        res.status(500).json({ status: "Error", message: error.message });
    }
}));


campusApp.post("/submit-score/:teamId", expressAsyncHandler(async (req, res) => {
    const { teamId } = req.params;
    const { 
        totalScore,
        implementation,
        presentation,
        uiUx,
        creativity,
        feasibility,
        feedback 
    } = req.body;
    console.log(teamId, totalScore, implementation, presentation, uiUx, creativity, feasibility, feedback);
    if (!totalScore || typeof totalScore !== 'number') {
        res.status(400);
        throw new Error("Invalid score format");
    }

    let campusCollection = await getDBObj("campusCollectionObject");
    
    try {
        await campusCollection.updateOne(
            { teamID: parseInt(teamId) },
            { $set: { 
                score: totalScore,
                evaluated: 1,
                scoreDetails: {
                    implementation,
                    presentation,
                    uiUx,
                    creativity,
                    feasibility,
                    feedback
                }
            }}
        );

        res.status(200).json({ message: "Score submitted successfully" });
    } catch (error) {
        console.error("Error submitting score:", error);
        res.status(500).json({ status: "Error", message: error.message });
    }
}));


campusApp.post("/complete-round-one", expressAsyncHandler(async (req, res) => {
    let campusCollection = await getDBObj("campusCollectionObject");
    
    try {
        // Check if all teams are evaluated
        const allTeams = await campusCollection.find().toArray();
        const unevaluatedTeams = allTeams.filter(team => team.evaluated !== 1);
        
        // if (unevaluatedTeams.length > 0) {
        //     res.status(400);
        //     throw new Error(`${unevaluatedTeams.length} teams still need evaluation`);
        // }

        // Select top 3 from each panel
        const panel1Teams = allTeams
            .filter(team => team.panel === "panel-1")
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        const panel2Teams = allTeams
            .filter(team => team.panel === "panel-2")
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

        // Mark finalists and reset their scores
        const finalists = [...panel1Teams, ...panel2Teams];
        await Promise.all(finalists.map(team => 
            campusCollection.updateOne(
                { teamID: team.teamID },
                { $set: { final: true, score: 0, evaluated:0 } }
            )
        ));

        res.status(200).json({ 
            message: "Round 1 completed successfully",
            finalists: finalists.map(team => ({
                teamID: team.teamID,
                teamName: team.teamName,
                panel: team.panel,
                roundOneScore: team.score
            }))
        });
    } catch (error) {
        console.error("Error completing round 1:", error);
        res.status(500).json({ status: "Error", message: error.message });
    }
}));

// Final round score submission
campusApp.post("/submit-final-score/:teamId", expressAsyncHandler(async (req, res) => {
    const { teamId } = req.params;
    const { 
        totalScore,
        implementation,
        presentation,
        uiUx,
        creativity,
        feasibility,
        feedback 
    } = req.body;
    
    if (!totalScore || typeof totalScore !== 'number') {
        res.status(400);
        throw new Error("Invalid score format");
    }

    let campusCollection = await getDBObj("campusCollectionObject");
    
    try {
        const team = await campusCollection.findOne({ teamID: parseInt(teamId) });
        
        if (!team || !team.final) {
            res.status(400);
            throw new Error("Team not found or not eligible for final round");
        }

        await campusCollection.updateOne(
            { teamID: parseInt(teamId) },
            { $set: { 
                score: totalScore,
                evaluated: 1,
                scoreDetails: {
                    implementation,
                    presentation,
                    uiUx,
                    creativity,
                    feasibility,
                    feedback
                }
            }}
        );

        res.status(200).json({ message: "Final score submitted successfully" });
    } catch (error) {
        console.error("Error submitting final score:", error);
        res.status(500).json({ status: "Error", message: error.message });
    }
}));

// Final leaderboard
campusApp.get("/final-leaderboard", expressAsyncHandler(async (req, res) => {
    let campusCollection = await getDBObj("campusCollectionObject");
    
    try {
        const finalists = await campusCollection
            .find({ final: true })
            .sort({ score: -1 })
            .toArray();

        res.status(200).json({
            status: "Success",
            data: finalists
        });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ status: "Error", message: error.message });
    }
}));

module.exports = campusApp;