import React, { useEffect, useState } from "react";
import './try.css'

import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";

import { auth, db } from "../../firebase";


const Chat = (props) => {
  const Room = props.Room;

  const [newMssg, setMssg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [messages, setMessages] = useState([]);

  const mssgRef = collection(db, "messages");

  useEffect(() => {
    const queryMssg = query(mssgRef, where("room", "==", Room),orderBy('createdAt'));
    const unsubscribe = onSnapshot(queryMssg, (snapshot) => {
      let messages = [];

      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if (newMssg === "" && e.nativeEvent.submitter.name === "send") {
      setShowAlert(true);
    } else {
      setShowAlert(false);

      if (e.nativeEvent.submitter.name === "send") {
        await addDoc(mssgRef, {
          text: newMssg,
          createdAt: serverTimestamp(),
          user: auth.currentUser.displayName,
          room: Room,
        });

        setMssg("");
      }
    }
  };

  const handleChange = (e) => {
    setMssg(e.target.value);
    if (showAlert) {
      setShowAlert(false);
    }
  };

  const clearChat = async () => {
    await Promise.all(
      messages.map((message) => {
        return deleteDoc(doc(db, "messages", message.id));
      })
    );
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          width: "445px",
          height: "40px",
          color: "#EC4899",
        }}
      >
        <h4>Welcome to the room: {Room}</h4>
      </div>

      <form className="chat-container" onSubmit={handleSubmit}>
        <div className="chat-messages">
          {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.user === auth.currentUser.displayName? "send": "receive"}`}>
                <span>{message.user}</span>:{message.text}
              </div>
            ))}
        </div>

        <div className="chat-input-container">
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMssg}
              onChange={handleChange}
              className={showAlert ? "input-alert" : ""}
            />

            <button name="send" type="submit">
              Send
            </button>

            <button className="clear-button" onClick={clearChat} type="button">
              Clear
            </button>
          </div>
        </div>
        {showAlert && (
          <div className="alert">
            <p>Kindly ensure that you enter a valid message</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Chat;
