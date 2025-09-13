import React, { useState } from "react";
import {
  requestPermission,
  isPermissionGranted,
  sendNotification
} from "@tauri-apps/plugin-notification";
import CodeViewer from "../components/CodeViewer";
import OutputDisplay from "../components/OutputDisplay";

const NotificationPage: React.FC = () => {
  const [output, setOutput] = useState<string | object>("");
  const [title, setTitle] = useState("Tauri Notification");
  const [body, setBody] = useState("This is a notification from Tauri!");

  const checkPermission = async () => {
    try {
      const permissionGranted = await isPermissionGranted();
      setOutput(`Permission granted: ${permissionGranted}`);
    } catch (error: any) {
      if (
        error?.message?.includes("forbidden") ||
        error?.message?.includes("not allowed")
      ) {
        setOutput(
          "Notification permission check failed: Permission denied. Please check app capabilities and system settings."
        );
      } else {
        setOutput(`Notification error: ${error?.message || error}`);
      }
    }
  };

  const requestPermissionHandler = async () => {
    try {
      const permission = await requestPermission();
      setOutput(`Permission status: ${permission}`);
    } catch (error: any) {
      if (
        error?.message?.includes("forbidden") ||
        error?.message?.includes("not allowed")
      ) {
        setOutput(
          "Notification permission request failed: Permission denied. Please check app capabilities and system settings."
        );
      } else {
        setOutput(`Notification error: ${error?.message || error}`);
      }
    }
  };

  const sendNotificationHandler = async () => {
    try {
      sendNotification({ title, body });
      setOutput(`Notification sent: ${title}`);
    } catch (error: any) {
      if (
        error?.message?.includes("forbidden") ||
        error?.message?.includes("not allowed")
      ) {
        setOutput(
          "Notification send failed: Permission denied. Please check app capabilities and system settings."
        );
      } else {
        setOutput(`Notification error: ${error?.message || error}`);
      }
    }
  };

  const notificationCode = `
import { requestPermission, isPermissionGranted, sendNotification } from "@tauri-apps/plugin-notification";

// Check if permission is granted
const permissionGranted = await isPermissionGranted();

// Request permission
const permission = await requestPermission();

// Send a notification
sendNotification({ 
  title: "Tauri Notification", 
  body: "This is a notification from Tauri!" 
});
  `.trim();

  return (
    <div className="page-container">
      <h1>Notification APIs</h1>
      <p>Tauri provides APIs for sending desktop notifications to the user.</p>

      <div className="demo-section">
        <h3>Notification Permissions</h3>
        <p>Check and request notification permissions.</p>
        <div className="button-group">
          <button onClick={checkPermission}>Check Permission</button>
          <button onClick={requestPermissionHandler}>Request Permission</button>
        </div>
      </div>

      <div className="demo-section">
        <h3>Send Notification</h3>
        <p>Send a desktop notification to the user.</p>
        <div className="button-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title"
          />
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Notification body"
          />
          <button onClick={sendNotificationHandler}>Send Notification</button>
        </div>
      </div>

      {output && <OutputDisplay title="Output" output={output} />}

      <div className="demo-section">
        <h3>Source Code</h3>
        <CodeViewer code={notificationCode} language="typescript" />
      </div>
    </div>
  );
};

export default NotificationPage;
