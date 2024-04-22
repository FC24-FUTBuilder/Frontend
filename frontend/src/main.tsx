import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import App from "./App1.tsx";
import Registration from "./registration.tsx";
import "./index.css";
import LoginModal from "./LoginModal.tsx";

const Main: React.FC = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [login, setLogin] = useState(true);
  const handleRegistration = () => {
    setLogin(true);
    setSessionActive(false);
  };
  const handleLogin = () => {
    setLogin(false);
    setSessionActive(true);
  };
  const handleRegister = () => {
    setLogin(false);
    setSessionActive(false);
  };
  return (
    <React.StrictMode>
      {sessionActive ? (
        <App />
      ) : login ? (
        <LoginModal onLogin={handleLogin} onRegister={handleRegister} />
      ) : (
        <Registration onRegister={handleRegistration} />
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
