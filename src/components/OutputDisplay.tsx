import React from "react";

interface OutputDisplayProps {
  title: string;
  output: string | object;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ title, output }) => {
  const formatOutput = (output: string | object) => {
    if (typeof output === "string") {
      return output;
    }
    return JSON.stringify(output, null, 2);
  };

  return (
    <div className="output-display">
      <h3>{title}</h3>
      <pre className="output-content">{formatOutput(output)}</pre>
    </div>
  );
};

export default OutputDisplay;