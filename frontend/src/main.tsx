import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import App from "./App1.tsx";
import Registration from "./registration.tsx";
import "./index.css";
import LoginModal from "./LoginModal.tsx";
import { Admin } from "./Admin.tsx";

const Main: React.FC = () => {
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<any>({});
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
        userDetails.username == "admin" ? (
          <Admin userData={userDetails} />
        ) : (
          <App userData={userDetails} />
        )
      ) : login ? (
        <LoginModal
          onLogin={handleLogin}
          onRegister={handleRegister}
          storeUserData={setUserDetails}
        />
      ) : (
        <Registration onRegister={handleRegistration} />
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
