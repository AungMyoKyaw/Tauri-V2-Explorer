import React, { useState } from "react";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const WindowPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");

  const maximizeWindow = async () => {
    try {
      const window = getCurrentWebviewWindow();
      await window.maximize();
      setOutput("Window maximized");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const minimizeWindow = async () => {
    try {
      const window = getCurrentWebviewWindow();
      await window.minimize();
      setOutput("Window minimized");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const toggleFullscreen = async () => {
    try {
      const window = getCurrentWebviewWindow();
      const isFullscreen = await window.isFullscreen();
      if (isFullscreen) {
        await window.setFullscreen(false);
        setOutput("Fullscreen disabled");
      } else {
        await window.setFullscreen(true);
        setOutput("Fullscreen enabled");
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const closeWindow = async () => {
    try {
      const window = getCurrentWebviewWindow();
      await window.close();
      setOutput("Window closed");
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const getWindowInfo = async () => {
    try {
      const window = getCurrentWebviewWindow();
      const info = {
        title: await window.title(),
        isResizable: await window.isResizable(),
        isMaximized: await window.isMaximized(),
        isMinimized: await window.isMinimized(),
        isFullscreen: await window.isFullscreen(),
        position: await window.outerPosition(),
        size: await window.outerSize()
      };
      setOutput(info);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const windowCode = `
import { getCurrent } from "@tauri-apps/api/window";

// Get the current window
const window = getCurrent();

// Maximize the window
await window.maximize();

// Minimize the window
await window.minimize();

// Toggle fullscreen
await window.setFullscreen(true);

// Close the window
await window.close();

// Get window information
const info = {
  title: await window.title(),
  isResizable: await window.isResizable(),
  isMaximized: await window.isMaximized(),
  isMinimized: await window.isMinimized(),
  isFullscreen: await window.isFullscreen(),
  position: await window.outerPosition(),
  size: await window.outerSize()
};
  `.trim();

  return (
    <div className="page-container">
      <h1>Window Management APIs</h1>
      <p>
        Tauri provides APIs for managing window properties and behavior.
      </p>

      <div className="demo-section">
        <h3>Window Actions</h3>
        <p>Control the window state and properties.</p>
        <div className="button-group">
          <button onClick={maximizeWindow}>Maximize</button>
          <button onClick={minimizeWindow}>Minimize</button>
          <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
          <button onClick={getWindowInfo}>Get Window Info</button>
          <button onClick={closeWindow}>Close Window</button>
        </div>
      </div>

      {output && <OutputDisplay title="Output" output={output} />}

      <div className="demo-section">
        <h3>Source Code</h3>
        <CodeViewer code={windowCode} language="typescript" />
      </div>
    </div>
  );
};

export default WindowPage;