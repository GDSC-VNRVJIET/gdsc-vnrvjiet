const exp = require("express");
const genAiApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const getDBObj = require("./DBConnection");
const verifyAdmin = require("../Middlewares/VerifyAdmin");

require("dotenv").config();

genAiApp.use(exp.json());

const YEAR = 2026;

const normName = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const toMilestone = (value) => {
  const match = String(value || "").match(/(\d+)/);
  return match ? Number(match[1]) : 0;
};

const toBadgeNames = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeRow = (row) => ({
  name: String(row["User Name"] || "").trim(),
  email: String(row["User Email"] || "").trim().toLowerCase(),
  profileUrl: String(row["Google Skills Profile URL"] || "").trim(),
  profileStatus: String(row["Google Skills Profile Status"] || "").trim(),
  redeemed: String(row["Access Code Redemption Status"] || "").trim(),
  milestone: toMilestone(row["Milestone Completed"]),
  badges: Number(row["Skill Badges Completed Count"]) || 0,
  badgeNames: toBadgeNames(row["Skill Badges Completed Names"]),
  year: YEAR,
});

genAiApp.get(
  "/get-data",
  expressAsyncHandler(async (request, response) => {
    try {
      const participants = await getDBObj("genAiCollectionObject");
      const clusterCollection = await getDBObj("clusterCollectionObject");

      const docs = await participants.find({ year: YEAR }).toArray();
      const clusters = await clusterCollection.find({}).toArray();

      const memberToTeam = {};
      clusters.forEach((cluster) => {
        (cluster.members || []).forEach((member) => {
          const raw = String(member || "").trim();
          const key = raw.includes("@") ? raw.toLowerCase() : normName(raw);
          memberToTeam[key] = { mentor: cluster.mentor, cluster: cluster.cluster };
        });
      });

      const data = docs.map((doc) => {
        const team =
          memberToTeam[String(doc.email || "").trim().toLowerCase()] ||
          memberToTeam[normName(doc.name)];
        return {
          ...doc,
          mentor: team ? team.mentor : null,
          cluster: team ? team.cluster : null,
        };
      });

      data.sort((a, b) => b.badges - a.badges || String(a.name).localeCompare(String(b.name)));

      response.json({ status: "Data fetched successfully", year: YEAR, data });
    } catch (error) {
      console.error("Error fetching data:", error);
      response.status(500).json({ status: "Error fetching data", error: error.message });
    }
  })
);

genAiApp.put(
  "/update-data",
  verifyAdmin,
  expressAsyncHandler(async (request, response) => {
    const rows = Array.isArray(request.body.data) ? request.body.data : [];

    try {
      const participants = await getDBObj("genAiCollectionObject");

      const operations = rows
        .map(normalizeRow)
        .filter((doc) => doc.email)
        .map((doc) => ({
          updateOne: {
            filter: { email: doc.email, year: YEAR },
            update: { $set: doc },
            upsert: true,
          },
        }));

      if (operations.length === 0) {
        return response
          .status(400)
          .json({ status: "No valid rows", error: "No rows with a User Email were found" });
      }

      const result = await participants.bulkWrite(operations);
      response.json({
        status: "Update successful",
        year: YEAR,
        received: rows.length,
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount,
      });
    } catch (error) {
      console.error("Error updating data:", error);
      response.status(500).json({ status: "Error updating data", error: error.message });
    }
  })
);

genAiApp.get(
  "/clusters",
  expressAsyncHandler(async (request, response) => {
    try {
      const clusterCollection = await getDBObj("clusterCollectionObject");
      const clusters = await clusterCollection.find({}).toArray();
      response.json({ status: "Clusters fetched successfully", data: clusters });
    } catch (error) {
      console.error("Error fetching clusters:", error);
      response.status(500).json({ status: "Error fetching clusters", error: error.message });
    }
  })
);

genAiApp.put(
  "/clusters",
  verifyAdmin,
  expressAsyncHandler(async (request, response) => {
    const rows = Array.isArray(request.body.data) ? request.body.data : [];

    try {
      const clusterCollection = await getDBObj("clusterCollectionObject");

      const operations = rows
        .filter((cluster) => cluster && cluster.cluster)
        .map((cluster) => ({
          updateOne: {
            filter: { cluster: cluster.cluster },
            update: {
              $set: {
                cluster: cluster.cluster,
                mentor: cluster.mentor || "",
                members: Array.isArray(cluster.members) ? cluster.members : [],
              },
            },
            upsert: true,
          },
        }));

      if (operations.length === 0) {
        return response
          .status(400)
          .json({ status: "No valid clusters", error: "No cluster rows were found" });
      }

      const result = await clusterCollection.bulkWrite(operations);
      response.json({
        status: "Clusters updated",
        upserted: result.upsertedCount,
        modified: result.modifiedCount,
      });
    } catch (error) {
      console.error("Error updating clusters:", error);
      response.status(500).json({ status: "Error updating clusters", error: error.message });
    }
  })
);

module.exports = genAiApp;
