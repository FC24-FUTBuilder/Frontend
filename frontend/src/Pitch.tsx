import React, { useState } from "react";
import axiosClient from "./utils/axiosClient";
import "./Pitch.css";
interface PitchComponentProps {
  formation: string;
  positions: string[];
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
interface Team {
  players: any;
  formation: string;
  overallRating: number;
}
export const Pitch: React.FC<PitchComponentProps> = ({
  formation,
  positions,
  userData,
}) => {
  const client = axiosClient();
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>([
    {
      _id: "",
      club: "",
      name: "",
      nation: "",
      overall: 0,
    },
  ]);
  const [overall, setOverall] = useState<number>(0);
  const [players, setPlayers] = useState<Players[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");
  const [image, setImage] = useState<any | null>();
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
      let response: any = {};
      if (pos) {
        response = await client.get(`/players/list?pos=${pos}`);
      } else {
        response = await client.get(`/players/list`);
      }
      const responseData = objToArray(response.data.data);
      setSearchResult(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCardClick = (e) => {
    const imgCard = e.currentTarget.querySelector("img");
    setImage(imgCard);
    setShowModal(true);
  };
  const handleSetPlayer = async () => {
    const _id = selectedPlayer;
    let response: any = {};
    try {
      response = await client.get(`/players/playerDetails?id=${_id}`);
      const imgURL =
        response.data.data.card_image == null
          ? "src/assets/empty.png"
          : response.data.data.card_image;
      image.src = imgURL;
      addReplaceTeamMember(response.data.data);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
    setSelectedPlayer("");
  };
  const addReplaceTeamMember = (player: Players) => {
    setPlayers((prevTeam) => {
      const totalPlayers = prevTeam.length;
      if (totalPlayers == 11) {
        return prevTeam;
      } else {
        let averageOverall = 0;
        const existingPlayerIndex = prevTeam.findIndex(
          (p) => p.name === player.name
        );
        if (existingPlayerIndex !== -1) {
          const updatedTeam = [...prevTeam];
          updatedTeam[existingPlayerIndex] = player;
          if (prevTeam.length > 0) {
            const total = updatedTeam.reduce((p, c) => p + c.overall, 0);
            averageOverall = total / updatedTeam.length;
          }
          setOverall(Math.round(averageOverall));
          return updatedTeam;
        } else {
          const newTeam = [...prevTeam, player];
          if (newTeam.length > 0) {
            const total = newTeam.reduce((p, c) => p + c.overall, 0);
            averageOverall = total / newTeam.length;
          }
          setOverall(Math.round(averageOverall));
          return newTeam;
        }
      }
    });
  };
  const handleCreateTeam = async () => {
    if (players.length != 0 && players.length < 11) {
      const remainging = 11 - players.length;
      alert(`Cannot create team, you still need to add ${remainging} members`);
    } else if (players.length == 0) {
      alert("Team cannot be empty");
    } else if (players.length > 11) {
      alert("Team cannot have more than 11 players");
    } else {
      while (players.length > 11) {
        players.pop();
      }
      const userTeam: Team = {
        players: players,
        formation: formation,
        overallRating: overall,
      };
      const payload = JSON.stringify(userTeam);
      const response = await client.post("/teams/create", payload);
      const username = userData?.username;
      const teamPayload = {
        username: username,
        team: response.data.data._id,
      };
      const userresponse = await client.post(
        `/users/update?username=${username}`,
        teamPayload
      );
      userData.team = userresponse.data.data.team;
    }
  };
  return (
    <div>
      <div className="heading">
        <h3 style={{ marginRight: "20px" }}>Formation: {formation}</h3>
        <button onClick={handleCreateTeam}>Create Team!</button>
        <h3 style={{ marginLeft: "20px" }}>Team Overall: {overall}</h3>
      </div>
      <div className="Pitch">
        <div>
          {/* Attackers container */}
          <div
            className="attackers-container"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${parseInt(
                formation.split("-")[2]
              )}, 1fr)`,
            }}
          >
            {positions
              .slice(
                parseInt(formation.split("-")[0]) +
                  parseInt(formation.split("-")[1]) +
                  1
              )
              .map((pos, index) => (
                <div key={index} className="player">
                  <button className="card-button" onClick={handleCardClick}>
                    <img className="card" src="src/assets/empty.png" />
                    {pos}
                  </button>
                </div>
              ))}
          </div>

          {/* Midfielders container */}
          <div
            className="midfielders-container"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${parseInt(
                formation.split("-")[1]
              )}, 1fr)`,
            }}
          >
            {positions
              .slice(
                parseInt(formation.split("-")[0]) + 1,
                parseInt(formation.split("-")[0]) +
                  parseInt(formation.split("-")[1]) +
                  1
              )
              .map((pos, index) => (
                <div key={index} className="player">
                  <button className="card-button" onClick={handleCardClick}>
                    <img className="card" src="src/assets/empty.png" />
                    {pos}
                  </button>
                </div>
              ))}
          </div>

          {/* Defenders container */}
          <div
            className="defenders-container"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${parseInt(
                formation.split("-")[0]
              )}, 1fr)`,
            }}
          >
            {positions
              .slice(1, parseInt(formation.split("-")[0]) + 1)
              .map((pos, index) => (
                <div key={index} className="player">
                  <button className="card-button" onClick={handleCardClick}>
                    <img className="card" src="src/assets/empty.png" />
                    {pos}
                  </button>
                </div>
              ))}
          </div>

          {/* Goalkeeper container */}
          <div className="goalkeeper-container">
            {positions.slice(0, 1).map((pos, index) => (
              <div key={index} className="player">
                <button className="card-button" onClick={handleCardClick}>
                  <img className="card" src="src/assets/empty.png" />
                  {pos}
                </button>
              </div>
            ))}
          </div>
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
                    value={selectedPlayer}
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
              <button onClick={handleSetPlayer}>Set Player</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
