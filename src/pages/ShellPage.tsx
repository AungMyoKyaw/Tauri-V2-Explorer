import React, { useState } from "react";
import { Command } from "@tauri-apps/plugin-shell";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const ShellPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");
  const [command, setCommand] = useState("echo Hello Tauri!");

  const executeCommand = async () => {
    try {
      const cmd = Command.create("shell", command.split(" "));
      const result = await cmd.execute();
      setOutput({
        code: result.code,
        stdout: result.stdout,
        stderr: result.stderr
      });
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const shellCode = `
import { Command } from "@tauri-apps/plugin-shell";

// Execute a shell command
const cmd = Command.create("shell", ["echo", "Hello Tauri!"]);
const result = await cmd.execute();

// Result contains:
// - code: exit code
// - stdout: standard output
// - stderr: standard error
  `.trim();

  return (
    <div className="page-container">
      <h1>Shell APIs</h1>
      <p>
        Tauri provides secure APIs for executing shell commands.
      </p>

      <div className="demo-section">
        <h3>Execute Shell Commands</h3>
        <p>Run shell commands securely.</p>
        <div className="button-group">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command"
          />
          <button onClick={executeCommand}>Execute</button>
        </div>
      </div>

      {output && <OutputDisplay title="Output" output={output} />}

      <div className="demo-section">
        <h3>Source Code</h3>
        <CodeViewer code={shellCode} language="typescript" />
      </div>
    </div>
  );
};

export default ShellPage;