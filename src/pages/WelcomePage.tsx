import React from "react";

const WelcomePage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Welcome to Tauri V2 Explorer</h1>
      <p>
        This application demonstrates the core features of Tauri V2. Use the
        navigation sidebar to explore different APIs and see how they work.
      </p>
      
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Interactive Demos</h3>
          <p>Run real examples of Tauri V2 APIs and see immediate results</p>
        </div>
        
        <div className="feature-card">
          <h3>Source Code Access</h3>
          <p>View the exact code implementation for each feature</p>
        </div>
        
        <div className="feature-card">
          <h3>Cross-Platform</h3>
          <p>Works seamlessly on Windows, macOS, and Linux</p>
        </div>
        
        <div className="feature-card">
          <h3>Real-Time Feedback</h3>
          <p>See API outputs and responses in real-time</p>
        </div>
      </div>
      
      <h2>Getting Started</h2>
      <p>
        Select a category from the sidebar to begin exploring Tauri V2 features.
        Each page contains working examples that you can interact with directly.
      </p>
    </div>
  );
};

export default WelcomePage;