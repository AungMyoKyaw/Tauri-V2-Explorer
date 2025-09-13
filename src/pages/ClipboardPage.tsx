import React, { useState } from "react";
import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const ClipboardPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");
  const [clipboardText, setClipboardText] = useState("Hello from Tauri!");

  const writeToClipboard = async () => {
    try {
      await writeText(clipboardText);
      setOutput(`Text written to clipboard: ${clipboardText}`);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const readFromClipboard = async () => {
    try {
      const text = await readText();
      setOutput(text || "Clipboard is empty");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const clipboardCode = `
import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";

// Write text to clipboard
await writeText("Hello from Tauri!");

// Read text from clipboard
const text = await readText();
  `.trim();

  return (
    <div className="page-container">
      <h1>Clipboard APIs</h1>
      <p>
        Tauri provides secure APIs for reading from and writing to the system clipboard.
      </p>

      <div className="demo-section">
        <h3>Clipboard Operations</h3>
        <p>Read from and write to the system clipboard.</p>
        <div className="button-group">
          <input
            type="text"
            value={clipboardText}
            onChange={(e) => setClipboardText(e.target.value)}
            placeholder="Text to write to clipboard"
          />
          <button onClick={writeToClipboard}>Write to Clipboard</button>
          <button onClick={readFromClipboard}>Read from Clipboard</button>
        </div>
      </div>

      {output && <OutputDisplay title="Output" output={output} />}

      <div className="demo-section">
        <h3>Source Code</h3>
        <CodeViewer code={clipboardCode} language="typescript" />
      </div>
    </div>
  );
};

export default ClipboardPage;