import mongoose from "mongoose";
import { logSchema } from "./log.schema.js";

// Creating a Mongoose model based on the logSchema
const logModel = mongoose.model("Log", logSchema);

// Repository class for handling database operations related to logs
export default class LogRepository {
  // Method for creating a new log entry in the database
  async createLog(logData) {
    // Creating a new log instance using the logModel and saving it to the database
    const log = new logModel(logData);
    const savedLog = await log.save();
    return savedLog;
  }

  // Method for retrieving all logs from the database
  async allLogs() {
    // Fetching all log entries from the database
    const logs = await logModel.find();
    return logs;
  }

  // Method for retrieving log entries based on specified filters
  async getLogsByFilter(key, value, fromTimestamp, toTimestamp) {
    try {
      let filter = {};

      // Checking if a time range is specified
      if (fromTimestamp) {
        // Converting timestamps to UTC format
        let from = new Date(fromTimestamp);
        let to = new Date(toTimestamp);
        const fromUTC = new Date(from.toUTCString());
        const toUTC = new Date(to.toUTCString());

        // Setting the filter to match logs within the specified time range
        key = "timestamp";
        filter["timestamp"] = {
          $gte: fromUTC,
          $lte: toUTC,
        };
      } else if (key === "parentResourceId") {
        // Setting the filter to match logs with a specific parentResourceId
        filter["metadata.parentResourceId"] = value;
      } else {
        // Setting a general filter using regular expression for other key/value pairs
        filter[key] = { $regex: value, $options: "i" };
      }

      // Fetching logs from the database based on the constructed filter
      const logs = await logModel.find(filter);

      // Checking if logs were found
      if (logs.length > 0) {
        return logs;
      }

      // Returning a message if no logs match the given key/value
      return "Logs with the given key/value do not exist";
    } catch (error) {
      // Handling errors and throwing a custom error message
      throw new Error("Error fetching logs by filter: " + error.message);
    }
  }
}
