import React, { useState } from "react";
import axiosClient from "./utils/axiosClient";
import "./Registration.css";
interface Props {
  onRegister: () => void;
}
interface RegisterFormData {
  username: string;
  password: string;
  email: string;
}

const Registration: React.FC<Props> = ({ onRegister }) => {
  const client = axiosClient();
  const [userDetails, setUserDetails] = useState<RegisterFormData>({
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof RegisterFormData
  ) => {
    setUserDetails({
      ...userDetails,
      [field]: event.target.value,
    });
  };
  const handleRegister = async () => {
    try {
      const payload = JSON.stringify(userDetails);
      const response = await client.post("/users/create", payload);
      console.log(`User Registered: ${response.data}`);
      onRegister();
    } catch (error) {
      console.log(`User Registration failed: ${error}`);
    }
  };
  return (
    <div>
      <video className="background-video" autoPlay loop muted>
        <source src="src/assets/reg.mp4" type="video/mp4" />
      </video>

      <div className="form-box">
        <br />
        <h2>Registration Form</h2>
        <form>
          <label className="plabel" htmlFor="username">
            Username
          </label>
          <br />
          <input
            className="inputfield"
            type="text"
            id="username"
            name="username"
            value={userDetails.username}
            onChange={(e) => handleChange(e, "username")}
          />
          <br />
          <br />
          <label className="elabel" htmlFor="email">
            Email
          </label>
          <br />
          <input
            className="inputfield"
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={(e) => handleChange(e, "email")}
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
            value={userDetails.password}
            onChange={(e) => handleChange(e, "password")}
          />
          <br />
          <br />
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
