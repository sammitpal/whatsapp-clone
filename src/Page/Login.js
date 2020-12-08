import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./Login.css";
import firebase from "firebase";

function Login() {
  const signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c543.png"
          alt=""
        />
        <div className="loginText">
          <h1>Sign In with Google</h1>
        </div>
        <Button variant="contained" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
