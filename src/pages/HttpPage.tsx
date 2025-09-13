import React, { useState } from "react";
import { fetch } from "@tauri-apps/plugin-http";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const HttpPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");
  const [url, setUrl] = useState("https://httpbin.org/get");

  const makeGetRequest = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setOutput(data);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const makePostRequest = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Hello from Tauri!" })
      });
      const data = await response.json();
      setOutput(data);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const httpCode = `
import { fetch } from "@tauri-apps/plugin-http";

// Make a GET request
const response = await fetch("https://httpbin.org/get");
const data = await response.json();

// Make a POST request
const response = await fetch("https://httpbin.org/post", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: "Hello from Tauri!" })
});
const data = await response.json();
  `.trim();

  return (
    <div className="page-container">
      <h1>Networking APIs</h1>
      <p>
        Tauri provides secure HTTP client APIs for making network requests.
      </p>

      <div className="demo-section">
        <h3>HTTP Requests</h3>
        <p>Make HTTP requests to external APIs.</p>
        <div className="button-group">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL"
          />
          <button onClick={makeGetRequest}>GET Request</button>
          <button onClick={makePostRequest}>POST Request</button>
        </div>
      </div>

      {output && <OutputDisplay title="Output" output={output} />}

      <div className="demo-section">
        <h3>Source Code</h3>
        <CodeViewer code={httpCode} language="typescript" />
      </div>
    </div>
  );
};

export default HttpPage;