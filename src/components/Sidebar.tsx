import React from "react";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const modules = [
    { id: "welcome", name: "Welcome" },
    { id: "dialog", name: "Dialogs" },
    { id: "fs", name: "File System" },
    { id: "window", name: "Window Management" },
    { id: "http", name: "Networking" },
    { id: "ipc", name: "IPC" },
    { id: "shell", name: "Shell" },
    { id: "clipboard", name: "Clipboard" },
    { id: "notification", name: "Notifications" },
  ];

  return (
    <div className="sidebar">
      <div className="logo-container">
        <h2>Tauri V2 Explorer</h2>
      </div>
      <nav className="navigation">
        <ul>
          {modules.map((module) => (
            <li key={module.id}>
              <button
                className={activeModule === module.id ? "active" : ""}
                onClick={() => setActiveModule(module.id)}
              >
                {module.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;