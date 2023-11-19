import React, { useState } from "react";

// Component for creating a log using a form
const CreateLogForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    level: "",
    message: "",
    resourceId: "",
    // timestamp: '',
    traceId: "",
    spanId: "",
    commit: "",
    metadata: {
      parentResourceId: "",
    },
  });

  // Event handler for input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Updating form data based on input changes
    if (name === "parentResourceId") {
      setFormData({
        ...formData,
        metadata: { [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending a POST request to the server to create a new log
      const response = await fetch("http://localhost:3000/api/logs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handling errors if the request is not successful
      if (!response.ok) {
        console.log("error");
        throw new Error("Failed to create log");
      }

      // Resetting the form data if the log creation is successful
      const data = await response.json();
      if (data) {
        setFormData({
          level: "",
          message: "",
          resourceId: "",
          timestamp: "",
          traceId: "",
          spanId: "",
          commit: "",
          metadata: {
            parentResourceId: "",
          },
        });
      }
    } catch (error) {
      // Logging an error message if there is an issue with the log creation
      console.error("Error creating log:", error);
    }
  };

  // Rendering the form with input fields and labels
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <form onSubmit={handleSubmit}>
        {/* Input fields for various log properties */}
        <label
          htmlFor="level"
          style={{ textAlign: "left", marginRight: "121px" }}
        >
          Level:
        </label>
        <input
          type="text"
          id="level"
          name="level"
          required
          value={formData.level}
          onChange={handleChange}
          style={{ width: "200px" }}
        />
        <br />
        <br />

        {/* Repeat similar blocks for other log properties... */}

        {/* Input field for parentResourceId */}
        <label
          htmlFor="parentResourceId"
          style={{ textAlign: "left", marginRight: "40px" }}
        >
          Parent Resource ID:
        </label>
        <input
          type="text"
          id="parentResourceId"
          name="parentResourceId"
          required
          value={formData.metadata.parentResourceId}
          onChange={handleChange}
          style={{ width: "200px" }}
        />
        <br />
        <br />

        {/* Submit button */}
        <input
          type="submit"
          value="Submit"
          style={{ display: "flex", justifyContent: "center" }}
        />
      </form>
    </div>
  );
};

export default CreateLogForm;
