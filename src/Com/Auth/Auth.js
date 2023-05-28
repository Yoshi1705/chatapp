import "./Auth.css";
import { auth, provider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import googleIcon from "./Img.png";
import { Cookies } from "react-cookie";

const Auth = (props) => {
  
  const cookies = new Cookies();
  const clickHandler = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      cookies.set("auth-token", res.user.refreshToken);
      props.setAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Auth">
      <div className="container">
        <p>Welcome Back!</p>
        <button onClick={clickHandler} className="google-button">
          <img src={googleIcon} alt="Google Icon" />
          <span className="google-text">Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
