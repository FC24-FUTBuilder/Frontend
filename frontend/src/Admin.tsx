import React, { useState } from "react";
import axiosClient from "./utils/axiosClient";
import { EditorModel } from "./Editor";

interface AdminComponentProps {
  userData: any;
}
interface SearchResult {
  _id: string;
  club: string;
  name: string;
  nation: string;
  overall: number;
}
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

export const Admin: React.FC<AdminComponentProps> = ({ userData }) => {
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
  const [playertoEdit, setPlayertoEdit] = useState<Players | null>(null);
  const [editorComponent, setEditorComponent] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const objToArray = (obj: JSON) => {
    return Object.keys(obj).map((key) => ({
      ...obj[key],
    }));
  };
  const handleSearchModelClick = async () => {
    try {
      const name = searchQuery != "" ? searchQuery : "";
      let response: any = {};
      if (name) {
        response = await client.get(`/players/list?name=${name}`);
      } else {
        response = await client.get(`/players/list`);
      }
      const responseData = objToArray(response.data.data);
      setSearchResult(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleEditClick = async (_id) => {
    setShowModal(false);
    let response: any = {};
    try {
      if (_id) {
        response = await client.get(`/players/playerdetails?id=${_id}`);
      }
      const player = response.data.data;
      setPlayertoEdit(player);
    } catch (err) {
      console.log(err);
    }
    setEditorComponent(true);
  };
  const handleEditorClose = () => {
    console.log("Inside editor close");
    setEditorComponent(false);
    setPlayertoEdit(null);
  };
  const updatePlayerData = async (updatedPlayer) => {
    const playerId = updatedPlayer?._id;
    let response: any = {};
    if (playerId) {
      try {
        response = await client.post(
          `/players/edit?id=${playerId}`,
          updatedPlayer
        );
        const player = response.data.data;
        setPlayertoEdit(player);
        alert("Player updated successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleOpenModal = () => {
    setEditorComponent(false);
    setPlayertoEdit(null);
    setShowModal(true);
  };
  return (
    <div>
      <h1>Hello, {userData.username}</h1>
      <button onClick={handleOpenModal}>Get Started!</button>
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
                            <button onClick={() => handleEditClick(player._id)}>
                              edit
                            </button>
                          </td>
                          <td>
                            <button onClick={() => alert("Delete Clicked")}>
                              delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
      {editorComponent ? (
        <EditorModel
          playerDetails={playertoEdit}
          onClose={handleEditorClose}
          onUpdate={updatePlayerData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
