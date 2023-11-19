// Importing necessary modules
import dotenv from "dotenv"; // Allows you to load environment variables from a .env file
dotenv.config(); // Configures dotenv to read variables from .env file

import express from "express"; // Web framework for building APIs in Node.js
import logRouter from "./features/log/log.routes.js"; // Importing the log routes
import cors from "cors"; // Middleware for enabling Cross-Origin Resource Sharing (CORS)

// Creating an Express application
const app = express();

// Enabling CORS for all routes in the application
app.use(cors());

// Setting up additional CORS headers and handling preflight requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // Allowing requests from this origin
  res.header("Access-Control-Allow-Headers", "Content-Type, *"); // Allowing specific headers
  res.header("Access-Control-Allow-Methods", "*"); // Allowing all HTTP methods
  if (req.method == "OPTIONS") {
    return res.sendStatus(200); // Handling preflight requests with a 200 OK status
  }
  next();
});

// Parsing JSON and URL-encoded data in requests
app.use(express.json());
app.use(express.urlencoded());

// Mounting the logRouter for requests to "/api/logs"
app.use("/api/logs", logRouter);

// Exporting the configured Express application
export default app;
