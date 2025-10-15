const express = require("express");
const cors = require("cors");
const upload = require('express-fileupload');

require("dotenv").config();

const userApp = require("./APIs/userApi");
const questionApp = require("./APIs/questionaApi");
const eventApp = require("./APIs/eventsApi");
const scoreApp = require("./APIs/scoreApi");
const teamApp = require("./APIs/teamApi");
const registrationApp = require('./APIs/registrationApi');
const mailApp = require("./APIs/mailApi");
const blogApp = require("./APIs/blogApi");
const genAiApp = require("./APIs/genAiApi");
const discordApp=require("./APIs/discordAPi");
const campusApp = require("./APIs/campusApi");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerSpec");

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// File upload middleware
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/users", userApp);
app.use("/Questions", questionApp);
app.use("/Events", eventApp);
app.use("/score", scoreApp);
app.use("/team", teamApp);
app.use("/registration", registrationApp);
app.use("/sendmail", mailApp);
app.use("/addblog", blogApp);
app.use("/genAi", genAiApp);
app.use("/discord", discordApp);
app.use("/campus", campusApp);

// Default route
app.use("/", (req, res) => {
  res.send("<center>GDSC VNRVJIET </center>");
});

// Invalid path handling
app.use((request, response, next) => {
  response.send({ message: `Path ${request.url} is invalid` });
});

// Global error handling middleware
app.use((error, request, response, next) => {
  response.send({ message: "Error occurred", reason: `${error.message}` });
});

// Start the server
app.listen(4000, () => console.log("Server running on port 4000..."));
