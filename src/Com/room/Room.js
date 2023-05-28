import React, { useRef } from "react";
import "./room.css";

const Room = ({ onRoomSubmit }) => {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const value = inputRef.current.value;
    if (value) {
      onRoomSubmit(value);
    }
  };

  return (
    <div className="room">
      <div className="card">
        <label>Enter Room Name:</label>
        <input ref={inputRef} />
        <button onClick={handleSubmit}>Enter Chat</button>
      </div>
    </div>
  );
};

export default Room;
