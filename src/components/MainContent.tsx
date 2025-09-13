import React from "react";
import WelcomePage from "../pages/WelcomePage";
import DialogPage from "../pages/DialogPage";
import FsPage from "../pages/FsPage";
import WindowPage from "../pages/WindowPage";
import HttpPage from "../pages/HttpPage";
import IpcPage from "../pages/IpcPage";
import ShellPage from "../pages/ShellPage";
import ClipboardPage from "../pages/ClipboardPage";
import NotificationPage from "../pages/NotificationPage";

interface MainContentProps {
  activeModule: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeModule }) => {
  const renderPage = () => {
    switch (activeModule) {
      case "welcome":
        return <WelcomePage />;
      case "dialog":
        return <DialogPage />;
      case "fs":
        return <FsPage />;
      case "window":
        return <WindowPage />;
      case "http":
        return <HttpPage />;
      case "ipc":
        return <IpcPage />;
      case "shell":
        return <ShellPage />;
      case "clipboard":
        return <ClipboardPage />;
      case "notification":
        return <NotificationPage />;
      default:
        return <WelcomePage />;
    }
  };

  return <div className="main-content">{renderPage()}</div>;
};

export default MainContent;