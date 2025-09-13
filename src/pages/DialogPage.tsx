import React, { useState } from "react";
import { open, save } from "@tauri-apps/plugin-dialog";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const DialogPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");

  const openFileDialog = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [{
          name: "All Files",
          extensions: ["*"]
        }]
      });
      setOutput(selected || "No file selected");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const openSaveDialog = async () => {
    try {
      const selected = await save({
        filters: [{
          name: "Text Files",
          extensions: ["txt"]
        }]
      });
      setOutput(selected || "No file selected");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const openMessageDialog = async () => {
    try {
      // Note: Message dialog is not directly available in the plugin
      // We'll simulate this with a simple alert for now
      alert("This is a message dialog!");
      setOutput("Message dialog displayed");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const dialogCode = `
import { open, save } from "@tauri-apps/plugin-dialog";

// Open file dialog
const selectedFile = await open({
  multiple: false,
  filters: [{
    name: "All Files",
    extensions: ["*"]
  }]
});

// Save file dialog
const savePath = await save({
  filters: [{
    name: "Text Files",
    extensions: ["txt"]
  }]
});
  `.trim();

  return (
    <div className="page-container">
      <h1>Dialog APIs</h1>
      <p>
        Tauri provides dialog APIs for opening files, saving files, and showing message dialogs.
      </p>

      <div className="demo-section">
        <h3>File Open Dialog</h3>
        <p>Open a dialog to select a file from the filesystem.</p>
        <div className="button-group">
          <button onClick={openFileDialog}>Open File Dialog</button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Save Dialog</h3>
        <p>Open a dialog to select a location to save a file.</p>
        <div className="button-group">
          <button onClick={openSaveDialog}>Save File Dialog</button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Message Dialog</h3>
        <p>Show a message dialog to the user.</p>
        <div className="button-group">
          <button onClick={openMessageDialog}>Show Message Dialog</button>
        </div>
      </div>

      {output && <OutputDisplay title="Output" output={output} />}

      <div className="demo-section">
        <h3>Source Code</h3>
        <CodeViewer code={dialogCode} language="typescript" />
      </div>
    </div>
  );
};

export default DialogPage;