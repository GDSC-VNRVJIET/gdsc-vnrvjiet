// const exp = require("express");
// const app = exp();
// const path = require("path");
// const cors = require("cors");
// const upload = require('express-fileupload')

// require("dotenv").config()


// const userApp = require("./APIs/userApi");
// const questionApp = require("./APIs/questionaApi");
// const eventApp = require("./APIs/eventsApi");
// const scoreApp = require("./APIs/scoreApi");
// const teamApp = require("./APIs/teamApi");
// const registrationApp = require('./APIs/registrationApi');
// const mailApp = require("./APIs/mailApi");
// const blogApp = require("./APIs/blogApi");

// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./swaggerSpec");


// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(exp.json({extended:true}));
// app.use(exp.urlencoded({ extended: true }));
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allow 'Authorization' header
//   credentials: true, // Allow credentials
// }));
// app.use(upload())
// app.use('/uploads', exp.static(__dirname+'/uploads'))


// app.use("/users", userApp);
// app.use("/Questions", questionApp);
// app.use("/Events", eventApp);
// app.use("/score", scoreApp);
// app.use("/team", teamApp);
// app.use("/registration",registrationApp);
// app.use("/sendmail",mailApp)
// app.use("/addblog",blogApp);

// app.use("/", (req, res) => {
//   res.send("<center>GDSC VNRVJIET </center>");
// });

// app.use((request, response, next) => {
//   response.send({ message: `path ${request.url} is invalid` });
// });

// app.use((error, request, response, next) => {
//   response.send({ message: "Error occurred", reason: `${error.message}` });
// });

// app.listen(4000, () => console.log("server on port 4000.."));



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

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerSpec");

const app = express();

// Apply CORS middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Your frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));
app.use(cors());

// Apply body-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
