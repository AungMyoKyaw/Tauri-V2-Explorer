import React, { useState } from "react";
import { readTextFile, writeTextFile, readDir, mkdir, remove } from "@tauri-apps/plugin-fs";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const FsPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");
  const [filePath, setFilePath] = useState("example.txt");
  const [fileContent, setFileContent] = useState("Hello, Tauri!");

  const readFile = async () => {
    try {
      const content = await readTextFile(filePath);
      setOutput(content);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const writeFile = async () => {
    try {
      await writeTextFile(filePath, fileContent);
      setOutput(`File written successfully to ${filePath}`);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const listDirectory = async () => {
    try {
      // List files in the current directory
      const entries = await readDir(".");
      setOutput(entries);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const createDirectory = async () => {
    try {
      await mkdir("new-directory", { recursive: true });
      setOutput("Directory created successfully");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const deleteFile = async () => {
    try {
      await remove(filePath);
      setOutput(`File ${filePath} deleted successfully`);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const fsCode = `
import { readTextFile, writeTextFile, readDir, mkdir, remove } from "@tauri-apps/plugin-fs";

// Read a text file
const content = await readTextFile("path/to/file.txt");

// Write a text file
await writeTextFile("path/to/file.txt", "Hello, Tauri!");

// List directory contents
const entries = await readDir("path/to/directory");

// Create a directory
await mkdir("new-directory", { recursive: true });

// Delete a file
await remove("path/to/file.txt");
  `.trim();

  return (
    <div className="page-container">
      <h1>File System APIs</h1>
      <p>
        Tauri provides secure file system APIs for reading, writing, and managing files and directories.
      </p>

      <div className="demo-section">
        <h3>Read File</h3>
        <p>Read the contents of a text file.</p>
        <div className="button-group">
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="File path"
          />
          <button onClick={readFile}>Read File</button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Write File</h3>
        <p>Write content to a text file.</p>
        <div className="button-group">
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="File path"
          />
          <input
            type="text"
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            placeholder="File content"
          />
          <button onClick={writeFile}>Write File</button>
        </div>
      </div>

      <div className="demo-section">
        <h3>List Directory</h3>
        <p>List the contents of a directory.</p>
        <div className="button-group">
          <button onClick={listDirectory}>List Directory</button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Create Directory</h3>
        <p>Create a new directory.</p>
        <div className="button-group">
          <button onClick={createDirectory}>Create Directory</button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Delete File</h3>
        <p>Delete a file from the filesystem.</p>
        <div className="button-group">
          <input
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="File path"
          />
          <button onClick={deleteFile}>Delete File</button>
        </div>
      </div>

      {output && <OutputDisplay title="Output" output={output} />}

      <div className="demo-section">
        <h3>Source Code</h3>
        <CodeViewer code={fsCode} language="typescript" />
      </div>
    </div>
  );
};

export default FsPage;