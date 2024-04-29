import React, { useState } from "react";
import "./App.css";
import { Pitch } from "./Pitch";
const formations = [
  {
    name: "4-4-2",
    positions: [
      "GK",
      "LB",
      "CB",
      "CB",
      "RB",
      "LM",
      "CM",
      "CM",
      "RM",
      "ST",
      "ST",
    ],
  },
  {
    name: "4-3-3",
    positions: [
      "GK",
      "LB",
      "CB",
      "CB",
      "RB",
      "CDM",
      "CM",
      "CAM",
      "LW",
      "ST",
      "RW",
    ],
  },
];
interface AppProps {
  userData: any;
}

const App: React.FC<AppProps> = ({ userData }) => {
  const [formation, setSelectedFormation] = useState<string>("4-4-2");
  const [formationPositions, setFormationPositions] = useState<string[]>([]);

  const handleFormationSelect = (formationName: string) => {
    setSelectedFormation(formationName);
    const formationObj = formations.find((f) => f.name === formationName);
    const position = formationObj.positions ? formationObj.positions : [];
    setFormationPositions(formationPositions);
    setFormationPositions(position);
  };
  return (
    <div className="App">
      <h1>Hi {userData.username}, Pick your team</h1>
      <h3>Select Formation: </h3>
      <select
        value={formation}
        onChange={(e) => handleFormationSelect(e.target.value)}
      >
        {formations.map((formation, index) => (
          <option key={index} value={formation.name}>
            {formation.name}
          </option>
        ))}
      </select>
      <Pitch
        formation={formation}
        positions={formationPositions}
        userData={userData}
      ></Pitch>
    </div>
  );
};

export default App;
