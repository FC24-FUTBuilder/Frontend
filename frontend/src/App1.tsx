import React, { useState } from "react";
import "./App.css";
import axiosClient from "./utils/axiosClient";
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
  {
    name: "4-3-1-2",
    positions: [
      "GK",
      "LB",
      "CB",
      "CB",
      "RB",
      "CM",
      "CM",
      "CM",
      "CAM",
      "ST",
      "ST",
    ],
  },
  {
    name: "4-3-2-1",
    positions: [
      "GK",
      "LB",
      "CB",
      "CB",
      "RB",
      "CM",
      "CM",
      "CM",
      "CF",
      "CF",
      "ST",
    ],
  },
  {
    name: "5-4-1",
    positions: [
      "GK",
      "LWB",
      "CB",
      "CB",
      "CB",
      "RWB",
      "LM",
      "CM",
      "CM",
      "RM",
      "ST",
    ],
  },
];
const positions = [
  "GK",
  "LB",
  "CB",
  "CB",
  "RB",
  "CDM",
  "CAM",
  "CAM",
  "LW",
  "ST",
  "RW",
];
interface Players {
  name: string;
  nation: string;
  club: string;
  position: string;
  age: number;
  overall: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physicality: number;
  card_image: string;
  gender: string;
  isActive: boolean;
}
interface SearchResult {
  _id: string;
  club: string;
  name: string;
  nation: string;
  overall: number;
}
interface SelectedPlayer {
  _id: string;
  name: string;
}

export default function App() {
  const [formation, setSelectedFormation] = useState<string>(
    "Select Formation to get started..."
  );
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
      <h1>Hi User, Pick your team</h1>
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
      <Pitch formation={formation} positions={formationPositions}></Pitch>
    </div>
  );
}
