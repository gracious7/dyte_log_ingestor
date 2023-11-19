import React, { useState } from "react";

// Component for filtering logs using a form
const FilterLogForm = () => {
  // State for storing logs and form data
  const [logs, setLogs] = useState([]);
  const [filterWithTimestamp, setFilterWithTimestamp] = useState(false);

  const [filterWithTimestampData, setFilterWithTimestampData] = useState({
    from: "",
    to: "",
  });

  const [filterFormData, setFilterFormData] = useState({
    key: "",
    value: "",
  });

  // Event handler for regular filter input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterFormData({ ...filterFormData, [name]: value });
  };

  // Event handler for timestamp filter input changes
  const handleTimestampFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterWithTimestampData({ ...filterWithTimestampData, [name]: value });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Constructing query parameters based on the filter type
      let queryParams = "";
      if (filterWithTimestamp) {
        const fromTimestamp = filterWithTimestampData.from;
        const toTimestamp = filterWithTimestampData.to;
        queryParams = `from=${fromTimestamp}&to=${toTimestamp}`;
      } else {
        queryParams = new URLSearchParams(filterFormData).toString();
      }

      // Constructing the URL for the API endpoint
      const url = `http://localhost:3000/api/logs/getFilteredLogs?filterWithTimestamp=${filterWithTimestamp}&${queryParams}`;

      // Sending a GET request to the server to fetch filtered logs
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handling errors if the request is not successful
      if (!response.ok) {
        throw new Error("Failed to fetch filtered logs");
      }

      // Resetting form data and updating logs state with the fetched data
      const data = await response.json();
      if (data) {
        setFilterFormData({
          key: "",
          value: "",
        });
        setLogs(data);
      }
    } catch (error) {
      // Logging an error message if there is an issue with fetching logs
      console.error("Error fetching logs:", error);
    }
  };

  // Rendering the form with input fields and labels
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <form onSubmit={handleSubmit}>
        {/* Checkbox for enabling/disabling timestamp filter */}
        <label
          htmlFor="filterWithTimestamp"
          style={{ textAlign: "left", marginRight: "120px" }}
        >
          Filter with timestamp?
        </label>
        <input
          type="checkbox"
          id="filterWithTimestamp"
          name="filterWithTimestamp"
          value={filterWithTimestamp}
          onChange={() => {
            setFilterWithTimestamp(!filterWithTimestamp);
          }}
        />
        <br />
        <br />

        {/* Conditional rendering of timestamp filter inputs */}
        {filterWithTimestamp ? (
          <>
            <label
              htmlFor="from"
              style={{ textAlign: "left", marginRight: "120px" }}
            >
              From:
            </label>
            <input
              type="datetime-local"
              id="from"
              name="from"
              required
              value={filterWithTimestampData.from}
              onChange={handleTimestampFilterChange}
            />
            <br />
            <br />
            <label
              htmlFor="to"
              style={{ textAlign: "left", marginRight: "140px" }}
            >
              To:
            </label>
            <input
              type="datetime-local"
              id="to"
              name="to"
              required
              value={filterWithTimestampData.to}
              onChange={handleTimestampFilterChange}
            />
            <br />
            <br />
          </>
        ) : (
          <>
            <label
              htmlFor="key"
              style={{ textAlign: "left", marginRight: "120px" }}
            >
              Key:
            </label>
            <input
              type="text"
              id="key"
              name="key"
              required
              value={filterFormData.key}
              onChange={handleChange}
            />
            <br />
            <br />
            <label
              htmlFor="value"
              style={{ textAlign: "left", marginRight: "110px" }}
            >
              Value:
            </label>
            <input
              type="text"
              id="value"
              name="value"
              required
              value={filterFormData.value}
              onChange={handleChange}
            />
            <br />
            <br />
          </>
        )}

        {/* Submit button */}
        <input type="submit" value="Submit" />
      </form>

      {/* Displaying filtered logs if available */}
      {logs.length > 0 && (
        <div style={{ background: "black", color: "white" }}>
          <h2>Filtered Logs:</h2>
          <pre>{JSON.stringify(logs, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FilterLogForm;
