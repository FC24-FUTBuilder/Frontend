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
  const [selectedPlayer, setSelectedPlayer] = useState<SelectedPlayer | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const objToArray = (obj: JSON) => {
    return Object.keys(obj).map((key) => ({
      ...obj[key],
    }));
  };
  const handleSearchModelClick = async () => {
    setShowModal(true);
    try {
      const name = searchQuery != "" ? searchQuery : "";
      let response = {};
      if (name) {
        response = await client.get(`/players/list?name=${name}`);
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
  const handleCloseModal = () => {
    setSearchQuery("");
    setShowModal(false);
  };
  const handleSelectPlayer = (_id, name) => {
    setSelectedPlayer({
      _id: _id,
      name: name,
    });
    console.log(_id, name);
    setShowModal(false);
  };
  return (
    <div>
      <h3>{formation}</h3>
      <div className="pitch">
        {positions &&
          positions.map((pos, index) => (
            <div className="player" key={index}>
              <button onClick={() => setShowModal(true)}>
                {selectedPlayer && selectedPlayer._id ? (
                  <div>{selectedPlayer.name}</div>
                ) : (
                  pos
                )}
              </button>
            </div>
          ))}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="search-component">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
                <button onClick={handleSearchModelClick}>Search</button>
              </div>
              <div className="result-component">
                {searchResult && (
                  <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Club</th>
                          <th>Nation</th>
                          <th>Overall</th>
                          <th>Select</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.map((player) => (
                          <tr key={player._id}>
                            <td>{player.name}</td>
                            <td>{player.club}</td>
                            <td>{player.nation}</td>
                            <td>{player.overall}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleSelectPlayer(player._id, player.name)
                                }
                              >
                                Pick!
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
