import express from "express";

// Creating an Express router
const router = express.Router();

// Importing LogControllers for handling log-related routes
import LogControllers from "./log.controller.js";

// Creating an instance of LogControllers to use its methods
const logController = new LogControllers();

// Route for fetching all logs
router.get("/fetchAllLogs", (req, res) => {
  // Calling the getAllLogs method from LogControllers to handle the request
  logController.getAllLogs(req, res);
});

// Route for creating a new log
router.post("/create", (req, res) => {
  // Calling the createLog method from LogControllers to handle the request
  logController.createLog(req, res);
});

// Route for fetching filtered logs based on specified criteria
router.get("/getFilteredLogs", (req, res) => {
  // Calling the getFilteredLogs method from LogControllers to handle the request
  logController.getFilteredLogs(req, res);
});

// Exporting the router for use in other parts of the application
export default router;
