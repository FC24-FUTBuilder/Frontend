import React, { useState } from "react";

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

interface EditorComponentProps {
  playerDetails: Players;
  onClose: () => void;
  onUpdate: (updatedPlayer: Players) => void;
}

export const EditorModel: React.FC<EditorComponentProps> = ({
  playerDetails,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Players>(playerDetails);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div>
      <h1>Editor Component opened</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", justifyContent: "center" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Nation:
            <input
              type="text"
              name="nation"
              value={formData.nation}
              onChange={handleChange}
            />
          </label>
          <label>
            Club:
            <input
              type="text"
              name="club"
              value={formData.club}
              onChange={handleChange}
            />
          </label>
          <label>
            Position:
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <label>
            Overall:
            <input
              type="number"
              name="overall"
              value={formData.overall}
              onChange={handleChange}
            />
          </label>
          <label>
            Pace:
            <input
              type="number"
              name="pace"
              value={formData.pace}
              onChange={handleChange}
            />
          </label>
          <label>
            Shooting:
            <input
              type="number"
              name="shooting"
              value={formData.shooting}
              onChange={handleChange}
            />
          </label>
          <label>
            Passing:
            <input
              type="number"
              name="passing"
              value={formData.passing}
              onChange={handleChange}
            />
          </label>
          <label>
            Dribbling:
            <input
              type="number"
              name="dribbling"
              value={formData.dribbling}
              onChange={handleChange}
            />
          </label>
          <label>
            Defending:
            <input
              type="number"
              name="defending"
              value={formData.defending}
              onChange={handleChange}
            />
          </label>
          <label>
            Physicality:
            <input
              type="number"
              name="physicality"
              value={formData.physicality}
              onChange={handleChange}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </label>
          <label>
            Is Active:
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Update Player</button>
      </form>
      <button onClick={() => onClose()}>Close Editor</button>
    </div>
  );
};
