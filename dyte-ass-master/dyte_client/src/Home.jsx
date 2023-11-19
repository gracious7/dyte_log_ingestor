import React, { useState, useEffect } from "react";
import CreateLogForm from "./CreateLogForm.jsx";
import FilterLogForm from "./FilterLogForm.jsx";

// Component for the Home page that includes log creation and fetching functionality
const Home = () => {
  // State to manage the current page content and fetched logs
  const [pageContent, setPageContent] = useState("");
  const [logs, setLogs] = useState([]);

  // Function to fetch all logs from the server
  const fetchLogs = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/logs/fetchAllLogs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handling errors if the request is not successful
      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }

      // Parsing and returning the fetched data
      const data = await response.json();
      return data;
    } catch (error) {
      // Logging an error message if there is an issue with fetching logs
      console.error("Error fetching logs:", error);
    }
  };

  // Effect to fetch logs when the page content is 'getAllLogs'
  useEffect(() => {
    if (pageContent === "getAllLogs") {
      const getLogs = async () => {
        try {
          const logs = await fetchLogs();
          setLogs(logs);
          console.log("logs: ", logs);
        } catch (error) {
          console.error(error);
        }
      };
      getLogs();
    }
  }, [pageContent]);

  // Function to determine and render the current page content
  const getPageContent = () => {
    switch (pageContent) {
      case "createLog":
        return <CreateLogForm />;

      case "getAllLogs":
        return (
          <div style={{ background: "black", color: "white" }}>
            <h2>Logs:</h2>
            <pre>{JSON.stringify(logs, null, 2)}</pre>
          </div>
        );

      case "getFilteredLogs":
        return (
          <>
            <FilterLogForm />
            {logs.length > 0 && (
              <div style={{ background: "black", color: "white" }}>
                <h2>Filtered Logs:</h2>
                <pre>{JSON.stringify(logs, null, 2)}</pre>
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  // Rendering the Home component with buttons and the dynamic page content
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", columnGap: "30px" }}
      >
        {/* Button to switch to the log creation form */}
        <button
          onClick={() => {
            setLogs([]);
            setPageContent("createLog");
          }}
        >
          Create Log
        </button>
        {/* Button to fetch all logs */}
        <button
          onClick={() => {
            setLogs([]);
            setPageContent("getAllLogs");
          }}
        >
          Fetch All Logs
        </button>
        {/* Button to fetch filtered logs */}
        <button
          onClick={() => {
            setLogs([]);
            setPageContent("getFilteredLogs");
          }}
        >
          Get Filtered Logs
        </button>
      </div>
      {/* Rendering the dynamic page content based on the selected pageContent */}
      {getPageContent()}
    </>
  );
};

export default Home;
