import React, { useEffect, useState } from "react";
import axiosClient from "./utils/axiosClient";
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
      <h2>Registration Form</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userDetails.username}
          onChange={(e) => handleChange(e, "username")}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userDetails.email}
          onChange={(e) => handleChange(e, "email")}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userDetails.password}
          onChange={(e) => handleChange(e, "password")}
        />
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
