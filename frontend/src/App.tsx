import React, { useState } from 'react';
import './App.css';

const formations = [
  { name: '4-4-2', positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'] },
  { name: '4-3-3', positions: ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'ST', 'RW'] },
];

const players = [
  { id: 1, name: 'Trent', rating: 90, position:'RB' },
  { id: 2, name: 'Allison', rating: 85, position:'GK'},
  { id: 3, name: 'Walker', rating: 88, position:'RB' },
  { id: 4, name: 'Neur', rating: 86, position:'GK'},
];

interface SelectedPlayer {
  position: string;
  player: any;
}

function App(){
  const [selectedFormation, setSelectedFormation] = useState<string>('4-4-2');
  const [selectedPlayers, setSelectedPlayers] = useState<SelectedPlayer[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFormationSelect = (formationName: string) => {
    setSelectedFormation(formationName);
    setSelectedPlayers([]);
  };

  const handlePositionClick = (position: string) => {
    setShowModal(true);
    setSelectedPosition(position);
    setSearchQuery('');
  };

  const handlePlayerSelect = (player: any) => {
    setShowModal(false);
    const existingPlayerIndex = selectedPlayers.findIndex(p => p.position === selectedPosition);
    if (existingPlayerIndex !== -1) {
      const updatedSelectedPlayers = [...selectedPlayers];
      updatedSelectedPlayers[existingPlayerIndex] = { position: selectedPosition as string, player };
      setSelectedPlayers(updatedSelectedPlayers);
    } else {
      setSelectedPlayers(prevState => ([
        ...prevState,
        { position: selectedPosition as string, player }
      ]));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredPlayers = players.filter(player =>
    player.position === selectedPosition &&
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="App">
      <h1>FUT Draft</h1>
      <div className="formation-select">
        <h2>Select Formation:</h2>
        <select value={selectedFormation} onChange={(e) => handleFormationSelect(e.target.value)}>
          {formations.map((formation, index) => (
            <option key={index} value={formation.name}>{formation.name}</option>
          ))}
        </select>
      </div>
      <div className="pitch">
        {formations.find(formation => formation.name === selectedFormation)?.positions.map((position, index) => (
          <div key={index} className={`position ${position}`} onClick={() => handlePositionClick(position)}>
            <h3>{position}</h3>
            {/* Player Card */}
            {selectedPlayers.find(player => player.position === position) && (
              <div className="player">
                <h4>{selectedPlayers.find(player => player.position === position)?.player.name}</h4>
                <p>Rating: {selectedPlayers.find(player => player.position === position)?.player.rating}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <hr />
            {filteredPlayers.map(player => (
              <div key={player.id} className="player-option" onClick={() => handlePlayerSelect(player)}>
                <h4>{player.name}</h4>
                <p>Rating: {player.rating}</p>
              </div>
            ))}
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      <button onClick={() => console.log(selectedPlayers)}>Send to Backend</button>
    </div>
  );
}

export default App;
