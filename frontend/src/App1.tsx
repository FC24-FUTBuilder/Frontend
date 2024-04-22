import React, { useState } from "react";
import "./App.css";
import axiosClient from "./utils/axiosClient";
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
  const client = axiosClient();
  const [formation, setSelectedFormation] = useState<string>("4-4-2");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([
    {
      _id: "",
      club: "",
      name: "",
      nation: "",
      overall: 0,
    },
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<SelectedPlayer>({
    _id: "",
    name: "",
  });
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFormationSelect = (formationName: string) => {
    setSelectedFormation(formationName);
    setSelectedPlayers([]);
  };
  const handlePositionClick = (position: string) => {
    setShowModal(true);
    setSelectedPosition(position);
    setSearchQuery("");
  };
  const objToArray = (obj: JSON) => {
    return Object.keys(obj).map((key) => ({
      ...obj[key],
    }));
  };
  const handleSearchModelClick = async () => {
    setShowModal(true);
    try {
      const pos = searchQuery != "" ? searchQuery : "";
      let response = {};
      if (pos) {
        response = await client.get(`/players/list?pos=${pos}`);
      } else {
        response = await client.get(`/players/list`);
      }
      const responseData = objToArray(response.data.data);
      console.log(responseData);
      setSearchResult(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="pitch">
      <div className="player">
        <button onClick={() => setShowModal(true)}></button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="search-component">
              <select
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              >
                <option value="">Select a position</option>
                {positions.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              <button onClick={handleSearchModelClick}>Search</button>
            </div>
            <div className="result-component">
              {searchResult && (
                <select
                  value={selectedPlayer._id}
                  onChange={(e) => setSelectedPlayer(e.target.value)}
                >
                  {searchResult.map((player, index) => (
                    <option key={index} value={player._id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <button onClick={() => setShowModal(false)}>Set Player</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
