import mongoose from "mongoose";
import moment from "moment-timezone";

// Get the current timestamp in the Asia/Kolkata timezone
const tz = moment.tz(Date.now(), "Asia/Kolkata");

// Define the log schema using Mongoose
export const logSchema = new mongoose.Schema(
  {
    // Log level, e.g., "info", "error", etc.
    level: {
      type: String,
      required: true,
    },
    // Log message content
    message: {
      type: String,
      required: true,
    },
    // Unique identifier for the resource associated with the log
    resourceId: {
      type: String,
      required: true,
    },
    // Unique identifier for the trace associated with the log
    traceId: {
      type: String,
      required: true,
    },
    // Unique identifier for the span associated with the log
    spanId: {
      type: String,
      required: true,
    },
    // Commit information associated with the log
    commit: {
      type: String,
      required: true,
    },
    // Additional metadata, in this case, the parent resource ID
    metadata: {
      parentResourceId: {
        type: String,
        required: true,
      },
    },
  },
  {
    // Configuring timestamps for the schema
    timestamps: {
      createdAt: "timestamp", // Use 'timestamp' field for createdAt
      updatedAt: false, // Disable updatedAt field
    },
  }
);
