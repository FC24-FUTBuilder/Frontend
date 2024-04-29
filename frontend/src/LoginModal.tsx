import React, { useState } from "react";
import axiosClient from "./utils/axiosClient";
import "./Login.css";
interface LoginModalProps {
  onLogin: () => void;
  onRegister: () => void;
  storeUserData: (data: any) => void;
}
interface LoginFormData {
  username: string;
  password: string;
}
const LoginModal: React.FC<LoginModalProps> = ({
  onLogin,
  onRegister,
  storeUserData,
}) => {
  const client = axiosClient();
  const [loginForm, setLoginForm] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof LoginFormData
  ) => {
    setLoginForm({
      ...loginForm,
      [field]: event.target.value,
    });
  };
  const handleLogin = async () => {
    try {
      const payload = JSON.stringify(loginForm);
      const response = await client.post("/users/login", payload);
      console.log(`User Registered: ${response.data}`);
      storeUserData(response.data.data);
      onLogin();
    } catch (error) {
      console.log(`User Registration failed: ${error}`);
    }
  };
  return (
    <div>
      <video className="background-video" autoPlay loop muted>
        <source src="src/assets/background_video.mp4" type="video/mp4" />
      </video>
      <div className="form-box">
        <h2 className="headers">FUT</h2>
        <h2>Login</h2>
        <form>
          <label className="ulabel" htmlFor="username">
            Username or Email
          </label>
          <br />
          <input
            className="inputfield"
            type="text"
            id="username"
            name="username"
            value={loginForm.username}
            onChange={(e) => handleChange(e, "username")}
          />
          <br />
          <br />
          <label className="plabel" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="inputfield"
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <br />
          <br />
          <button className="button" type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <br />
        <button className="rbutton" onClick={onRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
