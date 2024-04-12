import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Registration from "./registration.tsx";
import "./index.css";

const Main: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);

  const handleRegistration = () => {
    setSessionActive(true);
  };

  return (
    <React.StrictMode>
      {sessionActive ? (
        <App />
      ) : (
        <Registration onRegister={handleRegistration} />
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
