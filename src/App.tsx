import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [activeModule, setActiveModule] = useState("welcome");

  return (
    <div className="app-container">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <MainContent activeModule={activeModule} />
    </div>
  );
}

export default App;