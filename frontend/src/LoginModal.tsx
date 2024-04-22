import React, { useState } from "react";
import axiosClient from "./utils/axiosClient";

interface LoginModalProps {
  onLogin: () => void;
  onRegister: () => void;
}
interface LoginFormData {
  username: string;
  password: string;
}
const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onRegister }) => {
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
      onLogin();
    } catch (error) {
      console.log(`User Registration failed: ${error}`);
    }
  };
  return (
    <div>
      <div>
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginForm.username}
            onChange={(e) => handleChange(e, "username")}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <button onClick={onRegister}>Register</button>
      </div>
    </div>
  );
};

export default LoginModal;
