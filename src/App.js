import React, { useState } from "react";
import { Cookies } from "react-cookie";

import Auth from "./Com/Auth/Auth";
import Room from "./Com/room/Room";

import Chat from "./Com/Chat/Chat";

import {signOut} from 'firebase/auth'

import {auth} from './firebase'

import './App.css';

const cookies = new Cookies();

function App() {

  const [isAuth, setAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const signUserout = async() =>{
      await signOut(auth)
      cookies.remove("auth-token")
      setAuth(false)
      setRoom(null)
  }

  const handleRoomSubmit = (value) => {
    setRoom(value);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setAuth = {setAuth}/>
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat  Room = {room}/>
      ) : (
        <Room onRoomSubmit={handleRoomSubmit} />
      )}
       <div className="sign-out">
         <button onClick = {signUserout}>Sign-out</button>
       </div>
    </>
  );
}

export default App;
