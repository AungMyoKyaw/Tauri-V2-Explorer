import React, { useState } from "react";
import { Command } from "@tauri-apps/plugin-shell";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const ShellPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");
  const [command, setCommand] = useState("echo Hello Tauri!");

  const executeCommand = async () => {
    try {
      const parts = command.trim().split(/\s+/);
      const cmdName = parts[0];
      const args = parts.slice(1);

      let scopedCommand;
      switch (cmdName) {
        case "echo":
          scopedCommand = Command.create("run-echo", args);
          break;
        case "ls":
          scopedCommand = Command.create("run-ls", args);
          break;
        case "pwd":
          scopedCommand = Command.create("run-pwd", args);
          break;
        case "cat":
          scopedCommand = Command.create("run-cat", args);
          break;
        case "grep":
          scopedCommand = Command.create("run-grep", args);
          break;
        case "head":
          scopedCommand = Command.create("run-head", args);
          break;
        case "tail":
          scopedCommand = Command.create("run-tail", args);
          break;
        case "wc":
          scopedCommand = Command.create("run-wc", args);
          break;
        case "date":
          scopedCommand = Command.create("run-date", args);
          break;
        case "whoami":
          scopedCommand = Command.create("run-whoami", args);
          break;
        default:
          throw new Error(
            `Command '${cmdName}' is not allowed. Allowed commands: echo, ls, pwd, cat, grep, head, tail, wc, date, whoami`
          );
      }

      const result = await scopedCommand.execute();
      setOutput({
        code: result.code,
        stdout: result.stdout,
        stderr: result.stderr
      });
    } catch (error: any) {
      if (
        error?.message?.includes("forbidden") ||
        error?.message?.includes("not allowed")
      ) {
        setOutput(
          "Shell command failed: Permission denied. Please check app capabilities and system settings."
        );
      } else {
        setOutput(`Shell error: ${error?.message || error}`);
      }
    }
  };

  const shellCode = `
import { Command } from '@tauri-apps/plugin-shell';

// Execute a scoped shell command
const cmd = Command.create('run-echo', ['Hello Tauri!']);
const result = await cmd.execute();

// Result contains:
// - code: exit code
// - stdout: standard output
// - stderr: standard error
  `.trim();

  return (
    <div className="page-container">
      <h1>Shell APIs</h1>
      <p>Tauri provides secure APIs for executing shell commands.</p>

      <div className="demo-section">
        <h3>Execute Shell Commands</h3>
        <p>
          Run shell commands securely. Allowed commands: echo, ls, pwd, cat,
          grep, head, tail, wc, date, whoami
        </p>
        <div className="button-group">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Enter command (e.g., echo Hello World)"
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
