import LogRepository from "./log.repository.js";

// Controller class for handling log-related operations
export default class LogControllers {
  constructor() {
    // Initializing an instance of LogRepository for database interactions
    this.logRepository = new LogRepository();
  }

  // Method for creating a new log entry
  async createLog(req, res) {
    try {
      // Calling the createLog method from the LogRepository to store the new log
      const createdNewLogs = await this.logRepository.createLog(req.body);
      // Sending a successful response with the created log data
      return res.status(201).send(createdNewLogs);
    } catch (error) {
      // Handling errors and sending an error response with status code 404
      console.log(error);
      return res.status(404).send(error);
    }
  }

  // Method for retrieving all log entries
  async getAllLogs(req, res) {
    try {
      // Calling the allLogs method from the LogRepository to retrieve all logs
      const allLogs = await this.logRepository.allLogs();
      // Sending a successful response with all log entries
      return res.status(201).send(allLogs);
    } catch (error) {
      // Handling errors and sending an error response with status code 404
      return res.status(404).send(error);
    }
  }

  // Method for retrieving log entries based on specified filters
  async getFilteredLogs(req, res) {
    try {
      // Extracting filter parameters from the request query
      const { key, value, from, to } = req.query;
      // Calling the getLogsByFilter method from the LogRepository with specified filters
      const logsByFilter = await this.logRepository.getLogsByFilter(
        key,
        value,
        from,
        to
      );
      // Sending a successful response with the filtered log entries
      return res.status(200).json(logsByFilter);
    } catch (error) {
      // Handling errors and sending an error response with status code 500
      return res.status(500).json({ error: error.message });
    }
  }
}
