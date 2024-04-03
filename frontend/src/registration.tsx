import React from 'react';

interface Props {
    onRegister: () => void;
  }
  
  const Registration: React.FC<Props> = ({ onRegister }) => {
  return (
    <div>
      <h2>Registration Form</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" /><br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" /><br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" /><br />
        <button type="button" onClick={onRegister}>Register</button>
      </form>
    </div>
  );
};

export default Registration;
