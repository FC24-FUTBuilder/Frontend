import React from 'react';

interface SelectedPlayer {
  position: string;
  player: any;
}

interface SelectedPlayersModalProps {
  selectedPlayers: SelectedPlayer[];
  onClose: () => void;
}

const SelectedPlayersModal: React.FC<SelectedPlayersModalProps> = ({ selectedPlayers, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Selected Players</h2>
        <ul>
          {selectedPlayers.map((selectedPlayer, index) => (
            <li key={index}>
              <strong>{selectedPlayer.position}</strong>: {selectedPlayer.player.name}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SelectedPlayersModal;
