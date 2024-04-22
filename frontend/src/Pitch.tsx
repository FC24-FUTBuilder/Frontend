import React, { useState } from "react";
import axiosClient from "./utils/axiosClient";
import "./Pitch.css";
interface PitchComponentProps {
  formation: string;
  positions: string[];
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

export const Pitch: React.FC<PitchComponentProps> = ({
  formation,
  positions,
}) => {
  const client = axiosClient();
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
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    <div>
      <h3>{formation}</h3>
      <div className="Pitch">
        {positions &&
          positions.map((pos, index) => (
            <div className="player">
              <button key={index} onClick={() => setShowModal(true)}>
                {pos}
              </button>
            </div>
          ))}
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
    </div>
  );
};
