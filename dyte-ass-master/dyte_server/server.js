// Importing the Express app from the 'index.js' file
import app from "./index.js";

// Importing the MongoDB connection function from the 'mongodb.js' configuration file
import { connectUsingMongoose } from "./config/mongodb.js";

// Starting the Express app on port 3000
app.listen(3000, () => {
  // Connecting to MongoDB using Mongoose
  connectUsingMongoose();

  // Logging a message when the server is successfully running
  console.log("Server is running on port 3000");
});
