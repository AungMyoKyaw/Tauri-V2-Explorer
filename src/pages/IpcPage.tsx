import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const IpcPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");
  const [message, setMessage] = useState("Hello Tauri!");

  const callGreetCommand = async () => {
    try {
      const result = await invoke("greet", { name: message });
      setOutput(result as string);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const ipcCodeFrontend = `
import { invoke } from "@tauri-apps/api/core";

// Call a Rust command
const result = await invoke("greet", { name: "Tauri" });
  `.trim();

  const ipcCodeBackend = `
// In src-tauri/src/lib.rs
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Register the command in the builder
tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![greet])
    `.trim();

  return (
    <div className="page-container">
      <h1>IPC (Inter-Process Communication)</h1>
      <p>
        Tauri's IPC system allows secure communication between the frontend and backend.
      </p>

      <div className="demo-section">
        <h3>Call Rust Commands</h3>
        <p>Invoke Rust functions from the frontend.</p>
        <div className="button-group">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={callGreetCommand}>Greet</button>
        </div>
      </div>

      {output && <OutputDisplay title="Output" output={output} />}

      <div className="demo-section">
        <h3>Frontend Code</h3>
        <CodeViewer code={ipcCodeFrontend} language="typescript" />
      </div>

      <div className="demo-section">
        <h3>Backend Code (Rust)</h3>
        <CodeViewer code={ipcCodeBackend} language="rust" />
      </div>
    </div>
  );
};

export default IpcPage;